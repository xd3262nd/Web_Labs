/* Lab: write the code requested by lines marked //TODO
You should NOT modify any of the code that's here already. Add the code requested.   */

console.log('Lab 4. Please write the code requested at the //TODO markers.')

/* 
a. Use this JavaScript object. This represents the current position of the International Space Station
at 1pm on January 12th 2018, fetched from http://api.open-notify.org/iss-now.json.

 */

let iss_location = {
  "timestamp": 1515784140,
  "iss_position":
    {
      "latitude": "49.2167",
      "longitude": "100.5363"
    },
  "message": "success"
};

// TODO Extract the latitude value, and log it to the console.
// TODO Extract the longitude value, and log it to the console.


console.log('Latitude: ' + iss_location['iss_position']['latitude'])
console.log('Longitude: ' + iss_location['iss_position']['longitude'])



/* b. Use this JavaScript object of exchange rates relative to Euros.
The properties are currency symbols, the values are the exchange rates.
Data source: http://fixer.io/
* */


let rates = {
    "AUD": 1.5417,
    "BGN": 1.9558,
    "BRL": 3.8959,
    "CAD": 1.5194
};

// TODO write code to add a new property for Swiss Francs. Symbol is CHF, value is 1.1787.

//adding new elements/property
rates['CHF']= 1.1787

// TODO if you had 100 Euros, write code to get the exchange rate from the object, then calculate 
//      the equivalent value in Australian Dollars (AUD)


var audRates = rates['AUD']
var values = 100

//created a function to do the conversion
function conversion(exchangeRates, values){
  var convert = values * exchangeRates;
  return convert
}

//calling the function
conversion(audRates, values);
console.log('Conversion from Euros to Australian Dollars: '+conversion(audRates, values))


// TODO write code to identify the currency symbol that has the highest exchange rate compared to Euros.
//    In other words, identify the property with the largest value. the answer is BRL (Brazilian Real) at 3.8959 BRL to 1 Euro.

//setting the lowest to compare
let low = 0
//initialize the name to be printed later
let name

Object.keys(rates).forEach((e, index)=> {
  if(rates[e]>low){
    low = rates[e]
    name = e;
  }
})

console.log(`The highest exchange rate is ${name}`)




/* c. Use this JavaScript array of objects of cat owners, and their cats. Source, moderncat.com
 */

let cats_and_owners = [
  { name: "Bill Clinton", cat: "Socks" },
  { name: "Gary Oldman", cat: "Soymilk" },
  { name: "Katy Perry", cat: "Kitty Purry" },
  { name: "Snoop Dogg", cat: "Miles Davis" }
];

// TODO print Gary Oldman's cat's name
for ( var i in cats_and_owners){

  //getting each objects
  let each = cats_and_owners[i]
  //checking the object's property if it matches with the name
  if(each.name === 'Gary Oldman'){
    console.log(`Gary Oldman's cat name is ${each.cat}`)
  }

}
// TODO Taylor Swift's cat is called 'Meredith'. Write code to add this data to the array.
//adding data 
cats_and_owners[cats_and_owners.length] = {name: "Taylor Swift", cat:"Meredith"}

// TODO write a loop to print each cat owner, and their cat's name, one per line. Use the forEach style.

//go through each objects
//get the name of each objects and value
cats_and_owners.forEach(function(elements){
  let ownerName = elements['name']
  let catName = elements['cat']
  console.log(`Owner Name : ${ownerName}, Cat Name : ${catName} `)

})

/* d. Use the following JSON object, describing the Nobel Prize winners in 2017.
Source http://api.nobelprize.org/v1/prize.json?year=2017
* */



let nobel_prize_winners_2017 = {
  "prizes":[
    {
      "year":"2017",
      "category":"physics",
      "laureates":[
        {
          "id":"941",
          "firstname":"Rainer",
          "surname":"Weiss",
          "motivation":"\"for decisive contributions to the LIGO detector and the observation of gravitational waves\"",
          "share":"2"
        },
        {
          "id":"942",
          "firstname":"Barry C.",
          "surname":"Barish",
          "motivation":"\"for decisive contributions to the LIGO detector and the observation of gravitational waves\"",
          "share":"4"
        },
        {
          "id":"943",
          "firstname":"Kip S.",
          "surname":"Thorne",
          "motivation":"\"for decisive contributions to the LIGO detector and the observation of gravitational waves\"",
          "share":"4"
        }
      ]
    },

    {
      "year":"2017",
      "category":"chemistry",
      "laureates":[
        {
          "id":"944",
          "firstname":"Jacques",
          "surname":"Dubochet",
          "motivation":"\"for developing cryo-electron microscopy for the high-resolution structure determination of biomolecules in solution\"",
          "share":"3"
        },
        {
          "id":"945",
          "firstname":"Joachim",
          "surname":"Frank",
          "motivation":"\"for developing cryo-electron microscopy for the high-resolution structure determination of biomolecules in solution\"",
          "share":"3"
        },
        {
          "id":"946",
          "firstname":"Richard",
          "surname":"Henderson",
          "motivation":"\"for developing cryo-electron microscopy for the high-resolution structure determination of biomolecules in solution\"",
          "share":"3"
        }
      ]
    },
    {
      "year":"2017",
      "category":"medicine",
      "laureates":[
        {
          "id":"938",
          "firstname":"Jeffrey C.",
          "surname":"Hall",
          "motivation":"\"for their discoveries of molecular mechanisms controlling the circadian rhythm\"",
          "share":"3"
        },
        {
          "id":"939",
          "firstname":"Michael",
          "surname":"Rosbash",
          "motivation":"\"for their discoveries of molecular mechanisms controlling the circadian rhythm\"",
          "share":"3"
        },
        {
          "id":"940",
          "firstname":"Michael W.",
          "surname":"Young",
          "motivation":"\"for their discoveries of molecular mechanisms controlling the circadian rhythm\"",
          "share":"3"
        }
      ]
    },
    {
      "year":"2017",
      "category":"literature",
      "laureates":[
        {
          "id":"947",
          "firstname":"Kazuo",
          "surname":"Ishiguro",
          "motivation":"\"who, in novels of great emotional force, has uncovered the abyss beneath our illusory sense of connection with the world\"",
          "share":"1"
        }
      ]
    },
    {
      "year":"2017",
      "category":"peace",
      "laureates":[
        {
          "id":"948",
          "firstname":"International Campaign to Abolish Nuclear Weapons (ICAN)",
          "motivation":"\"for its work to draw attention to the catastrophic humanitarian consequences of any use of nuclear weapons and for its ground-breaking efforts to achieve a treaty-based prohibition of such weapons\"",
          "share":"1",
          "surname":""
        }
      ]
    },
    {
      "year":"2017",
      "category":"economics",
      "laureates":[
        {
          "id":"949",
          "firstname":"Richard H.",
          "surname":"Thaler",
          "motivation":"\"for his contributions to behavioural economics\"",
          "share":"1"
        }
      ]
    }
  ]
};

// TODO print the full name of the Literature Nobel laureate.

//running the loop of the prizes objects and iterates within the objects
nobel_prize_winners_2017.prizes.forEach(function(elements){
  //get the value from the specifc property and iterates the value
  elements.laureates.forEach(function(values){
    console.log(`${values.firstname} ${values.surname}`) 
  })

})

// TODO print the ids of each of the Physics Nobel laureates. 
//Your code should still work without modification if a laureate was added, or removed.
//to store the data and able to print it from this list
let idNum = []

nobel_prize_winners_2017.prizes.forEach(function(elements){

  if ( elements.category === 'physics'){
    var x = elements.laureates;
    x.forEach(function(items){
      idNum.push(items.id)
    })

  }

})

if (idNum.length>0){
  for(let x in idNum){
    console.log(idNum[x])
  }
}




// TODO write code to print the names of all of the prize categories (So your output would start physics, chemistry, medicine... ).

let categorize = []

nobel_prize_winners_2017.prizes.forEach(function(elements){

  categorize.push(elements.category)

})

for(let i in categorize){
  console.log(categorize[i])
}



// TODO write code to print the total number of prize categories
console.log(`Total Number of Prize Categories: ${categorize.length}`)



// TODO write code to count the total number of laureates from 2017. 
//   have a good look at how the JSON is structured, and think about what loop(s) you'll need to write.
let yearCounts = 0;

nobel_prize_winners_2017.prizes.forEach(function(list){
  if ( list.year >= '2017'){
    yearCounts+=1;
  }

})

console.log(yearCounts)





