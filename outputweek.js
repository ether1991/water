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
	
	//var legend = new SelectableLegend({chart: chart1, horizontal: true}, "legend1");
	
	
	
	var dataStore = new CsvStore({url: "data/outputweek.csv"});  //csv数据文件
	
	var processData = function(items, arg){
		//items.reverse(); //将csv存储数据倒序排列
		//currentData = [];
		data1 = [];
		data2 = [];
		data3 = [];
		rdata = [];
		rdata1 = [];
		dates = [];
		
		//value = dataStore.getValue(items[0], "2012");
		//dom.byId("test").innerHTML = value;
		
		value = dataStore.getAttributes(items[0]);
	//	dom.byId("test").innerHTML = value[0];
		last2year = value[0];
		lastyear = value[1];
		thisyear = value[2];
		
		
		
		//表头位置的值根据此处变化
		dom.byId("thisyear").innerHTML = thisyear;
		dom.byId("lastyear").innerHTML = lastyear;
		dom.byId("last2year").innerHTML = last2year;
		
		var item;
		for(var i = 0; i < items.length; i++){
			// Reduce data size
				item = {};
				
				
				//var value = dataStore.getValue(items[i], "data1");
				//item.data1 = parseFloat(value);

				//value = dataStore.getValue(items[i], "data2");
				//item.data2 = parseFloat(value);
				
				value = dataStore.getValue(items[i], thisyear);
				item.data3 = parseFloat(value);
				
				value = dataStore.getValue(items[i], last2year);
				item.rdata = parseFloat(value);
				
				value = dataStore.getValue(items[i], lastyear);
				item.rdata1 = parseFloat(value);
			
				value = dataStore.getValue(items[i], "dates");
				item.dates = value;
				
				data1.push(item.data1);
				data2.push(item.data2);
				data3.push(item.data3);
				rdata.push(item.rdata);
				rdata1.push(item.rdata1);
				dates.push(item.dates);

		}
		

		//添加数据，设定颜色
		//表示区域,构成区域的原理是将2个区域叠加，下边界一下填充白色
		//chart1.addSeries("data1",data1, {plot:"default", stroke: {color: "rgb(156,198,240)"},fill:"white"}); //区域的下边界
		//chart1.addSeries("data2",data2, {plot:"default", stroke: {color: "rgb(156,198,240)"}});//区域的上边界
		//3条线
		//图中从下往上第二条线，对应rdata1数据   
		//stroke设置数据线样式 color为线颜色 style为线型（默认是实线，虚线可选Dash、ShortDash或LongDash）
		chart1.addSeries(thisyear,data3,{plot:"volumePlot",stroke:{color:"#f7a357"}});//图中最下边的线，对应data3
		chart1.addSeries(lastyear,rdata1,{plot:"volumePlot",stroke: {color: "red"}});
		chart1.addSeries(last2year,rdata, {plot:"volumePlot",stroke: {color: "blue"}});//图中最上边的线，对应rdata		
		
	
		//添加网格图
		chart1.addPlot("default", { type: Grid,
         hStripes: true,
         vStripes: false,
         hFill: "white",
         vFill: "white" });	 
		 
		resize();//适应屏幕
		chart1.render();//开始渲染
		var legend1 = new dojox.charting.widget.Legend({chart: chart1}, "legend1");  
	
	    //var legend = new dojox.charting.widget.Legend({ chart1: chart1 }, "legend");
		
	};
	
	dataStore.fetch({onComplete: processData});  //读取数据
	
	

/*  data1 = [ 
21.84,21.86,21.88,21.89,21.9,21.91,21.96,22.02,22.08,22.13,22.17,22.22,22.26,22.3,22.35,22.39,22.43,22.46,22.5,22.53,22.52,22.5,22.49,22.68,22.85,22.99,23.11,23.23,23.33,23.42,23.45,23.42,23.4,23.36,23.34,23.36,23.33,23.29,23.22,23.15,23.11,23.08,23.05,23,22.96,22.91,22.88,22.86,22.85,22.83,22.83,22.82,22.82,22.82,22.82,22.82,22.83,22.84,22.85,22.85,22.86,22.86,22.78,22.7,22.61,22.55,22.48,22.41,22.35,22.29,22.21,
22.1,22.06,22.02,21.99,21.96,21.93,21.9,21.87,21.9,21.92,21.94,21.96,21.99,22.01,22.03,22.09,22.13,22.18,22.22,22.28,22.33,22.38,22.51,22.51,22.51,22.53,22.5,22.46,22.42,22.35,22.29,22.24,22.19,22.13,22.08,22.03,21.97,21.92,21.87,21.81,21.81,21.99,21.98,21.95,21.95,21.94,21.93,21.92,21.91,21.89,21.88,21.86,21.85,21.83,21.81,21.79,21.76,21.67,21.57,21.47,21.38,21.29,21.19,21.17,21.33,21.49,21.64,21.8,21.96,22.12,22.24,
22.35,22.46,22.58,22.69,22.8,22.91,23.02,23.16,23.31,23.44,23.54,23.65,23.77,23.82,23.88,23.95,24.02,24.1,24.17,24.25,24.29,24.3,24.28,24.25,24.2,24.16,24.11,24.07,24.02,23.96,23.9,23.85,23.81,23.78,23.74,23.71,23.68,23.65,23.62,23.6,23.56,23.5,23.44,23.39,23.31,23.23,23.13,22.97,22.84,22.76,22.73,22.65,22.61,22.61,22.63,22.64,22.67,22.69,22.65,22.66,22.68,22.69,22.61,22.62,22.63,22.64,22.64,22.66,22.66,22.67,22.67,
22.67,22.66,22.67,22.64,22.61,22.63,22.66,22.67,22.67,22.63,22.54,22.39,22.39,22.39,22.39,22.38,22.37,22.26,22.21,22.19,22.08,22.05,22.03,22.03,22.02,22.01,22,21.97,21.95,21.9,21.85,21.8,21.77,21.74,21.7,21.65,21.52,21.5,21.48,21.47,21.44,21.43,21.41,21.41,21.39,21.42,21.43,21.44,21.43,21.46,21.53,21.67,21.8,21.91,22.05,22.18,22.3,22.41,22.51,22.6,22.69,22.75,22.85,22.91,23.01,23.13,23.25,23.36,23.44,23.44,23.44,
23.43,23.45,23.55,23.62,23.7,23.77,23.82,23.86,23.91,23.98,24.04,24.13,24.22,24.32,24.4,24.5,24.59,24.66,24.75,24.84,24.9,24.93,24.94,24.91,24.41,24.27,24.33,24.4,24.47,24.57,24.65,24.68,24.62,23.46,23.39,23.05,22.61,22.5,22.44,22.37,22.23,22.13,22.04,21.94,21.87,21.86,21.89,21.98,22.06,22.18,22.35,22.51,22.67,22.83,22.97,23.11,23.26,23.44,23.57,23.66,23.76,23.84,23.93,24.02,24.08,24.08,24.07,24.06,24.02,24,23.94,
23.75,23.5,23.4,22.99,22.29,22.17,22.12,22.08,22.03,21.99,21.95,21.92,21.88,21.84,21.8,21.82,21.84,21.86,21.87,21.89,21.91,21.92,21.93,21.94,21.97,22.08,22.18,22.27,22.31,22.38,22.44,22.49,22.5,22.5,22.51,22.51,22.61,22.71,22.81,22.91,23.01,23.1,23.2,23.21,23.24,23.27,23.3,23.31,23.33,23.34,23.35,23.35,23.36,23.35,23.35,23.36,23.38,23.4,23.43,23.46,23.47,23.38,23.29,23.2,23.1,23.04,23.04,23.03,23.02,23.01,22.99,
23.01,23.03,23.04,23.06,23.08,23.1,23.12,23.14,23.15,23.17,23.2,23.21,23.23,23.25,23.27,23.28,23.3,23.32,23.33,23.36,23.37];

 data2 = [ 
35.15,35.15,35.14,35.14,35.16,35.18,35.19,35.21,35.21,35.18,35.15,35.12,35.08,35.03,35.01,34.97,34.92,34.85,34.77,34.7,34.62,34.55,34.47,34.37,34.3,34.34,34.4,34.42,34.43,34.39,34.35,34.55,34.73,34.91,35.09,35.07,35.07,35.07,35.09,35.14,35.15,35.13,35.13,35.13,35.05,34.99,34.91,34.78,34.66,34.53,34.39,34.21,34.03,33.85,33.68,33.51,33.35,33.27,33.23,33.2,33.18,33.19,33.51,33.82,34.1,34.27,34.45,34.63,34.75,34.87,34.98,
35,35.04,35.11,35.18,35.25,35.33,35.41,35.47,35.53,35.59,35.61,35.61,35.67,35.73,35.79,35.76,35.73,35.72,35.7,35.7,35.7,35.7,35.68,35.68,35.66,35.65,35.66,35.66,35.65,35.65,35.67,35.69,35.7,35.7,35.65,35.59,35.49,35.43,35.36,35.29,35.23,35.17,35.1,34.99,34.9,34.84,34.86,34.88,34.91,34.93,34.92,34.92,34.94,34.95,34.97,34.99,35.09,35.34,35.61,35.86,35.9,35.92,35.96,35.98,35.9,35.8,35.73,35.67,35.6,35.54,35.49,
35.5,35.53,35.57,35.62,35.68,35.73,35.74,35.66,35.59,35.51,35.44,35.38,35.32,35.4,35.47,35.51,35.56,35.6,35.64,35.68,35.71,35.63,35.56,35.49,35.44,35.44,35.52,35.59,35.62,35.64,35.62,35.59,35.44,35.39,35.36,35.33,35.31,35.29,35.19,35.11,35.19,35.28,35.34,35.41,35.51,35.58,35.66,35.67,35.65,35.56,35.53,35.49,35.48,35.46,35.45,35.35,35.28,35.25,35.2,35.19,35.2,35.2,35.19,35.17,35.19,35.22,35.25,35.29,35.32,35.33,35.33,
35.34,35.34,35.33,35.28,35.21,35.2,35.16,35.14,35.15,35.1,34.98,34.78,34.77,34.72,34.68,34.63,34.5,34.51,34.63,34.52,34.45,34.35,34.31,34.29,34.27,34.25,34.25,34.21,34.19,34.22,34.29,34.4,34.47,34.52,34.54,34.56,34.47,34.55,34.61,34.67,34.72,34.73,34.75,34.79,34.85,34.9,34.94,34.98,34.99,35.03,35.08,35.11,35.15,35.14,35.15,35.15,35.17,35.18,35.19,35.25,35.25,35.24,35.21,35.19,35.17,35.19,35.22,35.26,35.31,35.31,35.35,
35.4,35.4,35.37,35.31,35.24,35.14,35.04,34.93,34.83,34.73,34.77,34.82,34.89,34.99,35.14,35.3,35.46,35.61,35.76,35.89,36.01,36.01,36.01,36.27,35.43,35.51,35.54,35.59,35.65,35.74,35.82,36.03,36.33,35.06,34.98,35.19,35.03,35.15,35.09,35.02,34.92,34.99,35.02,35.02,35.08,35.15,35.24,35.33,35.37,35.36,35.22,35.08,34.94,34.79,34.52,34.44,34.26,34.11,34.07,34.2,34.32,34.44,34.54,34.65,34.76,34.91,35.01,35.12,35.15,35.21,35.42,
35.63,35.51,35.77,35.66,34.92,34.8,34.78,34.75,34.72,34.67,34.68,34.68,34.68,34.69,34.72,34.76,34.78,34.79,34.76,34.73,34.72,34.72,34.7,34.68,34.65,34.59,34.55,34.56,34.7,34.79,34.77,34.78,34.87,35,35.12,35.26,35.26,35.24,35.22,35.17,35.12,35.08,35.05,35.04,35.03,35.04,35.05,35.09,35.13,35.17,35.2,35.27,35.35,35.38,35.43,35.47,35.43,35.35,35.22,35.07,34.95,35.13,35.29,35.47,35.67,35.78,35.73,35.65,35.59,35.57,35.57,
35.51,35.47,35.43,35.39,35.36,35.33,35.31,35.28,35.26,35.23,35.2,35.17,35.15,35.13,35.11,35.11,35.1,35.08,35.07,35.05,35.06];



 data3 = [ 
0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.2,0.7,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.1,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.1,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.4,
3.7,0.1,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.6,0.1,0.6,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.2,0.0,0.0,0.3,0.4,0.4,0.0,0.9,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.4,0.6,0.1,0.0,0.0,0.0,
0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.3,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.7,0.0,0.0,0.1,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.2,2.1,3.8,1.2,0.0,1.2,0.2,0.0,0.0,1.0,0.0,0.0,2.3,0.0,0.0,0.0,1.5,0.5,0.0,0.0,0.0,0.1,0.0,0.0,0.0,
0.0,0.4,0.0,0.6,2.8,0.0,0.0,0.0,0.0,0.2,1.8,8.4,0.0,0.0,0.0,0.0,0.1,5.5,0.0,0.0,13.4,1.7,0.7,0.0,0.0,0.0,0.0,2.4,1.5,0.8,1.4,1.4,0.0,0.0,0.0,0.3,3.8,0.0,0.0,0.0,0.5,0.0,0.3,0.0,1.6,0.6,0.0,0.0,6.3,0.0,0.0,0.0,0.0,0.3,0.9,0.1,0.0,0.0,0.0,0.3,0.2,2.9,0.4,3.2,1.2,0.3,0.0,0.0,0.0,1.1,0.2,
0.0,0.1,0.0,0.0,0.0,0.0,0.5,2.1,1.7,0.0,0.2,0.0,0.0,0.0,0.0,0.0,0.0,2.2,0.0,0.0,0.0,1.1,2.0,0.0,8.6,4.0,0.7,2.1,1.9,0.0,0.0,0.1,0.0,27.9,4.7,5.8,12.1,0.1,0.4,0.4,3.9,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.3,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.1,0.3,1.4,0.0,0.0,
3.1,5.1,3.8,8.4,16.5,4.6,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.1,0.0,0.2,0.0,0.0,0.3,0.1,0.0,0.0,0.0,0.1,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.2,0.0,0.0,0.2,1.3,0.0,0.0,0.0,0.0,0.1,0.9,0.0,0.1,0.8,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,
0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];

rdata = [ 
32,33,30,34,31,30,33,31,32,32,30,33,31,32,32,30,31,30,33,30,33,30,31,33,30,31,30,32,31,31,33,32,30,32,33,34,34,34,34,30,30,33,34,33,33,31,32,33,34,34,31,34,33,31,31,32,34,31,30,34,30,33,31,31,31,32,32,32,30,34,
32,32,30,33,32,30,32,33,31,34,33,33,30,34,32,30,34,30,31,30,30,34,30,31,33,31,33,31,31,31,31,34,30,32,33,32,32,33,31,31,31,32,31,32,31,34,32,32,32,32,31,33,32,31,31,32,30,33,34,30,31,30,34,32,34,32,33,34,33,34,
33,31,34,32,34,34,30,32,33,34,33,30,30,30,33,34,31,34,34,33,32,34,30,30,31,30,34,31,31,31,32,32,31,32,34,34,32,33,34,30,34,33,33,34,32,34,32,31,32,33,32,34,30,34,30,30,33,32,31,31,30,31,30,33,34,34,32,34,33,34,
34,31,33,30,30,32,31,33,30,34,33,31,34,33,31,34,34,31,31,33,34,33,30,31,32,31,31,32,34,31,34,31,33,32,32,30,34,31,32,31,32,31,30,30,32,34,34,30,30,30,32,34,32,30,31,31,31,34,31,34,33,30,30,33,34,31,30,30,34,33,
30,30,32,33,32,32,32,33,33,30,33,31,31,31,31,32,34,32,32,31,31,30,30,30,33,31,30,33,31,31,34,32,33,30,30,32,31,33,34,32,30,30,30,34,33,33,33,34,32,31,33,30,30,31,32,30,32,30,34,30,33,32,34,33,34,30,32,31,32,32,
33,31,31,34,34,32,30,31,30,33,34,31,30,31,33,31,31,34,32,31,30,31,30,33,34,34,30,32,30,32,30,34,33,31,32,32,30,33,33,33,31,34,33,34,33,31,34,33,33,32,32,32,32,31,32,33,31,32,32,31,34,34,31,32,31,33,33,31,32,32,
33,34,32,32,30,33,32,30,34,30,30,34,31,34,30,32,30,32,33,32,34,33,33,30,34,32,32];

rdata1 = [ 
28,28,26,26,28,28,29,27,27,26,28,27,29,26,26,28,27,29,29,26,27,26,27,29,28,29,26,26,26,27,29,27,29,26,27,26,26,29,28,29,27,27,29,28,28,29,28,27,29,26,26,29,26,27,28,26,26,29,29,28,27,26,28,26,29,28,27,28,26,26,
27,29,28,26,26,29,26,27,27,28,26,27,27,28,29,28,27,28,28,27,27,28,29,28,27,28,26,26,28,28,26,27,28,28,27,28,27,28,28,28,27,26,26,27,28,27,27,27,29,26,29,27,26,28,29,29,27,28,27,26,26,27,27,26,27,29,28,26,26,28,
26,27,26,28,27,27,28,28,27,26,28,29,27,27,29,27,29,27,26,29,26,29,29,28,26,28,26,26,27,26,28,27,27,27,26,27,29,29,26,26,27,27,27,26,26,27,28,26,28,27,28,28,29,26,26,28,28,26,28,27,27,28,29,29,27,26,27,27,28,27,
28,26,29,29,27,29,26,29,27,27,28,28,26,26,26,28,29,27,29,27,26,27,27,29,29,26,27,27,28,26,26,28,26,29,29,28,27,27,26,28,28,27,28,27,26,28,26,26,28,28,27,27,28,29,26,27,28,26,26,28,26,26,27,29,26,26,27,26,29,29,
29,29,27,27,29,29,28,29,28,28,29,28,29,27,28,28,26,29,29,29,29,28,27,28,29,28,27,26,26,27,29,28,26,27,26,28,26,29,27,28,26,29,26,26,26,27,29,29,27,29,27,27,28,29,28,26,26,27,29,26,28,29,27,29,27,27,29,28,28,26,
27,28,29,28,29,27,29,26,27,27,26,26,28,28,28,27,27,27,27,26,27,29,28,26,26,29,28,27,28,26,26,27,28,26,29,26,29,29,26,29,28,29,26,26,27,28,29,29,28,28,27,27,29,29,29,26,27,29,28,26,29,29,26,29,29,29,27,28,29,28,
29,26,28,27,28,26,29,27,27,27,29,28,28,26,28,29,27,26,28,26,29,29,28,26,29,28,29];

 dates = [ 
"2015/3/24 0:00","2015/3/23 0:00","2015/3/22 0:00","2015/3/21 0:00","2015/3/20 0:00","2015/3/19 0:00","2015/3/18 0:00","2015/3/17 0:00","2015/3/16 0:00","2015/3/15 0:00","2015/3/14 0:00","2015/3/13 0:00","2015/3/12 0:00","2015/3/11 0:00","2015/3/10 0:00","2015/3/9 0:00","2015/3/8 0:00","2015/3/7 0:00","2015/3/6 0:00","2015/3/5 0:00","2015/3/4 0:00","2015/3/3 0:00","2015/3/2 0:00","2015/3/1 0:00","2015/2/28 0:00","2015/2/27 0:00","2015/2/26 0:00","2015/2/25 0:00","2015/2/24 0:00","2015/2/23 0:00","2015/2/22 0:00","2015/2/21 0:00","2015/2/20 0:00","2015/2/19 0:00","2015/2/18 0:00","2015/2/17 0:00","2015/2/16 0:00","2015/2/15 0:00","2015/2/14 0:00","2015/2/13 0:00","2015/2/12 0:00","2015/2/11 0:00","2015/2/10 0:00","2015/2/9 0:00","2015/2/8 0:00","2015/2/7 0:00","2015/2/6 0:00","2015/2/5 0:00","2015/2/4 0:00","2015/2/3 0:00","2015/2/2 0:00","2015/2/1 0:00","2015/1/31 0:00","2015/1/30 0:00","2015/1/29 0:00","2015/1/28 0:00","2015/1/27 0:00","2015/1/26 0:00","2015/1/25 0:00","2015/1/24 0:00","2015/1/23 0:00","2015/1/22 0:00","2015/1/21 0:00","2015/1/20 0:00","2015/1/19 0:00","2015/1/18 0:00","2015/1/17 0:00","2015/1/16 0:00","2015/1/15 0:00","2015/1/14 0:00","2015/1/13 0:00",
"2015/1/12 0:00","2015/1/11 0:00","2015/1/10 0:00","2015/1/9 0:00","2015/1/8 0:00","2015/1/7 0:00","2015/1/6 0:00","2015/1/5 0:00","2015/1/4 0:00","2015/1/3 0:00","2015/1/2 0:00","2015/1/1 0:00","2014/12/31 0:00","2014/12/30 0:00","2014/12/29 0:00","2014/12/28 0:00","2014/12/27 0:00","2014/12/26 0:00","2014/12/25 0:00","2014/12/24 0:00","2014/12/23 0:00","2014/12/22 0:00","2014/12/21 0:00","2014/12/20 0:00","2014/12/19 0:00","2014/12/18 0:00","2014/12/17 0:00","2014/12/16 0:00","2014/12/15 0:00","2014/12/14 0:00","2014/12/13 0:00","2014/12/12 0:00","2014/12/11 0:00","2014/12/10 0:00","2014/12/9 0:00","2014/12/8 0:00","2014/12/7 0:00","2014/12/6 0:00","2014/12/5 0:00","2014/12/4 0:00","2014/12/3 0:00","2014/12/2 0:00","2014/12/1 0:00","2014/11/30 0:00","2014/11/29 0:00","2014/11/28 0:00","2014/11/27 0:00","2014/11/26 0:00","2014/11/25 0:00","2014/11/24 0:00","2014/11/23 0:00","2014/11/22 0:00","2014/11/21 0:00","2014/11/20 0:00","2014/11/19 0:00","2014/11/18 0:00","2014/11/17 0:00","2014/11/16 0:00","2014/11/15 0:00","2014/11/14 0:00","2014/11/13 0:00","2014/11/12 0:00","2014/11/11 0:00","2014/11/10 0:00","2014/11/9 0:00","2014/11/8 0:00","2014/11/7 0:00","2014/11/6 0:00","2014/11/5 0:00","2014/11/4 0:00","2014/11/3 0:00",
"2014/11/2 0:00","2014/11/1 0:00","2014/10/31 0:00","2014/10/30 0:00","2014/10/29 0:00","2014/10/28 0:00","2014/10/27 0:00","2014/10/26 0:00","2014/10/25 0:00","2014/10/24 0:00","2014/10/23 0:00","2014/10/22 0:00","2014/10/21 0:00","2014/10/20 0:00","2014/10/19 0:00","2014/10/18 0:00","2014/10/17 0:00","2014/10/16 0:00","2014/10/15 0:00","2014/10/14 0:00","2014/10/13 0:00","2014/10/12 0:00","2014/10/11 0:00","2014/10/10 0:00","2014/10/9 0:00","2014/10/8 0:00","2014/10/7 0:00","2014/10/6 0:00","2014/10/5 0:00","2014/10/4 0:00","2014/10/3 0:00","2014/10/2 0:00","2014/10/1 0:00","2014/9/30 0:00","2014/9/29 0:00","2014/9/28 0:00","2014/9/27 0:00","2014/9/26 0:00","2014/9/25 0:00","2014/9/24 0:00","2014/9/23 0:00","2014/9/22 0:00","2014/9/21 0:00","2014/9/20 0:00","2014/9/19 0:00","2014/9/18 0:00","2014/9/17 0:00","2014/9/16 0:00","2014/9/15 0:00","2014/9/14 0:00","2014/9/13 0:00","2014/9/12 0:00","2014/9/11 0:00","2014/9/10 0:00","2014/9/9 0:00","2014/9/8 0:00","2014/9/7 0:00","2014/9/6 0:00","2014/9/5 0:00","2014/9/4 0:00","2014/9/3 0:00","2014/9/2 0:00","2014/9/1 0:00","2014/8/31 0:00","2014/8/30 0:00","2014/8/29 0:00","2014/8/28 0:00","2014/8/27 0:00","2014/8/26 0:00","2014/8/25 0:00","2014/8/24 0:00",
"2014/8/23 0:00","2014/8/22 0:00","2014/8/21 0:00","2014/8/20 0:00","2014/8/19 0:00","2014/8/18 0:00","2014/8/17 0:00","2014/8/16 0:00","2014/8/15 0:00","2014/8/14 0:00","2014/8/13 0:00","2014/8/12 0:00","2014/8/11 0:00","2014/8/10 0:00","2014/8/9 0:00","2014/8/8 0:00","2014/8/7 0:00","2014/8/6 0:00","2014/8/5 0:00","2014/8/4 0:00","2014/8/3 0:00","2014/8/2 0:00","2014/8/1 0:00","2014/7/31 0:00","2014/7/30 0:00","2014/7/29 0:00","2014/7/28 0:00","2014/7/27 0:00","2014/7/26 0:00","2014/7/25 0:00","2014/7/24 0:00","2014/7/23 0:00","2014/7/22 0:00","2014/7/21 0:00","2014/7/20 0:00","2014/7/19 0:00","2014/7/18 0:00","2014/7/17 0:00","2014/7/16 0:00","2014/7/15 0:00","2014/7/14 0:00","2014/7/13 0:00","2014/7/12 0:00","2014/7/11 0:00","2014/7/10 0:00","2014/7/9 0:00","2014/7/8 0:00","2014/7/7 0:00","2014/7/6 0:00","2014/7/5 0:00","2014/7/4 0:00","2014/7/3 0:00","2014/7/2 0:00","2014/7/1 0:00","2014/6/30 0:00","2014/6/29 0:00","2014/6/28 0:00","2014/6/27 0:00","2014/6/26 0:00","2014/6/25 0:00","2014/6/24 0:00","2014/6/23 0:00","2014/6/22 0:00","2014/6/21 0:00","2014/6/20 0:00","2014/6/19 0:00","2014/6/18 0:00","2014/6/17 0:00","2014/6/16 0:00","2014/6/15 0:00","2014/6/14 0:00",
"2014/6/13 0:00","2014/6/12 0:00","2014/6/11 0:00","2014/6/10 0:00","2014/6/9 0:00","2014/6/8 0:00","2014/6/7 0:00","2014/6/6 0:00","2014/6/5 0:00","2014/6/4 0:00","2014/6/3 0:00","2014/6/2 0:00","2014/6/1 0:00","2014/5/31 0:00","2014/5/30 0:00","2014/5/29 0:00","2014/5/28 0:00","2014/5/27 0:00","2014/5/26 0:00","2014/5/25 0:00","2014/5/24 0:00","2014/5/23 0:00","2014/5/22 0:00","2014/5/21 0:00","2014/5/20 0:00","2014/5/19 0:00","2014/5/18 0:00","2014/5/17 0:00","2014/5/16 0:00","2014/5/15 0:00","2014/5/14 0:00","2014/5/13 0:00","2014/5/12 0:00","2014/5/11 0:00","2014/5/10 0:00","2014/5/9 0:00","2014/5/8 0:00","2014/5/7 0:00","2014/5/6 0:00","2014/5/5 0:00","2014/5/4 0:00","2014/5/3 0:00","2014/5/2 0:00","2014/5/1 0:00","2014/4/30 0:00","2014/4/29 0:00","2014/4/28 0:00","2014/4/27 0:00","2014/4/26 0:00","2014/4/25 0:00","2014/4/24 0:00","2014/4/23 0:00","2014/4/22 0:00","2014/4/21 0:00","2014/4/20 0:00","2014/4/19 0:00","2014/4/18 0:00","2014/4/17 0:00","2014/4/16 0:00","2014/4/15 0:00","2014/4/14 0:00","2014/4/13 0:00","2014/4/12 0:00","2014/4/11 0:00","2014/4/10 0:00","2014/4/9 0:00","2014/4/8 0:00","2014/4/7 0:00","2014/4/6 0:00","2014/4/5 0:00","2014/4/4 0:00",
"2014/4/3 0:00","2014/4/2 0:00","2014/4/1 0:00","2014/3/31 0:00","2014/3/30 0:00","2014/3/29 0:00","2014/3/28 0:00","2014/3/27 0:00","2014/3/26 0:00","2014/3/25 0:00","2014/3/24 0:00","2014/3/23 0:00","2014/3/22 0:00","2014/3/21 0:00","2014/3/20 0:00","2014/3/19 0:00","2014/3/18 0:00","2014/3/17 0:00","2014/3/16 0:00","2014/3/15 0:00","2014/3/14 0:00","2014/3/13 0:00","2014/3/12 0:00","2014/3/11 0:00","2014/3/10 0:00","2014/3/9 0:00","2014/3/8 0:00","2014/3/7 0:00","2014/3/6 0:00","2014/3/5 0:00","2014/3/4 0:00","2014/3/3 0:00","2014/3/2 0:00","2014/3/1 0:00","2014/2/28 0:00","2014/2/27 0:00","2014/2/26 0:00","2014/2/25 0:00","2014/2/24 0:00","2014/2/23 0:00","2014/2/22 0:00","2014/2/21 0:00","2014/2/20 0:00","2014/2/19 0:00","2014/2/18 0:00","2014/2/17 0:00","2014/2/16 0:00","2014/2/15 0:00","2014/2/14 0:00","2014/2/13 0:00","2014/2/12 0:00","2014/2/11 0:00","2014/2/10 0:00","2014/2/9 0:00","2014/2/8 0:00","2014/2/7 0:00","2014/2/6 0:00","2014/2/5 0:00","2014/2/4 0:00","2014/2/3 0:00","2014/2/2 0:00","2014/2/1 0:00","2014/1/31 0:00","2014/1/30 0:00","2014/1/29 0:00","2014/1/28 0:00","2014/1/27 0:00","2014/1/26 0:00","2014/1/25 0:00","2014/1/24 0:00","2014/1/23 0:00",
"2014/1/22 0:00","2014/1/21 0:00","2014/1/20 0:00","2014/1/19 0:00","2014/1/18 0:00","2014/1/17 0:00","2014/1/16 0:00","2014/1/15 0:00","2014/1/14 0:00","2014/1/13 0:00","2014/1/12 0:00","2014/1/11 0:00","2014/1/10 0:00","2014/1/9 0:00","2014/1/8 0:00","2014/1/7 0:00","2014/1/6 0:00","2014/1/5 0:00","2014/1/4 0:00","2014/1/3 0:00","2014/1/2 0:00"];
 */
		
		
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
	
		dtime = dates[idx-1];
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
			dom.byId("date").innerHTML =  dates[v.x-1]; 
			//dom.byId("data1").innerHTML = data1[v.x-1]; 
			//dom.byId("data2").innerHTML = data2[v.x-1];
			dom.byId("data3").innerHTML = rdata[v.x-1];
			dom.byId("data4").innerHTML = rdata1[v.x-1];
            dom.byId("data5").innerHTML = data3[v.x-1];
			//return v.y<22?"green":"red";//参数超过阈值，显示红色
		}else{
			return "#ff9000";
		}
	};
	//labelFillFunc:在鼠标或手指在屏幕滑动时，在指示线上实时显示水位的范围
	var labelFillFunc = function(v){  	
       // str1 = "水位范围:  "+data1[v.x-1] + " - " +data2[v.x-1];  
       // return str1;                     
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
						series: "2014", dualIndicator: true, font: "normal normal bold 12pt Helvetica",
						lineOutline: null, outline: null, markerOutline: null,
						fillFunc: indicatorFillFunc,labelFunc : labelFillFunc
					}):new Indicator(chart, "default", {
							series: "2014", font: "normal normal bold 12pt Helvetica",
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
		markers: {
			circle: "m-4,0 c0,-4 6,-4 6,0, m-6,0 c0,4 6,4 6,0"
			//square: "m-4,-4 8,0 0,8 -8,0z",

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
