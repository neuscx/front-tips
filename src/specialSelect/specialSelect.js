(function ($) {
    $.fn.specialSelect = function(options) {  //fn.aaa，任意xx可调用aaa函数
        var defaultOption = {
            //dom: $("select"),
            deleteIcon: "icon-shanchu5",
            editIcon: "icon-bianji-20160928",
            canDelete: false,
            data: [{id: -1, name: "无相关数据"}],
            nowId: -1,
            nowContent: "",
            placeholder: "请选择",
            selectFunction: function() {},
            delectFunction: function() {}
        };
        var finalOption = $.extend(defaultOption,options);

        var $thisDom = defaultOption.dom;
        var thisSelectId = $thisDom.attr("id");
        var $parentDiv = $thisDom.closest("div.common-manage-select-div");

        // 将数据插进select，并且渲染select。
        $thisDom.empty();
        $.each(finalOption.data, function (index, item) {
            var eachOption = $('<option>', {
                value: item.id,
                text: item.name
            });
            $thisDom.append(eachOption);
        });
        $thisDom.scombobox({
            fullMatch: true,
            empty: true,
            placeholder: defaultOption.placeholder,
            showDropDown: false,
            forbidInvalid: true,
            highlight: false,
            sort: false
        });

        // 插入其他的各种标签。
        var otherHtml = '<span class="cus-common-name common-manage-select-name" title="' + defaultOption.nowContent + '">' + defaultOption.nowContent + '</span>';
        otherHtml += '<span class="common-manage-select-span">';
        otherHtml += '<i class="iconfont ' + defaultOption.editIcon + ' pan-change-icon" id="editThisSelect"></i>';
        otherHtml += '</span>';
        $parentDiv.append(otherHtml);

        var $thisIconSpan = $parentDiv.find(".common-manage-select-span");
        if (defaultOption.canDelete === true) {
            if ($parentDiv.find(".common-manage-select-delete-icon").length === 0) {
                $thisIconSpan.prepend('<i class="iconfont icon-shanchu5 common-manage-select-delete-icon"></i>');
            }
        } else {
            $parentDiv.find(".common-manage-select-delete-icon").remove();
        }

        // 给scombobox-display加上自定义标签，更改其样式。
        $parentDiv.find(".scombobox-display").addClass("common-manage-select-input");
        // 将scombobox设为inline，不占空间，同时自适应宽度。
        $parentDiv.find(".scombobox").css("display", "inline");

        $parentDiv.find("#editThisSelect").on("click", function() {
            var $editDom = $parentDiv.find("#" + thisSelectId);
            $editDom.find(".scombobox-display").val("").show().focus();
            $editDom.find(".scombobox-list").show();
            $editDom.css({
                "position": "relative",
                "z-index": "9"
            });
            $editDom.append("<i class='iconfont icon-fangdajing common-manage-select-find-icon'></i>");
            //$parentDiv.find(".icon-fangdajing").css("top", "5px");
            $parentDiv.find(".common-manage-select-name").hide();
            $parentDiv.find(".common-manage-select-span").addClass('hide');
        });

        $parentDiv.find("select").change(function (event) {
            if (parseInt($(this).val()) !== parseInt(defaultOption.nowId)) {
                var select = {
                    id: $thisDom.val(),
                    name: $parentDiv.find(".scombobox-list p:hover").text()
                };
                defaultOption.selectFunction(select, function () {
                    var $thisDom = $(event.target);
                    defaultOption.nowId = select.id;
                    defaultOption.nowContent = select.name;
                    $parentDiv.find(".scombobox-list, .scombobox-display").hide();
                    if ($parentDiv.find(".common-manage-select-delete-icon").length === 0 && defaultOption.canDelete === true) {
                        $thisIconSpan.prepend('<i class="iconfont icon-shanchu5 common-manage-select-delete-icon"></i>');
                    }
                    $parentDiv.find(".common-manage-select-name").show().text(defaultOption.nowContent).attr('title', defaultOption.nowContent);
                    $parentDiv.find(".common-manage-select-span").removeClass('hide');
                });
            }
        });

        if (defaultOption.canDelete) {
            $parentDiv.on("click", ".common-manage-select-delete-icon", function () {
                defaultOption.delectFunction(function() {
                    defaultOption.nowId = -1;
                    defaultOption.nowContent = "";
                    $parentDiv.find(".common-manage-select-name").text("").attr("title", "");
                    $parentDiv.find("select").val("");
                    $parentDiv.find(".common-manage-select-delete-icon").remove();
                });
            });
        }
    }
})(jQuery);