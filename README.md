# SBS chatJS Plugins
## The chatJS plugin API you've been waiting for
This is the place to store your plugins and resources for the chatJS feature of SmileBASIC Source, with a couple of goodies!
### How to use
1. Copy the contents of [bootstrap.js](http://shadowc-x-11.github.io/SBS-chatJS-Plugins/bootstrap.js) to your SBS chatJS.
2. Add your loadPlugin lines.
3. Profit!

### How to program a plugin
This plugin system adds a couple of useful functions. For example, if you add an init() function in your code, the code will run automatically when the DOM is loaded. No more attaching to window.addEventListener("load") and worrying about if it'll load or not.
Also, there's an idiom for commands.push(new Command(...)) called addCommand(name, func, desc). Finally, this adds moduleMessage, which will send a message to the user that isn't centered.

### Example

chatJS (after bootstrap data):
```js
loadPlugin("myplugin");
```
plugins/myplugin.js:
```js
var init = function(){
  systemMessage("Hello, world!");
};
```
