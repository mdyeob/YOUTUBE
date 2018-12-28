<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="EUC-KR"%>
<%@ page import="java.io.PrintWriter" %>
<%
	String userID = null;
	
	if (session.getAttribute("userID") != null){
		userID = (String)session.getAttribute("userID");
	}//세션이 존재하는경우 userID 가 값을 갖도록 한다.
	if(userID != null){
		
	}//로그인이 된경우 페이지 튕김
	else{
	   
	   /*PrintWriter script = response.getWriter();
	   script.println("<script>");
	   script.println("alert('권한이 없습니다. 메인으로 이동합니다.')");	   
	   script.println("</script>");*/
}
	
%>