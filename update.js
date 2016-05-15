// chatJS Plugin System Bootstrap updater
// By ShadowCX11

var chatJS = new XMLHttpRequest;
chatJS.open("GET", "/query/chatJS", false);
chatJS.send();

chatJS = chatJS.responseText;
var latestVer = "1.1";

var update = function(){
  var a = new XMLHttpRequest;
  a.open("GET", "http://shadowc-x-11.github.io/SBS-chatJS-Plugins/bootstrap.js");
  a.send();
  var n = a.responseText;
  n.replace(/.+?(\/\/ START BOOT\n.+?\/\/ END BOOT).*/, "\1");
  alert(n);
};

// First, check for the first bootstrap by seeing if the ver variable exists
if(typeof ver === "undefined"){
  setTimeout(function(){
    warningMessage("There is an update to the bootstrap. Please get the latest version from http://shadowc-x-11.github.io/SBS-chatJS-Plugins/bootstrap.js");
  }, 3000);
} else {
  // Now we check if this is the latest version, and if it isn't, show a message and add /update (seeing that's the point of this)
  if((+ver) < (+latestVer)){
    setTimeout(function(){
      warningMesaage("Bootstrap update:\nThere is an update to the chatJS bootstrap. Use /update to auto update or get the latest from http://shadowc-x-11.github.io/SBS-chatJS-Plugins/bootstrap.js\nYour version: " + ver + "\nLatest version: " + latestVer);
    }, 3000);
    addUpdateCommand();
  }
}
