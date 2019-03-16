<link rel="stylesheet" href="?common=css">
<script src="?common=js"></script>
<div class="nte_ui">
	<div class="hidden" id="hidden_retry"><?php echo $this->retry; ?></div>
	<input type="checkbox" id="nte_ui" class="window_toggle">
	<label for="nte_ui" class="nte_bg transition600ms"></label>
	<div class="nte_window transition600ms">
		<div class="step step1 center active">
			<p class="center h3 mb10"><?php echo @$text["step1"]; ?></p>
			<label for="nte_file_select" class="btn_select"><?php echo @$text["step1select"]; ?></label>
		</div><!--//.step1-->
		<div class="step step2">
			<p class="h4 mb10"><?php echo @$text["step2"]; ?></p>

			<div class="triming_area">
				<img class="trim_image_base">
				<div class="trimarea"></div>
				<a class="btn_offset_left" title="snap left."></a>
				<a class="btn_offset_top" title="snap top."></a>
				<a class="btn_offset_right" title="snap right."></a>
				<a class="btn_offset_bottom" title="snap bottom."></a>
				<a class="btn_rotate" title="rotate 90">rotate</a>
			</div>

			<p class="mm10"><span class="sample_trimarea"></span><?php echo @$text["step2range"]; ?></p>

			<p><?php echo @$text["step2_1"]; ?></p>
			<div class="zoom_progress mb30">
				<div class="value"></div>
			</div><!--//.zoom_progress-->

			<div class="right">
				<a class="btn_trimclear"><?php echo @$text["btn_trimclear"]; ?></a><br><br>
				<a class="btn_clear"><?php echo @$text["btn_clear"]; ?></a>
			</div>
			<div class="foots hidden">
				<a class="btn_cancel"><?php echo @$text["cancel"]; ?></a>
				<a class="waiting_icon"></a>
				<a class="btn_submits"><?php echo @$text["submit"]; ?></a>
			</div><!-//.foots-->
		</div><!--//.step2-->
	</div><!--//.nte_window-->
	<div class="nte_bg"></div>

	<form method="post" enctype="multipart/form-data" class="form_setfile hidden">
		<input type="file" name="files" id="nte_file_select" class="file_setfile" accept="image/*">
	</form>

	<form method="post" class="form_trims hidden">
		<input type="hidden" name="path" class="hidden_path">
		<input type="hidden" name="file_name" class="hidden_filename">
		<input type="hidden" name="width_base" class="hidden_width_base" value="">
		<input type="hidden" name="width" class="hidden_width" value="">
		<input type="hidden" name="height_base" class="hidden_height_base" value="">
		<input type="hidden" name="height" class="hidden_height" value="">
		<input type="hidden" name="offset_x" class="hidden_offsetx" value="0">
		<input type="hidden" name="offset_y" class="hidden_offsety" value="0">
		<input type="hidden" name="offset_zoom" class="hidden_zoom" value="100">
	</form>

	<div class="hidden">
		<div class="url_setfile">?method=setFile</div>
		<div class="url_rotate">?method=rotate</div>
		<div class="url_trimupload">?method=trimUpload</div>
	</div>

</div><!--//.nte_ui-->

