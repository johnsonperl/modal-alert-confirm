# Modal（弹出层）
A modal displays content that temporarily blocks interactions with the main view of a site. 需要 jQuery 配合使用

## jmodal.Alert()
|参数|说明|默认值|
|----|----|----:|
|title|窗口标题|"提示"|
|body|窗口内容|""|
|width|弹出层的宽度|400px|
|height|弹出层的高度|200px|
|button|按钮名称|"确定"|
|onAccept|点击按钮时的回调函数|function(){}|

## jmodal.Confirm()
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

## jmodal.Modal()
|参数|说明|默认值|
|----|----|----:|
|html|html代码|""|
|width|弹出层的宽度|400px|
|height|弹出层的高度|300px|
|clickclose|点击空白处是否关闭弹出层|false|
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
```
## DEMO（演示）
其中`test.html`文件是演示文件。