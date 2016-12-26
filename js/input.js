angular.module('dashboard',[])
.controller('dashboardContrl',function($scope){
	$scope.cashFlow = 2-3;
	$scope.netAsset = -12000000.11;
	$scope.passiveIncome = 12313;
	$scope.cash = -500000.23;
	$scope.balanceOfPayment = "12.3";
	$scope.balanceOfSafety = "1";
	$scope.currentChooseButton = "input";
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
})