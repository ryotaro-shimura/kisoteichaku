
var setting = function(){
	console.log('commit');
	//append a feature to add input data to DB
	var inputBusyoName = $('#busyoName').val();
	var inputBusyoId = $('#busyoId').val();

	var requestQuery = {
			busyoName : inputBusyoName,
			busyoId : inputBusyoId
	};

	console.log('input',requestQuery);

	$.ajax({
		type :'POST',
		dataType : 'json',
		url: '/kisoteichaku/Busyo/Regist',
		data : requestQuery,
		success : function(json){
			console.log(json);
			alert('登録が完了しました');
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			alert('you have failed to access to the servlet');
			console.log(errorThrown)
		}
	});
}

var edit = function(){

	$.ajax({
	type:'POST',
	url : '/kisoteichaku/BusyoEdit',
	data : 'json',
	dataType : requestQuery,
	success : function(){
		location.href='./busyoAddEdit.html?='
	},

	});

}

