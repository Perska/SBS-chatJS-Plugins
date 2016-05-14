// chatJS Plugin System Bootstrap
// Put this in your chatJS
// By ShadowCX11 & slackerSnail, 2016
var xhr = new XMLHttpRequest;
xhr.open("GET", "http://raw.githubusercontent.com/ShadowC-X-11/SBS-chatJS-Plugins/required.json", false);
xhr.send();
var modules = JSON.parse(xhr.responseText);
modules.forEach(function(name){
	var x = new XMLHttpRequest;
	x.open("GET", "http://raw.githubusercontent.com/ShadowC-X-11/SBS-chatJS-Plugins/" + name, false);
	x.send();
	eval(x.responseText);
});
