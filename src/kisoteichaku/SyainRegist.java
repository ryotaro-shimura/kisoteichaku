package kisoteichaku;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class SyainRegist
 */
@WebServlet("/SyainRegist")
public class SyainRegist extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public SyainRegist() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);

		response.setContentType("text/html;charset=UTF-8");
		// request parameter
		String syainId = request.getParameter("syainId");
		String syainName = request.getParameter("syainName");
		String syainAge = request.getParameter("syainAge");
		String syainGender = request.getParameter("syainGender");
		String syainAddress = request.getParameter("syainAddress");
		String busyoName = request.getParameter("busyoName");
		String engageDate = request.getParameter("engageDate");
		String retireDate = request.getParameter("retireDate");

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
		String sql ="INSERT INTO TR_SYAIN \n" +
				"(SYAIN_ID, SYAIN_NAME, SYAIN_AGE, SYAIN_GENDER, SYAIN_ADDRESS,  \n" +
				"DEPARTMENT, ENGAGE_DATE, RETIRE_DATE) \n" +
				"VALUES \n" +
				"('"+syainId+"', '"+syainName+"', '"+syainAge+"', '"+syainGender+"', '"+syainAddress+"',   \n" +
				" '"+busyoName+"', '"+engageDate+"', '"+retireDate+"') "
		;

		System.out.println(sql);

		// エラーが発生するかもしれない処理はtry-catchで囲みます
		// この場合はDBサーバへの接続に失敗する可能性があります
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(url, user, pass);
				// SQLの命令文を実行するための準備をおこないます
				Statement stmt = con.createStatement();
			// SQL実行後の処理内容
			) {

			// SQLの命令文を実行し、その結果をint型のresultCountに代入します
			int resultCount = stmt.executeUpdate(sql);
			System.out.println(resultCount);

		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}

		// アクセスした人に応答するためのJSONを用意する
					PrintWriter pw = response.getWriter();
					// JSONで出力する
					pw.append(new ObjectMapper().writeValueAsString("ok"));


	}

}
