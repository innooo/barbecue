$(document).ready(function(){
	$.ajax({
		type:'GET',
		url:'../html/common.html',
		timeout:10000,
		beforeSend:function(){},
		data:{},
		dataType:'html',
		complete:function(){},
		success:insertHTML(),
		error:function(){alert('load timeout');},
		global:true
	});
	function insertHTML(){
		return function(data){
			console.log(data);
		}
	}
});
