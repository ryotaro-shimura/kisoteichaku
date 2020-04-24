package kisoteichaku;

import java.io.Serializable;

public class BusyoInfo implements Serializable {

	private String busyoId;
	private String busyoName;


	public String getBusyoId() {
		return busyoId;
	}

	public void setBusyoId(String busyoId) {
		this.busyoId = busyoId;
	}

	public String getBusyoName() {
		return busyoName;
	}

	public void setBusyoName(String busyoName) {
		this.busyoName = busyoName;
	}

	public String toString() {
		return "BusyoInfo [busyoId=" + busyoId + ", busyoName=" + busyoName + "]";
	}
}
