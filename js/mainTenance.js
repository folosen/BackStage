/** 修改价格 **/
$(".table-striped > tbody > tr > td span").click(function(){
    if($(this).html()=="查看"){
        $(".set-overlay,.price-setbox,.date-box").show();
        $(".price-setbox .set-overlay-c").hide();
    }
});
$(".date-footer .rest-ok").click(function(){
    $(".set-overlay,.price-setbox,.date-box").hide();
})
$(".date-box .close-date-box").click(function(){
    $(".set-overlay,.price-setbox,.date-box").hide();
})
$(".date-box .am-table .rest-btn").click(function(){
    $(".price-setbox .date-box .rest-price").show();
    $(".price-setbox .set-overlay-c").show();
});
$(".price-setbox .date-box .rest-price  .rest-close").click(function(){
    $(".price-setbox .date-box .rest-price").hide();
    $(".price-setbox .set-overlay-c").hide();    
});
$(".price-setbox .date-box .rest-price  .rest-ok").click(function(){    
    var d=dateMath($("#dtp_input1").val(),$("#dtp_input2").val());
    if(d<0){        
        var dateArray = getDates(new Date($("#dtp_input1").val()), (new Date($("#dtp_input1").val())).addDays(Math.abs(d)));
    }else{
        var dateArray = getDates(new Date($("#dtp_input2").val()), (new Date($("#dtp_input1").val())).addDays(Math.abs(d)));        
    }
    for (i = 0; i < Math.abs(d)+1; i ++ ) {
        //console.log(dateFtt("yyyy-MM-dd",dateArray[i]))
        daymoney.setmoney(dateFtt("yyyy-MM-dd",dateArray[i]),$("#restPeric").val(),function(data){	
        });
    }
});
/**时间格式化**/
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, stopDate) {
   var dateArray = new Array();
   var currentDate = startDate;
   while (currentDate <= stopDate) {
     dateArray.push(currentDate)
     currentDate = currentDate.addDays(1);
   }
   return dateArray;
 }
 /**************************************时间格式化处理************************************/
function dateFtt(fmt,date)   
{ //author: meizz   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 
/** 格式化处理完成 **/

function dateMath(d1,d2){
    if(d1.length>1&&d2.length>1){
        d1=new Date(d1);    
        d2=new Date(d2);
        $(".price-setbox .date-box .rest-price").hide();
        $(".price-setbox .set-overlay-c").hide();
        return (d1-d2)/(24*60*60*1000);
    }else{
        alert("请输入时间区间")
    }
    
}
var daydata = '[{"day":"2017-09-01|228"},{"day":"2017-09-30|228"},{"day":"2017-09-02|228"},{"day":"2017-09-03|228"}]';
var daymoney = $("#calendar").daymoney({
    'date':'', //加载时默认显示的月份，不填则显示当前月份
    daydata: daydata, 		//日期价格数据
    events: 'click', 		//监听事件，默认为click
    'style': {
        disabled: "am-disabled", 	//禁用日期样式[当前日期之前]
        active: "am-active", 		//激活日期样式[当前日期之后]
        today: "am-primary", 		//当天日期样式
    },
    'load': function(obj) { 		//加载完毕时触发
        //console.log('价格日历组件加载完毕');
    },
    'click': function(obj) { 		//点击日期触发
        var html = obj.data('date') + "的价格是:" + obj.data('money');
    }
}).init();
//使用daymoney对象方法
$("#prev").click(function(){
    daymoney.prev();
});
$("#next").click(function(){
    daymoney.next();
});
$(".price-setbox .date-box .rest-price  .rest-ok").click(function(){
    
});
//日历插件
$('.form_datetime').datetimepicker({
    //language:  'fr',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    showMeridian: 1
});
$('.form_date').datetimepicker({
    language:  'fr',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});
$('.form_time').datetimepicker({
    language:  'fr',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 1,
    minView: 0,
    maxView: 1,
    forceParse: 0
});