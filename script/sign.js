document.getElementById('sign-btn').addEventListener("click", function () {

  // 1. get the mobile number
  const usernameInput = document.getElementById('input-username');
  const userName = usernameInput.value;
  console.log(userName);
  
  // 2. get the pin
  const inputPin = document.getElementById('input-pin')
  const pin = inputPin.value;
  console.log(pin);
  
  // 3. matched pin & mobile number
  if(userName == "admin" && pin =="admin123"){

    // 3-1. true : >> alert > homepage
    alert("Sign In Success")
    // window.location.replace("/home.html");
    window.location.assign("./home.html");
  }

  else{

    // 3-1. false : >> alert > return
    alert("Sign In Failed")
    return;
  }


})
