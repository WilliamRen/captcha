function Captcha(appId,appCode,appUrl){
	this.appId = appId;
	this.appCode = appCode;
	this.appUrl = appUrl || "https://d.apicloud.com/mcm/api";
	this.token = undefined;
}
Captcha.prototype.getImage = function(callback){
	var options = {
		url:this.appUrl+"/captcha"+(this.token?"/"+this.token:""),
		method:this.token?"PUT":"POST",
		data:{
		},
		headers:{
			"X-APICloud-AppId":this.appId,
			"X-APICloud-AppKey":this.appCode
		}
	}
	var self =this;
	api.ajax(options,function(ret,err){
		if(ret&&ret.id){
			self.token = ret.id;
			var img = "<img src='data:image/jpeg;base64,"+ret.imgbase64 +"' />";
			callback(null,img);
		}else{
			callback(ret)
		}
	})
}
Captcha.prototype.getToken = function(){
	return this.token;
}
Captcha.prototype.setToken = function(value){
	this.token = value;
}