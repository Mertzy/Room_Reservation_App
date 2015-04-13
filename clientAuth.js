//This file contains various "boilerplate methods to check that the user is logged in and to handle authorization"


handleClientLoad = function() {  
//sets the apikey and cliet Id. 
//also sets up the page for the first time
    console.log("handleClientLoad()")
    gapi.client.setApiKey(apiKey)
    window.setTimeout(checkAuth,1)
    //checkAuth() //maybe don't need this line
    makeApiCallForDate()
    checkSelect()
    //makeApiCallForRoom()

}

checkAuth = function() {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immdeiate: true},handleAuthResult)
}

handleAuthResult= function(authResult){
    var authorizeButton = document.getElementById("authorize_button")
    if (authResult && !authResult.error) {
	authorizeButton.style.visibility = "hidden"
	makeApiCall();
    } 
    else{
	authorizeButton.style.visibility = ''
	authorizeButton.onclick = handleAuthClick
    }
}

handleAuthClick = function(event){
    gapi.auth.authorize({client_id : clientId, scope : scopes, immediate : false},handleAuthResult )
    return false
}




















////////////////////////////////////

///////////////////////////////////////
