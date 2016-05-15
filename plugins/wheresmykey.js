/*
      A thing that spits a randomly generated key.
      Notice: WIP.
*/

var key = function(arg){
      var chars_;
      if (arg.length === 0){
          chars_ = 8;
      }
      else{
          chars_ = arg[0];
      }
      var key = '';
      for (var i = 0; i < chars_; i++){
          key += "0123456789ABCDEFHJIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 36)];
      }
      systemMessage("The key is: " + key + ".");
};

addCommand("whatsthekey", key, "Spits a key from the given length. If no params are given, length defaults to 8.");

//Notice: plugin not tested yet!
