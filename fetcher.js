google.charts.load('current', {'packages':['corechart']});

const url = 'https://script.google.com/macros/s/AKfycbxCRRzzMgHAP6tQdJSa96kL_FgKokQTHeVKmtCxptP8sj--WYreRvims85AQdt5Tgk0/exec'
let newArray = [];
let studentid =[];
let bookid =[];
let borrowdate =[];
let returndate=[];
let reservationstatus=[];
let overduestatus =[];
let userrole = [];
let bookcategory = [];
let differencebtdates = [];
async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
function sumofarray(a) {        
    sum = a.reduce((partialSum, b) => partialSum + b, 0);
    console.log(sum)
}
///Differnece between dates
function diffbtdates(a,b) {
    for (var i = 0; i < a.length; i++) {
        date1 = new Date(a[i])
        date2 = new Date(b[i])
        differencebtdates.push(Math.round((Math.abs(date2-date1))/86400000));
    }
    console.log(differencebtdates)
}
///Count of variable
getData().then(rdata => {
    console.log(rdata)
    array = rdata.data;
    for (var j = 0; j<array.length; j++) {
        let rowdata = rdata.data[j];
        var result = Object.entries(rowdata);
        for (var i = 0; i < result.length; i ++) {
            newArray.push(result[i][1]);
    }}
    console.log(newArray.length)
    for (var k = 0; k < newArray.length; k+=8) {
        studentid.push(newArray[k])
    }
    for (var l = 1; l < newArray.length; l+=8) {
        bookid.push(newArray[l])
    }
    for (var m = 2; m < newArray.length; m+=8) {
        borrowdate.push(newArray[m])
    }
    for (var n = 3; n < newArray.length; n+=8) {
        returndate.push(newArray[n])
    }
    for (var o = 4; o < newArray.length; o+=8) {
        reservationstatus.push(newArray[o])
    }
    for (var p = 5; p < newArray.length; p+=8) {
        overduestatus.push(newArray[p])
    }
    for (var q = 6; q < newArray.length; q+=8) {
        userrole.push(newArray[q])
    }
    for (var r = 7; r < newArray.length; r+=8) {
        bookcategory.push(newArray[r])
    }
    console.log(newArray)
    console.log(studentid)
    diffbtdates(borrowdate,returndate)
});

function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }



