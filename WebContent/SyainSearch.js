var searchSyain = function(){
	console.log('click');
	//入力された商品コード
	var inputSyainId = $('#syainId').val();
	var inputBusyoName = $('#busyoName').val();
	var inputName = $('#name').val();

	if(inputName.indexof(json.syainName) !== -1){
		inputName = json.syainName;
	}

	console.log(inputBusyoName);
	console.log(inputSyainId);
	console.log(inputName);

	var requestQuery = {
			syainId :inputSyainId, busyoName: inputBusyoName, Name: inputName
	};

	//サーバーからデータを取得する
	$.ajax({
		type:'GET',
		url: '/SyainSearch',
		dataType :'json',
		data :requestQuery,
		success :function(json){
			console.log(json);
			$('#syainId').html(json.syainId);
			$('#syainName').html(json.syainName);
			$('#syainAge').html(json.syainAge);
			$('#syainGender').html(json.syainGender);
			$('#syainAdress').html(json.syainAddress);
			$('#busyoName').html(json.busyoName);
		},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			alert('データの通信に失敗しました。')
		}
	});

	location.href='./SyainDetail.html'
}

$(document).ready(function(){
	$('#search-button').click(searchSyain);
});


