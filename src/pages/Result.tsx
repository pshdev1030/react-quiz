import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { INITIAL_QUESTION_LENGTH } from "../constants";
import useStore from "../store";

const Result = () => {
  const { correctAnswer, wrongAnswer, finish, endTime, startTime, curIndex } =
    useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!startTime) {
      navigate("/");
      return;
    }
    if (curIndex !== INITIAL_QUESTION_LENGTH) {
      navigate(`/question/${curIndex}`);
      return;
    }
    finish(dayjs());
  }, []);

  const diff = useMemo(() => {
    const period = endTime?.diff(startTime, "s") as number;
    const hours = Math.floor(period / (60 * 60));
    const minutes = Math.floor(period / 60);
    const seconds = Math.floor(period % 60);
    return { hours, minutes, seconds };
  }, [startTime, endTime]);

  return (
    <div>
      <div>Result</div>
      <div>
        {`총 걸린 시간 : ${diff.hours}시간 ${diff.minutes}분 ${diff.seconds}초`}
      </div>
      <div>정답 : {correctAnswer}</div>
      <div>오답 : {wrongAnswer}</div>
      <div>chart</div>
      <button>다시 풀기</button>
      <button>오답 노트</button>
    </div>
  );
};

export default Result;
