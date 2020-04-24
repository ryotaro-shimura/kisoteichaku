



$.ajax({
	type: 'GET',
	url: '/SyainList' ,
	dataType: 'json' ,
	success :function(json){
		console.log(json);
		for(var i=0; i<json.length; i++){
			var row = '<tr>'+
			'<td>'+json[i].syainId+'</td>'+
			'<td>'+json[i].syainName+'</td>'+
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
	location:href='';
}

var search = function(){
	location.href='./SyainSearch.html';
}

var edit = function(){

}

var deletion = function(){

}
$(document).ready(function(){

	$('#new_add').click(newlyAdd);
	$('#search').click(search);
	$('#syain_edit').click(edit);
	$('#syain_delete').click(deletion);

});