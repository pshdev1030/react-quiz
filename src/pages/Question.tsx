import styled from "@emotion/styled";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SelectButtons } from "../components/SelectButtons";
import { SelectItems } from "../components/SelectItems";
import { INITIAL_QUESTION_LENGTH } from "../constants";
import useUserSelect from "../hooks/useUserSelect";
import useStore from "../store";
import { Button, PageWrapper } from "../styles/common";
import {
  CategoryWrapper,
  QuestionNumberWrapper,
  QuestionWrapper,
} from "../styles/Question";

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
    if (curIndex === INITIAL_QUESTION_LENGTH) {
      navigate("/result");
      return;
    }
    navigate(`/question/${Number(id) + 1}`);
  }, [questions, id, userSelect]);

  return (
    <PageWrapper>
      <QuestionNumberWrapper>
        <span className="Q">Q</span> {`${Number(id) + 1} / ${questions.length}`}
      </QuestionNumberWrapper>
      <CategoryWrapper>{questions[id]?.category}</CategoryWrapper>
      <QuestionWrapper>{questions[id]?.question}</QuestionWrapper>
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
        <Button onClick={handleClickNextPage}>다음 문제</Button>
      )}
    </PageWrapper>
  );
};

export default Question;
