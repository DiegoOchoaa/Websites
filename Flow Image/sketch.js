
var inc = 0.1;
var scl = 15;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];
var flowfield;

//img stuff


function preload(){
  img = loadImage('https://plus.unsplash.com/premium_photo-1688147583826-1c169e82c57f?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // This will make the canvas full screen
  pixelDensity(1);
  cols = floor(width / scl);  // Use floor to ensure whole number
  rows = floor(height / scl); // Use floor to ensure whole number
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 30000; i++) {
    particles[i] = new Particle(img);
  }
  background(0);

  img.loadPixels();
} 



function draw() {  
  background(0, 20);
  
  var yoff = 0;

  if (key == ' '){
    setup();
    key = 'a'; 
  }

  // Adjust `w` and `h` to match the size of each grid cell
  let w = width / cols;
  let h = height / rows;
  
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      // Calculate pixel coordinates based on the image's resolution
      let imgX = floor(x / cols * img.width);
      let imgY = floor(y / rows * img.height);
      let pixelIndex = (imgX + imgY * img.width) * 4;

      const r = img.pixels[pixelIndex + 0];
      const g = img.pixels[pixelIndex + 1];
      const b = img.pixels[pixelIndex + 2];

      //noStroke();
      //fill(r, g, b, 0);

     

      var index = x + y * cols;
      var angle = noise(r/200, random(0.7), zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.8);
      flowfield[index] = v;
      xoff += inc;

      
      // Draw the square at the grid position, not the calculated image position
      //square(x * w, y * h, w-2); // Adjust the size to fill the grid cell
     

      

    }
    yoff += inc;
    zoff += 0.000005;
  }

  for (var i = 0; i < particles.length; i++){
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
