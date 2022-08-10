"use strict";
$(function () {
    $.ajaxSetup({ cache: false }); // May need to turn off browser cache
    $("#add-button").click(AddBookClick);
});
function AddBookClick(e) {
    var json = {
        title: $("#title-textbox").val(),
        author: $("#author-textbox").val(),
        price: $("#price-textbox").val(),
        image: $("#image").val(),
    };
    $.ajax({
        cache: false,
        type: "POST",
        url: 'http://localhost:1339/books',
        data: JSON.stringify(json),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json, status, req) { return console.log("Added book"); },
        error: function (req, status, error) { return console.log("Failed to add book -- " + error); }
    });
    e.preventDefault();
    return false;
}
//# sourceMappingURL=addbookform.js.map