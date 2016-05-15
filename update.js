// chatJS Plugin System Bootstrap updater
// By ShadowCX11


var latestVer = "1.1";

var addUpdateCommand = function(){
  commands.push(new Command("update", update, "Updates the bootstrap"));
}
var serialize = function(obj, prefix) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

var update = function(){
  var a = new XMLHttpRequest;
  a.open("GET", "http://shadowc-x-11.github.io/SBS-chatJS-Plugins/bootstrap.js", false);
  a.send();
  var n = a.responseText;
  n = /^[\s\S]*(\n\/\/ START BOOT\n[\s\S]+?\n\/\/ END BOOT)[\s\S]*$/.exec(n)[1];
  var chatJS = new XMLHttpRequest;
  chatJS.open("GET", "/query/chatJS", false);
  chatJS.send();
  chatJS = chatJS.responseText;
  var n = chatJS.replace(/\n\/\/ START BOOT\n[\s\S]+?\/\/ END BOOT/, n);
  var h = new XMLHttpRequest;
  h.open("POST", "/query/savesettings?pretty=1", false);
  var fd = new FormData;
  fd.append("chatJS", JSON.stringify(n))
  h.send(fd);
  systemMessage(h.responseText);
};
addUpdateCommand();
// First, check for the first bootstrap by seeing if the ver variable exists
if(typeof ver === "undefined"){
  setTimeout(function(){
    warningMessage("There is an update to the bootstrap. Please get the latest version from http://shadowc-x-11.github.io/SBS-chatJS-Plugins/bootstrap.js");
  }, 3000);
} else {
  // Now we check if this is the latest version, and if it isn't, show a message and add /update (seeing that's the point of this)
  if(Number(ver) < Number(latestVer)){
    setTimeout(function(){
      warningMessage("Bootstrap update:\nThere is an update to the chatJS bootstrap. Use /update to auto update or get the latest from http://shadowc-x-11.github.io/SBS-chatJS-Plugins/bootstrap.js\nYour version: " + ver + "\nLatest version: " + latestVer);
    }, 3000);
    addUpdateCommand();
  }
}
