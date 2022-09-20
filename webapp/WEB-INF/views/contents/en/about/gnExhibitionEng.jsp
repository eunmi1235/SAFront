<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<jsp:include page="../../../include/header.jsp" flush="false"/>

<body>
<jsp:include page="../../../include/topSearch.jsp" flush="false"/>

<div id="wrap">
	<jsp:include page="../../../include/topMenu.jsp" flush="false"/>
	<div class="container_wrap">

		<div id="container"> 
			<div class="sub_menu_wrap menu03">
				<div class="sub_menu">
					<jsp:include page="../../include/gangSubMenu.jsp" flush="false"/>
				</div> 
				<button type="button" class="m_only btn_submenu"><span class="hidden">메뉴보기</span></button>
			</div> 
			<!-- //sub_menu_wrap --> 

			<div class="contents_wrap">   
				<div class="contents">  
                    <div class="tit_h2"> 
						<h2>Gangnam Center Exhibition</h2>
					</div> 
 					<!-- 전시썸네일 이미지 슬라이드 -->       
					<div class="sub_banner02" id="slides">
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
                    <!-- <div class="exhibition_img_box">     
                     	<img src="/images/img/gnag/img_banner29.jpg" alt="강남전시 배너" style="margin-bottom: 10px;"/>                
                    </div> -->
<%--                    <div class="exhibition_img_box">     --%>
<%--                     	<img src="/images/img/gnag/img_banner33.jpg" alt="강남전시 배너" />--%>
<%--                    </div>--%>
                    
                    <div class="storage_cont title_area">   
                    	<div class="exhibition_firstbox"> 
							<div class="title" style="margin-bottom: 10px;">
								<p>Gangnam Center Exhibition</p>
								<h3 style="margin-top:10px; font-weight: 800;">Seoul Auction Art Week</h3>
							</div>  
							<p style="line-height:30px; font-size:16px;">
								30th(Tue) Aug  - 12th(Mon) Sept, 2022 | 10am-7pm (1,5F)<br>
								30th(Tue) Aug  - 6th(Tue) Sept, 2022 (6F)<br>
								ART NIGHT: 30th(Tue) Aug  - 3rd(Sat) Sept, 2022 | 11am-9pm<br>
								Seoul Auction Gangnam Center 1,5,6F<br>
								(864, Eonju-ro, Gangnam-gu, Seoul, Korea)
							</p>         
	                        <!--<a href="/currentExhibit?sale_kind=exhibit_only&sale_no=637" class="btn_main_more green exhibiton_listbtn" >LIST</a> 
							<a href="https://www.seoulauction.com/nas_img/front/homepage/e-book/mariKim/index.html" class="btn_main_more green exhibiton_listbtn" target="_blank" >CATALOGUE</a>      
	                        <a href="https://www.seoulauction.com/service/page?view=auction360VRPop_ex"  class="btn_main_more green" style="margin-top:15px;margin-bottom:15px; padding: 15px 45px 17px;font-size: 18px; font-weight:700; color:#FFF; width:120px;" target="new" >EXHIBITION</a> -->
                       	</div>  
                        <div style="border-top: #CCC solid 1px; padding-top: 20px;">               
							<div style="line-height:27px; text-align: justify;">           
                            	<p style="margin-bottom: 15px;">
									Seoul Auction Art Week<br><br>

									Seoul Auction introduces an exhibition &lt;Seoul Auction Art Week&gt;, celebrating contemporary and modern art as an auction house representing the art market in Korea.<br><br>

									&lt; Seoul Auction Art Week&gt; will be held on the total of three floors in the Seoul Auction Gangnam Center. Please visit and enjoy a variety of collections of the works of Korean Modern Arts, emerging young artists, contemporary masterpieces, and contemporary Korean crafts.<br><br>

										The first floor will feature the Bridge – From K Art section, introducing Korean artists playing a role as a bridge connecting the Korean and the global art market, such as Woo KukWon and Kim SunWoo. The exhibition will also feature sculptures by leading artists from Japan, Yayoi Kusama and Yoshitomo Nara.<br><br>

										On the fifth floor, you can enjoy the Object v.2 exhibition introducing four Korean crafts artists; Kim Junsu, Kim Minwook, Im Jungjoo, Kim Hojung, each working with leather, wood, and ceramics. Also, we present works by Korean masters such as Ha ChongHyun and Lee Ufan, who have led and influenced the Korean art market. We hope you experience such a diverse collection that encompasses both Korean modern art and contemporary crafts.<br><br>
										The exhibition on the sixth floor will feature paintings by artists from all over the world, including Nicolas Party, Yayoi Kusama, Yoshitomo Nara, and Andy Warhol.<br><br>

										Also, we invite you to enjoy free drinks during ART NIGHT from August 30th to September 3rd. Visit the Seoul Auction Art Week exhibition and feel the energy and fresh inspiration from art.
									</p>
<%--								<p style="margin-bottom: 15px;">--%>
<%--								The color of light, full of warmth and joy--%>
<%--                                </p>--%>
<%--                                <p style="margin-bottom: 15px;">--%>
<%--									Yellow is the color of light. This vibrant and energetic color that holds therapeutic power fills my earliest memories with radiance.--%>
<%--                                </p>--%>
<%--								<p style="margin-bottom: 15px;">--%>
<%--									To me, colors are like notes of music: just as notes of different pitches together make up a song, the repetition and differences of colors make up my works. These colors are passages and doors to an unknown world.--%>
<%--								</p>--%>
							</div> 
                            <!-- <p style="font-size:12px; margin-top: 20px;">       
                               <strong>Artists</strong><br/>   
                                David Hockney, George Condo, Julian Opie, Mel Bochner, Yayoi Kusama,<br/> 
                                Ha ChongHyun, Kim TschangYeul, Kwon YoungWoo, Lee Bae, Lee UFan, Park SeoBo, Yee SooKyung, Yoo YoungKuk, etc...<br/> 
                                x<br/> 
                                Børge Mogensen, Charles & Ray Eames, Charlotte Perriand, Hans J.wegner, Johannes Andersen,<br/> 
                                Peter Hvidt & Orla Mølgaard-Nielsen, Kai Kristiansen, Niels Otto Møller, etc...
                            </p> -->  
                        </div>    
                        
						
						<!--<div class="btns mt10">   
							<span class="btn_style01">
								<a href="/about/page?view=location" target="_blank" title="Location">Seoul Auction Location</a>
							</span>
						</div>-->  

						<div class="box_gray type01">
							<div class="contact">  
								<div class="title">Contact</div>     
								<div class="info"> 
									<div class="highlight">Gangnam Center <strong>Sunny Jung</strong></div>
									<div class="tel"><strong class="tit">Tel</strong> <span>+82 (0)2-2075-4423 </span></div>
                                    <div class="email"><strong class="tit">E-mail</strong> <a href="mailto:jsj@seoulauction.com">jsj@seoulauction.com</a></div>
								</div>     
							</div>  
							<!-- <div class="right">  
								<span class="btn_style01 icon02"><a href="/customer/inquiryForm" class="fix">Inquiry</a><span class="ico next02"></span></span>
							</div> -->
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
								<div class="title">Gangnam Center</div>
								<!-- 20150608 -->
								<div class="cont">
									<dl>
										<dt>Road name</dt>
										<dd>864, Eonju-ro, Gangnam-gu, Seoul, Republic of Korea</dd>
									</dl>
									<dl class="bus">
										<dt><img src="/images/icon/bus.jpg" style="width:60px; height:auto;"/></dt>
										<dd>										
											<div>
												<div class="tit"><strong>Shingu Middle school</strong></div>
												<div class="txt"></div>
											</div>
											<div>
												<div class="tit"><strong>Hyundai APT</strong></div>
												<div class="txt"></div>
											</div>
										</dd>
									</dl>
									<dl class="subway">
										<dt><img src="/images/icon/subway.jpg" style="width:60px; height:auto;"/></dt>
										<dd>
											<div class="metro3"><span>Line 3</span> <strong>Apgujeong Station</strong></div> 
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
	</script>
</div>
<!-- //#wrap -->
<jsp:include page="../../../include/footer_in.jsp" flush="false" />
<jsp:include page="../../../include/footer.jsp" flush="false" />  