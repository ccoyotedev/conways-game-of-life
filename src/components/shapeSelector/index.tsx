import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Sidebar from '../sidebar';

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
      case 'bagel':
        return css`
          span {
            background-color: white;
            border: 0.5px solid black;
            
            :nth-child(5) {
              background-color: transparent;
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

export type TShape = 'dot' | 'crawler' | "bagel" | undefined

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
  const [ selectedShape, setSelectedShape ] = useState<TShape>("dot");
  const shapes: TShape[] = ["dot", "crawler", "bagel", undefined];

  useEffect(() => {
    setShapeBrush(selectedShape);
  }, [selectedShape])

  return (
    <Sidebar
      tab={<Shape shape={selectedShape} />}
      top="124px"
    >
      {shapes.map((shape) => {
        return (
          <ShapeSelection onClick={() => setSelectedShape(shape)}>
            <Shape shape={shape} />
          </ShapeSelection>
        )
      })}
    </Sidebar>
  )
}

export default ShapeSelector;