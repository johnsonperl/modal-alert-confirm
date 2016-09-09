/**
 * [jmodal 用于创建弹出层，美化javascript的window.alert() 和 window.confirm()，使用方便简单。github地址：https://github.com/johnsonperl/modal-alert-confirm]
 */
var jmodal = {
	modalBox: "jmodal",
	layer_modal: "layerModal",
	layer_modalRaw: "layerModalRaw",
	layer_alert: "layerAlert",
	layer_confirm: "layerConfirm",

	inits:function(){
		if($("#"+this.modalBox).length == 0){
			$("body").append('<div id="' + jmodal.modalBox + '"></div>');
		}
	},
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
		if (!this.isActive(layer)) {
			this.removeBg()
		}

		if(layer == this.layer_modal){
			$("#" + this.modalBox).removeClass("dark");
		}

		if(layer != this.layer_modalRaw && $("#" + this.layer_modalRaw).hasClass("show")  && $("#" + this.layer_modalRaw).hasClass("nobg") && !this.isActive(layer,3)){
			this.removeBg()
		}

		$("#" + layer).removeClass("show");
	},

	isActive: function(layer,n) {
		var layer_arr = new Array(this.layer_modal, this.layer_alert, this.layer_confirm,this.layer_modalRaw);
		var ok = false;
		var len  = layer_arr.length;
		if(arguments.length == 2 && n < len){
			len = n;
		}
		for (var i = 0; i < len; i++) {
			if (layer_arr[i] != layer && $("#" + layer_arr[i]).hasClass("show")) {
				ok = true;
				break;
			}
		}
		return ok;
	},

	resizeLayer: function(layer, options) {
		return $("#" + layer).css({
			width: options.width,
			height: options.height,
			"margin-left": -(parseFloat(options.width) / 2) + "px",
			"margin-top": -(parseFloat(options.height) / 2) + "px",
			"z-index":options.zIndex
		});
	},

	removeBg:function(){
		$("#" + this.modalBox).removeClass("active");
		$("body").removeClass("modal-up");
	},

	Modal: function(option) {
		var options = {
			html: "",
			width: "400px",
			height: "300px",
			clickclose: false,
			zIndex:888
		}
		$.extend(options, option);

		this.inits()

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

	ModalRaw: function(option) {
		var options = {
			html: "",
			width: "400px",
			height: "300px",
			isBlockbg:true,
			zIndex:777
		}
		$.extend(options, option);

		this.inits()

		if ($("#" + this.layer_modalRaw).length == 0) {
			$("body").append('<div id="' + this.layer_modalRaw + '" class="modalant" onclick="jmodal.StopPPg(event)"><div></div></div>');
		}


		this.resizeLayer(this.layer_modalRaw, options).find("div:first-of-type").html(options.html);
		this.Show(this.layer_modalRaw);
		if(!options.isBlockbg && !this.isActive(this.layer_modalRaw)){
			this.removeBg();
			$("#"+this.layer_modalRaw).addClass("nobg");
		}else{
			$("#"+this.layer_modalRaw).removeClass("nobg");
		}
	},


	Alert: function(option) {
		var options = {
			title: "提示",
			body: "",
			width: "400px",
			height: "200px",
			button: "确定",
			onAccept: function() {},
			zIndex:1000
		}

		$.extend(options, option);

		this.inits()

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
			onDeny: function() {},
			zIndex:999
		}

		$.extend(options, option);

		this.inits()

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