$(function() {
	// 验证日期是否在一个区间内，日期判断
    // function isDateAvailable(thisDate) {
    //     var date1 = "2016/08/08";
    //     var date2 = "2016/10/10";
    //     var oDate1 = new Date(date1);
    //     var oDate2 = new Date(date2);
    //     thisDate = thisDate.replace(/-/g,"/");
    //     var oThisDate = new Date(thisDate);
    //     if( (oDate1.getTime() <= oThisDate.getTime()) && ( oThisDate.getTime() <= oDate2.getTime() ) ){
    //         console.log(true);
    //     } else {
    //         console.log(false);
    //     }
    // }
    // isDateAvailable("2016/08/07");
    // isDateAvailable("2016/08/08");
    // isDateAvailable("2016/10/01");
    // isDateAvailable("2016/10/10");

    // 这个是title闪烁的代码
    // var flashTitlePlayer = {
    //     start: function (msg) {
    //         this.title = document.title;
    //         if (!this.action) {
    //             try {
    //                 this.element = document.getElementsByTagName('title')[0];
    //                 this.element.innerHTML = this.title;
    //                 this.action = function (ttl) {
    //                     this.element.innerHTML = ttl;
    //                 };
    //             } catch (e) {
    //                 this.action = function (ttl) {
    //                     document.title = ttl;
    //                 }
    //                 delete this.element;
    //             }
    //             this.toggleTitle = function () {
    //                 this.action(this.messages[this.index = this.index == 0 ? 1 : 0] + '欢迎访问');
    //             };
    //         }
    //         this.messages = [msg];
    //         var n = msg.length;
    //         var s = '';
    //         if (this.element) {
    //             var num = msg.match(/\w/g);
    //             if (num != null) {
    //                 var n2 = num.length;
    //                 n -= n2;
    //                 while (n2 > 0) {
    //                     s += " ";
    //                     n2--;
    //                 }
    //             }
    //         }
    //         while (n > 0) {
    //             s += '　';
    //             n--;
    //         };
    //         this.messages.push(s);
    //         this.index = 0;
    //         this.timer = setInterval(function () {
    //             flashTitlePlayer.toggleTitle();
    //         }, 1000);
    //     },
    //     stop: function () {
    //         if (this.timer) {
    //             clearInterval(this.timer);
    //             this.action(this.title);
    //             delete this.timer;
    //             delete this.messages;
    //         }
    //     }
    // };
    // function flashTitle(msg) {
    //     flashTitlePlayer.start(msg);
    // }
    // function stopFlash() {
    //     flashTitlePlayer.stop();
    // }
    // flashTitle("【a】");


    // if (!String.format) {
    //     String.format = function(format) {
    //         var args = Array.prototype.slice.call(arguments, 1);
    //         return format.replace(/{(\d+)}/g, function(match, number) { 
    //             return typeof args[number] != 'undefined' ? args[number] : match;
    //         });
    //     };
    // }
    // String.format('{0} is dead, but {1} is alive! {0} {2}', 'ASP', 'ASP.NET');
    // // First, checks if it isn't implemented yet.
    // // 第二种方法，上一种为写新的方法再调用，后一种为继承并新增了一个String的方法。
    // if (!String.prototype.format) {
    //     String.prototype.format = function() {
    //         var args = arguments;
    //         return this.replace(/{(\d+)}/g, function(match, number) { 
    //             return typeof args[number] != 'undefined' ? args[number] : match;
    //         });
    //     };
    // }
    // "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET");
});