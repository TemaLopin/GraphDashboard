import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LOGIN_USER } from '../../request/mutation/user'
import { useNavigate } from 'react-router'

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Body = styled.div`
  width: 300px;
  border: 1px solid #0004;
  border-radius: 10px;
  padding: 20px 25px;

  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.span`
  font-size: 24px;
`
const Description = styled.p`
  text-align: center;
  font-size: 14px;
`

const InputContainer = styled.div`
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

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  background-color: #fbc769;
  border: 1px solid #fbc769;
  padding: 20px 15px;
  border-radius: 100px;
`

const Authorization = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const [userLogin] = useMutation(LOGIN_USER)
  // const { data, loading, error, refetch } = useQuery(GET_USER_DATA)
  const navigate = useNavigate()

  const handleChangeUser = (data: { [key: string]: string }) => setUser({ ...user, ...data })

  const handleSubmit = async () => {
    try {
      if (!user.password || !user.username) return
      const { data } = await userLogin({ variables: user })
      const { login } = data
      localStorage.setItem('token', login.token)
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <Body data-animch='3'>
        <Title>Вход</Title>
        <Description>Уникальная технология доступная для вашего бизнеса уже сейчас!</Description>
        <InputContainer>
          <input
            placeholder='Логин'
            value={user.username}
            onChange={({ target: { value: username } }) => handleChangeUser({ username })}
          />
          <input
            placeholder='Пароль'
            type='password'
            value={user.password}
            onChange={({ target: { value: password } }) => handleChangeUser({ password })}
          />
        </InputContainer>
        <Button onClick={handleSubmit} type='button'>
          Войти
        </Button>
      </Body>
    </Container>
  )
}

export default Authorization
