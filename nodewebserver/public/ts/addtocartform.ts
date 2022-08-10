$(function () {
    $.ajaxSetup({ cache: false }); // May need to turn off browser cache
    $("#addCart-button").click(AddCartClick);
});
function AddCartClick(e: JQuery.Event): boolean {
    let json:any = {
        bookId: parseInt(<string>$("#bookId").val()),
        quantity: parseInt(<string>$("#quantity-textbox").val()),
    };
    $.ajax({
        cache: false,
        type: "POST",
        url: 'http://localhost:1339/cart',
        data: JSON.stringify(json),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json, status, req) { return console.log("Added to cart"); },
        error: function (req, status, error) { return console.log("Failed to add to cart -- " + error); }
    });
    e.preventDefault();
    return false;
}