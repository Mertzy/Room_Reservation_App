function checkForInputErrors() { //this function will check to see if the selection corresponds with the input the user types in

    var error = ""


    selectorData = document.getElementById("selector")
    var userInputData = document.getElementById("userInput")


    if (errorCheckForDate()==true && selectorData =="forDate") { 

	error = "Input error. The date is not of the correct format."
	
	return error

    }

    else if (errorCheckForRoom()==true && selectorData=="forRoom") {

	error = "Input error. The room is not of the correct format."
	
	return error

    }

    else {

	error = ""

	return error

    }


}

function searchArray(arr, obj) { //this function returns true if obj is in arr

    for(var i=0; i<arr.length; i++) {

	if (arr[i] == obj) {

	    return true;

	}

    }
}

function errorCheckForDate() {

    //this function will check to see if the date entered follows the correct format

    var userInputData = document.getElementById("userInput")

    if (!(searchArray(dateList, userInputData))) { //need to create date list

	return true;

    }

    else {

	return false;

    }

    

}


function errorCheckForRoom() {

    //this function will check to see if the date entered follows the correct format

    var userInputData = document.getElementById("userInput")

    if (!(searchArray(roomList, userInputData))) {

	return true;

    }

    else {

	return false;

    }

	

}


function printErrors() { //actually prints the error

    //var document.getElementById("output").innterHTML = ""
    //var document.getElementById("output").innerHTML = checkForInputErrors()
    x = "cat"

}
