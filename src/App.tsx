import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from './components/grid';
import Rules from './components/rules';
import ShapeSelector, { TShape } from './components/shapeSelector';
import SavedSelector, { TPattern } from './components/savedSelector';
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
  const [ shapeBrush, setShapeBrush ] = useState<TShape>('dot');
  const [ pattern, setPattern ] = useState<TPattern>();
  return (
    <Container>
      <Rules />
      <ShapeSelector setShapeBrush={setShapeBrush} />
      <SavedSelector setPattern={setPattern} />
      <Grid
        width={40}
        height={40}
        selectedShapeBrush={shapeBrush}
        pattern={pattern}
      />
    </Container>
  );
}

export default App;
