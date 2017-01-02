	function showAllTheData() {

		var db = getCurrentDb(); //获取当前数据库
		/*展示输入表数据*/
		db.transaction(function(trans) {
			trans.executeSql("select * from InputTable ", [], function(ts, data) {
				var dataLength = data.rows.length;
				var inputSum = 0;
				/*清空输入表*/
				document.querySelector("#inputList").innerHTML = "";
				for(var i = 0; i < dataLength; i++) {
					inputSum = inputSum + parseInt(data.rows[i].InputValue);
					var newtr = document.createElement("tr");
					var td1 = document.createElement("td");
					td1.setAttribute("onclick", "updateInputList(this);")
					td1.innerHTML = data.rows[i].InputName;
					var td2 = document.createElement("td");
					td2.setAttribute("onclick", "updateInputList(this);")
					td2.innerHTML = data.rows[i].InputValue;
					var td3 = document.createElement("td");
					td3.setAttribute("onclick", "updateInputList(this);")
					td3.innerHTML = data.rows[i].InputTag;
					var td4 = document.createElement("td");
					td4.innerHTML = "<span onclick='deleteInputList(this)'>x</span>";
					newtr.appendChild(td1);
					newtr.appendChild(td2);
					newtr.appendChild(td3);
					newtr.appendChild(td4);
					document.querySelector("#inputList").appendChild(newtr);
				}
				document.querySelector("#inputSum").innerHTML = inputSum;
				/*展示输出表数据*/
				db.transaction(function(trans) {
					trans.executeSql("select * from OutputTable ", [], function(ts, data) {
						var dataLength = data.rows.length;
						var outputSum = 0;
						/*清空输出表*/
						document.querySelector("#outputList").innerHTML = "";
						for(var i = 0; i < dataLength; i++) {
							outputSum = outputSum + parseInt(data.rows[i].OutputValue);
							var newtr = document.createElement("tr");
							var td1 = document.createElement("td");
							td1.setAttribute("onclick", "updateOutputList(this);")
							td1.innerHTML = data.rows[i].OutputName;
							var td2 = document.createElement("td");
							td2.setAttribute("onclick", "updateOutputList(this);")
							td2.innerHTML = data.rows[i].OutputValue;
							var td3 = document.createElement("td");
							td3.setAttribute("onclick", "updateOutputList(this);")
							td3.innerHTML = data.rows[i].OutputTag;
							var td4 = document.createElement("td");
							td4.innerHTML = "<span onclick='deleteOutputList(this)'>x</span>";
							newtr.appendChild(td1);
							newtr.appendChild(td2);
							newtr.appendChild(td3);
							newtr.appendChild(td4);
							document.querySelector("#outputList").appendChild(newtr);
						}
						document.querySelector("#outputSum").innerHTML = outputSum;
						/*计算现金流*/
						document.querySelector(".blackBoard>.cashflowFont").innerHTML = "￥"+(parseInt(document.querySelector("#inputSum").innerHTML) - parseInt(document.querySelector("#outputSum").innerHTML));
					}, function(ts, message) {
						initOutputTable();
					});
				});
			}, function(ts, message) {
				initInputTable();
			});
		});
		/*展示资产表格数据*/
		db.transaction(function(trans) {
			trans.executeSql("select * from AssetTable ", [], function(ts, data) {
				var dataLength = data.rows.length;
				var assetSum = 0;
				var cashSum = 0;
				/*清空输入表*/
				document.querySelector("#assetList").innerHTML = "";
				for(var i = 0; i < dataLength; i++) {
					if(data.rows[i].AssetTag == "存款"){
						cashSum = cashSum + parseInt(data.rows[i].AssetValue);
					}
					assetSum = assetSum + parseInt(data.rows[i].AssetValue)
					var newtr = document.createElement("tr");
					var td1 = document.createElement("td");
					td1.setAttribute("onclick", "updateAssetList(this);")
					td1.innerHTML = data.rows[i].AssetName;
					var td2 = document.createElement("td");
					td2.setAttribute("onclick", "updateAssetList(this);")
					td2.innerHTML = data.rows[i].AssetValue;
					var td3 = document.createElement("td");
					td3.setAttribute("onclick", "updateAssetList(this);")
					td3.innerHTML = data.rows[i].AssetTag;
					var td4 = document.createElement("td");
					td4.innerHTML = "<span onclick='deleteAssetList(this)'>x</span>";
					newtr.appendChild(td1);
					newtr.appendChild(td2);
					newtr.appendChild(td3);
					newtr.appendChild(td4);
					document.querySelector("#assetList").appendChild(newtr);
				}
				document.querySelector("#assetSum").innerHTML = assetSum;
				document.querySelector(".moneyCanUse>.spanNumberMoney").innerHTML = cashSum;
				/*展示负债表数据*/
				db.transaction(function(trans) {
					trans.executeSql("select * from DebtTable ", [], function(ts, data) {
						var dataLength = data.rows.length;
						var debtSum = 0;
						/*清空输入表*/
						document.querySelector("#debtList").innerHTML = "";
						for(var i = 0; i < dataLength; i++) {
							debtSum = debtSum + parseInt(data.rows[i].DebtValue);
							var newtr = document.createElement("tr");
							var td1 = document.createElement("td");
							td1.setAttribute("onclick", "updateDebtList(this);")
							td1.innerHTML = data.rows[i].DebtName;
							var td2 = document.createElement("td");
							td2.setAttribute("onclick", "updateDebtList(this);")
							td2.innerHTML = data.rows[i].DebtValue;
							var td3 = document.createElement("td");
							td3.setAttribute("onclick", "updateDebtList(this);")
							td3.innerHTML = data.rows[i].DebtTag;
							var td4 = document.createElement("td");
							td4.innerHTML = "<span onclick='deleteDebtList(this)'>x</span>";
							newtr.appendChild(td1);
							newtr.appendChild(td2);
							newtr.appendChild(td3);
							newtr.appendChild(td4);
							document.querySelector("#debtList").appendChild(newtr);
						}
						document.querySelector("#debtSum").innerHTML = debtSum;
						/*显示净资产*/
						document.querySelector(".pureAsset>.spanNumberPureAsset").innerHTML = parseInt(document.querySelector("#assetSum").innerHTML)-parseInt(document.querySelector("#debtSum").innerHTML);
					}, function(ts, message) {
						initDebtTable();
					});
				});
			}, function(ts, message) {
				initAssetTable();
			});
		});
		
	}
	
	function getCurrentDb() {
	        //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
	        //如果数据库不存在那么创建之
	        var db = openDatabase("richdad", "1.0", "现金流个人管理软件", 1024 * 1024);
	        return db;
	}
	/*初始化收入表*/
	function initInputTable(){
            var db = getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists InputTable(InputName text null,InputValue text null,InputTag text null,CurrentTime text null)", [], function (trans, result) {
                }, function (trans, message) {
            }, function (trans, result) {
            }, function (trans, message) {
            });
        });
    }
	/*初始化支出表*/
	function initOutputTable() {
            var db = getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists OutputTable(OutputName text null,OutputValue text null,OutputTag text null,CurrentTime text null)", [], function (trans, result) {
                }, function (trans, message) {
            }, function (trans, result) {
            }, function (trans, message) {
            });
        });
    }
	/*初始化资产表*/
	function initAssetTable() {
            var db = getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists AssetTable(AssetName text null,AssetValue text null,AssetTag text null,CurrentTime text null)", [], function (trans, result) {
                }, function (trans, message) {
            }, function (trans, result) {
            }, function (trans, message) {
            });
        });
    }
	/*初始化负债表*/
	function initDebtTable() {
            var db = getCurrentDb();//初始化数据库
            if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
            db.transaction(function (trans) {//启动一个事务，并设置回调函数
                //执行创建表的Sql脚本
                trans.executeSql("create table if not exists DebtTable(DebtName text null,DebtValue text null,DebtTag text null,CurrentTime text null)", [], function (trans, result) {
                }, function (trans, message) {
            }, function (trans, result) {
            }, function (trans, message) {
            });
        });
    }
	/*删除输入表*/
	function deleteInputList(e){
		var $current = $(e);
		$current.parent().parent().remove();
		/*获取这行的内容*/
		var toDeleteDate = $($current.parent().parent().find("td").get(0)).text();
		/*数据库删除*/
		deleteInputListData(toDeleteDate);
	}
	/*删除输出表*/
	function deleteOutputList(e){
		var $current = $(e);
		$current.parent().parent().remove();
		/*获取这行的内容*/
		var toDeleteDate = $($current.parent().parent().find("td").get(0)).text();
		/*数据库删除*/
		deleteOutputListData(toDeleteDate);
	}
	/*删除资产表*/
	function deleteAssetList(e){
		var $current = $(e);
		$current.parent().parent().remove();
		/*获取这行的内容*/
		var toDeleteDate = $($current.parent().parent().find("td").get(0)).text();
		/*数据库删除*/
		deleteAssetListData(toDeleteDate);
	}
	/*删除负债表*/
	function deleteDebtList(e){
		var $current = $(e);
		$current.parent().parent().remove();
		/*获取这行的内容*/
		var toDeleteDate = $($current.parent().parent().find("td").get(0)).text();
		/*数据库删除*/
		deleteDebtListData(toDeleteDate);
	}
	/*数据库删除输入*/
	function deleteInputListData(deletename){
		 var db = getCurrentDb();
		db.transaction(function(trans) {
			initInputTable();
			trans.executeSql("DELETE  from InputTable where InputName = ?", [deletename], function(ts, data) {
				showAllTheData();
			}, function(ts, message) {
				alert(message);
			});
		});
	}
	/*数据库删除输出表*/
	function deleteOutputListData(deletename){
		 var db = getCurrentDb();
		db.transaction(function(trans) {
			initOutputTable();
			trans.executeSql("DELETE  from OutputTable where OutputName = ?", [deletename], function(ts, data) {
				showAllTheData();
			}, function(ts, message) {
				alert(message);
			});
		});
	}
	/*数据库删除资产表*/
	function deleteAssetListData(deletename){
		 var db = getCurrentDb();
		db.transaction(function(trans) {
			initAssetTable();
			trans.executeSql("DELETE  from AssetTable where AssetName = ?", [deletename], function(ts, data) {
				showAllTheData();
			}, function(ts, message) {
				alert(message);
			});
		});
	}
	/*数据库删除负债表*/
	function deleteDebtListData(deletename){
		 var db = getCurrentDb();
		db.transaction(function(trans) {
			initDebtTable();
			trans.executeSql("DELETE  from DebtTable where DebtName = ?", [deletename], function(ts, data) {
			}, function(ts, message) {
				alert(message);
			});
		});
	}
	/*更新输入表*/
	function updateInputList(e){
		var $current = $(e);
		/*获取这行的内容*/
		var toUpdateDate1 = $($current.parent().find("td").get(0)).text();
		var toUpdateDate2 = $($current.parent().find("td").get(1)).text();
		document.querySelector(".inputUpdateBox").style.display = "block";
		document.querySelector(".inputUpdateBox>label").innerHTML = toUpdateDate1;
		document.querySelector(".inputUpdateBox>input").value = toUpdateDate2;
		/*数据库删除*/
		/*updateDebtListData(toUpdateDate);*/
	}
	/*更新输出表*/
	function updateOutputList(e){
		var $current = $(e);
		/*获取这行的内容*/
		var toUpdateDate1 = $($current.parent().find("td").get(0)).text();
		var toUpdateDate2 = $($current.parent().find("td").get(1)).text();
		document.querySelector(".outputUpdateBox").style.display = "block";
		document.querySelector(".outputUpdateBox>label").innerHTML = toUpdateDate1;
		document.querySelector(".outputUpdateBox>input").value = toUpdateDate2;
		/*数据库删除*/
		/*updateDebtListData(toUpdateDate);*/
	}
	/*更新资产表*/
	function updateAssetList(e){
		var $current = $(e);
		/*获取这行的内容*/
		var toUpdateDate1 = $($current.parent().find("td").get(0)).text();
		var toUpdateDate2 = $($current.parent().find("td").get(1)).text();
		document.querySelector(".assetUpdateBox").style.display = "block";
		document.querySelector(".assetUpdateBox>label").innerHTML = toUpdateDate1;
		document.querySelector(".assetUpdateBox>input").value = toUpdateDate2;
		/*数据库删除*/
		/*updateDebtListData(toUpdateDate);*/
	}
	/*更新负债表*/
	function updateDebtList(e){
		var $current = $(e);
		/*获取这行的内容*/
		var toUpdateDate1 = $($current.parent().find("td").get(0)).text();
		var toUpdateDate2 = $($current.parent().find("td").get(1)).text();
		document.querySelector(".debtUpdateBox").style.display = "block";
		document.querySelector(".debtUpdateBox>label").innerHTML = toUpdateDate1;
		document.querySelector(".debtUpdateBox>input").value = toUpdateDate2;
		/*数据库删除*/
		/*updateDebtListData(toUpdateDate);*/
	}
	/*取消输入,输出，资产，负债框*/
	function cancelInputUpdateBox(){ document.querySelector(".inputUpdateBox").style.display = "none"; }
	function cancelOutputUpdateBox(){ document.querySelector(".outputUpdateBox").style.display = "none"; }
	function cancelAssetUpdateBox(){ document.querySelector(".assetUpdateBox").style.display = "none"; }
	function cancelDebtUpdateBox(){ document.querySelector(".debtUpdateBox").style.display = "none"; }
	/*数据库确认输入更新*/
	function sureInputUpdateBox(){
		var updateName = document.querySelector(".inputUpdateBox>label").innerHTML;
		var updateNumber = document.querySelector(".inputUpdateBox>input").value;
		var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql(" update InputTable set InputValue = ? where InputName = ?", [updateNumber,updateName], function (ts, data) {
	            	document.querySelector(".inputUpdateBox").style.display = "none";
	            	showAllTheData();
	            }, function (ts, message) {
	            });
         });
	}
	/*数据库确认输出更新*/
	function sureOutputUpdateBox(){
		var updateName = document.querySelector(".outputUpdateBox>label").innerHTML;
		var updateNumber = document.querySelector(".outputUpdateBox>input").value;
		var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql(" update OutputTable set OutputValue = ? where OutputName = ?", [updateNumber,updateName], function (ts, data) {
	            	document.querySelector(".outputUpdateBox").style.display = "none";
	            	showAllTheData();
	            }, function (ts, message) {
	            });
         });
	}
	/*数据库确认资产更新*/
	function sureAssetUpdateBox(){
		var updateName = document.querySelector(".assetUpdateBox>label").innerHTML;
		var updateNumber = document.querySelector(".assetUpdateBox>input").value;
		var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql(" update AssetTable set AssetValue = ? where AssetName = ?", [updateNumber,updateName], function (ts, data) {
	            	document.querySelector(".assetUpdateBox").style.display = "none";
	            	showAllTheData();
	            }, function (ts, message) {
	            });
         });
	}
	/*数据库确认负债更新*/
	function sureDebtUpdateBox(){
		var updateName = document.querySelector(".debtUpdateBox>label").innerHTML;
		var updateNumber = document.querySelector(".debtUpdateBox>input").value;
		var db = getCurrentDb();
		db.transaction(function (trans) {
	            trans.executeSql(" update DebtTable set DebtValue = ? where DebtName = ?", [updateNumber,updateName], function (ts, data) {
	            	document.querySelector(".debtUpdateBox").style.display = "none";
	            	showAllTheData();
	            }, function (ts, message) {
	            });
         });
	}
