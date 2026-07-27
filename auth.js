/*=========================================
 ClientFlow CRM v3.0
 auth.js - Part 1
==========================================*/

// Toggle Password (Login)

const togglePassword = document.getElementById("togglePassword");
const loginPassword = document.getElementById("loginPassword");

if(togglePassword && loginPassword){

togglePassword.addEventListener("click",()=>{

const type =
loginPassword.getAttribute("type")==="password"
? "text"
: "password";

loginPassword.setAttribute("type",type);

togglePassword.innerHTML=
type==="password"
? '<i class="fa-solid fa-eye"></i>'
: '<i class="fa-solid fa-eye-slash"></i>';

});

}

// Toggle Password (Signup)

const toggleSignupPassword =
document.getElementById("toggleSignupPassword");

const signupPassword =
document.getElementById("signupPassword");

if(toggleSignupPassword && signupPassword){

toggleSignupPassword.addEventListener("click",()=>{

const type =
signupPassword.getAttribute("type")==="password"
? "text"
: "password";

signupPassword.setAttribute("type",type);

toggleSignupPassword.innerHTML=
type==="password"
? '<i class="fa-solid fa-eye"></i>'
: '<i class="fa-solid fa-eye-slash"></i>';

});

}

// Signup

const signupForm =
document.getElementById("signupForm");

if(signupForm){

signupForm.addEventListener("submit",(e)=>{

e.preventDefault();

const name =
document.getElementById("signupName").value.trim();

const email =
document.getElementById("signupEmail").value.trim();

const password =
document.getElementById("signupPassword").value;

const confirm =
document.getElementById("confirmPassword").value;

if(password!==confirm){

alert("Passwords do not match!");

return;

}

const user={

name,
email,
password

};

localStorage.setItem(
"crmUser",
JSON.stringify(user)
);

alert("Account created successfully!");

window.location.href="login.html";

});

}
/*=========================================
 ClientFlow CRM v3.0
 auth.js - Part 2
==========================================*/

// Login

const loginForm =
document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",(e)=>{

e.preventDefault();

const email =
document.getElementById("loginEmail").value.trim();

const password =
document.getElementById("loginPassword").value;

const savedUser =
JSON.parse(localStorage.getItem("crmUser"));

if(!savedUser){

alert("No account found. Please sign up first.");

window.location.href="signup.html";

return;

}

if(
email===savedUser.email &&
password===savedUser.password
){

localStorage.setItem("crmLoggedIn","true");

alert("Login Successful!");

window.location.href="index.html";

}else{

alert("Invalid email or password.");

}

});

}

// Session Check

if(
window.location.pathname.includes("index.html")
){

const loggedIn =
localStorage.getItem("crmLoggedIn");

if(loggedIn!=="true"){

window.location.href="login.html";

}

}

// Logout

function logout(){

localStorage.removeItem("crmLoggedIn");

window.location.href="login.html";

}
/*=========================================
 ClientFlow CRM v3.0
 auth.js - Part 3
==========================================*/

// Remember Me

const rememberCheckbox =
document.querySelector(".options input[type='checkbox']");

if(rememberCheckbox){

rememberCheckbox.checked =
localStorage.getItem("crmRemember")==="true";

rememberCheckbox.addEventListener("change",()=>{

localStorage.setItem(
"crmRemember",
rememberCheckbox.checked
);

});

}

// Loading Button

document.querySelectorAll(".login-btn").forEach(button=>{

button.addEventListener("click",()=>{

button.classList.add("loading");

setTimeout(()=>{

button.classList.remove("loading");

},1000);

});

});

// Enter Key Support

document.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

const active=document.activeElement;

if(active && active.tagName==="INPUT"){

const form=active.closest("form");

if(form){

form.requestSubmit();

}

}

}

});

// Welcome User

const savedUser =
JSON.parse(localStorage.getItem("crmUser"));

if(savedUser){

console.log(
`Welcome ${savedUser.name}`
);

}

// Auto Reset Forms

window.addEventListener("pageshow",()=>{

document.querySelectorAll("form").forEach(form=>{

form.reset();

});

});

// Logout Button Support

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",()=>{

localStorage.removeItem("crmLoggedIn");

window.location.href="login.html";

});

}

// Session Timeout (30 Minutes)

const SESSION_TIME = 30 * 60 * 1000;

if(localStorage.getItem("crmLoggedIn")==="true"){

const lastActivity =
Number(localStorage.getItem("lastActivity")) || Date.now();

if(Date.now()-lastActivity > SESSION_TIME){

localStorage.removeItem("crmLoggedIn");

alert("Session expired. Please login again.");

window.location.href="login.html";

}else{

localStorage.setItem(
"lastActivity",
Date.now()
);

}

}

// Update Activity

["click","keydown","mousemove"].forEach(event=>{

document.addEventListener(event,()=>{

if(localStorage.getItem("crmLoggedIn")==="true"){

localStorage.setItem(
"lastActivity",
Date.now()
);

}

});

});
