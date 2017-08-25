$(document).ready(function(){
//	console.log($('link[href="../style/login.css"]'));
	//加载表单页面----开始
	$.ajax({
			type:'GET',
			url:'../../dist/html/loginPart.html',
			beforeSend:function(){},
			data:{},
			timeout:10000,
			dataType:'HTML',
			success:showRegister(),
			error:function(){alert('error')},
			complete:function(){},
			global:true
		});
		function showRegister(){
			return function(data){
				$('.form-box').html(data);
			}
		}
	//加载表单页面----结束

		$('.form-box').on('click',".form-top a:contains('免费注册')",function(){
			$('link[href="../style/login.css"]').attr('href','../style/register.css');
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
				}
			}
		});
		
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
				}
			}
		});
});
