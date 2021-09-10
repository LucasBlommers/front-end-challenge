const url = "img/characters"

function initialize(){
	console.log("Initializing Smoelentrainer...")
	//Load the images
	
	htmlResponse = httpGet(url)
	var domResponse = new DOMParser().parseFromString(htmlResponse, "text/html")
	console.log(domResponse)

	imageLinks = domResponse.getElementsByTagName("a")
	
	console.log( imageLinks)
	for(i=0;i<imageLinks.length; i++){
		possibleLink = imageLinks[i]

		if(possibleLink.href.includes(".png")){
			console.log(possibleLink)
		}
	}
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