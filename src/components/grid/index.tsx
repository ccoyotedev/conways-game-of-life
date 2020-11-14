import React, { useState, useEffect } from 'react';
import Button from '../button';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Grid = styled.div<{width: number, height: number}>`
  display: grid;
  border: 1px solid black;
  grid-template-columns: ${({width}) => `repeat(${width}, 10px)`};
  grid-template-rows: ${({height}) => `repeat(${height}, 10px)`};
`

const Tile = styled.div<{active: boolean}>`
  border: 0.5px solid rgba(0,0,0,0.1);
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${({active}) => active ? 'black' : 'white'};
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
}

interface IGrid {
  [x: string]: {
    [y: string]: {
      active: boolean;
    }
  }
}

export default ({height, width}: IGridConstructor) => {
  const [ grid, setGrid ] = useState<IGrid>({});
  const [ isActive, setIsActive ] = useState(false);

  useEffect(() => {
    createGrid()
  }, [height, width]);

  useEffect(() => {
    let interval: number = 0;
    if (isActive) {
      interval = setInterval(() => {
        handleStep();
      }, 250);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, grid]);

  const createGrid = () => {
    const newGrid: IGrid = {};
    for (let x = 0; x < width; x++) {
      newGrid[x.toString()] = {}
      for (let y = 0; y < height; y++) {
        newGrid[x.toString()][y.toString()] = {
          active: false,
        }
      }
    }
    setGrid(newGrid)
  }

  const handleStep = () => {
    const g = JSON.parse(JSON.stringify(grid));

    Object.keys(grid).forEach(x => {
      Object.keys(grid[x]).forEach(y => {
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
    return setGrid(g);
  }

  const handleClear = () => {
    createGrid();
    setIsActive(false);
  }

  const selectTile = (x: string, y: string) => {
    const gridCopy = {...grid};
    gridCopy[x][y].active = !gridCopy[x][y].active;
    setGrid(gridCopy);
  }

  return (
    <Container>
      <Grid height={height} width={width}>
        {Object.keys(grid).map(x => {
          return (
            Object.keys(grid[x]).map(y => {
              return (
                <Tile
                  key={`${x}-${y}`}
                  active={grid[x][y].active}
                  onClick={() => selectTile(x, y)}
                />
              )
            })
          )
        })}
      </Grid>
      <ButtonContainer>
        {isActive
          ? <StopButton
              onClick={() => setIsActive(false)}
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