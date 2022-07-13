import styled from "@emotion/styled";
import { SelectItemsWrapper } from "./SelectItems";

interface SelectItemsProps {
  select_array: string[];
  onClick: (select: string) => void;
}
export const SelectButtons = ({ select_array, onClick }: SelectItemsProps) => {
  return (
    <SelectItemsWrapper>
      {select_array.map((select: string) => (
        <li key={select}>
          <SelectButton onClick={() => onClick(select)}>{select}</SelectButton>
        </li>
      ))}
    </SelectItemsWrapper>
  );
};

export const SelectButton = styled.button`
  text-align: left;
  width: 100%;
`;
