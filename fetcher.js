google.charts.load('current', { 'packages': ['corechart'] });
google.charts.load("current", { packages: ["calendar"] });
google.load('visualization', '1', { packages: ['controls'] });
const url = 'https://script.google.com/macros/s/AKfycbxCRRzzMgHAP6tQdJSa96kL_FgKokQTHeVKmtCxptP8sj--WYreRvims85AQdt5Tgk0/exec'
let loader = document.getElementById("loaderwrapper")
let newArray = [];
let studentid = [];
let bookid = [];
let borrowdate = [];
let returndate = [];
let reservationstatus = [];
let overduestatus = [];
let userrole = [];
let bookcategory = [];
let differencebtdates = [];
let agdbdo = [];
let arrayoverduefalse = [];
let arrayoverduetrue = [];
let userrolegenre = [];
let dateCounts = {};
let dateCountArray = [];
let dateCountArrayFiltered = [];
const averagedayselement = document.getElementById('averagedaysoverdue');
const averagedaysbetweendates = document.getElementById('averagedaysbetweendates');
const totalbooksreserved = document.getElementById('totalbooksreserved');
const totalbooksborrowed = document.getElementById('totalbooksborrowed')
async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
function totalcountofarray(e) {
    let result = e.length;
    return result
}
function countdate() {
    for (let i = 0; i < borrowdate.length; i++) {
        let date = borrowdate[i];
        if (dateCounts[date]) {
            dateCounts[date]++;
        } else {
            dateCounts[date] = 1;
        }

    }
    for (let date in dateCounts) {
        dateCountArray.push([date, dateCounts[date]]);
    }
    for (let j = 0; j < dateCountArray.length; j++) {
        dateCountArrayFiltered.push(dateCountArray[j][0]);
        dateCountArrayFiltered.push(dateCountArray[j][1]);
    }
}

function joinarray(a, b, arrayresult) {
    for (var i = 0; i < a.length; i++) {
        arrayresult.push(a[i]);
        arrayresult.push(b[i]);
    }
}

function calculatedistinctcount(genre, userrole, array) {
    let countofdistinctcount = 0;
    for (var i = 0; i < array.length; i += 2) {
        if (array[i] == userrole) {
            if (array[i + 1] == genre) {
                countofdistinctcount = countofdistinctcount + 1;
            }
        }
    }
    return countofdistinctcount
}

function sumofarray(a) {
    sum = a.reduce((partialSum, b) => partialSum + b, 0);
    return sum
}
///Differnece between dates
function diffbtdates(a, b) {
    for (var i = 0; i < a.length; i++) {
        date1 = new Date(a[i])
        date2 = new Date(b[i])
        differencebtdates.push(Math.round((Math.abs(date2 - date1)) / 86400000));
    }
}
///Count of variable
function countofarray(chosenarray, chosenfilter) {
    var count = chosenarray.filter((el) => el.includes(chosenfilter)).length;
    return count
}
///Average of variable
function averageofarray(a) {
    sum = a.reduce((partialSum, b) => partialSum + b, 0)
    let average = sum / a.length;
    return average
}

function avgdiffbtdatesonoverdue() {
    /// get values of variable and put it into its own array
    for (var i = 0; i < overduestatus.length; i++) {
        agdbdo.push(overduestatus[i]);
        agdbdo.push(differencebtdates[i]);
    }
    //split into 2 arrays, one with overdue status 1, one with 0
    for (var j = 0; j < agdbdo.length; j += 2) {
        if (agdbdo[j] == "1") {
            arrayoverduetrue.push(agdbdo[j + 1]);
            arrayoverduetrue.map(Number);
        } else {
            arrayoverduefalse.push(agdbdo[j + 1]);
            arrayoverduefalse.map(Number);
        }
    }
}
/// count of each day and its overdue status
function countoverdue(a) {
    for (var i = 1; i < Math.max.apply(Math, a); i++) {
        filteredarray = a.filter((Number) => Number === i);
        countoffilteredarray = filteredarray.length
    }
}

function appendvalue(a, b) {
    a.textContent = b;
}

getData().then(rdata => {
    array = rdata.data;
    for (var j = 0; j < array.length; j++) {
        let rowdata = rdata.data[j];
        var result = Object.entries(rowdata);
        for (var i = 0; i < result.length; i++) {
            newArray.push(result[i][1]);
        }
    }
    for (var k = 0; k < newArray.length; k += 8) {
        studentid.push(newArray[k])
    }
    for (var l = 1; l < newArray.length; l += 8) {
        bookid.push(newArray[l])
    }
    for (var m = 2; m < newArray.length; m += 8) {
        borrowdate.push(newArray[m])
        borrowdate = borrowdate.map(dateStr => dateStr.split("T")[0]);
    }
    for (var n = 3; n < newArray.length; n += 8) {
        returndate.push(newArray[n])
        returndate = returndate.map(dateStr => dateStr.split("T")[0]);
    }
    for (var o = 4; o < newArray.length; o += 8) {
        reservationstatus.push(newArray[o])
    }
    for (var p = 5; p < newArray.length; p += 8) {
        overduestatus.push(newArray[p])
    }
    for (var q = 6; q < newArray.length; q += 8) {
        userrole.push(newArray[q])
    }
    for (var r = 7; r < newArray.length; r += 8) {
        bookcategory.push(newArray[r])
    }
    diffbtdates(borrowdate, returndate)
    countofarray(userrole, "student")
    countofarray(userrole, "faculty")
    countofarray(userrole, "staff")
    avgdiffbtdatesonoverdue()
    averageofarray(arrayoverduefalse)
    averageofarray(arrayoverduetrue)
    countoverdue(arrayoverduetrue)
    appendvalue(averagedayselement, Math.round(averageofarray(arrayoverduetrue),0))
    appendvalue(averagedaysbetweendates, Math.round(averageofarray(differencebtdates),0))
    appendvalue(totalbooksborrowed, totalcountofarray(borrowdate))
    appendvalue(totalbooksreserved, sumofarray(reservationstatus))
    drawoverduebooksChart()
    userrolepiechart()
    joinarray(userrole, bookcategory, userrolegenre)
    drawborrowuserrolecolumn()
    countdate()
    drawcalenderchart()
    setTimeout(() => { loader.classList.toggle("active") }, 1000);
});

function drawoverduebooksChart() {
    setTimeout(() => {
            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Days Borrowed');
            data.addColumn('number', 'Number of Overdue Books');
            for (var i = 1; i < Math.max.apply(Math, arrayoverduetrue); i++) {
                filteredarray = arrayoverduetrue.filter((Number) => Number === i);
                countoffilteredarray = filteredarray.length
                data.addRows([
                    [i, countoffilteredarray],
                ])
            }
            var dashboard = new google.visualization.Dashboard(
                document.getElementById('dashboard_div'));

            var donutRangeSlider = new google.visualization.ControlWrapper({
                'controlType': 'NumberRangeFilter',
                'containerId': 'filter_div',
                'options': {
                    'filterColumnLabel': 'Days Borrowed',
                }
            });
            var columnChart = new google.visualization.ChartWrapper({
                'chartType': 'ColumnChart',
                'containerId': 'chart_div',
                'options': {
                    'width': 800,
                    'height': 750,
                    'pieSliceText': 'value',
                    'legend': { position: 'top', maxLines: 3 },
                    'title': 'Number of Overdue Books and borrow length',
                    vAxes: {
                        0: {
                            title: 'Number of Overdue Books',
                            baseline: 0
                        },
                    },
                    hAxis: {
                        title: 'Days Borrowed'
                    },
                }
            });
            dashboard.bind(donutRangeSlider, columnChart);
            dashboard.draw(data);
        },
        1000);
};

function userrolepiechart() {
    setTimeout(() => {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'User Role');
        data.addColumn('number', 'Number Of People');
        data.addRows([
            ['Student', countofarray(userrole, "student")],
            ['Faculty', countofarray(userrole, "faculty")],
            ['Staff', countofarray(userrole, "staff")],
        ]);
        var dashboard = new google.visualization.Dashboard(
            document.getElementById('userrolepiechartdashboard'));
        var nameSelect = new google.visualization.ControlWrapper({
            'controlType': 'CategoryFilter',
            'containerId': 'filter_div1',
            'options': {
                'filterColumnLabel': 'User Role'
            }
        });
        var pieChart = new google.visualization.ChartWrapper({
            'chartType': 'PieChart',
            'containerId': 'chart_div1',
            'options': {
                'width': 800,
                'height': 600,
                'pieSliceText': 'value',
                'legend': { position: 'top', maxLines: 3 },
                'title': 'Different Users Borrowing',
                'is3D': true,
            }
        });
        dashboard.bind(nameSelect, pieChart);
        dashboard.draw(data);
    }, 1000)
};

function drawborrowuserrolecolumn() {
    setTimeout(() => {
        var data = google.visualization.arrayToDataTable([
            ['User Role', 'Student', 'Faculty', 'Staff', { role: 'annotation' }],
            ['Art', calculatedistinctcount("art", "student", userrolegenre), calculatedistinctcount("art", "faculty", userrolegenre), calculatedistinctcount("art", "staff", userrolegenre), ''],
            ['Fiction', calculatedistinctcount("fiction", "student", userrolegenre), calculatedistinctcount("fiction", "faculty", userrolegenre), calculatedistinctcount("fiction", "staff", userrolegenre), ''],
            ['Non-Fiction', calculatedistinctcount("non-fiction", "student", userrolegenre), calculatedistinctcount("non-fiction", "faculty", userrolegenre), calculatedistinctcount("non-fiction", "staff", userrolegenre), ''],
            ['History', calculatedistinctcount("history", "student", userrolegenre), calculatedistinctcount("history", "faculty", userrolegenre), calculatedistinctcount("history", "staff", userrolegenre), ''],
            ['Science', calculatedistinctcount("science", "student", userrolegenre), calculatedistinctcount("science", "faculty", userrolegenre), calculatedistinctcount("science", "staff", userrolegenre), '']
        ]);
        var view = new google.visualization.DataView(data);

        var dashboard = new google.visualization.Dashboard(
            document.getElementById('userrolepiechartdashboard'));
        var nameSelect = new google.visualization.ControlWrapper({
            'controlType': 'CategoryFilter',
            'containerId': 'filter_div2',
            'options': {
                'filterColumnLabel': 'User Role'
            }
        });
        var pieChart = new google.visualization.ChartWrapper({
            'chartType': 'ColumnChart',
            'containerId': 'chart_div2',
            'options': {
                'title': "Number of Books Borrowed for Each Genre and User Role",
                'width': 800,
                'height': 600,
                'legend': { position: 'top', maxLines: 3 },
                'bar': { groupWidth: '75%' },
                'isStacked': 'true',
            }
        });
        dashboard.bind(nameSelect, pieChart);
        dashboard.draw(data);
        var chart = new google.visualization.ColumnChart(document.getElementById("borrowuserrolecolumn"));
    }, 1000)
};

function drawcalenderchart() {
    setTimeout(() => {
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('date', 'Date');
        dataTable.addColumn('number', 'Count');
        for (var i = 0; i < dateCountArrayFiltered.length; i += 2) {
            dataTable.addRows([
                [new Date(dateCountArrayFiltered[i]), dateCountArrayFiltered[i + 1]]
            ], )
        };

        var dashboard = new google.visualization.Dashboard(
            document.getElementById('dashboard_div1'));

        var donutRangeSlider = new google.visualization.ControlWrapper({
            'controlType': 'DateRangeFilter',
            'containerId': 'filter_div3',
            'options': {
                'filterColumnLabel': 'Date',
            }
        });
        var columnChart = new google.visualization.ChartWrapper({
            'chartType': 'Calendar',
            'containerId': 'chart_div3',
            'options': {
                'width': 950,
                'height': 950,
                'pieSliceText': 'value',
                'legend': 'right',
                'title': 'Amount of Books Borrowed on A Certain Date',
            }
        });
        dashboard.bind(donutRangeSlider, columnChart);
        dashboard.draw(dataTable);
    }, 1000)
};