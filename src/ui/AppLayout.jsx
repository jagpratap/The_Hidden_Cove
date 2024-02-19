import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledNotification = styled.div`
  background-color: var(--color-yellow-100);
  padding: 1.2rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  gap: 1.2rem;
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <>
      <StyledNotification>
        <span>👋</span>
        <span>
          Data mutations (create, update, delete) are deactivated in this demo
          app.
        </span>
      </StyledNotification>
      <StyledAppLayout>
        <Header />
        <Sidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
