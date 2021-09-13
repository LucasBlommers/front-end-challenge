timer = undefined

function switchTimer(){
    const currentTimer = localStorage.getItem("timer")

	if(currentTimer == undefined){
		localStorage.setItem("timer", "true")
	}else{
		localStorage.removeItem("timer")
	}
}

  