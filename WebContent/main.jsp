<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

	<head>
	 
		<jsp:include page="include/title.jsp" flush="false"/>
		<!--<jsp:include page="include/lnb.jsp" flush="false" />-->
		
			<%
	          	String userID = null;
	    		if(session.getAttribute("userID") != null) {
	    			userID = (String) session.getAttribute("userID");
	    		}
          		if(userID != null){    	
          		
          	%>
			<jsp:include page="include/lnb.jsp" flush="false"/>
			<%
          		}
          	%>
          	
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
   	<script src="http://code.jquery.com/jquery-3.3.1.js"
		integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
		crossorigin="anonymous"></script>
	<script src="vendor/jquery/test.js"></script>
	</head>
	
	<body>
		<jsp:include page="include/header.jsp" flush="false"/>
		<div class="conn">		    
			<main>
				<div id ="view" style="text-align:center"></div>  	      				
       			<div id="get_view"></div>
				<div id="nav_view"></div>				
		    </main>
       	</div>
		<jsp:include page="include/footer.jsp" flush="false"/>
	    </div>
	</body>
	

</html>