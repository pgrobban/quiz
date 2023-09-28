import classnames from "classnames";
import Image from "next/image";
import { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import {
  Game,
  GameRound,
  GameStatus,
  QuestionStatus,
  isGroupedAcceptableAnswers,
} from "../models/types";
import styles from "../styles/Home.module.css";
import BaseGameBoard from "./BaseGameBoard";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface Props {
  game: Game;
}

export default function PictureBoard(props: Props) {
  const { game } = props;
  const swiperRef = useRef<SwiperRef>(null);

  if (
    game.gameStatus !== GameStatus.inProgress ||
    !game.currentQuestion?.question ||
    game.round !== GameRound.pictureBoard
  ) {
    throw new Error("PictureBoard Assertion Error");
  }

  const { questionStatus, currentQuestion } = game;
  const { question, lastAnswer, pictureBoardSlide } = currentQuestion;
  const { questionText, acceptableAnswers } = question;

  useEffect(() => {
    if (pictureBoardSlide === undefined || !swiperRef.current) {
      return;
    }

    if (pictureBoardSlide < swiperRef.current.swiper.activeIndex) {
      swiperRef.current.swiper.slidePrev();
    } else if (pictureBoardSlide > swiperRef.current.swiper.activeIndex) {
      swiperRef.current.swiper.slideNext();
    }
  }, [pictureBoardSlide]);

  if (isGroupedAcceptableAnswers(acceptableAnswers)) {
    throw new Error("Only support for non-grouped acceptable answers");
  }

  return (
    <BaseGameBoard>
      <div className={styles.pictureBoard}>
        {game.questionStatus === QuestionStatus.receivedQuestion && (
          <div style={{ width: "100%", height: 700 }}>
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Keyboard]}
              navigation
              keyboard={{
                enabled: true,
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
                  <span style={{ marginLeft: 40, marginRight: 40 }}>
                    {questionText}
                  </span>
                </div>
              </SwiperSlide>
              {acceptableAnswers.map((acceptableAnswer, index) => {
                const { clue } = acceptableAnswer;
                const imageUrl = `/images/${clue}`;
                return (
                  <SwiperSlide key={index}>
                    <div className={styles.pictureBoardContainerFull}>
                      <Image
                        src={imageUrl}
                        alt=""
                        fill
                        style={{ objectFit: "contain" }}
                      />
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
                (answered &&
                  ((lastAnswer === answerText &&
                    questionStatus !== QuestionStatus.awardingPoints) ||
                    lastAnswer !== answerText)) ||
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
