<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="EUC-KR"%>
<%@ page import="java.io.PrintWriter" %>
<%
	String userID = null;
	
	if (session.getAttribute("userID") != null){
		userID = (String)session.getAttribute("userID");
	}//������ �����ϴ°�� userID �� ���� ������ �Ѵ�.
	if(userID != null){
		
	}//�α����� �Ȱ�� ������ ƨ��
	else{
	   
	   /*PrintWriter script = response.getWriter();
	   script.println("<script>");
	   script.println("alert('������ �����ϴ�. �������� �̵��մϴ�.')");	   
	   script.println("</script>");*/
}
	
%>