getMessages();

function getMessages(){
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = handle_res
    xhr.open("GET", "/dataApp")
    xhr.send()

    function handle_res() {
        if(this.readyState != 4) return;
        if(this.status != 200) {
        // error!
      }
        var dataApp = JSON.parse(this.responseText)
        document.getElementById('feed').innerHTML = ''
        dataApp.forEach(function(d) {
            var id = d._id
            var total = d.vote1 + d.vote2
            var weight_a1 = Math.floor((d.vote1/total)*100)
            var weight_a2 = Math.ceil((d.vote2/total)*100)
            //console.log(weight_a1, weight_a2)
            document.getElementById('feed').innerHTML = document.getElementById('feed').innerHTML + `<a onClick='vote("${id}")' class='question-tile'> <p class='question'>` + d.question + `</p><p class='answer answer1' style='width:${weight_a1}%;'>`  + `</p><p class='answer answer2' style='width:${weight_a2}%;'>` + "</p></a>"
          })
    }
}

function vote(id){
    console.log('called!!')
    window.location.href = `/vote/id=${id}`;
}

document.body.addEventListener("scroll", function (event) {
    var scroll = document.body.scrollTop;
    if(scroll == 0){
        getMessages();
        console.log('get messages called!')
    }
});