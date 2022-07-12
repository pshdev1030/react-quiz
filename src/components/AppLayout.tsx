import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
const AppLayout = () => {
  return (
    <AppLayoutContainer>
      <Outlet />
    </AppLayoutContainer>
  );
};

export default AppLayout;

const AppLayoutContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom, #a1c4fd 0%, #c2e9fb 100%); ;
`;
