$(".btn-date").click(function(){
    if($('#sel-date').val().length>1){
        var date_t;
        if($(this).html()=="前15天"){
            date_t=dateFtt("yyyy-MM-dd",new Date($('#sel-date').val()).addDays(-15));            
        }else if($(this).html()=="后15天"){
            date_t=dateFtt("yyyy-MM-dd",new Date($('#sel-date').val()).addDays(15)); 
        }
        $('#sel-date').val(date_t);
        $('#start-input').val(date_t);
        $('#end-input').val(dateFtt("yyyy-MM-dd",new Date(date_t).addDays(14)));
        $("#dtp_input").val(date_t)
        $(".roomStatus-sel .control-week").html(getWeekday(date_t));
    }else{
        alert("请输入起始日期！");
    }
});
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}
function getWeekday(sDate){
    var dt = new Date(sDate);
    var a = ['周日', '周一','周二','周三','周四','周五','周六'];
    return a[dt.getDay()];
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
/** bootstrap-datetimepicker **/
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
function changeState(el) {
    if (el.readOnly) el.checked=el.readOnly=false;
    else if (!el.checked) el.readOnly=el.indeterminate=true;
};
/** 设置操作 **/
var oneRest,allRest;
var changeMax;
$("td .btn-link").click(function(){
    if($(this).html()=="批量修改"){
        allRest=$(this);
        $(".set-overlay").show();
        $(".rest-price").show();
        $(".rest-only").hide();
        $(".rest-price .control-group em").html($(this).parent().prev().children("span").next().html());
    }else{
        oneRest=$(this);
        $(".set-overlay").show();
        $(".rest-price").hide();
        $(".rest-only").show();
        $(".rest-price .control-group em").html($(this).html());
    }
    changeMax=$(this).parent().prev().children("span").next().html();    
});
$(".rest-price .rest-close,.rest-price .rest-no,.rest-price .rest-ok").click(function(){
    $(".set-overlay").hide();
    $(".rest-price").hide();
    $(".rest-only").hide();
});
$(".rest-only .rest-ok").click(function(){
    if(!$(this).hasClass("rest-no")){
        if($('input:radio[name="rest-only"]:checked').val()=="open"){
            oneRest.html($(".rest-price .control-group em").html()); 
        }else{
            oneRest.html(changeMax-$(".rest-price .control-group em").html());
        }
        if(parseInt($(".rest-price .control-group em").html())>0){
            oneRest.removeClass("red");
            oneRest.parent().removeClass("td-red").addClass("td-blue");
        }else{
            oneRest.addClass("red");
            oneRest.parent().removeClass("td-blue").addClass("td-red");
        }
    }
});
$(".rest-price .rest-ok-all").click(function(){
    if(!$(this).hasClass("rest-no")){
        if($('input:radio[name="rest-all"]:checked').val()=="open"){
            allRest.parent().siblings().children("span:nth-child(1)").html($(".rest-price .control-group em").html());
        }else{            
            allRest.parent().siblings().children("span:nth-child(1)").html(changeMax-$(".rest-price .control-group em").html());
        }
        if(parseInt($(".rest-price .control-group em").html())>0){
            allRest.parent().siblings().children("span:nth-child(1)").removeClass("red");
            allRest.parent().siblings().children("span:nth-child(1)").parent().removeClass("td-red").addClass("td-blue");
        }else{
            allRest.parent().siblings().children("span:nth-child(1)").addClass("red");
            allRest.parent().siblings().children("span:nth-child(1)").parent().removeClass("td-blue").addClass("td-red");
        }
    }
})
$(".close-open i").click(function(){
    if($(this).attr("class").indexOf("plus")>-1){
        if(parseInt($(".rest-price .control-group em").html())<parseInt(changeMax)){
            $(".rest-price .control-group em").html(parseInt($(".rest-price .control-group em").html())+1);
        }
    }else{
        if(parseInt($(".rest-price .control-group em").html())>0){
            $(".rest-price .control-group em").html(parseInt($(".rest-price .control-group em").html())-1);
        }
    }
});
$(".rest-price div input").unbind();
$(".rest-price div span").unbind();
$(".rest-price div span").css("cursor","default")