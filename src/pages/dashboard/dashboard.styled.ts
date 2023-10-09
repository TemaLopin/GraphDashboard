import styled from 'styled-components'

export const Container = styled.div`
  min-width: 200px;
  min-height: 400px;

  margin-right: 20px;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`
export const Body = styled.div`
  width: 900px;

  margin: 0px auto;
  margin-top: 20px;
  padding: 30px;

  border: 1px solid #0004;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
`

export const Statistic = styled.div`
  width: 100%;
`
export const FlexRow = styled.div<{ selected: string; hoverColor: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 10px;

  ${({ selected, hoverColor }) => selected === 'true' && `color: ${hoverColor};`}

  p,span {
    cursor: pointer;
    ${({ selected }) => selected === 'true' && ' text-decoration: underline;'}
  }

  p {
    margin: 0px;
  }
`
