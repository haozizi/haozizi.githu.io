$(document).ready(function(){
	initHeaderIcon();
	initSearch();
	initTab("#shops .tab","#shops .list");
	initTab(".life .tab",".life .con img")
	initArticles();
	initBBS();
	initRecomend();
	initAty();
	initHotPeople();
	initStabs();
})

// 导航栏图标hover效果
function initHeaderIcon(){
	var lis = document.getElementsByClassName("icons");
	var icons = [];
	// 把所有需要icon的元素组合成一个数组
	for (var i = 0; i < lis.length; i++) {
		var items = lis[i].children;
		for (var j = 0; j < items.length; j++) {
			icons.push(items[j]);
		}
	}
	// 设置bg-position
	for (var i = 0; i < icons.length; i++) {
		icons[i].style["background-position"] = -66*i+"px 0";
		icons[i].index = i;
		icons[i].onmouseover = function(){
			this.style["background-position"] = -66*this.index+"px -70px";
			this.children[0].style.color = "#d91002";
			this.children[0].style["font-weight"] = "bold";
		}
		icons[i].onmouseout = function(){
			this.style["background-position"] = -66*this.index+"px 0";
			this.children[0].style.color = "#333";
			this.children[0].style["font-weight"] = "normal";
		}
	}
}

//搜索栏
function initSearch(){
	var texts = ["你发如雪凄美了离别",
	"我焚香感动了谁",
	"你发如雪纷飞了眼泪",
	"我等待苍老了谁",
	"红尘醉微醺了岁月"];
	var lis = $(".menu").children();
	var input = $(".form .input");
	var curText = texts[0];
	input.val(curText);
	lis.each(function(index){
		$(this).click(function(){
			curText = texts[index];
			lis.attr("class","");
			$(this).attr("class","active");
			input.val(curText);
		});
	});
	input.focus(function(){
		if (input.val()==curText) {
			input.val("");
		}
	});
	input.blur(function(){
		if (input.val()=="") {
			input.val(curText);
		}
	})
}

// 选项卡
function initTab(ts,cs){
	var tabs = $(ts).children();
	var cons = $(cs);
	// cons.hide().eq(0).show();
	tabs.each(function(index){
		$(this).click(function(){
			tabs.removeClass("active");
			$(this).addClass("active");
			cons.hide().eq(index).show();
		})
	})
}

// bbs论坛hover效果
function initBBS(){
	var lis = $(".bbs-articles").children();
	$.each(lis,function(index,item){
		$(item).mouseover(function(){
			lis.removeClass("active");
			$(this).addClass("active");
		});
	});
}

// 文章滚动
function initArticles(){
	var datas = [{"title":"一篇文章了解爬虫技术现状","author":"杜文_","time":"1分钟前",
	"url":"https://juejin.im/post/58c92135b123db0053157b0e"},
	{"title":"原来点线面还可以这么玩！","author":" 胡图真探","time":"2分钟前",
	"url":"https://juejin.im/post/58c5e39c8ac24707200a6cff"},
	{"title":"2016 年崛起的 JS 项目",
	"author":"王仕军","time":"3分钟前","url":"https://juejin.im/post/58c5e39c8ac24707200a6cff"},
	{"title":"正则表达式前端使用手册",
	"author":"louis","time":"4分钟前","url":"http://louiszhai.github.io/2016/06/13/regexp/"}];
	var ul = $(".articles ul");

	var str = "";
	for (var i = 0; i < datas.length; i++) {
		var data = datas[i];
		str+="<li>"
		str+="<a href='"+data.url+"'>"
		str+="<strong>"+data.author+"</strong>";
		str+="<span>"+data.time+"</span>";
		str+=data.title;
		str+="</a>";
		str+="</li>";
	}
	ul.html(str);
	
	$("#articleUp").click(function(){
		doMove(-1);
	})
	$("#articleDown").click(function(){
		doMove(1);
	})
	var liHeight = ul.find("li").height();
	var iNow = 0;
	var timer = null;
	function autoPlay() {
		timer = setInterval(function () {
			doMove(-1);
		}, 3500);
	}
	autoPlay();
		
	function doMove( num ) {
		iNow += num;
		if ( Math.abs(iNow) > datas.length-1 ) {
			iNow = 0;
		}
		if ( iNow > 0 ) {
			iNow = -(datas.length-1);
		}
		ul.stop().animate({ 'top': liHeight*iNow });
	}
}

// 每日活动
function initAty(){
	var weeks = $(".week i");
	var days = $(".calendar span");
	var infoBox = $(".today-info");
	var imgs = $(".cover img")
	var img = infoBox.find("img");
	var week = infoBox.find("span");//弹出盒子里面的星期标签
	var ptext = infoBox.find("p");
	imgs.each(function(i){
		$(this).hover(function(){
			var top = $(this).parent().position().top-30;
			var left = $(this).parent().position().left+50;
			infoBox.show();
			infoBox.css({"top":top,"left":left});
			var windex = $(this).parent().index();//获取父级标签span的索引值设置星期几
			week.text(weeks[windex].innerHTML);
			img.attr("src",$(this).attr("src"));
			ptext.text($(this).attr("info"))
		},
		function(){
			infoBox.hide();
		});
	});
}

// 精彩推荐
function initRecomend(){
	var pText = ["爸爸去哪儿","我美不美~~","滚。"];
	var ulis = $(".recomand ul").children();
	var olis = $(".recomand ol").children();
	var text = $(".recomand p");
	var box = $(".pic-list");
	var current = 0;
	var timer = null;
	olis.each(function(index){
		$(this).click(function(){
			current = index;
			imgFade();
			text.text(pText[index]);
		})
	});
	imgFade();
	autoPlay();
	box.hover(function(){clearInterval(timer);},autoPlay);

	function autoPlay(){
		timer = setInterval(function(){
			imgFade();
			current++;
			if (current>2) {
				current = 0;
			}
		},1000);
	}
	function imgFade(){
		ulis.each(function(i){
			if (i!=current) {
				ulis.eq(i).fadeOut().css("z-index",1);
				olis.eq(i).removeClass("active");
			}else{
				ulis.eq(i).fadeIn().css("z-index",2);
				olis.eq(i).addClass("active");
			}
		})
	}
}

// hot红人烧客
function initHotPeople(){
	var arr = [
			'',
			'用户1<br />人气1',
			'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
			'用户3<br />人气3',
			'用户4<br />人气4',
			'用户5<br />人气5',
			'用户6<br />人气6',
			'用户7<br />人气7',
			'用户8<br />人气8',
			'用户9<br />人气9',
			'用户10<br />人气10'
		];
	var lis = $(".hot-people li");
	lis.each(function(i){
		$(this).mouseover(function(){
			if ($(this).index()==0) return;
			$(".area-mask").remove();
			$(this).append("<div class='area-mask'><p>"+arr[i]+"</p></div>");
		});
	});
}

// 知道分子
function initZhidao(){
	var uls = $("#knowledge .cons ul");
	var tabs = $("#knowledge .s-tab li");
	tabs.each(function(i){
		$(this).mouseover(function(){
			tabs.removeClass("active");
			$(this).addClass("active");
			uls.hide().eq(i).show();
		});
	});
}
function initStabs(){
	// 知道分子
	initStab("#knowledge .cons ul","#knowledge .s-tab li");
	initStab("#qiangjr .cons ul","#qiangjr .s-tab li");
}
function initStab(us,ls){
	var uls = $(us);
	var tabs = $(ls);
	tabs.each(function(i){
		$(this).mouseover(function(){
			tabs.removeClass("active");
			$(this).addClass("active");
			uls.hide().eq(i).show();
		});
	});
}