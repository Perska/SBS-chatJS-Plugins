/*
	Eval Plugin
	By Trinitro21
*/
addCommand("eval", function(args){
	var a;
	if(args.length < 2){
		a = prompt("Code to inject?");
	} else {
    	a = args.substring();
  	}
  	try{
		eval(a);
	} catch(e){
		warningMessage("Error while running JS.\n" + e.stack);
	}
}, "Evaluates code given");
