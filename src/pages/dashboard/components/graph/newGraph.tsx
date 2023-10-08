import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

const colors: { [key: string]: string } = {
  active: '#E96863',
  inactive: '#FFC107',
  completed: '#3BAAB0',
  total: '#b8b8b8',
}

const TITLE = {
  scenarios: 'Сценарии',
  dialogs: 'Списки',
  lists: 'Диалоги',
}

const ChartDiagram = ({ item, hover }: any) => {
  ChartJS.register(ArcElement, Tooltip, Legend)

  const labels = ['completed', 'active', 'inactive']

  const total = labels.reduce((acc: number, it) => (item[it] ? (acc += +item[it]) : acc), 0)
  const hoveredItem = item[hover?.id]
  const hoveredPerc = 100 * (item[hover?.id] / total)
  const hoveredIndex = labels.findIndex((label) => label === hoveredItem?.id)

  const totalObject = {
    label: 'total',
  }

  let prevPerc = 0
  const itemData = labels.map((label, index) => {
    const perc = Math.round(100 * ((item[label] || 0) / (total || 1))) 
    prevPerc = perc
    return { perc, label }
  })
  // .sort((a, b) => (a.perc > b.perc || a.label === 'inactive' ? 1 : -1))

  const delta = total - item['completed']
  console.log('🚀 !@#$ total:',...itemData.map(item => item.perc))

  const data = {
    labels: hoveredItem ? [hover?.id] : itemData.map(({ label, perc }) => label + ` ${perc}`),
    onHover: (e: any, data: any) => console.log('!@#$ e, data', e, data),
    datasets: [
      {
        label: '',

        data: hoveredItem ? [hoveredItem, total - hoveredItem] : itemData.map((data) => data.perc),
        options: {
          // onmouseover: (e: any, data: any) => console.log('!@#$ e, data', e, data),
        },
        backgroundColor: [...(hoveredItem ? [{ label: hover?.id }, totalObject] : itemData)].map(
          (item) => colors[item.label]
        ),

        // borderColors: borderColors,

        borderWidth: 1,
      },
    ],
    option: {},
    cutout: '20px',
  }

  return <Doughnut data={data} />
}

export default ChartDiagram
