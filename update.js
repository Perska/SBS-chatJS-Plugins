// chatJS Plugin System Bootstrap updater
// By ShadowCX11


var latestVer = "1.1";

var addUpdateCommand = function(){
  commands.push(new Command("update", update, "Updates the bootstrap"));
}

var update = function(){
  var a = new XMLHttpRequest;
  a.open("GET", "http://shadowc-x-11.github.io/SBS-chatJS-Plugins/bootstrap.js", false);
  a.send();
  var n = a.responseText;
  n = /^[\s\S]*\n(\/\/ START BOOT\n[\s\S]+?\n\/\/ END BOOT)\n[\s\S]+?$/.exec(n)[1];
  var chatJS = new XMLHttpRequest;
  chatJS.open("GET", "/query/chatJS", false);
  chatJS.send();
  chatJS = chatJS.responseText;
  var n = chatJS.replace(/\n\/\/ START BOOT\n[\s\S]+?\/\/ END BOOT/, n);
  alert(n);
};
addUpdateCommand();
// First, check for the first bootstrap by seeing if the ver variable exists
if(typeof ver === "undefined"){
  setTimeout(function(){
    warningMessage("There is an update to the bootstrap. Please get the latest version from http://shadowc-x-11.github.io/SBS-chatJS-Plugins/bootstrap.js");
  }, 3000);
} else {
  // Now we check if this is the latest version, and if it isn't, show a message and add /update (seeing that's the point of this)
  alert(Number(ver) < Number(latestVer));
  if(new Number(ver) < new Number(latestVer)){
    setTimeout(function(){
      warningMesaage("Bootstrap update:\nThere is an update to the chatJS bootstrap. Use /update to auto update or get the latest from http://shadowc-x-11.github.io/SBS-chatJS-Plugins/bootstrap.js\nYour version: " + ver + "\nLatest version: " + latestVer);
    }, 3000);
    addUpdateCommand();
  }
}
