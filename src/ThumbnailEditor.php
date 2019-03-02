<?php

namespace nakatsuji\thumbnaileditor{

	class ThumbnailEditor{

		private $buffer="nte_tmp";
		private $outputWidth=600;

		public function __construct($option=array()){

			if(@$option["receive"]){
				$this->receive=$option["receive"];
			}

			if(@$option["buffer"]){
				$this->buffer=$option["buffer"];
			}

			if(@$option["outputWidth"]){
				$this->outputWidth=$option["outputWidth"];
			}

			@mkdir($this->buffer);

			if(@$_GET["common"]){
				if($_GET["common"]=="css"){
					header("Content-Type: text/css");
					header("Cache-Control: max-age=86400");

					include(dirname(__FILE__)."/UI/style.css");
					exit;
				}
				else if($_GET["common"]=="js"){
					header("Content-Type: text/javascript");
					header("Cache-Control: max-age=86400");

					include(dirname(__FILE__)."/UI/common.js");
					exit;
				}
			}

			if(@$_GET["method"]=="setFile"){
				$this->receive_setfile();
			}
			else if(@$_GET["method"]=="trimUpload"){
				$this->receive_trimupload();
			}
		}

		public function viewUI(){
			include(dirname(__FILE__)."/UI/index.php");
		}

		private function receive_setfile(){
			header("Content-Type: application/json");

			if(@$_FILES){

				$hash=hash("sha256",date("ymdHis").json_encode($_FILES));
				copy($_FILES["files"]["tmp_name"],$this->buffer."/".$hash);

				echo json_encode(array(
					"enabled"=>true,
					"hash"=>$hash,
					"path"=>$this->buffer."/".$hash,
					"file_name"=>$_FILES["files"]["name"],
				));
			}
			else
			{
				echo json_encode(array(
					"enabled"=>false,
				));
			}
			exit;
		}

		private function receive_trimupload(){

			header("Content-Type: application/json");

			if($_POST){

				$this->image_convert($_POST);

				echo json_encode(array(
					"enabled"=>true,
					"path"=>$_POST["path"]."_2",
					"file_name"=>$_POST["file_name"],
				));
			}
			else
			{
				echo json_encode(array(
					"enabled"=>false,
				));
			}
			exit;
		}

		//image_convert

		private function image_convert($params){

			$image_type=exif_imagetype($params["path"]);

			if($image_type==IMAGETYPE_PNG){
				$input=ImageCreateFromPNG($params["path"]);
			}
			else if($image_type==IMAGETYPE_GIF){
				$input=ImageCreateFromGIF($params["path"]);
			}
			else
			{
				$input=ImageCreateFromJPEG($params["path"]);
			}

			$rate0=$params["width_base"]/ImageSX($input);
			$rate=$params["width_base"]/$params["width"];
			$rate2=$this->outputWidth/$params["width"];

			//before image size
			$ix=ImageSX($input);
			$iy=ImageSY($input);

			//after image size
			$ox=$this->outputWidth;
			$oy=$this->outputWidth;

			//offset
			$offset_x=$params["offset_x"]/$rate0;
			$offset_y=$params["offset_y"]/$rate0;

			$output=ImageCreateTrueColor($ox, $oy);

			if($image_type==IMAGETYPE_PNG){
				imagealphablending($output, false);
				imagesavealpha($output, true);
			}
			imagecopyresampled($output, $input,0, 0, $offset_x, $offset_y, $ix*$rate0*$rate2, $iy*$rate0*$rate2 ,$ix, $iy);

			if($image_type==IMAGETYPE_PNG){
				imagepng($output,$this->buffer."/".basename($params["path"])."_2",9);
			}
			else if($image_type==IMAGETYPE_GIF){
				imagegif($output,$this->buffer."/".basename($params["path"])."_2",95);
			}
			else
			{
				imagejpeg($output,$this->buffer."/".basename($params["path"])."_2",95);
			}

			ImageDestroy($input);
			ImageDestroy($output);

			return true;
		}
	}

}

?>