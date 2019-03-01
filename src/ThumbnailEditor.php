<?php

namespace nakatsuji\thumbnaileditor{

	class ThumbnailEditor{

		private $buffer="nte_tmp";

		public function __construct($option=array()){

			if(@$option["receive"]){
				$this->receive=$option["receive"];
			}

			if(!@$this->receive["setFile"]){
				$this->receive["setFile"]=$_SERVER["REQUEST_URI"]."?method=setFile";
			}
			if(!@$this->receive["trimUpload"]){
				$this->receive["trimUpload"]=$_SERVER["REQUEST_URI"]."?method=trimUpload";
			}

			if(@$option["name"]){
				$this->name=$option["name"];
			}

			if(@$option["buffer"]){
				$this->buffer=$option["buffer"];
			}


			@mkdir($this->buffer);
		}

		public function viewUI(){

			include(dirname(__FILE__)."/UI/index.php");

		}

		public function receive_setfile(){
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

		public function receive_trimupload(){

			header("Content-Type: application/json");

			if($_POST){
				$this->image_convert($_POST);

				echo json_encode(array(
					"enabled"=>true,
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

		private function image_convert($params){

			

		}
	}

}

?>