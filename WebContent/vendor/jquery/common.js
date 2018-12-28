var youtubeKey="AIzaSyAhgHTI1iVaAxthMcR_AbAyYv87Kqm-ffM";
var list = new Array('PLFgquLnL59alGJcdc0BEZJb2p7IgkL0Oe', 'PL8fVUTBmJhHIhZgiV1aErkd-k8oc8JVfy', 'PLHPTxTxtC0ibeqedQVSN5gV0e7ruI4fxA', 'PL3ZQ5CpNulQmHeHSWEaerU546MDZrQDr6' );
// list index 0: music, 1: sports, 2: movie


/* show video in one page */
/* show video in one page */
function fnShowVideo(sGetToken, startTime){
	 // alert(arg);
	// 추가할 태그
	//console.log(sGetToken+" : " + bMain + " : common.js");
	
	
	//$('.conn').hide()
	
	//var sGetToken2 = sGetToken+"?start="+startTime;
	var sGetToken2 = sGetToken;
	console.log(sGetToken2+" : common.js");	
	console.log("https://www.youtube.com/embed/"+sGetToken2+"autoplay=1"+" : common.js");
	
	var getTag = $("#view").html() ;
	
	var insTag = "<iframe width='560' height='315' src='https://www.youtube.com/embed/"+sGetToken2+"?autoplay=1' id='yellow_ifm'></iframe>";
	
	$.ajax({
		url: "include/viewInsert.jsp",
		type: "POST",
		data: "videoID=" + sGetToken2 ,
		success: function(data) {videoID = data;},		
	});
	
	
	// dom Id가 test인 항목 하단에 tag 를 삽입한다.
	$("#view").html(insTag) ;
}



function playVideo(idNum)
{
	console.log('#dummyid'+idNum);
	$('#demo_button').blur();
	
	
	
	/*$('#dummyid0').bind('click', function() {						
		//$('#dummyid0').next().focus();
		alert("실행"); 
		//$('.ytp-large-play-button.ytp-button').click();
	});*/
	//alert("실행1"); 
	$('#dummyid' +idNum).click();
	setTimeout(function() {
		//alert("실행2"); 
		//$('.dummyid'+idNum).css("border","3px solid red");
		$('.dummyid'+idNum).click();
	}, 3000);
	
	//$('#dummyid0').trigger('click');

	/*
	//$('#dummyid0').focus();
	*/
	

	
}

/* youtube category list & search list */
function fnList(arg, sGetToken){ 	
	var sTargetUrl= "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=";
	var element = document.body;
	var argParam = arg+2;
	
	$(".navbar-nav li").removeClass("active"); 
	$(".navbar-nav li:nth-child("+argParam+")").addClass("active");
	
	switch (arg){ // 0: music, 1: sports, 2: movie, 3: news, 4: games, 5:
					// search
	case 0 : // element.classList.add("sub01");element.classList.remove("sub00");
	case 1 : 
	case 2 :
	case 3 :
		sTargetUrl = sTargetUrl +list[arg];				
		break;		
	
	case 4:
		var $getval = "게임";
		sTargetUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance"
	    	+ "&q="+ encodeURIComponent($getval);
		break;	
		
	case 5:		
		var $getval = $("#search_box").val();
		
		if($getval==""){
			alert("검색어를 입력하세요.");
			$("#search_box").focus();
			return;
	    }
		sTargetUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance"
	    	+ "&q="+ encodeURIComponent($getval);
		break;
	case 6:
		// 발표할때 서버주소로 바꾸면됨
		sTargetUrl = "http://localhost:8080/YOUTUBE/main.jsp";
		break;
	case 7:
		playVideo(0);
		return ;
	case 8:
		playVideo(1);
		return ;
	case 9:
		playVideo(2);
		return ;
	case 10:
		playVideo(3);
		return ;
	case 11:
		playVideo(4);
		return ;

	}
	
	sTargetUrl = sTargetUrl +"&key="+youtubeKey;
	
   
   $("#get_view").empty();
   $("#nav_view").empty();
   
   if(sGetToken){
   	sTargetUrl += "&pageToken="+sGetToken;
   }
   
   
   $.ajax({
   	type: "POST",
       url: sTargetUrl,
       dataType: "jsonp",
       success: function(jdata) {
          console.log(jdata);

          $(jdata.items).each(function(i){
        	  
			  
        	  if($getval == null){
        		  $("#get_view").append("<button id='dummyid"+i+ "' onclick='javascript:fnShowVideo(\""+this.snippet.resourceId.videoId+"\",\"0\");'>클릭</button>");
    			  $("#dummyid"+i).hide(); 
				  //console.log("#dummyid"+i);
          		  $("#get_view").append("<p class='box'><a class='dummyid"+i+"' href='javascript:fnShowVideo(\""+this.snippet.resourceId.videoId+"\",\"0\");'style='color:black; font-weight:bold;'><img src='"+this.snippet.thumbnails.default.url+"'><span>"+this.snippet.title+"</span></a></p>");
          	   }
        	  else{          
        		  $("#get_view").append("<button id='dummyid"+ i+ "' onclick='javascript:fnShowVideo(\""+this.id.videoId+"\",\"0\");'>클릭</button>");
    			  $("#dummyid"+i).hide(); 
          		   $("#get_view").append("<p class='box'><a href='javascript:fnShowVideo(\""+this.id.videoId+"\" ,\"0\");'style='color:black; font-weight:bold;'><img src='"+this.snippet.thumbnails.default.url+"'><span >"+this.snippet.title+"</span></a></p>");
          	   }
          	   // fnShowVideo(arg)
             }).promise().done(function(){
          	   if(jdata.prevPageToken){
          		   $("#nav_view").append("<a href='javascript:fnList("+arg+",\"" +jdata.prevPageToken+"\");'><input type='button' value='이전페이지' class='button'></a>");
                }
          	   if(jdata.nextPageToken){
          		   $("#nav_view").append("<a href='javascript:fnList("+arg+",\"" +jdata.nextPageToken+"\");'><input type='button' value='다음페이지' class='button'></a>");
                }
             });
          },
       
       error:function(xhr, textStatus) {
       	console.log(xhr.responseText);
       	alert("지금은 시스템 사정으로 인하여 요청하신 작업이 이루어지지 않았습니다.\n잠시후 다시 이용하세요.[2]");
           return;
       }
   });   

}

/* button enterkey */
function chkEnter() {
	
	if (event.which || event.keyCode) {
		
        if ((event.which == 13) || (event.keyCode == 13)) {
        	document.getElementById("btnenter").click();
            return false;
        }
    }
	
    else {
    	return true;
    }
}

/* side bar */
function toggleSidebar(){
	document.getElementById("sidebar").classList.toggle('active');
	document.body.classList.toggle('active');
}






