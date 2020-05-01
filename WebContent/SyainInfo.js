

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
		},
		error :function(XMLHttpRequest,textStatus,errorThrown){
			alert('データの通信に失敗しました。')
		}
	});


	$.ajax({
		type:'GET',
		url: '/kisoteichaku/BusyoList',
		dataType: 'json',
		suceess :function(){
			var blank ='<option>' +''+'</option>';
			$('#busyoName').append(blank);
			for(var i=0; i<json.length; i++){
				var department = '<option>' + json[i].busyoName + '</option>';

				$('#busyoName').append(department)
			}
		}
	});
}
//look up
var getSyainData = function(){
	console.log('click');
	var inputSyainId = $('#syainId').val();
	var inputSyainName = $('#name').val();
	var inputBusyoName = $('#busyoName').val()
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
			if(json.length == 0){
				var message = '<h3>'+'該当する社員がいません'+'</h3>'
				$('#searchResult').append(message);
			}else{
				for(var i=0; i<json.length; i++){
					//output Employee's data
					var row ='<tr>'+
						'<td>'+json[i].syainId+'</td>'+
						'<td>'+json[i].syainName+'</td>'+
						'<td>'+json[i].busyoName+'</td>'+
						'<td>'+json[i].busyoId+'</td>'+
						'<td>'+json[i].syainAge+'</td>'+
						'<td>'+json[i].syainGender+'</td>'+
						'<td>'+json[i].syainAddress+'</td>'+
						'<td>'+json[i].engageDate+'</td>'+
						'<td>'+json[i].retireDate+'</td>'+
						'</tr>'
					$('#searchResult').append(row)
				}
			}
		},
		error :function(XMLHttpRequest,textStatus,errorThrown){
			alert('データの通信に失敗しました。')
		}
	});


}





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
// add new data to employee table
var setting = function(){
	console.log('commit');

	var inputSyainId = $('#syainId').val();
	var inputSyainName = $('#syainName').val();
	var inputSyainAge = $('#syainAge').val();
	var inputSyainGender = $('.syainGender').val();
	var inputpostalCode = $('#postalCode').val();
	var inputAddress = $('#postalCode').val()+$('#pref').val() + $('#address').val();
	var inputBusyoName = $('#busyoName').val()
	var inputEngageDate = $('#start').val();
	var inputRetireDate = $('#retire').val();

	var requestQuery = {
			syainId : inputSyainId,
			syainName : inputSyainName,
			syainAge : inputSyainAge,
			syainGender : inputSyainGender,
			postalCode : inputpostalCode,
			syainAddress : inputAddress,
			busyoName : inputBusyoName,
			engageDate : inputEngageDate,
			retireDate : inputRetireDate
	};

	console.log('input:',requestQuery);

	$.ajax({
		type :'POST',
		dataType : 'json',
		url: '/kisoteichaku/SyainRegist',
		data : requestQuery,
		success : function(json){
			console.log(json);
			alert('登録が完了しました');
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			alert('you have failed to access to the servlet');
			console.log(errorThrown);
		}
	});

}

var cancel = function(){
	console.log('cancel');
	//append a feature to reset all colums
	$('#form')[0].reset();
}

var reset = function(){
	console.log('reset');
	$('#searchResult').empty();
}

$(document).ready(function(){
	 executeAjax ();

	$('#new_add').click(newlyAdd);
	$('#search').click(search);
	$('.syain_edit').click(edit);
	$('.syain_delete').click(deletion);
	//$('#commit').click(commit);
	$('#cancel').click(cancel);
	$('#resultReset').click(reset);


});