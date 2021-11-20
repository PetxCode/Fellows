import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { app } from "./../base";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const authSchema = yup.object().shape({
    name: yup.string().required("This field must be filled"),
    email: yup.string().email().required("This field must be filled"),
    password: yup.string().required("This field must be filled"),
    confirm: yup.string().oneOf([yup.ref("password"), null]),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSchema),
  });

  const whenSubmitted = async (val) => {
    console.log(val);
    const { email, password, name } = val;
    const userID = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (userID) {
      await app.firestore().collection("users").doc(userID.user.uid).set({
        email,
        password,
        name,
        createdBy: userID.user.uid,
      });
    }

    reset();
    navigate("/");
  };

  const signUp = async () => {};

  return (
    <Container>
      <Wrapper>
        <Card onSubmit={handleSubmit(whenSubmitted)}>
          <Content>
            <Label>Name</Label>
            <Input placeholder="Enter Name" {...register("name")} />
            <LabelError>{errors.name?.message}</LabelError>
          </Content>
          <Content>
            <Label>Email</Label>
            <Input placeholder="Enter Email" {...register("email")} />
            <LabelError>{errors.email?.message}</LabelError>
          </Content>
          <Content>
            <Label>Password</Label>
            <Input placeholder="Enter Password" {...register("password")} />
            <LabelError>{errors.password?.message}</LabelError>
          </Content>
          <Content>
            <Label>Confirm Password</Label>
            <Input
              placeholder="Enter Confirm Password"
              {...register("confirm")}
            />
            <LabelError>{errors.confirm?.message}</LabelError>
          </Content>
          <Buttons>
            <Button bg type="submit">
              Register
            </Button>
          </Buttons>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Register;

const Input = styled.input`
  outline: none;
  height: 40px;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding-left: 15px;
`;
const Label = styled.label`
  font-weight: bold;
  font-size: 12px;
  margin-top: 20px;
`;
const LabelError = styled.label`
  font-weight: bold;
  font-size: 10px;
  color: red;
`;

const Button = styled.button`
  padding: 15px 20px;
  border-radius: 3px;
  background: ${({ bg }) => (bg ? "#004080" : "red")};
  color: white;
  font-weight: bold;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
`;

const Text = styled.div``;

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: #004080;
  font-weight: bold;
  text-transform: capitalize;
  flex-direction: column;
`;

const Card = styled.form`
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  width: 500px;
  min-height: 250px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
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
