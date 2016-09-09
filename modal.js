var jmodal = {
	modalBox: "jmodal",
	layer_modal: "layerModal",
	layer_alert: "layerAlert",
	layer_confirm: "layerConfirm",
	//stop click propagation
	StopPPg: function(e) {
		e.stopPropagation();
	},

	Show: function(layer) {
		if (layer == this.layer_modal) {
			$("#" + this.modalBox).addClass("dark");
		} else if (!$("#" + this.layer_modal).hasClass("show")) {
			$("#" + this.modalBox).removeClass("dark");
		}
		$("#" + layer).addClass("show");
		$("body").addClass("modal-up");
		$("#" + this.modalBox).addClass("active");
	},

	Hide: function(layer) {
		var layer_arr = new Array(this.layer_modal, this.layer_alert, this.layer_confirm);
		var ok = true;
		for (var i = 0, len = layer_arr.length; i < len; i++) {
			if (layer_arr[i] != layer && $("#" + layer_arr[i]).hasClass("show")) {
				ok = false;
				break;
			}
		}

		if (ok) {
			$("#" + this.modalBox).removeClass("active");
			$("body").removeClass("modal-up");
		}

		$("#" + layer).removeClass("show");
	},

	resizeLayer: function(layer, options) {
		return $("#" + layer).css({
			width: options.width,
			height: options.height,
			"margin-left": -(parseFloat(options.width) / 2) + "px",
			"margin-top": -(parseFloat(options.height) / 2) + "px"
		});
	},

	Modal: function(option) {
		var options = {
			html: "",
			width: "400px",
			height: "300px",
			clickclose: false
		}
		$.extend(options, option);

		if ($("#" + this.layer_modal).length == 0) {
			$("#" + this.modalBox).append('<div id="' + this.layer_modal + '" class="modalant" onclick="jmodal.StopPPg(event)"><div></div><span id="jclosemodal" onclick="jmodal.Hide(\'' + this.layer_modal + '\')"></span></div>');
		}


		this.resizeLayer(this.layer_modal, options).find("div:first-of-type").html(options.html);

		if (options.clickclose) {
			$("#" + this.modalBox).click(function() {
				jmodal.Hide(jmodal.layer_modal);
			});
		} else {
			$("#" + this.modalBox).unbind("click");
		}
		this.Show(this.layer_modal);
	},

	Alert: function(option) {
		var options = {
			title: "提示",
			body: "",
			width: "400px",
			height: "200px",
			button: "确定",
			onAccept: function() {}
		}

		$.extend(options, option);

		if ($("#" + this.layer_alert).length == 0) {
			$("#" + this.modalBox).append('<div id="' + this.layer_alert + '" class="modalant jalcf" onclick="jmodal.StopPPg(event)"></div>');
		}

		this.resizeLayer(this.layer_alert, options).html('<div>' + options.title + '</div><div>' + options.body + '</div><div class="buttons"><span>' + options.button + '</span></div>');

		$("#" + this.layer_alert + " div.buttons span").click(function() {
			jmodal.Hide(jmodal.layer_alert);
			options.onAccept();
		});
		this.Show(this.layer_alert);
	},

	Confirm: function(option) {
		var options = {
			title: "提示",
			body: "",
			width: "400px",
			height: "200px",
			button_onAccept: "确定",
			button_onDeny: "取消",
			onAccept: function() {},
			onDeny: function() {}
		}

		$.extend(options, option);

		if ($("#" + this.layer_confirm).length == 0) {
			$("#" + this.modalBox).append('<div id="' + this.layer_confirm + '" class="modalant jalcf" onclick="jmodal.StopPPg(event)"></div>');
		}

		this.resizeLayer(this.layer_confirm, options).html('<div>' + options.title + '</div><div>' + options.body + '</div><div class="buttons"><span>' + options.button_onAccept + '</span><span>' + options.button_onDeny + '</span></div>');

		$("#" + this.layer_confirm + " div.buttons span:first-of-type").click(function() {
			jmodal.Hide(jmodal.layer_confirm);
			options.onAccept();
		});
		$("#" + this.layer_confirm + " div.buttons span:last-of-type").click(function() {
			jmodal.Hide(jmodal.layer_confirm);
			options.onDeny();
		});
		this.Show(this.layer_confirm)
	}
}



$(function() {
	$("body").append('<div id="' + jmodal.modalBox + '"></div>');
});