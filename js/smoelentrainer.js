const url = "img/characters"
var links = []
var randomLinks = []
var randomNames = []

var selectedName = undefined
var selectedPhoto = undefined

var attempts = 0
var matches = 0

var timer = undefined
var trainerInterval = undefined
var startTime = undefined
var timeLimit = 1000 * 60
var endTime = undefined
var progress = "100%"

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
	const photoUL = document.createElement("ul")

	for(i = 0; i< randomLinks.length;i++){
		const photoListItem = document.createElement("li")
		photoListItem.className = "list-group-item"
		photoListItem.addEventListener("click", function(){
			onPhotoClicked(photoListItem)
		})
		photoListItem.innerHTML = "<img src='" +randomLinks[i] +"'>"
		photoUL.append(photoListItem)
	}

	photosDiv.append(photoUL)

	//create a random list with names
	const randomLinksSize = randomLinks.length

	for(i=0;i<randomLinksSize;i++){
		randomLinkIndex = Math.floor(Math.random() *randomLinks.length)
		randomNames.push(randomLinks[randomLinkIndex])
		randomLinks.splice(randomLinkIndex, 1)
	}
	//Generate names list
	console.log("Random sorted names: " + randomNames)
	const namesDiv = document.getElementById("namesDiv")
	const namesUL = document.createElement("ul")
	namesUL.id = "namesUL"
	for(i=0;i<randomNames.length;i++){
		const nameLI = document.createElement("li")
		
		nameLI.className = "list-group-item"
		nameLI.innerText = randomNames[i]
		nameLI.addEventListener("click", function(){
			onNameClicked(nameLI)
		})

		namesUL.append(nameLI)
	}
	namesDiv.append(namesUL)

	if(timer){
		//Set start time
		startTime = new Date().getTime()
		endTime = new Date(startTime + timeLimit)
		
		const timerP = document.getElementById("p-timer")
		timerP.innerText = "Timer: " + "0" + " / " + (timeLimit / 1000)

		//Setup the progress bar
		const divProgress = document.getElementById("div-progress")
		const divProgressbar = document.getElementById("div-progress-bar")

		divProgress.removeAttribute("hidden")
		divProgressbar.setAttribute("style", "width:"+ progress)

		trainerInterval = setInterval(function(){
			updateTimer()
		}, 1000)
	}
}

function updateTimer(){
	const currentTime = new Date().getTime()
	//Update the timer
	console.log("Time elapsed:" +(( currentTime - startTime) / 1000))
	const timeElapsed = parseInt((currentTime - startTime) / 1000)

	const timerP = document.getElementById("p-timer")
	
	timerP.innerText = "Timer: " + timeElapsed + " / " + (timeLimit / 1000)
	//Update the progressbar
	const timeLeft = (endTime - currentTime)
	totalTime = (endTime - startTime) / 1000
	progress = ((timeLeft / totalTime)/10) + "%"

	document.getElementById("div-progress-bar").setAttribute("style", "width:"+progress)

	if(currentTime >= endTime){
		console.log("Time's up")
		clearInterval(trainerInterval)
		return
	}
}

//Load Smoelentrainer
function loadMain(url){
	
	const htmlResponse = httpGet(url)
	var domResponse = new DOMParser().parseFromString(htmlResponse, "text/html")

	const main = document.getElementById("main")
	main.innerHTML = htmlResponse

	if(url.includes("smoelentrainer")){
		initialize()
	}
}

function onNameClicked(nameLI){
	console.log("You've clicked a name: " + nameLI)

	if(nameLI.className == "list-group-item active"){
		nameLI.className = "list-group-item"
		
	}else{
		nameLI.className = "list-group-item active"
	}
	//Change the selcted name
	if(selectedName != undefined){
		selectedName.className = "list-group-item"
		selectedName = nameLI
		
	}else{
		selectedName = nameLI
	}
	//Try to match photo with name
	if(selectedPhoto != undefined){
		if(selectedPhoto.innerHTML.includes(selectedName.innerText)){
			console.log("You've got a match")
			selectedName.remove()
			selectedPhoto.remove()

			selectedPhoto = undefined
			selectedName = undefined

			attempts++
			matches++
			drawScoreBoard()

		}else{
			attempts++
			drawScoreBoard()
		}
	}

	//if namesUL.children.length = 0 finish
	const namesUL = document.getElementById("namesUL")
	if(namesUL.children.length == 0){
		console.log("You win!")
		window.location.replace("/")
	}
}

function drawScoreBoard(){
	const scoreDiv = document.getElementById("scoreDiv")
	scoreDiv.innerHTML = "<p>"+attempts + " Pogingen " + matches + " Matches</p>"
}

function onPhotoClicked(photoLI){
	if(photoLI.className == "list-group-item active"){
		photoLI.className = "list-group-item"
	}else{
		photoLI.className = "list-group-item active"
	}
	//Change the selcted name
	if(selectedPhoto != undefined){
		selectedPhoto.className = "list-group-item"
		selectedPhoto = photoLI
		
	}else{
		selectedPhoto = photoLI
	}

	//Try to match photo with name
	if(selectedName != undefined){
		if(selectedPhoto.innerHTML.includes(selectedName.innerText)){
			console.log("You've got a match")
			selectedName.remove()
			selectedPhoto.remove()

			selectedPhoto = undefined
			selectedName = undefined
			
			attempts++
			matches++
			drawScoreBoard()
		}else{
			attempts++
			drawScoreBoard()
		}
	}

	//if namesUL.children.length = 0 finish
	const namesUL = document.getElementById("namesUL")
	if(namesUL.children.length == 0){
		console.log("You win!")
		window.location.replace("/")
	}
}

function httpGet(url){
	var xmlHttp = new XMLHttpRequest()
	xmlHttp.open("GET", url, false)
	xmlHttp.send(null)
	return xmlHttp.responseText
}

function switchTimer(){
	if(timer == undefined){
		timer = true
	}else{
		timer = undefined
	}
}