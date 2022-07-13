import styled from "@emotion/styled";
import { useCallback, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { SelectButtons } from "../components/SelectButtons";
import { SelectItems } from "../components/SelectItems";
import { INITIAL_QUESTION_LENGTH } from "../constants";
import useUserSelect from "../hooks/useUserSelect";
import useStore from "../store";

type ParamsType = {
  id: number;
};

const Question = () => {
  const { id } = useParams<keyof ParamsType>() as unknown as ParamsType;
  const { curIndex, questions, solveQuestion } = useStore();

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
      {userSelect.length !== 0 ? (
        <SelectItems
          select_array={questions[id]?.select_array}
          correct_answer={questions[id]?.correct_answer}
          userSelect={userSelect}
        />
      ) : (
        <SelectButtons
          select_array={questions[id]?.select_array}
          onClick={setUserSelect}
        />
      )}
      {userSelect.length !== 0 && (
        <button onClick={handleClickNextPage}>다음 문제</button>
      )}
    </div>
  );
};

export default Question;
