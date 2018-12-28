package video;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class VideoDAO {

	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;

	public VideoDAO() {
		try {
			String dbURL = "jdbc:mysql://localhost:3306/YOUTUBE?serverTimezone=UTC&useSSL=false";
			String dbID = "root";
			String dbPassword = "940330";
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(dbURL, dbID, dbPassword);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public ArrayList<Video> getList(String userId) {
		String SQL = "SELECT DISTINCT videoID FROM video WHERE userID=? ORDER BY videoDate LIMIT 10;";
		ArrayList<Video> list = new ArrayList<Video>();
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userId);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				Video video = new Video();
				video.setVideoID(rs.getString(1));
				list.add(video);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;

	}
	
	public int write(String userID, String videoID) {
		String SQL = "INSERT INTO video (userID,videoID,videoDate) VALUES(?, ?, now())";
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userID);
			pstmt.setString(2, videoID);	
			return pstmt.executeUpdate();			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return -1; // 데이터베이스 오류
		
	}


}
