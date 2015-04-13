//This folder contains all functions that require loading the api to get information
  //Should just contain makeApiCallForRoom and makeApiCallForDate

makeApiCallForRoom = function(){
    console.log("makeApiCallForRoom()")

    gapi.client.load('calendar', 'v3', function(){
	var onCompleteForRoom = function(){drawTableForRoom(startTimes,endTimes)}
	startTimes = []
	endTimes = []
	
	var request = gapi.client.calendar.events.list({
	    'calendarId' : idDictionary[selectedRoom],'singleEvents' : true ,'orderBy' : 'startTime'}) // makes a request for a list of events that has been ordered by date.
	//console.log(request)
	request.execute(function(resp) {
	    
	    for(var i=0;i<resp.items.length;i++){
				startTimes.push(resp.items[i].start.dateTime)
		endTimes.push(resp.items[i].end.dateTime)
	    }
	    
	    onCompleteForRoom() //Calls function that draws table. 
	                        //Note: this is inside the request.execute to account for asynchronousity 
	}) //end of request.execute
    }) //end of gapi.client.load    
} //end of makeApiCallForRoom
   


makeApiCallForDate = function(){
    console.log("makeApiCallForDate()")
    var completeCounter = 0
    
    var onCompleteForDate = function(){
	completeCounter ++
	console.log(completeCounter)
	if (completeCounter == roomList.length){
	    drawTableForDate(eventList)
	}
	
    }
    console.log("1) date: ", selectedDate)
    //var selectedDate = "2014-03-20"
    if(selectedDate == undefined){
	console.log("Inside If")
	selectedDate = getDate()
    }
    console.log("2) date: ", selectedDate)
    var counter = 0 //used to rememdy asynchronous problems.
    var eventList = []
    //var  startTimes = []
    //var endTimes = []
    //var allDone = false //this switches when counter == 2
        
    for( var key in idDictionary) {
	console.log(key)
	gapi.client.load('calendar', 'v3', function() { //function isn't called until we get information back. (function() is the callback function)
	    var request = gapi.client.calendar.events.list({
		'calendarId' : idDictionary[roomList[counter]],'singleEvents' : true ,'orderBy' : 'startTime'}) //note remember dictionaries are unordered, so you can't call the 'ith" element of the dictionary
	    console.log(request)
	    counter += 1 //could events come in at the "same" time?
	    console.log(counter)
	    request.execute(function(resp) {
		
		var dateArray = []
		
		for(var i=0;i<resp.items.length;i++){
		    var dateArray = resp.items[i].start.dateTime.split("T")
		    var date = dateArray[0]
		    		    
		    if(date == selectedDate) {
			eventList.push(resp.items[i])
			
			console.log(resp.items[i]," This one works: ", date)
		    }
		}
		onCompleteForDate()
	    }) // end request.execute
	}) //end gapi.client.load		
    }    
} //end makeApiCallForDate








/*Just a couple of notes about dealing with asynchronous commands
 *have one call initiate the next (if blah.next)

 *make a list maybe a couple of global variables, state information. shared objects.
 */
