import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  border: 2px solid white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 8px 24px;
  min-width: 64px;

  :hover {
    background-color: white;
    color: black;
  }
`

interface IButton {
  children: React.ReactNode;
  onClick: () => void;
}

export default ({ children, onClick }: IButton) => {
  return (
    <Button onClick={onClick}>
      {children}
    </Button>
  )
}