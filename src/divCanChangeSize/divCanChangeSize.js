(function ($) {
    // 我就是想用繁體來寫一下說明。我不管，今天才發現搜狗可以隨意切換簡繁體，就是任性。
    // 下面說一下這個插件的不足。
    // 1. 綁定了html標籤的mousemove事件，如果本身就有事件，容易被關掉。
    // 2. 並不是百分百成功。有些時候不能執行到鬆開鼠標的情況，需要再專門點一下才能執行到。
    //    原因可能是執行速率的問題。後面準備改為原生js的插件。
    // 3. 綁定的div中的內容需要是自適應的，不然極為ugly。。。
    $.fn.divCanChangeSize = function(options) {
        var defaultOption = {
            minWidth: 30,
            minheight:30
        };
        var finalOption = $.extend(defaultOption,options);
        var $dom = $(this);
        if ($dom.css("position") === "static") {
            $dom.css("position", "relative");
        }
        if ($dom.css("overflow") === "visible" && $dom.css("overflow-x") === "visible" && $dom.css("overflow-y") === "visible") {
            $dom.css("overflow", "hidden");
        }
        $("html").css({
            "width": "100%",
            "height": "100%"
        })
        
        function renderDirection (direction) {
            var self = this;
            var className = "divCanChangeSize-drag-" + direction;
            $dom.append('<div class="divCanChangeSize-around-div ' + className + '"></div>');
            var $thisDom = $dom.find("." + className);
            $thisDom.mousedown(function(e) {
                self.xPosition = e.pageX;
                self.yPosition = e.pageY;
                $dom.find(".divCanChangeSize-around-div").addClass("divCanChangeSize-cursor-" + direction);
                $("html").mousemove(function(event) {
                    // 下面這一句是強制去除所有的選中，因為有時候挪動的時候會挪動到選中的東西，造成bug。
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                    var nowXPosition = event.pageX;
                    var nowYPosition = event.pageY;
                    var moveX = 0, moveY = 0, marginLeft, marginTop, finalWidth, finalHeight;
                    // 下面trigger("mouseover")觸發的點擊事件以下兩個值均為undefined。需要屏蔽。
                    if (nowXPosition === undefined || nowYPosition === undefined) {
                        return;
                    }
                    var thisMarginLeft = parseFloat($dom.css("margin-left"));
                    var thisMarginTop = parseFloat($dom.css("margin-top"));
                    var thisWidth = $dom.width();
                    var thisHeight = $dom.height();
                    if (direction === "top") {
                        moveY = self.yPosition - nowYPosition;
                        marginTop = thisMarginTop - moveY;
                    } else if (direction === 'bottom') {
                        moveY = nowYPosition - self.yPosition;
                    } else if (direction === 'right') {
                        moveX = nowXPosition - self.xPosition;
                    } else if (direction === 'left') {
                        moveX = self.xPosition - nowXPosition;
                        marginLeft = thisMarginLeft - moveX;
                    } else if (direction === 'top-left') {
                        moveX = self.xPosition - nowXPosition;
                        moveY = self.yPosition - nowYPosition;
                        marginLeft = thisMarginLeft - moveX;
                        marginTop = thisMarginTop - moveY;
                    } else if (direction === 'top-right') {
                        moveX = nowXPosition - self.xPosition;
                        moveY = self.yPosition - nowYPosition;
                        marginTop = thisMarginTop - moveY;
                    } else if (direction === 'bottom-left') {
                        moveX = nowXPosition - self.xPosition;
                        moveY = nowYPosition - self.yPosition;
                        marginLeft = thisMarginLeft - moveX;
                    } else if (direction === 'bottom-right') {
                        moveX = nowXPosition - self.xPosition;
                        moveY = nowYPosition - self.yPosition;
                    }
                    finalWidth = thisWidth + moveX;
                    finalHeight = thisHeight + moveY;
                    if (finalWidth < defaultOption.minWidth) {
                        finalWidth = defaultOption.minWidth;
                    }
                    if (finalHeight < defaultOption.minheight) {
                        finalHeight = defaultOption.minheight;
                    }
                    self.xPosition = nowXPosition;
                    self.yPosition = nowYPosition;
                    $dom.css({
                        "width": finalWidth + "px",
                        "height": finalHeight + "px"
                    });
                    if (marginLeft !== undefined) {
                        $dom.css("margin-left", marginLeft + "px");
                    }
                    if (marginTop != undefined) {
                        $dom.css("margin-top", marginTop + "px");
                    }
                });
                $("html").mouseup(function(){
                    $("html").unbind("mousemove");
                    $dom.find(".divCanChangeSize-cursor-" + direction).removeClass("divCanChangeSize-cursor-" + direction);
                });
                $("html").trigger("mousemove");
            });
        }

        var allDirection = ["top", "left", "right", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"];
        for (var i = 0; i < allDirection.length; i++) {
            renderDirection(allDirection[i]);
        }
    }
})(jQuery);