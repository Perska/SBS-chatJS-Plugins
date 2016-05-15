// chatJS Plugin System Bootstrap
// Put this in your chatJS
// By ShadowCX11 & slackerSnail, 2016
var xhr = new XMLHttpRequest;
xhr.open("GET", "https://raw.githubusercontent.com/ShadowC-X-11/SBS-chatJS-Plugins/master/required.json", false);
xhr.send();
alert(xhr.responseText)
var modules = JSON.parse(xhr.responseText);
modules.forEach(function(name){
	var x = new XMLHttpRequest;
	x.open("GET", "https://raw.githubusercontent.com/ShadowC-X-11/master/SBS-chatJS-Plugins/" + name, false);
	x.send();
	eval(x.responseText);
});

loadPlugin("logs");
