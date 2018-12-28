<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.PrintWriter"%>
<%@ page import="video.Video"%>
<%@ page import="video.VideoDAO"%>
<%@ page import="videoCount.VideoCount"%>
<%@ page import="videoCount.VideoCountDao"%>
<%@ page import="java.util.ArrayList"%>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<%
String userID = "";
userID = (String) session.getAttribute("userID"); 

%>


<aside id="sidebar">
	<div class="toggle-btn" onclick="toggleSidebar()">
		<span></span> <span></span> <span></span>
	</div>
	<div id="">
		<ul class="lnb">
			<form action="viewInsert.jsp" method="post">
				<%
					VideoDAO videoDAO = new VideoDAO();
					ArrayList<Video> list = videoDAO.getList(userID);
					VideoCountDao videoCountDao = new VideoCountDao();
					for(int i = 0; i < list.size(); i++){
				%>

			<li>
				<ol>
					<a href="javascript:fnShowVideo('<%=list.get(i).getVideoID()%>')">
					<img src="https://i.ytimg.com/vi/<%=list.get(i).getVideoID()%>/default.jpg"></a>
					<%
						ArrayList<VideoCount> countlist = videoCountDao.getCountList(list.get(i).getVideoID(), userID);		
						for(int j = 0 ; j < countlist.size(); ++j) {						
							
					%>
					<ol>
						<a href="javascript:fnShowVideo('<%=countlist.get(j).getVideoID()%>?start=<%=countlist.get(j).getVideoPauseTime()%>')"><%=countlist.get(j).getVideoID()%></a>
					</ol>	
					<%
						}
					%>	
					</a>	
				</ol>					
				<ol>
					
				</ol>			
			</li>


			<%
				}
			%>
		</form>
		</ul>
	</div>
</aside>

<script src="vendor/jquery/common.js"></script>