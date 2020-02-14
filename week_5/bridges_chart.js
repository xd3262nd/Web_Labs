
/* Get chart canvas and context */
let chartCanvas = document.querySelector('#bridges-chart')
let context = chartCanvas.getContext('2d')

// create chart object
let bridgeChart = new Chart(context, {
    type:'bar',
    data:{
        datasets: [
            {
                data: [],
                backgroundColor: []
            }
        ],
        labels: []
    },
    options: {}
})

let chartColors = ['darkcyan', 'dodgerblue', 'violet', 'slateblue', 'coral']



function addData (name, span){
    bridgeChart.data.labels.push(name)
    bridgeChart.data.datasets[0].data.push(span)

    let colorCounts = bridgeChart.data.datasets[0].backgroundColor.length

    bridgeChart.data.datasets[0].backgroundColor.push(chartColors[colorCounts % chartColors.length])



    bridgeChart.update()
}

for (var i in bridges){
    let each = bridges[i]
    let names = each.name
    let spans = each["Span(meters)"]
    addData(names,spans)
}


