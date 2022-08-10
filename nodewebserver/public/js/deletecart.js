"use strict";
$(function () {
    $.ajaxSetup({ cache: false }); // May need to turn off browser cache
    $("#delete-cart-item").click(DeleteCartClick);
});
function DeleteCartClick()
{
	var cartId = parseInt($("#bookNo").val());
	
	$.ajax({
		cache: false,
		type: "DELETE",
		url: `http://localhost:1339/cart/${cartId}`,
		data: '',
		contentType: "application/json; charset=utf-8",     // <-- may need to remove charset=utf-8 for IE
		dataType: "json",
		success: (json, status, req) => window.alert("success"),
		error: (req, status, error) => window.alert("AJAX error")
	});	
}
//# sourceMappingURL=addbookform.js.map