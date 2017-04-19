$(document).ready(function() {
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
        try {
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                //触屏手机版地址
                // var url = window.location.href.replace("http://www", "http://m");
                window.location.href = "./mindex.html";
            } 
        } catch (e) {
        	
        }
    }else{
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        //判断是否IE浏览器 
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
        //获取ie版本
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");  
        reIE.test(userAgent);  
        var fIEVersion = parseFloat(RegExp["$1"]); 

    	aniIntroduce();
	    initSkill();
	    mouseScroll();
        Carousel.init($(".pictureSlider"));
	    var isSkillShow = false;
	    var currentItem = 0;
    }

    //鼠标滚轮滑动
    function mouseScroll() {
        var index = 0;
        var pointers = $(".pointer").children();
        //为每个圆点设置hover显示
        pointers.each(function(i) {
            var h = $(this).position().top;
            $(this).hover(function() {
                $(".showbox").css("top", h - 4).text($(this).attr("title")).show();
            }, function() {
                $(".showbox").hide();
            });
            $(this).click(function() {
                setPointer(i);
                console.log('点击第' + i + '个');
                if (fIEVersion<11) {
                    showItem(i);
                }else{
                    showItem2(i);
                }
            });
        });
        var items = $('.item');
        var endTime = 0;
        //当滚动鼠标滚轮时
        $(window).on('mousewheel', function(event) {
            //解决滑动太多然后不断切换的问题
            var now = (new Date()).getTime();
            if (endTime != 0) {
                // console.log(now-endTime);
                if ((now - endTime) < 1000) {
                    return; }
            }
            //向上滑deltaY=1,下滑=-1
            // console.log(event.deltaX, event.deltaY, event.deltaFactor);
            if (event.deltaY == -1) {
                if (index == items.length - 1) {
                    index = 0;
                } else {
                    index += 1;
                }
            } else {
                if (index == 0) {
                    index = items.length - 1;
                } else {
                    index--;
                }
            }
            if (currentItem == 0 && index == items.length - 1) { //在第一页时向上滑动不处理
                index = 0;
                return;
            }
            //IE11以下不支持transform
            if (fIEVersion<11) {
                showItem(index);
            }else{
                showItem2(index);
            }
            setPointer(index);
            endTime = (new Date()).getTime()
        });
    }

    //以设置opacit的方式切换页面。。感觉对眼睛不是很友好
    function showItem(index) {
        var items = $('.item');
        if (index == 2 && !isSkillShow) {
            initSkill();
            isSkillShow = true;
        }
        if (index==0) {
        	$(items[items.length-1]).animate({'opacity':0},1000);//隐藏页面
        }
        // if (index==2) {//这样写每次都会重新再添加一个canvas,怎么办呢...添加前删除掉。。
        //     initSkill();
        // }
        items.css('z-index',1);
        console.log("隐藏第"+(index-1));
        $(items[index-1]).animate({'opacity':0},1000);//隐藏页面
         console.log("显示第"+index);
        $(items[index]).css('z-index',99).animate({'opacity':1},1000);//显示页面
        currentItem = index;
    }

    //以css3属性transform:translate3d(x,y,z)拉起页面
    //突然想起我都已经设置每一个页面为absolute了，直接设置top值拉起？？？
    function showItem2(index) {
        if (index == currentItem) { console.log('点击自己，不处理');
            return; } //在已经是当前页面时点击圆点时不处理
        var items = $('.item');
        if (index == 1 && !isSkillShow) {
            initSkill();
            isSkillShow = true;
        }
        if (currentItem < index) {
            slideItemUp(index);
        } else {
            slideItemDown(index);
        }
        currentItem = index;
    }

    //把页面向上拉
    function slideItemUp(index) {
        //越写越乱/(ㄒoㄒ)/~~
        var cur = currentItem;
        console.log("当前：" + cur);
        var items = $('.item');
        var count = 0;
        var length = index - currentItem;
        if (length > 1) {
            if (cur == 0) {
                //在第一个页面时点击超过或等于两页时，直接拉起中间的页面，然后再开启定时器拉起第一个页面
                for (var i = cur + 1; i < length; i++) {
                    console.log("hide item:" + i)
                    $(items[i]).css('transform', 'translate3d(0,-100%,0)');
                }
            } else {

                for (var i = cur; i <= length; i++) {
                    console.log("hide item:" + i)
                    $(items[i]).css('transform', 'translate3d(0,-100%,0)');
                }
            }
            var timer = setInterval(function() {
                count++;
                if (count == 100) {
                    clearInterval(timer);
                }
                if (count == 2) console.log('正在拉第' + cur + '个');
                $(items[cur]).css('transform', 'translate3d(0,-' + count + '%,0)');
            }, 10);
        } else {
            var timer = setInterval(function() {
                count++;
                if (count == 100) {
                    clearInterval(timer);
                }
                $(items[index - 1]).css('transform', 'translate3d(0,-' + count + '%,0)');
            }, 10);
        }

    }
    //把页面向下拉
    function slideItemDown(index) {
        var ide = index;
        var items = $('.item');
        var count = 100;
        var timer = setInterval(function() {
            count--;
            if (count == 0) {
                clearInterval(timer);
                if (index == 0) {
                    items.css('transform', 'translate3d(0,0,0)');
                }
                for (var i = ide + 1; i < items.length; i++) {
                    $(items[i]).css('transform', 'translate3d(0,0,0)');
                }
            }
            $(items[index]).css('transform', 'translate3d(0,-' + count + '%,0)');
        }, 10);
    }

    //设置圆点样式
    function setPointer(index) {
        var pointers = $(".pointer").children();
        pointers.each(function(i) {
            $(this).removeClass("active");
            if (i == index) {
                $(this).addClass("active");
            }
        });
    }

    //个人介绍动画
    function aniIntroduce() {
        var childs = $(".introduce").children();
        var pre = null;
        // var top = 0;
        var hs = [100, 300, 370,420];
        childs.each(function(i) {
            // top = i==0 ? 100 : top+pre.height() + 20;
            $(this).animate({
                top: hs[i],
                opacity: 1
            }, 3000);
            pre = $(this);
        })
    }

    function initSkill() {
        $('canvas').remove();
        var ids = ['html', 'css', 'js', 'jq', 'bs', 'ps', 'vue', 'java', 'php'];
        var values = [90, 80, 75, 70, 70, 60, 70, 65, 60];
        for (var i = ids.length - 1; i >= 0; i--) {
            aniSkill(ids[i], values[i]);
        }
    }

    //技能圆
    function aniSkill(id, value) {
        var circle = radialIndicator('#' + id, {
            barColor: '#0099CC',
            barWidth: 8,
            initValue: 0,
            roundCorner: true,
            percentage: true
        });
        var count = 0;
        var timer = setInterval(function() {
            circle.value(++count);
            if (count == value) {
                clearInterval(timer);
            }
        }, 40);
    }
});
