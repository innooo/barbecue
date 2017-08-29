function checkLoginInfo() {
	var verityArr = [];
	//check function
	function check(option){
		var userInfo = getCookie('userInfo');
		if(option == 'username'){
			data = $('#phone-box').val();
		}else if(option == 'password'){
			data = $('#psw-box').val();
		}else{
			return;
		}
		if(userInfo){
			userInfo = JSON.parse(userInfo);
			var isExist = true;
			for(var i = 0;i < userInfo.length;i++){
				if(userInfo[i][option] == data){
					isExist = true;
					return 1;
				}else{
					isExist = false;
				}
			}
			if(!isExist){
				return 0;
			}
		}else{
			return 0;
		}
	}
	//verigy phon
	$('.form-box #phone-box').blur(function(e) {
		var pattern = /^1[358]\d{8}\d$/;
		var checkResult;
		var　username = $(this).val();
		if($(this).val() == '') {
			$(this).next().css('display', 'block').html('*用户名不能为空！');
			verityArr[0] = 0;
			$(this).parent().removeClass('correct');
		} else if(!(pattern.test($(this).val()))) {
			$(this).next().css('display', 'block').html('*手机号码格式错误');
			verityArr[0] = 0;
			$(this).parent().removeClass('correct');
		} else {
			checkResult = check('username');
			if(checkResult == 1){
				$(this).parent().addClass('correct');
				verityArr[0] = 1;
			}else{
				$(this).next().css('display', 'block').html('*用户名不存在！');
				verityArr[0] = 0;
				$(this).parent().removeClass('correct');
			}	
		}
	});
	//用户名框重新获得焦点，移出提示信息
	$('.form-box #phone-box').focus(function(e) {
		$(this).next().css('display', 'none');
	});
	//end

	//verify code
	function createCode() {
		$.ajax({
			type: 'GET',
			url: '../../dist/json/registerPage.json',
			data: {},
			dataType: 'JSON',
			timeout: 10000,
			beforeSend: function() {},
			success: function(data) {
				insertCode(data)
			},
			error: function() {
				console.log('load code error')
			},
			complete: function() {},
			global: true
		});

		function insertCode(data) {
			var index = Math.round(Math.random() * 10);
			$('#code-img').attr({
				'src': data[index].url,
				'code': data[index].val
			});
		}
	}
	createCode();
	$('#change-code').click(function() {
		createCode();
	});
	$('.form-box #code-box').blur(function(e) {
		e.stopPropagation();
		if($(this).val() != $('#code-img').attr('code')) {
			$(this).next().css('display', 'block').html('*验证码错误');
			verityArr[1] = 0;
			$(this).parent().removeClass('correct');
		} else {
			$(this).parent().addClass('correct');
			verityArr[1] = 1;
		}
	});
	$('.form-box #code-box').focus(function(e) {
		$(this).next().css('display', 'none');
	});
	//end

	//verify psw
	$('.form-box #psw-box').blur(function(e) {
//		var username = $('#phone-box').val();
//		var password = $('#psw-box').val();
		
//		$.ajax({
//			type:'GET',
//			url:'../../dist/php/register.php',
//			timeout:10000,
//			beforeSend:function(){},
//			data:{"username":username,"password":password},
//			dataType:'text',
//			success:function(data){result(data)},
//			error:function(){console.log('error')},
//			complete:function(){},
//			global:true
//		});
	
		var checkResult = check('password');
		if(checkResult == 0){
			$(this).next().css('display', 'block').html('*密码错误');
			verityArr[2] = 0;
			$(this).parent().removeClass('correct');
		}else{
			$(this).parent().addClass('correct');
			verityArr[2] = 1;
		}
	});
	$('.form-box #psw-box').focus(function(e) {
		$(this).next().css('display', 'none');
	});
	//end
	
	$('#login-btn').click(function() {
		var btn = 0;
		for(var i = 0; i < verityArr.length; i++) {
			btn += verityArr[i];
		}
		if(btn === 3){
			//verify if the checkbox is checked
			if($('#agree').is(':checked')){
				setCookie('isLogin',1,7,'/');
			}else{
				setCookie('isLogin',1,0,'/');
			}
			window.location.href="../index.html"; 
		}else{
			alert('请检查用户名或密码！')
		}
	});
}

function checkRegInfo() {
	var verityArr = [];
	//verigy phone
	$('.form-box #phone-box').blur(function(e) {
		var pattern = /^1[358]\d{8}\d$/;
		if($(this).val() == '') {
			$(this).next().css('display', 'block').html('*手机号码不能为空');
			verityArr[0] = 0;
			$(this).parent().removeClass('correct');
		} else if(!(pattern.test($(this).val()))) {
			$(this).next().css('display', 'block').html('*手机号码格式错误');
			verityArr[0] = 0;
			$(this).parent().removeClass('correct');
		} else {
			$(this).parent().addClass('correct');
			verityArr[0] = 1;
		}
	});
	$('.form-box #phone-box').focus(function(e) {
		$(this).next().css('display', 'none');
	});
	//end

	//verify code
	function createCode() {
		$.ajax({
			type: 'GET',
			url: '../../dist/json/registerPage.json',
			data: {},
			dataType: 'JSON',
			timeout: 10000,
			beforeSend: function() {},
			success: function(data) {
				insertCode(data)
			},
			error: function() {
				console.log('load code error')
			},
			complete: function() {},
			global: true
		});

		function insertCode(data) {
			var index = Math.round(Math.random() * 10);
			$('#code-img').attr({
				'src': data[index].url,
				'code': data[index].val
			});
		}
	}
	createCode();
	$('#change-code').click(function() {
		createCode();
	});
	$('.form-box #code-box').blur(function(e) {
		e.stopPropagation();
		if($(this).val() != $('#code-img').attr('code')) {
			$(this).next().css('display', 'block').html('*验证码错误');
			verityArr[1] = 0;
			$(this).parent().removeClass('correct');
		} else {
			$(this).parent().addClass('correct');
			verityArr[1] = 1;
		}
	});
	$('.form-box #code-box').focus(function(e) {
		$(this).next().css('display', 'none');
	});
	//end

	//verify msg
	//create msg
	$('#get-code').click(function() {
		var num = Math.floor(Math.random() * 1000000);
		$('#randomnum').css('display', 'block').attr('code', num).html('验证码:' + num);
	});
	$('.form-box #msg-box').blur(function(e) {
		if($(this).val() != $('#randomnum').attr('code')) {
			$(this).next().css('display', 'block').html('*短信验证码输入有误');
			$(this).parent().removeClass('correct');
			verityArr[2] = 0;
		} else {
			$(this).parent().addClass('correct');
			verityArr[2] = 1;
		}
	});
	$('.form-box #msg-box').focus(function(e) {
		$(this).next().css('display', 'none');
	});
	//end

	//verify psw
	$('.form-box #psw-box').blur(function(e) {
		var pattern = /^[a-zA-Z][\w&$]{6,10}\w$/;
		if($(this).val() == '') {
			$(this).next().css('display', 'block').html('*密码不能为空');
			$(this).parent().removeClass('correct');
			verityArr[3] = 0;
		} else if(!(pattern.test($(this).val()))) {
			$(this).next().css('display', 'block').html("密码以字母开头可包含字母数字或'&$'至少8位");
			$(this).parent().removeClass('correct');
			verityArr[3] = 0;
		} else {
			$(this).attr('code', $(this).val());
			$(this).parent().addClass('correct');
			verityArr[3] = 1;
		}
	});
	$('.form-box #psw-box').focus(function(e) {
		$(this).next().css('display', 'none');
	});
	//end

	//verify psw again
	$('.form-box #psw-verify-box').blur(function(e) {
		if($(this).val() == '') {
			$(this).next().css('display', 'block').html('*密码确认不能为空');
			$(this).parent().removeClass('correct');
			verityArr[4] = 0;
		} else if($(this).val() != $('#psw-box').attr('code')) {
			$(this).next().css('display', 'block').html('*两次密码输入不一致');
			$(this).parent().removeClass('correct');
			verityArr[4] = 0;
		} else {
			$(this).parent().addClass('correct');
			verityArr[4] = 1;
		}
	});
	$('.form-box #psw-verify-box').focus(function(e) {
		$(this).next().css('display', 'none');
	});
	//end

	$('#reg-btn').click(function() {
		var btn = 0;
		//verify checkbox is checked
		if(!$('#agree').is(':checked')) {
			$('#agree').next().css('display', 'block').html('需要阅读用户协议吗?');
			verityArr[5] = 0;
		} else {
			$('#agree').next().css('display', 'none');
			verityArr[5] = 1;
		}
		//隐藏短信验证码
		$('#randomnum').css('display', 'none');

		for(var i = 0; i < verityArr.length; i++) {
			btn += verityArr[i];
		}
		if(btn === 6){
			var username = $('#phone-box').val();
			var password = $('#psw-box').val();
			var userInfo = getCookie('userInfo');
			var thisUser = {"username":username,"password":password};
			var isExist = true;
			var isSuccess = true;
			if(userInfo){
				userInfo = JSON.parse(userInfo);
				for(var i = 0;i < userInfo.length;i++){
					if(userInfo[i].username == username){
						isExist = true;
						isSuccess = false;
						alert('用户名已存在！');
						break;
					}else{
						isExist = false;
					}
				}
				if(!isExist){
					isSuccess = true;
					userInfo.unshift(thisUser);
					setCookie('userInfo',JSON.stringify(userInfo),7,'/');
				}	
			}else{
				setCookie('userInfo','[' + JSON.stringify(thisUser) + ']',7,'/');
				isSuccess = true;
			}	
			if(isSuccess){
				$('.popup-wrap').show().find('.popup-box').prepend($('<p>注册成功是否登录?</p>'))
				.find('#confirm').click(function(){
					window.location.href = '../index.html?username=' + username;
				}).siblings('#cancel').click(function(){
					$('.popup-wrap').hide();
				});
			}
			
		}
	});
}