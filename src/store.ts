import { Dayjs } from "dayjs";
import create from "zustand";
import { QuestionType } from "./types/db";

interface StoreType {
  questions: QuestionType[];
  // 서버로부터 받아온 문제
  solvedQuestions: QuestionType[];
  // 이미 푼 문제
  curIndex: number;
  // 현재 풀어야할 문제 번호
  startTime: Dayjs | null;
  // 시작 시간
  endTime: Dayjs | null;
  //  끝나는 시간
  correctAnswer: number;
  // 정답 수
  wrongAnswer: number;
  // 오답 수
  init: (questions: QuestionType[], startTime: Dayjs) => void;
  // 문제풀이 시작시 문제를 받아와 시작시간을 같이 설정
  initStatus: (startTime: Dayjs) => void;
  // 문제를 다시 풀어야할 경우 문제를 제외하고 시작시간과 다른 상태들을 초기화
  resetStatus: () => void;
  // 다른 문제를 풀어야할 경우 상태를 전부 초기화
  finish: (finishTime: Dayjs) => void;
  // 끝나는 시간
  increaseIndex: () => void;
  // 문제 번호 인덱스 증가
  solveQuestion: (question: QuestionType, userSelect: string) => void;
  // 문제를 푸는 (채점까지 수행함)
}

const INITIAL_CUR_INDEX = 0;
const INITIAL_SOLVED_QUESTION: QuestionType[] = [];

const initialState = {
  curIndex: 0,
  solvedQuestions: [],
  startTime: null,
  endTime: null,
  correctAnswer: 0,
  wrongAnswer: 0,
};

const useStore = create<StoreType>((set) => ({
  ...initialState,
  questions: [],
  init: (questions: QuestionType[], startTime: Dayjs) =>
    set((state) => ({
      ...state,
      ...initialState,
      questions: [...questions],
      startTime,
    })),
  initStatus: (startTime: Dayjs) =>
    set((state) => ({
      ...state,
      ...initialState,
      startTime,
    })),
  resetStatus: () => set((state) => ({ ...initialState, questions: [] })),
  increaseIndex: () =>
    set((state) => ({ ...state, curIndex: state.curIndex + 1 })),
  solveQuestion: (question: QuestionType, userSelect: string) => {
    question.select = userSelect;
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
