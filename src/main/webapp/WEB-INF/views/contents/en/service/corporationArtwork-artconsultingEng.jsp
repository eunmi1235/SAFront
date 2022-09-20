﻿<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<jsp:include page="../../../include/header.jsp" flush="false"/>

<body>
<jsp:include page="../../../include/topSearch.jsp" flush="false"/>

<div id="wrap">
	<jsp:include page="../../../include/topMenu.jsp" flush="false"/>
	<div class="container_wrap">
		<div class="shadow left"><span class="corner"></span></div>
		<div class="shadow right"><span class="sp_txt img_logo_v"><span class="hidden">&copy; SeoulAuction Corp.</span></span></div>
		<div id="container">
			<div class="sub_menu_wrap menu03 artcon_submenu">
				<div class="sub_menu">
					<jsp:include page="../../include/artconsultingSubMenu.jsp" flush="false"/>
				</div>    
				<button type="button" class="m_only btn_submenu"><span class="hidden">메뉴보기</span></button>
			</div>
			<!-- //sub_menu_wrap -->   
 
			<div class="contents_wrap">
				<div class="contents"> 
					<div class="tit_h2 artcon_tit_h2">
						<h2>Art Consulting</h2> 
					</div>   
					
					
					<div class="storage_cont title_area artcon_wrapbox">     
						<div class="line line_mar"></div>   
						<div class="title"></div> 

						<div class="storage_cont corp storage_cont_marnon"> 
							<div class="artcon_wrap">	  
								<div class="artcon_marketing_infobox artcon_marketing_infobox_en">  
									<p>  
										Seoul Auction offers individual consulting on the arts/culture marketing that best matches the corporation’s characteristics as well as any other concerns that the corporation may have regarding the arts and culture.
									</p> 
								</div>
								
								<div class="artcon_marketing_infobox artcon_marketing_infobox_en">
									<ul class="artcon_listbox">  
										<li class="artcon_list_tit">Expected benefits</li>   
										<li><i class="material-icons" style="font-size:13px;">check</i>Setting PR/marketing strategies for the arts and culture that best suit the company’s characteristics</li>  
										<li><i class="material-icons" style="font-size:13px;">check</i>Development of new projects for companies that are related to the art market</li>  
										<li><i class="material-icons" style="font-size:13px;">check</i>Capability-building and/or creativity enhancement for employees through arts/culture lectures</li>
										<li><i class="material-icons" style="font-size:13px;">check</i>Changes in corporate culture through partnership with Seoul Auction</li>
										<li><i class="material-icons" style="font-size:13px;">check</i>And many more</li> 
									</ul>    
								</div>
							</div> 
							<!-- 배너 슬라이드 ->
							<div class="sub_banner02" id="slides"> 
								<a href="" class="sp_btn slidesjs-previous slidesjs-navigation"><span class="hidden">이전</span></a>
								<a href="" class="sp_btn slidesjs-next slidesjs-navigation"><span class="hidden">다음</span></a>
								<div><img src="/images/img/artcon/artconlist_03.jpg" alt="문화예술을 활용한 VIP 고객 마케팅" /></div>
								<div><img src="/images/eng/img/img_corp_banner01.jpg" alt="문화예술을 활용한 VIP 고객 마케팅" /></div>
								<div><img src="/images/eng/img/img_corp_banner01.jpg" alt="문화예술을 활용한 VIP 고객 마케팅" /></div>
							</div> -->
							
							<!-- 배너 1개 일 때 -->
	                        <div class="col12 last" style="padding-top:10px; overflow:hidden"> 
	                            <img src="/images/img/artcon/artconsulting.jpg" alt="banner" style="width:100%;"/>
	                        </div> 
                        </div> 
					</div>  
					
					<div class="box_gray type01">   
						<div class="contact"> 
							<div class="title">Contact</div>  
							<div class="info">   
								<div class="highlight">PR & Marketing <strong>H.H KIM</strong></div>  
								<div class="tel"><strong class="tit">Tel</strong><a href="tel:+82 (0)2-2075-4435"><span>+82 (0)2-2075-4435</span></a></div>  
								<div class="email"><strong class="tit">E-mail</strong><a href="mailto:hyunhee@seoulauction.com">hyunhee@seoulauction.com</a></div>
							</div> 
						</div>
						<div class="right">
							<span class="btn_style01 icon02"><a href="/customer/inquiryForm" class="fix">1대1 문의</a><span class="ico next02"></span></span>
						</div>  
					</div> 
					
				</div>   
			</div> <!-- //contents_wrap --> 
		</div>
	</div>

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

		// 20150623
		maxH();
		$(window).resize(function() {
			$('.both_cont > div .inner').css('height', 'auto');
			maxH();
		});
		function maxH() {
			if ($(window).width() > 767) {
				$('.both_cont > div .inner').each(
						function() {
							var maxHeight = Math.max($(this).parent().parent()
									.height());
							$(this).css('height', maxHeight + 'px');
						});
			} else {
				$('.both_cont > div .inner').css('height', 'auto');
			}
		}
	</script>
</div>
<!-- //#wrap -->
<jsp:include page="../../../include/footer_in.jsp" flush="false" />
<jsp:include page="../../../include/footer.jsp" flush="false" />