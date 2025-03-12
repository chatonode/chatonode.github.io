// const DATA_COUNT = 4
// const NUMBER_CFG = { count: DATA_COUNT, min: 1, max: 100 }

const verticalBarChartLabels = ['Spain', 'Turkey', 'Belgium', 'Netherlands']
const verticalBarChartData = {
  labels: verticalBarChartLabels,
  datasets: [
    {
      label: 'Climate',
      data: [5, 9, 4, 5],
      borderColor: Utils.CHART_COLORS.green,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.green, 0.5),
    },
    {
      label: 'Gender',
      data: [1, 5, 6, 6],
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
    },
    {
      label: 'Both',
      data: [15, 8, 9, 2],
      borderColor: Utils.CHART_COLORS.yellow,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.yellow, 0.5),
    },
    {
      label: 'All',
      data: [21, 22, 19, 13],
      borderColor: Utils.CHART_COLORS.blue,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
    },
  ],
}
