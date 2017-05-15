var addClass = function (element , _className) {

  var className = element.className.split(' ');
  var classNameMap = {}

  for(var i=0;i<className.length;i++){
    classNameMap[ className[i]] = 1;
  }
  classNameMap[_className] = 1;

  className = [];
  for(i in classNameMap){
    className.push(i);
  }
  element.className = className.join(' ');

}
var removeClass = function (element ,  _className) {

  var className = element.className.split(' ');
  var classNameMap = {}
  for(var i=0;i<className.length;i++){ 
    classNameMap[ className[i]] = 1;
  }
  delete classNameMap[_className];
  className = [];
  for(i in classNameMap){
    className.push(i);
  }
  element.className = className.join(' ');
}
var show = function(ele){
  ele.style.display = 'block';
}
var hide = function(ele){
  ele.style.display = 'none';
}

window.onload = function() {
	//解决IE8之类不支持getElementsByClassName
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (className, element) {
        var children = (element || document).getElementsByTagName('*');
        var elements = new Array();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = child.className.split(' ');
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;
    };
}
	// 切换pc,移动端内容
	var deviceBtns = document.getElementsByClassName('devices-btn');
	var propCons = document.getElementsByClassName('prop-con');
	for (var i = 0; i < deviceBtns.length; i++) {
		deviceBtns[i].index = i;
		deviceBtns[i].onclick = function(i){
			for (var i = 0; i < deviceBtns.length; i++) {
					removeClass(deviceBtns[i],'active');
					propCons[i].style.display = 'none';
				}	
			addClass(this,'active');
			propCons[this.index].style.display = 'block';
		}
	}
  var closeBtn = document.getElementById('closeBtn');
  var login = document.getElementById("login");
  var mask = document.getElementById('mask');
  var loginWindow = document.getElementById('loginWindow');
  login.onclick = function(){
    show(mask);
    show(loginWindow);
  }
  closeBtn.onclick = function() {
    hide(mask);
    hide(loginWindow);
  }
  // 登录窗口input 获得和失去焦点时
  var ips = document.getElementsByClassName("loginInput");
  for (var i = 0; i < ips.length; i++) {
    ips[i].onfocus = function(){
      addClass(this.parentNode,'focus');
    }
    ips[i].onblur = function() {
      removeClass(this.parentNode,'focus');
    }
  }


}