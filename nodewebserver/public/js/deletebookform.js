"use strict";
$(function () {
    $.ajaxSetup({ cache: false }); // May need to turn off browser cache
    $("#delete-button").click(DeleteBookClick);
});
function DeleteBookClick()
{
	var postId = parseInt($("#id-textbox").val());
	
	$.ajax({
		cache: false,
		type: "DELETE",
		url: `http://localhost:1339/books/${postId}`,
		data: '',
		contentType: "application/json; charset=utf-8",     // <-- may need to remove charset=utf-8 for IE
		dataType: "json",
		success: (json, status, req) => $("#deleteresults").html("<p>Successfully deleted product.</p>"),
		error: (req, status, error) => window.alert("AJAX error")
	});	
}
//# sourceMappingURL=addbookform.js.map