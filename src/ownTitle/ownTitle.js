$(function () {
    // 好吧。。这东西全是bug。。从项目中移植不出来。。与项目的耦合度太高。。
    $.fn.ownTitle = function(options) {
        var self = this;                  // 定义了当前函数，以便用于一些挂在函数底下的自定义参数。
        var defaultOption = {
            modalName: "main",            // 当前模块的owntitle前缀。
            parentDom: "body"          // 鼠标悬浮在哪个父元素上会出现owntitle。
        };
        var finalOption = $.extend(defaultOption,options);

        self.thisTitle = "";

        var $thisDom = $(this);           // 当前视图,用来监听当前视图底下是否有owntitle

        var className = finalOption.modalName + "-myOwnTitle-name";
        var idName = finalOption.modalName + "OwnTitle";
        var idSelect = "#" + idName;
        var documentX = window.innerWidth - 2;
        var documentY = window.innerHeight - 2;
        $thisDom.mousemove(function (e) {
            self.isMove = true;
            var $dom = $(e.target);
            var $thisParent;
            if (!$dom.parents(defaultOption.parentDom)) {
                $(idSelect).fadeOut(400);
                self.thisTitle = "";
                return;
            }
            var $thisHasOwnTitle = $dom;
            self.thisTitle = $thisHasOwnTitle.attr("owntitle");
            if (self.thisTitle !== "") {
                var newDate = new Date();
                self.date = newDate;
                $(idSelect).remove();
                self.isMove = false;
                setTimeout(function () {
                    if (!self.isMove && (newDate === self.date) && (e.pageX >= 1) && (e.pageY >= 1) && (e.pageX <= documentX) && (e.pageY <= documentY)) {
                        $(idSelect).remove();
                        $("body").append("<div id='" + idName + "' class='my-own-title' style='left:" + e.pageX + "px;top:" + (e.pageY + 23) + "px;'>" + $dom.attr("owntitle") + "</div>");
                        $(idSelect).fadeIn(400);
                    }
                }, 500);
            } else {
                $(idSelect).fadeOut(400);
            }
        });

        $("body").on("click", ".my-own-title", function (e) {
            e.stopPropagation();
            e.preventDefault();
        });
    };
})