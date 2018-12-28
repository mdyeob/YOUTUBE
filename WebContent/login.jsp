<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

<head> 
	<jsp:include page="include/title.jsp" flush="false"/> 
</head>

<body>
		
	<jsp:include page="include/header.jsp" flush="false"/> 
	
	<div class="container">
		<div class="col-lg-12"></div>
		<div class="col-lg-12">
			<div class="jumbotron" id="block"  >
				<form method="post" action="loginAction.jsp">
					<h3 style="text-align: center;"> 로그인 화면 </h3>
					<div class="form-group">
						<input type="text" class="form-control" placeholder="아이디" name="userID" maxlength="20">
					</div>
					
					<div class="form-group">
						<input type="password" class="form-control" placeholder="비밀번호" name="userPassword" maxlength="20">
					</div>
					<input type="submit" class="btn btn-primary form-control" value="로그인">
				</form>
			</div>
		</div>
	</div>
	  
     

	<jsp:include page="include/footer.jsp" flush="false"/>
</body>
</html>

