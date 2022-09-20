<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<jsp:include page="../../include/header.jsp" flush="false"/>
<body>
<jsp:include page="../../include/topSearch.jsp" flush="false"/>

<div id="wrap">
	<jsp:include page="../../include/topMenu.jsp" flush="false"/>

	<div class="container_wrap">
		<div id="container">   
			<div class="sub_menu_wrap menu03"> 
				<div class="sub_menu">
					<jsp:include page="../include/gangSubMenu.jsp" flush="false"/>
				</div> 
				<button type="button" class="m_only btn_submenu"><span class="hidden">메뉴보기</span></button>
			</div>
			<!-- //sub_menu_wrap -->
  
			<div class="contents_wrap">    
				<div class="contents">
					<div class="tit_h2">    
						<h2>강남센터 Exhibition</h2>
					</div>     
					<!-- 전시썸네일 이미지 슬라이드 -->
					 <div class="sub_banner02 exhibition_info_banner" id="slides">
						<a href="" class="sp_btn slidesjs-previous slidesjs-navigation"><span class="hidden">이전</span></a>
						<a href="" class="sp_btn slidesjs-next slidesjs-navigation"><span class="hidden">다음</span></a>

						<div><img src="/images/img/gnag/20220826_01.jpg" alt="gangnam" /></div>
						<div><img src="/images/img/gnag/20220826_02.jpg" alt="gangnam" /></div>
						 <div><img src="/images/img/gnag/20220826_03.jpg" alt="gangnam" /></div>
						 <div><img src="/images/img/gnag/20220826_04.jpg" alt="gangnam" /></div>
						 <div><img src="/images/img/gnag/20220826_05.jpg" alt="gangnam" /></div>
						 <div><img src="/images/img/gnag/20220826_06.jpg" alt="gangnam" /></div>
					 </div>

					<!-- 전시썸네일 이미지 단일 -->
<%--                    <div class="exhibition_img_box">--%>
<%--                     	<img src="/images/img/gnag/img_banner29.jpg" alt="강남전시 배너" style="margin-bottom: 10px;"/>--%>
<%--                    </div>  --%>
<%--                    <div class="exhibition_img_box">--%>
<%--                     	<img src="/images/img/gnag/img_banner33.jpg" alt="강남전시 배너" />--%> 
<%--                    </div>--%>

					<div class="storage_cont title_area">
						<div class="exhibition_firstbox">
							<div class="title" style="margin-bottom: 10px;">
								<p>강남센터 전시기획</p>
								<h3 style="margin-top:10px; font-weight:800;">Seoul Auction Art Week</h3>
							</div>
							<p style="line-height:30px; font-size:16px;">
								2022. 08. 30 (화) - 09. 12 (월) | 10am - 7pm (1,5F)<br>
								2022. 08. 30 (화) - 09. 06 (화) (6F)<br>
								ART NIGHT: 2022. 08. 30 (화) - 09. 03 (토) | 11am - 9pm<br>
								서울옥션 강남센터 1,5,6F<br>
								(서울특별시 강남구 언주로 864)
							</p>
	                        <!--<a href="/currentExhibit?sale_kind=exhibit_only&sale_no=637" class="btn_main_more green exhibiton_listbtn">작품보기</a>
                            <a href="https://www.seoulauction.com/nas_img/front/homepage/e-book/mariKim/index.html" class="btn_main_more green exhibiton_listbtn" target="_blank" >도록보기</a>
	                         <a href="https://www.seoulauction.com/service/page?view=auction360VRPop_ex"  class="btn_main_more green" style="margin-top:15px;margin-bottom:15px; padding: 15px 45px 17px;font-size: 18px; font-weight:700; color:#FFF; width:120px;" target="new" >전시장 보기</a>  -->
	                    </div>
                        <div style="border-top: #CCC solid 1px; padding-top: 20px;">
                        	<div style="line-height:30px; text-align: justify; font-size:16px;">
                            	<p style="margin-bottom: 15px;">
									Seoul Auction Art Week<br><br>

									2022년 뜨거운 미술시장의 열기를 대변하듯 무더운 더위가 한창인 8월, 서울옥션이 한국 미술 시장을 대표하는 옥션하우스로서 현대 미술의 현재를 보여주는 전시 &lt;Seoul Auction Art Week&gt;를 선보입니다.<br><br>

									이번 &lt;Seoul Auction Art Week&gt;는 서울옥션 강남센터 내 총 3개 층에서 진행됩니다. 한국 미술시장을 이끌어왔던 국내 거장들의 작품들부터 현재 집중된 관심을 받고 있는 국내외 현대 미술 작품들, 그리고 한국 현대 공예 작품들까지 다양한 컬렉션을 직접 만나실 수 있습니다.

										1층에서는 쿠사마 야요이, 요시토모 나라 등 세계 미술 시장을 주도하는 해외 조각 작품뿐만 아니라, 우국원, 김선우 등 앞으로의 미술시장을 선도할 국내 작가들의 Bridge – From K Art 섹션을 만나실 수 있습니다.<br><br>

										5층에서는 미술시장을 이끌어 온 하종현, 이우환 등 한국 거장들의 현대 미술 작품뿐만 아니라, 도자, 나무, 가죽 각 물성을 대표하는 한국 공예 작가 4인의 object v.2 전시 또한 감상하실 수 있습니다. 2021 로에베 재단 공예상 파이널리스트에 선정된 김준수, 김민욱 작가와 통나무를 깎아 완성하는 임정주 작가, 그리고 한 폭의 추상화 같은 도자 작업을 하는 김호정 작가까지 다양한 공예 작가들의 서로 다른 매력을 느끼실 수 있습니다. 한국 현대회화의 흐름을 보여주는 대표 작가와 현재 국내외에서 뜨거운 관심을 받고 있는 공예 작가들을 아우르는 전시를 감상 해보시기를 바랍니다.
										6층의 전시에서는 니콜라스 파티, 쿠사마 야요이, 요시토모 나라, 앤디 워홀, 등 현재 세계적인 작가들의 회화 작품들을 한자리에서 선보입니다.<br><br>

										또한, 8월 30일부터 9월 3일 까지는 특별 개장 시간으로 ART NIGHT을 운영하며 프리 드링크를 제공합니다. 이번 &lt;Seoul Auction Art Week&gt; 전시에 방문하셔서 더욱 풍성한 여름 밤의 Art Week를 즐기시기를 바라며, 다채로운 예술이 주는 활기와 신선한 영감을 느껴 볼 수 있는 시간이 되시기를 바랍니다.
								</p>
<%--                                <p style="margin-bottom: 15px;">--%>
<%--									하태임 작가의 작업에서 캔버스에 칠해진 각각의 색은 고유한 상징과 의미로서 존재합니다. 컬러밴드 하나하나에 인간의 사고와 정서, 느낌과 기분을 감각적으로 구현해 이야기를 담아내는데, 묽게 탄 물감에 붓을 적셔 느린 호흡으로 천천히 칠하고 그것이 온전히 마르기를 기다린 후 또 똑 같은 호흡으로 그 위에 다시 붓질을 하는 수행과도 같은 작업을 통해 하나의 작품이 완성됩니다.--%>

<%--								</p>--%>
<%--                                <p style="margin-bottom: 15px;">--%>
<%--									이번 전시를 위해 작가는 그 동안 작품 속에서 보여주었던 다양한 컬러들 중 노란색 컬러를 택했습니다. ‘Yellow’라는 주조색을 통해 작가가 캔버스 위에 풀어내는 고유의 상징과 의미들을 함께 느껴 볼 수 있는 시간이 되기를 바랍니다.--%>
<%--								</p>--%>
								<%-- <p style="font-weight: bold; margin-bottom: 15px;">
									관람예약: 02-545-0330<br>
									전시운영시간: 10am – 7pm
								</p> --%>
							</div>
                        </div>

                        <!-- <p style="font-size: 12px; margin-top: 20px;">
                        	<strong>참여작가</strong><br/>
							음하영, 안소현, 우국원, 김재용, 장형선, 김보민, 지니리, 허수연, 이정인, 노보
                        </p> -->

						<div class="box_gray type01">
							<div class="contact">
								<div class="title">문의 Contact</div>
								<div class="info">
									<div class="highlight">전시기획팀 <strong>정선정 선임</strong></div>
									<div class="tel"><strong class="tit">Tel</strong> <span>02-2075-4423</span></div>
                                    <div class="email"><strong class="tit">E-mail</strong> <a href="mailto:jsj@seoulauction.com">jsj@seoulauction.com</a></div>
								</div>
							</div>
                           <!-- <div class="right">
								<span class="btn_style01 icon02"><a href="/customer/inquiryForm" class="fix">1대1문의</a><span class="ico next02"></span></span>
							</div>  -->
						</div>
					</div>

                    <div class="storage_cont">
						<div class="tit_h3 through">
							<h3>Location</h3>
						</div>

						<div class="map_area">
							<div class="left">
								<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12655.621508400407!2d127.03040534787746!3d37.533727752054204!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x20893aab0caffe0c!2zKOyjvCnshJzsmrjsmKXshZgg6rCV64Ko7IKs7JilIFNlb3VsIEF1Y3Rpb24gR2FuZ25hbSBCcmFuY2g!5e0!3m2!1sko!2skr!4v1547529016843" width="500" height="350" frameborder="0" style="border:0"></iframe>
							</div>
							<div class="right">
								<div class="title">강남센터</div>
								<!-- 20150608 -->
								<div class="cont">
									<dl>
										<dt>지번주소</dt>
										<dd>서울특별시 강남구 신사동 636-4<span style="display: block; line-height: 1.5;">(주차장 이용 시, 신사동 636-6)<span></dd>
									</dl>
									<dl>
										<dt>도로명주소</dt>
										<dd>서울특별시 강남구 언주로 864</dd>
									</dl>
									<dl class="bus">
										<dt><img src="/images/icon/bus.jpg" style="width:60px; height:auto;"/></dt>
										<dd>
											<div>
												<div class="tit"><strong>신구중학교 정류장</strong></div>
												<div class="txt"></div>
											</div>
											<div>
												<div class="tit"><strong>압구정파출소 정류장</strong></div>
												<div class="txt"></div>
											</div>
											<div>
												<div class="tit"><strong>현대아파트 정류장(압구정역근처)</strong></div>
												<div class="txt"></div>
											</div>
										</dd>
									</dl>
									<dl class="subway">
										<dt><img src="/images/icon/subway.jpg" style="width:60px; height:auto;"/></dt>
										<dd>
											<div class="metro3"><span>3호선</span> <strong>압구정역</strong></div>
                                            <div class="txt">2번 출구<br/>
												출구에서 뒤로 돌아나와 압구정로 대로에서 직진.<br/>압구정 중학교 근처 큰사거리에서 우회전 <br/>횡단보도 건너세요. 도보 약 10분 (약590m)
											</div>
										</dd>
									</dl>
								</div>
								<!-- //20150608 -->
							</div>
						</div>
                	</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 20150521 -->
	<script>
		$(function() {
			$('#slides').slidesjs({
				height : 400,
				navigation : false,
				start : 1,
				play : {
					auto : true
				}
			});
		});
	</script>

	<script>
		$('.exhibition_info_banner .slidesjs-slide').css('display','flex'); 
	</script>
	<!-- //20150521 -->
</div>
<!-- //#wrap -->
<jsp:include page="../../include/footer_in.jsp" flush="false" />
<jsp:include page="../../include/footer.jsp" flush="false" />