

//var searchSyain = function(){
//	location.href='./SyainInfo.html'
//};

var getSyainData = function(){
//	console.log('click');
//	//入力された社員情報
//	var inputSyainId = $('#syainId').val();
//	var inputBusyoName = $('#busyoName').val();
//	var inputName = $('#name').val();

//	if(inputName.indexof(json.syainName) !== -1){
//		inputName = json.syainName;
//	}

//	console.log(inputBusyoName);
//	console.log(inputSyainId);
//	console.log(inputName);

	var requestQuery1 = {
			syainId :inputSyainId
//			busyoName: inputBusyoName,
//			 syainName: inputName
	};

//	var requestQuery2 = {
//			 busyoName: inputBusyoName
//	};
//
//	var requestQuery3 = {
//			 syainName: inputName
//	};

	//サーバーからデータを取得する
	$.ajax({
		type:'GET',
		url: '/kisoteichaku/SyainSearch',
		dataType :'json',
		data :requestQuery1,//requestQuery2,requestQuery3,
		success :function(json){
			console.log(json);
			$('#syainId').html(json.syainId);
			$('#syainName').html(json.syainName);
		},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			alert('データの通信に失敗しました。')
		}
	});
	location.href='./SyainInfo.html'
}

$(document).ready(function(){
	$('#search-button').click(getSyainData);
	//$('#search-button').click(searchSyain);

});


