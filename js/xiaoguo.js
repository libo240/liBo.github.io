var box=document.querySelector(".box");
var tupian=document.querySelector(".tupian");
var jiantou=document.querySelector(".jiantou");
var lis=document.querySelectorAll(".one");
var prev=document.querySelector(".prev");
var next=document.querySelector(".next");
var json=[
{
	//1
	width:500,
	height:400,
	top:0,
	left:50,
	opacity:0,
	z:1,
	id:1
},

{
	//2
	width:500,
	height:400,
	top:0,
	left:150,
	opacity:0,
	z:2,
	id:2
},

{
	//3
	width:500,
	height:400,
	top:0,
	left:250,
	opacity:0,
	z:3,
	id:3
},

{
	//4
	width:500,
	height:400,
	top:0,
	left:350,
	opacity:0,
	z:4,
	id:4
},

{
	//5
	width:500,
	height:400,
	top:0,
	left:450,
	opacity:0,
	z:5,
	id:5
},

{
	//6
	width:500,
	height:400,
	top:30,
	left:100,
	opacity:40,
	z:6,
	id:6
},

{
	//7
	width:400,
	height:320,
	top:50,
	left:200,
	opacity:75,
	z:7,
	id:7
},
{
	//8
	width:500,
	height:400,
	top:100,
	left:350,
	opacity:100,
	z:9,
	id:8
},
{
	//9
	width:400,
	height:320,
	top:50,
	left:400,
	opacity:75,
	z:8,
	id:9
},
{
	//10
	width:500,
	height:400,
	top:30,
	left:500,
	opacity:40,
	z:7,
	id:10
},
{
	//11
	width:500,
	height:400,
	top:0,
	left:450,
	opacity:0,
	z:6,
	id:11
},

{
	//12
	width:500,
	height:400,
	top:0,
	left:350,
	opacity:0,
	z:5,
	id:12
},
{
	//13
	width:500,
	height:400,
	top:0,
	left:250,
	opacity:0,
	z:4,
	id:13
},
{
	//14
	width:500,
	height:400,
	top:0,
	left:550,
	opacity:0,
	z:3,
	id:14
},
{
	//15
	width:500,
	height:400,
	top:0,
	left:450,
	opacity:0,
	z:2,
	id:15
},

{
	//16
	width:500,
	height:400,
	top:0,
	left:350,
	opacity:0,
	z:1,
	id:16
},
]
var timer=null;
var flag=false;
box.addEventListener('mouseover',function(){jianbian(jiantou,{opacity:100});});
box.addEventListener('mouseout',function(){jianbian(jiantou,{opacity:0});});

var flag=true;
next.addEventListener('click',function(){
	clearInterval(timer);
	if(flag=true){
		move(true);
		flag=false;
	}
})
next.addEventListener('mouseleave',function(){
	clearInterval(timer);
	run();
})

prev.addEventListener('click',function(){
	clearInterval(timer);
	if(flag=true){
		move(false);
		flag=false;
	}
})
prev.addEventListener('mouseleave',function(){
	clearInterval(timer);
	run();
})
move();
run();

function run(){
	clearInterval(timer);
	timer=setInterval(function(){
		if(flag=true){
			flag=false;
			move(true);
		}
	},800);
}

function move(x){
	if(x!=undefined){
		if(x){
			json.push(json.shift());
		}
		else{
			json.unshift(json.pop());
		}
	}
	
	for(var i=0;i<json.length;i++){
		jianbian(lis[i],{
			width:json[i].width,
			height:json[i].height,
			top:json[i].top,
			opacity:json[i].opacity,
			zIndex:json[i].z,
			left:json[i].left
		},function(){flag=true})
	}
}

function jianbian(obj,json,callback)
{
	clearInterval(obj.timers);
	obj.timers=setInterval(function()
	{
		var stoped=true;
		for(var i in json){
			var leader=0;
			if(i=='opacity'){
				leader=Math.round(getStyle(obj,i)*100);}		
			else{
				leader=parseInt(getStyle(obj,i));
			}
			
			var step=(json[i]-leader)/10;
			step=step>0?Math.ceil(step):Math.floor(step);
			leader+=step;
			
			if(i=='opacity'){
				obj.style[i]=leader/100;
				obj.style['filter']='apha(opacity='+leader+')';
			}
			else if(i=='zIndex'){obj.style['zIndex']=json[i]}
			else {
				obj.style[i]=leader+'px';
			}
			
			if(leader!=json[i]){stoped=false;}
		}
			if(stoped){clearInterval(obj.timers);callback&&callback();}
	},50);
}

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return window.getComputedStyle(obj,null)[attr];
	}
}