



$.ajax({
	type:'GET',
	url:'/kisoteichaku/SyainInfo',
	dataType:'json',
	data requestData,

	success: function(json){
		console.log(json);

	}
});