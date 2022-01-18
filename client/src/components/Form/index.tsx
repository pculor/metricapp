import React, { useState, useEffect } from 'react';
import { axios } from '../../utils/axios';
import styled from 'styled-components';
import StyledInput from '../common/Input';

const Form = (props: any) => {
  const [metric, setMetric] = useState({
    name: '',
    value: '',
  });

  const postMetric = (event:any) => {
    axios
      .post(`metrics`, metric)
      .then((res) => {
        const { data: {
          body
        }} = res;
        console.log(body, '<<==')
        setMetric(body)
      })
      .catch(error => {
        return error.statusText;
      });
  };


  interface Imetric {
    name: string;
    value: string;
  }

  const handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setMetric((metric: Imetric) => ({ ...metric, [name]: value }));
  };

  return (
    <Container className="table">
      <StyledForm onSubmit={postMetric}>
        <InputWrapper>
          <label htmlFor="metric1">Metric</label>
          <StyledInput
            type="text"
            value={metric.name}
            onChange={handleInputChange}
            name="name"
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="metric1">Value</label>
          <StyledInput
            type="text"
            value={metric.value}
            onChange={handleInputChange}
            name="value"
          />
        </InputWrapper>
        <ButtonWrapper>
          <button>Submit</button>
        </ButtonWrapper>
      </StyledForm>
    </Container>
  );
};

export default Form;

const Container = styled.div`
  background-color: white;
  max-width: 600px;
  overflow-y: scroll;
  width: 100%;
  padding: 30px 15rem;
  border: 1px solid #c3cfd9;
  border-radius: 6px;
  margin: 0 auto;
  margin-top: 5rem;
`;

const StyledForm = styled.form`
  padding: 2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  input {
    padding: 0.5rem;
    outline: none;
    border: thin solid grey;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem;
  button {
    outline: none;
    padding: 0.5rem 1rem;
    background-color: #000;
    color: #fff;
    border: thin solid transparent;
  }
`;
