package videoCount;

import java.util.Date;

public class VideoCount {
	
	private int countIdx;
	private String videoID;
	private String userID;
	private int cnt;
	private Date videoDate;
	private String videoPauseTime;
	private String makeURL;
		
	public int getCountIdx() {
		return countIdx;
	}
	public void setCountIdx(int countIdx) {
		this.countIdx = countIdx;
	}
	public String getVideoID() {
		return videoID;
	}
	public void setVideoID(String videoID) {
		this.videoID = videoID;
	}
	public Date getVideoDate() {
		return videoDate;
	}
	public void setVideoDate(Date videoDate) {
		this.videoDate = videoDate;
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public int getCnt() {
		return cnt;
	}
	
	public void setCnt(int cnt) {
		this.cnt = cnt;
	}
	
	public String getVideoPauseTime() {
		return videoPauseTime;
	}
	
	public void setVideoPauseTime(String videoPauseTime) {
		this.videoPauseTime = videoPauseTime;
	}
	
	public String getMakeURL()
	{		
		return makeURL;
	}
	
	public void setMakeURL(String videoID, String videoPauseTime) {		
		this.makeURL  = videoID  + videoPauseTime;
	}

}
