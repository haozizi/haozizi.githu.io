window.onload = function(){
	var pbs = document.getElementsByClassName('pro-bar');
	console.log(pbs.length);
	for (var i = 0; i < pbs.length; i++) {
		var value = pbs[i].getAttribute('pvalue');
		pbs[i].style.width = value + 'px';
	}
}