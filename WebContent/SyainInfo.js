

function executeAjax (){
//初期表示
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
				'<td>'+'<input type="button" value="編集" id="syain_edit" onclick="edit(\''+json[i].syainId+'\')">'+'</td>'+
				'<td>'+'<input type="button" value="削除" id="syain_delete" onclick="deletion(this,\''+json[i].syainId+'\')">'+'</td>'+
				'</tr>';

				$('#table_data').append(row)

			}
		},
		error :function(XMLHttpRequest,textStatus,errorThrown){
			alert('データの通信に失敗しました。')
		}
	});

}
//検索画面に遷移
var search = function(){
	location.href = './SyainSearch.html';
}

//社員検索
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
	console.log(requestQuery);
	$.ajax({
		type: 'GET',
		url: '/kisoteichaku/Syain/Search' ,
		dataType: 'json' ,
		data : requestQuery,

		success :function(json){
			console.log(json);
			if(json.length == 0){
				var message = '<p>'+'該当する社員がいません'+'</p>'
				$('#searchResult').append(message);
			}else{
				//列名の表示
				var title = '<tr>'+
				'<th>'+'社員ID'+'</th>'+
				'<th>'+'名前'+'</th>'+
				'<th>'+'所属部署'+'</th>'+
				'<th>'+'部署ID'+'</th>'+
				'<th>'+'年齢'+'</th>'+
				'<th>'+'性別'+'</th>'+
				'<th>'+'住所'+'</th>'+
				'<th>'+'入社日'+'</th>'+
				'<th>'+'退社日'+'</th>'+
				'</tr>';
				$('#searchResult').append(title);

				for(var i=0; i<json.length; i++){

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

//新規追加画面に遷移（setting()に実際の処理）
var newlyAdd = function(){
	location.href = './AddEdit.html';
}

//編集機能（setting()のelseの部分が実際の処理内容）
var edit = function(syainId){
	console.log('edit');
	var edit = syainId;
	var requestQuery = {
			ed : edit
	};

	location.href = './AddEdit.html?id='+syainId;
}
//削除機能
var deletion = function(o,syainId){
	console.log('aaa');
	//hide displayed info.
	var TR = o.parentNode.parentNode;
	TR.parentNode.deleteRow(TR.sectionRowIndex);
	//delete data from db
	var delSyain = syainId;

	var requestQuery = {
			del : delSyain
	};
	console.log(requestQuery);
	$.ajax({
		type: 'GET',
		url: '/kisoteichaku/SyainDelete' ,
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
// 新規追加
var setting = function(){
	console.log('commit');

	var inputSyainId = $('#syainId').val();
	var inputSyainName = $('#syainName').val();
	var inputSyainAge = $('#syainAge').val();
	// get a value from radio button
	var element = document.getElementById("form");
	var radioNodeList = element.gender;
	var inputSyainGender = radioNodeList.value;//select one of genders and get its value
	var inputpostalCode = $('#postalCode').val();
	var inputAddress = $('#postalCode').val()+$('#pref').val() + $('#address').val();
	var inputBusyoName = $('#busyoName').val()
	var inputEngageDate = $('#start').val();
	var inputRetireDate = $('#retire').val();
	var param = GetQueryString();
	var id = param["id"];

	if(id == undefined){  //リクエストパラメータがない場合（新規追加）
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
				alert('you have failed to register data');
				console.log(errorThrown);
			}
		});
	}else{ //リクエストパラメータがある場合（既存情報の編集）
		var requestQuery = {
				syainId : inputSyainId,
				syainName : inputSyainName,
				syainAge : inputSyainAge,
				syainGender : inputSyainGender,
				postalCode : inputpostalCode,
				syainAddress : inputAddress,
				busyoName : inputBusyoName,
				engageDate : inputEngageDate,
				retireDate : inputRetireDate,
				id : id  //パラメータをrequestQueryに含めてサーブレットに送る
		};
		console.log('input:',requestQuery);

		$.ajax({
			type :'POST',
			dataType : 'json',
			url: '/kisoteichaku/SyainEdit',
			data : requestQuery,
			success : function(json){
				console.log(json);
				alert('登録が完了しました');
			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				alert('you have failed to register data');
				console.log(errorThrown);
			}
		});
	}
}

//URLからパラメータの部分を取得
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

//プルダウンリストに部署名を表示
var pulldownList = function(){
	console.log('pulldownList');
	$.ajax({
		type :'GET',
		url : '/kisoteichaku/BusyoList',
		dataType : 'json',
		success :function(json){
			console.log(json);
			var blank ='<option>' +'</option>';
			$('#busyoName').append(blank);
			for(var i=0; i<json.length; i++){
				var department = '<option>' + json[i].busyoName + '</option>';
				$('#busyoName').append(department)
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			alert('プルダウンリストの表示に失敗');
			console.log(errorThrown);
		}
	});
}

//キャンセルボタンを押したときすべての入力欄の値をリセット
var cancel = function(){
	console.log('cancel');
	//append a feature to reset all colums
	$('#form')[0].reset();
}
//検索結果を消去
var reset = function(){
	console.log('reset');
	$('#searchResult').empty();
}

$(document).ready(function(){
	 executeAjax ();
	 pulldownList();

	$('#new_add').click(newlyAdd);
	$('#search').click(search);
	$('.syain_edit').click(edit);
	$('.syain_delete').click(deletion);
	$('#cancel').click(cancel);
	$('#resultReset').click(reset);


});