window.onload = function () {
    
    var url = document.location.href,
        params = url.split('=')[1],
        data = {}, tmp;
    //console.log(params)
    call = "/questionData/" + params
    
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = handle_res
    xhr.open("GET", call)
    xhr.send()
    
    function handle_res() {
        if(this.readyState != 4) return;
        if(this.status != 200) {
        // error!
      }
        var dataApp = JSON.parse(this.responseText)
        //console.log(dataApp)
        var total = dataApp.vote1 + dataApp.vote2
        var weight_a1 = Math.floor((dataApp.vote1/total)*100)
        var weight_a2 = Math.ceil((dataApp.vote2/total)*100)
        if(dataApp.allowedToVote == false){
            document.getElementById('submit-button').disabled = true;
            document.getElementById('question').innerHTML = document.getElementById('question').innerHTML + "<b>" + dataApp.question + "</b><br>(You've already voted)";
        } else {
            document.getElementById('question').innerHTML = document.getElementById('question').innerHTML + dataApp.question
        }
        document.getElementById('answer1').innerHTML = document.getElementById('answer1').innerHTML + dataApp.answer1
        document.getElementById('answer2').innerHTML = document.getElementById('answer2').innerHTML + dataApp.answer2
        console.log(weight_a1)
        document.getElementById('question-button').classList.add("is-2") 
        if(weight_a1 < 10){
            document.getElementById('answer1-container').classList.add("is-1") 
            document.getElementById('answer2-container').classList.add("is-9")
            document.getElementById('answer1').style.fontSize = '1em';
        }else if(weight_a1 >= 10 && weight_a1 < 20){
            document.getElementById('answer1-container').classList.add("is-2") 
            document.getElementById('answer2-container').classList.add("is-8")
            document.getElementById('answer1').style.fontSize = '1em';
        } else if(weight_a1 >= 20 && weight_a1 < 30){
            document.getElementById('answer1-container').classList.add("is-3")
            document.getElementById('answer2-container').classList.add("is-7")
            document.getElementById('answer1').style.fontSize = '1.2em';
        } else if(weight_a1 >= 30 && weight_a1 < 45){
            document.getElementById('answer1-container').classList.add("is-4")
            document.getElementById('answer2-container').classList.add("is-6")
            document.getElementById('answer1').style.fontSize = '1.5em';
        } else if(weight_a1 >= 45 && weight_a1 < 55){
            document.getElementById('answer1-container').classList.add("is-third")
            document.getElementById('answer2-container').classList.add("is-third")
        } else if(weight_a1 >= 55 && weight_a1 < 70){
            document.getElementById('answer1-container').classList.add("is-6")
            document.getElementById('answer2-container').classList.add("is-4")
            document.getElementById('answer2').style.fontSize = '1.5em';
        } else if(weight_a1 >= 70 && weight_a1 < 80){
            document.getElementById('answer1-container').classList.add("is-7")
            document.getElementById('answer2-container').classList.add("is-3")
            document.getElementById('answer2').style.fontSize = '1.2em';
        } else if(weight_a1 >= 80 && weight_a1 < 90){
            document.getElementById('answer1-container').classList.add("is-8")
            document.getElementById('answer2-container').classList.add("is-2")
            document.getElementById('answer2').style.fontSize = '1em';
        } else {
            document.getElementById('answer1-container').classList.add("is-9")
            document.getElementById('answer2-container').classList.add("is-1")
            document.getElementById('answer2').style.fontSize = '1em';
        }
        
}

}