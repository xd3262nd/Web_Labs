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
            // dateList.push(yearAValue, monthAValue, yearBValue, monthBValue)


            console.log(dateList)



        }

    }else{

        // * this is when the year is different 

        //combining the monthYear together
        startYear = yearAValue + monthAValue
        endYear = yearBValue + monthBValue



        //return list of index will have endDate first and startDate last
        dateList = indexFunction(startYear, endYear)
        // dateList.push(yearAValue, monthAValue, yearBValue, monthBValue)
        console.log(dateList)

    }

    var letters = /^[A-Z a-z]+$/;

    var idA;
    var idB;

    var dataSetA = {};
    var dataSetB = {};

    if (!inputA || !inputB) {
        stateA.value = ''
        alert('Please enter your input')
    } else if (!inputA.match(letters) || !inputB.match(letters)) {

        stateA.value = ''
        alert('Please enter letter only!')
    } else {

        retrieveID(inputA,dateList, dataProcess)
        retrieveID(inputB,dateList, dataProcess)

        // let idA = dataProcess(dataSETAPI, inputA)
        // let idB = dataProcess(dataSETAPI, inputB)
        // console.log(idA, idB)

        // retrieveData(idA, dateList)

        // retrieveData(idB, dateList)

        // retrieveID(inputB, dateList)

        //retrieveData(idA, idB, dateList) // TODO maybe can return list A objects with keys then combine in another function that will call generate()

        // retrieveData(idA, dateList,retrieveData )
        // dataSetB = retrieveData(idB, dateList)

        // conversion(dataSetA, dataSetB)

        // function getCatFact(callback){ // argument is a function
        //     fetch('https://catfact.ninja/fact')
        //     .then(data => data.json())
        //     .then(factJson => {
        //        // Call the function provided as an argument
        //       callback(factJson)
        //     })
            
        //     alert('end of getCatFact function') // this is the first alert you will see
        //     }
            
            
        //   // Call function, provide another function as an argument
        //     getCatFact(function(){
        //       alert('fact is: ' + fact) //second alert  
        //     })


        // function functionOne(x) { alert(x); }

        // function functionTwo(var1, callback) {
        //     callback(var1);		
        // }

        // functionTwo(2, functionOne);


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


function retrieveID(stateName, indexList, callback) {

    // let stateID;
    
    fetch(stateIDList).then(res => {
        console.log(res)
        return res.json()
    })
    .then(stateData => {
        console.log(stateData)

            // stateData.category.childseries.forEach(function(element, index) {
            //     //console.log(element.name) get all the name of the list
            //     var dataNameList = element.name.toLowerCase()

            //     if (dataNameList.includes(stateName) && dataNameList.includes('monthly')) {

            //         let stateID = element.series_id //id to get the specific data for the state


            //         if (stateID.match('.M')) {
            //             // retrieveData(stateID, indexList)
            //             //console.log(stateID)
            //             //return stateID
            //             callback(stateID, indexList)


            //         }

            //     }
            // })
            let test = [1,2,3,4,5];
            // callback(stateData, stateName)
            callback(stateData, stateName, indexList)
            console.log('inside retriveID')


        })
        .catch(err => {
            console.log(err)
            //return err
        })

   // return stateID

}
let idA;
let idB;

function dataProcess(dataSet, stateName, indexList){

    dataSet.category.childseries.forEach(function(element, index) {
        //console.log(element.name) get all the name of the list
        var dataNameList = element.name.toLowerCase()

        if (dataNameList.includes(stateName) && dataNameList.includes('monthly')) {

            let stateID = element.series_id //id to get the specific data for the state


            console.log(stateID)
            console.log(indexList)
            retrieveData(stateID, indexList)


            // return stateID
            // if (stateID.match('.M')) {
            //     // retrieveData(stateID, indexList)
            //     //console.log(stateID)
            //     return stateID
            //     // callback(stateID, indexList)


            // }

        }



    })
    // return stateID


}

function retrieveData(id, indexList) {
    console.log(id + 'the state id')


    //indexList is the index number of the DATE
    

    // creating a key:value to store the data into 
    var listA = {}
    var listB = {}
    var listAData = []
    var listBData = []
    
    fetch(energyLink + id).then(res =>{
        console.log(res)
        return res.json()
    })
    .then(datas => {

        console.log(datas)

            // console.log(dataA)
            // console.log(dataA.series[0].data) //produce array of all the data 
            //data in the form of this
            //0: (2) ["201912", 571.24533]
            // 1: (2) ["201911", 527.86132]
            datas.series[0].data.forEach(function(el, index) {

                console.log(el) // el is the each array of ["201911", 15065.73011] 
                //for loop here will go through each value [0]: key , [1] is the value 
     
                if(index >= indexList[0] && index <= indexList[1]){
                    listAData.unshift(el[1])
                    // console.log(listAData)
                    listA[el[0]] = el[1]  //this will add " "  to the year and month 
                    // ex: "201912"
                    console.log(listA + " the object list for " + id) //this is the objects of key and value 
                    // console.log(Object.keys(listA)) //get the object keys
                    // callback(listA)
                    
                }
                



                
               

                // console.log(el[0]) //print out all the date in the form of this --> 201912....
                // console.log(el[1]) //print out the value 
                // console.log(index) // index for the selected data

                // transfer(listA)
            })
            let distance = indexList[1] - indexList[0] + 1;

            objectLenght = Object.keys(listA).length; 
            if(objectLenght == distance){
                transfer(listA)
            }

    })
    .catch(err => {
        console.log(err)
    })
        


    //return listA
}

let setA = {}
let setB = {}

let count = 0

function transfer(dataObjects){
    // var inputB = stateB.value.toLowerCase()

    

    if(count == 0){
        setA = dataObjects
        count += 1
        

    }else if(count >0){
        setB = dataObjects
        
    }

    while(Object.keys(setA).length === Object.keys(setB).length && Object.keys(setA).length >0 && Object.keys(setB).length >0){
        conversion(setA, setB)
    }

    

}







function conversion(dataSetA, dataSetB){

    console.log('Calling from conversion function')
    let dateArrayA = Object.keys(dataSetA) //return an array of the key
    let dateArrayB = Object.keys(dataSetB)


    let valueA = Object.values(dataSetA)
    let valueB = Object.values(dataSetB)


    var months = [] //getting the month number ; example "01"

    var dataValueA = []
    var dataValueB = []


    if(dateArrayA.length == dateArrayB.length){

        console.log(dateArrayA) // print this ["201802", "201803", "201804", "201805", "201806", "201807", "201808", "201809", "201810", "201811", "201812", "201901", "201902", "201903", "201904", "201905", "201906", "201907", "201908", "201909", "201910", "201911", "201912"]

        for(var n = 0; n<dateArrayA.length; n++){
            var converts = parseInt(dateArrayA[n])
            // console.log(converts)
            var regExTest = /^\d{4}(\d{2})$/g

            var matchArr = regExTest.exec(converts)

            

            months.push(matchArr[1]) //this will print "01" inside the array
            //console.log(matchArr) //print this ["201801", "01", index: 0, input: "201801", groups: undefined]
        }

        console.log("this is from the last function", valueA, valueB, months)
        generate(valueA, valueB, months)

    }

    



    





}








// getting this message [Violation] 'click' handler took 1372ms
