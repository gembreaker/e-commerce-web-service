"use strict";
$(function () {
    $.ajaxSetup({ cache: false }); // May need to turn off browser cache
    $("#read-cart").click(ReadCartClick);
});
function ReadCartClick(e) {
    $.ajax({
        cache: false,
        type: "GET",
        url: 'http://localhost:1339/cart',
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ReadAllCartResult,
        error: function (req, status, error) { return console.log("Failed to read cart"); }
    });
    e.preventDefault();
    return false;
}
function ReadAllCartResult(json, status, req) {
    var html = "";
    for (var i in json) {
        var cart = json[i];
        html += "\n\t\t\t<h4>Cart Id: " + cart.CartId + "</h4>\n\t\t\t<h4>Quantity: " + cart.Quantity + "</h4>\n\t\t\t<h4>Book Id: " + cart.BookId + "</h4>\n\t\t\t<button class=\"open-button\" onclick=\"openForm()\">Open Form</button>\n\t\t\t<div class=\"form-popup\" id=\"myForm\">\n\t\t\t<form action=\"addorder\" method=\"POST\" class=\"form-container\">\n\t\t\t\t<h1>Order</h1>\n\n\t\t\t\t<input id=\"bookNo\" name=\"bookNo\" type=\"hidden\" value=\"" + cart.BookId + "\" />\n\n\t\t\t\t<input id=\"quantityNo\" name=\"quantityNo\" type=\"hidden\" value=\"" + cart.Quantity + "\" />\n\n\t\t\t\t<label for=\"firstName\"><b>First Name</b></label>\n\t\t\t\t<input id=\"firstName\" type=\"text\" placeholder=\"First Name\" name=\"firstName\" required>\n\n\t\t\t\t<label for=\"lastName\"><b>Last Name</b></label>\n\t\t\t\t<input id=\"lastName\" type=\"text\" placeholder=\"Last Name\" name=\"lastName\" required>\n\n\t\t\t\t<label for=\"email\"><b>Email</b></label>\n\t\t\t\t<input id=\"email\" type=\"text\" placeholder=\"Email\" name=\"email\" required>\n\n\t\t\t\t<button id=\"delete-cart-item\" type=\"submit\" class=\"btn\">Submit</button>\n\t\t\t\t<button type=\"button\" class=\"btn cancel\" onclick=\"closeForm()\">Close</button>\n\t\t\t</form>\n\t\t\t</div>\n\n\t\t\t<br /> <br /> <br /> <br />\n\t\t";
    }
    $("#all-cart-items").html(html);
}
//# sourceMappingURL=readcartitems.js.map