package videoCount;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class VideoCountDao {

	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;

	public VideoCountDao() {
		try {
			String dbURL = "jdbc:mysql://localhost:3306/YOUTUBE?serverTimezone=UTC&useSSL=false";
			String dbID = "root";
			String dbPassword = "mysql123";
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL, dbID, dbPassword);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public ArrayList<VideoCount> getCountList(String videoID, String userID) {
		String SQL = "SELECT videocount.videoID, videocount.userID, videocount.cnt, video.videoDate, videocount.videoPauseTime \r\n" + 
					 "  FROM videocount \r\n" + 
					 "INNER JOIN video ON videocount.videoID = video.videoID \r\n" + 
					 "   AND videocount.userID = video.userID \r\n" + 
					 "WHERE videocount.videoID = ? AND videocount.userID = ? ORDER BY video.videoDate DESC LIMIT 1;";
		ArrayList<VideoCount> list = new ArrayList<VideoCount>();
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, videoID);
			pstmt.setString(2, userID);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				VideoCount videoCount = new VideoCount();
				videoCount.setVideoID(rs.getString(1));
				videoCount.setUserID(rs.getString(2));
				videoCount.setCnt(rs.getInt(3));
				videoCount.setVideoDate(rs.getDate(4));				
				videoCount.setVideoPauseTime(rs.getString(5));
				list.add(videoCount);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;

	}
	
	
	public int getCount(String userId, String videoID) {
		String SQL = "SELECT count(*) FROM videocount WHERE userID = ? AND videoID = ?;";
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userId);
			pstmt.setString(2, videoID);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				// VideoCount videoCount = new VideoCount();
				return rs.getInt(0);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return -1; // 데이터베이스 오류
	}

	public int getInsertCount(String userID, String videoID) {
		String SQL = "INSERT INTO videocount (videoID, userID, cnt) VALUES(?, ?, ?)";
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userID);
			pstmt.setString(2, videoID);
			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return -1; // 데이터베이스 오류

	}

	public int getUpdateCount(String userID, String videoID, int cnt) {
		String SQL = "UPDATE videocount SET cnt = ? WHERE `videoID` = ? AND `userID` = ?;";
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userID);
			pstmt.setString(2, videoID);
			pstmt.setInt(3, cnt);
			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return -1; // 데이터베이스 오류

	}

}
