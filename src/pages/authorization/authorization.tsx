import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN_USER } from '../../request/mutation/user'
import { useNavigate } from 'react-router'
import { Title, Body, Description, InputContainer, Container, Button } from './authorization.styled'
import { GET_USER_DASHBOARD } from '../../request/query/user'

const Authorization = () => {
  const { loading, error } = useQuery(GET_USER_DASHBOARD)

  const [userLogin] = useMutation(LOGIN_USER)

  const [user, setUser] = useState({
    username: '',
    password: '',
  })
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

  if (loading) return <></>

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
