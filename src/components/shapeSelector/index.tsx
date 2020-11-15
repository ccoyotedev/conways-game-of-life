import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const ShapeContainer = styled.div<{ shape: TShape }>`
  display: grid;
  grid-template-columns: repeat(3, 10px);
  grid-template-rows: repeat(3, 10px);

  ${({shape}) => {
    switch(shape) {
      case 'dot':
        return css`
          span {
            :nth-child(5) {
              background-color: white;
              border: 0.5px solid black;
            }
          }
        `
      case 'crawler':
        return css`
          span {
            :nth-child(3),
            :nth-child(4),
            :nth-child(6),
            :nth-child(8),
            :nth-child(9) {
              background-color: white;
              border: 0.5px solid black;
            }
          }
        `
      default:
        return css`
          span {
            :nth-child(even) {
              background-color: white;
              border: 0.5px solid black;
            }
          }
        `
    }
  }}
`

const ShapeSelection = styled.div`
  padding: 12px;
  border-radius: 50%;
  border: 2px solid black;
  cursor: pointer;
  :hover {
    border-color: white;
  }
`

const Sidebar = styled.div<{open: boolean}>`
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: 12px 0;
  border: 2px solid white;
  border-left: none;
  top: 124px;
  left: ${({open}) => open ? 0 : '-140px'};
  box-sizing: border-box;
  background-color: black;
  transition: left 300ms ease;

  ${ShapeSelection} {
    margin: 14px;
  }
`

const Tab = styled.div<{open: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: ${({open}) => open ? '138px' : '-2px'};
  top: 124px;
  border: 2px solid white;
  border-left: none;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  width: 64px;
  height: 50px;
  cursor: pointer;
  background-color: black;
  z-index: 10;
  transition: left 300ms ease;
`

export type TShape = 'dot' | 'crawler' | undefined

const Shape = ({shape}: {shape?: TShape}) => {
  return (
    <ShapeContainer shape={shape}>
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </ShapeContainer>
  )
}

interface IShapeSelector {
  setShapeBrush: (e: TShape) => void;
}

const ShapeSelector = ({ setShapeBrush }: IShapeSelector) => {
  const [ open, setOpen ] = useState(false);
  const [ selectedShape, setSelectedShape ] = useState<TShape>("dot");
  const shapes: TShape[] = ["dot", "crawler", undefined];

  useEffect(() => {
    setShapeBrush(selectedShape);
  }, [selectedShape])

  return (
    <>
      <Tab open={open} onClick={() => setOpen(!open)} >
        <Shape shape={selectedShape} />
      </Tab>
      <Sidebar open={open}>
        {shapes.map((shape, i) => {
          return (
            <ShapeSelection onClick={() => setSelectedShape(shape)}>
              <Shape shape={shape} />
            </ShapeSelection>
          )
        })}
      </Sidebar>
    </>
  )
}

export default ShapeSelector;