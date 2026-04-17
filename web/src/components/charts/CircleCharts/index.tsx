import dynamic from 'next/dynamic'
import React from 'react'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type position = 'top' | 'right' | 'bottom' | 'left'

const SyncingCharts: React.FC = () => {
  const sta = {
    series: [44, 55, 41, 17, 15],
    options: {
      legend: {
        position: 'bottom' as position,
      },
      labels: [
        'Relógio de mesa',
        'AirPods com estojo...',
        'Bosch Serra Tico-Tico',
        'Corte de cabelo...',
        'Maquiagem profissional',
      ],
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
    },
  }

  return (
    <Chart
      options={sta.options}
      series={sta.series}
      type="donut"
      height={300}
    />
  )
}

export default SyncingCharts
