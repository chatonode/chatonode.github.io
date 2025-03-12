// import { verticalBarChartData } from './chart-data'

// import colorLib from '@kurkle/color'

// export function transparentize(value, opacity) {
//   var alpha = opacity === undefined ? 0.5 : 1 - opacity
//   return colorLib(value).alpha(alpha).rgbString()
// }

export const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
}

const NAMED_COLORS = [
  CHART_COLORS.red,
  CHART_COLORS.orange,
  CHART_COLORS.yellow,
  CHART_COLORS.green,
  CHART_COLORS.blue,
  CHART_COLORS.purple,
  CHART_COLORS.grey,
]

export function namedColor(index) {
  return NAMED_COLORS[index % NAMED_COLORS.length]
}

function getDummyVerticalBarChartData() {
  const verticalBarChartLabels = ['Spain', 'Turkey', 'Belgium', 'Netherlands']
  const verticalBarChartData = {
    labels: verticalBarChartLabels,
    datasets: [
      {
        label: 'Climate',
        data: [5, 9, 4, 5],
        borderColor: CHART_COLORS.green,
        backgroundColor: CHART_COLORS.green, // transparentize(CHART_COLORS.green, 0.5),
      },
      {
        label: 'Gender',
        data: [1, 5, 6, 6],
        borderColor: CHART_COLORS.red,
        backgroundColor: CHART_COLORS.red, // transparentize(CHART_COLORS.red, 0.5),
      },
      {
        label: 'Both',
        data: [15, 8, 9, 2],
        borderColor: CHART_COLORS.yellow,
        backgroundColor: CHART_COLORS.yellow, // transparentize(CHART_COLORS.yellow, 0.5),
      },
      {
        label: 'All',
        data: [21, 22, 19, 13],
        borderColor: CHART_COLORS.blue,
        backgroundColor: CHART_COLORS.blue, // transparentize(CHART_COLORS.blue, 0.5),
      },
    ],
  }

  return verticalBarChartData
}

function getDummyDoughnutChartData() {
  const doughnutChartLabels = ['Spain', 'Turkey', 'Belgium', 'Netherlands']
  const doughnutChartData = {
    labels: doughnutChartLabels,
    datasets: [
      {
        label: 'Country',
        data: [21, 22, 19, 13],
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  }

  return doughnutChartData
}

// reportVisualization.js
export async function loadReportData() {
  try {
    const response = await fetch('/api/reports/guide')
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    return data
  } catch (err) {
    console.warn('Using dummy data due to error:', err)
    // Dummy data for demonstration
    return {
      countryReport: [
        { country: 'USA', count: 10 },
        { country: 'Germany', count: 5 },
      ],
      sectorReport: [
        { sector: 'Energy', count: 8 },
        { sector: 'Agriculture', count: 7 },
      ],
      keywordReport: [
        { keyword: 'sustainability', count: 12 },
        { keyword: 'innovation', count: 9 },
      ],
      verticalBarChartReport: {
        ...getDummyVerticalBarChartData(),
      },
      doughnutCharReport: {
        ...getDummyDoughnutChartData(),
      },
    }
  }
}

export function initCharts(reportData) {
  // COUNTRY DISTRIBUTION CHART (Bar Chart)
  // const countryCtx = document.getElementById('countryChart').getContext('2d')
  // const countryLabels = reportData.countryReport.map((item) => item.country)
  // const countryData = reportData.countryReport.map((item) => item.count)
  // new Chart(countryCtx, {
  //   type: 'bar',
  //   data: {
  //     labels: countryLabels,
  //     datasets: [
  //       {
  //         label: 'Organizations by Country',
  //         data: countryData,
  //         backgroundColor: 'rgba(75, 192, 192, 0.6)',
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: true,
  //   },
  // })

  // // SECTOR DISTRIBUTION CHART (Pie Chart)
  // const sectorCtx = document.getElementById('sectorChart').getContext('2d')
  // const sectorLabels = reportData.sectorReport.map((item) => item.sector)
  // const sectorData = reportData.sectorReport.map((item) => item.count)
  // new Chart(sectorCtx, {
  //   type: 'pie',
  //   data: {
  //     labels: sectorLabels,
  //     datasets: [
  //       {
  //         label: 'Organizations by Sector',
  //         data: sectorData,
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.6)',
  //           'rgba(54, 162, 235, 0.6)',
  //           'rgba(255, 206, 86, 0.6)',
  //           'rgba(75, 192, 192, 0.6)',
  //         ],
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: true,
  //   },
  // })

  // KEYWORDS FREQUENCY CHART (Horizontal Bar Chart)
  const keywordCtx = document.getElementById('keywordChart').getContext('2d')
  const keywordLabels = reportData.keywordReport.map((item) => item.keyword)
  const keywordData = reportData.keywordReport.map((item) => item.count)
  new Chart(keywordCtx, {
    type: 'bar',
    data: {
      labels: keywordLabels,
      datasets: [
        {
          label: 'Keywords Frequency',
          data: keywordData,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
      ],
    },
    options: {
      responsive: true,
      indexAxis: 'y',
    },
  })

  // COUNTRY - ORGANIZATION DISTRIBUTION CHART (Vertical Bar Chart)
  const countryCtx = document.getElementById('countryChart').getContext('2d')
  // todo: uncomment & implement below after endpoint is ready
  // const countryLabels = reportData.countryReport.map((item) => item.country)
  // const countryData = reportData.countryReport.map((item) => item.count)
  new Chart(countryCtx, {
    type: 'bar',
    data: reportData.verticalBarChartReport,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Country by Organization Distribution Chart',
        },
      },
    },
  })

  // COUNTRY DISTRIBUTION CHART (Doughnut Chart)
  const sectorCtx = document.getElementById('sectorChart').getContext('2d')
  // todo: uncomment & implement below after endpoint is ready
  // const countryLabels = reportData.countryReport.map((item) => item.country)
  // const countryData = reportData.countryReport.map((item) => item.count)
  new Chart(sectorCtx, {
    type: 'doughnut',
    data: reportData.doughnutCharReport,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Country Chart',
        },
      },
    },
  })
}
