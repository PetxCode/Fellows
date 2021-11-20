import React from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Display = () => {
  const { data, isLoading, isLoadingError } = useQuery("query", () => {
    return axios.get("http://localhost:3900");
  });

  const myMutate = useMutation((id) => {
    return axios.delete(`http://localhost:3900/${id}`);
  });

  return (
    <Container>
      <Wrapper>
        {data?.data.map(({ title, course, rating, _id }, i) => (
          <Card>
            <Content>
              <Text>{title}</Text>
              <Text>{course}</Text>
              <Text>{rating}</Text>
            </Content>
            <Buttons>
              <Button1 bg to={`/update/${i}`}>
                Edit
              </Button1>
              <Button
                onClick={() => {
                  myMutate.mutate(_id);
                  window.location.reload();
                }}
              >
                Delete
              </Button>
            </Buttons>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Display;

const Button1 = styled(Link)`
  text-decoration: none;
  padding: 15px 20px;
  border-radius: 3px;
  background: ${({ bg }) => (bg ? "#004080" : "red")};
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
const Button = styled.div`
  padding: 15px 20px;
  border-radius: 3px;
  background: ${({ bg }) => (bg ? "#004080" : "red")};
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Text = styled.div``;

const Content = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: space-between;
  color: #004080;
  font-weight: bold;
  text-transform: capitalize;
`;

const Card = styled.div`
  margin: 10px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  width: 300px;
  min-height: 150px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding-top: 150px;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 0px);
  background: lightgray;
`;
