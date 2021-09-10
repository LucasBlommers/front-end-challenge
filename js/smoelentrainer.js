function initialize(){
	console.log("Initializing Smoelentrainer...")
	//Load the images
	const url = "img/characters"
	console.log(httpGet(url))
	//create a list with names

	//Randomize images

	//Randomize names

	//Generate images list

	//Generate names list
}

function httpGet(url){
	var xmlHttp = new XMLHttpRequest()
	xmlHttp.open("GET", url, false)
	xmlHttp.send(null)
	return xmlHttp.responseText
}