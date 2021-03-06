import styled from "@emotion/styled";
interface SelectItemsProps {
  userSelect: string;
  select_array: string[];
  correct_answer: string;
}
export const SelectItems = ({
  userSelect,
  select_array,
  correct_answer,
}: SelectItemsProps) => {
  return (
    <SelectItemsWrapper>
      {select_array.map((select: string) => (
        <li key={select}>
          <SelectItem
            correct={select === correct_answer}
            userSelected={select === userSelect}
          >
            {select}
          </SelectItem>
        </li>
      ))}
    </SelectItemsWrapper>
  );
};

export const SelectItemsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  & li {
    width: 100%;
  }
  margin-bottom: 10px;
`;

export const SelectItem = styled.div<{
  userSelected: boolean;
  correct: boolean;
}>`
  text-align: left;
  border: 1px solid white;
  padding: 10px;
  background: ${({ correct, userSelected }) =>
    correct
      ? "linear-gradient(90deg,#56ffa4,#59bc86)"
      : !correct && userSelected
      ? "linear-gradient(90deg,#ff5656,#c16868)"
      : "linear-gradient(90deg,#56ccff,#6eafb4)"};
`;
