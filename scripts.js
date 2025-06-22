let popoutbtn = document.querySelector('#menubtn');
let sidebar = document.querySelector(".sidebar");
let pagecontents = document.querySelector(".PageContents")
popoutbtn.onclick = function() {
    sidebar.classList.toggle("active");
    pagecontents.classList.toggle("active");
}
sidebar.onclick = function() {
    sidebar.classList.add("active");
    pagecontents.classList.add("active");
}
pagecontents.onclick = function() {
    sidebar.classList.remove("active")
    pagecontents.classList.remove("active")
}