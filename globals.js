/*The following are various objects that will be used through the application*/
ListOfCells = function(){ //Contains Cell-type objects. 
    this.lst = []
    this.find = function(i,j){
	return this.lst[(i-1)*96 + (j-1)] //24 is the number of columns (may eventually get larger)
    }
    this.append = function(cell){
	this.lst.unshift(cell)
    }
}


ListOfTableCells = function(){ //Contains td-type objects
    this.lst = []
    this.find = function(i,j){
	return this.lst[(i-1)*96 + (j-1)] //24 is the number of columns (may eventually get larger)
    }
    this.append = function(cell){
	this.lst.unshift(cell)
    }
}



Cell = function(i,j){
    this.row = i
    this.col = j
    this.nextCell = function(){
	return lstOfCells.find(this.row, this.col + 1)
    }

}

DateClass = function(selectedDate){
    this.date = getDate()
    if(selectedDate != undefined){
	this.date = date
    }

    this.setDate = function(newDate){
	this.date = newDate //this may be an unnecessary function
    }
    this.getDate = function(){
	return this.date
    }
}


/*
 *The following are various functions used throughought the application
 */
getDate = function(newDate){

    if( newDate != undefined){
	var today = newDate
	var mm = today.getMonth()+1
    }
    
    else{
	var today = new Date()
	var mm = today.getMonth()+1 //January is 0!
    }
    var dd = today.getDate()
    
    
    
    var yyyy = today.getFullYear()
    
    if(dd<10) {
	dd='0'+dd
    } 
    
    if(mm<10) {
	mm='0'+mm
    } 
    
    return today = yyyy+'-'+mm+'-'+dd
}

/*
 *The following are onclick functions
 */

checkSelect = function(){
    var selectorData = document.getElementById("selector").value
    var inputArea = document.getElementById("input")
    var choice = document.getElementById("choice")
    
    if(selectorData == "forRoom"){
	//create dropdown menu (select) with room options
	
	var roomSelect = document.createElement("SELECT")
	roomSelect.id = "roomSelect"
	for( var i = 0; i<roomList.length; i++){
	    var option = document.createElement("option")
	    option.text = roomList[i]
	    option.value = roomList[i]
	    roomSelect.add(option)
	}
	
	if(choice.childNodes.length ==2){
	    choice.removeChild(choice.lastChild)
	    choice.appendChild(roomSelect)

	}
	else{
	    choice.appendChild(roomSelect)
	}
	console.log(choice.childNodes[0] != undefined) 
	//choice.replaceChild(
	//choice.appendChild(roomSelect)
    }
    else{
	var inputBox = document.createElement("input")
	inputBox.type = "text"
	inputBox.defaultValue="Ex) 2014-12-25 (yyyy-mm-dd)"
	inputBox.id ="inputBox"
	inputBox.style.width = "200px"
	if(choice.childNodes.length ==2){
	    choice.removeChild(choice.lastChild)
	    choice.appendChild(inputBox)

	}
	else{
	    choice.appendChild(inputBox)
	}
	
	
	//create input box for date, with text example above it
    }
    //create button that can submit and has an onclick. (mostly done)
}

processSelect = function(){
    var selectorData = document.getElementById("selector").value
    
    if(selectorData == "forRoom"){
	selectedRoom = document.getElementById("roomSelect").value
	deleteTable()
	makeApiCallForRoom()
    }
    else{
	selectedDate = document.getElementById("inputBox").value
	deleteTable()
	makeApiCallForDate()
    }
}



forwardClick = function(){
    if(gridIndicator){
	nextWeek()
    }
    else{
	nextDay()
    }
}

backwardClick = function(){
    if(gridIndicator){
	lastWeek()
    }
    else{
	previousDay()
    }
}


nextWeek = function(){
    console.log("This kitten doesn't do anything yet!")
    if(selectedDate != undefined){
	dateDecomp = selectedDate.split("-")

    }
    else{
	console.log("inside else")
	
	dateDecomp = getDate().split("-")
	console.log(dateDecomp)
    }
    
    newDate = new Date(dateDecomp[0],dateDecomp[1]-1, Number(dateDecomp[2])+7) //Make own object?
    
    selectedDate = getDate(newDate)
    console.log("after")
    clearTable()
    setDatesOfGrid()
    conflictsByRoom(startTimes,endTimes)
}

lastWeek=function(){   
    console.log("This kitten doesn't do anything yet!")
    if(selectedDate != undefined){
	dateDecomp = selectedDate.split("-")

    }
    else{
	console.log("inside else")
	
	dateDecomp = getDate().split("-")
	console.log(dateDecomp)
    }
    
    newDate = new Date(dateDecomp[0],dateDecomp[1]-1, Number(dateDecomp[2])-7) //Make own object?
    
    selectedDate = getDate(newDate)
    console.log("after")
    clearTable()
    setDatesOfGrid()
    conflictsByRoom(startTimes,endTimes)
}

nextDay = function(){
    dateDecomp = selectedDate.split("-")
    newDate = new Date(dateDecomp[0],dateDecomp[1]-1, Number(dateDecomp[2])+1) //Make own object?
    selectedDate = getDate(newDate)
    deleteTable()
    makeApiCallForDate()
}

previousDay = function(){
    dateDecomp = selectedDate.split("-")
    newDate = new Date(dateDecomp[0],dateDecomp[1]-1, Number(dateDecomp[2])-1) //Make own object?
    selectedDate = getDate(newDate)
    deleteTable()
    makeApiCallForDate()
}




onRoomClick = function(){
    console.log(this.room)
    selectedRoom = this.room
    deleteTable()
    selectedDate = undefined
    makeApiCallForRoom()
}
onDateClick = function(){
    console.log("Header Date: ",this.date)
    console.log("selectedDate: ",selectedDate)
    selectedDate = this.date
    console.log(selectedDate)
    deleteTable()
    makeApiCallForDate()
}
/*The following are many variables that will be used throughout the application*/


//var apiKey = "AIzaSyC83HTjOQGAIOlIUO4uhqHGSoWHdY1zieY"
var scopes = "https://www.googleapis.com/auth/calendar"
var apiKey = "AIzaSyBqSG3IjmORp5YtLbC3uH-vknUuY0cmsjE"
var clientId = "757845678130.apps.googleusercontent.com"

var idDictionary = {"Olin 102" : 'luther.edu_32d3jjc84gn5u25i4jji0c8d6o@group.calendar.google.com', "Valders 206" : 'luther.edu_quvl61clrh2gn04kpr49mcg7d8@group.calendar.google.com', "NRH" : 'luther.edu_o6lp55fguo5n2eobso5a73dqhg@group.calendar.google.com'}

var roomList = ["Olin 102", "Valders 206","NRH"] //for some reason I think this may be useful....

var selectedRoom = "Valders 206"
var selectedDate = undefined

var startTimes = []
var endTimes = []
//Although we will be able to synch up room names with the names that we choose for the keys of our JS object, is may be difficult to get them to line up in real life.



//The following globals are for the accessing various elements in the grid made with drawTableForRoom

var lstOfCells = new ListOfCells()
var lstOfTableCells = new ListOfTableCells()
var lstOfTableRows = []
var lstOfTableRowHeaders = []

setLists = function(){
    lstOfCells = new ListOfCells()
    lstOfTableCells = new ListOfTableCells()
    lstOfTableRows = []
}


var gridIndicator = undefined //Indicates which grid is displayed
                              //true: ForRoom, false: ForDate


//var selectorData = document.getElementById("selector")






//var selectorData = document.getElementById("selector").value
//var inputArea = document.getElementById("input")

