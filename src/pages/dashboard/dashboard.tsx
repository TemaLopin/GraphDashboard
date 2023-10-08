import { useQuery } from '@apollo/client'
import { GET_USER_DASHBOARD } from '../../request/query/user'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import Header from './components/header/Header'
import { Statistic, FlexRow, Body, Container } from './dashboard.styled'
import NewGraph, { GraphItem } from './components/graph/Graph'

const colors: any = ['', '#E96863', '#FFC107', '#3BAAB0', '#b8b8b8']
type TitleT = 'scenarios' | 'dialogs' | 'lists'
type statisticT = {
  id: string
  title: string
  value: number
}
const TITLE = {
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
  }

  const [hover, setHover] = useState<statisticT>(mainView)

  const setDefaultHover = () => hover?.title !== mainView.title && setHover(mainView)

  const handleGraphHover = (data: GraphItem) => {
    console.log(data)
    const newHover = statistic.find((item) => item.id === data?.name)
    if (!newHover) return
    setHover(newHover)
  }
  const statistic: statisticT[] = [
    {
      id: 'total',
      title: 'Всего:',
      value: total || 0,
    },
    {
      id: 'active',
      title: 'Активных:',
      value: data?.active || 0,
    },
    {
      id: 'inactive',
      title: 'Неактивных:',
      value: data?.inactive || 0,
    },
    {
      id: 'completed',
      title: 'Завершенных:',
      value: data?.completed || 0,
    },
  ]

  const ref = useRef(null)

  return (
    <Container>
      <NewGraph
        setDefaultHover={setDefaultHover}
        handleHover={handleGraphHover}
        hover={hover}
        name={name}
        item={data}
      />
      <Statistic data-animch='6'>
        {statistic.map((el, index) => (
          <FlexRow
            selected={el.id === hover?.id ? 'true' : 'false'}
            hoverColor={colors[index]}
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
    const token = localStorage.getItem('token') || ''
    if (token && !error) return
    localStorage.removeItem('token')
    navigate('/login')
  }, [error])

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
