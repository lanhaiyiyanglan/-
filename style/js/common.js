// JavaScript Document
/***********幻灯*****************/
auto=null;
timer=null;
var focus=new Function();
focus.prototype={
	init:function(){
		//默认动画频率
		this.aTime=this.aTime || 10;
		//默认间隔
		this.sTime=this.sTime ||5000;
		//图片容器
		//this.oImg=document.getElementById('focus_m').getElementsByTagName("ul")[0];
		this.oImgLi=this.oImg.getElementsByTagName("li");
		//创建文字容器
		this.createTextDom();
		//默认第一帧
		this.target=0;
		//开始动画
		this.autoMove();
	},
	createTextDom:function(){
		var that=this;
		//创建文字容器
		this.oText=document.createElement("div");
		this.oText.className="focus_s";
		var ul=document.createElement('ul');
		var frag=document.createDocumentFragment();
		for (var i=0;i<this.oImgLi.length;i++) {
			var li=document.createElement("li");
			li.innerHTML='<b></b>';
			if (i==0) {
				li.className="active";
			};
			frag.appendChild(li);
		};
		ul.appendChild(frag);
		this.oText.appendChild(ul);
		this.o.insertBefore(this.oText,this.o.firstChild);
		//文字容器绑定动作
		this.oTextLi=this.oText.getElementsByTagName("li");		
	},
	autoMove:function(){
		var that = this;   
		auto=setInterval(function(){that.goNext()},that.sTime);
	},
	goNext:function() {
		this.target=this.nowIndex();
		this.target==this.oTextLi.length-1 ? this.target=0:this.target++;
		this.aStep=(this.target-this.nowIndex())*this.step;
		this.removeClassName();
		this.oTextLi[this.target].className="active";
		this.startMove();
	},
	goPrev:function() {
		this.target=this.nowIndex();
		this.target==0 ? this.target=this.oTextLi.length-1 : this.target--;
		this.aStep=(this.target-this.nowIndex())*this.step;
		this.removeClassName();
		this.oTextLi[this.target].className="active";
		this.startMove();
	},
	startMove:function (){
		var that=this;
		var t=0;
		this.timer='';
		function set(){
			//if (t>100) {
				//clearInterval(that.timer);
			//}else {
				for (var i=0;i<that.oImgLi.length;i++) {
					that.oImgLi[i].style.display='none';
				};
				that.oImgLi[that.target].style.display='block';
				//that.setOpacity(that.oImg,t);
				//t+=5;
			//};
		};
		timer=setInterval(set,that.aTime);
	},
	nowIndex:function(){
		for (var i=0;i<this.oTextLi.length;i++) {
			if (this.oTextLi[i].className=='active') {
				return i;
				break;
			}
		};
	},
	removeClassName:function(){
		for (var i=0;i<this.oTextLi.length;i++) {
			this.oTextLi[i].className=""
		};
	}
};
var focusRun=new focus();
focusRun.o=document.getElementById("focus");
window.onload=function(){
	focusRun.init();
};
/*比赛公告js*/
(function(){
	if(!Function.prototype.bind){
		Function.prototype.bind = function(obj){
			var owner = this,args = Array.prototype.slice.call(arguments),callobj = Array.prototype.shift.call(args);
			return function(e){e=e||top.window.event||window.event;owner.apply(callobj,args.concat([e]));};
		};
	}
})();
var banner_tabs = function(id){
	this.ctn = document.getElementById(id);
	this.adLis = null;
	this.btns = null;
	this.animStep = 0.2;//动画速度0.1～0.9
	this.switchSpeed = 6;//自动播放间隔(s)
	this.defOpacity = 1;
	this.tmpOpacity = 1;
	this.crtIndex = 0;
	this.crtLi = null;
	this.adLength = 0;
	this.timerAnim = null;
	this.timerSwitch = null;
	this.init();
};
banner_tabs.prototype = {
	fnAnim:function(toIndex){
		if(this.timerAnim){window.clearTimeout(this.timerAnim);}
		if(this.tmpOpacity <= 0){
			this.crtLi.style.opacity = this.tmpOpacity = this.defOpacity;
			this.crtLi.style.filter = 'Alpha(Opacity=' + this.defOpacity*100 + ')';
			this.crtLi.style.zIndex = 0;
			this.crtIndex = toIndex;
			return;
		}
		this.crtLi.style.opacity = this.tmpOpacity = this.tmpOpacity - this.animStep;
		this.crtLi.style.filter = 'Alpha(Opacity=' + this.tmpOpacity*100 + ')';
		this.timerAnim = window.setTimeout(this.fnAnim.bind(this,toIndex),50);
	},
	fnNextIndex:function(){
		return (this.crtIndex >= this.adLength-1)?0:this.crtIndex+1;
	},
	fnSwitch:function(toIndex){
		if(this.crtIndex==toIndex){return;}
		this.crtLi = this.adLis[this.crtIndex];
		for(var i=0;i<this.adLength;i++){
			this.adLis[i].style.zIndex = 0;
		}
		this.crtLi.style.zIndex = 2;
		this.adLis[toIndex].style.zIndex = 1;
		for(var i=0;i<this.adLength;i++){
			this.btns[i].className = '';
		}
		this.btns[toIndex].className = 'cur'
		this.fnAnim(toIndex);
	},
	fnAutoPlay:function(){
		this.fnSwitch(this.fnNextIndex());
	},
	fnPlay:function(){
		this.timerSwitch = window.setInterval(this.fnAutoPlay.bind(this),this.switchSpeed*1000);
	},
	fnStopPlay:function(){
		window.clearTimeout(this.timerSwitch);
	},
	init:function(){
		this.adLis = this.ctn.getElementsByTagName('li');
		this.btns = this.ctn.getElementsByTagName('cite')[0].getElementsByTagName('span');
		this.adLength = this.adLis.length;
		for(var i=0,l=this.btns.length;i<l;i++){
			with({i:i}){
				this.btns[i].index = i;
				this.btns[i].onclick = this.fnSwitch.bind(this,i);
				this.btns[i].onclick = this.fnSwitch.bind(this,i);
			}
		}
		this.adLis[this.crtIndex].style.zIndex = 2;
		this.fnPlay();
		this.ctn.onmouseover = this.fnStopPlay.bind(this);
		this.ctn.onmouseout = this.fnPlay.bind(this);
	}
};
var player1 = new banner_tabs('banner_tabs');