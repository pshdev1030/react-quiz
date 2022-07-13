import styled from "@emotion/styled";
import { useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { INITIAL_QUESTION_LENGTH } from "../constants";
import useStore from "../store";

type ParamsType = {
  id: number;
};

const Review = () => {
  const { id } = useParams<keyof ParamsType>() as unknown as ParamsType;
  const { curIndex, solvedQuestions } = useStore();
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

  return (
    <div>
      <div>{solvedQuestions[id]?.category}</div>
      <div>{solvedQuestions[id]?.question}</div>
      <SelectItemsWrapper>
        {solvedQuestions[id]?.select_array.map((select: string) => (
          <li key={select}>
            <SelectItem
              correct={select === solvedQuestions[id]?.correct_answer}
              userSelected={select === solvedQuestions[id]?.select}
            >
              {select}
            </SelectItem>
          </li>
        ))}
      </SelectItemsWrapper>
      {Number(id) !== 0 && (
        <button onClick={handleClickPrevPage}>이전 문제</button>
      )}
      {Number(id) + 1 !== INITIAL_QUESTION_LENGTH && (
        <button onClick={handleClickNextPage}>다음 문제</button>
      )}
      <Link to="/">다시 풀기</Link>
    </div>
  );
};

export default Review;

const SelectItemsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & li {
    width: 100%;
  }
`;

const SelectItem = styled.div<{ userSelected: boolean; correct: boolean }>`
  background: ${({ correct, userSelected }) =>
    correct
      ? "linear-gradient(90deg,#56ffa4,#59bc86)"
      : !correct && userSelected
      ? "linear-gradient(90deg,#ff5656,#c16868)"
      : "linear-gradient(90deg,#56ccff,#6eafb4)"};
`;
