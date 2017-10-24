/**
 * desc：股票提示插件.
 * author：helong.
 * createtime：2015-02-02.
 */

(function($g){
    $g.fn.stockAutocomplete = function(obj){
        $g.fn.stockAutocomplete.defaults.init(obj.id);
    };

    $g.fn.stockAutocomplete.defaults = {
        params:{
            s_interval: 1000, //查询间隔为1000毫秒.
            s_switch: false, //查询开关.
            s_position: 0, //$位置.
            s_limit: 8, //列表数量限制.
        },
        //事件绑定.
        bind:function(){
            var _this = this,
                len = 0,
                str = '',
                stock_input = document.getElementById(this.params.stock_input_id);

            $(this.params.stock_input_jqid)
                .keydown(function(e){
                    //组合键.
                    if(e.which == 52 && e.shiftKey){
                        //检查$后面是否还有$.
                        len = _this.getCursort(stock_input);
                        str = stock_input.value.substr(len);
                        if(str.indexOf('$') == -1 && str == ''){
                            _this.params.s_switch = true; //开启查询. 
                            _this.params.s_position = _this.getCursort(stock_input) + 1; //设置$位置.
                        }
                    }

                    //填充结果上、下键处理方法
                    if($("#stock_list:visible").length){
                        return _this.fillKeyboardEvent(e.which);
                    }
                })
                .keyup(function(e){
                    if(e.which == 32){ //如果输入空格则关闭查询.
                        len = _this.getCursort(stock_input);
                        str = stock_input.value.substr(len - 2);
                        if(str.charAt(1).charCodeAt() == 32){ //字符转ascii码.
                            _this.params.s_switch = false; //关闭查询. 
                            $("#stock_list").hide(); //隐藏提示框.
                        }
                    }

                    //如果输入的是$则跳过查询.
                    if(!(e.which == 52 && e.shiftKey) && _this.params.s_switch){
                        if($("#stock_list:visible").length && (e.which == 38 || e.which == 40)){
                            
                        }else{
                            _this.search(); //查询.
                        }
                    }
                });
        },
        //填充结果上、下键处理方法.
        fillKeyboardEvent: function(keyCode){
            var elem = $("#stock_list ul li"),
                elem_selected = $("#stock_list ul li.stock_selected"),
                elem_index = -1,
                elem_cnt = elem.length - 1,
                stock_input = $(this.params.stock_input_jqid);

            if(elem_selected.length){
                elem_index = elem_selected.index();
            }

            switch(keyCode){
                case 13: //回车
                    if(elem_selected.length){
                        str = elem_selected.text() + ' ';
                        content = stock_input.val(); //获取输入框中的内容.
                        content = content.substr(0, _this.params.s_position)//移除查询内容.
                        stock_input.val(content + str); //填充新数据到输入框.
                        $("#stock_list").hide(); //隐藏.
                        this.params.s_switch = false; //关闭查询. 
                    }
                    return false;
                    break;
                case 38: //上
                    if(elem_index == -1){
                        elem.eq(elem_cnt).addClass('stock_selected');
                    }else{ 
                        elem.eq(elem_index).removeClass('stock_selected');
                        elem.eq(elem_index - 1).addClass('stock_selected');
                    }
                    return false;
                    break;
                case 40: //下
                    if(elem_index == -1){
                        elem.eq(0).addClass('stock_selected');
                    }else if(elem_index == elem_cnt){
                        elem.eq(elem_cnt).removeClass('stock_selected');
                        elem.eq(0).addClass('stock_selected');
                    }else{
                        elem.eq(elem_index).removeClass('stock_selected');
                        elem.eq(elem_index + 1).addClass('stock_selected');
                    }
                    return false;
                    break;
            }
        },
        //填充结果事件绑定.
        fillBind: function (){
            var str = '',
                content = ''
                _this = this,
                stock_input = $(this.params.stock_input_jqid);

            $("#stock_list ul li")
                .click(function(){ //鼠标单击.
                    str = $(this).text() + ' ';
                    content = stock_input.val(); //获取输入框中的内容.
                    content = content.substr(0, _this.params.s_position)//移除查询内容.
                    stock_input.val(content + str); //填充新数据到输入框.
                    $("#stock_list").hide(); //隐藏.
                    _this.params.s_switch = false; //关闭查询. 
                    _this.setCursort(document.getElementById(_this.params.stock_input_id), 99999999); //设置光标位置.
                })
                .mouseenter(function(){ //鼠标划过.
                    $("#stock_list ul li").removeClass('stock_selected');
                    $(this).addClass('stock_selected');
                })
                .mouseleave(function(){ //鼠标离开.
                    $(this).removeClass('stock_selected');
                });
        },
        //查询.
        search: function(){
            //this.getCursort(elem); //获取光标位置.
            //this.setCursort(elem, 2); //设置光标位置.
            //console.log(c_p);
            //console.log(this.params.stock_input.value);
            //console.log(this.params.s_position);
            //console.log(stock_list);
            
            var keyword = document.getElementById(this.params.stock_input_id).value.substring(this.params.s_position),
                cnt = 0,
                arr = [],
                data = [],
                stockId = '',
                stockName = '',
                stockAcronym = '';

            keyword = keyword.substring(0); //截取查询内容.
            //console.log(keyword); //监控性能, 下一步修正性能问题.

            if(keyword == ''){
                $("#stock_list").hide(); //隐藏提示列表
                return false;
            }

            //股票代码.
            if(this.isNumber(keyword)){
                // console.log('gpdm');
                for(var i in stock_list){
                    if(cnt >= this.params.s_limit){
                        break;
                    }

                    arr = [];
                    stockId = i;
                    stockName = stock_list[i][0];
                    if(stock_list[i][2].indexOf(keyword) == 0){ //==0精确查询, != -1模糊查询.
                        arr['stockId'] = stockId;
                        arr['stockName'] = stockName;
                        arr['code'] = stock_list[i][3] + stock_list[i][2];
                        data.push(arr);
                        cnt++;
                    }
                }
            }else if(this.isStockShortName(keyword)){ //股票简拼.
                // console.log('gpjp');
                for(var i in stock_list){
                    if(cnt >= this.params.s_limit){
                        break;
                    }

                    arr = [];
                    stockId = i;
                    stockName = stock_list[i][0];
                    stockAcronym = stock_list[i][1];
                    if(stockAcronym.indexOf(keyword.toUpperCase()) == 0){ //==0精确查询, != -1模糊查询.
                        arr['stockId'] = stockId;
                        arr['stockName'] = stockName;
                        arr['code'] = stock_list[i][3] + stock_list[i][2];
                        data.push(arr);
                        cnt++;
                    }
                }
            }else{ //股票名称
                // console.log('gpmc');
                for(var i in stock_list){
                    if(cnt >= this.params.s_limit){
                        break;
                    }

                    arr = [];
                    stockId = i;
                    stockName = stock_list[i][0];
                    if(stockName.toUpperCase().indexOf(keyword.toUpperCase()) == 0){ //==0精确查询, != -1模糊查询.
                        arr['stockId'] = stockId;
                        arr['stockName'] = stockName;
                        arr['code'] = '(' + stock_list[i][3] + stock_list[i][2] + ')';
                        data.push(arr);
                        cnt++;
                    }
                }
            }
            //console.log(data);

            //填充列表.
            //if($("#stock_list:hidden").length){
            this.fillList(data);
            //}
        },
        //填充提示列表.
        fillList: function(data){
            var html = '',
                cnt = 0,
                stock_ul = $("#stock_list ul");

            // console.log(data);
            if(data.length){ //有数据则清空、填充、显示.
                stock_ul.empty(); //清空.

                //填充
                cnt = data.length;
                for(var i = 0; i < cnt; ++i){
                    html = '<li id=' + data[i].stockId + '>' + data[i].stockName + '(' + data[i].code + ')' + '</li>';
                    stock_ul.append(html);
                }

                this.fillBind(); //填充结果事件绑定.
                $("#stock_list ul li").eq(0).addClass('stock_selected'); //默认选中第一个.
                $("#stock_list").show(); //显示.
            }else{ //清空列表并隐藏.
                stock_ul.empty();
                $("#stock_list").hide();
            }
        },
        //股票排序
        stockSort: function(data){

        },
        //是否为数值.
        isNumber: function(num) {
            return !isNaN(parseFloat(num)) && isFinite(num);
        },
        //是否是股票简拼.
        isStockShortName: function(str){
            if(str.length == 0){
                return false;
            }

            for(var i = 0; i < str.length; i ++){
                var tmpstr = str.substr(i, 1);
                var ord = tmpstr.charCodeAt(0);
                if(ord >= 97 && ord <= 122 || ord >= 65 && ord <= 90){

                }else{
                    return false;
                }
            }

            return true;
        },
        //获取光标位置.
        getCursort: function(elem){
            var caret_Pos = 0;

            if(document.selection){ //IE Support
                elem.focus ();
                var sel = document.selection.createRange();
                sel.moveStart ('character', -elem.value.length);
                caret_Pos = sel.text.length;
            }else if(elem.selectionStart || elem.selectionStart == '0'){ //Firefox support
                caret_Pos = elem.selectionStart;
            }

            return (caret_Pos);
        },
        //设置光标位置.
        setCursort: function(elem, pos){
            if(elem.setSelectionRange){
                elem.focus();
                elem.setSelectionRange(pos, pos);
            }else if (elem.createTextRange){
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
                elem.focus();
            }
        },
        //初始化.
        init: function(id){
            this.params.stock_input_id = id;
            this.params.stock_input_jqid = '#' + id;
            this.bind();
        }
    };
})(jQuery);

//初始化
$(function(){
    $("#news_contents").stockAutocomplete({
        id: "news_contents"    
    });
})