
function login(){
	console.log('click');
	var userId = $('#userId').val();
	var password = $('#password').val();
	var requestQuery = {
			id : userId,
			pass : password
	};

	$.ajax({
		type : 'GET',
		url : '/kisoteichaku/logintest',
		dataType : 'json',
		data : requestQuery,
		success : function(){
			console.log(json);
			if(json.result === 'ok'){
				location.href = './logouttest.html'
			}else{
				reset();
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