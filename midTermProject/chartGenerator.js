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
}


function capitalizeLetter( string ){
    
    let str = string.value
    var pieces = str.split(" ");
    for ( var i = 0; i < pieces.length; i++ )
    {
        var j = pieces[i].charAt(0).toUpperCase();
        pieces[i] = j + pieces[i].slice(1).toLowerCase();
    }
    return pieces.join(" ");
}


function generateYear(yearInput) {
    var start_year = new Date().getFullYear();
    var choices = "";

    for(var i=start_year-1; i>start_year-20; i--){
        choices +='<option value="' + i + '">' + i + '</option>';
    }
    yearInput.innerHTML = choices;

}


function generateMonth(monthInput){
    var choices = "";

    for (var i = 0 ; i<month.length; i++){
        var num = i+1;
        if (num<10){
            choices += '<option value="0' + num + '">' + month[i] + '</option>';
        }else{
            choices += '<option value="' + num + '">' + month[i] + '</option>';
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

    var el = document.getElementById('inputYear01');
    year01 = el.options[el.selectedIndex].value

})

monthA.addEventListener('change', (e)=>{

    var el = document.getElementById('inputMonth01');
    month01 = el.options[el.selectedIndex].value
    // above this will be the user input for the selected Month they want to search for 

})

var year02;
var month02;

yearB.addEventListener('change', (e)=>{

    var el = document.getElementById('inputYear01');
    year02 = el.options[el.selectedIndex].value

    // console.log(year01) return the value of the selected year
})

monthB.addEventListener('change', (e)=>{

    var el = document.getElementById('inputMonth01');
    month02 = el.options[el.selectedIndex].value
    // above this will be the user input for the selected Month they want to search for 

})

function generate(dataA,dataB, monthList) {


    var sA = document.querySelector('#state1')
    var sB = document.querySelector('#state2')

    let stateA = capitalizeLetter(sA)
    let stateB = capitalizeLetter(sB)




    var monthLabels = []
    for(var f=0; f<monthList.length; f++){

        Object.keys(wordsMonth).forEach(function (el) {

            if(wordsMonth[el] === monthList[f]){
                monthLabels.push(el)
            }
        })

    }

    let randomColors = []

    for (let x = 0; x < monthLabels.length; x++) {
            
        // Generate random red, blue, green
        let red = Math.floor(Math.random() * 255)
        let blue = Math.floor(Math.random() * 255)
        let green = Math.floor(Math.random() * 255)
        // Create a color using rgb(r, g, b) format
        let color = `rgb(${red}, ${green}, ${blue})`
        randomColors.push(color)
    
    }

    console.log(randomColors)


    var newChart = new Chart(chart, {

        type: 'bar',
        data: {
            labels: monthLabels,
            datasets: [{
                label: stateA,
                backgroundColor: randomColors,
                yAxisID: "y-axis-1",
                data: dataA

            }, {
                label: stateB,
                backgroundColor: ['#8a8474'],
                yAxisID: "y-axis-2",
                data: dataB

            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: "Bar Chart for Fuels Net Generate at " + stateA + " and " + stateB
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
    chart.update();
}












