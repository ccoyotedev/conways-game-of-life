import React from 'react';
import styled from 'styled-components';
import Grid from './components/grid';
import Rules from './components/rules';
import './App.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`

function App() {
  return (
    <Container>
      <Rules />
      <Grid width={65} height={65} />
    </Container>
  );
}

export default App;
