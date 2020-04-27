


var getSyainData = function(){
	console.log('click');
	var inputSyainId = $('#syainId').val();
	var inputSyainName = $('#name').val();
	//var inputbusyoName = $('#busyoName').val()
	var requestQuery = {
			syainId : inputSyainId,
			syainName : inputSyainName
			//busyoName : inputBusyoName
	};

	$.ajax({
		type: 'GET',
		url: '/kisoteichaku/Search' ,
		dataType: 'data' ,
		data : requestQuery,

		success :function(data){
			console.log(data);

		},
		error :function(XMLHttpRequest,textStatus,errorThrown){
			alert('データの通信に失敗しました。')
		}
	});
}
