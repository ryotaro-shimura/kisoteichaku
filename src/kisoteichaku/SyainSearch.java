package kisoteichaku;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class SyainSearch
 */
@WebServlet("/Syain/Search")
public class SyainSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public SyainSearch() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		response.setContentType("text/html;charset=UTF-8");

		String syainId = request.getParameter("syainId");
		String syainName = request.getParameter("syainName");
		String  busyoName = request.getParameter("busyoName");

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
						"	SY.SYAIN_NAME, \n" +
						"	SY.SYAIN_AGE, \n" +
						"	SY.SYAIN_GENDER, \n" +
						"	SY.SYAIN_ADDRESS, \n" +
						"	BU.BUSYO_ID, \n" +
						"	BU.BUSYO_NAME, \n" +
						"	SY.ENGAGE_DATE, \n" +
						"	SY.RETIRE_DATE \n" +
						"	 \n" +
						"FROM \n" +
						"	TR_SYAIN SY, \n" +
						"	MS_BUSYO BU \n" +
						"WHERE \n" +
						"	1=1 \n" +
						"	AND (BU.BUSYO_NAME = SY.DEPARTMENT OR BU.BUSYO_ID = SY.BUSYO_ID)\n";
						if(!syainId.equals("")){
							sql += " AND SY.SYAIN_ID = '"+syainId+"'";
						}
						if(!busyoName.equals("")){
								sql += "AND BU.BUSYO_NAME = '"+busyoName+"'";
						}
						if(!syainName.equals("")){
								sql += " AND SY.SYAIN_NAME LIKE '%"+syainName+"%'";
						}
						sql += "ORDER BY \n" +
								"	SY.SYAIN_ID \n"
						;

				System.out.println(sql);
				;//上のSQLをif文を使って書き直す
				//"+syainId+"AND (SY.SYAIN_ID = '"+syainId+"' OR SY.SYAIN_NAME = '"+syainName+"' OR BU.BUSYO_NAME = '"+busyoName+"')
				//SY.SYAIN_NAME = '"+syainName+"%'  BU.BUSYO_NAME = '"+busyoName+"'

				List<SyainInfo> syainList = new ArrayList<>();

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


					while(rs1.next()) {

						SyainInfo syain = new SyainInfo();

						syain.setSyainId(rs1.getString("SYAIN_ID"));
						syain.setSyainName(rs1.getString("SYAIN_NAME"));
						syain.setBusyoName(rs1.getString("BUSYO_NAME"));
						syain.setSyainAge(rs1.getString("SYAIN_AGE"));
						syain.setSyainGender(rs1.getString("SYAIN_GENDER"));
						syain.setSyainAddress(rs1.getString("SYAIN_ADDRESS"));
						syain.setBusyoId(rs1.getString("BUSYO_ID"));
						syain.setBusyoName(rs1.getString("BUSYO_NAME"));
						syain.setEngageDate(rs1.getString("ENGAGE_DATE"));
						syain.setRetireDate(rs1.getString("RETIRE_DATE"));

						syainList.add(syain);
					}


				} catch (Exception e) {
					throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
				}
					// アクセスした人に応答するためのJSONを用意する
					PrintWriter pw = response.getWriter();
				// JSONで出力する
				pw.append(new ObjectMapper().writeValueAsString(syainList));

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
