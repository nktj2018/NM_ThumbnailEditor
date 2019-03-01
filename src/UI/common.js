$(function(){

	//file setting..
	$("body").on("change",".nte_ui .file_setfile",function(){
		$.ajax({
			url:$(".nte_ui .url_setfile").text(),
			type:"POST",
			data:new FormData($(".form_setfile").get(0)),
			contentType:false,
			processData:false,
			success:function(data){

				if(data.enabled){
					$(".nte_ui .nte_window .step").removeClass("active");
					$(".nte_ui .nte_window .step2").addClass("active");
					$(".nte_ui .nte_window .step2 .triming_area .trim_image_base").attr("src",data.path);

					$(".nte_ui .hidden_path").val(data.path);
					$(".nte_ui .hidden_filename").val(data.file_name);

					$(".nte_ui .hidden_width_base").val($(".nte_ui .nte_window .step2 .triming_area").width());
					$(".nte_ui .hidden_width").val($(".nte_ui .nte_window .step2 .triming_area .trimarea").width());
				}

			},
		});
	});

	//offset move
	var mouse_enabled=false;
	var mouse_position={
		x:0,
		y:0,
	};
	var trim_position={
		x:0,
		y:0,
	};
	$("body").on("mousedown",".nte_ui .step2 .triming_area .trimarea",function(e){
		if(!mouse_enabled){
			mouse_enabled=true;
			mouse_position={
				x:e.offsetX,
				y:e.offsetY,
			};
			trim_position={
				x:parseInt($(".nte_ui .nte_window .step2 .triming_area .trimarea").css("left")),
				y:parseInt($(".nte_ui .nte_window .step2 .triming_area .trimarea").css("top")),
			};
		}
		return false;
	});
	$("body").on("mouseup",".nte_ui .step2 .triming_area  .trimarea",function(e){
		if(mouse_enabled){
			mouse_enabled=false;
		}
		return false;
	});
	$("body").on("mousemove",".nte_ui .step2 .triming_area .trimarea",function(e){
		if(mouse_enabled){

			var vec_position={
				x:e.offsetX-mouse_position["x"],
				y:e.offsetY-mouse_position["y"],
			};

			$(".nte_ui .nte_window .step2 .triming_area .trimarea").css({
				"left":parseInt(vec_position["x"]+trim_position["x"]),
				"top":parseInt(vec_position["y"]+trim_position["y"]),
			});

			$(".nte_ui .hidden_offsetx").val(vec_position["x"]+trim_position["x"]);
			$(".nte_ui .hidden_offsety").val(vec_position["y"]+trim_position["y"]);

			return false;
		}
	});

	//zoom up down
	var zoom_progress_enabled=false;
	var zoom_trimarea_width=0;
	$("body").on("mousedown",".nte_ui .step2 .zoom_progress",function(){
		if(!zoom_progress_enabled){
			zoom_progress_enabled=true;
		}
	});
	$("body").on("mouseup",".nte_ui .step2 .zoom_progress",function(){
		zoom_progress_enabled=false;
	});
	$("body").on("mousemove",".nte_ui .step2 .zoom_progress",function(e){
		if(zoom_progress_enabled){

			var persec=parseInt((e.offsetX*100)/$(".nte_ui .step2 .zoom_progress").width());

			$(".nte_ui .nte_window .step2 .triming_area .trimarea").css({
				width:((persec-50)+100)+"%",
			});

			if(persec<=100){
				$(".nte_ui .step2 .zoom_progress .value").css({
					width:persec+"%",
				});
				$(".nte_ui .hidden_zoom").val((persec-50)+100);

			}
			else
			{
				zoom_progress_enabled=false;
			}

		}
	});

	//clear
	$("body").on("click",".nte_ui .btn_clear",function(){
		$(".nte_ui .nte_window .step2").removeClass("active");
		$(".nte_ui .nte_window .step1").addClass("active");

	});

	//trimclear
	$("body").on("click",".nte_ui .btn_trimclear",function(){
		$(".nte_ui .hidden_offsetx").val(0);
		$(".nte_ui .hidden_offsety").val(0);
		$(".nte_ui .hidden_zoom").val(100);

		$(".nte_ui .nte_window .step2 .triming_area .trimarea").css({
			left:0,
			top:0,
		});

		$(".nte_ui .step2 .zoom_progress .value").css({
			width:"50%",
		});

		$(".nte_ui .nte_window .step2 .triming_area .trim_image_base").css({
			width:"100%",
		});
	});

	//cancel
	$("body").on("click",".nte_ui .btn_cancel",function(){
		$(".nte_ui .nte_window .step2").removeClass("active");
		$(".nte_ui .nte_window .step1").addClass("active");
		$(".nte_ui #nte_ui").prop("checked",false);
	});

	//submit
	$("body").on("click",".nte_ui .btn_submits",function(){

		$(".nte_ui .hidden_height_base").val(parseInt($(".nte_ui .nte_window .step2 .triming_area").css("padding-bottom")));
		$(".nte_ui .hidden_height").val($(".nte_ui .nte_window .step2 .triming_area .trimarea").height());

		$.ajax({
			url:$(".nte_ui .url_trimupload").text(),
			type:"POST",
			data:new FormData($(".form_trims").get(0)),
			contentType:false,
			processData:false,
			success:function(data){
				if(data.enabled){


				}
			}
		});

	});

});