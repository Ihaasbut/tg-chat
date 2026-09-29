import { createBrowserRouter, redirect } from "react-router-dom";

import ChatPanel from "@/components/chat/chatPanel/ChatPanel";
import { NoContact } from "@/components/chat/chatPanel/components/noContact/NoContact";
import { ChatPage } from "@/pages/chatPage/ChatPage";
import { LoginPage } from "@/pages/loginPage/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/chat",
    Component: ChatPage,
    children: [
      { index: true, Component: NoContact },
      { path: ":chatId", Component: ChatPanel },
    ],
  },
  {
    path: "*",
    loader: () => redirect("/login"),
  },
]);
