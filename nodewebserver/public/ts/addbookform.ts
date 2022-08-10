$(function ()
{
	$.ajaxSetup({cache: false});  // May need to turn off browser cache
	$("#add-button").click(AddBookClick);
});

function AddBookClick(e: JQuery.Event): boolean
{
	let json:any = {
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
		contentType: "application/json; charset=utf-8",     // <-- may need to remove charset=utf-8 for IE
		dataType: "json",
		success: (json, status, req) => console.log("Added book"),
		error: (req, status, error) => console.log(`Failed to add book -- ${error}`)
	});
	
	e.preventDefault();
	return false;
}