import classnames from "classnames";
import { useEffect, useState } from "react";
import "swiper/css";
import { Navigation, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Game,
  GameRound,
  GameStatus,
  QuestionStatus,
  isGroupedAcceptableAnswers,
} from "../models/types";
import 'swiper/css';
import 'swiper/css/navigation';
import styles from "../styles/Home.module.css";
import BaseGameBoard from "./BaseGameBoard";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface Props {
  game: Game;
}

export default function PictureBoard(props: Props) {
  const { game } = props;
  if (
    game.gameStatus !== GameStatus.inProgress ||
    !game.currentQuestion?.question ||
    game.round !== GameRound.pictureBoard
  ) {
    throw new Error("PictureBoard Assertion Error");
  }

  const [answerCache, setAnswerCache] = useState<string[]>([]);
  const { questionStatus, currentQuestion } = game;
  const { question, lastAnswer } = currentQuestion;
  const { questionText, acceptableAnswers } = question;

  useEffect(() => {
    if (
      lastAnswer &&
      !answerCache.includes(lastAnswer) &&
      questionStatus !== QuestionStatus.awardingPoints
    ) {
      setAnswerCache([...answerCache, lastAnswer]);
    }
  }, [answerCache, lastAnswer, questionStatus]);

  if (isGroupedAcceptableAnswers(acceptableAnswers)) {
    throw new Error("Only support for non-grouped acceptable answers");
  }

  return (
    <BaseGameBoard>
      <div className={styles.pictureBoard}>
        {game.questionStatus === QuestionStatus.receivedQuestion && (
          <div style={{ width: "100%", height: 700 }}>
            <Swiper
              modules={[Navigation, Keyboard]}
              navigation
              keyboard={{
                enabled: true
              }}
              slidesPerView={1}
              spaceBetween={30}
              style={{ height: "90%", width: "90%" }}
            >
              <SwiperSlide>
                <div
                  className={classnames(
                    styles.pictureBoardContainerFull,
                    styles.pictureBoardQuestionText
                  )}
                >
                  <span style={{ marginLeft: 40, marginRight: 40 }}>{questionText}</span>
                </div>
              </SwiperSlide>
              {acceptableAnswers.map((acceptableAnswer, index) => {
                const { clue } = acceptableAnswer;
                const imageUrl = `/images/${clue}`;
                return (
                  <SwiperSlide key={index}>
                    <div className={styles.pictureBoardContainerFull}>
                      <img src={imageUrl} alt="" />
                      <div className={styles.pictureBoardAnswerContainerFull}>
                        <div style={{ margin: "0 auto" }}>
                          {alphabet[index]}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
        {game.questionStatus !== QuestionStatus.receivedQuestion && (
          <>
            <div
              className={classnames(
                styles.pictureBoardContainer,
                styles.pictureBoardQuestionText
              )}
            >
              {questionText}
            </div>
            {acceptableAnswers.map((acceptableAnswer, index) => {
              const { points, answerText, clue, answered } = acceptableAnswer;
              const shouldShowAnswer =
                answered || questionStatus === QuestionStatus.announcingResults;
              const shouldShowPoints =
                answerCache.includes(answerText) ||
                questionStatus === QuestionStatus.announcingResults;
              const imageUrl = `/images/${clue}`;

              return (
                <div key={index}>
                  <a href={imageUrl}>
                    <div
                      className={classnames(
                        styles.pictureBoardContainer,
                        styles.pictureBoardPictureContainer
                      )}
                      style={{
                        backgroundImage: `url('${imageUrl}')`,
                      }}
                    />
                  </a>
                  <div className={styles.pictureBoardAnswerContainer}>
                    {shouldShowAnswer && (
                      <>
                        <div className={styles.pictureBoardAnswerText}>
                          {answerText}
                        </div>
                        <div className={styles.pictureBoardPointsContainer}>
                          <span>{shouldShowPoints ? points : ""}</span>
                        </div>
                      </>
                    )}
                    {!answered &&
                      questionStatus !== QuestionStatus.announcingResults && (
                        <div style={{ margin: "0 auto" }}>
                          {alphabet[index]}
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </BaseGameBoard>
  );
}
