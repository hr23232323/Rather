
var validator = require('validator');

// TODO
// Check validity of username and return true if valid (unique in database), false otherwise 
exports.checkUsername = (newUsername) => {
    if(isValid(newUsername)){
        console.log('good username')
        return true;
    } else {
        console.log('bad username')
        return false;
    }
}

// TODO
// Check validity of password and return true if valid, false otherwise 
exports.checkPassword = (password) =>{
    if(isValid(password)){
        console.log('Password good!')
        return true;
    } else {
        console.log('bad password')
        return false;
    }
}


// TODO
// Basic buffer overflow/ validity of characters check
// True if good, false if not
exports.checkEmail = (email) => {
    if(validator.isEmail(email)){
        console.log('Email good!')
        return true;
    } else {
        console.log('bad email')
        return false;
    }
    
}

// TODO
// Basic buffer overflow/ validity of characters check
// True if good, false if not
function isValid(toCheck){
    if(validator.isAlphanumeric(toCheck)){
        return true;
    } else {
        console.log('Bad input')
        return false;
    }
    
}