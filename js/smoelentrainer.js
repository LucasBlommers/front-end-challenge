const url = "img/characters"
var links = []
var randomLinks = []

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
			console.log(possibleLink.href)
			links.push(possibleLink.href)
		}
	}
	const linkSize = links.length
	//Randomize images
	for(i=0;i<linkSize;i++){
		//Generate a random number based on the length of links
		randomLinkIndex = Math.floor(Math.random() * links.length)
		randomLinks.push(links[randomLinkIndex])
		links.splice(randomLinkIndex, 1)
	}

	//Generate images list
	const photosDiv = document.getElementById("photosDiv")
	const imageUL = document.createElement("ul")

	for(i = 0; i< randomLinks.length;i++){
		const imageListItem = document.createElement("li")
		imageListItem.innerHTML = "<img class='img-thumbnail' src='" +randomLinks[i] +"'>"
		imageUL.append(imageListItem)
	}

	photosDiv.append(imageUL)

	//create a list with names
	
	//Randomize names	

	//Generate names list
}

function httpGet(url){
	var xmlHttp = new XMLHttpRequest()
	xmlHttp.open("GET", url, false)
	xmlHttp.send(null)
	return xmlHttp.responseText
}