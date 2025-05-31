const scriptURL = 'https://script.google.com/macros/s/AKfycbxCRRzzMgHAP6tQdJSa96kL_FgKokQTHeVKmtCxptP8sj--WYreRvims85AQdt5Tgk0/exec'
const form = document.getElementById("AddRecordForm")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    var formGabuisaveryniceman = {};
    for (let pair of formData.entries()) {
        if (pair[0] == "reserved_status") {
            pair[1] = 1;
        }
        if (pair[0] == "overdue_status") {
            pair[1] = 1;
        }
        formGabuisaveryniceman[pair[0]] = pair[1];
    }
    if (!Object.keys(formGabuisaveryniceman).includes("reserved_status")) {
        formGabuisaveryniceman["reserved_status"] = 0;
    }
    if (!Object.keys(formGabuisaveryniceman).includes("overdue_status")) {
        formGabuisaveryniceman["overdue_status"] = 0;
    }
    console.log(formGabuisaveryniceman);
    formGabuisaveryniceman = JSON.stringify(formGabuisaveryniceman);
    console.log(formGabuisaveryniceman);
    fetch(scriptURL, { redirect: "follow", method: "POST", body: formGabuisaveryniceman, headers: {
    'Content-Type': 'application/json'
  }, })
        .then((response) => {
            swal("Done", "Submitted Successfully.", "success");
        })
        .catch((error) => {
            swal("Error", "Something went wrong. please try again!", "error");
        });
});

