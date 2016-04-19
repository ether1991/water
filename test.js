var customClaroTheme, timeLabelFunction;
var data1;
var data2;
var data3;
var rdata;
var rdata1;
var dates;
require(["dojox/data/CsvStore"],
	function(ready, has, on, dom, domStyle, fx,easing, topic, mobile, compat, View, RoundRect, Button, parser,
			 Chart, Theme, Default, Columns, StackedAreas,Areas,Lines, Grid, CsvStore, registry, ZoomAndPan, Indicator,Legend,SelectableLegend){
	
	var dataStore = new CsvStore({url: "data/thin.csv"});  //csv数据文件
	
	var processData = function(items, arg){
		//items.reverse(); //将csv存储数据倒序排列
		//currentData = [];
		data1 = [];
		data2 = [];
		data3 = [];
		rdata = [];
		rdata1 = [];
		dates = [];
		
		
		var item;
		for(var i = 0; i < items.length; i++){
			// Reduce data size
				item = {};
				
				//var value = dataStore.getValue(items[i], "data1");
				//item.data1 = parseFloat(value);

				//value = dataStore.getValue(items[i], "data2");
				//item.data2 = parseFloat(value);
				
				value = dataStore.getValue(items[i], "lon");
				item.data3 = parseFloat(value);
				//解决曲线连接到0的问题
				document.getElementById('lat').innerHTML = 'ss';
				value = dataStore.getValue(items[i], "lat");
				item.rdata = parseFloat(value);
				
				var lat = document.getElementById('lat');
				lat.value=parseFloat(value);

				value = dataStore.getValue(items[i], "thin");
				item.rdata1 = parseFloat(value);
			
				data1.push(item.data1);
				data2.push(item.data2);
				data3.push(item.data3);
				rdata.push(item.rdata);
				rdata1.push(item.rdata1);
				dates.push(item.dates);

		}
});
