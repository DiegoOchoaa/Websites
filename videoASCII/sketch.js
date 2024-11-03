let vid;
let vidCanvas;
let videoPlaying = false;
let currentFrame = 0;

let pixelation = 100;


let range = "$@B%8&WM#oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?*-_+~<>i!lI;:,^`'. "


function preload() {
  vid = createVideo('rick.mp4', videoLoaded);
  vid.hide();
}

function videoLoaded() {
  vid.loop();
  vid.stop();
  vidCanvas = createGraphics(vid.width, vid.height);
  videoPlaying = true;
  vid.play();
  vid.pause(); // Start playing and immediately pause to control frame by frame
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
}

function draw() {
  background(10)
  fill(255)
  

  if (videoPlaying) {
    vidCanvas.image(vid, 0, 0, vid.width, vid.height);
    vidCanvas.loadPixels();

    let ratio = vid.height/vid.width;
    let newWidth = 800;
    let newHeight = newWidth*ratio;

    startx = width/2-newWidth/2;
    starty = height/2 - newHeight/2;

    pixelsize = (newWidth / pixelation);

    textSize(pixelsize*1.3)
    
    // Process the pixels of the video frame
    for (let y = 0; y < vidCanvas.height; y+= pixelsize) {
      for (let x = 0; x < vidCanvas.width; x+= pixelsize) {
        let index = (x*2 + y*4 * vidCanvas.width) * 4;
        let r = vidCanvas.pixels[index + 0];
        let g = vidCanvas.pixels[index + 1];
        let b = vidCanvas.pixels[index + 2];

        let gray = 0.299 * r + 0.587 * g + 0.114 * b;
        fill(r,g,b,255);
        gray = 255-gray

        xx = startx+ (x * newWidth / vidCanvas.width);
        yy = starty+ (y * newWidth / vidCanvas.width);

        text(range[Math.round(gray/3.5)], xx,yy )

       
        
        // You can now use r, g, b, a values for your processing
      }
    }
    
    vidCanvas.updatePixels();
    
    
    //image(vidCanvas, startx, starty, newWidth, newHeight);

    // Advance to the next frame
    currentFrame++;
    if (currentFrame >= vid.duration() * 60) { // Assuming 30 FPS video
      currentFrame = 0;
    }
    vid.time(currentFrame / 60);
  }
}
