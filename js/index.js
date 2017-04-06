	var sign=document.querySelector("#sign");
	var user=document.querySelector("[name=user]");
	var psw=document.querySelector("[name=psw]");
	var reset=document.querySelector("[name=reset]");
	var birth=document.querySelector("[name=birth]");
	var mail=document.querySelector("[name=mail]");
	// console.log(birth);
	var nan=document.querySelector("[class=nan]");
	var nv=document.querySelector("[class=nv]");

	sign.onclick=function(){
	var uval=user.value;
	// console.log(uval);	
	var pval=psw.value;
	var bval=birth.value;
	var mval=mail.value;
	var nanval=nan.value;
	var nvval=nv.value;
	// console.log(nanval);	
	// var nvval=
		sessionStorage.setItem("u",uval);
		sessionStorage.setItem("p",pval);
		sessionStorage.setItem("b",bval);
		sessionStorage.setItem("m",mval);
		sessionStorage.setItem("nan",nanval);
		sessionStorage.setItem("nv",nvval);
	}

	var ubval=sessionStorage.getItem("u");
	// console.log(ubval);
	var pbval=sessionStorage.getItem("p");
	var bbval=sessionStorage.getItem("b");
	// console.log(bbval);
	var mbval=sessionStorage.getItem("m");
	var nanbval=sessionStorage.getItem("nan");
	var nvbval=sessionStorage.getItem("nv");
	if (ubval) {user.value=ubval};
	if (pbval) {psw.value=pbval};
	if (bbval) {birth.value=bbval};
	if (mbval) {mail.value=mbval};
	if (nanbval) {nan.checked="checked"};
	if (nvbval) {nv.checked="checked"};
	reset.onclick=function(){
		sessionStorage.clear();
	}