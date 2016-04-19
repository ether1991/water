var customClaroTheme, timeLabelFunction;
var data1;
var data2;
var data3;
var rdata;
var rdata1;
var dates;
require([
	"dojo/ready",
	"dojo/sniff", // ua sniffing
	"dojo/on",
	"dojo/dom", // byId
	"dojo/dom-style",
	"dojo/_base/fx",
	"dojo/topic",
	"dojo/fx/easing",
	"dojox/mobile",
	"dojox/mobile/compat",
	"dojox/mobile/View",
	"dojox/mobile/RoundRect", 
	"dojox/mobile/Button", 
	"dojox/mobile/parser",
	"dojox/charting/widget/Chart", 
	"dojox/charting/Theme", 
	"dojox/charting/axis2d/Default", 
	"dojox/charting/plot2d/Columns",
	"dojox/charting/plot2d/Areas", 
	"dojox/charting/plot2d/StackedAreas",
	"dojox/charting/plot2d/Lines", 
	"dojox/charting/plot2d/Grid", 
	"dojox/data/CsvStore",
	"dijit/registry",
	
	"dojo/has!touch?dojox/charting/action2d/TouchZoomAndPan:dojox/charting/action2d/MouseZoomAndPan",
	"dojo/has!touch?dojox/charting/action2d/TouchIndicator:dojox/charting/action2d/MouseIndicator",
	// Load the Legend widget class
	"dojox/charting/widget/Legend",
	"dojox/charting/widget/SelectableLegend"],
	
	function(ready, has, on, dom, domStyle, fx,easing, topic, mobile, compat, View, RoundRect, Button, parser,
			 Chart, Theme, Default, Columns, StackedAreas,Areas,Lines, Grid, CsvStore, registry, ZoomAndPan, Indicator,Legend,SelectableLegend){

 	var pHeight = 0;

 	//resize函数主要解决屏幕适配问题
	var resize = function(){
		var view2 = dom.byId("view2");
		if(view2.style.visibility == "hidden" || view2.style.display == "none"){
			return;
		}
		var wsize = mobile.getScreenSize();
		// needed for IE, because was overriden to 0 at some point
		if(has("ie")){
			dom.byId("stockChart").style.width = "100%";
		}else{
			// on Android, the window size is changing a bit when scrolling!
			// ignore those resize
			if(wsize.h > pHeight - 64 && wsize.h < pHeight + 64){
				return;
			}
		}
		pHeight = wsize.h;
		var box = { h: wsize.w > wsize.h ? wsize.h - 92 : wsize.h - 196 };
		registry.byId("stockChart").resize(box);
	}; 

/* 	var googStore = new CsvStore({url: "resources/data/goog_prices.csv"});

	var yahooStore = new CsvStore({url: "resources/data/yahoo_prices.csv"});

	var msftStore = new CsvStore({url: "resources/data/msft_prices.csv"});

	var selectedStore = googStore; */

	//var currentData;

	//var dataFreq = 4;
	 

	//showChartView函数：显示图表，添加数据
 	var showChartView = function(){
		//selectedStore.fetch({onComplete: processData});
	var chart1 = registry.byId("stockChart").chart;
	
	var dataStore = new CsvStore({url: "data/data1.csv"});  //csv数据文件
	
	var processData = function(items, arg){
		//items.reverse(); //将csv存储数据倒序排列
		//currentData = [];
		data1 = [];
		data2 = [];
		data3 = [];
		data4 = [];
		data5 = [];
		data6 = [];
		data7 = [];
		data8 = [];
		data9 = [];
		data10 = [];
		data11 = [];
		data12 = [];
		data13 = [];
		date=[];
		var item;
		for(var i = 0; i < items.length; i++){
			// Reduce data size
				item = {};
				
				var value = dataStore.getValue(items[i], "data1");
				item.data1 = parseFloat(value);

				value = dataStore.getValue(items[i], "data2");
				item.data2 = parseFloat(value);
				
				value = dataStore.getValue(items[i], "data3");
				item.data3 = parseFloat(value);
				
				value = dataStore.getValue(items[i], "data4");
				item.data4 = parseFloat(value);
				
				value = dataStore.getValue(items[i], "data5");
				item.data5 = parseFloat(value);
				
				value = dataStore.getValue(items[i], "data6");
				item.data6 = parseFloat(value);
				
				value = dataStore.getValue(items[i], "data7");
				item.data7 = parseFloat(value);
			
				value = dataStore.getValue(items[i], "data8");
				item.data8 = parseFloat(value);
				
				value = dataStore.getValue(items[i], "data9");
				item.data9 = parseFloat(value);
				
				value = dataStore.getValue(items[i], "data10");
				item.data10 = parseFloat(value);
				
				value = dataStore.getValue(items[i], "data11");
				item.data11 = parseFloat(value);
				
				value = dataStore.getValue(items[i], "data12");
				item.data12 = parseFloat(value);
				
				value = dataStore.getValue(items[i], "data13");
				item.data13 = parseFloat(value);
				
				value = dataStore.getValue(items[i], "date");
				item.date = parseFloat(value);
				
				data1.push(item.data1);
				data2.push(item.data2);
				data3.push(item.data3);
				data4.push(item.data4);
				data5.push(item.data5);
				data6.push(item.data6);
				data7.push(item.data7);
				data8.push(item.data8);
				data9.push(item.data9);
				data10.push(item.data10);
				data11.push(item.data11);
				data12.push(item.data12);
				data13.push(item.data13);
				date.push(item.date);

		}
		
		chart1.addSeries("0.05",data1, {plot:"volumePlot", stroke: {color: "rgb(156,198,240)"}}); 
		chart1.addSeries("0.10",data2, {plot:"volumePlot", stroke: {color: "rgb(156,18,240)"}});
		chart1.addSeries("0.25",data3, {plot:"volumePlot", stroke: {color: "red"}});
		chart1.addSeries("0.40",data4, {plot:"volumePlot",stroke: {color: "blue"}});
		chart1.addSeries("0.55",data5,{plot:"volumePlot",stroke:{color:"#f7a357"}});
		chart1.addSeries("0.70",data6, {plot:"volumePlot", stroke: {color: "rgb(156,198,240)"}}); 
		chart1.addSeries("0.85",data7, {plot:"volumePlot", stroke: {color: "rgb(156,98,40)"}});
		chart1.addSeries("1.00",data8, {plot:"volumePlot",stroke: {color: "red"}});
		chart1.addSeries("1.15",data9, {plot:"volumePlot",stroke: {color: "blue"}});
		chart1.addSeries("1.30",data10,{plot:"volumePlot",stroke:{color:"#f7a357"}});
		chart1.addSeries("1.45",data11, {plot:"volumePlot", stroke: {color: "rgb(156,198,240)"}}); 
		chart1.addSeries("1.60",data12, {plot:"volumePlot", stroke: {color: "rgb(156,19,20)"}});
		chart1.addSeries("1.75",data13, {plot:"volumePlot",stroke: {color: "red"}});
		chart1.addSeries("date",date, {plot:"volumePlot",stroke: {color: "blue"}});
		//chart1.addSeries("data5",data3,{plot:"volumePlot",stroke:{color:"#f7a357"}});
		
		//添加网格图
		chart1.addPlot("default", { type: Grid,
         hStripes: true,
         vStripes: false,
         hFill: "white",
         vFill: "white" });
		 
		 
		resize();//适应屏幕
		chart1.render();//开始渲染
		var legend1 = new dojox.charting.widget.Legend({chart: chart1}, "legend1");  //加图例
	};
	
	dataStore.fetch({onComplete: processData});  //读取数据
	

	}; 
	//hideChartView：隐藏部分数据
	var hideChartView = function(){
		var chart1 = registry.byId("stockChart").chart;
		chart1.removeSeries("data1");
		chart1.removeSeries("data2");
		chart1.removeSeries("data3");
		//chart1.removeSeries("VolumeSeries");
		chart1.render();
	};

	//timeLabelFunction：实现横轴时间根据缩放而变化
	timeLabelFunction = function(v){
		var idx = parseInt(v);
		var dtime;
	
		dtime = date[idx];  //
		return dtime;
	}


	var interactionMode = null;
	var interactor1;
	var interactor2;
/*
	var indicatorFillFunc = function(v1, v2){
		if(v2){
			return v2.y>v1.y?"green":"red";
		}else{
			return "#ff9000";
		}
	};
*/
	//indicatorFillFunc:在表头上，根据不同位置显示不同数值
	var indicatorFillFunc = function(v){
		if(v){
			dom.byId("date").innerHTML =  date[v.x-1]; 
			dom.byId("data1").innerHTML = data1[v.x-1]; 
			dom.byId("data2").innerHTML = data2[v.x-1];
			dom.byId("data3").innerHTML = data3[v.x-1];
			dom.byId("data4").innerHTML = data4[v.x-1];
            dom.byId("data5").innerHTML = data5[v.x-1];
			dom.byId("data6").innerHTML = data6[v.x-1]; 
			dom.byId("data7").innerHTML = data7[v.x-1];
			dom.byId("data8").innerHTML = data8[v.x-1];
			dom.byId("data9").innerHTML = data9[v.x-1];
            dom.byId("data10").innerHTML = data10[v.x-1];
			dom.byId("data11").innerHTML = data11[v.x-1];
			dom.byId("data12").innerHTML = data12[v.x-1];
            dom.byId("data13").innerHTML = data13[v.x-1];
			//return data3[v.x-1];//参数超过阈值，显示红色
		}else{
			return "#ff9000";
		}
	};
	//labelFillFunc:在鼠标或手指在屏幕滑动时，在指示线上实时显示水位的范围
	var labelFillFunc = function(v){  	
       //str1 = "水位范围:  "+data1[v.x-1] + " - " +data2[v.x-1];  
    //  str1=dat3[v.x-1];
	  //return str1;                     
     };  

    
    //switchMode:根据不同需要选择3中不同的模式：1. data indicator：可以在页面拖动，同时会有指示线和相应数据的变化；
    //2.zoom&pan:可以鼠标左键单击拖动，选择部分区域放大;3.no interaction:普通图表页面，不允许缩放和拖动
	var switchMode = function(){
		var label = dom.byId("touchLabel");
		label.style.display = "";
		domStyle.set(label, "opacity", 0);
		fx.fadeIn({node:"touchLabel", duration:1500}).play();

		setTimeout(function(){label.style.display = "none";}, 2000);//屏幕适应，每2秒刷新一次
		var chart = registry.byId("stockChart").chart;

		if(interactionMode == null){
			// we were in no interaction let's go to indicator mode
			
			interactionMode = "indicator";
			interactor1 = has("touch")?new ZoomAndPan(chart, "default", { axis: "x",
					enableScroll: false, enableZoom: true}):
					new ZoomAndPan(chart, "default", { axis: "x", enableScroll: false });
			interactor2 = has("touch")?new Indicator(chart, "default", {
						series: "0.25", dualIndicator: true, font: "normal normal bold 12pt Helvetica",
						lineOutline: null, outline: null, markerOutline: null,
						fillFunc: indicatorFillFunc,labelFunc : labelFillFunc
					}):new Indicator(chart, "default", {
							series: "0.25", font: "normal normal bold 12pt Helvetica",
							lineOutline: null, outline: null, markerOutline: null,
							fillFunc: indicatorFillFunc,labelFunc : labelFillFunc,
						});
			label.innerHTML = "滑动指示模式";
		}else if (interactionMode == "indicator"){
			// we were in indicator mode let's go to zoom mode
			interactionMode = "zoom";
			interactor1.disconnect();
			interactor2.disconnect();
			interactor1 = has("touch")?new ZoomAndPan(chart, "default", {axis: "x", scaleFactor:2}):
				new ZoomAndPan(chart, "default", {axis: "x", scaleFactor:2});
			label.innerHTML = "伸缩模式";
		}else {
			// we were in zoom mode let's go to null
			interactionMode = null;
			interactor1.disconnect();
			label.innerHTML = "图表模式";
		}
		chart.render();
	};
	
	/* var companySelect = function(store, label){
		return function(event){
			selectedStore = store;
			registry.byId("view2head1").set("label", label);
		}
	}; */
	

	//init：
	var init = function(){
	
	
		var view2 = registry.byId("view2");
		//view2.on("BeforeTransitionOut", hideChartView);
		//view2.on("AfterTransitionIn", showChartView);
		
		showChartView();//调用showChartView，显示图表
		on(dom.byId("indicatorMode"), "click", switchMode);//根据按钮的点击事件，更换不同模式
		
		switchMode();//变换不同的模式

		topic.subscribe("/dojox/mobile/resizeAll", resize);
		
		
	};
	//customClaroTheme:设置主题，包括坐标轴的样式，线的颜色，宽度
	customClaroTheme = new Theme({
		axis:{
			stroke:	{ // the axis itself
				color: "rgba(0, 0, 0, 0.5)"
			},
			tick: {	// used as a foundation for all ticks
				color: "rgba(0, 0, 0, 0.5)",
				fontColor: "rgba(0, 0, 0, 0.5)"
			}
		},
		series: {
			outline: null
		},
		grid: {
			majorLine: {
				color: "rgba(0, 0, 0, 0.2)"
			}
		},
		indicator: {//指示线相关属性
			lineStroke:  {width: 1.5, color: "blue"},//这是跟着手指或者鼠标滑动而滑动的纵向指示线
			lineOutline: {width: 0.5, color: "white"},
			stroke: null,
			outline: null,
			fontColor: "#ffffff",//指示线上显示水位范围的字体的颜色
			markerFill: Theme.generateGradient({type: "radial", space: "shape", r: 100}, "white", "#ff9000"),
			markerStroke: {width: 1.5, color: "#ff6000"},//lineStroke指示线上小球的颜色和大小
			markerOutline:{width: 0.5, color: "white"}
		},
		seriesThemes: [ {stroke: "#1a80a8", fill: "#c7e0e9" }, {stroke: "#6d66b9", fill: "#c9c6e4" } ]//可以控制带状区域的颜色，和showChartView配合使用
	});

	//开始，载入页面，调用init
	ready(init);
});
