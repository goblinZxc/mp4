var box=document.querySelector(".box");
var video=document.querySelector("video");
var control=document.querySelector("#controlbar");
var btn=control.querySelector(".btn");
var time=control.querySelector(".time")
var now=time.querySelector(".now");
var total=time.querySelector(".total");
var brand=box.querySelector(".brand");
var jindu=box.querySelector(".jindu");
var jindubtn=jindu.querySelector(".icon");

btn.onclick=function(){
	if (video.paused) {
		video.play();
		btn.innerHTML="&#xe6d2;";
		brand.style.display="none";
		end.style.display="none";
		// console.log(video.paused);
	}else{
		video.pause();
		btn.innerHTML="&#xe684;";
		brand.style.display="block";
	}
	
}

// 时间轴和进度条

 function GetTime(t){
        var diff = t%3600;
        var h = Math.floor(t/3600);
        var m = Math.floor(diff/60);
        diff%=60;
        var s = Math.floor(diff);
        h = h<=9?"0"+h:h;
        m = m<=9?"0"+m:m;
        s = s<=9?"0"+s:s;
        return h+":"+m+":"+s;
    }

video.oncanplay=function(){
        total.innerHTML = GetTime(video.duration);
        var bili = video.duration/jindu.offsetWidth;
        // console.log(bili);

        video.addEventListener("timeupdate",function(){
            now.innerHTML = GetTime(video.currentTime);
            jindubtn.style.left = video.currentTime/bili+"px";


        })

    }
jindubtn.onmousedown=function(e){
	var ev=e||window.event;
	var lenx=ev.clientX-jindubtn.offsetLeft;
	ev.preventDefault;
	video.pause();
	brand.style.display="none";
	btn.innerHTML="&#xe684;";
	end.style.display="none";
	// console.log(lenx);
	// var leny=ev.clientY-jindubtn.offsetTop;
	document.onmousemove=function(e){
		var ev=e||window.event;
		var cx=ev.clientX;
		var ox=cx-lenx;
		// var cy=ev.clientY;
		if(ox<=0){
			ox=0;
		}
		if(ox>152){
			ox=152;
		}
		jindubtn.style.left=ox+"px";
		// jindubtn.style.top=cy-leny+"px";
		var bili=ox/jindu.offsetWidth;
		// console.log(bili);
		video.currentTime=video.duration*bili;
		// console.log(video.currentTime);
	}
	document.onmouseup=function(){
		// jindubtn.onmousedown=null;
		document.onmousemove=null;
		document.onmouseup=null;
		video.play();
		btn.innerHTML="&#xe6d2;";
	}
}


// 音量
var voicebox=document.querySelector(".voicebox");
var voiceicon=voicebox.querySelector("span");
var voice=voicebox.querySelector(".voice");
var tiao=voice.querySelector(".tiao");
var voicebtn=tiao.querySelector(".voicebtn");

// voice.onclick=function(e){
// 	voice.stopPropagation;
// 	e.preventDefault;
// }
// tiao.onclick=function(e){
// 	tiao.stopPropagation;
// 	e.preventDefault;
// }
// voicebtn.onclick=function(e){
// 	voicebtn.stopPropagation;
// 	e.preventDefault;
// }
voiceicon.onclick=function(e){
	voiceicon.stopPropagation;
	e.preventDefault;
	video.muted=!video.muted
	if (video.muted==false){
		voiceicon.innerHTML="&#xe63f;";
	}else{
 		voiceicon.innerHTML="&#xe621;";
  }
}

// video.onvolumechange=function(){
// 	if(video.muted==false){
// 		voiceicon.innerHTML="&#xe63f;";
		

// 	}

// }
voicebtn.onmousedown=function(e){
	var ev=e||window.event;
	var leny=ev.clientY-voicebtn.offsetTop;
		ev.preventDefault;
	voicebtn.stopPropagation;
	// console.log(v1);
	document.onmousemove=function(e){
		var ev=e||window.event;
		ev.preventDefault;
		var cy=ev.clientY;
		var oy=cy-leny;
		// console.log(oy);
		if(oy<=0){
			oy=0;
		}
		if(oy>70){
			oy=70;
		}
		voicebtn.style.top=oy+"px";
		var bili=oy/tiao.offsetHeight;
		var nowV=(1-bili)*1;
		// 音量默认是0到1之间的一个小数
		// console.log(nowV);
		video.volume=nowV;
	}
	document.onmouseup=function(){
		document.onmousemove=null;
		document.onmouseup=null;
	}
}

// 全屏
var switchbtn=control.querySelector(".switch");
var flag=false;
switchbtn.addEventListener("click",function(e){
	e.preventDefault;
	if(!flag){
		flag=true;
		box.webkitRequestFullScreen();
		box.style.cssText="width:100%;height:100%";
		switchbtn.innerHTML="&#xe64e";
	}else{
		flag=false;
		box.webkitCancelFullScreen;
		box.style.cssText="width:500px;height:281px";
		switchbtn.innerHTML="&#xe917";
		}
},true)


/*switchbtn.addEventListener("click",function(){
	if (!flag) {
		fullscreen(video);
		// video.controls=null;
		// console.log(video.controls);
		flag=true;
		box.style.cssText="width:100%;height:100%";
		switchbtn.innerHTML="&#xe64e";
	}else{
		exitfullscreen();
		flag=false;
		// video.controls=false;
		box.style.cssText="width:500px;height:281px";
		switchbtn.innerHTML="&#xe917";
	}
})
*/
// 结束时
var end=document.querySelector(".end");
var endH=end.offsetHeight;
// console.log(endH);
video.addEventListener("ended",function(){
	end.style.display="block";
	box.webkitCancelFullScreen;
	box.style.cssText="width:500px;height:281px";
	switchbtn.innerHTML="&#xe917";
	btn.innerHTML="&#xe684;";
})



// #检测全屏状态改变浏览样式
fullscreenchange(function(){
	// console.log(fullstate());
})