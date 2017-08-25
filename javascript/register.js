$(document).ready(function(){
	
	//加载表单页面----开始
	$.ajax({
			type:'GET',
			url:'../../dist/html/registerPart.html',
			beforeSend:function(){},
			data:{},
			timeout:10000,
			dataType:'HTML',
			success:showRegister(),
			error:function(){alert('error')},
			complete:function(){},
			global:true
//			switchForm()
		});
		function showRegister(){
			return function(data){
				$('.form-box').html(data);
//				console.log($(".form-top a:contains('立即登录')"));
				checkRegInfo();
			}
		}
	//加载表单页面----结束
	
	//切换登录/注册页面---开始
		$('.form-box').on('click',".form-top a:contains('立即登录')",function(){
			$('link[href="../style/register.css"]').attr('href','../style/login.css');
			$.ajax({
				type:'GET',
				url:'../../dist/html/loginPart.html',
				beforeSend:function(){},
				data:{},
				timeout:10000,
				dataType:'HTML',
				success:showLogin(),
				error:function(){alert('error')},
				complete:function(){},
				global:true
			});
			function showLogin(){
				return function(data){
					$('.form-box').html(data);
					checkLoginInfo();
				}
			}
		});
		
		$('.form-box').on('click',".form-top a:contains('免费注册')",function(){
			$('link[href="../style/login.css"]').attr('href','../style/register.css');
//			console.log($('link'));
			$.ajax({
				type:'GET',
				url:'../../dist/html/registerPart.html',
				beforeSend:function(){},
				data:{},
				timeout:10000,
				dataType:'HTML',
				success:showLogin(),
				error:function(){alert('error')},
				complete:function(){},
				global:true
			});
			function showLogin(){
				return function(data){
					$('.form-box').html(data);
					checkRegInfo();
				}
			}
		});
	//切换 登录 / 注册页面------结束
	
	//验证手机号实现注册功能-----开始
	/*$('#phone-box').blur(function(){
		$(this).val();
	});*/
	/*function clickReg(){
		$('.form-box').on('click','#reg-btn',function(){
			console.log($('#phone-box'));
		});
	}*/
	
	$('.form-box').on('click','#reg-btn',function(){
		if($('#agree').is(':checked')){
			var phone = $('#phone-box').val();
			var code  = $('#code-box').val();
			var msg   = $('#msg-box').val();
			var psw   = $('#psw-box').val();
			var numList = {phone:phone,code:code,msg:msg,psw:psw};
			$.ajax({
				type:'GET',
				url:'../../dist/php/register.php',
				data:numList,
				timeout:10000,
				beforeSend:function(){},
				dataType:'JSON',
				success:function(data){},
				error:function(){console.log('error')},
				complete:function(data){},
				global:true
			});
		}
	});
});
