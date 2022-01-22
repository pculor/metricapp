import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { axios } from '../../utils';
import styled from 'styled-components';
import StyledInput from '../common/Input';
import { Imetric, Ierror } from '../common/interfaces'

const Form = () => {
  const [metric, setMetric] = useState({
    name: '',
    value: '',
  });
  const initialError: Ierror = {isError: false, error: ''};
  const [error, setError] = useState(initialError);

  const postMetric = (event:any) => {
    event.preventDefault();
    axios
      .post(`metrics`, metric)
      .then((res) => {
        const { data: {
          body
        }} = res;
        toast.success(`${body.tags.name} metric logged successfully`);
        setMetric({
          name: '',
          value: '',
        })
      })
      .catch(error => {
        setError({isError: true, error})
      });
  };



  const handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setMetric((metric: Imetric) => ({ ...metric, [name]: value }));
  };

  if (error.isError) {
    // console.log(error.isError);
    console.log(error.error.response.data.errors.message);
    toast.error('Invalid Input');
    setError(initialError);
  }

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
