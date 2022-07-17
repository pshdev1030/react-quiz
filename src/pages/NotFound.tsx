import { LinkButton, PageWrapper } from "../styles/common";

const NotFound = () => {
  return (
    <PageWrapper>
      <LinkButton to="/" replace>
        메인으로 돌아가기
      </LinkButton>
    </PageWrapper>
  );
};

export default NotFound;
