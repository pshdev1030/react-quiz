import styled from "@emotion/styled";
import { useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SelectItems } from "../components/SelectItems";
import { INITIAL_QUESTION_LENGTH } from "../constants";
import useStore from "../store";

type ParamsType = {
  id: number;
};

const Review = () => {
  const { id } = useParams<keyof ParamsType>() as unknown as ParamsType;
  const { curIndex, solvedQuestions, resetStatus } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
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
    <div>
      <div>{solvedQuestions[id]?.category}</div>
      <div>{solvedQuestions[id]?.question}</div>
      <SelectItems
        userSelect={solvedQuestions[id]?.select}
        correct_answer={solvedQuestions[id]?.correct_answer}
        select_array={solvedQuestions[id]?.select_array}
      />
      {Number(id) !== 0 && (
        <button onClick={handleClickPrevPage}>이전 문제</button>
      )}
      {Number(id) + 1 !== INITIAL_QUESTION_LENGTH && (
        <button onClick={handleClickNextPage}>다음 문제</button>
      )}
      <Link to="/">다시 풀기</Link>
      <button onClick={handleClickOtherQuestionButton}>다른 문제 풀기</button>
    </div>
  );
};

export default Review;
