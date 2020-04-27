



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
			'<td>'+'<input type="button" value="削除" id="syain_delete" onclick="deletion()">'+'</td>'+
			'</tr>';

			$('#table_data').append(row)
		}
	},
	error :function(XMLHttpRequest,textStatus,errorThrown){
		alert('データの通信に失敗しました。')
	}
});




//the action when you push some buttons
var newlyAdd = function(){
	location.href = './AddEdit.html';
}

var search = function(){
	location.href = './SyainSearch.html';
}

var edit = function(){
	console.log('aaa');
	location.href = './AddEdit.html';
}

var deletion = function(){
	console.log('aaa');
}
$(document).ready(function(){

	$('#new_add').click(newlyAdd);
	$('#search').click(search);
	$('.syain_edit').click(edit);
	$('.syain_delete').click(deletion);

});