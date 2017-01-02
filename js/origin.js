function deleteInputList(e){
	var $current = $(e);
	$current.parent().parent().remove();
	/*获取这行的内容*/
	var toDeleteDate = $($current.parent().find("td").get(0)).text();
	/*数据库删除*/
	deleteOutputData(toDeleteDate);
}
