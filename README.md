如需使用，请先引入js文件
```html
<script src="/js/captcha.jquery.js"></script>
//or
<script src="/js/captcha.apicloud.js"></script>
```

每个验证码都需要创建一个对象

```js
//appId 对应appId
//appCode 对应加密完的appKey，加密方式参考云ＡＰＩ
var cap = new Captcha(appId,appCode);
```
创建完对象后，即可获取图片验证码

```js
//获取图片是一个异步操作，所以需要在回调内操作
cap.getImage(function(err,img){
	if(err) return;
	$("#imgcap").html(img);
})
```

发送短信验证码时，需要传递token，可通过getToken获取
```js
var token = cap.getToken();//同步操作
```

一个对象获取过一次验证码后，再次获取即为刷新
```js
//第一次获取图片验证码，会在captcha表内生成一条数据
cap.getImage(function(err,img){
	if(err) return;
	$("#imgcap").html(img);
})
//刷新操作会更新这一条数据
$("#imgcap").on("click","img",function(){
	cap.getImage(function(err,img){
		if(err) return;
		$("#imgcap").html(img);
	})
})
```
如果发送成功后，还在当前页面，还会进行刷新验证码操作，需要在验证成功后把token置为空
```js
cap.setToken();//不传值即为undefined
```

如果需要多个验证码，则多次创建即可
```js
var cap1 = new Captcha(appId,appCode);
var cap2 = new Captcha(appId,appCode);
cap1.getImage(function(err,img){
	if(err) return;
	$("#imgcap1").html(img);
})
cap2.getImage(function(err,img){
	if(err) return;
	$("#imgcap2").html(img);
})
```

与mcm-js-sdk协作
```js
	//首先引入js文件
	<script src="/js/APICloud-rest-SHA1.js"></script>
	<script src="/js/captcha.apicloud.js"></script>
```

```js
	//需要APICloud平台的appId与AppKey
	var client = new Resource("appId", "appKey");
	var cap1 = new Captcha(client.appId,client.appCode);
	//其他操作参考上边的描述
	cap1.getImage(function(err,img){
		if(err) return;
		$("#imgcap1").html(img);
	})
```