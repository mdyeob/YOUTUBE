<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="video.Video" %>
<%@ page import="video.VideoDAO" %>
<%@ page import="java.util.ArrayList" %>

<jsp:useBean id="video" class="video.Video" scope="page" />
<jsp:setProperty name="video" property="userID" />
<jsp:setProperty name="video" property="videoID" />

<%
	String userID = null;
	if(session.getAttribute("userID") != null) {
		userID = (String) session.getAttribute("userID");
		VideoDAO videoDAO = new VideoDAO();
		int result = videoDAO.write(userID, video.getVideoID());
	}

%>
