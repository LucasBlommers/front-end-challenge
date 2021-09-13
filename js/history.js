function saveHistory(attempts, matches){
	//Load the score
	const scoresRaw = localStorage.getItem("scores")
	const date = new Date()
    const dateString = generateDateString()

    console.log("Date: " + dateString)
	if(scoresRaw == undefined){
		const scoreString = attempts + "," + matches + "," + dateString  +";"
		localStorage.setItem("scores", scoreString)
	}else{
		const scoreList = scoresRaw.split(";")
		//Remove empty string
		scoreList.pop()

		if(scoreList.length == 10){
			scoreList.pop()
		}
		scoreList.push(attempts + "," + matches + "," + dateString)

		//Create string
		var newScoreString = ""
		for(i=0;i<scoreList.length;i++){
			newScoreString += (scoreList[i] + ";")
		}
		console.log("New score string: " + newScoreString)
        localStorage.setItem("scores", newScoreString)
	}
}

function loadHistory(){
    const scoreString = localStorage.getItem("scores")

    const scores = scoreString.split(";")
    scores.pop()

    const tblScore = document.getElementById("tbl-score")

    for(i=0;i<scores.length;i++){
        const scoreSet = scores[i]
        const scoreList = scoreSet.split(",")

        const rwScore = document.createElement("tr")

        const tdAttempts = document.createElement("td")
        tdAttempts.innerText = scoreList[0]
        rwScore.append(tdAttempts)

		const tdMatches = document.createElement("td")
		tdMatches.innerText = scoreList[1]
		rwScore.append(tdMatches)

		const tdDate = document.createElement("td")
		tdDate.innerText = scoreList[2]
		rwScore.append(tdDate)

        tblScore.append(rwScore)

    }

}

function generateDateString(){
    const date = new Date()

    const dateString = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " - " + date.getHours() + ":" + date.getMinutes()
    return dateString
}