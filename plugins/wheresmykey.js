/*
      A thing that spits a randomly generated key.
      Notice: WIP.
*/

function key(param){
      var param = quickParamParse(param);
      var whatsthekeylength;
      whatsthekeylength = 8;
      if (param.length === 1){
            whatsthekeylength = arg[0];
      }
      var key = '';
      for (var i = 0; i < whatsthekeylength; i++){
            key += "0123456789ABCDEFHJIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 36)];
      }
      systemMessage("The key is: " + key + ".");
};

addCommand("whatsthekey", key, "Spits a key from the given length. If no params are given, length defaults to 8.");

//Notice: plugin not tested yet!
