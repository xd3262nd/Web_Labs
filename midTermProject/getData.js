var stateIDList = 'https://api.eia.gov/category/?api_key=563a38170142e2aa6fea13b9725fa259&category_id=1'

var selectedStateA;
var energyLink = 'https://api.eia.gov/series/?api_key=563a38170142e2aa6fea13b9725fa259&series_id='

var stateA = document.querySelector('#state1')
var stateB = document.querySelector('#state2')

var buttonEl = document.querySelector("#Generate")

var dataSetA = [];


var dateList = [];
var stateList = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]



buttonEl.addEventListener("click", () => {


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
            start = yearAValue + monthAValue //201901
            end = yearBValue + monthBValue //201912
            //return list of index will have endDate first and startDate last
            dateList = indexFunction (start, end)

        }

    }else{

        // * this is when the year is different 

        //combining the monthYear together
        startYear = yearAValue + monthAValue
        endYear = yearBValue + monthBValue

        //return list of index will have endDate first and startDate last
        dateList = indexFunction(startYear, endYear)

    }

    // var letters = /^[A-Z a-z]+$/;
    var idA;
    var idB;
    var dataSetA = {};
    var dataSetB = {};

    if(!inputA || !inputB){
        alert('Please enter your inputs for both state')
    } else {

        validateName (inputA, inputB)        
    }
        
        
    
})

function validateName(inputA, inputB){
    let a = 0
    let b = 0

    for( var i = 0; i<stateList.length; i++){
        let stateName = stateList[i].toLowerCase()
        if (stateName === inputA.toLowerCase()){
            a = a+ 1
        } else if (stateName === inputB.toLowerCase()){
            b = b+ 1
        }
    }

    if (a == 1 && b==1){
        retrieveID(inputA,dateList, dataProcess)
        retrieveID(inputB,dateList, dataProcess)
    } else{
        alert('Please check your state name')
    }




}



function indexFunction(start, end){

    var ar = []

    for(var i = 0; i<yearMonthTotal.length; i++){
        if(yearMonthTotal[i] === end){
            ar.unshift(i)
        }else if(yearMonthTotal[i] === start ){
            ar.push(i)
        }
    }
    return ar

}


function retrieveID(stateName, indexList, callback) {

    // let stateID;
    
    fetch(stateIDList).then(res => {
        console.log(res)
        return res.json()
    })
    .then(stateData => {
        
            callback(stateData, stateName, indexList)

        })
        .catch(err => {
            console.log(err)
        })


}
let idA;
let idB;

function dataProcess(dataSet, stateName, indexList){

    dataSet.category.childseries.forEach(function(element, index) {
        var dataNameList = element.name.toLowerCase()

        if (dataNameList.includes(stateName) && dataNameList.includes('monthly')) {

            let stateID = element.series_id //id to get the specific data for the state

            retrieveData(stateID, indexList)

        }


    })

}

function retrieveData(id, indexList) {
    console.log(id + 'the state id')

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

            datas.series[0].data.forEach(function(el, index) {

                console.log(el) // el is the each array of ["201911", 15065.73011] 
                //for loop here will go through each value [0]: key , [1] is the value 
     
                if(index >= indexList[0] && index <= indexList[1]){
                    listAData.unshift(el[1])
                    listA[el[0]] = el[1]  //this will add " "  to the year and month 
                    // ex: "201912"
                    console.log(listA + " the object list for " + id) //this is the objects of key and value 

                    
                }
                
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
        break
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
            //print this ["201801", "01", index: 0, input: "201801", groups: undefined]
        }

        generate(valueA, valueB, months)

    }

    



    





}



