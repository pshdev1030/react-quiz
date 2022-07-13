import { INITIAL_QUESTION_URL, INITIAL_SELECT_LENGTH } from "../constants";
import axios from "axios";
import { useEffect } from "react";
import { QuestionType } from "../types/db";
import { Link } from "react-router-dom";
import useStore from "../store";
import useFlag from "../hooks/useFlag";

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
  const { questions, init, startTime } = useStore();
  const [isLoading, setIsLoadingTrue, setIsLoadingFalse] = useFlag(true);
  const [isError, setIsErrorTrue, setIsErrorFalse] = useFlag(false);

  useEffect(() => {
    if (questions.length === 0) {
      (async function () {
        try {
          const questions = await getQuestionsData();
          setIsLoadingFalse();
          setIsErrorFalse();
          init(questions, new Date());
        } catch (e) {
          setIsLoadingFalse();
          setIsErrorTrue();
        }
      })();
    }
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>문제를 불러오는 중에 에러가 발생하였습니다.</div>;
  }

  return (
    <div>
      <h1>React Quiiiiiiiiiiiiz</h1>
      <Link to="/question/0">퀴즈 풀기</Link>
    </div>
  );
};

export default Main;
