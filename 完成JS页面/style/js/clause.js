// JavaScript Document
$(function(){
	//判断下一步按钮是否可用
	$("#btnc").click(function() {
		if($("#sureclause").is(":checked")){
			this.href= "<?= ?>"; 
		}else{
			alert("请阅读并同意");
		}
	});
	
	/*验证开始*/
	$("#G_create_form1").validate({
		rules:{
		  sponsor:{required: true,rangelength:[6,30]},
		  sponsor_linkman:{required: true,CisChinese: true,rangelength:[2,4]},
		  sponsor_mobile:{required: true, isMobile:true},
		  sponsor_email:{required: true,rangelength:[7,20],email:true},
		  match_name:{required: true,rangelength:[10,60]},
		  match_desc:{required: true,rangelength:[100,500]}
		  },
	  	messages:{
		  sponsor:{required:"主办方名称不能为空！",rangelength:"主办方名称位数必须在6到30个汉字之间！"},
		  sponsor_linkman:{required:"联系人不能为空！",CisChinese:"请输入汉字",rangelength:"联系人位数必须在2到4个汉字之间！"},
		  sponsor_mobile:{required:"手机号不能为空！",isMobile:"请正确填写您的手机号码！"},
		  sponsor_email:{required:"邮箱不能为空！",rangelength:"邮箱位数必须在7到20字符之间！",email:"请输入正确格式的电子邮件！"},
		  match_name:{required: "比赛名称不能为空！",rangelength:"比赛名称必须在10到60字符之间！"},
		  match_desc:{required: "比赛介绍不能为空！",rangelength:"比赛介绍必须在100到500字符之间！"}
		  }
	});
	$('#next').on('click', function() {
		if(!$("#G_create_form1").valid()){
			alert("请正确填写相应信息！");
		}else{
			var G_create_form1_data = $("#G_create_form1 input").map(function(){return ($(this).attr("name")+'='+$(this).val());}).get().join("&") ;
			alert(G_create_form1_data);
			window.location.href = "/比赛申请2.html?"+G_create_form1_data; 
		}
	});
	
	$('#next2').on('click', function() {
		/*验证开始*/
		$("#G_create_form2").validate({
			rules:{
			  applydtStart:{required: true},
			  applydtEnd:{required: true,compareDate: "#applydtStart"},
			  playdtStart:{required: true,compareDate: "#applydtEnd"},
			  playdtEnd:{required: true,compareDate: "#playdtStart"},
			  init_money:{required: true},
			  G_Content:{required: true},
			  G_type:{required: true},
			  G_apply_money:{required: true},
			  G_tel:{required: true}
			  },
			messages:{
			  applydtStart:{required: "请选择活动报名开始时间！"},
			  applydtEnd:{required: "请选择活动报名截止时间！",compareDate:"结束日期必须大于开始日期!"},
			  playdtStart:{required: "请选择活动比赛开始时间！",compareDate:"活动比赛开始日期必须大于活动报名结束日期!"},
			  playdtEnd:{required: "请选择活动比赛截止时间！",compareDate:"结束日期必须大于开始日期!"},
			  init_money:{required: "请选择活动初始账户资金！"},
			  G_Content:{required: "请选择活动内容！"},
			  G_type:{required: "请选择活动类型！"},
			  G_apply_money:{required: "请选择活动报名是否需要费用及相关信息！"},
			  G_tel:{required: "请选择活动报名是否需要手机信息！"}
			  }
		});
		if(!$("#G_create_form2").valid()){
			alert("请正确填写相应信息！");
		}else{
			var G_create_form2_data = $("#applydtStart").attr("name")+"="+$("#applydtStart").val()+"&" ;
			G_create_form2_data += $("#applydtEnd").attr("name")+"="+$("#applydtEnd").val()+"&" ;
			G_create_form2_data += $("#playdtStart").attr("name")+"="+$("#playdtStart").val()+"&" ;
			G_create_form2_data += $("#playdtEnd").attr("name")+"="+$("#playdtEnd").val()+"&" ;
			G_create_form2_data += $("#init_money").attr("name")+"="+$("#init_money").val()+"&";
			G_create_form2_data += $("#G_Content").attr("name")+"="+$("#G_Content").val()+"&";
			G_create_form2_data += "G_type="+$('input:radio[name=G_type]:checked').val()+"&";
			if($('input:radio[name=G_type]:checked').val() == 1){
				G_create_form2_data += "G_apply_money="+$('input:radio[name=G_type]:checked').val()+"&";
				G_create_form2_data += $("#G_apply_money_true").attr("name")+"="+$("#G_apply_money_true").val()+"&" ;
			}else{
				G_create_form2_data += "G_apply_money="+$('input:radio[name=G_type]:checked').val()+"&";
			}
			if($("#spam_name").attr('checked')==true){
				G_create_form2_data += "spam_name="+1+"&";
			}else{
				G_create_form2_data += "spam_name="+0+"&";
			}
			if($("#spam_email").attr('checked')==true){
				G_create_form2_data += "spam_email="+1+"&";
			}else{
				G_create_form2_data += "spam_email="+0+"&";
			}
			G_create_form2_data += "G_tel="+$('input:radio[name=G_tel]:checked').val();
			alert(G_create_form2_data);
			window.location.href = "/比赛申请3.html?"+G_create_form2_data; 
		}
	});
	
	//添加奖品
	$("#addJP").click(function() {
	    var Mbody = "<form id=\"G_Meed\" ><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" class=\"create_table2\"><tbody><tr><th><em>*</em> 奖项名称：</th><td><input class=\"input-w160\" name=\"award_desc\" id=\"award_desc\" value=\"\" maxlength=\"40\"><b></b></td><td class=\"tdbeizhu\">如总收益第一名</td> </tr><tr><th><em>*</em> 奖项类型：</th><td><select class=\"w160\" id=\"category\" name=\"category\"><option value=\"\" selected=\"\">请选择</option><option value=\"0\" >总榜奖</option><option value=\"1\">日榜奖</option><option value=\"2\">周榜奖</option><option value=\"3\">月榜奖</option></select></td><td></td></tr><tr><th><em>*</em> 名次：</th><td><input class=\"input-w160\" name=\"award_rank\" id=\"award_rank\" value=\"\" maxlength=\"40\"><b></b></td><td class=\"tdbeizhu\">如为前十名请填写：1-10，单个名次直接填写对应的数字，如为无任何名次的填写0</td></tr><tr><th><em>*</em> 奖品名称：</th><td><input name=\"award_name\" id=\"award_name\" value=\"\" class=\"input-w160\" maxlength=\"100\"><b></b></td><td class=\"tdbeizhu\">如苹果手机IPHONE4一部</td></tr><tr><th>奖品图片：</th><td><div class=\"upload_box\"><input type=\"file\" id=\"pic_file\" name=\"pic_file\"><b></b></div></td><td class=\"tdbeizhu\"> 图片最佳尺寸为：169*107 </td></tr></tbody></table>";
		//构建奖品添加窗口
		var HTMLMode = MymodelHTML("添加奖品",Mbody,true,false,"DM");
		/*验证开始*/
		$("#G_Meed").validate({
			rules:{
			  award_desc:{required: true,rangelength:[4,15]},
			  category:{required: true,},
			  award_rank:{required: true},
			  award_name:{required: true,rangelength:[4,10]}
			  },
			messages:{
			  award_desc:{required:"奖项名称不能为空！",rangelength:"奖项名称称位数必须在4到15个汉字之间！"},
			  category:{required:"请选择奖项类型！"},
			  award_rank:{required:"名次不能为空！"},
			  award_name:{required:"奖品名称不能为空！",rangelength:"奖品名称位数必须在4到10字符之间！"}
			  }
		});
		$("#MSave").on('click', function() {
			if(!$("#G_Meed").valid()){
				alert("请正确填写相应信息！");
			}else{
			    var G_Meed_data='';
				G_Meed_data = $("#G_Meed input").map(function(){return ($(this).attr("name")+'='+$(this).val());}).get().join("&") ;
				alert(G_Meed_data);
				$.ajax({
					type: "POST",
					url: "G_Meed.php",
					dataType: "json",
					data: G_Meed_data,
					success: function(data) {
						//var data = JSON.parse(data);
						if(data.G_Meed.status){
							$("#SystemModal").remove();
							$("#fade").remove();
							alert("添加成功！");
						}else{
							$("#SystemModal").remove();
							$("#fade").remove();
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
		
	});	
});
document.writeln("<script src=\"style/js/jquery.validate.js\"></script>");
document.writeln("<script src=\"style/js/jquery.validate.message_cn.js\"></script>");
document.writeln("<script src=\"style/js/json.js\"></script>");
document.writeln("<script src=\"style/js/common.js\"></script>");
document.writeln("<script src=\"style/js/ajaxall.js\"></script>");

