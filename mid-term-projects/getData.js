var stateIDList = 'https://api.eia.gov/category/?api_key=563a38170142e2aa6fea13b9725fa259&category_id=1'

var selectedStateA;
var energyLink = 'https://api.eia.gov/series/?api_key=563a38170142e2aa6fea13b9725fa259&series_id='

// var url ='https://api.wheretheiss.at/v1/satellites/25544'



var stateA = document.querySelector('#state1')
var stateB = document.querySelector('#state2')

var buttonEl = document.querySelector("#Generate")

var dataSetA = [];


buttonEl.addEventListener("click", () => {

    // ! https://www.eia.gov/opendata/qb.php?category=1&sdid=ELEC.GEN.ALL-AL-99.A

    var inputA = stateA.value.toLowerCase()

    var letters = /^[A-Z a-z]+$/;

    if(!inputA){
        stateA.value =''
        alert('Please enter your input')
    }else if(!inputA.match(letters)){

        stateA.value =''
        alert('Please enter letter only!')
    }else{


        retrieveID(inputA)
        // fetch(stateIDList)
        //     .then(res => res.json() )
        //     .then( stateData =>{

        //         stateData.category.childseries.forEach(function(element, index){

        //             var dataNameList = element.name.toLowerCase()

        //             if(dataNameList.includes(stateNameValue) && dataNameList.includes('monthly')){

        //                 let aState = element.series_id


        //                 if(aState.match('.M')){
        //                     fetch(energyLink+aState)
        //                     .then( resultA => resultA.json() )
        //                     .then( dataA => {
                
        //                         // console.log(dataA)
        //                        // console.log(dataA.series[0].data) //produce array of all the data 
        //                         //data in the form of this
        //                         //0: (2) ["201912", 571.24533]
        //                         // 1: (2) ["201911", 527.86132]
        //                         dataA.series[0].data.forEach(function(el, index){

        //                             console.log(el[0]) //print out all the date in the form of this --> 201912....
        //                             console.log(el[1]) //print out the value 
        //                             console.log(index)


        //                         })

                
        //                     })
        //                     .catch( err=>{
        //                         console.log(err)
        //                     })
        //                 }



        //             }

                    
                    

        //         })

        //     })
        //     .catch( err=>{
        //         console.log(err)
        //     })

       

        
    }
    
})





function retrieveID(input){
    fetch(stateIDList)
            .then(res => res.json() )
            .then( stateData =>{

                stateData.category.childseries.forEach(function(element, index){
                    //console.log(element.name) get all the name of the list
                    var dataNameList = element.name.toLowerCase()

                    if(dataNameList.includes(input) && dataNameList.includes('monthly')){

                        let stateID = element.series_id //id to get the specific data for the state


                        if(stateID.match('.M')){
                            retrieveData(stateID)
                            // fetch(energyLink+stateID)
                            // .then( resultA => resultA.json() )
                            // .then( dataA => {
                
                            //    // console.log(dataA)
                            //    // console.log(dataA.series[0].data) //produce array of all the data 
                            //     //data in the form of this
                            //     //0: (2) ["201912", 571.24533]
                            //     // 1: (2) ["201911", 527.86132]
                            //     dataA.series[0].data.forEach(function(el, index){

                            //         // console.log(el[0]) //print out all the date in the form of this --> 201912....
                            //         // console.log(el[1]) //print out the value 
                            //         // console.log(index)


                            //     })

                
                            // })
                            // .catch( err=>{
                            //     console.log(err)
                            // })
                        }

                    }
                })
            })
            .catch( err=>{
                console.log(err)
            })
}

function retrieveData(id){
    fetch(energyLink+id)
        .then( resultA => resultA.json() )
        .then( dataA => {

            // console.log(dataA)
            // console.log(dataA.series[0].data) //produce array of all the data 
            //data in the form of this
            //0: (2) ["201912", 571.24533]
            // 1: (2) ["201911", 527.86132]
            dataA.series[0].data.forEach(function(el, index){

                // ! How can I keep on adding based on the validation?
                if(el[0]>="201901" && el[0]<="201906"){

                    dataSetA.push(el[1])
                    console.log(dataSetA)

                    //! Error Msg TypeError: chart is not a constructor
                    // at generate (chartGenerator.js:5)
                    // at getData.js:167
                    // at Array.forEach (<anonymous>)
                    // at getData.js:160

                    generate(dataSetA)

                }

                // console.log(el[0]) //print out all the date in the form of this --> 201912....
                // console.log(el[1]) //print out the value 
                // console.log(index) // index for the selected data
            })


        })
        .catch( err=>{
            console.log(err)
        })
        // ! ? Should I add finally ( ()=>{})  
    
    
}


