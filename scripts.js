let popoutbtn = document.querySelector('#menubtn');
let sidebar = document.querySelector(".sidebar");
let pagecontents = document.querySelector(".PageContents")
popoutbtn.onclick = function() {
    sidebar.classList.toggle("active");
    pagecontents.classList.toggle("active");
}