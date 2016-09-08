function jmodal(option) {
	var options = {
		html: "",
		width: "400px",
		height: "300px",
		clickclose:false
	}
	$.extend(options, option);

	if ($("body #jmodal").length == 0) {
		$("body").append('<div id="jmodal"></div>');
	}
	$("#jmodal").html('<div id="jmodalbox" class="modalant">' + options.html + '<span id="jclosemodal"></span></div>');

	setTimeout(function() {
		$("#jmodalbox").css({
			width: options.width,
			height: options.height,
			"margin-left":  -(parseFloat(options.width) / 2) + "px",
			"margin-top": -(parseFloat(options.height) / 2) + "px"
		});

		$("#jclosemodal").click(function(){
			hide()
		});
		$("#jmodalbox").click(function(e){
			e.stopPropagation();
		});
		if(options.clickclose){
			$("#jmodal").click(function(e){
				e.stopPropagation();
				hide();
			});
		}
		show()
	}, 100);

	var show = function(){
		$("body").addClass("modal-up");
		$("#jmodal").addClass("active");
	}

	var hide = function(){
		$("#jmodal").removeClass("active");
		$("body").removeClass("modal-up");
		$("#jmodalbox,#jclosemodal,#jmodal").unbind("click");
	}
}

function modalAlert(option){
	var options = {
		title: "提示",
		body:"",
		width: "400px",
		height: "200px",
		button:"确定",
		accept:function(){}
	}

	$.extend(options, option);

	if ($("body #jmodalAlert").length == 0) {
		$("body").append('<div id="jmodalAlert"></div>');
	}
	$("#jmodalAlert").html('<div id="alertbox" class="modalant"><div>' + options.title + '</div><div>'+options.body+'</div><div class="buttons"><span>'+options.button+'</span></div></div>');

	setTimeout(function() {
		$("#jmodalAlert > div").css({
			width: options.width,
			height: options.height,
			"margin-left":  -(parseFloat(options.width) / 2) + "px",
			"margin-top": -(parseFloat(options.height) / 2) + "px"
		});

		$("#jmodalAlert div.buttons span").click(function(){
			hide();
			options.accept();
		});

		show()
	}, 100);

	var show = function(){
		$("body").addClass("modal-up");
		$("#jmodalAlert").addClass("active");
	}

	var hide = function(){
		$("#jmodalAlert").removeClass("active");

		if(!$("#jmodalAlert").hasClass("active")){
			$("body").removeClass("modal-up");
		}
		$("#jmodalAlert div.buttons span:first-of-type").unbind("click");
	}
}