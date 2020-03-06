var stateIDList = 'https://api.eia.gov/category/?api_key=563a38170142e2aa6fea13b9725fa259&category_id=1'

var selectedStateA;
var energyLink = 'https://api.eia.gov/series/?api_key=563a38170142e2aa6fea13b9725fa259&series_id='

// var url ='https://api.wheretheiss.at/v1/satellites/25544'

//here

var stateA = document.querySelector('#state1')
var stateB = document.querySelector('#state2')

var buttonEl = document.querySelector("#Generate")

var dataSetA = [];


// TODO Need to build the app properly. Need to have two date inputs and then arrange them properly 
//  TODO then need to put them into an array and build an array that will form a list of the date 
//  TODO that can be loop over and put into the right key with the right value so can be transferred to the chart.js


// TODO overview: grab the user input start period and end period then construct an array complete list of date 
// TODO: then need to build dictionary or objects so can place the right value into the right key(this will be the period)
var dateList = []

buttonEl.addEventListener("click", () => {

    // ! https://www.eia.gov/opendata/qb.php?category=1&sdid=ELEC.GEN.ALL-AL-99.A

    var inputA = stateA.value.toLowerCase()

    var yearAValue = yearA.options[yearA.selectedIndex].value
    var yearBValue = yearB.options[yearB.selectedIndex].value

    var monthAValue = monthA.options[monthA.selectedIndex].value
    var monthBValue = monthB.options[monthB.selectedIndex].value



    // console.log(yearArray)
    // console.log(yearMonthTotal) 
    // 0: "201901"
    // 1: "201902"
    // 2: "201903"
    // 3: "201904"
    // 4: "201905"
    // 5: "201906"
    // 6: "201907"
    // 7: "201908"
    // 8: "201909"
    // 9: "201910"
    // 10: "201911"
    // 11: "201912"
    // 12: "201801"
    // 13: "201802"



  

    var endDateList = []

    var indexList = [] //arrange the end date first then start date last 

    // var startYear = yearA.options[yearA.selectedIndex].value + monthA.options[monthA.selectedIndex].value
    // // console.log(monthYearA)
    // var endYear = yearB.options[yearB.selectedIndex].value + monthB.options[monthB.selectedIndex].value

    if (yearAValue > yearBValue){
        
        alert('please enter the correct order of year ')
    } else if (yearAValue === yearBValue){

        if(monthAValue > monthBValue){
            alert('put valid month')
        }else{

           



            // combine(monthAValue, monthBValue, yearAValue, yearBValue)
            start = yearAValue + monthAValue //201901
            end = yearBValue + monthBValue //201912

            // for(var i = start; i<end+1; i++){
            //     dateList.push(i)
            // }

            dateList = indexFunction (start, end)
            console.log(dateList)



            // //getting the index of each date from the yMtotal
            // for( var i =0; i<yearMonthTotal.length; i++){
            //     if(yearMonthTotal[i] === end){
            //         dateList.unshift(i)
            //     }else if(yearMonthTotal[i] === start){
            //         dateList.push(i)
            //     }
            // }



        }

    }else{

        startYear = yearAValue + monthAValue
        endYear = yearBValue + monthBValue


        dateList = indexFunction(startYear, endYear)
        console.log(dateList)

        // for( var j = 0; j < yearMonthTotal.length; j++){

        //     if( yearMonthTotal[j] == endYear){
        //         dateList.unshift(j)
        //         console.log(dateList + "endYear")

        //     }else if(yearMonthTotal[j] == startYear){
        //         dateList.push(j)
        //         console.log(dateList + "startyear")
        //     }
        // }
        
        // yearMonthTotal[i]


    }
    // console.log(dateList)

        var letters = /^[A-Z a-z]+$/;

        //  TODO Need to add the inputB (second state value in here too!)
        if (!inputA) {
            stateA.value = ''
            alert('Please enter your input')
        } else if (!inputA.match(letters)) {

            stateA.value = ''
            alert('Please enter letter only!')
        } else {

            retrieveID(inputA, start, end)

        }   
    
})

console.log(dateList)



function indexFunction(start, end){

    var ar = []

    for(var i = 0; i<yearMonthTotal.length; i++){
        if(yearMonthTotal[i] === end){
            ar.unshift(i)
            console.log(ar + " hello")
        }else if(yearMonthTotal[i] === start ){
            ar.push(i)
            console.log(ar + " hello")

        }
    }

    console.log(ar)




    return ar

}

function retrieveID(input, startYear, endYear) {
    fetch(stateIDList)
        .then(res => res.json())
        .then(stateData => {

            stateData.category.childseries.forEach(function(element, index) {
                //console.log(element.name) get all the name of the list
                var dataNameList = element.name.toLowerCase()

                if (dataNameList.includes(input) && dataNameList.includes('monthly')) {

                    let stateID = element.series_id //id to get the specific data for the state


                    if (stateID.match('.M')) {
                        retrieveData(stateID, startYear, endYear)

                    }

                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

function retrieveData(id, startYear, endYear) {

    // creating a key:value to store the data into 
    

    fetch(energyLink + id)
        .then(resultA => resultA.json())
        .then(dataA => {

            // console.log(dataA)
            // console.log(dataA.series[0].data) //produce array of all the data 
            //data in the form of this
            //0: (2) ["201912", 571.24533]
            // 1: (2) ["201911", 527.86132]
            dataA.series[0].data.forEach(function(el, index) {


                // if(el[o])

                // ! How can I keep on adding based on the validation?
                if (el[0] <= "201906" && el[0] >= "201901" ) {

                    dataSetA.push(el[1])
                    console.log(dataSetA) //this is the dataset of the value 
                    // el[0] will be the user input of the year and month in it 

                    generate(dataSetA)

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