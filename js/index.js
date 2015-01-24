
var sum = 0;
var canvas, context;
var numbers;
//total is the sum of all the values

document.addEventListener("DOMContentLoaded", function(){
  //set global vars for canvas and context
  canvas = document.querySelector("#myCanvas");
  context = canvas.getContext("2d");
  $.getJSON('./js/cheese.json', function (data) {
  //add listeners for the buttons
  //addButtonListeners();
  //default action when it first loads
   numbers = data.segments;
   showPie();
  //showNumbers();
console.log(numbers);
    });

    
});

function showPie(){
    
    
 for (var i = 0; i < numbers.length; i++) {
		sum += numbers[i].value;
	}

  //clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  //set the styles in case others have been set
  //setDefaultStyles();
  var cx = canvas.width/2;
  var cy = canvas.height/2;
  var radius = 100;
  var currentAngle = 0;
  //the difference for each wedge in the pie is arc along the circumference
  //we use the percentage to determine what percentage of the whole circle
  //the full circle is 2 * Math.PI radians long.
  //start at zero and travelling clockwise around the circle
  //start the center for each pie wedge
  //then draw a straight line out along the radius at the correct angle
  //then draw an arc from the current point along the circumference
  //stopping at the end of the percentage of the circumference
  //finally going back to the center point.
    
    var largest = drawLargest(numbers, "value");
	
	var smallest = drawSmallet(numbers, "value");
    
    console.log(largest,smallest);
    
  for(var i=0; i<numbers.length; i++){
      
    var pct = numbers[i]/sum;
    //create colour 0 - 16777216 (2 ^ 24) based on the percentage
    var intColour = parseInt(pct * 16777216);
    //console.log(intColour);
    var red = ((intColour >> 16) & 1755);
    var green = ((intColour >> 8) & 255);
    var blue = (intColour & 255);
    //console.log(red, green, blue);
    var colour = "rgb(" + red +"," + green+"," + blue+")";
    //console.log(colour);
    var endAngle = currentAngle + (pct * (Math.PI * 2));
    //draw the arc
    context.moveTo(cx, cy);
    context.beginPath();
    context.fillStyle = colour;
    context.arc(cx, cy, radius, currentAngle, endAngle, false);  
    context.lineTo(cx, cy);
    context.fill();
    
    
    //Now draw the lines that will point to the values
    context.save();
    context.translate(cx, cy);//make the middle of the circle the (0,0) point
    context.strokeStyle = "#0CF";
    context.lineWidth = 1;
    context.beginPath();
    //angle to be used for the lines
    var midAngle = (currentAngle + endAngle)/2;//middle of two angles
    context.moveTo(0,0);//this value is to start at the middle of the circle
    //to start further out...
    var dx = Math.cos(midAngle) * (0.8 * radius);
    var dy = Math.sin(midAngle) * (0.8 * radius);
    context.moveTo(dx, dy);
    //ending points for the lines
    var dx = Math.cos(midAngle) * (radius + 30); //30px beyond radius
    var dy = Math.sin(midAngle) * (radius + 30);
    context.lineTo(dx, dy);
    context.fillText(numbers[i],dx,dy);
      
    context.stroke();
    //put the canvas back to the original position
    context.restore();
    //update the currentAngle
    currentAngle = endAngle;
  }
}

function drawLargest(arr, prop) {
	var max;
	for (var i = 0; i < arr.length; i++) {
		if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
			max = arr[i];
	}
	return max;
}

//Get min from array
function drawSmallet(arr, prop) {
	var min;
	for (var i = 0; i < arr.length; i++) {
		if (!min || parseInt(arr[i][prop]) < parseInt(min[prop]))
			min = arr[i];
	}
	return min;
}
