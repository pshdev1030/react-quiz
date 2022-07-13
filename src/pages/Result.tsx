import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CircleChart from "../components/CircleChart";
import { INITIAL_QUESTION_LENGTH } from "../constants";
import useStore from "../store";
import {
  Button,
  ButtonsWrapper,
  LinkButton,
  PageWrapper,
} from "../styles/common";

const Result = () => {
  const {
    resetStatus,
    correctAnswer,
    wrongAnswer,
    finish,
    endTime,
    startTime,
    curIndex,
  } = useStore();
  const navigate = useNavigate();
  const handleClickOtherQuestionButton = useCallback(() => {
    resetStatus();
    navigate("/");
  }, []);

  useEffect(() => {
    if (!startTime) {
      navigate("/");
      return;
    }
    if (curIndex !== INITIAL_QUESTION_LENGTH) {
      navigate(`/question/${curIndex}`);
      return;
    }
    finish(dayjs());
  }, []);

  const diff = useMemo(() => {
    const period = endTime?.diff(startTime, "s") as number;
    const hours = Math.floor(period / (60 * 60));
    const minutes = Math.floor(period / 60);
    const seconds = Math.floor(period % 60);
    return { hours, minutes, seconds };
  }, [startTime, endTime]);

  return (
    <PageWrapper>
      <div>Result</div>
      <div>
        {`총 걸린 시간 : ${diff.hours}시간 ${diff.minutes}분 ${diff.seconds}초`}
      </div>
      <div>정답 : {correctAnswer}</div>
      <div>오답 : {wrongAnswer}</div>
      <ChartWrapper>
        <CircleChart
          correct_answer={correctAnswer}
          wrong_answer={wrongAnswer}
        />
      </ChartWrapper>
      <ButtonsWrapper>
        <Button onClick={handleClickOtherQuestionButton}>다른 문제 풀기</Button>
        <LinkButton to="/">다시 풀기</LinkButton>
        <LinkButton to="/review/0">오답 노트</LinkButton>
      </ButtonsWrapper>
    </PageWrapper>
  );
};

export default Result;

const ChartWrapper = styled.div`
  height: 300px;
`;
