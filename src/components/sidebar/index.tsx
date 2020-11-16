import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div<{open: boolean, top: string}>`
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: 12px 0;
  border: 2px solid white;
  border-left: none;
  top: ${({ top }) => top};
  left: ${({open}) => open ? 0 : '-140px'};
  box-sizing: border-box;
  background-color: black;
  transition: left 300ms ease;
  z-index: ${({ open }) => open ? 100 : 10};
`

const Tab = styled.div<{open: boolean, top: string}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: ${({open}) => open ? '138px' : '-2px'};
  top: ${({ top }) => top};
  border: 2px solid white;
  border-left: none;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  width: 64px;
  height: 50px;
  cursor: pointer;
  background-color: black;
  z-index: ${({ open }) => open ? 101 : 11};
  transition: left 300ms ease;
`

interface ISidebar {
  tab: React.ReactNode;
  children: React.ReactNode;
  top: string;
}

const Sidebar = ({ tab, children, top }: ISidebar) => {
  const [ open, setOpen ] = useState(false);

  return (
    <>
      <Tab
        open={open}
        onClick={() => setOpen(!open)}
        top={top}
      >
        {tab}
      </Tab>
      <SidebarContainer open={open} top={top}>
        {children}
      </SidebarContainer>
    </>
  )
}

export default Sidebar;