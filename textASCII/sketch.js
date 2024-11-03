let img;
let pixelation = 60;
let ratio = 0;
let scrollwheelX = 0
let scrollwheelY = 0


let range = "$@B%8&WM#oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?*-_+~<>i!lI;:,^`'. "

// Load the image.
function preload() {
  img = loadImage('https://upload.wikimedia.org/wikipedia/en/b/b4/Sharbat_Gula.jpg');
  img = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1200px-Tsunami_by_hokusai_19th_century.jpg');
  img = loadImage('fishhead.jpeg');
  img = loadImage('porsche.jpeg');
  img = loadImage('hand.jpeg');
  //img = loadImage('alone.jpeg');
  //img = loadImage('xin.jpeg');
  //img = loadImage('music.jpeg');
  //img = loadImage('swings.jpeg');
  //img = loadImage('olddresd.jpeg');
  //img = loadImage('flower.jpeg');
  img = loadImage('https://images.unsplash.com/photo-1690219990099-5c228e5db511?q=80&w=3328&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  img = loadImage('shadows.jpeg');
  img = loadImage('man_in_fields.jpeg');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  count = 0;

}

function draw() {

    background(10)

    
    
    ratio = img.height/img.width;
    let newWidth = 500 + scrollwheelY*100;
    let newHeight = newWidth*ratio;

    startx = width/2-newWidth/2;
    starty = height/2 - newHeight/2;

    pixelsize = (newWidth / pixelation);
    
    //image(img, startx,starty, newWidth, newHeight);

    img.loadPixels();
    noStroke()
    textSize(pixelsize*1.2)
    fill(255,255,255,255);

    

    

    for (let i = 0; i < newWidth; i+= pixelsize){
      for (let j = 0; j < newHeight; j+= pixelsize){

        let pix = Math.random(0, pixelsize)
        let col = img.get((i * img.width / newWidth)+pix, (j * img.height / newHeight)+pix);
        
        //circle(startx+i+pixelsize/2,starty+j+pixelsize/2,pixelsize);
        let r = red(col);
        let g = green(col);
        let b = blue(col);
        let gray = 0.299 * r + 0.587 * g + 0.114 * b;
        fill(col);
        gray = 255-gray
        
        x = startx+i+pixelsize/2
        y = starty+j+pixelsize/2
        
        d = Math.round(dist(mouseX, mouseY, x,y)/2)/10
        vect = createVector(mouseX-x, mouseY-y)
        
        textSize(pixelsize*1.2)
        
        //if (d < (pixelsize/pixelation)*20){
        //  sep_fact = (pixelsize/pixelation)*20 - d
        //  x -= (vect.x)*sep_fact*0.4
        //  y -= (vect.y)*sep_fact*0.4
        //}
        
        
        

        //if (red(col) - red(img.get(0,0)) < -10){
        text(range[Math.round(gray/3.5)], x,y )
        //text('o', x,y )
        
      }
  
    }
    
  }

  
  

  function mouseWheel(event) {
    if (event.deltaX > 0) {
      scrollwheelX-=1
    } else { 
      scrollwheelX+=1
    }
  
    if (event.deltaY > 0) {
      scrollwheelY-=1
    } else { 
      scrollwheelY+=1
    }
  }

