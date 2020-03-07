var stateIDList = 'https://api.eia.gov/category/?api_key=563a38170142e2aa6fea13b9725fa259&category_id=1'

var selectedStateA;
var energyLink = 'https://api.eia.gov/series/?api_key=563a38170142e2aa6fea13b9725fa259&series_id='

// var url ='https://api.wheretheiss.at/v1/satellites/25544'


var stateA = document.querySelector('#state1')
var stateB = document.querySelector('#state2')

var buttonEl = document.querySelector("#Generate")

var dataSetA = [];


// // TODO Need to build the app properly. Need to have two date inputs and then arrange them properly 
// //  TODO then need to put them into an array and build an array that will form a list of the date 
// //  TODO that can be loop over and put into the right key with the right value so can be transferred to the chart.js


// // TODO overview: grab the user input start period and end period then construct an array complete list of date 
// // TODO: then need to build dictionary or objects so can place the right value into the right key(this will be the period)
var dateList = []

buttonEl.addEventListener("click", () => {

    // ! https://www.eia.gov/opendata/qb.php?category=1&sdid=ELEC.GEN.ALL-AL-99.A

    var inputA = stateA.value.toLowerCase()
    var inputB = stateB.value.toLowerCase()


    var yearAValue = yearA.options[yearA.selectedIndex].value
    var yearBValue = yearB.options[yearB.selectedIndex].value

    var monthAValue = monthA.options[monthA.selectedIndex].value
    var monthBValue = monthB.options[monthB.selectedIndex].value

    // console.log(yearMonthTotal) 

    // var startYear = yearA.options[yearA.selectedIndex].value + monthA.options[monthA.selectedIndex].value
    // // console.log(monthYearA)
    // var endYear = yearB.options[yearB.selectedIndex].value + monthB.options[monthB.selectedIndex].value

    if (yearAValue > yearBValue){
        alert('please enter the correct order of year ')

    } else if (yearAValue === yearBValue){


        // * this will be when having the same year

        if(monthAValue > monthBValue){
            alert('put valid month')
        }else{


            // combine(monthAValue, monthBValue, yearAValue, yearBValue)
            start = yearAValue + monthAValue //201901
            end = yearBValue + monthBValue //201912

            dateList = indexFunction (start, end)
            dateList.push(yearAValue, monthAValue, yearBValue, monthBValue)


            console.log(dateList)



        }

    }else{

        // * this is when the year is different 

        //combining the monthYear together
        startYear = yearAValue + monthAValue
        endYear = yearBValue + monthBValue


        //return list of index will have endDate first and startDate last
        dateList = indexFunction(startYear, endYear)
        dateList.push(yearAValue, monthAValue, yearBValue, monthBValue)
        console.log(dateList)

    }
    // console.log(dateList)

        var letters = /^[A-Z a-z]+$/;

        //  TODO Need to add the inputB (second state value in here too!)
        if (!inputA || !inputB) {
            stateA.value = ''
            alert('Please enter your input')
        } else if (!inputA.match(letters) || !inputB.match(letters)) {

            stateA.value = ''
            alert('Please enter letter only!')
        } else {

            retrieveID(inputA,dateList)
            retrieveID(inputB, dateList)

        }   
    
})

// console.log(dateList)



function indexFunction(start, end){

    var ar = []

    for(var i = 0; i<yearMonthTotal.length; i++){
        if(yearMonthTotal[i] === end){
            ar.unshift(i)
            console.log(ar + " start")
        }else if(yearMonthTotal[i] === start ){
            ar.push(i)
            console.log(ar + " hello")

        }
    }
    // console.log(ar)
    return ar

}

function retrieveID(stateName, indexList) {

    fetch(stateIDList)
        .then(res => res.json())
        .then(stateData => {

            stateData.category.childseries.forEach(function(element, index) {
                //console.log(element.name) get all the name of the list
                var dataNameList = element.name.toLowerCase()

                if (dataNameList.includes(stateName) && dataNameList.includes('monthly')) {

                    let stateID = element.series_id //id to get the specific data for the state


                    if (stateID.match('.M')) {
                        retrieveData(stateID, indexList)

                    }

                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

function retrieveData(id, indexList) {

    // creating a key:value to store the data into 
    var listA = {}
    var listB = {}
    var listAData = []
    

    fetch(energyLink + id)
        .then(resultA => resultA.json())
        .then(data => {

            // console.log(dataA)
            // console.log(dataA.series[0].data) //produce array of all the data 
            //data in the form of this
            //0: (2) ["201912", 571.24533]
            // 1: (2) ["201911", 527.86132]
            data.series[0].data.forEach(function(el, index) {

                console.log(el) // el is the each array of ["201911", 15065.73011] 
                //for loop here will go through each value [0]: key , [1] is the value 
                // for (var i = 0; i < el.length; i++){
                //     console.log(el[i])
                // }


                // console.log(indexList[1]) //this is the startYear
                // console.log(indexList[0]) //endYear


                if(index >= indexList[0] && index <= indexList[1]){
                    listAData.unshift(el[1])
                    console.log(listAData)
                    listA['"'+el[0]+ '"'] = el[1]  //this will add " "  to the year and month 
                    // ex: "201912"
                    console.log(listA) //this is the objects of key and value 
                }

                

                // console.log(el[0]) //print out all the date in the form of this --> 201912....
                // console.log(el[1]) //print out the value 
                // console.log(index) // index for the selected data
            })


        })
        .catch(err => {
            console.log(err)
        })
        


}








// getting this message [Violation] 'click' handler took 1372ms
