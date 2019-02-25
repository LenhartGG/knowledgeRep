// var lang=sessionStorage.getItem("lang");
// if(lang===null){
// 	lang="zh";
// }
// // loadProperties(lang);
// $("#lang").val(lang);
// function loadProperties(types) {
// 	 $.i18n.properties({
// 		 name:'strings',    //属性文件名     命名格式： 文件名_国家代号.properties
// 		 path:'static/lang/',   //注意这里路径是你属性文件的所在文件夹
// 		 mode:'map',
// 		 language:types,     //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties
// 		 callback:function(){
// 			$("[data-locale]").each(function(){
// 				$(this).html($.i18n.prop($(this).data("locale")));
// 			});
// 			$("[data-placeholder]").each(function(){
// 				$(this).attr('placeholder',$.i18n.prop($(this).data("placeholder")));
// 			});
// 		 }
// 	 });
//  }
 
//  //切换语言
// $("#lang").on('change',function(){
// 	sessionStorage.setItem("lang",$(this).val());
// 	loadProperties($(this).val());
// });

var i18n_dict = {
    "你好": "hellow",
    "欢迎": "welcome",

};
// $.i18n.load(i18n_dict);
var en = function(event) {
    //		公共部分
    $('#ex1').html('hello');
    $('#ex2').html('welcome');
    
};

var ch = function(event) {
    //		公共部分
    $('#ex1').html('你好');
    $('#ex2').html('欢迎');
    
};
$("#lang").on('change', function(event){
    var curLan =  $("#lang option:selected").val()
    console.log(curLan);
    if ( curLan === 'en' ){
        en();
    }else if (curLan === 'ch'){
        ch()
    }
    
})