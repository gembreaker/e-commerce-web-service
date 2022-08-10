"use strict";
$(function () {
    $.ajaxSetup({ cache: false }); // May need to turn off browser cache
    $("#search-button").click(SearchBookClick);
});
function SearchBookClick()
{
	var title = ("#search").val();
	
	$.ajax({
		cache: false,
		type: "GET",
		url: `http://localhost:1339/books/${title}`,
		data: '',
		contentType: "application/json; charset=utf-8",     // <-- may need to remove charset=utf-8 for IE
		dataType: "json",
		success: ReadAllSearchResult,
		error: (req, status, error) => window.alert("AJAX error")
	});	
}

function ReadAllSearchResult(json, status, req) {
    var html = "";
    for (var i in json) {
        var book = json[i];
        html += "\n\t\t<div class=\"col-md-4\">\n\t\t\t<div class=\"card mb-4 box-shadow\">\n\t\t\t\t<img class=\"card-img\" src=\"" + book.Image + "\" alt=\"" + book.Title + "\">\n\t\t\t\t<div class=\"card-body\">\n\t\t\t\t\t<h4 class=\"card-title\">" + book.Title + "</h4>\n\t\t\t\t\t<h6 class=\"card-subtitle mb-2 text-muted\">" + book.Author + "</h6>\n\t\t\t\t\t<div class=\"buy d-flex justify-content-between align-items-center\">\n\t\t\t\t\t\t<div class=\"price text-success\"><h5 class=\"mt-4\">\u00A3" + book.Price + "</h5></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<form action=\"addcart\" method=\"POST\">\n\t\t\t\t\t<input id=\"bookId\" name=\"bookId\" type=\"hidden\" value=\"" + book.Id + "\" />\n\t\t\t\t\t<br/><label for=\"quantity-textbox\">Quantity:</label>\n\t\t\t\t\t<input id=\"quantity-textbox\" name=\"quantity-textbox\" type=\"text\" />\n\t\t\t\t\t<br/><input type=\"submit\" class=\"btn btn-danger mt-3\" value=\"Add to Cart\"/>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t";
    }
    $("#searchresults").html(html);
}
//# sourceMappingURL=addbookform.js.map