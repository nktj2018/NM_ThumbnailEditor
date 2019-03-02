<?php

//setting
require "vendor/autoload.php";

$NTE=new nakatsuji\thumbnaileditor\ThumbnailEditor();

if(@$_POST){
	echo "<pre>";
	print_r($_POST);
	echo "</pre>";
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
<div style="text-align:center;">
	<h1>Thumbnail Editor</h1>

	<form method="post">
		<?php
		for($u1=0;$u1<3;$u1++){
		?>
		<div style="margin-bottom:10px">
			<label for="nte_ui" data-nte="nte000<?php echo $u1; ?>" class="buttons">click here</label>
			<div style="margin-top:10px"><img src="" data-nte="nte000<?php echo $u1; ?>" style="width:200px"></div>
			<a data-nte="nte000<?php echo $u1; ?>" data-nte_mode="delete_btn">クリア</a>
			<div>
				<input type="hidden" name="<?php echo $u1; ?>[path]" data-nte="nte000<?php echo $u1; ?>" data-nte_mode="path">
				<input type="hidden" name="<?php echo $u1; ?>[file_name]" data-nte="nte000<?php echo $u1; ?>" data-nte_mode="file_name">
				<input type="hidden" name="<?php echo $u1; ?>[changed]" data-nte="nte000<?php echo $u1; ?>" data-nte_mode="changed">
			</div>
		</div>
		<?php
		}
		?>
		<input type="submit" value="submit">
	</form>
</div>
<?php $NTE->viewUI(); ?>
</body>
</html>