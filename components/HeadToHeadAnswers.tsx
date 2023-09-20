import classNames from "classnames";
import styles from "../styles/Home.module.css";

interface Props {
  answers: string[];
  teamName: string;
}

export default function HeadToHeadAnswers(props: Props) {
  const { teamName, answers } = props;
  return (
    <>
      <h4>Received answers from {teamName}</h4>
      {answers.map((answer, index) => (
        <div
          key={index}
          className={classNames(styles.mainFrame, styles.headToHeadAnswer)}
        >
          <h3 key={index}>{answer}</h3>
        </div>
      ))}
    </>
  );
}
