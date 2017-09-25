/** 修改价格 **/
$(".table-striped > tbody > tr > td span").click(function(){
    if($(this).html()=="查看"){
        $(".set-overlay,.price-setbox,.date-box").show();
    }
});
$(".date-box .close-date-box").click(function(){
    $(".set-overlay,.price-setbox,.date-box").hide();
})
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
        console.log('价格日历组件加载完毕');
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
$("#set").click(function(){
    daymoney.setmoney('2016-04-21',125,function(data){
        alert('已将'+data.day+'价格设置为'+data.money);	
    });
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