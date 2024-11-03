
var inc = 0.05;
var scl = 20;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];
var flowfield;


function setup() {
  background(17);
  createCanvas(windowWidth, windowHeight);  // This will make the canvas full screen
  pixelDensity(1);
  cols = floor(width / scl);  // Use floor to ensure whole number
  rows = floor(height / scl); // Use floor to ensure whole number
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 7000; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(2);

 
  if (key == ' '){
    setup();
    key = 'a';
   
  }
 

  var yoff = 0;



  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff)* TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.7);
      flowfield[index] = v;
      xoff += inc;
      stroke(255, 50);
      strokeWeight(100);
      push();
      translate(x*scl,y*scl);
      rotate(v.heading());
      //line(0,0, scl, 0);
      pop();


    }
    yoff += inc;

    zoff += 0.00005;

  }

  for (var i  = 0; i  < particles.length; i++){
    particles[i].follow(flowfield);
    particles[i].edges();
    particles[i].show();
    particles[i].update();
   
  }

  

  
  fr.html(floor(frameRate()));

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = floor(windowWidth / scl);  // Recalculate columns
  rows = floor(windowHeight / scl); // Recalculate rows
  flowfield = new Array(cols * rows); // Reinitialize the flow field
}
