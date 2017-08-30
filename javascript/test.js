//发布-订阅模式
//构建发布者
var Publisher = function(){
	this.listen = {
			/*evt1:[fn1,fn2,fn3],
			evt2:[fn1,fn2,fn3]*/
		}
	};
Publisher.prototype = {
	constructor:Publisher,
	//订阅 添加订阅者 实际上是缓存回调函数
	subscribe:function(evt/*订阅内容*/,fn/*针对订阅内容的动作*/){
		//通常发布者对象只关注自己发布了什么,以及对应的有哪些听众,所以evt1,evt2代表的就是
		//发布者发布的信息类型,类似事件类型,而其对应的数组中是该事件触发后会执行的函数列表
		if(this.listen[evt]){
			this.listen[evt].push(fn);
		}else{
			this.listen[evt] = [fn];
		}
	},
	//发布 实际上是执行缓存的回调函数
	publish:function(){//这里的第一个参数一定是自定义事件类型,后面的参数可以是发布时需要发布的参数,如
					   //Ajax请求的返回数据等
		//发布实际上就是发布者对象触发了某个自定义事件
		//取出代表事件类型的参数
		var evt = Array.prototype.shift.apply(arguments);
		
		var len = this.listen[evt].length;
		//这里需要注意的是 发布的时候遵循后订阅先执行,类似事件绑定
		for(var i = len - 1;i >= 0;i--){
			this.listen[evt][i].apply(null,arguments);
		}
	},
	//退订 实际上是从回调函数序列中把指定回调函数清除
	unsubscribe:function(evt/*订阅内容*/,fnID/*动作*/){
		var fnList = this.listen[evt];
		if(!fnList){
			return false;
		}
		if(!fnID){
			fnList &&(fnList.length = 0);
		}else{
			var len = fnList.length - 1;
			while(len >=0){
				if(fnList[len] === fnID)
				fnList.splice(len,1);
				len--;
			}
			
		}	
	}
};
	
var theBtn = new Publisher();
var header = (function(){
	theBtn.subscribe('click',hFn1 = function(){
		header.setAvator();
	});
	return {
		setAvator:function(){
			console.log('header')
		}
	}
}())
var nav = (function(){
	theBtn.subscribe('click',nFn1 = function(){
		nav.setAvator();
	});
	return {
		setAvator:function(){
			console.log('nav')
		}
	}
}())
var bottom = (function(){
	theBtn.subscribe('click',bFn1 = function(){
		bottom.setAvator();
	});
	return {
		setAvator:function(){
			console.log('bottom')
		}
	}
}())

theBtn.unsubscribe('click',bFn1);
window.onload = function(){
	var oBtn = document.querySelector('#btn');
	oBtn.onclick = function(){
		theBtn.publish('click');
	}
};

