function showHandWrite(){
    $(".writeHand").remove();
    var node = $('<div class="writeHand">'+
                    '<div class="headOfWriteHand">'+
                        '<div class="cancel"><img src="image/goback.png"/></div>'+
                        '<div class="reset"><img src="image/new.png"/></div>'+
                        '<div class="prev"><img src="image/back.png"/></div>'+
                        '<div class="next"><img src="image/go.png"/></div>'+
                        '<div class="save"><img src="image/ok.png"/></div>'+
                    '</div>'+
                    '<div class="mainOfWriteHand" id="mainOfWriteHand">'+
                        '<canvas id="board" class="board">您的浏览器不支持</canvas>'+
                    '</div>'+
                '</div>'+
                '<canvas id="boardNew" class="board" style="display: none;">您的浏览器不支持</canvas>');
    $('body').append(node);
    setWindow();
    onBind();
};

function setWindow(){
    var myWidth = document.documentElement.clientWidth,
        myHeight = document.documentElement.clientHeight;
    
    var board = document.getElementById('board');
    board.width = myWidth * 3;     //gcWidth;
    board.height = myHeight * 2;   //gcHeight;
    
    $('.mainOfWriteHand').width( myWidth );
    $('.mainOfWriteHand').height( myHeight - 50 );
    $('.mainOfWriteHand').scrollLeft( myWidth );
    $('.mainOfWriteHand').scrollTop( myHeight / 2 );
};

function onBind(){
    var board = document.getElementById('board'),
        gc = board.getContext('2d'),   //第一块画布,用来画
        boardNew = document.getElementById('boardNew'),
        gcNew = boardNew.getContext('2d'),   //第二块画布,用来储存.因为toDataURL和getImageData不能同时用.所以专门分了开来
        doc = document.documentElement,
        body = document.body,
        main = document.getElementById('mainOfWriteHand'),
        myWidth = document.documentElement.clientWidth,
        myHeight = document.documentElement.clientHeight;
    
    gc.strokeStyle = 'rgb(0,0,0)';        //第一块画布笔触颜色
    gc.lineWidth = 1;                     //第一块画布笔触像素
    
    var recede = [],      //存放历史笔画数组
        forward = [],     //存放可以反撤销笔画的数组
        currentPath = [], //目前的笔画集合
        currentPoint;     //当前坐标点对象
    
    board.ontouchstart = function(event) {
        forward.length = 0;
        var e = window.event || event, 
            ex = e.touches[0].clientX + ( main && main.scrollLeft || doc && doc.scrollLeft || body && body.scrollLeft || 0), //|| e.pageX,//e.touches[0]获取第一个触点
            ey = e.touches[0].clientY + ( main && main.scrollTop || doc && doc.scrollTop || body && body.scrollTop || 0) - 50,   // || e.pageY,
            startX = ex - this.offsetLeft, startY = ey - this.offsetTop;
            
        var a = e.touches[0].clientX;
        var b = main && main.scrollLeft;
        var c = doc && doc.scrollLeft;
        var d = body && body.scrollLeft;
        var e = ex;
        console.log( a + '||' + b + '||' + c + '||' + d + '||' + e );
        var f = this.offsetLeft;
        var g = startX;
        console.log( f + '||' + g );
            
        currentPoint = {
            "x" : startX,
            "y" : startY
        };
        currentPath.push(currentPoint);
        
        gc.beginPath();
        //丢弃任何当前定义的路径并且开始一条新的路径
        gc.moveTo(startX, startY);
    
      console.log('mobile start');
      //console.log(JSON.stringify(currentPath));
    }

    board.ontouchmove = function(event) {
        var e = window.event || event,
            ex = e.touches[0].clientX + ( main && main.scrollLeft || doc && doc.scrollLeft || body && body.scrollLeft || 0), //|| e.pageX,//e.touches[0]获取第一个触点
            ey = e.touches[0].clientY + ( main && main.scrollTop || doc && doc.scrollTop || body && body.scrollTop || 0) - 50,   // || e.pageY,
            lineX = ex - this.offsetLeft, lineY = ey - this.offsetTop;
    
        if (e.touches[1]) {
            gc.closePath();
            currentPath.length =0;
        } else {
            event.preventDefault();
            gc.lineTo(lineX, lineY);
            gc.stroke();
    
            //记录每一步坐标点
            currentPoint = {
                "x" : lineX,
                "y" : lineY
            };
            currentPath.push(currentPoint);
        };
        //鼠标移出画布和鼠标抬起事件，处理方式相同
        board.ontouchend = board.ontouchcancel = function(event) {
            if (currentPath.length > 2) {//三个像素点以上才放进去
                recede.push(currentPath.slice(0));
            };
            currentPath.length = 0;
            gc.closePath();
            console.log('mobile end');
        };
    };
    
    
    
    var isMouseDown = false;
    
    board.onmousedown = function(event) {
        //console.log('computer start');
        gc.lineWidth = 2;
        forward.length = 0;
        var e = window.event || event,
            ex = ( e.x || e.pageX ) + ( main && main.scrollLeft || doc && doc.scrollLeft || body && body.scrollLeft || 0) ,
            ey = ( e.y || e.pageY ) + ( main && main.scrollTop || doc && doc.scrollTop || body && body.scrollTop || 0) - 50 ,
            startX = ex - this.offsetLeft, startY = ey - this.offsetTop;
        
        //设置鼠标一定按下状态
        isMouseDown = true;
        currentPoint = {
            "x" : startX,
            "y" : startY
        };
        currentPath.push(currentPoint);
        
        gc.beginPath();
        //丢弃任何当前定义的路径并且开始一条新的路径
        gc.moveTo(startX, startY);
    }
    
    board.onmousemove = function(event) {
        var e = window.event || event,
            ex = ( e.x || e.pageX ) + ( main && main.scrollLeft || doc && doc.scrollLeft || body && body.scrollLeft || 0) ,
            ey = ( e.y || e.pageY ) + ( main && main.scrollTop || doc && doc.scrollTop || body && body.scrollTop || 0) - 50 ,
            lineX = ex - this.offsetLeft,
            lineY = ey - this.offsetTop;
        
        if( isMouseDown ){
            gc.lineTo(lineX, lineY);
            gc.stroke();
        
            //记录每一步坐标点
            currentPoint = {
                "x" : lineX,
                "y" : lineY
            };
            currentPath.push(currentPoint);
//            console.log(JSON.stringify(currentPath));
        }else{
            return;
        }
        
        //鼠标移出画布和鼠标抬起事件，处理方式相同
        board.onmouseup = function(event) {
            //console.log('computer end');
            isMouseDown = false;
            if (currentPath.length > 2) {//三个像素点以上才放进去
                recede.push(currentPath.slice(0));
            };
            currentPath.length = 0;
            gc.closePath();
        };
    };
    
    $('body').on('click', '.headOfWriteHand div', function(e) {
        var classN = $(this).attr("class");
        switch(classN) {
            case 'cancel':
                $('.writeHand').hide();
                break;
            case 'reset':
                gc.clearRect(0, 0, board.width, board.height);
                //gc.beginPath();可能会用
                recede.length = 0;   //记得在这里把记录的数组清空
                break;
            case 'prev':
                if (recede.length != 0) {
                    forward.push(recede.pop());
                    gc.clearRect(0, 0, board.width, board.height);
                    if (recede.length > 0) {
                        for (var i = 0; i < recede.length; i++) {
                            gc.beginPath();
                            var currentX = recede[i][0].x, 
                                currentY = recede[i][0].y;
                            gc.moveTo(currentX, currentY);
                            for (var j = 0; j < recede[i].length; j++) {
                                currentX = recede[i][j].x;
                                currentY = recede[i][j].y;
                                gc.lineTo(currentX, currentY);
                                gc.stroke();
                                event.preventDefault();
                            };
                            gc.closePath();
                        };
                    };
                };
                break;
            case 'next':
                if (forward.length != 0) {
                    gc.beginPath();
                    var leng = forward.length - 1;
                    gc.moveTo(forward[leng][0].x, forward[leng][0].y);
    
                    for (var i = 1; i < forward[leng].length; i++) {
                        gc.lineTo(forward[leng][i].x, forward[leng][i].y);
                        gc.stroke();
                        event.preventDefault();
                    };
                    recede.push(forward.pop());
                    gc.closePath();
                }
                break;
            case 'save':
                var smallX, smallY, bigX, bigY;
                if (recede.length) {
                    if (recede[0][0].x > recede[0][1].x) {
                        smallX = recede[0][1].x;
                        bigX = recede[0][0].x;
                    } else {
                        bigX = recede[0][1].x;
                        smallX = recede[0][0].x;
                    };
                    if (recede[0][0].y > recede[0][1].y) {
                        smallY = recede[0][1].y;
                        bigY = recede[0][0].y;
                    } else {
                        bigY = recede[0][1].y;
                        smallY = recede[0][0].y;
                    };
                };
    
                for (var i = 0; i < recede.length; i++) {
                    for (var j = 0; j < recede[i].length; j++) {
                        smallX = (smallX < recede[i][j].x ) ? smallX : recede[i][j].x;
                        bigX = (bigX > recede[i][j].x ) ? bigX : recede[i][j].x;
                        smallY = (smallY < recede[i][j].y ) ? smallY : recede[i][j].y;
                        bigY = (bigY > recede[i][j].y ) ? bigY : recede[i][j].y;
                    };
                };
                var gcWidth = bigX - smallX,
                    gcHeight = bigY - smallY;
    
                var imgData = gc.getImageData(smallX, smallY, gcWidth, gcHeight);
                $('#board').hide();
    
                boardNew.width = gcWidth;
                boardNew.height = gcHeight;
    
                $('#boardNew').show();
                gcNew.putImageData(imgData, 0, 0);
                var image = new Image();
                image.src = boardNew.toDataURL("image/png", 0.5);
                $('.myimg').attr('src', image.src);
                $('.writeHand').hide();
                break;
        }
    });
};