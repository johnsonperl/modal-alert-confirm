;
//(function($, window, document, undefined) {
//initiation
var jmodalBox = "jmodal";
var layer_modal = "layerModal";
var layer_alert = "layerAlert";
var layer_confirm = "layerConfirm";


$(function() {
	$("body").append('<div id="' + jmodalBox + '"></div>');
});

function jModal(option) {
	var options = {
		html: "",
		width: "400px",
		height: "300px",
		clickclose: false
	}
	$.extend(options, option);

	if ($("#" + layer_modal).length == 0) {
		$("#" + jmodalBox).append('<div id="' + layer_modal + '" class="modalant" onclick="jstopPPg(event)"><div></div><span id="jclosemodal" onclick="jmHide(\'' + layer_modal + '\')"></span></div>');
	}



	var action = function() {
		$("#" + layer_modal).css({
			width: options.width,
			height: options.height,
			"margin-left": -(parseFloat(options.width) / 2) + "px",
			"margin-top": -(parseFloat(options.height) / 2) + "px"
		}).find("div:first-of-type").html(options.html);

		if (options.clickclose) {
			$("#" + jmodalBox).click(function() {
				jmHide(layer_modal);
			});
		} else {
			$("#" + jmodalBox).unbind("click");
		}
	}

	setTimeout(function() {
		action();
		jmShow(layer_modal);
	}, 100);
}

function jstopPPg(e) {
	e.stopPropagation();
}

function jmShow(layer) {
	if (layer == layer_modal) {
		$("#" + jmodalBox).addClass("dark");
	} else {
		$("#" + jmodalBox).removeClass("dark");
	}
	$("#" + layer).addClass("show");
	$("body").addClass("modal-up");
	$("#" + jmodalBox).addClass("active");
}

function jmHide(layer) {
	var layer_arr = new Array(layer_modal, layer_alert, layer_confirm);
	var ok = true;
	for (var i = 0, len = layer_arr.length; i < len; i++) {
		if (layer_arr[i] != layer && $("#" + layer_arr[i]).hasClass("show")) {
			ok = false;
			break;
		}
	}

	if (ok) {
		$("#" + jmodalBox).removeClass("active");
		$("body").removeClass("modal-up");
	}

	$("#" + layer).removeClass("show");
}

function jAlert(option) {
	var options = {
		title: "提示",
		body: "",
		width: "400px",
		height: "200px",
		button: "确定",
		accept: function() {}
	}

	$.extend(options, option);

	if ($("#"+layer_alert).length == 0) {
		$("#"+jmodal).append('<div id="'+layer_alert+'" class="modalant"></div>');
	}
	$("#jmodalAlert").html('<div id="alertbox" class="modalant"><div>' + options.title + '</div><div>' + options.body + '</div><div class="buttons"><span>' + options.button + '</span></div></div>');

	setTimeout(function() {
		$("#jmodalAlert > div").css({
			width: options.width,
			height: options.height,
			"margin-left": -(parseFloat(options.width) / 2) + "px",
			"margin-top": -(parseFloat(options.height) / 2) + "px"
		});

		$("#jmodalAlert div.buttons span").click(function() {
			hide();
			options.accept();
		});

		show()
	}, 100);

	var show = function() {
		$("body").addClass("modal-up");
		$("#jmodalAlert").addClass("active");
	}

	var hide = function() {
		$("#jmodalAlert").removeClass("active");

		if (!$("#jmodalAlert").hasClass("active")) {
			$("body").removeClass("modal-up");
		}
		$("#jmodalAlert div.buttons span").unbind("click");
	}
}

function jConfirm(option) {
	var options = {
		title: "提示",
		body: "",
		width: "400px",
		height: "200px",
		button_accept: "确定",
		button_deny: "取消",
		accept: function() {},
		deny: function() {}
	}

	$.extend(options, option);

	if ($("body #jmodalAlert").length == 0) {
		$("body").append('<div id="jmodalAlert"></div>');
	}
	$("#jmodalAlert").html('<div id="alertbox" class="modalant"><div>' + options.title + '</div><div>' + options.body + '</div><div class="buttons"><span>' + options.button_accept + '</span><span>' + options.button_deny + '</span></div></div>');

	setTimeout(function() {
		$("#jmodalAlert > div").css({
			width: options.width,
			height: options.height,
			"margin-left": -(parseFloat(options.width) / 2) + "px",
			"margin-top": -(parseFloat(options.height) / 2) + "px"
		});

		$("#jmodalAlert div.buttons span:first-of-type").click(function() {
			hide();
			options.accept();
		});
		$("#jmodalAlert div.buttons span:last-of-type").click(function() {
			hide();
			options.deny();
		});

		show()
	}, 100);

	var show = function() {
		$("body").addClass("modal-up");
		$("#jmodalAlert").addClass("active");
	}

	var hide = function() {
		$("#jmodalAlert").removeClass("active");

		if (!$("#jmodalAlert").hasClass("active")) {
			$("body").removeClass("modal-up");
		}
		$("#jmodalAlert div.buttons span").unbind("click");
	}
}
//})(jQuery, window, document);