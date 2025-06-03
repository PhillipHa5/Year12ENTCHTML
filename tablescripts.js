new DataTable('#MainTable', {
    ajax: 'https://script.google.com/macros/s/AKfycbxCRRzzMgHAP6tQdJSa96kL_FgKokQTHeVKmtCxptP8sj--WYreRvims85AQdt5Tgk0/exec',
    columns: [
        { data: 'user_id' },
        { data: 'book_id' },
        { data: 'borrow_date' },
        { data: 'return_date' },
        { data: 'reservation_status' },
        { data: 'overdue_status' },
        { data: 'user_role' },
        { data: 'book_category' },
    ]
});