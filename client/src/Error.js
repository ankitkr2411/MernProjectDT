import React from 'react'
import styled from 'styled-components';



const Error = () => {


    const goBack = () => {
      window.history.back();
    }


  return (
    <Wrapper>
    <div className="error-container">
      <h1>Oops! An Error Occurred</h1>
      <p>Check your URL</p>
      <button onClick={goBack}>Go Back</button>
    </div>
      
    </Wrapper>
    
  )
}


const Wrapper = styled.section`
.error-container {
  text-align: center;
  margin: auto;
  padding: 2rem;
  width: 80%;
  max-width: 500px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 18px;
  margin-bottom: 2rem;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}


`;

export default Error