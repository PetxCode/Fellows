import React from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const profile = useParams();

  console.log(profile.id);

  const [val, setVal] = React.useState();
  const createSchema = yup.object().shape({
    title: yup.string().required("This field must be filled"),
    course: yup.string().required("This field must be filled"),
    rating: yup
      .number()
      .positive()
      .integer()
      .required("This field must be filled"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createSchema),
  });

  const mutate = useMutation((data) => {
    return axios.patch(`http://localhost:3900/${profile.id}`, data);
  });

  const createSubmit = (data) => {
    console.log(data);

    mutate.mutate(data);
    navigate("/");
  };

  const myData = async () => {
    const data = await axios.get("http://localhost:3900");
    console.log(data.data[profile.id]);
    setVal(data.data[profile.id]);

    // setVal(data.data.find((el) => el.id === profile.id));
  };

  // data.find((el) => el.id === profile.id )

  React.useEffect(() => {
    myData();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Card onSubmit={handleSubmit(createSubmit)}>
          <Content>
            <Label>title</Label>
            <Input placeholder={`${val?.title}`} {...register("title")} />
            <LabelError>{errors.title?.message}</LabelError>
          </Content>
          <Content>
            <Label>Course</Label>
            <Input placeholder={`${val?.course}`} {...register("course")} />
            <LabelError>{errors.course?.message}</LabelError>
          </Content>
          <Content>
            <Label>Rating</Label>
            <Input placeholder={`${val?.rating}`} {...register("rating")} />
            <LabelError>{errors.rating?.message}</LabelError>
          </Content>
          <Buttons>
            <Button bg type="submit">
              Add to Database
            </Button>
          </Buttons>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Update;

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
