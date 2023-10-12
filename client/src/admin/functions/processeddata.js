import axios from "axios";


// converting the constraints strings into the array of contraints
function proConstraints(constraints){

    let constrainsArray = [];

    let currentConstrain = "";    
    for(let i = 0; i<constraints.length; i++){
        if (constraints[i] === "\n"){
            constrainsArray.push(currentConstrain);
            currentConstrain = "";
        }else{
            currentConstrain = currentConstrain + constraints[i]
        }
    }
    
    constrainsArray.push(currentConstrain);
    return constrainsArray
}


// whatever is the input string we are breaking it into lines of array so that even array values are i/p and odd as o/p 
function lineBreaker(visible){ 
    let tempstr = "";
    let inputOutputArray = [];

    for(let i =0; i<visible.length; i++){
        if(visible[i]!="\n"){
            tempstr = tempstr + visible[i];
        }else if((visible[i] == "\n") && (tempstr !="")){
            inputOutputArray.push(tempstr);     
            tempstr = ""                   
        }
    }
    // we have got input and outputs in this array input present at even and o/p present at odd
    inputOutputArray.push(tempstr);
    return inputOutputArray
}


// getting the inputs in one array and output in one array
function lineSeperator(inputOutputArray){
    // seperating the arrays
    let inputArray = [];
    let outputArray = [];

    for(let i = 0; i<inputOutputArray.length; i++){
        if((i%2)==0){
            inputArray.push(inputOutputArray[i])
        }else{

            outputArray.push(inputOutputArray[i])
        }
    }

    return [inputArray, outputArray]

}


function proVisible(inputArray, outputArray){
    // console.log(inputArray)
    // console.log(outputArray)
    let visibleArray = [];
    
    for(let i = 0; i<inputArray.length; i++){
        let object = {};

        // ['Input: nums = [2,7,11,15], target = 9', 'Input: nums = [3,2,4], target = 6'] 
        // splitting on (,space) 
        let input_str = inputArray[i].slice(7,inputArray[i].length).split(", ")

        // now each element is splited on space=space
        let input_array = [];
        for(let j = 0 ; j< input_str.length; j++){
            let broken = input_str[j].split(" = ")
            let input = {};
            input.fieldname = broken[0]
            input.fieldvalue = broken[1]
            input_array.push(input)
        }

        object.input = input_array
        object.output = outputArray[i].slice(8,outputArray[i].length)
        visibleArray.push(object)
        

    }

    return visibleArray;
}


export function processedData(title, difficulty, acceptance, description, visible, hidden, constraints){
    // modifying constrainsts to stroe in db
    constraints = proConstraints(constraints);

    // modifying visible to store in db
    let inputOutputArray = lineBreaker(visible);
    let [inputArray, outputArray] = lineSeperator(inputOutputArray);
    const visibleForDb = proVisible(inputArray, outputArray);

    // modifying hidden to stire in db
    let inputOutputArrayHidden = lineBreaker(hidden);
    [inputArray, outputArray] = lineSeperator(inputOutputArrayHidden);
    const hiddenForDb = proVisible(inputArray, outputArray);

    console.log(visibleForDb)
    console.log(hiddenForDb)
    sendToDb(title, difficulty, acceptance, description, visibleForDb, hiddenForDb, constraints)
}

async function sendToDb(title, difficulty, acceptance, description, visibleForDb, hiddenForDb, constraints){
    let response = await axios.post("http://localhost:3000/admin/addquestion", {
        "title": title, 
        "description" : description, 
        "constraints" : constraints,
        "difficulty" : difficulty,
        "acceptance": acceptance,
        "examples": visibleForDb,
        "testcases": hiddenForDb}, {
            headers : {
            "authorization" : "bearer " + localStorage.getItem("token")
            }
        })

        // route to all question to show the question is added

}