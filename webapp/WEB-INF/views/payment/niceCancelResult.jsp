<%@ page contentType="text/html; charset=euc-kr"%>
<%@ page import="kr.co.nicevan.nicepay.adapter.web.NicePayHttpServletRequestWrapper"%>
<%@ page import="kr.co.nicevan.nicepay.adapter.web.NicePayWEB"%>
<%@ page import="kr.co.nicevan.nicepay.adapter.web.dto.WebMessageDTO"%>

<%

/** 1. Request Wrapper Ŭ������ ����Ѵ�.  */ 
NicePayHttpServletRequestWrapper httpRequestWrapper = new NicePayHttpServletRequestWrapper(request);
//httpRequestWrapper.addParameter("testFlag" ,"TRUE");


/** 2. ���� ����Ϳ� �����ϴ� Web �������̽� ��ü�� �����Ѵ�.*/
NicePayWEB nicepayWEB = new NicePayWEB();

/** 2-1. �α� ���丮 ���� */
nicepayWEB.setParam("NICEPAY_LOG_HOME","/wwwroot/ipg_adaptor_log/log");

/** 2-2. �̺�Ʈ�α� ��� ����(0: DISABLE, 1: ENABLE) */
nicepayWEB.setParam("APP_LOG","1");

/** 2-3. ���ø����̼Ƿα� ��� ����(0: DISABLE, 1: ENABLE) */
nicepayWEB.setParam("EVENT_LOG","1");

/** 2-4. ��ȣȭ�÷��� ����(N: ��, S:��ȣȭ) */
nicepayWEB.setParam("EncFlag","S");

/** 2-5. ���񽺸�� ����(���� ���� : PY0 , ��� ���� : CL0) */
nicepayWEB.setParam("SERVICE_MODE", "CL0");



/** 3. ������� ��û */
WebMessageDTO responseDTO = nicepayWEB.doService(httpRequestWrapper,response);

/** 4. ��Ұ�� */
String resultCode = responseDTO.getParameter("ResultCode"); // ����ڵ� (���� :2001(��Ҽ���), 2002(���������), �� �� ����)
String resultMsg = responseDTO.getParameter("ResultMsg");   // ����޽���
String cancelAmt = responseDTO.getParameter("CancelAmt");   // ��ұݾ�
String cancelDate = responseDTO.getParameter("CancelDate");     // �����
String cancelTime = responseDTO.getParameter("CancelTime");   // ��ҽð�
String cancelNum = responseDTO.getParameter("CancelNum");   // ��ҹ�ȣ
String payMethod = responseDTO.getParameter("PayMethod");   // ��� ��������
String mid = 	responseDTO.getParameter("MID");              // ���� ID
String tid = responseDTO.getParameter("TID");               // TID

%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>NICEPAY :: ������� ���</title>
<link rel="stylesheet" href="/css/basic.css" type="text/css" />
<link rel="stylesheet" href="/css/style.css" type="text/css" />
</head>
<body>
<br>
<table width="632" border="0" cellspacing="0" cellpadding="0" align="center">
  <tr>
  	<td >
  	  <table width="632" border="0" cellspacing="0" cellpadding="0" class="title">
        <tr>
          <td width="35">&nbsp;</td>
          <td>��� ���</td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td align="left" valign="top" background="/images/payment/bodyMiddle.gif"><table width="632" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="35" height="10">&nbsp;</td> <!--��ܿ��� ���� 10px -->
        <td width="562">&nbsp;</td>
        <td width="35">&nbsp;</td>
      </tr>
      <tr>
        <td height="30">&nbsp;</td>
        <td>��� ��û�� �Ϸ�Ǿ����ϴ�.
        </td> 
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="15">&nbsp;</td> <!--�������� ������ ���� ���� 15px-->
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="30">&nbsp;</td> 
        <td class="bold"><img src="/images/payment/bullet.gif" /> ��ҳ����� Ȯ���ϼ���.
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td >&nbsp;</td>
        <td ><table width="562" border="0" cellspacing="0" cellpadding="0" class="talbeBorder" >
          <tr>
            <!-- ���̺� �Ϲ��� ���̴� 30px // Ȧ���༿�� ��� class="thead01" ��� -->
            <td width="100" height="30" id="borderBottom" class="thead01">�ŷ� ���̵�</td> 
            <td id="borderBottom" >&nbsp;<%=tid %></td>
          </tr>
          <tr>
            <!-- ���̺� �Ϲ��� ���̴� 30px // Ȧ���༿�� ��� class="thead01" ��� -->
            <td width="100" height="30" id="borderBottom" class="thead02">���� ����</td> 
            <td id="borderBottom" >&nbsp;<%=payMethod%></td>
          </tr>
          <tr>
            <!-- ���̺� �Ϲ��� ���̴� 30px // ¦���༿�� ��� class="thead01" ��� -->
            <td width="100" height="30" id="borderBottom" class="thead01">��� ����</td> 
            <td id="borderBottom" >&nbsp;[<%=resultCode%>] <%=resultMsg%></td>
          </tr>
          <tr>
            <td width="100" height="30" id="borderBottom" class="thead02">��� �ݾ�</td> 
            <td id="borderBottom" >&nbsp;<%=cancelAmt %></td>
          </tr>
		
		</table></td>
      <tr>
        <td height="15"></td>  <!--�������� ������ ���� ���� 15px-->
        <td >&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td></td>
        <td class="comment">��Ұ� ������ ��쿡�� �ٽ� ���λ��·� ���� �� �� �����ϴ�..        
        </td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="10"></td>  <!--�ϴܿ��� ���� 10px -->
        <td >&nbsp;</td>
        <td>&nbsp;</td>
      </tr>  
    </table></td>
  </tr>
  <tr>
    <td><img src="/images/payment/bodyBottom.gif" /></td>
  </tr>
</table>
</body>
</html>