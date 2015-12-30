function Captcha(appId,appCode,appUrl){
	this.appId = appId;
	this.appCode = appCode;
	this.appUrl = appUrl || "https://d.apicloud.com/mcm/api";
	this.token = undefined;
}
Captcha.prototype.getImage = function(callback){
	var options = {
		url:this.appUrl+"/captcha"+(this.token?"/"+this.token:""),
		method:"POST",
		data:{
			"_method":this.token?"PUT":undefined
		},
		headers:{
			"X-APICloud-AppId":this.appId,
			"X-APICloud-AppKey":this.appCode
		}
	}
	var self =this;
	$.ajax(options).done(function(data){
		if(data.id){
			self.token = data.id;
			var img = "<img src='data:image/jpeg;base64,"+data.imgbase64 +"' />";
			callback(null,img);
		}else{
			callback(data)
		}
	}).fail(function(err){
		callback(err);
	})
}
Captcha.prototype.getToken = function(){
	return this.token;
}
Captcha.prototype.setToken = function(value){
	this.token = value;
}