import styled from "@emotion/styled";
import { useCallback, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SelectButtons } from "../components/SelectButtons";
import { SelectItems } from "../components/SelectItems";
import { INITIAL_QUESTION_LENGTH } from "../constants";
import useUserSelect from "../hooks/useUserSelect";
import useStore from "../store";
import { PageWrapper } from "../styles/common";
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

  useLayoutEffect(() => {
    if (questions.length !== INITIAL_QUESTION_LENGTH) {
      // 문제를 받아오지 못한 경우
      navigate("/");
      return;
    }
    if (curIndex === INITIAL_QUESTION_LENGTH) {
      // 문제를 다 푼 경우
      navigate("/result");
      return;
    }
    if (Number(id) !== curIndex) {
      // 풀어야 할 문제 페이지가 아닌 경우
      navigate(`/question/${curIndex}`);
      return;
    }
  }, [id, curIndex, questions.length]);

  const [userSelect, setUserSelect, resetUserSelect] =
    useUserSelect<string>("");

  const handleClickNextPage = useCallback(() => {
    if (userSelect.length === 0) return;
    resetUserSelect();
    solveQuestion(questions[id], userSelect);
    if (curIndex + 1 === INITIAL_QUESTION_LENGTH) {
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
      {
        <NextQuestionButton
          visiable={userSelect.length !== 0}
          onClick={handleClickNextPage}
        >
          다음 문제
        </NextQuestionButton>
      }
    </PageWrapper>
  );
};

export default Question;

const NextQuestionButton = styled.button<{ visiable: boolean }>`
  padding: 10px 20px;
  border: 1px solid white;
  &:hover {
    background: white;
  }
  visibility: ${({ visiable }) => (visiable ? "visiable" : "hidden")};
`;
