<link rel="stylesheet" href="../Library/src/UI/style.css">
<script src="../Library/src/UI/common.js"></script>

<div class="nte_ui">
	<input type="checkbox" id="nte_ui" class="window_toggle">
	<label for="nte_ui" class="nte_bg transition600ms"></label>
	<div class="nte_window transition600ms">
		<div class="step step1 center active">
			<p class="center h3 mb10">まずファイルを選択してください</p>
			<label for="nte_file_select" class="btn_select">ファイルを選択</label>
		</div><!--//.step1-->
		<div class="step step2">
			<p class="h4 mb10">トリミングする部分を調整してください</p>

			<div class="triming_area">
				<img class="trim_image_base" src="nte_tmp/023c42e4b1d0b86755d9a0e3c7c1ee0d42b3b8a75ac946cc232f2a4722541e32">
				<div class="bg"></div>
				<div class="trimarea"></div>
			</div>

			<p class="mm10"><span style="background:#e0e0e0;display:inline-block;width:20px;margin-right:5px;padding:10px 0px;vertical-align:middle;"></span>部分がトリミング範囲です</p>

			<p>拡大率</p>
			<div class="zoom_progress mb30">
				<div class="value"></div>
			</div><!--//.zoom_progress-->

			<div class="right">
				<a class="btn_trimclear">トリム設定をクリア</a><br><br>
				<a class="btn_clear">画像をクリア</a>
			</div>
		</div><!--//.step2-->
		<div class="foots">
			<a class="btn_cancel">キャンセル</a>
			<a class="btn_submits">この画像で決定</a>
		</div><!-//.foots-->
	</div><!--//.nte_window-->
	<div class="nte_bg"></div>

	<form method="post" enctype="multipart/form-data" class="form_setfile hidden">
		<input type="file" name="files" id="nte_file_select" class="file_setfile" accept="image/*">
	</form>

	<form method="post" class="form_trims hidden">
		<input type="hidden" name="path" class="hidden_path">
		<input type="hidden" name="filename" class="hidden_filename">
		<input type="hidden" name="width_base" class="hidden_width_base" value="">
		<input type="hidden" name="width" class="hidden_width" value="">
		<input type="hidden" name="width_output" class="hidden_width_output" value="<?php echo @$this->outputWidth; ?>">
		<input type="hidden" name="height_base" class="hidden_height_base" value="">
		<input type="hidden" name="height" class="hidden_height" value="">
		<input type="hidden" name="height_output" class="hidden_height_output" value="<?php echo @$this->outputWidth; ?>">

		<input type="hidden" name="offset_x" class="hidden_offsetx" value="0">
		<input type="hidden" name="offset_y" class="hidden_offsety" value="0">
		<input type="hidden" name="offset_zoom" class="hidden_zoom" value="100">
	</form>

	<div class="hidden">
		<div class="url_setfile"><?php echo @$this->receive["setFile"]; ?></div>
		<div class="url_trimupload"><?php echo @$this->receive["trimUpload"]; ?></div>
	</div>

</div><!--//.nte_ui-->

