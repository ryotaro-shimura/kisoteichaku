



$.ajax({
	type:'GET',
	url:'/kisoteichaku/SyainList',
	dataType:'json',
	data requestData,

	success: function(json){
		console.log(json);

		for(var i=0; i<json.length; i++){
			var row = '<tr>'+
			'<td>'+json[i].syainId+'</td>'+
			'<td>'+json[i].syainName+'</td>'+
			'<td>'+'<button id="syain_edit">編集</button>'+'</td>'+
			'<td>'+'<button id="syain_delete">削除</button>'+'</td>'+
			'</tr>';

			$('#table_data').append(row);
		}
	}
});

