import { type SubmitEvent, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import cn from "classnames";

import { checkAccount, getErrorText } from "@/api/greenApi";
import { InfoIcon } from "@/components/ui/icons/InfoIcon";
import { Typography } from "@/components/ui/typography/Typography";

import { NewChatForm } from "./components/newChatForm/NewChatForm";
import { SearchHeader } from "./components/searchHeader/SearchHeader";
import { searchPanel } from "./SearchPanel.consts";
import styles from "./SearchPanel.module.scss";
import type { SearchPanelProps } from "./SearchPanel.types";
import { checkPhone, formatPhone } from "./SearchPanel.utils";

export function SearchPanel({ instance }: SearchPanelProps) {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const hasContact = Boolean(chatId);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [chatError, setChatError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const { instanceConnected, tip, accountNotFound } = searchPanel;

  function handlePhoneChange(nextPhoneNumber: string) {
    setPhoneNumber(formatPhone(nextPhoneNumber));
  }

  function handleNewChat() {
    setChatError("");
    navigate("/chat", {
      replace: true,
      state: { instance },
    });
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setChatError("");

    const nextPhoneNumber = phoneNumber.replace(/\D/g, "");
    const result = checkPhone(nextPhoneNumber);
    if (result !== true) {
      setChatError(result);
      return;
    }

    setIsChecking(true);

    try {
      const account = await checkAccount(instance, nextPhoneNumber);

      if (!account.exist || !account.chatId) {
        setChatError(accountNotFound);
        return;
      }

      navigate(generatePath("/chat/:chatId", { chatId: account.chatId }), {
        state: {
          instance,
          contact: {
            chatId: account.chatId,
            phoneNumber: nextPhoneNumber,
            username: account.username,
          },
        },
      });
    } catch (error) {
      setChatError(getErrorText(error));
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <aside className={cn(styles.searchPanel, hasContact && styles.hasContact)}>
      <SearchHeader />

      <div className={styles.instance}>
        <span className={styles.onlineDot} />

        <span className={styles.instanceText}>
          <Typography variant="caption" className={styles.status}>
            {instanceConnected}
          </Typography>

          <Typography variant="body-s">{instance.idInstance}</Typography>
        </span>
      </div>

      <NewChatForm
        isLocked={hasContact}
        phoneNumber={phoneNumber}
        isChecking={isChecking}
        chatError={chatError}
        onPhoneChange={handlePhoneChange}
        onSubmit={handleSubmit}
        onNewChat={handleNewChat}
      />

      <div className={styles.tip}>
        <InfoIcon />

        <Typography variant="caption">{tip}</Typography>
      </div>
    </aside>
  );
}
