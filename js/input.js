angular.module('dashboard',[])
.controller('dashboardContrl',function($scope){
	
	/*
	 * * * * *                               * * * * * * * * * * * * * 
	 * * * * *          *  *   *  *          * * * * * * * * * * * * * 
	 * * * * *           *       *           * * * * * * * ** * * * * 
	 * * * * *             * * *             * * * * * * * * ** * * * 
	 * 
	 * 初始化数据库  initdatabase*/ 
	function getCurrentDb() {
        //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
        //如果数据库不存在那么创建之
        var db = openDatabase("richdad", "1.0", "现金流个人管理软件", 1024 * 1024);
        return db;
    }
	/*初始化收入表*/
	function initInputTable() {
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
	function initAssetTable(){
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
	
	/*插入收入表*/
	$scope.submitInput = function(){
		$scope.inputBoxTag = false;
		var nodeName = $scope.inputName;
		var nodeValue = $scope.inputValue;
		var tag = $scope.inputChooseNameTag;
		var db = getCurrentDb();
		initInputTable();
		db.transaction(function(trans) {
			trans.executeSql("select * from InputTable where InputName = ?", [nodeName], function(ts, data) {
				if(data.rows.length != 0) {
					alert("项目已存在");
				} else {
					initInputTable();
					/*添加数据进去*/
					/*初始化数据库输出表*/
					$scope.InputBoxTag = false;
					initInputTable();
					var db = getCurrentDb();
					db.transaction(function(trans) {
						trans.executeSql("insert into InputTable(InputName,InputValue,InputTag) values(?,?,?) ", [nodeName, nodeValue, tag], function(ts, data) {
							/*隐藏输入框*/
							showAllTheData();
						}, function(ts, message) {
							alert(message);
						});
					});
				}

			}, function(ts, message) {
				alert(message);
			});
		});
	}
	/*插入输出表*/
	$scope.submitOutput = function() {
		$scope.outputBoxTag = false;
		var nodeName = $scope.outputName;
		var nodeValue = $scope.outputValue;
		var tag = $scope.outputChooseNameTag;
		var db = getCurrentDb();
		initOutputTable();
		db.transaction(function(trans) {
			trans.executeSql("select * from OutputTable where OutputName = ?", [nodeName], function(ts, data) {
				if(data.rows.length != 0) {
					alert("项目已存在");
				} else {
					initOutputTable();
					/*添加数据进去*/
					/*初始化数据库输出表*/
					$scope.outputBoxTag = false;
					initOutputTable();
					var db = getCurrentDb();
					db.transaction(function(trans) {
						trans.executeSql("insert into OutputTable(OutputName,OutputValue,OutputTag) values(?,?,?) ", [nodeName, nodeValue, tag], function(ts, data) {
							/*隐藏输入框*/
							showAllTheData();
						}, function(ts, message) {
							alert(message);
						});
					});
				}

			}, function(ts, message) {
				alert(message);
			});
		});
	}
	/*插入资产表*/
	$scope.submitAsset = function(){
		$scope.assetBoxTag = false;
		var nodeName = $scope.assetName;
		var nodeValue = $scope.assetValue;
		var tag = $scope.assetChooseNameTag;
		var db = getCurrentDb();
		initAssetTable();
		db.transaction(function(trans) {
			trans.executeSql("select * from AssetTable where AssetName = ?", [nodeName], function(ts, data) {
				if(data.rows.length != 0) {
					alert("项目已存在");
				} else {
					initAssetTable();
					/*添加数据进去*/
					/*初始化数据库输出表*/
					$scope.assetBoxTag = false;
					initAssetTable();
					var db = getCurrentDb();
					db.transaction(function(trans) {
						trans.executeSql("insert into AssetTable(AssetName,AssetValue,AssetTag) values(?,?,?) ", [nodeName, nodeValue, tag], function(ts, data) {
							/*隐藏输入框*/
							showAllTheData();
						}, function(ts, message) {
							alert(message);
						});
					});
				}
			}, function(ts, message) {
				alert(message);
			});
		});
	}
	/*插入负债表*/
	$scope.submitDebt = function(){
		$scope.debtBoxTag = false;
		var nodeName = $scope.debtName;
		var nodeValue = $scope.debtValue;
		var tag = $scope.debtChooseNameTag;
		var db = getCurrentDb();
		initDebtTable();
		db.transaction(function(trans) {
			trans.executeSql("select * from DebtTable where DebtName = ?", [nodeName], function(ts, data) {
				if(data.rows.length != 0) {
					alert("项目已存在");
				} else {
					initDebtTable();
					/*添加数据进去*/
					/*初始化数据库输出表*/
					$scope.debtBoxTag = false;
					initDebtTable();
					var db = getCurrentDb();
					db.transaction(function(trans) {
						trans.executeSql("insert into DebtTable(DebtName,DebtValue,DebtTag) values(?,?,?) ", [nodeName, nodeValue, tag], function(ts, data) {
							/*隐藏输入框*/
							showAllTheData();
						}, function(ts, message){
							alert(message);
						});
					});
				}
			}, function(ts, message) {
				alert(message);
			});
		});
	}
	
	function showAllTheData() {

		var db = getCurrentDb(); //获取当前数据库
		/*展示输入表数据*/
		db.transaction(function(trans) {
			trans.executeSql("select * from InputTable ", [], function(ts, data) {
				var dataLength = data.rows.length;
				var inputSum = 0;
				var passiveInputSum = 0;
				/*清空输入表*/
				document.querySelector("#inputList").innerHTML = "";
				for(var i = 0; i < dataLength; i++) {
					if(data.rows[i].InputTag == "租金"||data.rows[i].InputTag == "IQ产权"||data.rows[i].InputTag == "退休金"){
						passiveInputSum = passiveInputSum+parseInt(data.rows[i].InputValue);
					}
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
				document.querySelector(".passiveIncome>.spanNumberPassiveIncome").innerHTML = passiveInputSum;
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
						/*计算收支比*/
						document.querySelector(".balanceOfPayment>.number").innerHTML =(parseInt(document.querySelector("#outputSum").innerHTML) / parseInt(document.querySelector("#inputSum").innerHTML)).toFixed(2);
						
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
						/*计算风险应对能力*/
						document.querySelector(".balanceOfSafety>.number").innerHTML = (cashSum/parseInt(document.querySelector("#outputSum").innerHTML)).toFixed(1);
					}, function(ts, message) {
						initDebtTable();
					});
				});
			}, function(ts, message) {
				initAssetTable();
			});
		});
		
	}
	
	showAllTheData();
	$scope.inputNames = ["工资","利息","补贴","股息","生意","租金","公积金","IQ产权","退休金","网络","其他"];
	$scope.outputNames = ["衣","食","住","行","娱","文化","生活","赡养","还贷"];
	$scope.assetNames = ["存款","股票","房产","汽车","债券","期权"];
	$scope.debtNames = ["负债","贷款"];
	/*默认选择*/
	$scope.inputChooseNameTag = "工资";
	$scope.outputChooseNameTag = "食";
	$scope.assetChooseNameTag = "存款";
	$scope.debtChooseNameTag = "负债";
	$scope.currentChooseButton = "input";
	$scope.inputBoxTag = false;
	$scope.outputBoxTag = false;
	$scope.assetBoxTag = false;
	$scope.debtBoxTag = false;
	/*输入表显示内容*/
	/*$scope.inputListTableContent = [{InputName:"3",InputTag:"工资",InputValue:"3"}];*/
	$scope.inputClick = function(){
		$scope.currentChooseButton = "input";
		
	}
	$scope.outputClick = function(){
		$scope.currentChooseButton = "output";
	}
	$scope.assetClick = function(){
		$scope.currentChooseButton = "asset";
	}
	$scope.debtClick = function(){
		$scope.currentChooseButton = "debt";
	}
	$scope.inputJudge = function(){
		if($scope.currentChooseButton=='input'){
			return true;
		}else{
			return false;
		}
	}
	$scope.outputJudge = function(){
		if($scope.currentChooseButton=='output'){
			return true;
		}else{
			return false;
		}
	}
	$scope.assetJudge = function(){
		if($scope.currentChooseButton=='asset'){
			return true;
		}else{
			return false;
		}
	}
	$scope.debtJudge = function(){
		if($scope.currentChooseButton=='debt'){
			return true;
		}else{
			return false;
		}
	}
	/*新建按钮函数*/
	$scope.showContentBox = function(){
		if($scope.currentChooseButton == "input"){
			$scope.inputBoxTag = true;
			$scope.inputName = "";
			$scope.inputValue = "";
		}else if($scope.currentChooseButton == "output"){
			$scope.outputBoxTag = true;
		}else if($scope.currentChooseButton == "asset"){
			$scope.assetBoxTag = true;
		}else if($scope.currentChooseButton == "debt"){
			$scope.debtBoxTag = true;
		}
	}
	/*输入框*/
	$scope.closeInput = function(){
		$scope.inputBoxTag = false;
	}
	/*输出框*/
	$scope.closeOutput = function(){
		$scope.outputBoxTag = false;
	}
	/*资产框*/
	$scope.closeAsset  = function(){
		$scope.assetBoxTag = false;
	}
	/*负债框*/
	$scope.closeDebt = function(){
		$scope.debtBoxTag = false;
	}
})