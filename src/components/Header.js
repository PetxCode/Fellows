import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { app } from "./../base";

const Header = () => {
  const { current } = useContext(AuthContext);
  return (
    <Container>
      <Wrapper>
        <Logo> Use Query </Logo>
        <Navigation>
          <Nav to="/">Display</Nav>
          <Nav to="/create">Creat New</Nav>
        </Navigation>

        {current ? (
          <Nav1
            onClick={() => {
              app.auth().signOut();
            }}
          >
            Sign Out
          </Nav1>
        ) : (
          <Nav to="/register">Create an Account</Nav>
        )}
      </Wrapper>
    </Container>
  );
};

export default Header;

const Nav1 = styled.div`
  padding: 15px 20px;
  border-radius: 3px;
  transition: all 350ms;
  margin: 0 10px;
  text-decoration: none;
  color: white;

  &.active {
    background-color: rgba(255, 255, 255, 0.3);
  }
  :hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
const Nav = styled(NavLink)`
  padding: 15px 20px;
  border-radius: 3px;
  transition: all 350ms;
  margin: 0 10px;
  text-decoration: none;
  color: white;

  &.active {
    background-color: rgba(255, 255, 255, 0.3);
  }
  :hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const Navigation = styled.div`
  display: flex;
  flex: 1;
`;

const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 0 20px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  margin: 0 20px;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: #004080;
  color: white;
  position: fixed;
`;
