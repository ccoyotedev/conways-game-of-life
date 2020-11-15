import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from './components/grid';
import Rules from './components/rules';
import ShapeSelector, { TShape } from './components/shapeSelector';
import './App.css';

const Container = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`

function App() {
  const [ shapeBrush, setShapeBrush ] = useState<TShape>('dot')
  return (
    <Container>
      <Rules />
      <ShapeSelector setShapeBrush={(e) => setShapeBrush(e)} />
      <Grid width={40} height={40} selectedShapeBrush={shapeBrush} />
    </Container>
  );
}

export default App;
