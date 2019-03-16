$(function(){

	var nte_name="";
	var index=0;

	//open nte
	$("body").on("click","label[for=nte_ui][data-nte]",function(){
	//	$(".nte_ui .btn_cancel").click();

		nte_name=$(this).attr("data-nte");
	});

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
					$(".nte_ui .nte_window .foots").removeClass("hidden");

					$(".nte_ui .hidden_path").val(data.path);
					$(".nte_ui .hidden_filename").val(data.file_name);
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
	$("body").on("touchstart",triming_area,function(e){
		mouse_position={
			x:e.originalEvent.changedTouches[0].pageX,
			y:e.originalEvent.changedTouches[0].pageY,
		};
		trim_position={
			x:parseInt($(triming_target).css("left")),
			y:parseInt($(triming_target).css("top")),
		};
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
	$("body").on("touchmove",triming_area,function(e){

			var vec_position={
				x:e.originalEvent.changedTouches[0].pageX-mouse_position["x"],
				y:e.originalEvent.changedTouches[0].pageY-mouse_position["y"],
			};

			var left=parseInt(vec_position["x"])+parseInt(trim_position["x"]);
			var top=parseInt(vec_position["y"])+parseInt(trim_position["y"]);


			if(left<0){
				left=0;
			}

			if(left>$(triming_area).width()-$(triming_target).width()-5){
				left=$(triming_area).width()-$(triming_target).width()-5;
			}

			if(top<0){
				top=0;
			}

			if(top>$(triming_area).height()-$(triming_target).height()-5){
				top=$(triming_area).height()-$(triming_target).height()-5;
			}

			$(triming_target).css({
				"left":left,
				"top":top,
			});

			$(hidden_offsetx).val(left);
			$(hidden_offsety).val(top);

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

			if(left>$(triming_area).width()-$(triming_target).width()-1){
				left=$(triming_area).width()-$(triming_target).width()-1;
			}

			if(top<0){
				top=0;
			}

			if(top>$(triming_area).height()-$(triming_target).height()-1){
				top=$(triming_area).height()-$(triming_target).height()-1;
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

	//offset left
	$("body").on("click",".nte_ui .btn_offset_left",function(){
		$(triming_target).css({
			left:"0px",
		});
		$(hidden_offsetx).val(0);
	});
	//offset top
	$("body").on("click",".nte_ui .btn_offset_top",function(){
		$(triming_target).css({
			top:"0px",
		});
		$(hidden_offsety).val(0);
	});
	//offset right
	$("body").on("click",".nte_ui .btn_offset_right",function(){
		$(triming_target).css({
			left:$(triming_area).width()-$(triming_target).width(),
		});
		$(hidden_offsetx).val($(triming_area).width()-$(triming_target).width());
	});
	//offset bottom
	$("body").on("click",".nte_ui .btn_offset_bottom",function(){
		$(triming_target).css({
			top:$(triming_area).height()-$(triming_target).height(),
		});
		$(hidden_offsety).val($(triming_area).height()-$(triming_target).height());
	});
	//rotate
	$("body").on("click",".nte_ui .btn_rotate",function(){
		$.ajax({
			url:$(".nte_ui .url_rotate").text(),
			method:"POST",
			data:{
				path:$(".nte_ui .hidden_path").val(),
			},
			success:function(data){

				if(data.enabled){
						index++;
						$(".nte_ui .nte_window .step2 .triming_area .trim_image_base").attr("src",data.path+"?"+index);
				}
			},
		});

	});


	//zoom up down
	var zoom_progress=".nte_ui .step2 .zoom_progress";
	var zoom_progress_value=".nte_ui .step2 .zoom_progress .value";
	var target_width=$(triming_target).width();
	var target_height=$(triming_target).height();
	var hidden_zoom=".nte_ui .hidden_zoom";
	$(window).on("resize",function(){
		target_width=$(triming_target).width();
		target_height=$(triming_target).height();
	});

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
	$("body").on("touchmove",zoom_progress,function(e){
		var persec=parseInt(((e.originalEvent.targetTouches[0].clientX-$(zoom_progress).offset().left)*100)/$(zoom_progress).width());
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
			$(hidden_zoom).val((persec)+100);
		}
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
		$(".nte_ui .file_setfile").val("");
		$(".nte_ui .nte_window .foots").addClass("hidden");
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

		$(".nte_ui .nte_window .foots").addClass("hidden");
		$(".nte_ui .file_setfile").val("");

		$(".nte_ui .btn_trimclear").click();
	});

	//submit
	$("body").on("click",".nte_ui .btn_submits",function(){

		$(".nte_ui .hidden_width_base").val($(".nte_ui .nte_window .step2 .triming_area").width());
		$(".nte_ui .hidden_width").val($(".nte_ui .nte_window .step2 .triming_area .trimarea").width());
		$(".nte_ui .hidden_height").val($(".nte_ui .nte_window .step2 .triming_area .trimarea").height());

		$.ajax({
			url:$(".nte_ui .url_trimupload").text(),
			type:"POST",
			data:new FormData($(".form_trims").get(0)),
			async:true,
			contentType:false,
			processData:false,
			beforeSend:function(xhr, setting){
				$(".nte_ui .waiting_icon").css({
					"opacity":1,
					"-webkit-opacity":1,
					"-moz-opacity":1,
					"-ms-opacity":1,
					"-o-opacity":1,
				});
				return true;
			},
			success:function(data){

				if(data.enabled){
					$(".nte_ui .waiting_icon").css({
						"opacity":0,
						"-webkit-opacity":0,
						"-moz-opacity":0,
						"-ms-opacity":0,
						"-o-opacity":0,
					});

					$(".nte_ui #nte_ui").prop("checked",false);

					//value input
					$("img[data-nte="+nte_name+"]").attr("src",data.path+"?"+new Date().getSeconds());
					$("*[data-nte="+nte_name+"][data-nte_mode=path]").val(data.path);
					$("*[data-nte="+nte_name+"][data-nte_mode=file_name]").val(data.file_name);
					$("*[data-nte="+nte_name+"][data-nte_mode=changed]").val(1);

					$("*[data-nte="+nte_name+"][data-nte_mode=delete_btn]").addClass("active");

					if(!$("#hidden_retry").text()){
						$(".nte_ui .btn_trimclear").click();
						$(".nte_ui .file_setfile").val("");
						$(".nte_ui .nte_window .step2").removeClass("active");
						$(".nte_ui .nte_window .step1").addClass("active");
						$(".nte_ui .nte_window .foots").addClass("hidden");
					}
				}
			}
		});

	});

	//thumbnail clear(outer event)
	$("body").on("click","*[data-nte][data-nte_mode=delete_btn]",function(){
		var nte_name=$(this).attr("data-nte");

		$("img[data-nte="+nte_name+"]").attr("src","");
		$("*[data-nte="+nte_name+"][data-nte_mode=path]").val("");
		$("*[data-nte="+nte_name+"][data-nte_mode=file_name]").val("");
		$("*[data-nte="+nte_name+"][data-nte_mode=changed]").val(0);
	});
});