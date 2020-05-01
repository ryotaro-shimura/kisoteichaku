package kisoteichaku;

import java.io.Serializable;

public class SyainInfo implements Serializable {

	private String syainId;
	private String syainName;
	private String syainAge;
	private String syainGender;
	private String syainAddress;
	private String busyoId;
	private String busyoName;
	private String engageDate;
	private String retireDate;
	private String department;
//	private String url;

	public String getSyainId() {
		return syainId;
	}
	public void setSyainId(String syainId) {
		this.syainId = syainId;
	}
	public String getSyainName() {
		return syainName;
	}
	public void setSyainName(String syainName) {
		this.syainName = syainName;
	}
	public String getSyainAge() {
		return syainAge;
	}
	public void setSyainAge(String syainAge) {
		this.syainAge = syainAge;
	}
	public String getSyainGender() {
		return syainGender;
	}
	public void setSyainGender(String syainGender) {
		this.syainGender = syainGender;
	}
	public String getSyainAddress() {
		return syainAddress;
	}
	public void setSyainAddress(String syainAddress) {
		this.syainAddress = syainAddress;
	}
	public String getBusyoId() {
		return busyoId;
	}
	public void setBusyoId(String busyoId) {
		this.busyoId = busyoId;
	}
//	public String getUrl() {
//		return url;
//	}
//	public void setUrl(String url) {
//		this.url = url;
//	}

	public String getBusyoName() {
		return busyoName;
	}
	public void setBusyoName(String busyoName) {
		this.busyoName = busyoName;
	}
	public String getEngageDate() {
		return engageDate;
	}
	public void setEngageDate(String engageDate) {
		this.engageDate = engageDate;
	}
	public String getRetireDate() {
		return retireDate;
	}
	public void setRetireDate(String retireDate) {
		this.retireDate = retireDate;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	@Override

	public String toString() {
		return "SyainInfo [syainId=" + syainId + ", syainName=" + syainName + ",syainAge =" +syainAge + ", syainGender=" +syainGender + ",syainAddress="
				+ syainAddress + ", busyoId=" + busyoId + "]";
	}

}
