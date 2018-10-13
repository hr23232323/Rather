// Credits: https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript
// Credits: https://stackoverflow.com/questions/1255948/post-data-in-json-format

var form = document.getElementById('signup-form');

form.onsubmit = function (e) {
  // stop the regular form submission
  e.preventDefault();

  // collect the form data while iterating over the inputs
  var data = {};
  for (var i = 0, ii = form.length; i < ii; ++i) {
    var input = form[i];
    if (input.name) {
      data[input.name] = input.value;
    }
  }
    
    trySignup(data);
}

function trySignup(data) {
  var XHR = new XMLHttpRequest();
  var urlEncodedData = "";
  var urlEncodedDataPairs = [];
  var name;

  // Turn the data object into an array of URL-encoded key/value pairs.
  for(name in data) {
    urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }

  // Combine the pairs into a single string and replace all %-encoded spaces to 
  // the '+' character; matches the behaviour of browser form submissions.
  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    XHR.onreadystatechange = function (oEvent) {  
    if (XHR.readyState === 4) {  
        if (XHR.status === 200) {
            document.getElementById('signup-success').style.display='block'
            setTimeout(function(){
                window.location.replace("/login");
            }, 3000); 
            
        } else {  
            console.log("Error", XHR.statusText);
            document.getElementById('signup-error').style.display='block'
        }  
    }  
}; 

  // Set up our request
  XHR.open('POST', '/newUser');

  // Add the required HTTP header for form data POST requests
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Finally, send our data.
    XHR.send(urlEncodedData);
    
}

function resetError(){
    document.getElementById('signup-error').style.display='none';
}
    