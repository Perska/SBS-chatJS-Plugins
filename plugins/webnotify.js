/*
	Web Notification System
	By ShadowCX11, 2016
*/

loadPlugin("chatprefs");

var notify = function(){
	if(allowNotify === false){
		if(Notification.permission !== "granted"){
			Notification.requestPermission().then(function(res){
				if(req !== "granted"){
					warningMessage("You didn't give permission to use notifications. Notifications are now disabled.");
				} else {
					notifyPrefs.set("enabled", allowNotify = !allowNotify);
					systemMessage("Notifications enabled.");
				}
			});
		} else {
			notifyPrefs.set("enabled", allowNotify = !allowNotify);
			systemMessage("Notifications enabled.");
		}
	} else {
		allowNotify = false;
		systemMessage("Notifications disabled.");
	}
};
var notifyWhen = function(){
	notifyPrefs.set("when", whenNotify = !whenNotify);
	if(whenNotify){
		systemMessage("Will now only notify when username is mentioned.");
	} else {
		systemMessage("Will now always notify");
	}
};
var unescape = function(txt){
	var d = document.createElement("span");
    d.innerHTML = txt;
	return d.textContent;
};

var bg = false;
window.addEventListener("blur", function(){
	bg = true;
});
window.addEventListener("focus", function(){
	bg = false;
});

var doNotify = function(user, message, img){
	return new Notification(user, {
		body: message,
		icon: img
	});
};
var init = function(){
	setTimeout(function(){
		notifyPrefs = new ChatPreferences("notify");
		if(notifyPrefs.get("enabled") == null){
			notifyPrefs.set("enabled", false);
		}
		if(notifyPrefs.get("when") == null){
			notifyPrefs.set("when", true);
		}
		allowNotify = notifyPrefs.get("enabled");
		whenNotify = notifyPrefs.get("when");
		systemMessage("Web Notifications plugin loaded!");
	}, 2000);
	var odm = displayMessage;
	displayMessage = function(msg){
      try {
		if(!bg || !allowNotify || (ignoreList.indexOf(msg.uid) !== -1)){
			return odm(msg);
		}
		var un = "", mesg = unescape(msg.message), img = "";
		if(whenNotify && (mesg.indexOf(username) === -1)){
			return odm(msg);
		}
		switch(msg.type){
			case "message":
				un = msg.username + msg.stars;
				img = msg.avatar;
				break;
			case "module":
				un = "Module \"" + msg.module + "\"";
				switch(msg.module){
					case "pm":
						img = "http://megaicons.net/static/img/icons_sizes/8/178/512/buzz-message-outline-icon.png";
						break;
					case "coin":
						img = "http://vignette2.wikia.nocookie.net/my-mario-list/images/6/6d/Coin.png/revision/latest?cb=20130113020535";
						break;
					case "polls":
						img = "http://www.blazingcatfur.ca/wp-content/uploads/2015/10/Polls.png";
						break;
					case "cgame":
						img = "http://www.clker.com/cliparts/Y/K/1/J/s/s/brown-rope-sack-hi.png";
						break;
					case "fun":
						img = "http://www.seijinohki.com/stuff/face.png";
						break;
					default:
						img = "http://vignette1.wikia.nocookie.net/konfabulator/images/e/e7/Slthytove_Gears.png/revision/latest?cb=20051014194552";
				}
				break;
			case "warning":
				un = "IMPORTANT";
				img = "http://vignette2.wikia.nocookie.net/amazingrace/images/0/04/Caution.png/revision/latest?cb=20100302135747";
				break;
			case "system":
				un = "System";
				img = "https://cdn3.iconfinder.com/data/icons/macosxstyle/macosxstyle_png/512/System%20Preferences.png";
				break;
		}
		doNotify(un, mesg, img);
		return odm(msg);
      } catch(e){
		warningMessage(e.stack);
      }
	};
};

addCommand("notify", notify, "Toggles web notifications");
addCommand("notifywhen", notifyWhen, "Toggles when to show notifications");
