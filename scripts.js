let popoutbtn = document.querySelector('#menubtn');
let sidebar = document.querySelector(".sidebar");
let pagecontents = document.querySelector(".PageContents")

popoutbtn.onclick = function() {
    sidebar.classList.toggle("active");
    pagecontents.classList.toggle("active");
}

new DataTable('#MainTable', {
    ajax: 'https://script.google.com/macros/s/AKfycbyYpVWPHCnvd__x1XrPVJfLkxylslBA7b2Svrr13ZMxA-iJpJ5Lc1mWkioB7XUCwhpJ/exec',
    columns: [
        { data: 'count'},
        { data: 'user_id' },
        { data: 'book_id' },
        { data: 'borrow_date' },
        { data: 'return_date' },
        { data: 'reservation_status' },
        { data: 'overdue_status' },
        { data: 'user_role'},
        { data: 'book_category'},
    ]
});