
require([
	
	"dojox/data/CsvStore"],
	function(CsvStore){
	
	var dataStore = new CsvStore({url: "data/day.csv"});  //csv数据文件
	
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
				
				value = dataStore.getValue(items[i], "yuce");
				item.data3 = parseFloat(value);
				//解决曲线连接到0的问题
				if(i<=2){
					value=null;
					item.rdata = parseFloat(value);
					alert("hahahah");
				}else{
					value = dataStore.getValue(items[i], "shiji");
					item.rdata = parseFloat(value);
				}
				
					value = dataStore.getValue(items[i], "lishi");
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
		
		chart1.addSeries("预测",data3,{plot:"volumePlot",stroke:{color:"#f7a357"}});//图中最下边的线，对应data3
		//chart1.addSeries("历史",rdata1,{plot:"volumePlot",stroke: {color: "red"}});
		chart1.addSeries("实际",rdata, {plot:"volumePlot",stroke: {color: "blue"}});//图中最上边的线，对应rdata
		
		
	
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
});
