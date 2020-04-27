

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
			'<td>'+'<button id="busyo_edit">編集</button>'+'</td>'+
			'<td>'+'<button id="busyo_delete">削除</button>'+'</td>'+
			'</tr>';

			$('#table_data').append(row)
		}
	},
	error :function(XMLHttpRequest,textStatus,errorThrown){
		alert('データの通信に失敗しました。')
	}
});


var newlyAdd = function(){
	location:href='';
}



var edit = function(){

}

var deletion = function(){

}
$(document).ready(function(){

	$('#new_add').click(newlyAdd);
	$('#busyo_edit').click(edit);
	$('#busyo_delete').click(deletion);

});