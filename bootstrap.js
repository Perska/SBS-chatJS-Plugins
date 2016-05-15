// chatJS Plugin System Bootstrap
// Put this in your chatJS
// By ShadowCX11 & slackerSnail, 2016
// Don't remove // START BOOT and // END BOOT, they're used for the updater script
// However, you can remove the comments above

// START BOOT
var ver = "1.1";
var xhr = new XMLHttpRequest;
xhr.open("GET", "http://ShadowC-X-11.github.io/SBS-chatJS-Plugins/required.json?t=" + (new Date()).getTime(), false);
xhr.send();
var modules = JSON.parse(xhr.responseText);
modules.forEach(function(name){
	var x = new XMLHttpRequest;
	x.open("GET", "http://ShadowC-X-11.github.io/SBS-chatJS-Plugins/" + name + "?t=" + (new Date()).getTime(), false);
	x.send();
	eval(x.responseText);
});
//END BOOT

// Put your plugin loads here
