// modalEventHandler.js
import { Modal } from './modal.js'
import {
  loadReportData,
  getVerticalBarChartData,
  initVerticalBarChart,
  getDoughnutChartData,
  initDoughnutChart,
} from './reportVisualization.js'

document.addEventListener('DOMContentLoaded', () => {
  const modalElement = document.getElementById('guideModal')
  const guideButton = document.getElementById('guideButton')
  const closeButton = document.getElementById('modalClose')

  const guideModal = new Modal(modalElement)

  // When the Guide button is clicked, show the modal and load the charts
  guideButton.addEventListener('click', async () => {
    guideModal.show()
    const reportData = await loadReportData()
    if (reportData) {
      initVerticalBarChart(getVerticalBarChartData(reportData))
      initDoughnutChart(getDoughnutChartData(reportData))
    }
  })

  // Hide the modal when the close button is clicked
  closeButton.addEventListener('click', () => guideModal.hide())

  // Optionally: Hide the modal when clicking outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === modalElement) {
      guideModal.hide()
    }
  })
})
