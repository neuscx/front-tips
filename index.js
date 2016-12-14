$(function() {
    var router = new app.Router();
    router.setup({
        '#dragDiv': function(){
            $("body").empty();
            $.ajax({
                type: "get",
                url: "src/dragDiv/dragDivTemplate.html",
                success: function (response) {
                    $("body").append(response);
                    // $("body").append($("#dragDiv").html());
                },
                error: function (response) {
                    console.log("error");
                }
            });
        },
        // '#/show/(.*)': function(id){
        //     console.log('show', id); 
        // }
    }, function(){
        console.log('default router');
    });
    router.start();
});