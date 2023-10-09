import { useQuery } from '@apollo/client'
import { GET_USER_DASHBOARD } from '../../request/query/user'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import Header from './components/header/Header'
import { Statistic, FlexRow, Body, Container } from './dashboard.styled'
import Graph from './components/graph/Graph'
import { GraphItem, TitleT, statisticT } from './dashboard.types'

export const TITLE = {
  scenarios: 'Сценарии',
  dialogs: 'Списки',
  lists: 'Диалоги',
}

const DashboardElement = ({ data, name }: { data: any; name: TitleT }) => {
  let total = (data?.active || 0) + (data?.completed || 0) + (data?.inactive || 0) || 0

  const mainView = {
    id: name,
    title: TITLE[name],
    value: total,
    color: '',
  }
  const [hover, setHover] = useState<statisticT>(mainView)

  const setDefaultHover = () => hover?.title !== mainView.title && setHover(mainView)

  const handleGraphHover = (data: GraphItem) => {
    const newHover = statistic.find((item) => item.id === data?.name)
    if (!newHover) return
    setHover(newHover)
  }
  const statistic: statisticT[] = [
    {
      id: 'total',
      title: 'Всего:',
      value: total || 0,
      color: 'lightgrey',
    },
    {
      id: 'active',
      title: 'Активных:',
      value: data?.active || 0,
      color: '#FFC107',
    },
    {
      id: 'inactive',
      title: 'Неактивных:',
      value: data?.inactive || 0,
      color: '#E96863',
    },
    {
      id: 'completed',
      title: 'Завершенных:',
      value: data?.completed || 0,
      color: '#3BAAB0',
    },
  ]

  return (
    <Container>
      <Graph
        setDefaultHover={setDefaultHover}
        handleHover={handleGraphHover}
        hover={hover}
        name={name}
        items={statistic}
      />
      <Statistic data-animch='6'>
        {statistic.map((el) => (
          <FlexRow
            selected={el.id === hover?.id ? 'true' : 'false'}
            hoverColor={el.color}
            onMouseOut={() => setDefaultHover()}
            onMouseOver={() => setHover(el)}
          >
            <p>{el.title}</p>
            <span>{el.value}</span>
          </FlexRow>
        ))}
      </Statistic>
    </Container>
  )
}

const Dashboard = () => {
  const { data, error, refetch } = useQuery(GET_USER_DASHBOARD)
  const navigate = useNavigate()

  useEffect(() => {
    if (!error) return
    localStorage.removeItem('token')
    navigate('/login')
  }, [error])

  if (!data?.dashboard) return <></>

  return (
    <>
      <Header />
      <Body>
        {Object.entries(data?.dashboard || {}).map(([key, value]: any) => {
          return <DashboardElement data-animch='6' key={key} name={key} data={value} />
        })}
      </Body>
    </>
  )
}

export default Dashboard
