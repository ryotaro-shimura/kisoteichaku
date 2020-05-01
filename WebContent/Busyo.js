
function executeAjax (){

$.ajax({
	type: 'GET',
	url: '/kisoteichaku/BusyoList' ,
	dataType: 'json' ,
	success :function(json){
		console.log(json);
		for(var i=0; i<json.length; i++){
			var row = '<tr>'+
			'<td>'+json[i].busyoId+'</td>'+
			'<td>'+json[i].busyoName+'</td>'+
			'<td>'+'<input type="button" value="編集" id="busyo_edit" onclick="edit(\''+json[i].busyoId+'\')">'+'</td>'+
			'<td>'+'<input type="button" value="削除" id="busyo_delete" onclick="deletion(this,\''+json[i].busyoId+'\')">'+'</td>'+
			'</tr>';

			$('#table_data').append(row)
		}
	},
	error :function(XMLHttpRequest,textStatus,errorThrown){
		alert('データの通信に失敗しました。')
	}
});

}

var newlyAdd = function(){
	location.href='./busyoAddEdit.html';
}

var edit = function(busyoId){
	var edit = busyoId;
	var requestQuery = {
			edi : edit,
	};


	location.href='./busyoAddEdit.html?id='+busyoId
}

var deletion = function(o,busyoId){
	console.log('aaa');

	var TR = o.parentNode.parentNode;
	TR.parentNode.deleteRow(TR.sectionRowIndex);

	var deletion = busyoId;

	var requestQuery = {
			del : deletion
	};
	console.log(requestQuery);
	$.ajax({
		type: 'GET',
		url: '/kisoteichaku/BusyoDelete' ,
		data: requestQuery,
		dataType : 'json',
		success :function(json){
			alert('消去が完了しました')

		},
		error :function(XMLHttpRequest,textStatus,errorThrown){
			alert('データの通信に失敗しました。')
		}
	});

}


var setting = function(){
	console.log('commit');
	//param =｛id : 'D09'}
	var param = GetQueryString();
	var id = param["id"];
	console.log(id);
	//append a feature to add input data to DB
	var inputBusyoName = $('#busyoName').val();
	var inputBusyoId = $('#busyoId').val();
	if(id == undefined){//idがなかったら
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
	else{//idがあったら

		var requestQuery = {
				id : id,
				busyoName :inputBusyoName,
				busyoId : inputBusyoId
		};

		console.log(requestQuery);
		$.ajax({
			type: 'POST',
			url: '/kisoteichaku/BusyoEdit' ,
			data: requestQuery,
			dataType : 'json',
			success :function(json){
				console.log(json)
			},
			error :function(XMLHttpRequest,textStatus,errorThrown){
				alert('データの通信に失敗しました。')
			}
		});
		location.href='./busyoAddEdit.html?id='+busyoId
	}

}

function GetQueryString() {
    var result = new Object();
    if (1 < document.location.search.length) {
        // 最初の1文字 (?記号) を除いた文字列を取得する
        console.log(document.location.search);
    	var query = document.location.search.substring(1);
        console.log(query);
        // クエリの区切り記号 (&) で文字列を配列に分割する
        var parameters = query.split('&');
        console.log(parameters);
        for (var i = 0; i < parameters.length; i++) {
            // パラメータ名とパラメータ値に分割する
            var element = parameters[i].split('=');
            console.log(element);
            var paramName = decodeURIComponent(element[0]);
            console.log(paramName);
            var paramValue = decodeURIComponent(element[1]);
            console.log(paramValue);
            // パラメータ名をキーとして連想配列に追加する
            result[paramName] = paramValue;
        }
        //result = {id: "EMP0001", name: "tanaka",age:"10"}
    }
    return result;
}

var cancel = function(){
	console.log('cancel');
	//append a feature to reset all colums
	$('#form')[0].reset();
}

$(document).ready(function(){
	executeAjax ();

	$('#new_add').click(newlyAdd);
	//$('#busyo_edit').click(edit);
	//$('#busyo_delete').click(deletion);
	$('#cancel').click(cancel);
	//$('#commit').click(commit);



});