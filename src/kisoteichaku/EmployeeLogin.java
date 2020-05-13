package kisoteichaku;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class EmployeeLogin
 */
@WebServlet("/EmployeeLogin")
public class EmployeeLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public EmployeeLogin() {
        super();
        // TODO Auto-generated constructor stub
    }


	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		response.setContentType("text/html;charset=UTF-8");
		HttpSession session = request.getSession(true);
		String status = (String) session.getAttribute("login");
		PrintWriter pw = response.getWriter();
		String id = request.getParameter("id");
		String passcode = request.getParameter("pass");

		//DBにアクセスし、認証情報テーブルから社員IDとパスワードを取得
		// JDBCドライバの準備
			try {
			    // JDBCドライバのロード
			    Class.forName("oracle.jdbc.driver.OracleDriver");

			} catch (ClassNotFoundException e) {
			    // ドライバが設定されていない場合はエラーになります
			    throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
			}

			// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
			String url = "jdbc:oracle:thin:@localhost:1521:XE";
			String user = "kisoteichaku";
			String pass = "kisoteichaku";

			// 実行するSQL文
			String sql ="SELECT \n" +
						"	SY.SYAIN_ID, \n" +
						"	SY.PASSWORD, \n" +
						"	SY.AUTHORITY \n" +
						"FROM \n" +
						"	TR_SYONIN SY \n" +
						"WHERE \n" +
						"	1=1 \n" +
						"	AND SY.SYAIN_ID = '"+id+"' \n"
			;
			System.out.println(sql);
			UserIdentifying userInfo = new UserIdentifying();
			// エラーが発生するかもしれない処理はtry-catchで囲みます
			// この場合はDBサーバへの接続に失敗する可能性があります
			try (
					// データベースへ接続します
					Connection con = DriverManager.getConnection(url, user, pass);
					// SQLの命令文を実行するための準備をおこないます
					Statement stmt = con.createStatement();

					// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
					ResultSet rs1 = stmt.executeQuery(sql);
				// SQL実行後の処理内容
				) {

				if(rs1.next()) {

					userInfo.setSyainId(rs1.getString("SYAIN_ID"));
					userInfo.setPassword(rs1.getString("PASSWORD"));
					userInfo.setAuthority(rs1.getString("AUTHORITY"));
				}
				if(passcode.equals(userInfo.getPassword())){
					System.out.println("パスワードはあってる");
					session.setAttribute("login","ok");
					System.out.println((String) session.getAttribute("login"));
					session.setAttribute("employeeId",userInfo.getSyainId());
					System.out.println((String) session.getAttribute("employeeId"));
					session.setAttribute("authority",userInfo.getAuthority());
					System.out.println((String) session.getAttribute("authority"));

				}else {
						pw.append(new ObjectMapper().writeValueAsString("ログイン情報が不正です。"));
				}
				pw.append(new ObjectMapper().writeValueAsString(status));
			} catch (Exception e) {
				throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
			}
			//System.out.println(status);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub



	}

}
