/*
 * Plugin Info Checker
 * by slackerSnail
 */
function _pluginInfo(name) {
  var xhr = new XMLHttpRequest;
  var json, message = "";
  xhr.open("GET", "http://ShadowC-X-11.github.io/SBS-chatJS-Plugins/info/" + name + ".json?t=" + (new Date()).getTime(), false);
  xhr.send();
  
  if(xhr.status == 404) {
    warningMessage("Plugin info not found!");
  } else {
    try {
      json = JSON.parse(xhr.responseText);
    } catch (e) {
      warningMessage("Plugin info error: " + e.message);
    }
    //if we're all clear, begin parsing the info.
    message += json.name + "\n" + json.description + "\n*****\n\nCommands\n=====";
    if(json.commands) {
      json.commands.forEach(function(cmd) {
       message += "\n" + cmd.name + "\n" + cmd.description + "\n-----";
      });
    } else {
      message += "\nThis plugin has no commands.";
    }
    moduleMessage(message);
  }
}

function init() {
  addCommand("plugininfo", function(arg) {
    var params = quickParamParse(arg);
    if(params.length != 1) {
     warningMessage("Incorrect args!");
    } else {
     _pluginInfo(params[0]);
    }
  }, "Gets information on the named plugin.");
}
