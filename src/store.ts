import create from "zustand";
import { QuestionType } from "./types/db";

interface StoreType {
  questions: QuestionType[];
  solvedQuestions: QuestionType[];
  curIndex: number;
  init: (questions: QuestionType[], startTime: Date) => void;
  startTime: Date | null;
  correctAnswer: number;
  wrongAnswer: number;
  increaseIndex: () => void;
  solveQuestion: (question: QuestionType, userSelect: string) => void;
}

const INITIAL_CUR_INDEX = 0;
const INITIAL_SOLVED_QUESTION: QuestionType[] = [];

const initialState = {
  curIndex: 0,
  solvedQuestions: [],
  questions: [],
  startTime: null,
  correctAnswer: 0,
  wrongAnswer: 0,
};

const useStore = create<StoreType>((set) => ({
  ...initialState,
  init: (questions: QuestionType[], startTime: Date) =>
    set((state) => ({ ...state, questions: [...questions], startTime })),
  increaseIndex: () =>
    set((state) => ({ ...state, curIndex: state.curIndex + 1 })),
  solveQuestion: (question: QuestionType, userSelect: string) => {
    if (question.correct_answer === userSelect) {
      set((state) => ({
        ...state,
        solvedQuestions: [...state.solvedQuestions, question],
        curIndex: state.curIndex + 1,
        correctAnswer: state.correctAnswer + 1,
      }));
      return;
    }
    set((state) => ({
      ...state,
      solvedQuestions: [...state.solvedQuestions, question],
      curIndex: state.curIndex + 1,
      wrongAnswer: state.wrongAnswer + 1,
    }));
  },
}));

export default useStore;
