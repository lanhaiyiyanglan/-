// JavaScript Document
 $(function(){
//用户模态登录*注册*找回密码
var DT = $(document).height();
var Lhtml="<div id=\"fade\" class=\"black_overlay\" style=\"height:"+DT+"px\" ></div> <div id=\"login-light\" class=\"white_content\"> <div class=\"login-tan pull-left\"><div class=\"login-title\">用户登陆<img src=\"style/images/hya.png\"></div><form id=\"Log_in_form\" method=\"post\" action=\"\"> <table border=\"0\" cellspacing=\"0\" width=\"270\" class=\"login-table\"> <tr>	 <td><input type=\"text\" id=\"Luser_name\" name=\"Luser_name\" class=\"login-name\" value=\"\" placeholder=\"请输入您的手机号/邮箱号\"> </td></tr> <tr>	 <td><input type=\"password\" id=\"Luser_pwd\" name=\"Luser_pwd\" class=\"login-pwd\"  value=\"\" placeholder=\"密码为6-16位数字和字母组成\"> </td> <tr> <td><span style=\"padding-right:25px;\"><input id=\"user_rememberme\" name=\"user_rememberme\" type=\"checkbox\">记住账号</span><span style=\"padding-right:25px;\"><input id=\"user_autologin\" name=\"user_autologin\" type=\"checkbox\">自动登陆</span><a href=\"#\" style=\"color:#227dbc;\">忘记密码？</a><input type=\"hidden\" value=\"CC\" id=\"user_location\" name=\"user_location\" /> </td> </tr></tr></table></form><input type=\"button\" value=\"登&nbsp;陆\" class=\"login-submit\"></div><div class=\"pull-left\"><div class=\"guanbi\"><a href = \"javascript:void(0)\" id=\"close\"><img src=\"style/images/close.png\"></a></div><div class=\"tan-right\"> <p style=\"border-bottom:1px solid #dbdbdb;line-height:40px;\"> 还没有****炒股比赛网帐号？<a href=\"javascript:void(0);\" id=\"Cregister\" style=\"text-decoration:underline;color:#eb4d15;\">立即注册</a></p><div><p>您也可以用以下方式登录：</p><p><a href=\"#\"><img src=\"style/images/wbdl.png\"></a><br /><br /><a href=\"#\"><img src=\"style/images/qqdl.png\"></a></p></div></div></div> <div class=\"clearfix\"></div></div>";
var Rhtml="<div id=\"fade\" class=\"black_overlay\" style=\"height:"+DT+"px\" ></div><div id=\"register-light\"><div class=\"pull-left\"><img src=\"style/images/mfzc.png\"></div><div class=\"pull-right\"><a href = \"javascript:void(0)\" id=\"close\" ><img src=\"style/images/close.png\"></a></div><div class=\"clearfix\"></div><form   id=\"register_form\" class=\"rg-form\" method=\"post\"><table border=\"0\" cellspacing=\"0\"><tr><td style=\"width:92px; height: 50px; text-align: center\">手机/邮箱</td><td colspan=\"5\"><input name=\"Ruser_name\" value=\"\" id=\"Ruser_name\"  style=\"width:100%; height: 32px\" type=\"text\"    /></td></tr><tr><td style=\"width:92px; height: 50px; text-align: center\">密码</td><td colspan=\"5\"><input name=\"Ruser_pwd\" id=\"Ruser_pwd\" value=\"\"  style=\"width:100%; height: 32px\" type=\"password\"    /></td></tr><tr><td style=\"width:92px; height: 50px; text-align: center\">验证码</td><td><input name=\"Rpage_Ccode\" id=\"Rpage_Ccode\" value=\"\" style=\"width:100%; height: 32px\" type=\"text\"     /></td><td><img src=\"picture/yzm.png\" class=\"yzm-img\" style=\"padding-left:20px;\"></td><td><a href=\"#\">看不清?</a></td></tr><tr><td style=\"width:92px; height: 50px; text-align: center\"><input id=\"Ruser_pact\" name=\"Ruser_pact\" type=\"checkbox\" ></td><td>我已认真阅读并接受</td><td><a href=\"#\">《***股票比赛用户协议》</a><input type=\"hidden\" value=\"CC\" id=\"user_location\" name=\"user_location\" /></td></tr></table></form><p><input type=\"button\" value=\"注册\" class=\"register-bt rg-bt-tan\"></p></div>";
/* 模态登录*/
$("#LOGIN").click(function() {
	  $("body").append(Lhtml);
	  
	  $("#close").on('click', function() {
		$("#login-light").remove();
		$("#fade").remove();
	  });
	  $("#Cregister").on('click', function() {
			$("#login-light").remove();
			$("#fade").remove();
			$("body").append(Rhtml);
		    $("#close").on('click', function() {
			$("#register-light").remove();
			$("#fade").remove();
		});	
		
		$("#register_form").validate({
			  rules:{
				  Ruser_name:{required: true,rangelength:[6,20],
					  remote:{ //验证用户名是否存在
						type:"POST",
						url:"username.php",             //servlet
						dataType: 'json', 
						data:{
						  Ruser_name:function(){return $("#Ruser_name").val();}
							} 
						 } 
					  },
				  Ruser_pwd:{required: true, rangelength:[6,30],regexPassword:true},
				  Rpage_Ccode:{
					  required: true,
					  remote:{ //验证验证码是否正确
						type:"POST",
						url:"Rpage_Ccode.php",//servlet
						dataType: 'json',             
						data:{
						  Rpage_Ccode:function(){return $("#Rpage_Ccode").val();}
							} 
						 }
					  },
				  Ruser_pact:{required: true}
				  },
			  messages:{
				  Ruser_name:{
					  required:"用户名不能为空！",
					  rangelength:"用户名位数必须在6到20字符之间！",
					  remote:"用户名已经被注册"
					  },
				  Ruser_pwd:{
					  required:"密码不能为空！",
					  rangelength:"用户名位数必须在6到30字符之间！",
					  regexPassword:"一个大写，一个小写，一个符号"
					  },
				  Rpage_Ccode:{
					  required:"请输入验证码",
					  remote:"您输入的验证码有误"
					  },
				  Ruser_pact:{required: "请阅读并同意本站用户协议"}
				  }
			}); 
		$('.register-bt').click(function() {
			if(!$("#register_form").valid()){
				alert("请正确填写相应信息！");
			}else{
				var register_data='';
				register_data = $("#register_form input").map(function(){return ($(this).attr("name")+'='+$(this).val());}).get().join("&") ;
				alert(register_data);
				$.ajax({
					type: "POST",
					url: "register.php",
					dataType: "json",
					data: register_data,
					success: function(data) {
						//var data = JSON.parse(data);
						console.log(data);
						alert("用户名："+data.userinfo.name+"---密码："+data.userinfo.pwd+"--位置"+data.userinfo.location);
						$("#register-light").remove();
						$("#fade").remove();
					},
					error: function(x, e) {
						//alert(x.responsetText);
						//alert("Error");
					},
					complete: function(x) {
						//alert(x.responseText);
					}
				});
			}
		});
	  });
	$("#Log_in_form").validate({
		rules:{
			  Luser_name:{required: true,rangelength:[6,20],
				  remote:{ //验证用户名是否存在
					type:"POST",
					url:"loginuser.php",             //servlet
					dataType: 'json', 
					data:{
					  Ruser_name:function(){return $("#Luser_name").val();}
						} 
					 } 
				  },
			  Luser_pwd:{required: true, rangelength:[6,30],}
			  },
		  messages:{
			  Luser_name:{
				  required:"用户名不能为空！",
				  rangelength:"用户名位数必须在6到20字符之间！",
				  remote:"您输入的用户名还没有注册！"
				  },
			  Luser_pwd:{
				  required:"密码不能为空！",
				  rangelength:"用户名位数必须在6到30字符之间！"
				  }
			  }
		});
	$('.login-submit').on('click', function() {
		if(!$("#Log_in_form").valid()){
			alert("请正确填写表单！");
		}else{
			var Login_data='';
			Login_data = $("#Log_in_form input").map(function(){return ($(this).attr("name")+'='+$(this).val());}).get().join("&");
			alert(Login_data);
			$.ajax({
				type: "POST",
				url: "login.php",
				dataType: "json",
				data: Login_data,
				success: function(data) {
					//var data = JSON.parse(data);
					console.log(data);
					alert("用户名："+data.userinfo.name+"---密码："+data.userinfo.pwd+"--位置"+data.userinfo.location);
					$("#login-light").remove();
		            $("#fade").remove();
				},
				error: function(x, e) {
					//alert(x.responsetText);
					//alert("Error");
				},
				complete: function(x) {
					//alert(x.responseText);
				}
			});
		}
	});
});
/*注册*/	  
$("#register").click(function() {
	 
	  $("body").append(Rhtml);
	  $("#close").on('click', function() {
		$("#register-light").remove();
		$("#fade").remove();
	  });	
	
	$("#register_form").validate({
		  rules:{
			  Ruser_name:{required: true,rangelength:[6,20],
				  remote:{ //验证用户名是否存在
					type:"POST",
					url:"username.php",             //servlet
					dataType: 'json', 
					data:{
					  Ruser_name:function(){return $("#Ruser_name").val();}
						} 
					 } 
				  },
			  Ruser_pwd:{required: true, rangelength:[6,30],},
			  Rpage_Ccode:{
				  required: true,
				  remote:{ //验证验证码是否正确
					type:"POST",
					url:"Rpage_Ccode.php",//servlet
					dataType: 'json',             
					data:{
					  Rpage_Ccode:function(){return $("#Rpage_Ccode").val();}
						} 
					 }
				  },
			  Ruser_pact:{required: true}
			  },
		  messages:{
			  Ruser_name:{
				  required:"用户名不能为空！",
				  rangelength:"用户名位数必须在6到20字符之间！",
				  remote:"用户名已经被注册"
				  },
			  Ruser_pwd:{
				  required:"密码不能为空！",
				  rangelength:"用户名位数必须在6到30字符之间！"
				  },
			  Rpage_Ccode:{
				  required:"请输入验证码",
				  remote:"您输入的验证码有误"
				  },
			  Ruser_pact:{required: "请阅读并同意本站用户协议"}
			  }
		}); 
	$('.register-bt').click(function() {
		if(!$("#register_form").valid()){
			alert("请正确填写相应信息！");
		}else{
			var register_data='';
			register_data = $("#register_form input").map(function(){return ($(this).attr("name")+'='+$(this).val());}).get().join("&") ;
			alert(register_data);
			$.ajax({
				type: "POST",
				url: "register.php",
				dataType: "json",
				data: register_data,
				success: function(data) {
					//var data = JSON.parse(data);
					console.log(data);
					alert("用户名："+data.userinfo.name+"---密码："+data.userinfo.pwd+"--位置"+data.userinfo.location);
					$("#register-light").remove();
		            $("#fade").remove();
				},
				error: function(x, e) {
					//alert(x.responsetText);
					//alert("Error");
				},
				complete: function(x) {
					//alert(x.responseText);
				}
			});
		}
	});
});
/*找回密码1*/
$("#msform").validate({
      rules:{
		  Zuser_name:{required: true,rangelength:[6,20],
		      remote:{ //验证用户名是否存在
                type:"POST",
                url:"loginuser.php",             //servlet
				dataType: 'json', 
                data:{
                  Ruser_name:function(){return $("#Zuser_name").val();}
                    } 
                 } 
			  },
		  Zpage_Ccode:{
			  required: true,
			  remote:{ //验证验证码是否正确
                type:"POST",
                url:"Rpage_Ccode.php",//servlet
				dataType: 'json',             
                data:{
                  Rpage_Ccode:function(){return $("#Zpage_Ccode").val();}
                    } 
                 }
			  }
		  },
	  messages:{
		  Zuser_name:{
			  required:"用户名不能为空！",
			  rangelength:"用户名位数必须在6到20字符之间！",
			  remote:"用户名已经被注册"
			  },
		  Zpage_Ccode:{
			  required:"请输入验证码",
			  remote:"您输入的验证码有误"
			  }
		  }
	}); 

/*找回密码2*/
$("#msform2").validate({
      rules:{
		  Zuser_Ucode:{
			  required: true,
			  remote:{ //验证验证码是否正确
                type:"POST",
                url:"Rpage_Ccode.php",//servlet
				dataType: 'json',             
                data:{
                  Rpage_Ccode:function(){return $("#Zuser_Ucode").val();}
                    } 
                 }
			  }
		  },
	  messages:{
		  Zuser_Ucode:{
			  required:"请输入验证码",
			  remote:"您输入的验证码有误"
			  }
		  }
	}); 
/*找回密码3*/
$("#msform3").validate({
      rules:{
		  Zuser_pwd1:{
			  required: true,
			  regexPassword: true,
			  rangelength:[6,30]
			  },
		  Zuser_pwd2:{
			  required: true, 
			  rangelength: [6, 30], 
			  equalTo: "#Zuser_pwd1"
			  }
		  },
	  messages:{
		  Zuser_pwd1:{
			  required:"密码不能为空！",
			  regexPassword: '密码至少包一个大写字母、一个小写字母及一个符号，长度至少8位',
			  rangelength:"用户名位数必须在6到30字符之间！"
			  },
		  Zuser_pwd2:{
			  required: "请输入确认密码",  
			  rangelength: "确认密码不能小于6个字符",  
			  equalTo: "两次输入密码不一致"  
			  }
		  }
	});  
	
});

