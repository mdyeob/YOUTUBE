<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="user.UserDAO" %>
<%@ page import="java.io.PrintWriter" %>

<% request.setCharacterEncoding("UTF-8"); %>
<jsp:useBean id="user" class="user.User" scope="page" />
<jsp:setProperty name="user" property="userID" />
<jsp:setProperty name="user" property="userPassword" />
<!DOCTYPE html>
<html>

<head>  	
		<jsp:include page="include/title.jsp" flush="false"/> 
</head>

<body>
	 
	
	<%
		session.invalidate();
	%>
	<script>
		location.href = 'main.jsp';
	</script>
	  
     

	
</body>
</html>

