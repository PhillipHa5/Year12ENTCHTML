const form = document.getElementById("AddRecordForm");
const submitButton = document.getElementById("formsubmit");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    messageDiv.textContent = "Submitting...";
    messageDiv.style.display = "block";
    messageDiv.style.backgroundColor = "beige";
    messageDiv.style.color = "black";
    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
    let errorstatus = 0;

    try {
        const formData = new FormData(this);
        const formDataObj = {};
        for (let [key, value] of formData.entries()) {
        if (key === "reservation_status") {
            formDataObj[key] = "1";
        }  
        else if (key === "overdue_status") {
            formDataObj[key] = "1";
        } 
        else if (value === "") {
            messageDiv.textContent = "Error: Cannot submit empty records";
            messageDiv.style.backgroundColor = "#f14668";
            messageDiv.style.color = "white";
            errorstatus = 1;
            form.reset()
            break
        } else {
            formDataObj[key] = value;
            }
        }
        if(!Object.keys(formDataObj).includes("reservation_status")) {
            formDataObj["reservation_status"] = "0";
        }
        if(!Object.keys(formDataObj).includes("overdue_status")) {
            formDataObj["overdue_status"] = "0";
        } 
                     
        const scriptURL = "https://script.google.com/macros/s/AKfycbzOrRRg3zcvpmkVhGw7hrtjMIdV6pp9XeDhjuzwDaa5cVqhknudasa75BNM5MgSUYpM/exec";
        console.log(formDataObj)
        const response = await fetch(scriptURL, {
            redirect: "follow",
            method: "POST",
            body: JSON.stringify(formDataObj),
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
          });
          if(errorstatus === 0) {
          const data = await response.json();
          if (data.status === "success") {
            messageDiv.textContent =
              data.message || "Data submitted successfully!";
            messageDiv.style.backgroundColor = "#48c78e";
            messageDiv.style.color = "white";
            form.reset();
          } else {
            throw new Error(data.message || "Submission failed");
          } }
        } catch (error) {
          console.error("Error:", error);
          messageDiv.textContent = "Error: " + error.message;
          messageDiv.style.backgroundColor = "#f14668";
          messageDiv.style.color = "white";
        } finally {
          submitButton.disabled = false;
          submitButton.classList.remove("is-loading");

          setTimeout(() => {
            messageDiv.textContent = "";
            messageDiv.style.display = "none";
          }, 4000);
        } 
      });