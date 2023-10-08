import styled from 'styled-components'
import styledMUI from '@emotion/styled'
import CircularProgressWithLabel from '@mui/material/CircularProgress'
import { Label, CircleProgress, Body } from './graph.styled'
import { useRef } from 'react'

const colors = ['#E96863', '#FFC107', '#3BAAB0', '#b8b8b8']

const TITLE: { [key: string]: string } = {
  scenarios: 'Сценарии',
  dialogs: 'Списки',
  lists: 'Диалоги',
}

type statisticT = {
  id: string
  title: string
  value: number
}
export type GraphItem = {
  perc: number
  color: string
  zIndex: number
  name: string
  endDeg: number
  startDeg: number
}

const NewGraph = ({
  item = {},
  name,
  hover = { id: '', title: '', value: 0 },
  handleHover,
  setDefaultHover,
}: {
  handleHover: (data: GraphItem) => void
  setDefaultHover: () => void
  hover: statisticT
  name: string
  item: { [key: string]: number }
}) => {
  const sortedItem = Object.entries(item).sort((a: any, b: any) => (a[1] > b[1] ? 1 : -1))
  const total = (item?.active || 0) + (item?.completed || 0) + (item?.inactive || 0) || 0

  const hasHover = !!item[hover?.id] || hover?.id === 'total'
  

  let endDeg = 0
  let startDeg = 0

  const graphData = sortedItem.map(([name, value], index) => {
    const perc = Math.round(100 * ((value || 0) / (total || 1)))

    startDeg = endDeg
    endDeg = perc

    const color = colors[index]
    const zIndex = -perc
    return { perc, color, zIndex, name, endDeg, startDeg }
  })

  const totalProgress = {
    name: 'total',
    perc: 100,
    color: 'lightgrey',
    zIndex: -100,
    startDeg: 0,
    endDeg: 0,
  }


  const calcAngle = (x0: number, y0: number, x1: number, y1: number) => {
    return Math.atan2(y1 - y0, x1 - x0)
  }

  const radiansToDegrees = (radians: number) => {
    return radians * (180 / Math.PI)
  }
  const hoverIndex = graphData?.findIndex((it: any) => it?.name === hover?.id)


  return (
    <Body
      // data-animch='6'
      onMouseOut={() => setDefaultHover()}
      onMouseMove={(e: any) => {
        if (hasHover) return
        const x1 = e.nativeEvent.offsetX
        const y1 = e.nativeEvent.offsetY
        const deg = radiansToDegrees(calcAngle(100, 100, x1, y1)) + 90
        const perc = deg > 0 ? deg / 3.6 : (deg + 360) / 3.6
        const t = graphData.find((item) => item.endDeg > perc && item.startDeg < perc)
        if (!t) return
        handleHover(t)
      }}
    >
      <Label color={colors[hoverIndex]}>
        <p>{hover?.title || TITLE[name || '']}</p>
        <span>{hover?.value || ''}</span>
      </Label>
      {([totalProgress, ...graphData] || []).map((it, ind) => {
        return (
          <CircleProgress
            key={ind}
            style={{
              color: hasHover ? (hover?.id === it?.name ? it.color : 'transparent') : it.color,
              zIndex: it.zIndex,
              rotate: hover?.id === it?.name ? 0 + 'deg' : it.startDeg * 3.6 + 'deg',
            }}
            thickness={2}
            size={200}
            disableShrink={true}
            variant='determinate'
            value={hover?.id === it?.name ? it.perc : it.perc - it.startDeg}
          />
        )
      })}
    </Body>
  )
}

export default NewGraph
