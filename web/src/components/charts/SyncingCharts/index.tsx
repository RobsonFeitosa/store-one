import dynamic from 'next/dynamic'
import React from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const SyncingCharts: React.FC = () => {
  const sta = {
    series: [
      {
        name: 'series-1',
        data: [30, 15, 45, 50, 49, 150, 70, 91, 22, 55, 88],
      },
    ],
    options: {
      chart: {
        height: 160,
        defaultLocale: 'pt',
        locales: [
          {
            name: 'pt',
            options: {
              months: [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ],
              shortMonths: [
                'Jan',
                'Fev',
                'Mar',
                'Abr',
                'Mai',
                'Jun',
                'Jul',
                'Ago',
                'Set',
                'Out',
                'Nov',
                'Dez',
              ],
              days: [
                'Domingo',
                'Segunda',
                'Terça',
                'Quarta',
                'Quinta',
                'Sexta',
                'Sábado',
              ],
              shortDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Quin', 'Sex', 'Sab'],
              toolbar: {
                download: 'Baixar SVG',
                selection: 'Selecionar',
                selectionZoom: 'Selecionar Zoom',
                zoomIn: 'Ampliar',
                zoomOut: 'Reduzir',
                pan: 'Panning',
                reset: 'Redefinir Zoom',
              },
            },
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      toolbar: {
        tools: {
          selection: false,
        },
      },
      markers: {
        size: 6,
        hover: {
          size: 10,
        },
      },
      tooltip: {
        followCursor: false,
        theme: 'dark',
        x: {
          show: false,
        },
        marker: {
          show: false,
        },
        y: {
          title: {
            formatter() {
              return ''
            },
          },
        },
      },
      yaxis: {
        tickAmount: 2,
      },
    },
  }

  return (
    <Chart options={sta.options} series={sta.series} type="line" height={260} />
  )
}

export default SyncingCharts
