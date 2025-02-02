/*
 * "NotoSansJP-Black" is lisenced under the SIL Open Font License 1.1
 * https://fonts.google.com/attribution
 * http://scripts.sil.org/OFL
 */

const { ChartJSNodeCanvas } = require('chartjs-node-canvas')
const canvas = require('canvas') // point

module.exports = async (req, res) => {
  const width = 1200
  const height = 630

  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width,
    height,
    chartCallback: ChartJS => {
      // ChartJS.defaults.font.family = 'NotoSansJP-Black';
    }
  })

  // chartJSNodeCanvas.registerFont('./fonts/NotoSansJP-Black.otf', { family: 'NotoSansJP-Black' });

  const configuration = {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: value => '$' + value
            }
          }
        ]
      }
    }
  }

  const buffer = await chartJSNodeCanvas.renderToBuffer(configuration)
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length
  })
  res.end(buffer, 'binary')
}
