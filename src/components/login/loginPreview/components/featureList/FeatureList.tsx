import { Typography } from "@/components/ui/typography/Typography";

import { featureList } from "./FeatureList.consts";
import styles from "./FeatureList.module.scss";

export function FeatureList() {
  return (
    <ul className={styles.list}>
      {featureList.map((feature, index) => (
        <li key={feature}>
          <Typography variant="caption" className={styles.number}>
            {String(index + 1).padStart(2, "0")}
          </Typography>

          <Typography variant="label">{feature}</Typography>
        </li>
      ))}
    </ul>
  );
}
