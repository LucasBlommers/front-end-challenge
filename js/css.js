var currentCSS="css/css1"
var selectedCSSLI = undefined

function initializeCSS(){
    selectedCSSLI = document.getElementById("li-css1")
}

function switchCSS(newCSS, selectedCSS){
    console.log("Switching CSS files, current: " + currentCSS + " to " + newCSS)
    //Change the CSS Link
    const cssLink = document.getElementById(currentCSS)
    
    currentCSS = newCSS
    
    cssLink.setAttribute("id", currentCSS)
    cssLink.setAttribute("href", currentCSS + ".css")

    //Update the selected LI
    console.log("Change active CSS TO: " + selectedCSS)
    if(selectedCSSLI == undefined){
        selectedCSSLI = document.getElementById("li-css1")
    }
    if(selectedCSS != selectedCSSLI){
        selectedCSSLI.className = "list-group-item"
        selectedCSSLI = selectedCSS
        selectedCSSLI.className = "list-group-item active"
    }else{
        return
    }

}

function reloadCSS(){
    console.log("Reloading CSS: " + currentCSS)
}