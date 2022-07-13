import styled from "@emotion/styled";
import * as d3 from "d3";
import { pie, arc } from "d3-shape";
import { useEffect, useRef } from "react";

const CircleChart = ({
  correct_answer,
  wrong_answer,
}: {
  correct_answer: number;
  wrong_answer: number;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const wrapper = d3.select(wrapperRef.current);
    wrapper.select("svg").remove();

    const { width, height } = wrapperRef.current?.getBoundingClientRect();

    const data = [correct_answer, wrong_answer];

    const data_pie = pie()(data);
    const data_arc = arc<any>()
      .innerRadius(0)
      .outerRadius(Math.min(width / 2, height / 2));

    const svg = wrapper
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .attr("fill", (d, i) => (i === 0 ? "#56ffa4" : "#ff5656"));

    const arcs = g
      .selectAll(".arc")
      .data(data_pie)
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("fill", (d, i) => (i === 0 ? "#56ffa4" : "#ff5656"))
      .attr("d", data_arc);

    arcs
      .append("text")
      .text((d, i) =>
        i === 0 ? `정답 : ${correct_answer}` : `오답 : ${wrong_answer}`
      )
      .attr("text-anchor", "middle")
      .attr("transform", (d, i) => `translate(${data_arc.centroid(d)})`)
      .attr("fill", "black");
  }, []);
  return <ChartWrapper ref={wrapperRef}></ChartWrapper>;
};

export default CircleChart;

const ChartWrapper = styled.div`
  height: 100%;
  width: 100%;
`;
