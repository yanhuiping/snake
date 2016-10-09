$(function(){
	var start=$('.start');
	var restart=$('.restart');
	var r=$('.rule');
	var zt=$('.zanting');
	var jixu=$('.jixu');
	 num=0;
	for(var i=0;i<20;i++){
		for(var j=0;j<20;j++){
			/*var r=Math.floor(Math.random()*255);
		var g=Math.floor(Math.random()*255);
		var b=Math.floor(Math.random()*255);
		var color='rgba('+r+','+g+','+b+',0.5)';*/
		/*$('<div>').attr('id',i+'_'+j)
		.addClass('block').css('backgroundColor',color).appendTo('.scene');*/
		$('<div>').attr('id',i+'_'+j)
		.addClass('block').appendTo('.scene');
		}
		
	}
	var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	var tru={};
 direction="you"
 $(document).on('keyup',function(e){
 	var biao={37:'zuo',38:'shang',39:'you',40:'xia'};
 	if(biao[e.keyCode]){
 		direction=biao[e.keyCode];
 	}
 	if(Math.abs(e.keyCode-fanbiao[direction])===2){
 		return;
 	}
 })
	function findDiv(x,y){
		return  $('#'+x+'_'+y);
	}

	$.each(she,function(i,v){
		// findDiv(0,2).addClass('shet')
		findDiv(v.x,v.y).addClass('she');
	})
	
	function fangshiwu(){
		do{
			var x=Math.floor(Math.random()*19);
		var y=Math.floor(Math.random()*19);
	}while(tru[x+'_'+y])
		
		
		findDiv(x,y).addClass('shiwu');
		return{x:x,y:y};

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
		findDiv(jiutou.x,jiutou.y).removeClass('shet')
		findDiv(xintou.x,xintou.y).addClass('shet')
		findDiv(xintou.x,xintou.y).addClass('she');
		if(xintou.x==shiwu.x&&xintou.y==shiwu.y){
			num++;
			$('.score span').text(num);
			findDiv(shiwu.x,shiwu.y).removeClass('shiwu');
			shiwu=fangshiwu();
		}else{
			var weiba=she.shift();
		findDiv(weiba.x,weiba.y).removeClass('she')
		delete tru[weiba.x+'_'+weiba.y]
		}
		
		

	}


	start.on('click',function(){
		start.fadeOut();
		num=0;
		 t=setInterval(move,500);

	})
	zt.on('click',function(){
		clearInterval(t);

	})

	jixu.on('click',function(){
		t=setInterval(move,500);

	})
	restart.on('click',function(){
		clearInterval(t);
		var t=setInterval(move,500);

	})
	$('.rule').on('click',function () {
		$('.rulebox').slideToggle();
	})
})