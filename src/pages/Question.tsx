import styled from "@emotion/styled";
import { useCallback, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { INITIAL_QUESTION_LENGTH } from "../constants";
import useUserSelect from "../hooks/useUserSelect";
import useStore from "../store";

type ParamsType = {
  id: number;
};

const Question = () => {
  const { id } = useParams<keyof ParamsType>() as unknown as ParamsType;
  const { curIndex, questions, increaseIndex, solveQuestion } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length !== INITIAL_QUESTION_LENGTH) {
      navigate("/");
      return;
    }
    if (Number(id) !== curIndex) {
      navigate(`/question/${curIndex}`);
      return;
    }
    if (curIndex === INITIAL_QUESTION_LENGTH) {
      navigate("/result");
      return;
    }
  }, [id, curIndex, questions.length]);

  const [userSelect, setUserSelect, resetUserSelect] =
    useUserSelect<string>("");

  const handleClickNextPage = useCallback(() => {
    resetUserSelect();
    solveQuestion(questions[id], userSelect);
    if (Number(id) + 1 === INITIAL_QUESTION_LENGTH) {
      navigate("/result");
      return;
    }
    navigate(`/question/${Number(id) + 1}`);
  }, [questions, id, userSelect]);

  return (
    <div>
      <div>{questions[id]?.category}</div>
      <div>{questions[id]?.question}</div>
      <SelectItemsWrapper>
        {userSelect
          ? questions[id]?.select_array.map((select: string) => (
              <li key={select}>
                <SelectItem
                  correct={select === questions[id]?.correct_answer}
                  userSelected={select === userSelect}
                >
                  {select}
                </SelectItem>
              </li>
            ))
          : questions[id]?.select_array.map((select: string) => (
              <li key={select}>
                <SelectButton onClick={() => setUserSelect(select)}>
                  {select}
                </SelectButton>
              </li>
            ))}
      </SelectItemsWrapper>
      {userSelect.length !== 0 && (
        <button onClick={handleClickNextPage}>다음 문제</button>
      )}
    </div>
  );
};

export default Question;

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

const SelectButton = styled.button`
  text-align: left;
  width: 100%;
`;
