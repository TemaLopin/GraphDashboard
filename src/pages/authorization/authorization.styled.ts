import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Body = styled.div`
  width: 300px;
  border: 1px solid #0004;
  border-radius: 10px;
  padding: 20px 25px;

  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Title = styled.span`
  font-size: 24px;
`
export const Description = styled.p`
  text-align: center;
  font-size: 14px;
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  input {
    margin-bottom: 30px;
    padding: 8px 10px;
    border: 1px solid #0004;
    border-radius: 8px;

    width: 80%;

    outline: none;

    &:focus {
      border: 1px solid #fbc769;
    }
  }
`

export const Button = styled.button`
  width: 100%;
  cursor: pointer;
  background-color: #fbc769;
  border: 1px solid #fbc769;
  padding: 20px 15px;
  border-radius: 100px;
`
