<%@ page language="java" contentType="text/html; charset=euc-kr"%> 
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
<title>NICEPAY :: ���� ��� ��û</title>
<link rel="stylesheet" href="/css/basic.css" type="text/css" />
<link rel="stylesheet" href="/css/style.css" type="text/css" />
<script language="javascript">
<!--
function goCancel() {
	
	var formNm = document.tranMgr;
	
	// TID validation
	if(formNm.TID.value == "") {
		alert("TID�� Ȯ���ϼ���.");
		return ;
	} else if(formNm.TID.value.length > 30 || formNm.TID.value.length < 30) {
		alert("TID ���̸� Ȯ���ϼ���.");
		return ;
	}
	// ��ұݾ�
	if(formNm.CancelAmt.value == "") {
		alert("�ݾ��� �Է��ϼ���.");
		return ;
	} else if(formNm.CancelAmt.value.length > 12 ) {
		alert("�ݾ� �Է� ���� �ʰ�.");
		return ;
	}
	
	if(formNm.PartialCancelCode.value == '1'){
		if(formNm.TID.value.substring(10,12) != '01' &&  formNm.TID.value.substring(10,12) != '02' &&  formNm.TID.value.substring(10,12) != '03'){
			alert("�ſ�ī�����, ������ü, ������¸� �κ����/�κ�ȯ���� �����մϴ�");
			return false;
		}
	}
	
	formNm.submit();
	
}

-->
</script>
</head>
<body>
<br>
<form name="tranMgr" method="post" action="niceCancelResult.jsp">
<table width="632" border="0" cellspacing="0" cellpadding="0" align="center">
  <tr>
  	<td >
  	  <table width="632" border="0" cellspacing="0" cellpadding="0" class="title">
        <tr>
          <td width="35">&nbsp;</td>
          <td>��� ��û</td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td align="left" valign="top" background="/images/payment/bodyMiddle.gif"><table width="632" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="35" height="10">&nbsp;</td>
        <td width="562">&nbsp;</td>
        <td width="35">&nbsp;</td>
      </tr>
      <tr>
        <td height="30">&nbsp;</td>
        <td>��� ��û �����Դϴ�. </td> 
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="15">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="30">&nbsp;</td> 
        <td class="bold"><img src="/images/payment/bullet.gif" /> ������ �����Ͻ� �� Ȯ�ι�ư�� �����ֽʽÿ�.
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td >&nbsp;</td>
        <td ><table width="562" border="0" cellspacing="0" cellpadding="0" class="talbeBorder" >

		  <tr>
            <td width="100" height="30" id="borderBottom" class="thead02">* MID</td> 
            <td id="borderBottom" ><input name="MID" type="text" value="nictest00m" size="30" maxlength="30"/></td>
          </tr>	
          <tr>
            <td width="100" height="30" id="borderBottom" class="thead01">* TID</td> 
            <td id="borderBottom" ><input name="TID" type="text" value="" size="30" maxlength="30"/></td>
          </tr>
          <tr>
            <td width="100" height="30" id="borderBottom" class="thead02">* ��ұݾ�</td> 
            <td id="borderBottom" ><input name="CancelAmt" type="text" value=""/></td>
          </tr>
          <tr>
            <td width="100" height="30" id="borderBottom" class="thead01">* ��һ���</td> 
            <td id="borderBottom" ><input name="CancelMsg" type="text" value="�� ��û"/></td>
          </tr>
          <tr>
		  		<td width="100" height="30" id="borderBottom" class="thead02">* ��� �н�����</td> 
				<td id="borderBottom" ><input name="CancelPwd" type="password" value="" size="30" maxlength="30"/></td>
			   </tr>
			</tr>
			<tr>
            <th height="50" class="thead01">* �κ���� ����</th> 
            <td>
              <table width="100%" height="50px" cellpadding="0px" cellspacing="0px">
                <tr>
                  <td width="185px">
                    <select name="PartialCancelCode" style="width:160px;">
					  <option value="0">��ü ���</option>
					  <option value="1">�κ� ���</option>
			  		</select>
				  </td>
                  <td width="273px" class="red"><span class="redBold">0</span> : ��ü���<br /><span class="redBold">1</span> : �κ����</td>
                </tr>
			  </table>
            </td>
          </tr>
        </table></td>
        <td height="15">&nbsp;</td>
      </tr>
      <tr>
      	<td height="60"></td>
        <td class="btnCenter"><input type="button" value="����ϱ�" onClick="goCancel();"></td> 
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="15"></td> 
        <td >&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td></td>
        <td class="comment">* ǥ �׸��� �ݵ�� �������ֽñ� �ٶ��ϴ�.<br><br/>
        <span class="bold">��Ұ� �̷���� �Ŀ��� �ٽ� �ǵ��� �� ������ ���� �����Ͻñ� �ٶ��ϴ�.</span><br/>
        </td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="10"></td> 
        <td >&nbsp;</td>
        <td>&nbsp;</td>
      </tr>  
    </table></td>
  </tr>
  <tr>
    <td><img src="/images/payment/bodyBottom.gif" /></td>
  </tr>
</table>
</form>
</body>
</html>
