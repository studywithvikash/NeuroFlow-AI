/*=========================================
 ClientFlow CRM v2.0
 script.js - Part 1
==========================================*/

// Theme Toggle

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

themeToggle.addEventListener("click", () => {

document.body.classList.toggle("light-mode");

localStorage.setItem(
"theme",
document.body.classList.contains("light-mode")
? "light"
: "dark"
);

});

}

if (localStorage.getItem("theme") === "light") {

document.body.classList.add("light-mode");

}

// Customer Elements

const addCustomerBtn = document.getElementById("addCustomerBtn");
const customerModal = document.getElementById("customerModal");
const saveCustomer = document.getElementById("saveCustomer");

const customerName = document.getElementById("customerName");
const customerCompany = document.getElementById("customerCompany");
const customerRevenue = document.getElementById("customerRevenue");

const customerTable = document.getElementById("customerTable");
const toast = document.getElementById("toast");

// Customers Array

let customers =
JSON.parse(localStorage.getItem("customers")) || [];

// Modal Open

if(addCustomerBtn){

addCustomerBtn.onclick=(e)=>{

e.preventDefault();

customerModal.classList.add("active");

};

}

// Close Modal

window.onclick=(e)=>{

if(e.target===customerModal){

customerModal.classList.remove("active");

}

};

// Toast

function showToast(message){

toast.innerText=message;

toast.style.display="block";

setTimeout(()=>{

toast.style.display="none";

},2500);

}

// Save Customer

if(saveCustomer){

saveCustomer.onclick=()=>{

const name=customerName.value.trim();

const company=customerCompany.value.trim();

const revenue=customerRevenue.value.trim();

if(!name || !company || !revenue){

showToast("Please fill all fields");

return;

}

customers.push({

name,

company,

revenue

});

localStorage.setItem(
"customers",
JSON.stringify(customers)
);

customerName.value="";
customerCompany.value="";
customerRevenue.value="";

customerModal.classList.remove("active");

loadCustomers();

showToast("Customer Added");

};

}
/*=========================================
 ClientFlow CRM v2.0
 script.js - Part 2
==========================================*/

// Render Customers

function loadCustomers(list = customers){

if(!customerTable) return;

customerTable.innerHTML="";

list.forEach((customer,index)=>{

customerTable.innerHTML += `

<tr>

<td>${customer.name}</td>

<td>${customer.company}</td>

<td>
<span class="status active">
Active
</span>
</td>

<td>$${customer.revenue}</td>

<td>

<div class="action-buttons">

<button class="edit-btn"
onclick="editCustomer(${index})">

Edit

</button>

<button class="delete-btn"
onclick="deleteCustomer(${index})">

Delete

</button>

</div>

</td>

</tr>

`;

});

}

// Initial Load

loadCustomers();

// Delete Customer

function deleteCustomer(index){

if(!confirm("Delete this customer?")) return;

customers.splice(index,1);

localStorage.setItem(
"customers",
JSON.stringify(customers)
);

loadCustomers();

showToast("Customer Deleted");

}

// Edit Customer

function editCustomer(index){

let customer = customers[index];

const name = prompt(
"Customer Name",
customer.name
);

if(name===null) return;

const company = prompt(
"Company Name",
customer.company
);

if(company===null) return;

const revenue = prompt(
"Revenue",
customer.revenue
);

if(revenue===null) return;

customers[index]={

name,
company,
revenue

};

localStorage.setItem(
"customers",
JSON.stringify(customers)
);

loadCustomers();

showToast("Customer Updated");

}

// Live Search

const searchInput =
document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("input",()=>{

const keyword =
searchInput.value.toLowerCase();

const filtered =
customers.filter(customer=>

customer.name.toLowerCase().includes(keyword) ||

customer.company.toLowerCase().includes(keyword)

);

loadCustomers(filtered);

});

}

// Export CSV

const exportBtn =
document.getElementById("exportCSV");

if(exportBtn){

exportBtn.onclick=()=>{

let csv =
"Name,Company,Revenue\n";

customers.forEach(customer=>{

csv +=
`${customer.name},${customer.company},${customer.revenue}\n`;

});

const blob =
new Blob([csv],{
type:"text/csv"
});

const url =
URL.createObjectURL(blob);

const a =
document.createElement("a");

a.href=url;

a.download="customers.csv";

a.click();

URL.revokeObjectURL(url);

showToast("CSV Exported");

};

}
/*=========================================
 ClientFlow CRM v2.0
 script.js - Part 3
==========================================*/

// Revenue Chart

const salesChartCanvas = document.getElementById("salesChart");

if(salesChartCanvas){

new Chart(salesChartCanvas,{

type:"line",

data:{

labels:[
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul"
],

datasets:[{

label:"Revenue",

data:[
12000,
18000,
15000,
22000,
26000,
30000,
35400
],

borderWidth:3,

fill:false,

tension:0.4

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

display:true

}

}

}

});

}

// Customer Chart

const customerChartCanvas =
document.getElementById("customerChart");

if(customerChartCanvas){

new Chart(customerChartCanvas,{

type:"doughnut",

data:{

labels:[
"Active",
"Pending",
"Inactive"
],

datasets:[{

data:[
65,
20,
15
]

}]

},

options:{

responsive:true,

maintainAspectRatio:false

}

});

}

// Dashboard Count

function updateDashboard(){

const totalCustomers = customers.length;

const customerCard =
document.querySelectorAll(".stat-card h2");

if(customerCard.length>1){

customerCard[1].textContent =
totalCustomers;

}

}

updateDashboard();

// Refresh Dashboard

const oldLoad = loadCustomers;

loadCustomers = function(list = customers){

oldLoad(list);

updateDashboard();

};

// Keyboard Shortcut

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="n"){

e.preventDefault();

customerModal.classList.add("active");

}

});

// ESC Close Modal

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

customerModal.classList.remove("active");

}

});

// Welcome Toast

window.addEventListener("load",()=>{

setTimeout(()=>{

showToast("Welcome to ClientFlow CRM");

},700);

});
