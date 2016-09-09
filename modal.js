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

	setTimeout(functi$("#" + layer_modal).css({
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
		jmShow(layer_modal);
	}, 100);
}

function jstopPPg(e) {
	e.stopPropagation();
}

function jmShow(layer) {
	if (layer == layer_modal) {
		$("#" + jmodalBox).addClass("dark");
	} else if (!$("#" + layer_modal).hasClass("show")) {
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

	if ($("#" + layer_alert).length == 0) {
		$("#" + jmodalBox).append('<div id="' + layer_alert + '" class="modalant jalcf" onclick="jstopPPg(event)"></div>');
	}

	setTimeout(function() {
		$("#" + layer_alert).css({
			width: options.width,
			height: options.height,
			"margin-left": -(parseFloat(options.width) / 2) + "px",
			"margin-top": -(parseFloat(options.height) / 2) + "px"
		}).html('<div>' + options.title + '</div><div>' + options.body + '</div><div class="buttons"><span>' + options.button + '</span></div>');

		$("#" + layer_alert + " div.buttons span").click(function() {
			jmHide(layer_alert);
			options.accept();
		});
		jmShow(layer_alert);
	}, 100);
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

	if ($("#" + layer_confirm).length == 0) {
		$("#" + jmodalBox).append('<div id="' + layer_confirm + '" class="modalant jalcf" onclick="jstopPPg(event)"></div>');
	}
	setTimeout(function() {
		$("#" + layer_confirm).css({
			width: options.width,
			height: options.height,
			"margin-left": -(parseFloat(options.width) / 2) + "px",
			"margin-top": -(parseFloat(options.height) / 2) + "px"
		}).html('<div>' + options.title + '</div><div>' + options.body + '</div><div class="buttons"><span>' + options.button_accept + '</span><span>' + options.button_deny + '</span></div>');

		$("#" + layer_confirm + " div.buttons span:first-of-type").click(function() {
			jmHide(layer_confirm);
			options.accept();
		});
		$("#" + layer_confirm + " div.buttons span:last-of-type").click(function() {
			jmHide(layer_confirm);
			options.deny();
		});
		jmShow(layer_confirm)
	}, 100);
}