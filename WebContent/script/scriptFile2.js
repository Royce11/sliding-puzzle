solvedArray = [
	            { left : 0, top : 0 },
	            { left : 100, top : 0 },
	            { left : 200, top : 0 },
	            { left : 300, top : 0 },
	            { left : 0, top : 100 },
	            { left : 100, top : 100 },
	            { left : 200, top : 100 },
	            { left : 300, top : 100 },
	            { left : 0, top : 200 },
	            { left : 100, top : 200 },
	            { left : 200, top : 200 },
	            { left : 300, top : 200 },
	            { left : 0, top : 300 },
	            { left : 100, top : 300 },
	            { left : 200, top : 300 },
	            { left : 300, top : 300 },
	            ];

	voidPosition = new Array();
	voidPosition[0] = 300;
	voidPosition[1] = 300;
	
	function randomize() {
		var posArray = solvedArray;
		for (var i = posArray.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = posArray[i];
	        posArray[i] = posArray[j];
	        posArray[j] = temp;
	    }
	   	/*for (var i in posArray){
	    document.write(posArray[i].left+"  "+posArray[i].top+"<br>");
	   	}*/
	   	return posArray;
	}
	
	function shufflePuzzle(){
		var posArray = randomize();
	   	$(document).ready(function(){
		for(var i=1; i<16; i++){
				//document.write(posArray[i].left+"<br>");
				$("#myspace"+i).css({left: posArray[i-1].left+"px", top: posArray[i-1].top+"px"});
				
				//-----------------------------------------------------------------------------
				$.keyframe.define([{
					name: 'slideAnimation',
					'0%': {'left': '500px' , 'top': '200px' },
					'100%': {'left': '600px' , 'top': '200px'}
				}]);
				$("#junk").css({left: "600px", top: "200px"});
				//-----------------------------------------------------------------------------
				
			}
		});
	   	document.getElementById("junk").innerHTML=(posArray[8].left+"    "+posArray[8].top);
	   	voidPosition[0] = posArray[15].left;
	   	voidPosition[1] = posArray[15].top;
	}
	
	function move(name){
		var divId = "#"+name;
		var pos = divPosition(divId);
		$(document).ready(function(){
			
			//----------------------------------------------------------------------------
			$.keyframe.define([{
				name: 'slideAnimation',
				'0%': {'left': pos[0]+'px' , 'top': pos[1]+'200px' },
				'100%': {'left': voidPosition[0]+'px' , 'top': voidPosition[1]+'px'}
			}]);
		    //----------------------------------------------------------------------------
			
			$(divId).css({left: voidPosition[0]+"px", top: voidPosition[1]+"px"});
		});
		voidPosition = pos;
		return puzzleCheck();
	}
	
	function divPosition(divName){
		var pos = new Array();
		$(document).ready(function(){
			pos[0] = parseInt($(divName).css("left"));
			pos[1] = parseInt($(divName).css("top"));
	    });
		return pos;
	}
	
	function check(name){
		var pos = new Array();
		var divId = "#"+name;
		pos = divPosition(divId);
		var distance = Math.sqrt(Math.pow((pos[0]-voidPosition[0]), 2) + Math.pow((pos[1]-voidPosition[1]), 2));
		//document.write(distance);
		if(distance == 100){
			return move(name);
		}else{
			return 0;
		}
	}
	
	function puzzleCheck(){
		var temp = new Array();
		for(var i = 1; i <= 15; i++){
			var arr = divPosition("#myspace"+i);
			temp[i-1] = arr.toString();
		}
		console.log(temp);
		console.log(temp.toString());
		
		if(temp.toString() == "0,0,100,0,200,0,300,0,0,100,100,100,200,100,300,100,0,200,100,200,200,200,300,200,0,300,100,300,200,300"){
			document.getElementById("junk").innerHTML = "<b>Puzzle Completed</b>";
		}else{
			document.getElementById("junk").innerHTML = "";
		}
	}