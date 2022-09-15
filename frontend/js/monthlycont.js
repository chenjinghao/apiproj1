//calculate Monthly Contribution

var val0 = document.getElementById('val0');
var val1 = document.getElementById('val1');
var val2 = document.getElementById('val2');
var val3 = document.getElementById('val3');
var val4 = document.getElementById('val4');


val0.addEventListener("input", sum);
val1.addEventListener("input", sum);
val2.addEventListener("input", sum);
val3.addEventListener("input", sum);
val4.addEventListener("input", sum);

//Add Category items
function sum() {
    var myIncome = parseFloat(val0.value) || 0;
    var one = parseFloat(val1.value) || 0;
    var two = parseFloat(val2.value) || 0;
    var three = parseFloat(val3.value) || 0;
    var four = parseFloat(val4.value) || 0;

    var balance = myIncome - (one + two + three + four) || 0;

    others.innerHTML = "$ " + balance;

    prcnt1.innerHTML = ((one / myIncome) * 100).toFixed(2);
    prcnt2.innerHTML = ((two / myIncome) * 100).toFixed(2);
    prcnt3.innerHTML = ((three / myIncome) * 100).toFixed(2);
    prcnt4.innerHTML = ((four / myIncome) * 100).toFixed(2);
    prcnt5.innerHTML = ((balance / myIncome) * 100).toFixed(2);

    return [myIncome, one, two, three, four, balance];

}

//clear monthly contribution form
function myFunction() {
    document.getElementById("myForm").reset();
    others.innerHTML = "";
    prcnt1.innerHTML = "";
    prcnt2.innerHTML = "";
    prcnt3.innerHTML = "";
    prcnt4.innerHTML = "";
    prcnt5.innerHTML = "";
}

function updateButton() {
    var val = sum();
    var update = [{ "income": val[0], "savings": val[1], "investment": val[2], "housing": val[3], "insurance": val[4], "others": val[5] }]
    console.log(update);
}