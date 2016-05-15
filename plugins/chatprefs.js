/* 
	ChatPreferences API
	By ShadowCX11
*/
window.ChatPreferences = function(name){
	this._name = "chatjs_" + (name + "");
};
ChatPreferences.prototype.getAll = function(){
	var settings = JSON.parse(localStorage.getItem("settings_" + this._name) || "[]");
	var out = {};
	settings.forEach(function(n){
		out[n] = this.get(n);
	});
	return out;
};
ChatPreferences.prototype.set = function(name, value){
	var v = JSON.stringify(value);
	var opts = JSON.parse(localStorage.getItem("settings_" + this._name) || "[]");
	if(!(name in opts)){
		opts.push(name);
		localStorage.setItem("settings_" + this._name, JSON.stringify(opts));
	}
	localStorage.setItem(this._name + "-" + name, v);
};
ChatPreferences.prototype.get = function(name){
	try {
		return JSON.parse(localStorage.getItem(this._name + "-" + name));
	} catch(e){
		return null;
	}
};
ChatPreferences.prototype.delete = function(name){
	var opts = JSON.parse(localStorage.getItem("settings_" + this._name) || "[]");
	if(name in opts){
		opts.splice(opts.indexOf(name), 1);
		localStorage.setItem("settings_" + this._name, JSON.stringify(opts));
	}
	localStorage.deleteItem(this._name + "-" + name);
};
