// JavaScript Document
$(function(){
 $("#Apply").click(function() {
		 var dataGid = $(this).attr("data-Gid");//比赛ID
		 var datauid = $(this).attr("data-uid");//用户ID
		 var dataGmoney = $(this).attr("data-Gmoney");//比赛初始资金
		 var dataRTtime = $(this).attr("data-RTtime");//比赛报名时间
		 var dataRfees = $(this).attr("data-Rfees");//参赛积分
		 var dataGtype = $(this).attr("data-Gtype");//比赛类型ID 邀请 非邀请
		 var Cdate = "&G_id="+dataGid+"&U_id="+datauid+"&G_money="+dataGmoney+"&G_Rfees="+dataRfees+"&G_type="+dataGtype;
		 //*根据时间判断当前能报名
		 if(dataRTtimeF(dataRTtime)){
			 //根据比赛类型判断显示的报名表和验证
			 if(dataGtype == 1){
				var Mbody ="<form id=\"gameApply_form\" method=\"post\" action=\"\">  <table>  <tr><td style=\"width:92px; height: 50px; text-align:right\">真实姓名：</td><td colspan=\"5\"><input name=\"G_name\" id=\"G_name\" style=\"width:300px;height: 32px\" type=\"text\"   /></td>  </tr>  <tr><td style=\"width:92px; height: 50px; text-align:right\">手机号码：</td><td colspan=\"5\"><input name=\"G_tel\" id=\"G_tel\" style=\"width:300px; height: 32px\" type=\"text\"   /></td>  </tr>  <tr><td style=\"width:92px; height: 50px; text-align:right\">邮箱：</td><td colspan=\"5\"><input name=\"G_Email\" id=\"G_Email\" style=\"width:300px; height: 32px\" type=\"text\"   /></td>  </tr>  <tr id=\"Invite_Ccode_T\"><td style=\"width:92px; height: 50px; text-align:right\">邀请码：</td><td colspan=\"5\"><input name=\"G_Invite_Ccode\" id=\"G_Invite_Ccode\" style=\"width:300px; height: 32px\" type=\"text\"  /></td>  </tr>  <tr><td style=\"width:92px; height: 50px; text-align:right\">验证码：</td><td> <span><input name=\"Gpage_Ccode\" id=\"Gpage_Ccode\" style=\"width:140px; height: 32px\" type=\"text\"  /></span> <span style=\"padding-left:10px;\"><img src=\"picture/yzm.png\" class=\"yzm-img\"></span>   <span style=\"padding-left:10px;\"><a href=\"#\" style=\"text-decoration:underline;color:#d54918;font-size:12px;\">换一张</a></span></td>  </tr> </table></form>";
				//构建报名窗口
				var HTMLMode = MymodelHTML("比赛附加信息",Mbody,true,false,480);
				/*验证开始*/
				$("#gameApply_form").validate({
				rules:{
					  G_name:{required: true,CisChinese: true,rangelength:[2,4]},
					  G_tel:{required: true, isMobile:true},
					  G_Email:{required: true,rangelength:[7,20],email:true},
					  G_Invite_Ccode:{required: true,remote:{ /*邀请码是否正确*/type:"POST",url:"G_Invite_Ccode.php",/*servlet*/dataType: 'json', data:{Ruser_name:function(){return $("#G_Invite_Ccode").val();}}}},
					  Gpage_Ccode:{required: true,remote:{ /*验证码是否正确*/type:"POST",url:"Gpage_Ccode.php",/*servlet*/dataType: 'json', data:{Ruser_name:function(){return $("#Gpage_Ccode").val();}}}}
					  },
				  messages:{
					  G_name:{required:"姓名不能为空！",CisChinese:"请输入汉字",rangelength:"姓名位数必须在2到4个汉字之间！"},
					  G_tel:{required:"手机号不能为空！",isMobile:"请正确填写您的手机号码！"},
					  G_Email:{required:"邮箱不能为空！",rangelength:"邮箱位数必须在7到20字符之间！",email:"请输入正确格式的电子邮件！"},
					  G_Invite_Ccode:{required:"请输入邀请码！",remote:"您输入的邀请码有误"},
					  Gpage_Ccode:{required:"请输入验证码！",remote:"您输入的验证码有误"}
					  }
				});
				/*验证完毕*/
				/*给追加元素提交按钮添加点击处理事件*/
				$('#MSave').on('click', function() {
					if(!$("#gameApply_form").valid()){
						alert("请正确填写相应信息！");
					}else{
						var gameApply_data='';
						gameApply_data = $("#gameApply_form input").map(function(){return ($(this).attr("name")+'='+$(this).val());}).get().join("&") ;
						gameApply_data += Cdate;
						alert(gameApply_data);
						$.ajax({
							type: "POST",
							url: "gameApply.php",
							dataType: "json",
							data: gameApply_data,
							success: function(data) {
								//var data = JSON.parse(data);
								console.log(data);
								alert(data.gameApply.status+"----"+data.gameApply.Gtype);
								if(data.gameApply.status){
									//手动关闭模态窗口
									CloseModel();
									var uurl="#";//用户个人中心链接组装
									var gurl="#";//股票链接
									var ggrul="#";//比赛用户股票购买链接组装
									var Mbody ="<div class=\"gxi\"><div class=\"pull-left\"><img src=\"/picture/gongxi.png\"></div><div class=\"pull-left gx-xx\"><p class=\"gxbmcg\">恭喜你报名成功！</p><p><a href=\""+uurl+"\" class=\"tiaozhuan\">个人中心</a><span style=\"padding-left:20px;\"></span><a href=\""+ggrul+"\" class=\"tiaozhuan\">购买股票</a></p><p><a href=\""+gurl+"\" class=\"tiaozhuan\">查看股票</a><span style=\"padding-left:20px;\"></span><a  \"javascript:void(0)\" id=\"Uclose\"  class=\"tiaozhuan\">留在本页</a></p></div><div class=\"clearfix\"></div></div>";
								    //构建报名窗口
									var HTMLMode = MymodelHTML("提示信息",Mbody,false,false,480);
								}else{
									CloseModel();
									alert("系统出错啦！");
								}
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
		 	 }else{
				 var Mbody ="<form id=\"gameApply_form\" method=\"post\" action=\"\"><table>  <tr><td style=\"width:92px; height: 50px; text-align:right\">真实姓名：</td><td colspan=\"5\"><input name=\"G_name\" id=\"G_name\" style=\"width:300px;height: 32px\" type=\"text\"   /></td>  </tr>  <tr><td style=\"width:92px; height: 50px; text-align:right\">手机号码：</td><td colspan=\"5\"><input name=\"G_tel\" id=\"G_tel\" style=\"width:300px; height: 32px\" type=\"text\"   /></td>  </tr>  <tr><td style=\"width:92px; height: 50px; text-align:right\">邮箱：</td><td colspan=\"5\"><input name=\"G_Email\" id=\"G_Email\" style=\"width:300px; height: 32px\" type=\"text\"   /></td>  </tr><tr><td style=\"width:92px; height: 50px; text-align:right\">验证码：</td><td> <span><input name=\"Gpage_Ccode\" id=\"Gpage_Ccode\" style=\"width:140px; height: 32px\" type=\"text\"  /></span> <span style=\"padding-left:10px;\"><img src=\"picture/yzm.png\" class=\"yzm-img\"></span>   <span style=\"padding-left:10px;\"><a href=\"#\" style=\"text-decoration:underline;color:#d54918;font-size:12px;\">换一张</a></span></td>  </tr> </table> </form>";
				//构建报名窗口
				var HTMLMode = MymodelHTML("比赛附加信息",Mbody,true,false,480);
				/*验证开始*/
				$("#gameApply_form").validate({
				rules:{
					  G_name:{required: true,CisChinese: true,rangelength:[2,4]},
					  G_tel:{required: true, isMobile:true},
					  G_Email:{required: true,rangelength:[7,20],email:true},
					  Gpage_Ccode:{required: true,
					  remote:{ /*验证用户名是否存在*/type:"POST",url:"Gpage_Ccode.php",/*servlet*/dataType: 'json', data:{Ruser_name:function(){return $("#Gpage_Ccode").val();}}}}
					  },
				  messages:{
					  G_name:{required:"姓名不能为空！",CisChinese:"请输入汉字",rangelength:"姓名位数必须在2到4个汉字之间！"},
					  G_tel:{required:"手机号不能为空！",isMobile:"请正确填写您的手机号码！"},
					  G_Email:{required:"邮箱不能为空！",rangelength:"邮箱位数必须在7到20字符之间！",email:"请输入正确格式的电子邮件！"},
					  Gpage_Ccode:{required:"请输入验证码！",remote:"您输入的验证码有误"}
					  }
				});
				/*验证完毕*/
				/*给追加元素提交按钮添加点击处理事件*/
				$('#MSave').on('click', function() {
					if(!$("#gameApply_form").valid()){
						alert("请正确填写相应信息！");
					}else{
						var gameApply_data='';
						gameApply_data = $("#gameApply_form input").map(function(){return ($(this).attr("name")+'='+$(this).val());}).get().join("&") ;
						gameApply_data += Cdate;
						alert(gameApply_data);
						$.ajax({
							type: "POST",
							url: "gameApply.php",
							dataType: "json",
							data: gameApply_data,
							success: function(data) {
								//var data = JSON.parse(data);
								console.log(data);
								alert(data.gameApply.status+"----"+data.gameApply.Gtype);
								if(data.gameApply.status){
									CloseModel();
									var uurl="";//用户个人中心链接组装
									var gurl="";//股票链接
									var ggrul="";//比赛用户股票购买链接组装
									var Mbody ="<div class=\"gxi\"><div class=\"pull-left\"><img src=\"/picture/gongxi.png\"></div><div class=\"pull-left gx-xx\"><p class=\"gxbmcg\">恭喜你报名成功！</p><p><a href=\""+uurl+"\" class=\"tiaozhuan\">个人中心</a><span style=\"padding-left:20px;\"></span><a href=\""+ggrul+"\" class=\"tiaozhuan\">购买股票</a></p><p><a href=\""+gurl+"\" class=\"tiaozhuan\">查看股票</a><span style=\"padding-left:20px;\"></span><a  \"javascript:void(0)\" id=\"Uclose\"  class=\"tiaozhuan\">留在本页</a></p></div><div class=\"clearfix\"></div></div>";
								    //构建报名窗口
									var HTMLMode = MymodelHTML("提示信息",Mbody,false,false,480);
								}else{
									CloseModel();
									alert("系统出错啦！");
								}
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
			 }
		 }else {
			 alert("请在规定的报名时间内报名！");
		 }
	 });
});


document.writeln("<script src=\"style/js/jquery.validate.js\"></script>");
document.writeln("<script src=\"style/js/jquery.validate.message_cn.js\"></script>");
document.writeln("<script src=\"style/js/json.js\"></script>");
document.writeln("<script src=\"style/js/common.js\"></script>");
document.writeln("<script src=\"style/js/ajaxall.js\"></script>");