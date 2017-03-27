$(document).ready(function(){
	aniIntroduce();
	mouseScroll();
	// var isSkillShow = false;
	var currentItem = 0;


//鼠标滚轮滑动
function mouseScroll(){
	var index = 0;
	var pointers = $(".pointer").children();
	//为每个圆点设置hover显示
	pointers.each(function(i){
		var h = $(this).position().top;
		$(this).hover(function(){
			$(".showbox").css("top",h-4).text($(this).attr("title")).show();
		},function(){
			$(".showbox").hide();
		});
		$(this).click(function(){
			setPointer(i);
			showItem2(i);
		});
	});
	var items = $('.item');
	var endTime = 0;
	//当滚动鼠标滚轮时
	$(window).on('mousewheel', function(event) {
		//解决滑动太多然后不断切换的问题
		var now = (new Date()).getTime();
		if (endTime!=0) {
			// console.log(now-endTime);
			if ((now-endTime)<1000) {return;}
		}
		//向上滑deltaY=1,下滑=-1
	    // console.log(event.deltaX, event.deltaY, event.deltaFactor);
	    if (event.deltaY==-1) {
	    	if (index==items.length-1) {
				index=0;
			}else{
	    		index+=1;	
			}	
	    }else{
	    	if (index==0) {
	    		index = items.length-1;
	    	}else{
	    		index--;
	    	}
	    }
	    if (currentItem==0 && index==items.length-1){//在第一页时向上滑动不处理
	    	index = 0;
	    	return;
	    }
		showItem2(index);
	    setPointer(index);
		endTime = (new Date()).getTime()
	});
}

function showItem(index){
	var items = $('.item');
	if (index==0) {
		$(items[items.length-1]).animate({'opacity':0},1000);//隐藏页面
	}
	if (index==1) {//这样写每次都会重新再添加一个canvas,怎么办呢...添加前删除掉。。
	    initSkill();
	}
	items.css('z-index',1);
	$(items[index-1]).animate({'opacity':0},1000);//隐藏页面
	$(items[index]).css('z-index',99).animate({'opacity':1},1000);//显示页面
}

function showItem2(index){
	if (index==currentItem) {return;}//在已经是当前页面时点击圆点时不处理
	var items = $('.item');
	if (index==1) {
	    initSkill();
	    // isSkillShow = true;
	}
	if (currentItem < index) {
		slideItemUp(index);
	}else{
		slideItemDown(index);
	}
	currentItem = index;
}

//把页面向上拉
function slideItemUp(index){
	var items = $('.item');
	var count = 0;
	var timer = setInterval(function(){
		count++;
		if (count==100) {
			clearInterval(timer);
		}
		$(items[index-1]).css('transform','translate3d(0,-'+count+'%,0)');
	},10);
}
//把页面向下拉
function slideItemDown(index){
	var items = $('.item');
	var count = 100;
	var timer = setInterval(function(){
		count--;
		if (count==0) {
			clearInterval(timer);
			if (index==0) {
				items.css('transform','translate3d(0,0,0)');
			}
		}
		$(items[index]).css('transform','translate3d(0,-'+count+'%,0)');
	},10);
}

//设置圆点样式
function setPointer(index){
	var pointers = $(".pointer").children();
	pointers.each(function(i){
		$(this).removeClass("active");
		if (i==index) {
			$(this).addClass("active");
		}
	});
}

//个人介绍动画
function aniIntroduce(){
	var childs = $(".introduce").children();
	var pre = null;
	var top = 0;
	childs.each(function(i){
		top = i==0 ? 100 : top+pre.height() + 20;
		$(this).animate({
			top : top,
			opacity : 1
		},3000);
		pre = $(this);
	})
}

function initSkill(){
	$('canvas').remove();
	var ids = ['html','css','js','jq','bs','ps','vue'];
	var values = [85,70,75,70,70,60,70];
	for (var i = ids.length - 1; i >= 0; i--) {
		aniSkill(ids[i],values[i]);
	}
}

//技能圆
function aniSkill(id,value){
	var circle = radialIndicator('#'+id,{
        barColor: '#0099CC',
        barWidth: 8,
        initValue: 0,
        roundCorner : true,
        percentage: true
    });
    var count = 0;
    var timer = setInterval(function(){
    	circle.value(++count);
    	if (count==value) {
    		clearInterval(timer);
    	}
    },20);
}
});
