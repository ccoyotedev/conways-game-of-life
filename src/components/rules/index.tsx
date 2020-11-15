import React, { useState } from 'react';
import styled from 'styled-components';

const Toggle = styled.div`
  cursor: pointer;
  position: absolute;
  top: 24px;
  left: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  color: white;
`

const Container = styled.div<{ open: boolean }>`
  display: ${({ open }) => open ? 'block' : 'none'};
  border: 1px solid black;
  position: absolute;
  top: 48px;
  left: 48px;
  padding: 24px;
  max-width: 300px;
  background-color: white;
  box-shadow: 0px 0px 12px 8px rgba(0,0,0,0.5);
  z-index: 100;

  h2 {
    width: fit-content;
    margin: 0 auto;
  }

  ol {
    padding-inline-start: 24px;
  }

  li {
    margin-bottom: 12px;
  }
`

export default () => {
  const [ open, setOpen ] = useState(false);
  return (
    <>
      <Toggle onClick={() => setOpen(!open)}>
        ?
      </Toggle>
      <Container open={open}>
        <h2>Conway's Game of Life</h2>
        <ol>
          <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation</li>
          <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
          <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
          <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
        </ol>
      </Container>
    </>
  )
}