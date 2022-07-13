import { Dayjs } from "dayjs";
import create from "zustand";
import { QuestionType } from "./types/db";

interface StoreType {
  questions: QuestionType[];
  solvedQuestions: QuestionType[];
  curIndex: number;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  correctAnswer: number;
  wrongAnswer: number;
  init: (questions: QuestionType[], startTime: Dayjs) => void;
  finish: (finishTime: Dayjs) => void;
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
  endTime: null,
  correctAnswer: 0,
  wrongAnswer: 0,
};

const useStore = create<StoreType>((set) => ({
  ...initialState,
  init: (questions: QuestionType[], startTime: Dayjs) =>
    set((state) => ({
      ...state,
      questions: [...questions],
      startTime,
      endTime: null,
    })),
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
  finish: (endTime: Dayjs) => set((state) => ({ ...state, endTime })),
}));

export default useStore;
