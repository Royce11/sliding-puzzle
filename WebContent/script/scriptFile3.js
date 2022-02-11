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
	
	function motion(p1,p2,a1,a2,divId){
		$(document).ready(function(){
			var m1 = a1-p1;
			var m2 = a2-p2;
			var t1 = p1;
			var t2 = p2;
			for(var i = 1; i<=100; i++){
				t1 = t1 + (m1/100);
				t2 = t2 + (m2/100);
				document.getElementById("junk").innerHTML = t1+" "+t2;
				$(divId).css({left: t1+"px", top: t2+"px"});
				//sleep(1);
			}
		});
	}
	
	function sleep(milliseconds) {
		  var start = new Date().getTime();
		  for (var i = 0; i < 1e7; i++) {
		    if ((new Date().getTime() - start) > milliseconds){
		      break;
		    }
		  }
		  return 0;
		}
	
	function randomize() {
		var posArray = solvedArray.slice(0);
		for (var i = posArray.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = posArray[i];
	        posArray[i] = posArray[j];
	        posArray[j] = temp;
	    }
	   	return posArray;
	}
	
	function shufflePuzzle(){
		var posArray = randomize();
	   	$(document).ready(function(){
		for(var i=1; i<16; i++){
				//document.write(posArray[i].left+"<br>");
				console.log(solvedArray[i-1]);
				console.log(posArray[i-1]);
				//----------------------------------------------------------------------------
				$.keyframe.define([{
					name: 'slideAnimation'+i,
					'0%': {'left': solvedArray[i-1].left+'px' , 'top': solvedArray[i-1].top+'px' },
					'100%': {'left': posArray[i-1].left+'px' , 'top': posArray[i-1].top+'px'}	
				}]);
				//$(document).remove(".keyframe");
				
				//----------------------------------------------------------------------------
			
				$("#myspace"+i).css({left: posArray[i-1].left+"px", top: posArray[i-1].top+"px"});
					
			}
		});
	   	document.getElementById("junk").innerHTML=(posArray[8].left+"    "+posArray[8].top);
	   	voidPosition[0] = posArray[15].left;
	   	voidPosition[1] = posArray[15].top;
	}
	
	function move(num){
		var divId = "#myspace"+num;
		var pos = divPosition(divId);
		console.log(pos);
		$(document).ready(function(){
			
			//----------------------------------------------------------------------------
			/*$.keyframe.define([{
				name: 'slideAnimation'+num,
				'0%': {'left': pos[0]+'px' , 'top': pos[1]+'px' },
				'100%': {'left': voidPosition[0]+'px' , 'top': voidPosition[1]+'px'}	
			}]);
			//$(document).remove(".keyframe");*/
			//----------------------------------------------------------------------------
			
			$(divId).css({left: voidPosition[0]+"px", top: voidPosition[1]+"px"});
			
		});
		
		motion(pos[0], pos[1], voidPosition[0], voidPosition[1], divId);
		voidPosition = pos;
		puzzleCheck();
	}
	
	function divPosition(divId){
		var pos = new Array();
		$(document).ready(function(){
			pos[0] = parseInt($(divId).css("left"));
			pos[1] = parseInt($(divId).css("top"));
	    });
		return pos;
	}
	
	function check(num){
		var pos = new Array();
		var divId = "#myspace"+num;
		pos = divPosition(divId);
		var distance = Math.sqrt(Math.pow((pos[0]-voidPosition[0]), 2) + Math.pow((pos[1]-voidPosition[1]), 2));
		//document.write(distance);
		if(distance == 100){
			return move(num);
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
		//console.log(temp);
		//console.log(temp.toString());
		
		if(temp.toString() == "0,0,100,0,200,0,300,0,0,100,100,100,200,100,300,100,0,200,100,200,200,200,300,200,0,300,100,300,200,300"){
			document.getElementById("junk").innerHTML = "<b>Puzzle Completed</b>";
		}else{
			document.getElementById("junk").innerHTML = "";
		}
	}