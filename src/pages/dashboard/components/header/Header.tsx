import { useQuery } from '@apollo/client'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { LogoutIcon } from '../../../../assets/logout'
import { GET_USER_DASHBOARD } from '../../../../request/query/user'

const HeaderContainer = styled.div`
  width: 960px;
  margin: 0px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0px;
  }
  div {
    display: flex;
    cursor: pointer;
    align-items: center;

    transition: all 0.3s;
    border-bottom: 1px solid #fff;

    svg {
      margin-left: 10px;
      width: 20px;
      height: 20px;
    }
    &:hover {
      border-bottom: 1px solid #000;
    }
  }
`

const Header = () => {
  const { data } = useQuery(GET_USER_DASHBOARD)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <HeaderContainer data-animch='6'>
      <h1>Dashboard</h1>
      <div onClick={handleLogout}>
        <p>{data?.me?.username}</p>
        <LogoutIcon />
      </div>
    </HeaderContainer>
  )
}

export default Header
