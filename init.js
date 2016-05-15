/* 
	SBS chatJS Plugin System Initializer
	
	By ShadowCX11 & slackerSnail, 2016
*/

var loadedPlugins = [];
window.setImmediate = function(func){
	return setTimeout(func, 0);
};

// By slackerSnail
function addCommand(name, body, desc) {
	commands.push(new Command(name, body, desc));
};

window.loadPlugin = function(pluginName){
	if(pluginName in loadedPlugins)
		return;
	setTimeout(function(){
		var injection = "\nvar init = init || function(){};\n if(typeof Socket === \"undefined\"){init();} else{window.addEventListener(\"load\", init);}";
		var baseURL = "http://raw.githubusercontent.com/ShadowC-X-11/SBS-chatJS-Plugins/master/plugins/";
		var xhr = new XMLHttpRequest;
		xhr.open("GET", baseURL + pluginName + ".js", false);
		xhr.send();
		try {
			eval("var init;\n" + xhr.responseText + "\n" + injection);
			loadedPlugins.push(pluginName);
		} catch(e){
			warningMessage("Error loading plugin:\n");
			console.error(e);
			alert(e);
		}
	}, 0);
};
addCommand("loadplugin", loadPlugin, "Loads a plugin from the SBS chatJS database");

var EventEmitter = function(){
	this._events = {};
};
EventEmitter.prototype._attachEvent = function(event, func, once){
	this._events[event] = this._events[event] || [];
	this._events[event].push({
		"callback": func,
		"once": once || false
	});
	return this._events[event].length;
};
EventEmitter.prototype._callHandlers = function(event, args){
	var handles = this._events[event] || [];
	for(var i = 0; i < handles.length; i++){
		switch(handles.once){
			case true:
				var out = handles[i].callback.call(this, args);
				handles[i] = {};
				break;
			case false:
				var out = handles[i].callback.call(this, args);
				break;
		}
	}
};
EventEmitter.prototype.on = function(event, func){
	this._attachEvent(event, func, false);
};
EventEmitter.prototype.once = function(event, func){
	this._attachEvent(event, func, true);
};
EventEmitter.prototype.emit = function(event){
	var args = [].slice.call(arguments, [1]);
	return this._callHandlers(event, args);
};

var moduleMessage = function(msg){
	displayMessage({
		"type": "module",
		"module": "chatjs",
		"uid": useruid,
		"message": msg
	});
};

var localhelp = function(arg){
	var s = arg.split(" ")[0];
	var msg = "";
	if(s === ""){
		msg += "Help for local commands:\n\n"
		commands.forEach(function(cmd){
			msg += "/" + cmd.command + " => " + cmd.description + "\n";
		});
	} else {
		msg += "Help for commands containing \"" + s + "\":";
		commands.forEach(function(cmd){
			var n = cmd.name;
			if(n.indexOf(s) !== -1)
				msg += cmd.name + " => " + cmd.description + "\n";	
		});
	}
	moduleMessage(msg);
};
addCommand("localhelp", localhelp, "Shows the help.");

var events = new EventEmitter;
var odm = displayMessage;
displayMessage = function(msg){
	events.emit("message", msg);
	odm(msg);
};
