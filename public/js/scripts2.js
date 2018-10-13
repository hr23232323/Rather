var xhr = new XMLHttpRequest()
xhr.onreadystatechange = handle_res
xhr.open("GET", "/userData")
xhr.send()

function handle_res() {
	if(this.readyState != 4) return;
	if(this.status != 200) {
    // error!
  }
    var dataApp = this.responseText
        dataApp = capitalizeFirstLetter(dataApp);
        document.getElementById('username').innerHTML = document.getElementById('username').innerHTML + dataApp
}

// Credits: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}