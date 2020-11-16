import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Sidebar from '../sidebar';

const PatternContainer = styled.div<{ selected: boolean }>`
  color: white;
  height: 26px;
  cursor: pointer;
  :hover {
    text-decoration: underline
  }

  ${({ selected}) => selected && css`
    text-decoration: underline;
  `}
`

const SaveIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: white;
  position: relative;
  border-radius: 2px;

  span {
    :first-child {
      position: absolute;
      top: 2px;
      background-color: black;
      width: 16px;
      height: 9px;
      left: 50%;
      margin-left: -8px;
    }
    :last-child {
      position: absolute;
      bottom: 2px;
      background-color: black;
      width: 22px;
      height: 13px;
      left: 50%;
      margin-left: -11px;
    }
  }
`

export type TPattern = 'Gosper glider gun' | undefined;

interface ISavedSelector {
  setPattern: (e: TPattern) => void;
}

const SavedSelector = ({ setPattern }: ISavedSelector) => {
  const [ selectedPattern, setSelectedPattern ] = useState<TPattern>()
  const saved: TPattern[] = ['Gosper glider gun'];

  useEffect(() => {
    setPattern(selectedPattern);
  }, [selectedPattern])

  return (
    <Sidebar
      top="200px"
      tab={
        <SaveIcon>
          <span />
          <span />
        </SaveIcon>
      }
    >
      {saved.map(pattern => {
        return (
          <PatternContainer
            selected={pattern === selectedPattern}
            onClick={() => setSelectedPattern(pattern)}
          >
            {pattern}
          </PatternContainer>
        )
      })}
    </Sidebar>
  )
}

export default SavedSelector;