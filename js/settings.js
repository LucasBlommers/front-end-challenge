function switchTimer(){
    const currentTimer = localStorage.getItem("timer")

	if(currentTimer == undefined){
		localStorage.setItem("timer", "true")
        localStorage.setItem("time", "60")
	}else{
		localStorage.removeItem("timer")
        localStorage.removeItem("time")
	}
}

function changeTime(){
    const numTimer = document.getElementById("num-timer")
    time = numTimer.value

    if(time == ""){
        time = "60"
    }
    localStorage.setItem("time", time)
}

function changeAmount(){
    const numAmount = document.getElementById("num-amount")
    amount = Number(numAmount.value)

    if(amount < 5 || amount > links.length){
        numAmount.value = links.length
        return alert("Kies een getal tussen 5 en " + links.length)
    }else{
        localStorage.setItem("amount", amount)
    }
}