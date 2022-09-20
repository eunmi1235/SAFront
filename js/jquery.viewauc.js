﻿/**
* jQuery.viewauc - auction live using jQuery.
* Copyright (c) 2018 seoulauction 
* Dual licensed under seoulauction
* Date: 4/25/2018
* @author YDH, PSH
* @version 1.0.0
*
*/

	
	app.controller('liveAuctionCtl', function($scope, consts, common, $interval) {

	 	$scope.loadLiveAuction = function(){

	 		$d = {"baseParms":{"sale_no":$scope.sale_no, "lot_no":$scope.lot_no},
	 				"actionList":[
 					{"actionID":"liveSaleInfo", "actionType":"select" , "tableName": "SALE"},
 					{"actionID":"liveLotInfo", "actionType":"select" , "tableName": "LOT"},
 					{"actionID":"get_customer_by_cust_no", "actionType":"select" , "tableName": "CUST_INFO" ,"parmsList":[]},
 					{"actionID":"offBidList", "actionType":"select", "tableName":"BID_OFF_LIST"}, // Live 진행 LOT번호 응찰금액 호출 추가(2018.04.18 YDH)
 					//{"actionID":"liveLotNaviList", "actionType":"select", "tableName":"LOT_NAVI", "parmsList":[{}]}, // navi 최신화. Edit모드에서만 실행할 것
	 			 ]};
	 	   	
	 	   common.callActionSet($d, $s);
		}
	 		
	 	var $s = function(data, status) { 
	 		$scope.sale = data["tables"]["SALE"]["rows"][0];
	 		$scope.lot = data["tables"]["LOT"]["rows"][0];
	 		$scope.custInfo = data["tables"]["CUST_INFO"]["rows"][0];
	 		$scope.offBidList = data["tables"]["BID_OFF_LIST"]["rows"];// Live 진행 LOT번호 응찰금액 호출 추가(2018.04.18 YDH)
	 		//$scope.lot_navi = data["tables"]["LOT_NAVI"]["rows"];// Live 진행 LOT번호 5건 호출 추가(2018.04.19 YDH). Edit모드에서만 실행할 것
	 		
	 		$scope.base_currency = $scope.sale.CURR_CD;
	 	    $scope.base_timezone = ($scope.sale.SALE_KIND_CD == 'hongkong' ? "HKT" : "KST");;
	 		$scope.sub_currency = ($scope.sale.CURR_CD == "KRW" ? "HKD" : "KRW");
	 		$scope.sub_timezone = ($scope.sale.SALE_KIND_CD == 'hongkong' ? "KST" : "HKT");

	 		$scope.live_lot_no = $scope.lot.LOT_NO;  //현재 진행중인 LOT 번호
	 		$scope.max_lot_no = $scope.sale.MAX_LOT_NO;  // LOT 번호 MAX 번호

	 		// 최초 오픈된 경우 실행. 최초 오픈시에는 mid_lot_no는 NULL!
	 		if($scope.mid_lot_no == null || $scope.mid_lot_no == 'undefined')
	 		{
	 			$scope.naviMoveInit($scope.live_lot_no);
	 		}
		}
		
		// Live 진행 LOT번호 설정 로직 추가(2018.04.14 YDH)
		$scope.liveLotSave = function($input) {		
			var $d = {"baseParms":{"sale_no":$scope.sale_no, "lot_no":$scope.lot_no}, 
					"actionList":[
					{"actionID":"modLiveLot", "actionType":"update", "tableName":"LIVE_LOT", "parmsList":[{}]}
					]};
			common.callActionSet($d, function(data, status) {
				$scope.loadLiveAuction();
			})
		};
		// Live 진행 LOT번호 응찰금액 로직 추가(2018.04.17 YDH), bid_price는 콤마(,)제거
		$scope.liveLotBidPriceSave = function($input) {		
			var $d = {"baseParms":{"sale_no":$scope.sale_no, "lot_no":$scope.lot_no, "bid_price":$scope.bid_price.replace(/[^\d]+/g,''), "bid_kind_cd":$input}, 
					"actionList":[
					{"actionID":"addOffBidPrice", "actionType":"insert", "tableName":"BID_OFFLINE", "parmsList":[{}]}
					]};
			common.callActionSet($d, function(data, status) {
				$scope.loadLiveAuction();
			})
		};
		
		// Live 하단 네비게이션 리스트
		$scope.liveLotNaviList = function($input){
			var $d = {"baseParms":{"sale_no":$scope.sale_no, "lot_no":$scope.lot_no, "mid_lot_no":$input}, 
				"actionList":[
				{"actionID":"liveLotNaviList", "actionType":"select", "tableName":"LOT_NAVI", "parmsList":[{}]}
				]};
			common.callActionSet($d, function(data, status) {
				$scope.lot_navi = data["tables"]["LOT_NAVI"]["rows"];// Live 진행 LOT번호 5건 호출 추가(2018.04.19 YDH)
				$scope.mid_lot_navi = data["tables"]["LOT_NAVI"]["rows"][0]; // Live 진행 MID_LOT_NO 호출 추가(2018.04.19 YDH)
				
				$scope.mid_lot_no = $scope.mid_lot_navi.MID_LOT_NO;
				
				$scope.loadLiveAuction();
			})
		};
		
		$scope.naviMove = function($input){
			$scope.sale_no = $scope.sale.SALE_NO;
			
			if($scope.mid_lot_no == null || $scope.mid_lot_no == 'undefined'){
				if($scope.live_lot_no < 3){
	 				$scope.live_lot_no = 3;
				}
				$scope.mid_lot_no = $scope.live_lot_no;
			} ;

			$scope.mid_lot_no = $scope.mid_lot_no + $input;
			
			// lot_no가 3이하일경우 3로 설정, 최대 lot_no Over일 경우 최대lot_no-2로 설정. 기본 5건 보여주기위해서 처리
			if($scope.mid_lot_no < 3)
			{
				$scope.mid_lot_no = 3;
			} else if ($scope.mid_lot_no > $scope.max_lot_no-2)
			{
				$scope.mid_lot_no = $scope.max_lot_no-2;
			}
			
			$scope.liveLotNaviList($scope.mid_lot_no);
		};
		
		$scope.naviMoveInit = function($input){
			$scope.sale_no = $scope.sale.SALE_NO;
			
			// lot_no가 3이하일경우 3로 설정, 최대 lot_no Over일 경우 최대lot_no-2로 설정. 기본 5건 보여주기위해서 처리
			$scope.mid_lot_no = $input;
			
			if($scope.mid_lot_no < 3)
			{
				$scope.mid_lot_no = 3;
			} else if ($scope.mid_lot_no > $scope.max_lot_no-2)
			{
				$scope.mid_lot_no = $scope.max_lot_no-2;
			}
			
			$scope.liveLotNaviList($scope.mid_lot_no);
		};
		
		$scope.liveLotBidPriceInput = function($input){
			//$scope.bid_price = $scope.bid_price_input * $input;	
			// 콤마(,)표시
			var inNum = $scope.bid_price_input * $input;
			var rgx2 = /(\d+)(\d{3})/; 
			var outNum;

			outNum = inNum.toString();
			
			while (rgx2.test(outNum)) {
			   outNum = outNum.replace(rgx2, '$1' + ',' + '$2');
			}
			
			$scope.bid_price = outNum;
		};
		
		// Lot Refresh : 3초단위, Navi Refresh : 1분단위
		$interval(function(){$scope.loadLiveAuction();},3000);
		//$interval(function(){$scope.naviMove();},30000); //네비게이션 동기화는 버튼 클릭시만 진행
	});