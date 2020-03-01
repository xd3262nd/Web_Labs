var chart = document.getElementById('resultChart').getContext('2d');



function generate (dataList){
    var newChart = new chart(chart, {

    type: 'bar',
    data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [{
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#FF5733"],
            yAxisID: "y-axis-1", 
            data: dataList
        }, {
            label: 'Dataset 2', 
            backgroundColor: ['#8a8474'],
            yAxisID: "y-axis-2", 
            data: dataList

        }]
    },
    options: {
        responsive: true,
        title:{
            display:true,
            text:"Chart.js Bar Chart - Multi Axis"
        },
        tooltips: {
            mode: 'index',
            intersect: true
        },
        scales: {
            yAxes: [{
                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: "left",
                id: "y-axis-1",
            }, {
                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: "right",
                id: "y-axis-2",
                gridLines: {
                    drawOnChartArea: false
                }
            }],
        }
    }



})}


