/*
 *	Log Linker
 *	By slackerSnail
 */
 
//Logger isn't public anymore.
//Thus, this plugin is broken and shouldn't be imported.
//I'm leaving the file here so people's imports don't immediately break or whatever,
//but on plugin init they'll get a pretty little warning message.
 
function _datestamp(dateObj) {
	var now = dateObj;
	var month = now.getUTCMonth() + 1;
	var date = now.getUTCDate();
	var year = now.getUTCFullYear();
	year = ("000" + year.toString()).slice(-2);
	date = ("0" + date.toString()).slice(-2);
	month = ("0" + month.toString()).slice(-2);
	var datestamp = year + "-" + month + "-" + date;
	return datestamp;
}

function _getlog(params) {
	var filename;
	var now;

	switch(params.length) {
		case 0:
			warningMessage("Must pass an argument!");
			break;
		case 1:
			switch(params[0]) {
				case "today":
					now = new Date();
					filename = "smilebasicsource.com/scratch/notactuallylogs/" + _datestamp(now) + ".txt";
					moduleMessage("Logs for today: " + filename);
					break;
				case "yesterday":
					now = new Date();
					now.setUTCDate(now.getUTCDate() - 1);
					filename = "smilebasicsource.com/scratch/notactuallylogs/" + _datestamp(now) + ".txt";
					moduleMessage("Logs for yesterday: " + filename);
					break;
				default:
					filename = "smilebasicsource.com/scratch/notactuallylogs/" + params[0] + ".txt";
					moduleMessage("Logs for " + params[0] + ": " + filename);
					break;
			}
			break;
		default:
			warningMessage("Incorrect number of args!");
			break;
	}
}

function init() {
	warningMessage("Don't import /logs anymore. It doesn't work.\nIf you don't want to see this, remove it from your chatJS imports.")
	/*
	addCommand("logs", function(arglist) {
		var params = quickParamParse(arglist);
		_getlog(params);
	}, "Get log URL for given param");
	*/
}
