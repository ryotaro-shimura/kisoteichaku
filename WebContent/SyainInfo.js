



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
			'<td>'+'<button id="syain_edit">編集</button>'+'</td>'+
			'<td>'+'<button id="syain_delete">削除</button>'+'</td>'+
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
	location.href = '';
}

var deletion = function(){

}
$(document).ready(function(){

	$('#new_add').click(newlyAdd);
	$('#search').click(search);
	$('#syain_edit').click(edit);
	$('#syain_delete').click(deletion);

});