function login(){
	console.log('click');
	reset();
	var userId = $('#userId').val();
	var password = $('#password').val();
	var requestQuery = {
			id : userId,
			pass : password
	};
	console.log(requestQuery);
	$.ajax({
		type : 'GET',
		url : '/kisoteichaku/EmployeeLogin',
		dataType : 'json',
		data : requestQuery,
		success : function(json){
			console.log(json);
			if(json === 'ok'){
				location.href = './SyainInfo.html'
			}else{
				var message = '<p>'+'ログインに失敗しました'+'</p>'
				$('#failed').append(message);
			}
		},
		error :function(XMLHttpRequest,textStatus,errorThrown){
			alert('データの通信に失敗しました。')
		}
	});
}

var reset = function(){
	console.log('reset');
	$('#failed').empty();
}

//$(document).ready(function(){
//});