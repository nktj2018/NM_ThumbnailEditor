<?php

include("../Library/src/ThumbnailEditor.php");

$NTE=new nakatsuji\thumbnaileditor\ThumbnailEditor();

//receive
if(@$_GET["method"]=="setFile"){
	$NTE->receive_setfile();
}
else if(@$_GET["method"]=="trimUpload"){
	$NTE->receive_trimupload();
}
?>
<!DOCTYPE html>
<html>
<body>
<style>
a{
	font-size:13px;
	cursor:pointer;

}
.buttons{
	padding:6px 10px;
	display:inline-block;
	background:#e0e0e0;
}
</style>
<script src="jquery.js"></script>
<div style="text-align:center;margin-top:33.333333333333%;">
	<h1>Thumbnail Editor</h1>
	<div>
		<label for="nte_ui" data-nte="nte0001" class="buttons">click here</label>
		<div><img src="" data-nte="nte0001" style="width:200px"></div>
		<a data-nte="nte0001" data-nte_mode="delete_btn">クリア</a>
		<div>
			<input type="hidden" name="path" data-nte="nte0001" data-nte_mode="path">
			<input type="hidden" name="file_name" data-nte="nte0001" data-nte_mode="file_name">
			<input type="hidden" name="changed" data-nte="nte0001" data-nte_mode="changed">
		</div>
	</div>
</div>
<?php $NTE->viewUI(); ?>
</body>
</html>