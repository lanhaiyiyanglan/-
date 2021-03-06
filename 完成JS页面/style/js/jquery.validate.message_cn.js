// JavaScript Document
//定义中文消息
jQuery.extend(jQuery.validator.messages, {
  required: "必选字段",
  remote: "请修正该字段",
  email: "请输入正确格式的电子邮件",
  url: "请输入合法的网址",
  date: "请输入合法的日期",
  dateISO: "请输入合法的日期 (ISO).",
  number: "请输入合法的数字",
  digits: "只能输入整数",
  creditcard: "请输入合法的信用卡号",
  equalTo: "两次输入密码不一致",
  accept: "请输入拥有合法后缀名的字符串",
  maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
  minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
  rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
  range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
  max: jQuery.validator.format("请输入一个最大为{0} 的值"),
  min: jQuery.validator.format("请输入一个最小为{0} 的值")
});
// 字符验证      
jQuery.validator.addMethod("stringCheck", function(value, element) {      
    return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);      
}, "只能包括中文字、英文字母、数字和下划线");  
 
// 中文字两个字节      
jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {      
    var length = value.length;      
    for(var i = 0; i < value.length; i++){      
        if(value.charCodeAt(i) > 127){      
        length++;      
        }      
    }      
    return this.optional(element) || ( length >= param[0] && length <= param[1] );      
}, "请确保输入的值在4-15个字节之间(一个中文字算2个字节)");
// 密码验证正则表达式
jQuery.validator.addMethod("regexPassword", function(value, element) {  
    return this.optional(element) || /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value);  
}, "一个大写，一个小写，一个符号");
// 手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
var length = value.length;
var mobile = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

jQuery.validator.addMethod("compareDate",function(value, element, param) { 
            //var startDate = jQuery(param).val() + ":00";补全yyyy-MM-dd HH:mm:ss格式 
            //value = value + ":00"; 
            var startDate = jQuery(param).val(); 
            var date1 = new Date(Date.parse(startDate.replace("-", "/"))); 
            var date2 = new Date(Date.parse(value.replace("-", "/"))); 
            return date1 < date2; 
},"结束日期必须大于开始日期!"); 
// 电话号码验证
jQuery.validator.addMethod("isTel", function(value, element) {
var tel = /^d{3,4}-?d{7,9}$/; //电话号码格式010-12345678
return this.optional(element) || (tel.test(value));
}, "请正确填写您的电话号码");

// 联系电话(手机/电话皆可)验证
jQuery.validator.addMethod("isPhone", function(value,element) {
var length = value.length;
var mobile = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
var tel = /^d{3,4}-?d{7,9}$/;
return this.optional(element) || (tel.test(value) || mobile.test(value));

}, "请正确填写您的联系电话");
// 判断整数value是否等于0 
jQuery.validator.addMethod("isIntEqZero", function(value, element) { 
	 value=parseInt(value);      
	 return this.optional(element) || value==0;       
}, "整数必须为0"); 

// 判断整数value是否大于0
jQuery.validator.addMethod("isIntGtZero", function(value, element) { 
	 value=parseInt(value);      
	 return this.optional(element) || value>0;       
}, "整数必须大于0"); 

// 判断整数value是否大于或等于0
jQuery.validator.addMethod("isIntGteZero", function(value, element) { 
	 value=parseInt(value);      
	 return this.optional(element) || value>=0;       
}, "整数必须大于或等于0");   

// 判断整数value是否不等于0 
jQuery.validator.addMethod("isIntNEqZero", function(value, element) { 
	 value=parseInt(value);      
	 return this.optional(element) || value!=0;       
}, "整数必须不等于0");  

// 判断整数value是否小于0 
jQuery.validator.addMethod("isIntLtZero", function(value, element) { 
	 value=parseInt(value);      
	 return this.optional(element) || value<0;       
}, "整数必须小于0");  

// 判断整数value是否小于或等于0 
jQuery.validator.addMethod("isIntLteZero", function(value, element) { 
	 value=parseInt(value);      
	 return this.optional(element) || value<=0;       
}, "整数必须小于或等于0");  

// 判断浮点数value是否等于0 
jQuery.validator.addMethod("isFloatEqZero", function(value, element) { 
	 value=parseFloat(value);      
	 return this.optional(element) || value==0;       
}, "浮点数必须为0"); 

// 判断浮点数value是否大于0
jQuery.validator.addMethod("isFloatGtZero", function(value, element) { 
	 value=parseFloat(value);      
	 return this.optional(element) || value>0;       
}, "浮点数必须大于0"); 

// 判断浮点数value是否大于或等于0
jQuery.validator.addMethod("isFloatGteZero", function(value, element) { 
	 value=parseFloat(value);      
	 return this.optional(element) || value>=0;       
}, "浮点数必须大于或等于0");   

// 判断浮点数value是否不等于0 
jQuery.validator.addMethod("isFloatNEqZero", function(value, element) { 
	 value=parseFloat(value);      
	 return this.optional(element) || value!=0;       
}, "浮点数必须不等于0");  

// 判断浮点数value是否小于0 
jQuery.validator.addMethod("isFloatLtZero", function(value, element) { 
	 value=parseFloat(value);      
	 return this.optional(element) || value<0;       
}, "浮点数必须小于0");  

// 判断浮点数value是否小于或等于0 
jQuery.validator.addMethod("isFloatLteZero", function(value, element) { 
	 value=parseFloat(value);      
	 return this.optional(element) || value<=0;       
}, "浮点数必须小于或等于0");  

// 判断浮点型  
jQuery.validator.addMethod("isFloat", function(value, element) {       
	 return this.optional(element) || /^[-\+]?\d+(\.\d+)?$/.test(value);       
}, "只能包含数字、小数点等字符"); 

// 匹配integer
jQuery.validator.addMethod("isInteger", function(value, element) {       
	 return this.optional(element) || (/^[-\+]?\d+$/.test(value) && parseInt(value)>=0);       
}, "匹配integer");  

// 判断数值类型，包括整数和浮点数
jQuery.validator.addMethod("isNumber", function(value, element) {       
	 return this.optional(element) || /^[-\+]?\d+$/.test(value) || /^[-\+]?\d+(\.\d+)?$/.test(value);       
}, "匹配数值类型，包括整数和浮点数");  

// 只能输入[0-9]数字
jQuery.validator.addMethod("isDigits", function(value, element) {       
	 return this.optional(element) || /^\d+$/.test(value);       
}, "只能输入0-9数字");  

// 判断中文字符 
jQuery.validator.addMethod("isChinese", function(value, element) {       
	 return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);       
}, "只能包含中文字符。");   

// 判断英文字符 
jQuery.validator.addMethod("isEnglish", function(value, element) {       
	 return this.optional(element) || /^[A-Za-z]+$/.test(value);       
}, "只能包含英文字符。");  
 // 匹配qq      
jQuery.validator.addMethod("isQq", function(value, element) {       
	 return this.optional(element) || /^[1-9]\d{4,12}$/;       
}, "匹配QQ");   

 // 邮政编码验证    
jQuery.validator.addMethod("isZipCode", function(value, element) {    
  var zip = /^[0-9]{6}$/;    
  return this.optional(element) || (zip.test(value));    
}, "请正确填写您的邮政编码。");  

// 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。      
jQuery.validator.addMethod("isPwd", function(value, element) {       
	 return this.optional(element) || /^[a-zA-Z]\\w{6,12}$/.test(value);       
}, "以字母开头，长度在6-12之间，只能包含字符、数字和下划线。"); 
// 匹配english  
jQuery.validator.addMethod("isEnglish", function(value, element) {       
	 return this.optional(element) || /^[A-Za-z]+$/.test(value);       
}, "匹配english");   

// 匹配汉字  
jQuery.validator.addMethod("CisChinese", function(value, element) {       
	 return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);       
}, "匹配汉字");   

// 匹配中文(包括汉字和字符) 
jQuery.validator.addMethod("isChineseChar", function(value, element) {       
	 return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);       
}, "匹配中文(包括汉字和字符) "); 

// 判断是否为合法字符(a-zA-Z0-9-_)
jQuery.validator.addMethod("isRightfulString", function(value, element) {       
	 return this.optional(element) || /^[A-Za-z0-9_-]+$/.test(value);       
}, "判断是否为合法字符(a-zA-Z0-9-_)");   

// 判断是否包含中英文特殊字符，除英文"-_"字符外
jQuery.validator.addMethod("isContainsSpecialChar", function(value, element) {  
	 var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\')(\；)(\：)(\")(\")(\')(\。)(\，)(\、)(\？)]+/);   
	 return this.optional(element) || !reg.test(value);       
}, "含有中英文特殊字符"); 
// 身份证号码验证     
jQuery.validator.addMethod("isIdCardNo", function(value, element) {      
    return this.optional(element) || isIdCardNo(value);      
}, "请正确输入您的身份证号码");
 
/**
 * 身份证号码验证
 */ 
function isIdCardNo(num) { 
   
 var factorArr = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1); 
 var parityBit=new Array("1","0","X","9","8","7","6","5","4","3","2"); 
 var varArray = new Array(); 
 var intValue; 
 var lngProduct = 0; 
 var intCheckDigit; 
 var intStrLen = num.length; 
 var idNumber = num; 
   // initialize 
     if ((intStrLen != 15) && (intStrLen != 18)) { 
         return false; 
     } 
     // check and set value 
     for(i=0;i<intStrLen;i++) { 
         varArray[i] = idNumber.charAt(i); 
         if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) { 
             return false; 
         } else if (i < 17) { 
             varArray[i] = varArray[i] * factorArr[i]; 
         }
     }
        
     if (intStrLen == 18) {
         //check date
         var date8 = idNumber.substring(6,14);
         if (isDate8(date8) == false) {
            return false;
         }
         // calculate the sum of the products 
         for(i=0;i<17;i++) {
             lngProduct = lngProduct + varArray[i];
         }
         // calculate the check digit
         intCheckDigit = parityBit[lngProduct % 11];
         // check last digit
         if (varArray[17] != intCheckDigit) {
             return false;
         }
     }
     else{   //length is 15
         //check date
         var date6 = idNumber.substring(6,12);
         if (isDate6(date6) == false) {
             return false;
         }
     }
     return true;
 }