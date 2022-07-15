import { INITIAL_QUESTION_URL, INITIAL_SELECT_LENGTH } from "../constants";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { QuestionType } from "../types/db";
import useStore from "../store";
import useFlag from "../hooks/useFlag";
import dayjs from "dayjs";
import { LinkButton, PageWrapper } from "../styles/common";
import styled from "@emotion/styled";

async function getQuestionsData() {
  const questionsData = await axios(INITIAL_QUESTION_URL);
  return questionsData.data.results.map((question: QuestionType) => {
    let answerIndex = Math.floor(Math.random() * INITIAL_SELECT_LENGTH);
    let selectArray = [...question.incorrect_answers];
    selectArray.splice(answerIndex, 0, question.correct_answer);
    question.select_array = selectArray;
    return question;
  });
}

const Main = () => {
  const { questions, init, initStatus } = useStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoadingTrue, setIsLoadingFalse] = useFlag(true);
  const [isError, setIsErrorTrue, setIsErrorFalse] = useFlag(false);

  const handleLoadSuccess = useCallback(() => {
    setIsLoadingFalse();
    setIsErrorFalse();
  }, []);

  const handleLoadFail = useCallback(() => {
    setIsLoadingFalse();
    setIsErrorTrue();
  }, []);

  useEffect(() => {
    if (questions.length === 0) {
      // 문제가 없을 경우 문제와 시작시간 설정
      (async function () {
        try {
          const questions = await getQuestionsData();
          handleLoadSuccess();
          init(questions, dayjs());
        } catch (e) {
          handleLoadFail();
        }
      })();
    } else {
      // 문제가 있을 경우(다시 풀기) 시작시간만 재설정
      handleLoadSuccess();
      initStatus(dayjs());
    }
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>문제를 불러오는 중에 에러가 발생하였습니다.</div>;
  }

  return (
    <PageWrapper>
      <ContentsWrapper>
        <PageTitle>React Quiiiiiiiiiiiiz</PageTitle>
        <LinkButton to="/question/0">퀴즈 풀기</LinkButton>
      </ContentsWrapper>
    </PageWrapper>
  );
};

export default Main;

const PageTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
