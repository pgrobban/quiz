import styles from "../styles/Home.module.css";

interface Props {
  teamNames: string[];
  callback: () => void;
}

export default function HeadToHeadLogo(props: Props) {
  const { teamNames, callback } = props;
  return (
    <div className={styles.headToHeadLogo} onAnimationEnd={callback}>
      <h3 className={styles.headToHeadHeaderText}>Head to head activated!</h3>
      <div className={styles.headToHeadTeams}>
        <span className={styles.headToHeadTeamName}>{teamNames[0]}</span>
        <span>VS.</span>
        <span className={styles.headToHeadTeamName}>{teamNames[1]}</span>
      </div>
    </div>
  );
}
