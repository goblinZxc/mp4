/*---------------------------------------------------

	Name: fullscreen API v3
	By  : HNZ
	Date: 2015-10-12

	List:
	1.	fullstate()  返回全屏状态 
					 返回值： true  false

	2.	fullElm()    返回处于全屏模式的元素
	                 返回值： 元素对象

	3.	fullscreenchange(fn)监测全屏变化事件 
							fn：事件处理程序

	4.	fullscreen(elm)  进入全屏模式   
						 elm： 指定元素

	5.	exitfullscreen() 退出全屏模式

---------------------------------------------------*/
(function(win,doc){
	//获取当前浏览器 ： 属性、方法、事件
	var set=(function(doc){
		if(doc.exitFullscreen){  
    		return {
    			'full':'requestFullscreen',    //进入全屏
    			'exit':'exitFullscreen',       //退出全屏
    			'fullEvent':'fullscreenchange',//全屏事件
    			'fullElm':'fullScreenElement', //全屏元素
    			'state':'fullscreenchange',    //全屏状态
    			'support':'fullscreenEnabled'  //是否支持全屏
    		}  
		}else if(doc.mozCancelFullScreen){  
	    	return {
    			'full':'mozRequestFullScreen',
    			'exit':'mozCancelFullScreen',
    			'fullEvent':'mozfullscreenchange',
    			'fullElm':'mozFullScreenElement',
    			'state':'mozFullScreen',
    			'support':'mozFullScreenEnabled'
    		}  
		}else if(doc.webkitCancelFullScreen){
	    	return {
    			'full':'webkitRequestFullScreen',
    			'exit':'webkitCancelFullScreen',
    			'fullEvent':'webkitfullscreenchange',
    			'fullElm':'webkitFullscreenElement',
    			'state':'webkitIsFullScreen',
    			'support':'webkitFullscreenEnabled'
    		}  
		}else if(doc.msExitFullscreen) {
			return {
    			'full':'msRequestFullscreen',
    			'exit':'msExitFullscreen',
    			'fullEvent':'MSFullscreenChange',
    			'fullElm':'msFullscreenElement',
    			'state':null,//IE没有提供全屏状态属性
    			'support':'msFullscreenEnabled'
    		};
		}else{
			return false;
		}
	})(doc);
	var state=false;
	var cw=document.documentElement.clientWidth;
	var ch=document.documentElement.clientHeight;
	var elm=null;
	/*
		fullscreenchange事件会在启动全屏或退出全屏时触发
	*/

	win.fullscreenchange=function(fn){
			if(!set){return};
			doc.addEventListener(set.fullEvent,fn, false);
	};

	/*
		让指定elm对象进入全屏模式
	*/
	win.fullscreen=function(element){
		if(set){
			element[set.full]();
		}else{
			elm=element;
			elm.ow=elm.offsetWidth;
			elm.oh=elm.offsetHeight;
			elm.style.position='fixed';
			elm.style.width=cw+'px';
			elm.style.height=ch+'px';
			elm.style.left=0;
			elm.style.top=0;
			state=true;
		} 	 
	};

	/*
		退出全屏模式
	*/
	win.exitfullscreen=function(){
		if(set){
			doc[set.exit](); 
		}else{
			elm.style.position='';
			elm.style.width=elm.ow+'px';
			elm.style.height=elm.oh+'px';
			state=false;
		}
	 
	};
	/*
		返回当前进入全屏模式的元素，或返回null(未进入全屏模式)。
	*/
	win.fullElm=function(){
		if(set){
			return doc[set.fullElm]; 
		}
		return state?elm:null;	
	};

	/*
		返回全屏状态：
		在全屏模式下，则返回true。
		不再全屏模式下，则返回false。
	*/
	win.fullstate=function(){
		if(set){
			if(set.state==null){
				return doc.msFullscreenElement ? true : false;
			}
			return doc[set.state];
		}else{
			return state;
		}
		
	}
	
})(window,document);