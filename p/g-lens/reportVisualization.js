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

function getWorkAreaLabels() {
  return ['Climate & Environment', 'Gender Equality', 'Climate & Gender', 'All']
}

function getCountryLabels(data) {
  return data.reduce((unique, org) => {
    if (!unique.includes(org.country)) {
      unique.push(org.country)
    }
    return unique
  }, [])
}

function getWorkAreaData(data) {
  const countries = getCountryLabels(data)

  // Sonuçları depolamak için boş objeler oluştur
  const result = {
    1: new Array(countries.length).fill(0),
    2: new Array(countries.length).fill(0),
    3: new Array(countries.length).fill(0),
    ALL: new Array(countries.length).fill(0),
  }

  // JSON verisini döngüyle işle
  data.forEach((org) => {
    let countryIndex = countries.indexOf(org.country)
    if (countryIndex !== -1 && org.work_area) {
      let category = org.work_area
      // Increment work area counter
      result[category][countryIndex] = result[category][countryIndex] + 1
      // Increment all work areas counter
      result['ALL'][countryIndex] = result['ALL'][countryIndex] + 1
    }
  })

  return result
}

export function getVerticalBarChartData(responseData) {
  // todo: transform country enums into text representations like 'Spain', 'Turkey', 'Belgium', 'Netherlands'
  const labels = getCountryLabels(responseData)

  const workAreaData = getWorkAreaData(responseData)

  const datasets = {
    1: {
      label: 'Climate & Environment',
      data: workAreaData[1],
      borderColor: CHART_COLORS.green,
      backgroundColor: CHART_COLORS.green,
    },
    2: {
      label: 'Gender Equality',
      data: workAreaData[2],
      borderColor: CHART_COLORS.red,
      backgroundColor: CHART_COLORS.red,
    },
    3: {
      label: 'Climate & Gender',
      data: workAreaData[3],
      borderColor: CHART_COLORS.yellow,
      backgroundColor: CHART_COLORS.yellow,
    },
    ALL: {
      label: 'All',
      data: workAreaData['ALL'],
      borderColor: CHART_COLORS.blue,
      backgroundColor: CHART_COLORS.blue,
    },
  }

  const verticalBarChartData = {
    labels: [...labels],
    datasets: [datasets[1], datasets[2], datasets[3], datasets['ALL']],
  }

  return verticalBarChartData
}

export function getDoughnutChartData(responseData) {
  const doughnutChartLabels = getCountryLabels(responseData)
  const workAreaData = getWorkAreaData(responseData)
  const doughnutChartData = {
    labels: doughnutChartLabels,
    datasets: [
      {
        label: 'Country',
        data: workAreaData['ALL'],
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  }

  return doughnutChartData
}

// reportVisualization.js
export async function loadReportData() {
  try {
    // const response = await fetch('/api/reports/guide') // /all-organizations
    const response = await fetch(
      'https://genderlens4climate.com/all-organizations',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()

    return data
  } catch (err) {
    console.warn('Using dummy data due to error:', err)
    // todo: implement error case
    //
    // Dummy data for demonstration
    // return {
    //   countryReport: [
    //     { country: 'USA', count: 10 },
    //     { country: 'Germany', count: 5 },
    //   ],
    //   sectorReport: [
    //     { sector: 'Energy', count: 8 },
    //     { sector: 'Agriculture', count: 7 },
    //   ],
    //   keywordReport: [
    //     { keyword: 'sustainability', count: 12 },
    //     { keyword: 'innovation', count: 9 },
    //   ],
    //   verticalBarChartReport: {
    //     ...getDummyVerticalBarChartData(),
    //   },
    //   doughnutCharReport: {
    //     ...getDummyDoughnutChartData(),
    //   },
    // }
  }
}

export function initVerticalBarChart(verticalBarChartData) {
  // COUNTRY - ORGANIZATION DISTRIBUTION CHART (Vertical Bar Chart)
  const countryCtx = document.getElementById('countryChart').getContext('2d')
  new Chart(countryCtx, {
    type: 'bar',
    data: verticalBarChartData,
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
}

export function initDoughnutChart(doughnutChartData) {
  // COUNTRY DISTRIBUTION CHART (Doughnut Chart)
  const doughnutCtx = document.getElementById('doughnutChart').getContext('2d')
  new Chart(doughnutCtx, {
    type: 'doughnut',
    data: doughnutChartData,
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
