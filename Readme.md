# Modal（弹出层）
A modal displays content that temporarily blocks interactions with the main view of a site. 需要 jQuery 配合使用

## jmodal.Alert(option Object)
|参数|说明|默认值|
|----|----|----:|
|title|窗口标题|"提示"|
|body|窗口内容|""|
|width|弹出层的宽度|400px|
|height|弹出层的高度|200px|
|button|按钮名称|"确定"|
|onAccept|点击按钮时的回调函数|function(){}|
|zIndex|CSS 的 z-index 属性|1000|

## jmodal.Confirm(option Object)
|参数|说明|默认值|
|----|----|----:|
|title|窗口标题|"提示"|
|body|窗口内容|""|
|width|弹出层的宽度|400px|
|height|弹出层的高度|200px|
|button_onAccept|确认按钮名称|"确定"|
|button_onDeny|取消按钮名称|"取消"|
|onAccept|点击确认按钮时的回调函数|function(){}|
|onDeny|点击取消按钮时的回调函数|function(){}|
|zIndex|CSS 的 z-index 属性|999|

## jmodal.Modal(option Object)
|参数|说明|默认值|
|----|----|----:|
|html|html代码|""|
|width|弹出层的宽度|400px|
|height|弹出层的高度|300px|
|clickclose|点击空白处是否关闭弹出层|false|
|zIndex|CSS 的 z-index 属性|888|

## jmodal.ModalRaw(option Object)
这个不带关闭按钮，可以完全定制弹出层的内容。

|参数|说明|默认值|
|----|----|----:|
|html|html代码|""|
|width|弹出层的宽度|400px|
|height|弹出层的高度|300px|
|**isBlockbg**|是否要让背景不可点击|true|
|zIndex|CSS 的 z-index 属性|777|

**用到CSS的`position:fixed`，注意兼容性。**

## jmodal.Show(layer String)
显示弹出层。

|参数取值|对应层|
|:----|----:|
|layerAlert|jmodal.Alert(option Object)|
|layerConfirm|jmodal.Confirm(option Object)|
|layerModal|jmodal.Modal(option Object)|
|layerModalRaw|jmodal.ModalRaw(option Object)|

## jmodal.Hide(layer String)
关闭弹出层。参数说明同 jmodal.Show(layer String)。

## 使用方法
``` javascript
jmodal.Alert({
	title: 'Warning',
	body: 'OMG',
	button: 'KILL ME'
});

jmodal.Confirm({
	body: 'Would you like to come?',
	onAccept: function() {
		alert('Welcome')
	}
});

jmodal.Modal({
	html: '<h1>Thank you</h1><p>You are a kind man.</p>'
});

jmodal.ModalRaw({
			html: '<div style=\'background-color:pink;border-radius:10px;\'><h1>Thank you</h1><p>You are a kind man.</p><a href="javascript:jmodal.Hide(\'layerModalRaw\')">Close</a></div>',
			isBlockbg: false,
			zIndex: 999999
})
```
## DEMO（演示）
其中`test.html`文件是演示文件。