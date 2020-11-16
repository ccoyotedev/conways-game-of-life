import React, { useState, useEffect } from 'react';
import Button from '../button';
import styled, { css } from 'styled-components';
import { TShape } from '../shapeSelector';
import { TPattern } from '../savedSelector';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Tile = styled.div<{active: boolean}>`
  border: 0.5px solid rgba(0,0,0,0.1);
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${({active}) => active ? 'black' : 'white'};
`

const Grid = styled.div<
  {width: number, height: number, active: boolean, usingBrush: boolean}
>`
  display: grid;
  border: 1px solid black;
  grid-template-columns: ${({width}) => `repeat(${width}, 1fr)`};
  grid-template-rows: ${({height}) => `repeat(${height}, 1fr)`};
  width: 652px;
  height: 652px;

  ${({active, usingBrush}) => active
    ? css`
        ${Tile} {
          cursor: auto;
        }
      `
    : !usingBrush && css`
        ${Tile} {
          :hover {
            background-color: black;
          }
        }
      `
    }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
  width: 100%;
  height: 50px;
`

const StopButton = styled.div`
  height: 50px;
  cursor: pointer;
  width: 50px;
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  span {
    background-color: white;
    height: 20px;
    width: 20px;
  }

  :hover {
    background-color: white;

    span {
      background-color: black;
    }
  }
`

interface IGridConstructor {
  height: number;
  width: number;
  selectedShapeBrush: TShape;
  pattern: TPattern;
}

interface IGrid {
  [y: string]: {
    [x: string]: {
      active: boolean;
    }
  }
}

export default ({height, width, selectedShapeBrush, pattern}: IGridConstructor) => {
  const [ grid, setGrid ] = useState<IGrid>({});
  const [ isActive, setIsActive ] = useState(false);
  const [ hoveredTiles, setHoveredTiles ] = useState<{x: string, y: string}[]>([])

  useEffect(() => {
    createGrid(pattern)
  }, [height, width, pattern]);

  useEffect(() => {
    if (selectedShapeBrush) {
      setHoveredTiles([])
    }
  }, [selectedShapeBrush]);

  useEffect(() => {
    let interval: number = 0;
    if (isActive) {
      interval = setInterval(() => {
        const nextStep = getNextStep();
        setGrid(nextStep);
      }, 250);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, grid]);

  const createGrid = (pattern?: TPattern) => {
    let newGrid: IGrid = {};
    for (let x = 0; x < width; x++) {
      newGrid[x.toString()] = {}
      for (let y = 0; y < height; y++) {
        if (!pattern) {
          newGrid[x.toString()][y.toString()] = {
            active: false,
          }
        } else if (pattern === 'Gosper glider gun') {
          if (
            x === 1 && y === 6 ||
            x === 2 && y === 6 ||
            x === 1 && y === 7 ||
            x === 2 && y === 7 ||
            x === 11 && y === 6 ||
            x === 11 && y === 7 ||
            x === 11 && y === 8 ||
            x === 12 && y === 5 ||
            x === 12 && y === 9 ||
            x === 13 && y === 4 ||
            x === 13 && y === 10 ||
            x === 14 && y === 4 ||
            x === 14 && y === 10 ||
            x === 15 && y === 7 ||
            x === 16 && y === 5 ||
            x === 16 && y === 9 ||
            x === 17 && y === 6 ||
            x === 17 && y === 7 ||
            x === 17 && y === 8 ||
            x === 18 && y === 7 ||
            x === 21 && y === 6 ||
            x === 21 && y === 5 ||
            x === 21 && y === 4 ||
            x === 22 && y === 6 ||
            x === 22 && y === 5 ||
            x === 22 && y === 4 ||
            x === 23 && y === 3 ||
            x === 23 && y === 7 ||
            x === 25 && y === 2 ||
            x === 25 && y === 3 ||
            x === 25 && y === 7 ||
            x === 25 && y === 8 ||
            x === 35 && y === 4 ||
            x === 35 && y === 5 ||
            x === 36 && y === 4 ||
            x === 36 && y === 5
          ) {
            newGrid[x.toString()][y.toString()] = {
              active: true,
            }
          } else {
            newGrid[x.toString()][y.toString()] = {
              active: false,
            }
          }
        }
      }
    }
    setGrid(newGrid)
  }

  const getNextStep = (): IGrid => {
    const g = JSON.parse(JSON.stringify(grid));

    Object.keys(grid).forEach(y => {
      Object.keys(grid[y]).forEach(x => {
        const nX = Number(x);
        const nY = Number(y);
        const adjTiles = [
          {x: nX - 1, y: nY},
          {x: nX - 1, y: nY - 1},
          {x: nX - 1, y: nY + 1},
          {x: nX, y: nY - 1},
          {x: nX, y: nY + 1},
          {x: nX + 1, y: nY},
          {x: nX + 1, y: nY - 1},
          {x: nX + 1, y: nY + 1},
        ];
        let adjCount = 0;
        // Count adjacent tiles
        adjTiles.forEach(({x, y}) => {
          if (x < 0 || x >= width || y < 0 || y >= height) return;
          if (grid[x][y].active) adjCount ++
        })

        if (grid[x][y].active) {
          // cell with fewer than two live neighbours dies
          // cell with more than three live neighbours dies
          // cell with two or three live neighbours lives
          if (adjCount < 2 || adjCount > 3) return g[x][y].active = false;
        } else {
          // dead cell with exactly three live neighbours becomes a live cell
          if (adjCount === 3) return g[x][y].active = true;
        }
      })
    })
    return g;
  }

  const startSimulation = () => {
    setHoveredTiles([]);
    setIsActive(false)
  }

  const handleClear = () => {
    setIsActive(false);
    createGrid();
  }

  const handleHover = (x: string, y: string) => {
    if (isActive) return null;

    const xN = Number(x);
    const yN = Number(y);
    switch (selectedShapeBrush) {
      case "dot":
        return;
      case "crawler":
        return setHoveredTiles(
          [
            {x: (xN + 1).toString(), y: (yN + 1).toString()},
            {x: (xN - 1).toString(), y: yN.toString()},
            {x: (xN + 1).toString(), y: yN.toString()},
            {x: xN.toString(), y: (yN + 1).toString()},
            {x: (xN + 1).toString(), y: (yN - 1).toString()},
          ]
        )
      case undefined:
        return setHoveredTiles(
          [
            {x: xN.toString(), y: (yN - 1).toString()},
            {x: (xN - 1).toString(), y: yN.toString()},
            {x: (xN + 1).toString(), y: yN.toString()},
            {x: xN.toString(), y: (yN + 1).toString()},
          ]
        )
      case "bagel":
        return setHoveredTiles(
          [
            {x: (xN - 1).toString(), y: (yN + 1).toString()},
            {x: (xN - 1).toString(), y: yN.toString()},
            {x: (xN - 1).toString(), y: (yN - 1).toString()},
            {x: xN.toString(), y: (yN - 1).toString()},
            {x: xN.toString(), y: (yN + 1).toString()},
            {x: (xN + 1).toString(), y: (yN + 1).toString()},
            {x: (xN + 1).toString(), y: yN.toString()},
            {x: (xN + 1).toString(), y: (yN - 1).toString()},
          ]
        )
      default:
        return;
    }
 
  }

  const selectTile = (x: string, y: string) => {
    if (isActive) return null;
    const gridCopy = {...grid};

    if (selectedShapeBrush === "dot") {
      gridCopy[x][y].active = !gridCopy[x][y].active;
    } else {
      hoveredTiles.forEach(tile => {
        gridCopy[tile.x][tile.y].active = true
      })
    }
    setGrid(gridCopy);
  }

  return (
    <Container>
      <Grid
        height={height}
        width={width}
        active={isActive}
        usingBrush={selectedShapeBrush !== "dot"}
        onMouseLeave={() => setHoveredTiles([])}
      >
        {Object.keys(grid).map(y => {
          return (
            Object.keys(grid[y]).map(x => {
              const hovered = hoveredTiles.some(tile => {
                return tile.x === x && tile.y === y
              })
              return (
                <Tile
                  key={`${x}-${y}`}
                  active={grid[x][y].active || hovered}
                  onClick={() => selectTile(x, y)}
                  onMouseEnter={() => handleHover(x, y)}
                />
              )
            })
          )
        })}
      </Grid>
      <ButtonContainer>
        {isActive
          ? <StopButton
              onClick={startSimulation}
            >
              <span />
            </StopButton>
          : <>
              <Button onClick={() => setIsActive(true)}>Start</Button>
              <Button onClick={handleClear}>Clear</Button>
            </>
        }
      </ButtonContainer>
    </Container>
  )
}