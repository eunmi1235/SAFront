app.factory("bid", function ($interval, ngDialog) {
	var saleCert = function($input, $callBack){
		$input.parent.cancelLotRefresh();

		$input.parent.modal = ngDialog.open({
			template: '/saleCert?sale_no=' + $input.sale.SALE_NO,
			controller: 'saleCertCtl',
			showClose: false,
			closeByDocument: false,
			animationEndSupport: false,
			resolve: {input: function(){return $input;}}
		});
	};
	
	var bidPopup = function($input) {
		$input.parent.cancelLotRefresh();
		$input.parent.modal = ngDialog.open({
			template: '/bid?sale_no=' + $input.sale.SALE_NO + '&lot_no=' + $input.lot.LOT_NO,
			controller: 'bidListCtl',
			showClose: false,
			closeByDocument: false,
			animationEndSupport: false,
			resolve: {input: function(){return $input;}}
		});
	};
	
	var objs = {
		
		saleCertCheck: function($input) {
			//if($input.parent.is_login == "true" && $input.parent.locale == 'ko' && ($input.parent.sale_cert.CNT || 0) <= 0){
			if($input.parent.is_login == "true" && $input.parent.custInfo.LOCAL_KIND_CD != 'foreigner' && ($input.parent.sale_cert.CNT || 0) <= 0){
				$input.parent.cancelLotRefresh();
				saleCert($input);
			}
		},

		showBidPopup: function($input) {
			if(!$input.parent.is_login){
				document.location.href='/login';
				return;
			}

			//if($input.parent.locale == 'ko' && ($input.parent.sale_cert.CNT || 0) <= 0){
			if($input.parent.custInfo.LOCAL_KIND_CD != 'foreigner' && ($input.parent.sale_cert.CNT || 0) <= 0){
				$input.parent.cancelLotRefresh();
				$input.callBack = bidPopup;
				saleCert($input);
			}else{
				bidPopup($input);
			}
		},

		showBidRequestPopup: function($input) {
			$input.parent.modal = ngDialog.open({
				template: '/bidRequest?sale_no=' + $input.sale.SALE_NO + '&lot_no=' + $input.lot.LOT_NO,
				controller: 'bidRequestCtl',
				showClose: false,
				closeByDocument: false,
				animationEndSupport: false,
				resolve: {input: function(){return $input;}}
			});
		},
		
		showConditionReportPopup: function($input) {
			$input.parent.modal = ngDialog.open({
				template: '/conditionReport?sale_no=' + $input.sale_no + '&lot_no=' + $input.lot_no,
				showClose: false,
				closeByDocument: false,
				animationEndSupport: false,
				resolve: {input: function(){return $input;}}
			});
		},
		
		liveAuctionBidPopup: function($input) {
			$input.parent.modal = ngDialog.open({
				template: '/liveAuctionPop?padd_no=' + $input,
				showClose: false,
				closeByDocument: false,
				animationEndSupport: false,
				resolve: {input: function(){return $input;}}
			});
		},

		showBidHistoryPopup: function($input) {
			$input.parent.modal = ngDialog.open({
				template: '/bidHistory?sale_no=' + $input.sale.SALE_NO + '&lot_no=' + $input.lot.LOT_NO,
				controller: 'bidHistoryCtl',
				closeByDocument: false,
				showClose: false,
				animationEndSupport: false,
				resolve: {input: function(){return $input;}}
			});
		},
		
		memberAlert: function() {
			if($scope.locale == 'ko'){
				alert("??????/?????? ????????????????????? ???????????? ???????????? ??? ????????????.");
			} else {
				alert("Written/Telephone works can only be used by Subscription Members.");
			}
		},

		/* ???????????? ???????????? ?????? */
		showBiddingMemberPopup: function() {
			if(m_bIsLogged) {
				if(confirm("Only bidding member can bid online auction. Do you want to become a bidding memeber?")) {
					$(".pop15").click(); // /eng/biddingMember ??????
				}
			}
			else {
				alert("Please log in to use the service.");
			}
		},
		
	};
	
	return objs;
});

app.controller('bidListCtl', function($scope, consts, common, $interval, input, locale, $filter) {
	
	$scope.sale = input.sale;
	$scope.lot =  input.lot;
	$scope.parent = input.parent;
	
	$scope.last_bid_no = 0;
	$scope.auto_req_price = 0;
	$scope.auto_req_no = null;
	
	$scope.low_price = $scope.bid_price = $scope.bid_auto_price = $filter("number")(($scope.lot.LAST_PRICE !== null ? $scope.lot.LAST_PRICE + $scope.lot.GROW_PRICE : $scope.lot.START_PRICE), 0);
	
	$scope.bidList = [];

	$scope.closed = false;
	$scope.base_currency = ($scope.sale.SALE_KIND_CD == 'hongkong' ? "HKD" : "KRW");
	$scope.timer_bid_start = false;
	$scope.chkAgree = ($scope.lot.MY_BID_SALE_CNT > 0 ? true : false);
	
	$scope.close = function(modal){
		$scope.cancelTimer();
		$scope.parent.refreshLots();
		$scope.parent.runLotsRefresh();
		modal.closeThisDialog();
	}
	
	$scope.init = function(){
		$scope.loadBidList();
	}
	
	$scope.loadBidList = function(){
		if($scope.is_processing) return;
		
		$d = {"baseParms":{"sale_no":$scope.sale.SALE_NO, "lot_no":$scope.lot.LOT_NO},
 				"actionList":[
			    {"actionID":"lot_list_refresh", "actionType":"select" , "tableName":"LOT", "parmsList":[{"lot_nos":[$scope.lot.LOT_NO]}]},
			    {"actionID":"last_auto_bid_req", "actionType":"select" , "tableName":"AUTO"},
			    {"actionID":"bid_list", "actionType":"select" , "tableName":"LIST", "parmsList":[{"limit":20}]} //, "parmsList":[{"last_bid_no":$scope.last_bid_no}]
 			 ]};
		
  	   	common.callActionSet($d, $s, $e, finalRefresh);
	}

	$scope.bidOnce = function(){
		if($scope.is_processing) return;

		if($scope.lot.IS_WIN == 'Y'){			
			if(locale == 'ko'){
				alert("????????? ?????? ??? ?????????.");
			} else {
				alert("Hightest bid has just been made");
			}
			return;
		}
		
/*		if (!$scope.chkAgree){
			if(locale == 'ko'){
				alert("?????? ?????? ???????????? ???????????? ??? ????????????.");
			} else {
				alert("You can bid after 'Accept the bidding' check.");
			}
			return;
		}
*/		
		if($scope.lot.LAST_PRICE !== null && $scope.lot.LAST_PRICE >= parseInt($scope.bid_price.replace(/,/gi, "")) ){
			if(locale == 'ko'){
				alert("???????????? ????????? ?????? ?????? ?????????.");
			} else {
				alert("The bidding price must be greater than the current price.");
			}
			return;
		}
		
		if($scope.auto_req_price > $scope.lot.LAST_PRICE){
			if(locale == 'ko'){
				alert("?????? ?????? ????????? ???????????? ???????????? ??? ????????????.");
			} else {
				alert("You can not manually bidding during auto bidding.");
			}
		}else{
			$scope.is_processing = true;
			$d = {"baseParms":{"sale_no":$scope.sale.SALE_NO, "lot_no":$scope.lot.LOT_NO},
	 				"actionList":[
				    {"actionID":"bid_once", "actionType":"insert" , "tableName":"BID", "parmsList":[{"bid_price":parseInt($scope.bid_price.replace(/,/gi, "")) }]}
				    , {"actionID":"lot_list_refresh", "actionType":"select" , "tableName":"LOT", "parmsList":[{"lot_nos":[$scope.lot.LOT_NO]}]}
				    , {"actionID":"bid_list", "actionType":"select" , "tableName":"LIST", "parmsList":[{"limit":20}]} //, "parmsList":[{"last_bid_no":$scope.last_bid_no}]
	 		]};
	  	   	common.callActionSet($d, $s, $e);//, finalRefresh);
		}
	}

	$scope.bidAuto = function(){
		if($scope.is_processing) return;

		$d = {"baseParms":{"sale_no":$scope.sale.SALE_NO, "lot_no":$scope.lot.LOT_NO}, "actionList":[]};
		
		if ($scope.lot.MY_BID_AUTO_CNT < 1){			
			if(locale == 'ko'){
				if(confirm("???????????? ???????????? ???????????? ?????? ??? ?????? ????????? ?????? ???????????? ???????????????.\n?????? ???????????????????") == false){
					return
				}
			} else {
				if(confirm("All bid and bid records before automatic bidding is stopped are recorded and valid.\nWould you like to bidding?") == false){
					return
				}
			}
		}
				
		/*if (!$scope.chkAgree){
			if(locale == 'ko'){
				alert("?????? ?????? ???????????? ???????????? ??? ????????????.");
			} else {
				alert("You can bid after 'Accept the bidding' check.");
			}
			return;
		}*/
		
		
		////2018.09.10 blueerr ?????????????????? ???????????????????????? ????????? ??????????????? ????????????. ?????? ???????????? ????????????(2019.09.17 YDH)
		//var tmp_p = parseInt($scope.bid_auto_price.replace(/,/gi, "")) - $scope.lot.START_PRICE;
		//var remain = (tmp_p % $scope.lot.GROW_PRICE);
		//if(remain > 0){
		//	alert("?????? ???????????? ??????????????? ??????????????? ?????????.");
		//	return;
		//}

		if($scope.auto_req_price > $scope.lot.LAST_PRICE){
			if(locale == 'ko'){
				if(confirm('???????????? ??????????????? ?????? ?????? ????????? ????????????.\n????????? ????????? ???????????? ???????????????.\n?????? ????????? ?????? ????????????????')){
					$scope.is_processing = true;
					var action = {"actionID":"bid_auto_cancel", "actionType":"update" , "tableName":"BID", "parmsList":[{"req_no":$scope.auto_req_no}]};
					$d.actionList.push(action);
				}
				else{
					return;
				}
			} else {
				if(confirm('Stopping automatic bidding is not a cancellation of automatic bidding.\nThe bidding will stop when it is up.\nDo you want to stop automatic bidding?')){
					$scope.is_processing = true;
					var action = {"actionID":"bid_auto_cancel", "actionType":"update" , "tableName":"BID", "parmsList":[{"req_no":$scope.auto_req_no}]};
					$d.actionList.push(action);
				}
				else{
					return;
				}
			}
		}
		else{
			
			if($scope.lot.LAST_PRICE !== null && $scope.lot.LAST_PRICE >= parseInt($scope.bid_auto_price.replace(/,/gi, "")) ){
				if(locale == 'ko'){
					alert("?????? ???????????? ????????? ?????? ?????? ?????????.");
				} else {
					alert("The bidding price must be greater than the current price.");
				}
				return;
			}
			////???????????? ?????? ???????????? ??????(2018.07.25)
			//if(parseInt($scope.bid_auto_price.replace(/,/gi, ""))%$scope.lot.GROW_PRICE != 0 ){
			//	alert("?????? ???????????? ??????????????? ??????????????? ?????????.");
			//	return;
			//}
			
			$scope.is_processing = true;
			var action = {"actionID":"bid_auto_add", "actionType":"insert" , "tableName":"BID", "parmsList":[{"bid_price":parseInt($scope.bid_auto_price.replace(/,/gi, "")) }]};
			$d.actionList.push(action);
		}
		$d.actionList.push({"actionID":"last_auto_bid_req", "actionType":"select" , "tableName":"AUTO"});
		$d.actionList.push({"actionID":"lot_list_refresh", "actionType":"select" , "tableName":"LOT", "parmsList":[{"lot_nos":[$scope.lot.LOT_NO]}]});
		$d.actionList.push({"actionID":"bid_list", "actionType":"select" , "tableName":"LIST", "parmsList":[{"limit":20}]}); //, "parmsList":[{"last_bid_no":$scope.last_bid_no}]}
  	   	common.callActionSet($d, $s, $e);//, finalRefresh);

	}
	
	var $e = function(){
		$scope.cancelTimer();
	   	$scope.is_processing = false;
	}
	
	var $s = function(data, status) {
		if(data["tables"]["AUTO"] && data["tables"]["AUTO"]["rows"].length > 0){
			$scope.auto_req_price = data["tables"]["AUTO"]["rows"][0].BID_PRICE;
			$scope.auto_req_no = data["tables"]["AUTO"]["rows"][0].REQ_NO;
		}
		else{
			$scope.auto_req_price = 0;
			$scope.auto_req_no = null;
		}
		
		var src = data["tables"]["LIST"]["rows"];
		
		if(src.length > 0){
			$scope.bidList = src;
			//$scope.bidList = src.concat($scope.bidList);
		}
		
		//angular.extend($scope.bidList, data["tables"]["LIST"]["rows"]);
		var $lotInfo = data["tables"]["LOT"]["rows"][0];
		$scope.lot["STAT_CD"] =$lotInfo["STAT_CD"];
		$scope.lot["TO_DT"] = $lotInfo["TO_DT"];
		$scope.lot["LAST_PRICE"] = $lotInfo["LAST_PRICE"];
		$scope.lot["LAST_CUST_ID"] = $lotInfo["LAST_CUST_ID"];
		$scope.lot["SOLD_YN"] = $lotInfo["SOLD_YN"];
		$scope.lot["BID_CNT"] = $lotInfo["BID_CNT"];
		$scope.lot["IS_WIN"] = $lotInfo["IS_WIN"];
		$scope.lot["END_YN"] = $lotInfo["END_YN"];
		$scope.lot["GROW_PRICE"] = $lotInfo["GROW_PRICE"];
		
		$scope.parent.db_now = moment($lotInfo["DB_NOW"]);
		
		$scope.low_price = ($scope.lot.LAST_PRICE !== null ? $scope.lot.LAST_PRICE + $scope.lot.GROW_PRICE : $scope.lot.START_PRICE);
		$scope.bid_price = parseInt($scope.bid_price.replace(/,/gi, "")) <= $scope.low_price ? $filter("number")($scope.low_price, 0) : $scope.bid_price;
		$scope.bid_auto_price = parseInt($scope.bid_auto_price.replace(/,/gi, "")) <= $scope.low_price ? $filter("number")($scope.low_price, 0) : $scope.bid_auto_price;
		
		if($scope.lot.END_YN == 'Y'){
			$scope.cancelTimer();
			$d = {"baseParms":{"sale_no":$scope.sale.SALE_NO, "lot_no":$scope.lot.LOT_NO}
				, "actionList":[{"actionID":"bid_list", "actionType":"select" , "tableName":"LIST"}]
			};
			
			common.callActionSet($d, function(data, status){
				var src = data["tables"]["LIST"]["rows"];
				if(src.length > 0){
					$scope.bidList = src;
				}
			});
			//$scope.closed = true;
		}
		$scope.is_processing = false;
	};
	
	$scope.getDuration = function(){
		if(locale == 'ko'){
			return $scope.lot.END_YN == 'Y' ? '??????' : $scope.parent.getDurationTime($scope.lot.TO_DT, locale == 'ko' ? 'd??? h:m:s' : 'd[Days] h:m:s');
		} else {
			return $scope.lot.END_YN == 'Y' ? 'Closed' : $scope.parent.getDurationTime($scope.lot.TO_DT, locale == 'ko' ? 'd??? h:m:s' : 'd[Days] h:m:s');
		}
	}

	var finalRefresh = function(){
		//if($scope.closed) return;
		$scope.is_processing = false;
		if($scope.timer_bid_start) return;
		console.log("========> start bid timer");
		$scope.timer_bid_list_refersh = $interval($scope.loadBidList, 5000);//, 1);
		$scope.timer_bid_start = true;
	}
	
	$scope.cancelTimer = function(){
		$interval.cancel($scope.timer_bid_list_refersh);
		console.log("============>> cancel BidTimer");
	} 
	
	$scope.setBidPrice = function(flag) {
		var p = parseInt($scope.bid_price.replace(/,/gi, ""));
		 
		if(flag == 'up')		p += $scope.lot.GROW_PRICE;
		else if(flag == 'down')	p -= $scope.lot.GROW_PRICE;
		
		if(p < $scope.low_price) p = $scope.low_price; 
		$scope.bid_price = $filter("number")(p, 0);
	};

	$scope.setBidAutoPriceBak = function(flag) {
		var p = parseInt($scope.bid_auto_price.replace(/,/gi, ""));
		 
		if(flag == 'up')		p += $scope.lot.GROW_PRICE;
		else if(flag == 'down')	p -= $scope.lot.GROW_PRICE;
		
		if(p < $scope.low_price) p = $scope.low_price; 
		$scope.bid_auto_price = $filter("number")(p, 0);
	};

	//2018.09.10 blueerr ?????????????????? ???????????????????????? ????????? ??????????????? +,- ??????
	$scope.setBidAutoPrice = function(flag) {
		var tmp_p = parseInt($scope.bid_auto_price.replace(/,/gi, "")) - $scope.lot.START_PRICE;
		var p = parseInt(tmp_p / $scope.lot.GROW_PRICE) * $scope.lot.GROW_PRICE; 
		var remain = (tmp_p % $scope.lot.GROW_PRICE);
		
		if(flag == 'up')		p += $scope.lot.GROW_PRICE;
		else if(flag == 'down' && remain == 0)	p -= $scope.lot.GROW_PRICE;
		
		p += $scope.lot.START_PRICE;
		
		if(p < $scope.low_price) p = $scope.low_price; 
		$scope.bid_auto_price = $filter("number")(p, 0);
	};
	
	//2019.08.05 ?????? ?????? ?????? ??????
	$scope.setBidAutoPriceAuto = function(flag){
		//?????? ?????? ?????? ??????
		var tmp_grow_price = 0;
		var bidAutoPrice = parseInt($scope.bid_auto_price.replace(/,/gi, ""));
		//alert(bidAutoPrice);
		if (flag == 'up'){
			if (bidAutoPrice < 1000000){
				tmp_grow_price = 50000;
				//alert("??????- 50?????????");
			//} else if (bidAutoPrice >= 500000 && bidAutoPrice < 1000000){
			//	tmp_grow_price = 50000;
			//	//alert("??????- 100?????????");
			} else if (bidAutoPrice >= 1000000 && bidAutoPrice < 3000000){
				tmp_grow_price = 100000;
				//alert("??????- 300?????????");
			} else if (bidAutoPrice >= 3000000 && bidAutoPrice < 5000000){
				tmp_grow_price = 200000;
				//alert("??????- 500?????????");
			} else if (bidAutoPrice >= 5000000 && bidAutoPrice < 10000000){
				tmp_grow_price = 300000;
				//alert("??????- 1000?????????");
			} else if (bidAutoPrice >= 10000000 && bidAutoPrice < 30000000){
				tmp_grow_price = 500000;
				//alert("??????- 3000?????????");
			} else if (bidAutoPrice >= 30000000 && bidAutoPrice < 50000000){
				tmp_grow_price = 1000000;
				//alert("??????- 5000?????????");
			} else if (bidAutoPrice >= 50000000 && bidAutoPrice < 100000000){
				tmp_grow_price = 2000000;
				//alert("??????- 1?????????");
			} else if (bidAutoPrice >= 100000000 && bidAutoPrice < 200000000){
				tmp_grow_price = 3000000;
				//alert("??????- 2?????????");
			} else if (200000000 <= bidAutoPrice){
				tmp_grow_price = 5000000;
				//alert("??????- 2?????????");
			} else {
				tmp_grow_price = $scope.lot.GROW_PRICE;
				//alert("??????- ????????? ??????");
			}
		} else {
			if (bidAutoPrice <= 1000000){
				tmp_grow_price = 50000;
				//alert("??????- 50?????????");
			//} else if (bidAutoPrice > 500000 && bidAutoPrice <= 1000000){
			//	tmp_grow_price = 50000;
			//	//alert("??????- 100??????");
			//	if((bidAutoPrice - tmp_grow_price) < 500000){
			//		tmp_grow_price = 10000;
			//	}
			} else if (bidAutoPrice > 1000000 && bidAutoPrice <= 3000000){
				tmp_grow_price = 100000;
				//alert("??????- 300?????????");
				if((bidAutoPrice - tmp_grow_price) < 1000000){
					tmp_grow_price = 50000;
				}
			} else if (bidAutoPrice > 3000000 && bidAutoPrice <= 5000000){
				tmp_grow_price = 200000;
				//alert("??????- 500?????????");
				if((bidAutoPrice - tmp_grow_price) < 3000000){
					tmp_grow_price = 100000;
				}
			} else if (bidAutoPrice > 5000000 && bidAutoPrice <= 10000000){
				tmp_grow_price = 300000;
				//alert("??????- 1000?????????");				
				if((bidAutoPrice - tmp_grow_price) < 5000000){
					tmp_grow_price = 100000;
				}
			} else if (bidAutoPrice > 10000000 && bidAutoPrice <= 30000000){
				tmp_grow_price = 500000;
				//alert("??????- 3000?????????");alert("test");
				if((bidAutoPrice - tmp_grow_price) < 10000000){
					tmp_grow_price = 300000;
				}
			} else if (bidAutoPrice > 30000000 && bidAutoPrice <= 50000000){
				tmp_grow_price = 1000000;
				//alert("??????- 5000?????????");
				if((bidAutoPrice - tmp_grow_price) < 30000000){
					tmp_grow_price = 500000;
				}
			} else if (bidAutoPrice > 50000000 && bidAutoPrice <= 100000000){
				tmp_grow_price = 2000000;
				//alert("??????- 1?????????");
				if((bidAutoPrice - tmp_grow_price) < 50000000){
					tmp_grow_price = 1000000;
				}
			} else if (bidAutoPrice > 100000000 && bidAutoPrice <= 200000000){
				tmp_grow_price = 3000000;
				//alert("??????- 2?????????");
				if((bidAutoPrice - tmp_grow_price) < 100000000){
					tmp_grow_price = 2000000;
				}
			} else if (200000000 < bidAutoPrice){
				tmp_grow_price = 5000000;
				//alert("??????- 2?????????");
				if((bidAutoPrice - tmp_grow_price) < 200000000){
					tmp_grow_price = 3000000;
				}
			} else {
				tmp_grow_price = $scope.lot.GROW_PRICE;
				//alert("??????- ????????? ??????");
			}
		}
		
		//alert(tmp_grow_price);
		//?????? ???????????? ?????? ??? ????????? ??????
		// up / down
		if(flag == 'up')		bidAutoPrice += tmp_grow_price;
		else if(flag == 'down')	bidAutoPrice -= tmp_grow_price;

		// ????????? ?????? ???????????? ?????? ?????? 
		if(bidAutoPrice < $scope.low_price) bidAutoPrice = $scope.low_price; 
		$scope.bid_auto_price = $filter("number")(bidAutoPrice, 0);
	}

	$scope.setLastBidNo = function($bid_no) {
		if($bid_no > $scope.last_bid_no) $scope.last_bid_no = $bid_no;
	};
	
	$scope.setChkAgree = function(flag) {
		$scope.chkAgree = flag;
	};
});

app.controller('bidHistoryCtl', function($scope, consts, common, $interval, input) {
	$scope.sale = input.sale;
	$scope.lot =  input.lot;
	$scope.parent = input.parent;
	$scope.base_currency = ($scope.sale.SALE_KIND_CD == 'hongkong' ? "HKD" : "KRW");
	
	$scope.loadBidHistory = function(){
		$d = {"baseParms":{"sale_no":$scope.sale.SALE_NO, "lot_no":$scope.lot.LOT_NO},//, "last_bid_no":$scope.last_bid_no},
			"actionList":[
				{"actionID":"lot_list_refresh", "actionType":"select" , "tableName":"LOT", "parmsList":[{"lot_nos":[$scope.lot.LOT_NO]}]},
				{"actionID":"bid_list", "actionType":"select" , "tableName": "LIST"}
			]};

		common.callActionSet($d,function(data, status) {
			$scope.bidList = data["tables"]["LIST"]["rows"];
			$scope.lot = data["tables"]["LOT"]["rows"][0];
		});
	}
});
/* aa */
app.controller('bidRequestCtl', function($scope, consts, common, $interval, input, $filter) {
	$scope.sale = input.sale;
	$scope.lot =  input.lot;
	$scope.parent = input.parent;
//	$scope.base_currency = $scope.lot.CURR_CD == 'HKD' ? $scope.lot.CURR_CD : 'KRW';
	$scope.base_currency = $scope.sale.CURR_CD;
	$scope.bid_auto_price = $filter("number")($scope.lot.EXPE_PRICE_FROM_JSON[$scope.base_currency], 0); //????????? or ?????? ?????????
	$scope.low_price = $scope.lot.EXPE_PRICE_FROM_JSON[$scope.base_currency];
	
	$scope.custInfo = input.parent.custInfo;
	
	$scope.base_currency = $scope.sale.CURR_CD;
	
	$scope.loadBidRequest = function(){
		$d = {"baseParms":{"cust_no":$scope.custInfo.CUST_NO},
 				"actionList":[
 			    {"actionID":"get_customer_manager", "actionType":"select" , "tableName": "CUSTM"}
 			 ]};

  	   	var $s = function(data, status) { $scope.cust_manager = data["tables"]["CUSTM"]["rows"][0]; };
  		
  	   	common.callActionSet($d, $s);
	}
	
	$scope.chkConfirm = false;
	$scope.chkAgree = false;
	$scope.chkCustInfo = false;
	$scope.save_data = {};
	$scope.save_data.sale_no = $scope.sale.SALE_NO;
	$scope.save_data.lot_no = $scope.lot.LOT_NO;
	$scope.save_data.bid_kind_cd = "phone";
	$scope.save_data.bid_price = null;

	$scope.save_data.hp = $scope.custInfo.HP;
	$scope.save_data.email = $scope.custInfo.EMAIL;
	
	$scope.returnOfflineGrowPrice = $scope.parent.returnOfflineGrowPrice;
	
	$scope.saveBidRequest = function(form){
		// ????????? ??????????????? ??????????????????. ????????? ??????????????? ?????? ?????? ??????. ?????? ???????????? ?????????(UTC)+KST(9)?????? ?????? ??????
		var dt = new Date();
		var kst_base_tz = (dt.getTime() + (dt.getTimezoneOffset() * 60000) + (9 * 3600000)); // ?????? ????????? ???????????? UTC ????????? + KST ??????
		dt.setTime(kst_base_tz);  // KST???????????? TIME ZONE ??????
		
		var kst_base_dt = dt.getFullYear()+(dt.getMonth()+1 > 9? '' : '0')+(dt.getMonth()+1)+(dt.getDate() > 9? '' : '0')+(dt.getDate()); // KST??????

		var sale_to_dt = new Date($scope.lot.SALE_TO_DT);
		var kst_base_tz1 = (sale_to_dt.getTime() + (sale_to_dt.getTimezoneOffset() * 60000) + (9 * 3600000)); // ?????? ????????? ???????????? SALE_TO_DT??? UTC ????????? + KST ??????
		sale_to_dt.setTime(kst_base_tz1);  // KST???????????? TIME ZONE ??????
		var kst_sale_to_dt = sale_to_dt.getFullYear()+(sale_to_dt.getMonth()+1 > 9? '' : '0')+(sale_to_dt.getMonth()+1)+(sale_to_dt.getDate() > 9? '' : '0')+(sale_to_dt.getDate()); // KST?????? 
		
		if($scope.sale.CURR_CD != 'USD' && $scope.save_data.bid_kind_cd != 'phone')	
			$scope.save_data.bid_price = $scope.bid_auto_price;
		
		if( kst_base_dt >= kst_sale_to_dt){  //??????????????? ???????????? ??????????????? ??????????????? ???. ?????? ?????????!
			if($scope.locale == 'ko'){
				alert("?????? ????????? ????????? ????????????. ????????? ??????????????? ????????? ???????????????.");
			} else{
				alert("It's not time for bidding. It is possible to bid only until the day before Auction Day.");
			}			
			return;
		}
		
		if(!$scope.chkCustInfo){
			if($scope.locale == 'ko'){
				alert("????????? ????????? ?????? ??? ?????? ????????????.");
			} else{
				alert("Please, confirm your contact information.");
			}			
			return;
		}
		
		var checkboxLen = $("input:checkbox[name=agreePop_checkbox]").length; //???????????? ?????? ??????
		var checkedLen = $("input:checkbox[name=agreePop_checkbox]:checked").length; //????????? ??????
		
		if(checkboxLen != checkedLen){
			alert($scope.locale == 'ko'? "????????? ?????? ??????????????????." : "Please agree to all the terms and conditions." );
			return;
		}
		
			                 
		if($scope.locale == 'ko'){
			if(!confirm("?????????????????????????")) return;
		}else {
			if(!confirm("Are you going to bid?")) return;
		}
		
		if($scope.save_data.bid_price){
			$scope.save_data.bid_price = parseInt($scope.save_data.bid_price.replace(/,/gi, ""));
		}
		
		$scope.changeBidKind();
		
		if($scope.sale.CURR_CD == 'KRW'){
			if($scope.save_data.bid_kind_cd != 'phone' && $scope.lot.EXPE_PRICE_INQ_YN != 'Y' && $scope.lot.EXPE_PRICE_FROM_JSON.KRW > $scope.save_data.bid_price){
				if($scope.locale == "ko"){
					alert("??????????????? ?????? ?????????(KRW) ?????? ?????? ?????????.");
				} else{
					alert("The Maximum price should be higher than the low estimate price(KRW).");
				}
				return;
			}
		} 
		
		if($scope.sale.CURR_CD == 'USD'){
			if($scope.save_data.bid_kind_cd != 'phone' && $scope.lot.EXPE_PRICE_INQ_YN != 'Y' && $scope.lot.EXPE_PRICE_FROM_JSON.USD > $scope.save_data.bid_price){
				if($scope.locale == "ko"){
					alert("??????????????? ?????? ?????????(USD) ?????? ?????? ?????????.");
				} else{
					alert("The Maximum price should be higher than the low estimate price(USD).");
				}
				return;
			}
		} 
			
		if($scope.sale.CURR_CD == 'HKD'){
			if($scope.save_data.bid_kind_cd != 'phone' && $scope.lot.EXPE_PRICE_INQ_YN != 'Y' && $scope.lot.EXPE_PRICE_FROM_JSON.HKD > $scope.save_data.bid_price){
				if($scope.locale == "ko"){
					alert("??????????????? ?????? ?????????(HKD) ?????? ?????? ?????????.");
				} else{
					alert("The Maximum price should be higher than the low estimate price(HKD).");
				}
				return;
			}
		} 
		
		var $d = {"baseParms":{},
 				"actionList":[
 			    {"actionID":"addAutoBidReq", "actionType":"insert" , "tableName": "RESULT","parmsList":[$scope.save_data]}
 			 ]};
 		
  	   	common.callActionSet($d, function(data, status) {
   	   			if(data.tables["RESULT"]["rows"].length > 0){
   					if($scope.locale == 'ko'){
   						alert("?????? ?????? ???????????????.");
   					}else{
   						alert("The bid has been processed.");
   					}
   	   				
   					form.closeThisDialog();
   	   			}else{
   	   				if($scope.locale == 'ko'){
   	   					alert("?????????????????????.\n?????? ??????????????????.");
					}else{
						alert("Failed.\nPlease try again.");
					}
   	   			}
   	   		},
   			function(data, status, headers, config) {
	   	   		if($scope.locale == 'ko'){
	  					alert("?????????????????????.\n?????? ??????????????????.");
				}else{
					alert("Failed.\nPlease try again.");
				}
   		    }
   		); 
	}
	
	$scope.changeBidKind = function(){
		//var bid_kind = element(by.binding('save_data.bid_kind_cd'));
		if($scope.save_data.bid_kind_cd == 'phone'){
			$scope.save_data.bid_price = null;
		}
	}
	
	//?????? ?????? ?????? ??????
	$scope.setBidAutoPriceAuto = function(flag){
		
		//?????? ?????? ?????? ??????
		var tmp_grow_price = 0;
		var bidAutoPrice = parseInt($scope.bid_auto_price.replace(/,/gi, ""));
		
		if($scope.sale.SALE_KIND_CD == 'hongkong'){
			tmp_grow_price = $scope.returnOfflineHkGrowPrice(flag, bidAutoPrice);
		}else{
			tmp_grow_price = $scope.returnOfflineGrowPrice(flag, bidAutoPrice);
		}
		
		console.log(tmp_grow_price);
		//?????? ???????????? ?????? ??? ????????? ??????
		// up / down
		if(flag == 'up')		bidAutoPrice += tmp_grow_price;
		else if(flag == 'down')	bidAutoPrice -= tmp_grow_price;

		// ????????? ?????? ???????????? ?????? ?????? 
		if(bidAutoPrice < $scope.low_price) bidAutoPrice = $scope.low_price; 
		$scope.bid_auto_price = $filter("number")(bidAutoPrice, 0);
	}
	
	$scope.checkboxAll = function(){ 
		if($("#agreePop_checkbox_all").prop("checked")){
			$("input:checkbox[name=agreePop_checkbox]").prop("checked", true);
		}else{
			$("input:checkbox[name=agreePop_checkbox]").prop("checked", false);
		}
	}
	
	$scope.viewKorean = function(num) { 
  		var num = $scope.isValidString(num) ? num.replace(/,/gi, "") : "";
		var hanA = new Array("","???","???","???","???","???","???","???","???","???","???"); 
		var danA = new Array("","???","???","???","","???","???","???","","???","???","???","","???","???","???"); 
		var result = ""; 
		
			for(i=0; i<num.length; i++) { 
				str = ""; 
				han = hanA[num.charAt(num.length-(i+1))]; 
				
				if(han != "") 
					str += han+danA[i]; 
				
				if(i == 4) str += "???"; 
				if(i == 8) str += "???"; 
				if(i == 12) str += "???"; 
				result = str + result; 
			} 
			
			if(result.indexOf('undefined') > -1) 
				result = ""; 
			else if(num == 0) 
				result = "???"; 
			else if(num != 0)
				result = result;
			
			//krw????????? ?????? ??????
			if($scope.base_currency.toLowerCase() == 'krw')
				result += " ???";
		
		return result ; 
		
	}

	$scope.returnOfflineGrowPrice = function(flag, inputPrice){
		var tmp_grow_price = 0;
		if(flag == 'up'){
			if (inputPrice < 1000000){
				tmp_grow_price = 50000;
				//alert("??????- 100?????????");
			}else if (inputPrice >= 1000000 && inputPrice < 2000000){
				tmp_grow_price = 100000;
				//alert("??????- 200?????????");
			}else if (inputPrice >= 2000000 && inputPrice < 4000000){
				tmp_grow_price = 200000;
				//alert("??????- 400?????????");
			}else if (inputPrice >= 4000000 && inputPrice < 10000000){
				tmp_grow_price = 300000;
				//alert("??????- 1000?????????");
			}else if (inputPrice >= 10000000 && inputPrice < 20000000){
				tmp_grow_price = 500000;
				//alert("??????- 2000?????????");
			}else if (inputPrice >= 20000000 && inputPrice < 30000000){
				tmp_grow_price = 1000000;
				//alert("??????- 3000?????????");
			}else if (inputPrice >= 30000000 && inputPrice < 50000000){
				tmp_grow_price = 2000000;
				//alert("??????- 5000?????????");
			}else if (inputPrice >= 50000000 && inputPrice < 100000000){
				tmp_grow_price = 3000000;
				//alert("??????- 1?????????");
			}else if (inputPrice >= 100000000 && inputPrice < 200000000){
				tmp_grow_price = 5000000;
				//alert("??????- 2?????????");
			}else if (inputPrice >= 200000000 && inputPrice < 300000000){
				tmp_grow_price = 10000000;
				//alert("??????- 3?????????");
			}else if (inputPrice >= 300000000 && inputPrice < 500000000){
				tmp_grow_price = 20000000;
				//alert("??????- 5?????????");
			}else if (inputPrice >= 500000000 && inputPrice < 1000000000){
				tmp_grow_price = 30000000;
				//alert("??????- 10?????????");
			}else if (inputPrice >= 1000000000 && inputPrice < 2000000000){
				tmp_grow_price = 50000000;
				//alert("??????- 20?????????");
			}else if (2000000000 <= inputPrice){
				tmp_grow_price = 100000000;
				//alert("??????- 20?????????");
			} else {
				tmp_grow_price = $scope.lot.GROW_PRICE;
				//alert("??????- ????????? ??????");
			}
		}else{
			if (inputPrice <= 1000000){
				tmp_grow_price = 50000;
				//alert("??????- 100?????????");
			} else if (inputPrice > 1000000 && inputPrice <= 2000000){
				tmp_grow_price = 100000;
				//alert("??????- 200?????????");
				if((inputPrice - tmp_grow_price) < 1000000){
					tmp_grow_price = 50000;
				}
			} else if (inputPrice > 2000000 && inputPrice <= 4000000){
				tmp_grow_price = 200000;
				//alert("??????- 400?????????");
				if((inputPrice - tmp_grow_price) < 2000000){
					tmp_grow_price = 100000;
				}
			} else if (inputPrice > 4000000 && inputPrice <= 10000000){
				tmp_grow_price = 300000;
				//alert("??????- 1000?????????");				
				if((inputPrice - tmp_grow_price) < 4000000){
					tmp_grow_price = 200000;
				}
			} else if (inputPrice > 10000000 && inputPrice <= 20000000){
				tmp_grow_price = 500000;
				//alert("??????- 2000?????????");				
				if((inputPrice - tmp_grow_price) < 10000000){
					tmp_grow_price = 300000;
				}
			} else if (inputPrice > 20000000 && inputPrice <= 30000000){
				tmp_grow_price = 1000000;
				//alert("??????- 3000?????????");alert("test");
				if((inputPrice - tmp_grow_price) < 20000000){
					tmp_grow_price = 500000;
				}
			} else if (inputPrice > 30000000 && inputPrice <= 50000000){
				tmp_grow_price = 2000000;
				//alert("??????- 5000?????????");
				if((inputPrice - tmp_grow_price) < 30000000){
					tmp_grow_price = 1000000;
				}
			} else if (inputPrice > 50000000 && inputPrice <= 100000000){
				tmp_grow_price = 3000000;
				//alert("??????- 1?????????");
				if((inputPrice - tmp_grow_price) < 50000000){
					tmp_grow_price = 2000000;
				}
			} else if (inputPrice > 100000000 && inputPrice <= 200000000){
				tmp_grow_price = 5000000;
				//alert("??????- 2?????????");
				if((inputPrice - tmp_grow_price) < 100000000){
					tmp_grow_price = 3000000;
				}
			} else if (inputPrice > 200000000 && inputPrice <= 300000000){
				tmp_grow_price = 10000000;
				//alert("??????- 3?????????");
				if((inputPrice - tmp_grow_price) < 200000000){
					tmp_grow_price = 5000000;
				}
			} else if (inputPrice > 300000000 && inputPrice <= 500000000){
				tmp_grow_price = 20000000;
				//alert("??????- 5?????????");
				if((inputPrice - tmp_grow_price) < 300000000){
					tmp_grow_price = 10000000;
				}
			} else if (inputPrice > 500000000 && inputPrice <= 1000000000){
				tmp_grow_price = 30000000;
				//alert("??????- 10?????????");	
				if((inputPrice - tmp_grow_price) < 500000000){
					tmp_grow_price = 20000000;
				}
			} else if (inputPrice > 1000000000 && inputPrice <= 2000000000){
				tmp_grow_price = 50000000;
				//alert("??????- 20?????????");
				if((inputPrice - tmp_grow_price) < 1000000000){
					tmp_grow_price = 30000000;
				}
			} else if (2000000000 < inputPrice){
				tmp_grow_price = 100000000;
				//alert("??????- 20?????????");
				if((inputPrice - tmp_grow_price) < 2000000000){
					tmp_grow_price = 50000000;
				}
			} else {
				tmp_grow_price = $scope.lot.GROW_PRICE;
				//alert("??????- ????????? ??????");
			}
		}
		return tmp_grow_price;
	}
	
	$scope.returnOfflineHkGrowPrice = function(flag, inputPrice){
		var tmp_grow_price = 0;
		if(flag == 'up'){
			if (inputPrice < 10000){
				tmp_grow_price = 500;
				//alert("??????- 1?????????");
			}else if (inputPrice >= 10000 && inputPrice < 20000){
				tmp_grow_price = 1000;
				//alert("??????- 2?????????");
			}else if (inputPrice >= 20000 && inputPrice < 50000){
				tmp_grow_price = 2000;
				//alert("??????- 5?????????");
			}else if (inputPrice >= 50000 && inputPrice < 100000){
				tmp_grow_price = 5000;
				//alert("??????- 10?????????");
			}else if (inputPrice >= 100000 && inputPrice < 200000){
				tmp_grow_price = 10000;
				//alert("??????- 20?????????");
			}else if (inputPrice >= 200000 && inputPrice < 500000){
				tmp_grow_price = 20000;
				//alert("??????- 50?????????");
			}else if (inputPrice >= 500000 && inputPrice < 1000000){
				tmp_grow_price = 30000;
				//alert("??????- 1????????????");
			}else if (inputPrice >= 1000000 && inputPrice < 2000000){
				tmp_grow_price = 50000;
				//alert("??????- 2????????????");
			}else if (inputPrice >= 2000000 && inputPrice < 5000000){
				tmp_grow_price = 100000;
				//alert("??????- 3????????????");
			}else if (inputPrice >= 5000000 && inputPrice < 10000000){
				tmp_grow_price = 200000;
				//alert("??????- 5????????????");
			}else if (10000000 <= inputPrice){
				tmp_grow_price = 500000;
				//alert("??????- 1????????????");
			} else {
				tmp_grow_price = $scope.lot.GROW_PRICE;
				//alert("??????- ????????? ??????");
			}	
		}else{
			if (inputPrice <= 10000){
				tmp_grow_price = 500;
				//alert("??????- 1?????????");
			}else if (inputPrice > 10000 && inputPrice <= 20000){
				tmp_grow_price = 1000;
				//alert("??????- 2?????????");
				if((inputPrice - tmp_grow_price) < 10000){
					tmp_grow_price = 500;
				}
			}else if (inputPrice > 20000 && inputPrice <= 50000){
				tmp_grow_price = 2000;
				//alert("??????- 5?????????");
				if((inputPrice - tmp_grow_price) < 20000){
					tmp_grow_price = 1000;
				}
			}else if (inputPrice > 50000 && inputPrice <= 100000){
				tmp_grow_price = 5000;
				//alert("??????- 10?????????");
				if((inputPrice - tmp_grow_price) < 50000){
					tmp_grow_price = 2000;
				}
			}else if (inputPrice > 100000 && inputPrice <= 200000){
				tmp_grow_price = 10000;
				//alert("??????- 20?????????");
				if((inputPrice - tmp_grow_price) < 100000){
					tmp_grow_price = 5000;
				}
			}else if (inputPrice > 200000 && inputPrice <= 500000){
				tmp_grow_price = 20000;
				//alert("??????- 50?????????");
				if((inputPrice - tmp_grow_price) < 200000){
					tmp_grow_price = 10000;
				}
			}else if (inputPrice > 500000 && inputPrice <= 1000000){
				tmp_grow_price = 30000;
				//alert("??????- 1????????????");
				if((inputPrice - tmp_grow_price) < 500000){
					tmp_grow_price = 20000;
				}
			}else if (inputPrice > 1000000 && inputPrice <= 2000000){
				tmp_grow_price = 50000;
				//alert("??????- 2????????????");
				if((inputPrice - tmp_grow_price) < 1000000){
					tmp_grow_price = 30000;
				}
			}else if (inputPrice > 2000000 && inputPrice <= 5000000){
				tmp_grow_price = 100000;
				//alert("??????- 3????????????");
				if((inputPrice - tmp_grow_price) < 2000000){
					tmp_grow_price = 50000;
				}
			}else if (inputPrice > 5000000 && inputPrice <= 10000000){
				tmp_grow_price = 200000;
				//alert("??????- 5????????????");
				if((inputPrice - tmp_grow_price) < 5000000){
					tmp_grow_price = 100000;
				}
			}else if (10000000 < inputPrice){
				tmp_grow_price = 500000;
				//alert("??????- 1????????????");
				if((inputPrice - tmp_grow_price) < 10000000){
					tmp_grow_price = 200000;
				}
			} else {
				tmp_grow_price = $scope.lot.GROW_PRICE;
				//alert("??????- ????????? ??????");
			}	
		}
		return tmp_grow_price;
	}
	
});

app.controller('saleCertCtl', function($scope, consts, common, $interval, input, locale, $filter) {
	$scope.sale = input.sale;
	$scope.parent = input.parent;
	$scope.sale_cert = $scope.parent.sale_cert;
	$scope.callBack = input.callBack;
	
	$scope.close = function(){
		if($scope.parent.refreshLots) $scope.parent.refreshLots();
		if($scope.parent.runLotsRefresh) $scope.parent.runLotsRefresh();
		$scope.parent.modal.close();
		
 		if(($scope.parent.sale_cert.CNT || 0) <= 0) setCookie('sale_cert_cancel', true); //??????????????? ????????? ????????? ?????????.
 		else if($scope.callBack) $scope.callBack(input);
	}
	
	var $e = function(){
	   	$scope.is_processing = false;
	}
	
	var $s = function(data, status) {
		$scope.is_processing = false;
	};
	
	var finalRefresh = function(){
		$scope.is_processing = false;
	}
	
	$scope.hp1s = ["010", "011", "016", "017", "018", "019"];  	  	  	  	   	  	       		

	$scope.form_data = {"can_auth": false};
	$scope.form_data.auth_num = null;
	$scope.auth_req_btn_txt = "??????????????????";
	$scope.checkHpAuth = {"valid" : false, "message":"", "check": ""};

	$scope.authNumRequest = function() {
		
//		$scope.chkAgree = $("input:checkbox[id='chkAgree']").is(":checked") == true;
		
//		console.log($scope.chkAgree);
		
		var checkboxLen = $("input:checkbox[name=agreeCert_checkbox]").length; //???????????? ?????? ??????
		var checkedLen = $("input:checkbox[name=agreeCert_checkbox]:checked").length; //????????? ??????
		
		if(checkboxLen != checkedLen){
			alert($scope.locale == 'ko'? "????????? ?????? ??????????????????." : "Please agree to all the terms and conditions." );
			return;
		} else {
			if(($scope.form_data.hp2 == null || $scope.form_data.hp2 == '')){
				alert("????????? ????????? ??????????????????");
				return;
			}  
			if(($scope.form_data.hp3 == null || $scope.form_data.hp3 == '')){
				alert("????????? ????????? ??????????????????");
				return;
			}  
		}

		
    	$scope.form_data.can_auth = false;

    	$scope.form_data.auth_num = null;
		$interval.cancel($scope.timer_duration);

    	$scope.checkHpAuth.message = "";
		$scope.form_data.hp = $scope.form_data.hp1 + "-" + $scope.form_data.hp2 + "-" + $scope.form_data.hp3;

		$d = {"to_phone":$scope.form_data.hp , "bid_auth" : true , "sale_no" : $scope.sale.SALE_NO };

		common.callAPI('/join/send_auth_num', $d,
			function(data, status) {
				try {

					if(data.AUTH_EXISTS){
						alert(
							$scope.locale == 'ko'?
								'?????? ????????? ???????????????.\n' +
								'?????? ???????????? ???????????? ???????????? ??? ?????? ?????????????????? ????????????.'
								:
								"This number is already authorized.\n" +
								"Please log-in again with the first authenticated ID and start bidding."
						);
						return;
					}

					$scope.form_data.can_auth = true;

					$scope.auth_num_send_status = data.SEND_STATUS;
					$scope.auth_end_time = moment(new Date()).add(120, 'seconds');
					if($scope.auth_num_send_status){
						$scope.timer_duration = $interval($scope.setAuthDuration, 1000);
						console.log("======> set timer");
					}
					$scope.auth_req_btn_txt = "???????????? ?????????";
				}
				catch(err) {
					$scope.auth_num_send_status = false;
				}
			}
		);
	}
	
	$scope.checkboxAll = function(){ 
		if($("#agreeCert_checkbox_all").prop("checked")){
			$("input:checkbox[name=agreeCert_checkbox]").prop("checked", true);
		}else{
			$("input:checkbox[name=agreeCert_checkbox]").prop("checked", false);
		}
	}
	
	$scope.authNumConfirm = function() {
		
		if($scope.form_data.auth_num == null || $scope.form_data.auth_num == '') {
			$scope.checkHpAuth.message = "??????????????? ????????????.";
			return;
		}
		
		
		var is_same_hp = (($scope.sale_cert.HP || '').replace(/[^\d]/g, "") == $scope.form_data.hp.replace(/[^\d]/g, ""));
		$d = {"sale_no": $scope.sale.SALE_NO, "hp": $scope.form_data.hp, "done_cd": (is_same_hp ? "no_modify" : "un_modify"), "auth_num": $scope.form_data.auth_num};
		
		common.callAPI('/join/confirm_auth_num4sale', $d, 
			function(data, status) {
				if(data && data.resultCode == 0) {
					$scope.checkHpAuth.message ="????????? ?????? ???????????????.";
					$scope.checkHpAuth.check = "ok";
					
					$scope.parent.sale_cert.CNT = 1;

					if(!is_same_hp){
						if(confirm("??????????????? ?????????????????? ???????????? ????????????.\n???????????? ?????????????????? ?????????????????????????")){
					 		$d = {"actionList":[
					 				{"actionID":"sale_cert_hp_mod", "actionType":"update" , "tableName": "CERT", "parmsList":[{"hp": $scope.form_data.hp, "sale_cert_no": data.tables.CERT.rows[0].sale_cert_no}]}
					 			 ]};
					 		
					 	   	common.callActionSet($d, function(){
					 	   		$scope.parent.sale_cert.HP = $scope.form_data.hp;
					 	   	}, null, $scope.close);
						}else{
							$scope.close();
						}
					}else{
						$scope.close();
					}
				}else {
					$scope.checkHpAuth.message ="????????? ?????? ???????????????. ?????? ?????? ?????????.";
					$scope.checkHpAuth.check = "";
				}
				$scope.checkHpAuth.valid = data;
	   		}
		, null, function() {
			$interval.cancel($scope.timer_duration);
			console.log("======> cancel timer");
			$scope.form_data.auth_num = null;
		});
	}
	
	$scope.getHpAuthMsg = function() {
		return $scope.checkHpAuth.message;
	}
	
	$scope.setAuthDuration = function() {
 		var f = 'm:s';
    	var s = moment($scope.auth_end_time).diff(moment(new Date()), 'seconds');
    	if(s > 0) {
    		$scope.checkHpAuth.message = "???????????? : " + moment.duration(s, "seconds").format(f);
    	}
    	else if (s == 0) {
    		//$scope.duraionEnd();
    		$scope.form_data.can_auth = false;
    		$scope.checkHpAuth.message = "0";
    		$interval.cancel($scope.timer_duration);
    		console.log("======> cancel timer");
    		common.callAPI('/join/clear_auth_num', {}, function(){
    			$scope.checkHpAuth.message = "?????? ????????? ?????????????????????. ?????? ?????? ?????????.";
    		});
    	}
    }
	
});






