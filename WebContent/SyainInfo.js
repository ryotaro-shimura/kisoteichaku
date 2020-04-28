

function executeAjax (){

	$.ajax({
		type: 'GET',
		url: '/kisoteichaku/SyainList' ,
		dataType: 'json' ,
		success :function(json){
			console.log(json);
			for(var i=0; i<json.length; i++){
				var row = '<tr>'+
				'<td id="syainId">'+json[i].syainId+'</td>'+
				'<td id="syainName">'+json[i].syainName+'</td>'+
				'<td>'+'<input type="button" value="編集" id="syain_edit" onclick="edit()">'+'</td>'+
				'<td>'+'<input type="button" value="削除" id="syain_delete" onclick="deletion(this)">'+'</td>'+
				'</tr>';

				$('#table_data').append(row)
			}

			for(var i=0; i<json.length; i++){
				var department = '<option>' + json[i].busyoName + '</option>';

				$('#busyoName').append(department)
			}
		},
		error :function(XMLHttpRequest,textStatus,errorThrown){
			alert('データの通信に失敗しました。')
		}
	});
}

var getSyainData = function(){
	console.log('click');
	var inputSyainId = $('#syainId').val();
	var inputSyainName = $('#name').val();
	var inputbusyoName = $('#busyoName').val()
	var requestQuery = {
			syainId : inputSyainId,
			syainName : inputSyainName,
			busyoName : inputBusyoName
	};

	$.ajax({
		type: 'GET',
		url: '/kisoteichaku/Syain/Search' ,
		dataType: 'json' ,
		data : requestQuery,

		success :function(json){
			console.log(json);

			for(var i=0; i<json.length; i++){
				var row = '<tr>'+
				'<td id="syainId">'+json[i].syainId+'</td>'+
				'<td id="syainName">'+json[i].syainName+'</td>'+
				'<td>'+'<input type="button" value="編集" id="syain_edit" onclick="edit()">'+'</td>'+
				'<td>'+'<input type="button" value="削除" id="syain_delete" onclick="deletion(this)">'+'</td>'+
				'</tr>';

				$('#table_data').append(row)
			}
		},
		error :function(XMLHttpRequest,textStatus,errorThrown){
			alert('データの通信に失敗しました。')
		}
	});
	location.href = './SyainInfo.html'

}




//the action when you push some buttons
var newlyAdd = function(){
	location.href = './AddEdit.html';
}

var search = function(){
	location.href = './SyainSearch.html';
}

var edit = function(){

	location.href = './AddEdit.html';
}

var deletion = function(o){
	console.log('aaa');
	// append a feature to delete rows
	var TR = o.parentNode.parentNode;
	TR.parentNode.deleteRow(TR.sectionRowIndex);
}

var commit = function(){
	console.log('commit');
	// append a feature to add data to DB
}

var cancel = function(){
	console.log('cancel');
	//append a feature to reset all colums
	$('#form')[0].reset();
}


$(document).ready(function(){
	 executeAjax ();

	$('#new_add').click(newlyAdd);
	$('#search').click(search);
	$('.syain_edit').click(edit);
	$('.syain_delete').click(deletion);
	$('#commit').click(commit);
	$('#cancel').click(cancel);


});