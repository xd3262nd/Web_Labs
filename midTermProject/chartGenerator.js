var chart = document.getElementById('resultChart').getContext('2d');

var yearArray = [];
var monthArray = ["12", "11", "10", "09", "08", "07", "06", "05", "04", "03", "02", "01"];

var yearMonthTotal = [];

var month = new Array();

month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";


var wordsMonth = {}
let counts = 11

for(var x=0; x<month.length; x++){

   if(x<10){
       wordsMonth[month[x]] = monthArray[counts]
       
   }else{
        wordsMonth[month[x]] = monthArray[counts]
        
   }
    counts = counts - 1
//    console.log(wordsMonth) {January: "01"}
//  Object.keys(wordsMonth).forEach(function (el) {
    //  console.log(el) //this will be the key
    //  console.log(wordsMonth[key]) //this is the value "01"....

// })
}

function generateYear(yearInput) {
    var start_year = new Date().getFullYear();
    var choices = "";

    for(var i=start_year-1; i>start_year-20; i--){
        choices +='<option value="' + i + '">' + i + '</option>';
    }

    //here
    yearInput.innerHTML = choices;

}


function generateMonth(monthInput){
    // var start_month = January

    var choices = "";


    
    // console.log(month[0])

    for (var i = 0 ; i<month.length; i++){
        var num = i+1;
        if (num<10){
            choices += '<option value="0' + num + '">' + month[i] + '</option>';
            // console.log(choices)
        }else{
            choices += '<option value="' + num + '">' + month[i] + '</option>';
            // console.log(choices)
        }
        
        
    }

    monthInput.innerHTML = choices
}

var yearA = document.getElementById('inputYear01')
var monthA = document.getElementById('inputMonth01')

var yearB = document.getElementById('inputYear02')
var monthB = document.getElementById('inputMonth02')

generateYear(yearA)
generateYear(yearB)

generateMonth(monthA)
generateMonth(monthB)


for(var i=0, l=yearA.childNodes.length; i<l; i++){
    if (yearA.childNodes[i].nodeName === 'OPTION') yearArray.push(yearA.childNodes[i].value)

}


for(var a = 0; a<yearArray.length; a++){
   prob(yearArray[a])
   
}

function prob(year){

    for(var b=0; b<monthArray.length; b++){
        var yearMonth = year+monthArray[b]
        yearMonthTotal.push(yearMonth)
    }

}

var year01;
var month01;

yearA.addEventListener('change', (e)=>{
    // TODO Should I try to create a new function for this?

    var el = document.getElementById('inputYear01');
    year01 = el.options[el.selectedIndex].value

    // console.log(year01)
    // alert(year01)
    // console.log(year01) return the value of the selected year
})

monthA.addEventListener('change', (e)=>{

    var el = document.getElementById('inputMonth01');
    month01 = el.options[el.selectedIndex].value
    // above this will be the user input for the selected Month they want to search for 
    // console.log(month01)
})

var year02;
var month02;

yearB.addEventListener('change', (e)=>{
    // TODO Should I try to create a new function for this?

    var el = document.getElementById('inputYear01');
    year02 = el.options[el.selectedIndex].value

    // console.log(year01)
    // alert(year01)
    // console.log(year01) return the value of the selected year
})

monthB.addEventListener('change', (e)=>{

    var el = document.getElementById('inputMonth01');
    month02 = el.options[el.selectedIndex].value
    // above this will be the user input for the selected Month they want to search for 
    // console.log(month01)
})




function generate(dataA,dataB, monthList) {

    // TODO Process the data here!

    var monthLabels = []
    for(var f=0; f<monthList.length; f++){

        Object.keys(wordsMonth).forEach(function (el) {

            if(wordsMonth[el] ===monthList[f]){
                monthLabels.push(el)
            }
        })
            //  console.log(el) //this will be the key
            //  console.log(wordsMonth[key]) //this is the value "01"....
    }
    

    var newChart = new Chart(chart, {

        type: 'bar',
        data: {
            labels: monthLabels,
            datasets: [{
                label: 'state 1',
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#FF5733"],
                yAxisID: "y-axis-1",
                // ! DATA is here
                data: dataA

            }, {
                label: 'state 2',
                backgroundColor: ['#8a8474'],
                yAxisID: "y-axis-2",
                // ! DATA is here
                data: dataB

            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: "Chart.js Bar Chart - Multi Axis"
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



    })
}












