


var getSyainData = function(){
	console.log('click');
	var inputSyainId = $('#syainId').val();
	var inputSyainName = $('#name').val();
	//var inputbusyoName = $('#busyoName').val()
	var requestQuery = {
			syainId : inputSyainId,
			syainName : inputSyainName
			//busyoName : inputBusyoName
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
				'<td>'+'<input type="button" value="削除" id="syain_delete" onclick="deletion()">'+'</td>'+
				'</tr>';

				$('#table_data').append(row)
			}

			location.href = './SyainInfo.html'
		},
		error :function(XMLHttpRequest,textStatus,errorThrown){
			alert('データの通信に失敗しました。')
		}
	});


}
