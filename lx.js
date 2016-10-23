$(function(){
	// 20x20的格子
for(var i=0;i<20;i++){
	for(var j=0;j<20;j++){
		var r=Math.floor(Math.random()*255);
		var g=Math.floor(Math.random()*255);
		var b=Math.floor(Math.random()*255);
		var color='rgba('+r+','+g+','+b+',0.5)';
		$('<div>')
		.attr('id',i+'_'+j)
		.addClass('block').css('backgroundColor',color).appendTo('.scene');

	}
}
var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
var tru={};
direction="you";
$(document).on('keyup',function(e){
	var biao={37:'zuo',38:'shang',39:'you',40:'xia'};
	if(biao[e.keyCode]){
		direction=biao[e.keyCode];
	}
	if(Math.abs(e.keyCode-fanbiao[direction])===2){
		return;
	}
})
function finddiv(x,y){
	return $('#'+x+'_'+y);
}
$.each(she,function(i,v){
	finddiv(v.x,v.y).addClass('she');
})
function fangshiwu(){
	do{
		var x=Math.floor(Math.random()*19);
		var y=Math.floor(Math.random()*19);
	}while(tru[x+'_'+y])
	finddiv(x,y).addClass('shiwu');
	return {x:x,y:y};
}
var shiwu=fangshiwu();
move=function(){
	var jiutou=she[she.length-1];
	if(direction=="you"){
		var xintou={x:jiutou.x,y:jiutou.y+1};
	}
	if(direction=="zuo"){
		var xintou={x:jiutou.x,y:jiutou.y-1};
	}
	if(direction=="shang"){
		var xintou={x:jiutou.x-1,y:jiutou.y};	
	}
	if(direction=="xia"){
	    var xintou={x:jiutou.x+1,y:jiutou.y};	
	}
	if(tru[xintou.x+'_'+xintou.y]){
		clearInterval(t);
			alert('gameover');
			return;
	}
	if(xintou.x<0||xintou.x>19||xintou.y<0||xintou.y>19){
			clearInterval(t);
			alert('gameover');
			return;
	}
	she.push(xintou);
	tru[xintou.x+'_'+xintou.y]=true;
	finddiv(xintou.x,xintou.y).addClass('she');
	if(xintou.x==shiwu.x&&xintou.y==shiwu.y){
		finddiv(shiwu.x,shiwu.y).removeClass('shiwu');
		shiwu=fangshiwu();
	}else{
		var weiba=she.shift();
		finddiv(weiba.x,weiba.y).removeClass('she');
		delete tru[weiba.x+'_'+weiba.y]
	}
}
var t=setInterval(move,100);
})