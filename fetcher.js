google.charts.load('current', { 'packages': ['corechart'] });
google.load('visualization', '1', { packages: ['controls'] });
const url = 'https://script.google.com/macros/s/AKfycbxCRRzzMgHAP6tQdJSa96kL_FgKokQTHeVKmtCxptP8sj--WYreRvims85AQdt5Tgk0/exec'
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
async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

function sumofarray(a) {
    sum = a.reduce((partialSum, b) => partialSum + b, 0);
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
    console.log("Count is:" + count)
    return count
}
///Average of variable
function averageofarray(a) {
    sum = a.reduce((partialSum, b) => partialSum + b, 0)
    average = sum / a.length;
    return a
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
    }
    for (var n = 3; n < newArray.length; n += 8) {
        returndate.push(newArray[n])
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
    console.log(arrayoverduetrue)
    countoverdue(arrayoverduetrue)
    drawoverduebooksChart()
    userrolepiechart()
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
                console.log(countoffilteredarray + "books overdue for day" + i)
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
                    'width': 600,
                    'height': 600,
                    'pieSliceText': 'value',
                    'legend': 'right',
                    'title': 'Number of Overdue Books for how long they are borrowed for',
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
        console.log(countofarray(userrole, "student"))
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
                'width': 600,
                'height': 600,
                'pieSliceText': 'value',
                'legend': 'right',
                'title': 'Different Users Borrowing',
                'is3D': true,
            }
        });
        dashboard.bind(nameSelect, pieChart);
        dashboard.draw(data);
    }, 1000)
};
//wadsudhjfg
function drawChart() {
    setTimeout(() => {
        var data = google.visualization.arrayToDataTable([
            ['User Role', 'Art', 'Fiction', 'Non-Fiction', 'History',
                'Science', { role: 'annotation' }
            ],
            ['Art', 10, 24, 20, 32, 18, ''],
            ['Fiction', 16, 22, 23, 30, 16, ''],
            ['Non-Fiction', 28, 19, 29, 30, 12, ''],
            ['History', 28, 19, 29, 30, 12, ''],
            ['Science', 28, 19, 29, 30, 12, '']
        ]);
        var view = new google.visualization.DataView(data);

        var options = {
            title: "Density of Precious Metals, in g/cm^3",
            width: 600,
            height: 400,
            legend: { position: 'top', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };
        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
        chart.draw(view, options);
    }, 1000)
};