/* This file contains (for now) the function that will be used to create the table that
   displays what time are reserved */

timeToCellNumber = function(time){ //This function depends on how much time each column represents
    timeDecomp = time.split(":") //decomposes the time string into the hour and minutes
    var cellNumber = 0

    cellNumber = (Number(timeDecomp[0])*4+Math.floor(Number(timeDecomp[1])/15))+1

    return cellNumber
}
militaryTimeToCivilianTime = function(hour){  //ASK A QUESTION ABOUT THIS DAMN FUNCTION
    var time = (hour%12)

    if(hour/12 >= 1){
	if(time == 0 || hour == 0){
	    //this isn't working that well... 
	    time = 12 

	}
	return time +"pm"
    }
    else{
	return (time+"am")
    }
    
}
colorRows = function(tr,i){
    if(i%2 == 1){
	tr.style.backgroundColor = "DDD"
    }
    else{
	tr.style.backgroundColor = "white"
    }
}
drawingNumbers = function(){
    var grid = document.getElementById("grid")
    var tr = grid.insertRow()
    for(var i = 23;i>-1;i--){
	var td = tr.insertCell()
	td.innerHTML = "<b>" + militaryTimeToCivilianTime(i) + "</b>"
	td.style.borderRight = "2px solid black"
	td.style.backgroundColor = "white"
	////////////////
	if(i == 0){
	    td.innerHTML = "<b>"+12+"am"+"</b>" //THIS SHOULD NOT BE NECESSARY. I HAVE NO IDEA WHAT IS HAPPENING
	}
	////////////////
	td.colSpan = "4"
    }
    var head = tr.insertCell()
    head.style.width = "100px"
    if(gridIndicator){
	head.innerHTML = "<b>"+ selectedRoom + "</b>"
    }
    else{
	head.innerHTML = "<b>"+ selectedDate + "</b>"
    }
    head.style.backgroundColor = "white"
    
}
    


drawTableForRoom = function(startTimes,endTimes) {//may require a parameter addition
    console.log("drawTableForRoom()")
    gridIndicator = true
    setLists() //resets the global list variables
    
    var grid = document.getElementById("grid")
    
    
    //selectedDate = "2014-03-14" //remember the date thing is still wonky
    for( var i = 7; i>=1;i--){
	
	tr = grid.insertRow() //creates row object
	colorRows(tr,i)

	for( var j = 96; j>=1; j--){ //note: 24 is the number of half an hour time slot there are. 
	    td = tr.insertCell()
	    if(j%4 == 0){
		td.style.borderRight = "2px solid black"
	    }
	    else{
		td.style.borderRight = "1px gray"
	    }
	    cell = new Cell(i,j)
	    
	    lstOfCells.append(cell) //appends to cell list
	    
	    td.cell = cell
	    
	    td.onmouseover = function(){console.log(this.cell.row, this.cell.col)} //for testing
	    var label = document.createTextNode("")
	    

	    td.appendChild(label) 
	    
	    lstOfTableCells.append(td) //appends to table cell list
	    //console.log(lstOfTableCells)
	}    	
	var head = tr.insertCell()
	head.innerHTML = "<b>"+ tr.date + "</b>"
	var date = tr.date
	head.date = date
	
	head.style.width = "100px"
	head.onclick = onDateClick
	lstOfTableRows.unshift(tr)
	lstOfTableRowHeaders.unshift(head)
	
    }
    setDatesOfGrid()
    drawingNumbers()
    conflictsByRoom(startTimes,endTimes)
}



conflictsByRoom = function(startTimes, endTimes){ //include endtime and startTime parameters
    console.log("conflictsByRoom()")
    gridIndicator = true

    for( var i = 0; i<(startTimes.length);i++){
	
	var startDate = startTimes[i].split("T")[0]
	var endDate = endTimes[i].split("T")[0]

	var rowForDate = 0
	for(var j = 0; j<lstOfTableRows.length; j++){
	    if(startDate == lstOfTableRows[j].date){
		rowForDate = j+1 //eventually I will have a method that determines the row from the given date.
		break
	    }
	}
	
	drawConflict(startTimes[i], endTimes[i], rowForDate)
    }
}
setDatesOfGrid = function(){ //only for ForRoom grid
    console.log("meow")
    for(var i = 0; i<7;i++) {
	if(selectedDate != undefined){
	    var tempLst = selectedDate.split("-")
	}
	else{
	    var tempLst = getDate().split("-")
	}
	
	//this is going to be shenanigans
	var newDay = Number(tempLst[2])+i // first term is the first date of the table. 
	                                    // second terms adujsts you to the current row
	console.log(tempLst[0],tempLst[1], newDay)
	newDate = new Date(tempLst[0],tempLst[1]-1, newDay)//Something wonky happens here
	console.log(newDate)
	lstOfTableRows[i].date = getDate(newDate)
	lstOfTableRowHeaders[i].innerHTML ="<b>"+lstOfTableRows[i].date + "</b>"
	lstOfTableRowHeaders[i].date = getDate(newDate)
	lstOfTableRows[i].onmouseover = function(){console.log(this.date)}
    }
    
}

/*
 *THE FOLLOWING IS PREDOMINANTLY FOR DATE CONSTANT GRIDS
 */

drawTableForDate = function(eventList){
    console.log("drawTableForDate()")
    gridIndicator = false
    setLists()
    
    var grid = document.getElementById("grid")
    //selectedDate = "2014-03-14"
    for(var i = roomList.length; i>0;i--){
	tr = grid.insertRow()
	colorRows(tr,i)
	for(var j = 96; j>0; j--){
	    td = tr.insertCell()
	    if(j%4 == 0){
		td.style.borderRight = "2px solid black"	
	    }
	    else{
		td.style.borderRight = "1px gray"
	    }
	    cell= new Cell(i,j)
	    
	    lstOfCells.append(td.cell)
	    
	    td.cell = cell
	    td.onmouseover = function(){console.log(this.cell.row, this.cell.col)}
	    
	    var label = document.createTextNode("")
	    
	    td.appendChild(label)
	    lstOfTableCells.append(td)
	}


	var head = tr.insertCell()
	tr.room = roomList[i-1]
	head.room = roomList[i-1]
	head.innerHTML = "<b>"+tr.room+"</b>"
	head.style = "100px"
	head.onclick = onRoomClick
	lstOfTableRows.unshift(tr)
    }
    drawingNumbers()
    conflictsByDate(eventList)
}

conflictsByDate = function(eventList){
    console.log("conflictsByDate()")
    gridIndicator = false
    /*currently this function is dependent on the fact that organizer.email is the same 
     * as the calendar id. If it's not, we'll have some issues...
     */
    var rowForRoom = 0
    for(var j = 0; j<eventList.length; j++){
	var event = eventList[j]
	var sourceCalendar = event.organizer.email
	
	for(var i = 0; i<roomList.length; i++){ //this for loop can't be that efficient...Might use while loop
	    var roomName = roomList[i]
	    var roomId = idDictionary[roomName]
	    console.log(eventList[j].organizer.email)
	    
	    if (sourceCalendar == roomId){
		//console.log(roomName, " ", roomId, " ", event.summary)
		rowForRoom = roomList.indexOf(roomName) + 1
		//console.log("Row for Room: ", rowForRoom)
		break
	    }
	}
	var startTime = event.start.dateTime
	var endTime = event.end.dateTime
	console.log("startTime: ",startTime, "  ", "endTime", endTime)
	drawConflict(startTime, endTime, rowForRoom)
	
    }
    
}


drawConflict = function(start, end, row){
    var startTimeAndDate = start//startTimes[i]//"2014-03-20T10:30:00-05:00" //startTimes[i]
    var endTimeAndDate = end//endTimes[i]//"2014-03-20T14:30:00-05:00"   //endTimes[i]
    
    var startTimeLst = startTimeAndDate.split("T")
    var endTimeLst = endTimeAndDate.split("T")
    
    var startDate = startTimeLst[0]
    var startTime = startTimeLst[1].split("-")[0].slice(0,5) //dependent on the format of time variable
    
    var endDate = endTimeLst[0]
    var endTime = endTimeLst[1].split("-")[0].slice(0,5) //dependent on the format of time variable    
   
    var startCellNumber = timeToCellNumber(startTime)
    var endCellNumber = timeToCellNumber(endTime)
    //console.log(startTime, " ", startCellNumber)
    //console.log(endTime, " ", endCellNumber)
    
    if(lstOfTableCells.find(row,1) != undefined){
	//console.log(startCellNumber, "  ", endCellNumber)
	for(var x = startCellNumber; x<endCellNumber; x++){
	    
	    //console.log(x)
	    lstOfTableCells.find(row,x).style.backgroundColor = "B60DFF"
	}
    }
}



clearTable = function(){  //simply clears out all of the busy cells

    for(var i = 1; i<=7; i++){
	for(var j = 1; j<=96; j++){
	    if(i%2 == 1){
		console.log("odd row")
		lstOfTableCells.find(i,j).style.backgroundColor = "DDD"
	    }
	    else{
		console.log("even row")
		lstOfTableCells.find(i,j).style.backgroundColor = "white"
	    }	    
	}
    }
}

deleteTable = function(){   //deletes the entire current table
    console.log("deleteTable()")
    gridIndicator = undefined
    
    var grid = document.getElementById("grid")
    while(grid.rows.length != 0){
	grid.deleteRow()
    }
    
}



















/*testing = function(){
    div = document.getElementById("display")
    button = document.createElement("button")
    button.onclick = function(){console.log(}
}
*/
function tableCreate(){
    var body = document.body,
        tbl  = document.createElement('table');
    tbl.style.width='100%';
    tbl.style.border = "1px solid black";

    for(var i = 0; i < 3; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 2; j++){
            if(i==2 && j==1){
                    break
            } else {
                var td = tr.insertCell();
                td.appendChild(document.createTextNode('hello!'))
                if(i==1&&j==1){
                    td.setAttribute('rowSpan','2');
                }
            }
        }
   }
    body.appendChild(tbl);
}


/* Things to learn from the above function
   td = tr.insertCell()
   tr = tbl.insertRow()
   break only break the current loop.
   td.appendChild(document.createTextNode("BLAH")
*/
// waits two seconds before doing the onload function. hopefully enough time for the library requests to be made
var timeout = window.setTimeout(function() {
    window.onload = handleClientLoad()    
}, 2000);

