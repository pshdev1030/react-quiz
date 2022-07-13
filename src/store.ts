import create from "zustand";
import { QuestionType } from "./types/db";

interface StoreType {
  questions: QuestionType[];
  solvedQuestions: QuestionType[];
  curIndex: number;
  init: (questions: QuestionType[], startTime: Date) => void;
  startTime: Date | null;
}

const INITIAL_CUR_INDEX = 0;
const INITIAL_SOLVED_QUESTION: QuestionType[] = [];

const initialState = {
  curIndex: 0,
  solvedQuestions: [],
  questions: [],
  startTime: null,
};

const useStore = create<StoreType>((set) => ({
  ...initialState,
  init: (questions: QuestionType[], startTime: Date) =>
    set((state) => ({ ...state, questions: [...questions], startTime })),
}));

export default useStore;
