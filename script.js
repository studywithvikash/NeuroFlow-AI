/*=========================================
  ClientFlow CRM Dashboard
  script.js
==========================================*/

// ==============================
// Dark / Light Mode
// ==============================

const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {

            localStorage.setItem("theme", "light");
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem("theme", "dark");
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';

        }

    });

}

// ==============================
// Sidebar Toggle (Mobile)
// ==============================

const sidebar = document.querySelector(".sidebar");

const menuButton = document.createElement("button");

menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';

menuButton.className = "mobile-menu-btn";

document.body.appendChild(menuButton);

menuButton.addEventListener("click", () => {

    sidebar.classList.toggle("active");

});

// ==============================
// Active Sidebar Menu
// ==============================

const menuItems = document.querySelectorAll(".sidebar-menu li");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(i => i.classList.remove("active"));

        item.classList.add("active");

    });

});

// ==============================
// Search Filter
// ==============================

const searchInput = document.querySelector(".search-box input");

const rows = document.querySelectorAll("tbody tr");

if(searchInput){

searchInput.addEventListener("keyup", function(){

const value = this.value.toLowerCase();

rows.forEach(row=>{

const text=row.innerText.toLowerCase();

row.style.display=text.includes(value)?"":"none";

});

});

}

// ==============================
// Notification Click
// ==============================

const notification = document.querySelector(".notification");

if(notification){

notification.addEventListener("click",()=>{

alert("You have 5 new notifications.");

});

}

// ==============================
// Stat Card Hover Effect
// ==============================

const statCards = document.querySelectorAll(".stat-card");

statCards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0) scale(1)";

});

});

// ==============================
// Animated Counter
// ==============================

const counters=document.querySelectorAll(".stat-card h2");

counters.forEach(counter=>{

const target=counter.innerText;

const number=parseFloat(target.replace(/[^\d.]/g,""));

if(isNaN(number)) return;

let current=0;

const increment=number/60;

const update=()=>{

current+=increment;

if(current<number){

if(target.includes("%")){

counter.innerText=current.toFixed(0)+"%";

}else if(target.includes("$")){

counter.innerText="$"+Math.floor(current).toLocaleString();

}else{

counter.innerText=Math.floor(current).toLocaleString();

}

requestAnimationFrame(update);

}else{

counter.innerText=target;

}

};

update();

});

// ==============================
// Fade In Animation
// ==============================

const cards=document.querySelectorAll(
".stat-card,.chart-card,.pipeline-card,.table-card,.activity-card,.team-card,.calendar-card,.notification-card,.action-btn"
);

const reveal=()=>{

cards.forEach(card=>{

const top=card.getBoundingClientRect().top;

if(top<window.innerHeight-80){

card.style.opacity="1";
card.style.transform="translateY(0)";

}

});

};

cards.forEach(card=>{

card.style.opacity="0";
card.style.transform="translateY(40px)";
card.style.transition=".7s";

});

window.addEventListener("scroll",reveal);

window.addEventListener("load",reveal);

// ==============================
// Fake Live Notification
// ==============================

setInterval(()=>{

const badge=document.querySelector(".badge");

if(!badge) return;

let count=parseInt(badge.innerText);

count++;

if(count>9) count=1;

badge.innerText=count;

},15000);

// ==============================
// Console
// ==============================

console.log("🚀 ClientFlow CRM Loaded Successfully");
