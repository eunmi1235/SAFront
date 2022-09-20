﻿<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<jsp:include page="../../include/header.jsp" flush="false"/>
<link href="<c:url value="/css/old/common.css" />" rel="stylesheet">
<%-- YDH 추가 시작--%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<script type="text/javascript" src="/js/angular/paging.js"></script>    
<body>
<jsp:include page="../../include/topSearch.jsp" flush="false"/>

<div id="wrap"> 
	<jsp:include page="../../include/topMenu.jsp" flush="false"/>

	<div class="container_wrap">
		<div class="shadow left"><span class="corner"></span></div>
		<div class="shadow right"><span class="sp_txt img_logo_v"><span class="hidden">&copy; SeoulAuction Corp.</span></span></div>
		<div id="container"> 
			<div class="sub_menu_wrap menu03 artcon_submenu"> 
				<div class="sub_menu">
					<jsp:include page="../include/artconsultingSubMenu.jsp" flush="false"/>
				</div> 
				<button type="button" class="m_only btn_submenu"><span class="hidden">메뉴보기</span></button>
			</div>
			<!-- //sub_menu_wrap -->  
			
			<div class="contents_wrap">
				<div class="contents"> 
					<div class="tit_h2 artcon_tit_h2">
						<h2>아트 컨설팅</h2>
					</div> 
					
					<div class="storage_cont title_area artcon_wrapbox artcon_wrapbox">   
						<div class="line line_mar"></div>   
						<div class="title"></div>    

						<div class="storage_cont corp storage_cont_marnon">	
							<div class="artcon_contentswrap artcon_wrap">    
								<div class="artcon_marketing_infobox">  
									<p> 
										1:1 비즈니스 컨설팅을 통해 기업 특성에 맞는 문화예술 마케팅에 대한 고민을 서울옥션과 함께 나눠보십시오.   
									</p>
								</div>
								
								<div class="artcon_marketing_infobox">
									<ul class="artcon_listbox">    
										<li class="artcon_list_tit">내용 및 기대효과</li>       
										<li><i class="material-icons" style="font-size:13px;">check</i>기업 특성에 최적화된 맞춤형 문화예술 홍보·마케팅 전략 설정</li>  
										<li><i class="material-icons" style="font-size:13px;">check</i>미술시장과 연계한 기업의 신규 사업개발</li>  
										<li><i class="material-icons" style="font-size:13px;">check</i>문화예술 강연을 통한 직원 역량강화 및 창의성 제고</li>
										<li><i class="material-icons" style="font-size:13px;">check</i>서울옥션과의 파트너십을 통한 기업문화 변화 도모</li>   
									</ul>  
								</div>  
								
								<!-- 배너 슬라이드 ->
								<div class="sub_banner02" id="slides"> 
									<a href="" class="sp_btn slidesjs-previous slidesjs-navigation"><span class="hidden">이전</span></a>
									<a href="" class="sp_btn slidesjs-next slidesjs-navigation"><span class="hidden">다음</span></a>
									<div><img src="/images/eng/img/img_corp_banner01.jpg" alt="기업미술품" /></div>
									<div><img src="/images/eng/img/img_corp_banner01.jpg" alt="기업미술품" /></div>
									<div><img src="/images/eng/img/img_corp_banner01.jpg" alt="기업미술품" /></div>
								</div>	--> 
								
								<!-- 배너 1개 일 때 -->
		                        <div class="col12 last" style="padding-top:10px; overflow:hidden"> 
		                            <img src="/images/img/artcon/artconsulting.jpg" alt="banner" style="width:100%;"/>
		                        </div>
							</div>   
						</div>  
							  
                        <div class="box_gray type01">
							<div class="contact">   
								<div class="title">문의 Contact</div> 
								<div class="info">     
									<div class="highlight">서울옥션 홍보마케팅팀 <strong>김현희 팀장</strong></div>    
									<div class="tel"><strong class="tit">Tel</strong><a href="tel:02-2075-4435"><span>02-2075-4435</span></a></div>  
									<div class="email"><strong class="tit">E-mail</strong><a href="mailto:hyunhee@seoulauction.com">hyunhee@seoulauction.com</a></div> 
								</div>
							</div>
							<div class="right">
								<span class="btn_style01 icon02"><a href="/customer/inquiryForm" class="fix">1대1 문의</a><span class="ico next02"></span></span>
							</div>    
						</div>    
					</div>
				</div>
			</div> 
			<!--<div class="sub_banner">
				<div class="hidden_box">
					<ul>
						<li>
							<img src="/images/img/img_menu03.jpg" alt="" class="img_master">
						</li>
					</ul>
				</div>
			</div>-->
		</div>
	</div>
	<!-- 20150521 -->
	<script>
		$(function() {
			$('#slides').slidesjs({
				height : 400,//??
				navigation : false,
				start : 1,
				play : {
					auto : true
				}
			});
		});
		maxH();
		$(window).resize(function(){
			$('.both_cont > div .inner').css('height', 'auto'); 
			maxH();
		});		
		function maxH(){
			if($(window).width() > 767){	
				$('.both_cont > div .inner').each(function(){
					var maxHeight = Math.max($(this).parent().parent().height());
					$(this).css('height', maxHeight + 'px');
				});
			} else {
				$('.both_cont > div .inner').css('height','auto');
			}
		}
	</script>
	<!-- //20150521 -->
</div>
<!-- //#wrap -->
<jsp:include page="../../include/footer_in.jsp" flush="false" />
<jsp:include page="../../include/footer.jsp" flush="false" />