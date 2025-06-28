new DataTable('#MainTable', {
    ajax: 'https://script.google.com/macros/s/AKfycbwqIGgUgLFAlDYkGhZDOBgOkAYiJaMxs7khQogUZqLd0RWE2TyJgWGrc8Pvj0LK-WAV/exec',
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