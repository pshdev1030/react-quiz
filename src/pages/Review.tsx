import { useCallback, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SelectItems } from "../components/SelectItems";
import { INITIAL_QUESTION_LENGTH } from "../constants";
import useStore from "../store";
import {
  Button,
  ButtonsWrapper,
  LinkButton,
  PageWrapper,
} from "../styles/common";
import {
  CategoryWrapper,
  QuestionNumberWrapper,
  QuestionWrapper,
} from "../styles/Question";
import Question from "./Question";

type ParamsType = {
  id: number;
};

const Review = () => {
  const { id } = useParams<keyof ParamsType>() as unknown as ParamsType;
  const { curIndex, solvedQuestions, resetStatus } = useStore();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (solvedQuestions.length === 0) {
      navigate("/");
      return;
    }
    if (curIndex !== INITIAL_QUESTION_LENGTH) {
      navigate(`/question/${curIndex}`);
      return;
    }
  }, [curIndex, solvedQuestions.length]);

  const handleClickNextPage = useCallback(() => {
    if (Number(id) + 1 === INITIAL_QUESTION_LENGTH) {
      return;
    }
    navigate(`/review/${Number(id) + 1}`);
  }, [id]);

  const handleClickPrevPage = useCallback(() => {
    if (Number(id) === 0) {
      return;
    }
    navigate(`/review/${Number(id) - 1}`);
  }, [id]);

  const handleClickOtherQuestionButton = useCallback(() => {
    resetStatus();
    navigate("/");
  }, []);

  return (
    <PageWrapper>
      <QuestionNumberWrapper>
        Q {`${Number(id) + 1}/${solvedQuestions.length}`}
      </QuestionNumberWrapper>
      <CategoryWrapper>{solvedQuestions[id]?.category}</CategoryWrapper>
      <QuestionWrapper>{solvedQuestions[id]?.question}</QuestionWrapper>
      <SelectItems
        userSelect={solvedQuestions[id]?.select}
        correct_answer={solvedQuestions[id]?.correct_answer}
        select_array={solvedQuestions[id]?.select_array}
      />
      <ButtonsWrapper>
        {Number(id) !== 0 && (
          <Button onClick={handleClickPrevPage}>이전 문제</Button>
        )}
        {Number(id) + 1 !== INITIAL_QUESTION_LENGTH && (
          <Button onClick={handleClickNextPage}>다음 문제</Button>
        )}
        <LinkButton to="/">다시 풀기</LinkButton>
        <Button onClick={handleClickOtherQuestionButton}>다른 문제 풀기</Button>
      </ButtonsWrapper>
    </PageWrapper>
  );
};

export default Review;
