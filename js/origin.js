	
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
		var toUpdateDate = $($current.find("td").get(0)).text();
		/*数据库删除*/
		/*updateDebtListData(toUpdateDate);*/
	}
