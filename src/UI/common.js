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

	//object set

	var triming_area=".nte_ui .step2 .triming_area";
	var triming_target=".nte_ui .step2 .triming_area .trimarea";
	var hidden_offsetx=".nte_ui .hidden_offsetx";
	var hidden_offsety=".nte_ui .hidden_offsety";

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
	$("body").on("mousedown",triming_area,function(e){
		if(!mouse_enabled){
			mouse_enabled=true;
			mouse_position={
				x:e.pageX,
				y:e.pageY,
			};
			trim_position={
				x:parseInt($(triming_target).css("left")),
				y:parseInt($(triming_target).css("top")),
			};
		}
		return false;
	});
	$("body").on("mouseup",triming_area,function(e){
		if(mouse_enabled){
			mouse_enabled=false;
		}
		return false;
	});
	$("body").on("mouseleave",triming_area,function(e){
		mouse_enabled=false;
		return false;
	});
	$("body").on("mousemove",triming_area,function(e){
		if(mouse_enabled){
			var vec_position={
				x:e.pageX-mouse_position["x"],
				y:e.pageY-mouse_position["y"],
			};

			var left=parseInt(vec_position["x"])+parseInt(trim_position["x"]);
			var top=parseInt(vec_position["y"])+parseInt(trim_position["y"]);

			if(left<0){
				left=0;
			}

			if(left>$(triming_area).width()-$(triming_target).width()-3){
				left=$(triming_area).width()-$(triming_target).width()-3;
			}

			if(top<0){
				top=0;
			}

			if(top>$(triming_area).height()-$(triming_target).height()-3){
				top=$(triming_area).height()-$(triming_target).height()-3;
			}


			$(triming_target).css({
				"left":left,
				"top":top,
			});

			$(hidden_offsetx).val(left);
			$(hidden_offsety).val(top);


			return false;
		}
	});

	//zoom up down
	var zoom_progress=".nte_ui .step2 .zoom_progress";
	var zoom_progress_value=".nte_ui .step2 .zoom_progress .value";
	var target_width=$(triming_target).width();
	var target_height=$(triming_target).height();
	var hidden_zoom=".nte_ui .hidden_zoom";

	var zoom_progress_enabled=false;
	var zoom_trimarea_width=0;
	$("body").on("mousedown",zoom_progress,function(){
		if(!zoom_progress_enabled){
			zoom_progress_enabled=true;
		}
	});
	$("body").on("mouseup",zoom_progress,function(){
		zoom_progress_enabled=false;
	});
	$("body").on("mousemove",zoom_progress,function(e){
		if(zoom_progress_enabled){

			var persec=parseInt((e.offsetX*100)/$(zoom_progress).width());

			var width=target_width*((persec+50)/100);
			var height=target_height*((persec+50)/100);

			$(triming_target).css({
				width:width,
				height:height,
			});

			if(persec>=0 && persec<=100){
				
				$(zoom_progress_value).css({
					width:persec+"%",
				});
				$(hidden_zoom).val((persec-50)+100);
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
		$(hidden_offsetx).val(0);
		$(hidden_offsety).val(0);
		$(hidden_zoom).val(100);

		$(triming_target).css({
			left:0,
			top:0,
		});

		$(zoom_progress_value).css({
			width:"50%",
		});

		$(".nte_ui .nte_window .step2 .triming_area .trimarea").css({
			width:target_width,
			height:target_height,
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

		$(".nte_ui .hidden_width").val($(".nte_ui .nte_window .step2 .triming_area .trimarea").width());
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