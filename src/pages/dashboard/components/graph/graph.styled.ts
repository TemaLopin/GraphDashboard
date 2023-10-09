import styled from 'styled-components'
import CircularProgressWithLabel from '@mui/material/CircularProgress'

export const CircleProgress = styled(CircularProgressWithLabel)`
  stroke-linecap: round;
  transition: all 1s;
  position: absolute;
  border-radius: 50%;
  margin-top: 0;

  &:hover {
    border-radius: 0;
  }
`

export const Label = styled.div<{ color: string }>`
  text-align: center;
  margin-bottom: 20px;

  p {
    font-size: 18px;
    font-weight: 700;
  }
  span {
    font-size: 34px;
    font-weight: 700;
    color: ${({ color }) => color};
  }
`

export const Body = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 1s;

  border-radius: 50%;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    background: #00000009;
    z-index: -100;
  }

  &::after {
    content: '';
    width: 90%;
    height: 90%;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    z-index: -100;
  }
`
