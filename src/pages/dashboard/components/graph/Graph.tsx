import { Label, CircleProgress, Body } from './graph.styled'
import { GraphItem, statisticT } from '../../dashboard.types'
import { TITLE } from '../../dashboard'

const Graph = ({
  items = [],
  name,
  hover,
  handleHover,
  setDefaultHover,
}: {
  handleHover: (data: GraphItem) => void
  setDefaultHover: () => void
  hover: statisticT
  name: 'scenarios' | 'dialogs' | 'lists'
  items: statisticT[]
}) => {
  const sortedItem = items.sort((a, b) => (a.value > b.value ? 1 : -1))
  const total = items.find((item) => item.id === 'total')?.value

  const hoverColor = items.find((it) => it.id === hover?.id)?.color
  const hasHover = items.some((item) => item.id === hover?.id)

  let endDeg = 0
  let startDeg = 0

  const graphData = sortedItem.map(({ value, id, color }) => {
    const perc = Math.round(100 * ((value || 0) / (total || 1)))

    startDeg = endDeg
    endDeg = perc

    const name = id
    const zIndex = -perc
    return { perc, color, zIndex, name, endDeg, startDeg }
  })

  const calcAngle = (x0: number, y0: number, x1: number, y1: number) => {
    return Math.atan2(y1 - y0, x1 - x0)
  }

  const radiansToDegrees = (radians: number) => {
    return radians * (180 / Math.PI)
  }

  return (
    <Body
      data-animch='3'
      onMouseOut={() => setDefaultHover()}
      onMouseMove={(e) => {
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
      <Label color={hoverColor || ''}>
        <p>{hover?.title || TITLE[name]}</p>
        <span>{hover?.value || ''}</span>
      </Label>
      {(graphData || []).map((it, ind) => {
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

export default Graph
