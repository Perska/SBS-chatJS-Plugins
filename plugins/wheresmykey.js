/*
      A thing that spits a randomly generated key.
      This should work now. I'm not 100% sure, tho. I did test it manually.
      Code not stolen by 12Me21 with some changes.
      Plugin written by Perska in 2016
*/

var key = function(param){
      var params = quickParamParse(param);
      var whatsthekeylength;
      var include_weirds = 0;
      whatsthekeylength = 8;
      if (params.length > 0){
            whatsthekeylength = params[0];
      }
      var mahkey = '';
      for (var i = 0; i < whatsthekeylength; i++){
            mahkey += "0123456789ABCDEFHJIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 36)];
      }
      moduleMessage("The key is: " + mahkey + ".");
};

addCommand("whatsthekey", key, "Spits a key from the given length. If no params are given, length defaults to 8. Using a negative includes _ and -.");
