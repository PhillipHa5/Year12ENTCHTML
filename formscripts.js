const form = document.getElementById("AddRecordForm");
const submitButton = document.getElementById("formsubmit");
const messageDiv = document.getElementById("message");


form.addEventListener("submit", async function(e) {
    e.preventDefault();
    Swal.fire({
        title: "Submitting...",
        text: "Submitting Form",
        icon: "success"
    });
    const bd = new Date(document.getElementById("borrow_date").value);
    const rd = new Date(document.getElementById("return_date").value);
    console.log(typeof(bd))
    console.log(typeof(rd))
    submitButton.disabled = true;
    let errorstatus = 0;

    try {
        const formData = new FormData(this);
        const formDataObj = {};
        for (let [key, value] of formData.entries()) {
            if (key === "reservation_status") {
                formDataObj[key] = "1";
            } else if (key === "overdue_status") {
                formDataObj[key] = "1";
            } else if (value === "") {
                Swal.fire({
                    title: "Error",
                    text: "Error: Cannot Submit empty records",
                    icon: "error"
                });
                errorstatus = 1;
                form.reset()
                break
            } else if (bd > rd) {
                Swal.fire({
                    title: "Error",
                    text: "Error: Return Date is before Borrow Date",
                    icon: "error"
                });
                errorstatus = 1;
                form.reset()
                break
            } else {
                formDataObj[key] = value;
            }
        }
        if (!Object.keys(formDataObj).includes("reservation_status")) {
            formDataObj["reservation_status"] = "0";
        }
        if (!Object.keys(formDataObj).includes("overdue_status")) {
            formDataObj["overdue_status"] = "0";
        }
        if (errorstatus === 0) {
            const scriptURL = "https://script.google.com/macros/s/AKfycbzOrRRg3zcvpmkVhGw7hrtjMIdV6pp9XeDhjuzwDaa5cVqhknudasa75BNM5MgSUYpM/exec";
            const response = await fetch(scriptURL, {
                redirect: "follow",
                method: "POST",
                body: JSON.stringify(formDataObj),
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
            });
            const data = await response.json();
            if (data.status === "success") {
                Swal.fire({
                    title: "Success",
                    text: "Data submitted successfully!",
                    icon: "success"
                });
                form.reset();
            } else {
                throw new Error(data.message || "Submission failed");
            }
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Error: " + error.message,
            icon: "error"
        });
    } finally {
        submitButton.disabled = false;
        submitButton.classList.remove("is-loading");
    }
});