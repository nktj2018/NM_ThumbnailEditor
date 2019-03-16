<?php

//setting
require "vendor/autoload.php";

$NTE=new nakatsuji\thumbnaileditor\ThumbnailEditor(array(
	"language"=>"jp",
	"outputWidth"=>300,
	"retry"=>false,
));

if(@$_POST){
	echo "<pre>";
	print_r($_POST);
	echo "</pre>";
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Thumbnail Editor Sample</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>
<style>
a{
	font-size:13px;
	cursor:pointer;

}
ul{
	list-style-type:none;
	overflow:hidden;
	zoom:1;
}
label{
	cursor:pointer;
}
ul li{
	float:left;
	margin-right:10px;
}
</style>
<script src="jquery.js"></script>
<div style="text-align:center;">
	<h1>Thumbnail Editor</h1>

	<form method="post">
		<ul>
		<?php
		for($u1=0;$u1<5;$u1++){
		?>
		<li>
			<label for="nte_ui" data-nte="nte000<?php echo $u1; ?>" class="buttons">
				<div style="margin-top:10px"><img src="" data-nte="nte000<?php echo $u1; ?>" style="width:200px;height:200px;background:#c0c0c0;"></div>
				<div>
					<input type="hidden" name="<?php echo $u1; ?>[path]" data-nte="nte000<?php echo $u1; ?>" data-nte_mode="path">
					<input type="hidden" name="<?php echo $u1; ?>[file_name]" data-nte="nte000<?php echo $u1; ?>" data-nte_mode="file_name">
					<input type="hidden" name="<?php echo $u1; ?>[changed]" data-nte="nte000<?php echo $u1; ?>" data-nte_mode="changed">
				</div>
			</label>
			<a data-nte="nte000<?php echo $u1; ?>" data-nte_mode="delete_btn">クリア</a>
		</li>
		<?php
		}
		?>
		</ul>
		<input type="submit" value="submit">
	</form>
</div>
<?php $NTE->viewUI(); ?>
</body>
</html>