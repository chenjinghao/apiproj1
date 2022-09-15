// Adding account rows

$(function () {

    // Start counting from the third row
    var counter = 2;

    $("#insertRow").on("click", function (event) {
        event.preventDefault();

        var newRow = $("<tr>");
        var cols = '';

        // Table columns
        cols += '<th scrope="row">' + counter + '</th>';
        // cols += '<td><input class="form-control rounded-0" type="text" name="firstname" placeholder="Account Name"></td>';
        // cols += '<td><input class="form-control rounded-0" type="number" name="lastname" placeholder="Balance"></td>';
        // cols += '<td><button class="btn btn-danger rounded-0" id ="deleteRow"><i class="fa fa-trash"></i></button</td>';
        cols += '<td>';
        cols += '<select class="form-control" name="Bank" id="bank">';
        cols += '<option value="select">Select</option>';
        cols += '<option value="dbs">DBS Bank</option>';
        cols += '<option value="uob">UOB</option>';
        cols += '<option value="citi">Citibank</option>';
        cols += '<option value="maybank">Maybank</option>';
        cols += '<option value="scb">Standard Chartered</option>';
        cols += '<option value="sbi">SBI</option>';
        cols += '<option value="cimb">CIMB</option>';
        cols += '<option value="ocbc">OCBC</option>';
        cols += '</select></td>';
        cols += '<td><input type="number" class="form-control" placeholder="xxx-xx-xxx" aria-label="Account number"></td>';
        cols += '<td ><input type="number" class="form-control" placeholder="$" aria-label="Balance" name="balance"></td>';
        cols += '<td><button class="btn btn-danger rounded-0" id ="deleteRow"><i class="fa fa-trash"></i></button</td>';

        // Insert the columns inside a row
        newRow.append(cols);

        // Insert the row inside a table
        $(".table").append(newRow);

        // Increase counter after each row insertion
        counter++;
    });

    // Remove row when delete btn is clicked
    $("table").on("click", "#deleteRow", function (event) {
        $(this).closest("tr").remove();
        counter -= 1
    });
});