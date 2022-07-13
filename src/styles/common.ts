import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const PageWrapper = styled.div`
  max-width: 500px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: 1px solid white;
  &:hover {
    background: white;
  }
`;

export const LinkButton = styled(Link)`
  padding: 10px 20px;
  border: 1px solid white;
  text-align: center;
  &:hover {
    background: white;
  }
`;

export const ButtonsWrapper = styled.div`
display:flex;
flex-direction:column;
align-itmes;center;
`;
