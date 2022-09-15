

function renderBTO(e){    

    var text = "BTO";
    var text = '<iframe width="1000" height="400" src="https://www.srx.com.sg/hdb/bto#bto-forecast" title="BTO Indicative Price"></iframe>';
    document.querySelector(".pricingpanel").innerHTML = text;
    
  }
 // function renderHDB(e){    

 // var text = '<iframe width="600" height="400" src="https://data.gov.sg/dataset/resale-flat-prices/resource/f1765b54-a209-4718-8d38-a39237f502b3/view/093ff0f0-783f-4f6a-be52-7e506a8c58ca" frameBorder="0"> </iframe>';
 //     document.querySelector(".pricingpanel").innerHTML = text;
    
 //  }
 function renderHDB1(e){  
   $.getJSON('https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&sort=month%20desc', function(data) {
    // JSON result in `data` variable
     
     var hdbdata = data.result.records;


var text ="<table width class='table table-hover'><thead><td>Date</td> <td>Location</td> <td>Remaining Lease</td> <td>Size</td><td>Price</td></thead><tbody>";
hdbdata.forEach(function(item){    
text = text + `<tr class='table-primary'><td> ${item.month} </td> <td> ${item.town} </td> <td> ${item.remaining_lease} </td> <td> ${item.flat_type} </td>  
                  <td> ${item.resale_price} </td> </tr>`
      
     });
      text += "</tbody></table>"
      $(".pricingpanel").html(text);   
});
 }


function renderCondo(e){    

    var text = '<iframe width="1000" height="400" src="https://www.squarefoot.com.sg/latest-transactions/sale/residential/condominium" title="Condo Indicative Price"></iframe>';
    document.querySelector(".pricingpanel").innerHTML = text;
  
  }




BTO.addEventListener('click',renderBTO);
HDB.addEventListener('click',renderHDB1);
Condo.addEventListener('click',renderCondo);

//calculate Monthly Contribution

var total = document.getElementById('total');
var val1 = document.getElementById('val1');
var val2 = document.getElementById('val2');
var val3 = document.getElementById('val3');
var val4 = document.getElementById('val4');


total.addEventListener("input", goalamt);
val1.addEventListener("input", totalfunds);
val2.addEventListener("input", check);
val3.addEventListener("input", sum);
val4.addEventListener("input", sum);

//Add Category items  
  function goalamt() {
    var myIncome = parseFloat(total.value) || 0;
    var downpayment = (myIncome*0.2) ||0;
    dprequire.innerHTML = "$ "+downpayment;
  }
  function totalfunds() {
    var funds = 100000 //taken from database
    dpfunds.innerHTML = "$ "+funds;
  }
  // function check() {
   //   if (goalamt =< totalfunds) then ready.innerHTML = "Yes"
   // } else {
   //   if (goalamt > totalfunds) then ready.innerHTML = "No"
   // }