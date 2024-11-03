
let key_pressed = false;
let mouse_pressed = false;
let mouse_pressed_left = false;
let scrollwheelX = 0;
let scrollwheelY = 0;
let arrow_incrementX = 0;
let arrow_incrementY = 0;
let arrow_incrementZ = 0;
let skew = 2
let other_selected = 0;
let bloc_identities = [
  [[132, 155, 55],[70,70,70], [50,50,50]],
  [[110,110,110],[70,70,70], [50,50,50]],
  [[205,133,0],[205-20,133-20,0], [205-50,133-50,0]],
  [[170, 74, 68],[170-20, 74-20, 68-20], [170-50, 74-50, 68-50]],
  [[99,59,59],[77,55,55], [62,49,49]],
  [[61,96,27],[16,54,3], [30,70,20]],
  [[220,220,220],[170,170,170], [150,150,150]],
  [[43, 42, 40],[44-10, 42-10, 40-10], [15,15,15]]
]
let list_num = 8

let mouse_just_pressed = false;


let slct = 1
let rotation = 1


let tall_terrain = false;
let terrain_noise = 0.05





function setup() {
  createCanvas(windowWidth, windowHeight);
  inv = new inventory(bloc_identities)


  total = 30

  cursor = createVector(total-2,total-2,1)
  
  buffer = width*0.5
  dinm = ((width-buffer)/2)/total
  
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  
  x_origin = height/2
  y_origin = width/2 
  
  create_list()


}

function mirror_but(){
  x_rt = width-buffer/4
  y_rt = height/6*4
  dist_rt = dist(mouseX,mouseY,x_rt,y_rt)


  opc = 150-(dist_rt)
  if (opc < 0){
    opc = 0
  }

  stroke(255)
  strokeWeight(2.)
  lenght = 6
  sep = 6
  if (dist_rt < sep*20){
    sep = dist_rt/20
  }

  
  line(x_rt-sep,y_rt+lenght*2-5,x_rt-sep,y_rt-lenght)
  line(x_rt+sep,y_rt+lenght*2-5,x_rt+sep,y_rt-lenght)
  noStroke()
  fill(255,255,255,opc)
  text('mirror',x_rt,y_rt-15-opc/30)

  stroke(255)
  strokeWeight(2.5)
  if (dist_rt < 25 ){
    if (mouse_just_pressed == true){
      rotate_matrix(5)

    }
    noFill()
    stroke(255,255,255,25)
    strokeWeight(2)
    circle(x_rt,y_rt, 30+opc/60-dist_rt)
   
    
  }
}

function rotate_but(){
 
  x_rt = width-buffer/4
  y_rt = height/6*3
  dist_rt = dist(mouseX,mouseY,x_rt,y_rt)

  opc = 150-(dist_rt)
  if (opc < 0){
    opc = 0
  }

  stroke(255)
  strokeWeight(2.)
  lenght = 3
  ske = 6
  if (dist_rt < ske*10){
    ske = dist_rt/10
  }
  old_cc = 1
  
  line(x_rt-lenght,y_rt-ske,x_rt+lenght*2,y_rt)
  line(x_rt-lenght,y_rt+ske,x_rt+lenght*2,y_rt)
  noStroke()
  fill(255,255,255,opc)
  text('rotate',x_rt,y_rt-15-opc/30)

  stroke(255)
  strokeWeight(2.5)
  if (dist_rt < 25 ){
    if (mouse_just_pressed == true){
      rotation += 1
      if (rotation > 4){
        rotation = 1
      }
      rotate_matrix(rotation)
      
    }
    noFill()
    stroke(255,255,255,25)
    strokeWeight(2)
    circle(x_rt,y_rt, 30+opc/60-dist_rt)
   
    
  }


}


function reset_but(){
  x_res = width-buffer/4
  y_res = height/6 *2
  dist_res = dist(mouseX,mouseY,x_res,y_res)
  sz = 15
  
  opc = 150-(dist_res)
  if (opc < 0){
    opc = 0
  }

  noFill()
  stroke(255)
  strokeWeight(2)
  circle(x_res,y_res, sz+opc/50)
  if (dist_res < 15 ){
    stroke(255,255,255,25)
    circle(x_res,y_res, sz+opc/50+20-dist_res)
    if (mouse_just_pressed == true ){
    timout = 10
    create_list()
    cursor = createVector(total-2,total-2,1)
    noiseSeed();
    

    }
  } 

  noStroke()
  fill(255,255,255,(opc))
  text('reset',x_res,y_res-15-opc/30)
  
  
}
function draw(){
  background(10);
  
  
  
  reset_but()
  rotate_but()
  mirror_but()
  draw_grid()

  

  stroke(255,0,0)
  //line(width/2, height/2-(sk*total)+sk, width/2, height/2+(sk*total)+sk)
  stroke(255)
  inv.draw_bar(slct)
  re_adjust_screen()

  slct += scrollwheelY
  slct += other_selected
  if (slct < 1){
    slct = list_num
  }

  if (slct > list_num){
    slct = 1
  }
  other_selected = 0
  scrollwheelY = 0
  
  
  
  
  cursor.x -= arrow_incrementX 
  cursor.y -= arrow_incrementY 
  cursor.z -= arrow_incrementZ

  if (cursor.x < 0) cursor.x = 0;
  if (cursor.y < 0) cursor.y = 0;
  if (cursor.z < 0) cursor.z = 0;
  
  if (cursor.x > total-1) cursor.x = total-1;
  if (cursor.y > total-1) cursor.y = total-1;
  if (cursor.z > total-1) cursor.z = total-1;
  
  noStroke()
  fill(255,255,255,50)
  textSize(20)
  textAlign(CENTER, CENTER); 
  
  textFont('monospace');
  text(``, width/2, 70) // ISOBOX
  
  textSize(10)
  fill(255,255,255,40)
  text(``, width/2, height-20) //for legal reasons this is not a copy of minecraft

  draw_limits()

  strokeWeight(2)
  arrow_incrementX = 0
  arrow_incrementY = 0
  arrow_incrementZ = 0

  mouse_just_pressed = false;
 
  
  //dashedLine(width/2, 0, mouseX, mouseY, 10, 10)
}

function re_adjust_screen(){
  fill(255)
  textSize(20)
  if (width != windowWidth || height != windowHeight){
    resizeCanvas(windowWidth, windowHeight);
    height = windowHeight
    width = windowWidth
    buffer = width*0.5
    dinm = ((width-buffer)/2)/total
    y_origin = width/2
    x_origin = height/2
  }

}

function draw_limits(){
  stroke(255)
  strokeWeight(1.5)
  limit_lenght = 20
  //circle(y_origin,x_origin+sk,3)
  xs = y_origin
  ys = x_origin-total+sk
  //circle(xs,ys  ,3)
  //line(xs,ys,xs,ys-limit_lenght)
  //line(xs,ys,xs-limit_lenght,ys+limit_lenght/2)
  //line(xs,ys,xs+limit_lenght,ys+limit_lenght/2)
  

  //circle(y_origin,x_origin+total*sk+sk,3)
  line(y_origin,x_origin+total*sk+sk,y_origin, x_origin+total*sk+sk-limit_lenght)
  line(y_origin,x_origin+total*sk+sk,y_origin-limit_lenght, x_origin+total*sk+sk-limit_lenght/2)
  line(y_origin,x_origin+total*sk+sk,y_origin+limit_lenght, x_origin+total*sk+sk-limit_lenght/2)

  //circle(y_origin+total*sk,x_origin+sk+total*(sk/2),3) Bottom right
  line(y_origin+total*sk, x_origin+sk+total*(sk/2), y_origin+total*sk, x_origin+sk+total*(sk/2)-limit_lenght)
  line(y_origin+total*sk, x_origin+sk+total*(sk/2), y_origin+total*sk-limit_lenght, x_origin+sk+total*(sk/2)-limit_lenght/2)
  line(y_origin+total*sk, x_origin+sk+total*(sk/2), y_origin+total*sk-limit_lenght, x_origin+sk+total*(sk/2)+limit_lenght/2)
  
  //circle(y_origin-total*sk,x_origin+sk+total*(sk/2),3) 
  line(y_origin-total*sk,x_origin+sk+total*(sk/2), y_origin-total*sk, x_origin+sk+total*(sk/2)-limit_lenght)
  line(y_origin-total*sk,x_origin+sk+total*(sk/2), y_origin-total*sk+limit_lenght, x_origin+sk+total*(sk/2)+limit_lenght/2)
  line(y_origin-total*sk,x_origin+sk+total*(sk/2), y_origin-total*sk+limit_lenght, x_origin+sk+total*(sk/2)-limit_lenght/2)

  //circle(y_origin,x_origin,3)
  line(y_origin,x_origin+sk,y_origin, x_origin+limit_lenght+sk)
  line(y_origin,x_origin+sk,y_origin-limit_lenght, x_origin-limit_lenght/2+sk)
  line(y_origin,x_origin+sk,y_origin+limit_lenght, x_origin-limit_lenght/2+sk)

  xs = y_origin+total*sk
  ys = x_origin+sk-total*(sk/2)
  //circle(xs,ys  ,3)
  line(xs,ys,xs,ys+limit_lenght)
  line(xs,ys,xs-limit_lenght,ys+limit_lenght/2)
  line(xs,ys,xs-limit_lenght,ys-limit_lenght/2)

  xs = y_origin-total*sk
  ys = x_origin+sk-total*(sk/2)
  //circle(xs,ys  ,3)
  line(xs,ys,xs,ys+limit_lenght)
  line(xs,ys,xs+limit_lenght,ys-limit_lenght/2)
  line(xs,ys,xs+limit_lenght,ys+limit_lenght/2)

  xs = y_origin
  ys = x_origin-total*sk+sk
  //circle(xs,ys  ,3)
  line(xs,ys,xs,ys+limit_lenght)
  line(xs,ys,xs-limit_lenght,ys+limit_lenght/2)
  line(xs,ys,xs+limit_lenght,ys+limit_lenght/2)
  
}


function draw_grid(){
  for (let x = 0; x < total; x++) {
    for (let y = 0; y < total; y++) {
      for (let z = 0; z < total; z++) {
        
       
        if (x === cursor.x & y === cursor.y & z === cursor.z){
          blocks[x][y][z].isCursor = true
        }
        if (x != cursor.x || y != cursor.y || z != cursor.z){
          blocks[x][y][z].isCursor = false
        }

        // add terrain

    
       
        
        

      

        

        
        blocks[x][y][z].draw(dinm, x_origin, y_origin, total, blocks)
        
        
    }
    }
  }

  blocks[cursor.x][cursor.y][cursor.z].draw_outline(dinm, x_origin, y_origin, total)
}

function deepCopyArray(arr) {
  return arr.map(item => (Array.isArray(item) ? deepCopyArray(item) : item));
}

function rotate_matrix(rotation){
  old_blocks = deepCopyArray(blocks);
  blocks = []
  fill(255)
  for (let x = 0; x < total; x++) {
    blocks.push([])
    for (let y = 0; y < total; y++) {
      blocks[x].push([])
      for (let z = 0; z < total; z++) {
        if (rotation === 1){
        x_rot =  total-1-y
        y_rot =  x
        } else if (rotation === 2){
          x_rot = total-1-y
          y_rot =  x
        } else if (rotation === 3){
          x_rot = total-1-y
          y_rot = x
        } else if (rotation === 4){
          x_rot =  total-1-y
          y_rot =  x
        }else if (rotation === 5){
          x_rot =  y
          y_rot =  x
        }else{
          x_rot = x
          y_rot = y

        } 
        blocks[x][y].push(new Square(old_blocks[x_rot][y_rot][z].value,
          x,
          y,
          z,
          blocks,bloc_identities))
        
        

      }
    }
  }
}

function spit_list() {
  val_blocks
  for (let x = 0; x < total; x++) {
    val_blocks.push([])
    for (let y = 0; y < total; y++) {
      val_blocks[x].push([])
      for (let z = 0; z < total; z++) {
        val_blocks[x][y].push(blocks[x][y][z].value)
      }
    }
  }
}


function create_list() {
  blocks = []
  
  for (let x = 0; x < total; x++) {
    blocks.push([])
    for (let y = 0; y < total; y++) {
      blocks[x].push([])
      for (let z = 0; z < total; z++) {
      noiseDetail(200, -20);
      chance = Math.round(noise(x*terrain_noise,y*terrain_noise,z*terrain_noise)*1)
      value = 0;
      if (z === 0 ){
        value = 1;
      } else if(z > 0 & chance ==1 & blocks[x][y][z-1].value > 0 ){
        if (tall_terrain == false){
          if (z == 1)value = 1
        } else{
          value = 1
        }
        
      } 

      blocks[x][y].push(new Square(value,x,y,z,blocks,bloc_identities))
    }
  }
  }

  
  
}



   



function keyReleased() {
  key_pressed = false
}

function keyPressed() {
  key_pressed = true
  if (keyCode === 68 & key_pressed === true) {
    arrow_incrementX -= 1
  }
  if (keyCode === 65 & key_pressed === true) {
    arrow_incrementX += 1
  }

  if (keyCode === 83 & key_pressed === true) {
    arrow_incrementY -= 1
  }
  if (keyCode === 87 & key_pressed === true) {
    arrow_incrementY += 1
  }

  if (keyCode === 81 & key_pressed === true) {
    arrow_incrementZ -= 1
  }
  if (keyCode === 69 & key_pressed === true) {
    arrow_incrementZ += 1
  }

  if (keyCode === UP_ARROW & key_pressed === true) {
    other_selected -= 1
  }
  if (keyCode === DOWN_ARROW & key_pressed === true) {
    other_selected += 1
  }

  

}

function mousePressed(){
  if (mouseButton === LEFT) mouse_pressed = true
  if (mouseButton === RIGHT) mouse_pressed_left = true
  mouse_just_pressed = true;
}

function mouseReleased(){
  if (mouseButton === LEFT) mouse_pressed = false
  if (mouseButton === RIGHT) mouse_pressed_left = false
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



function crossedLines(x1,y1,x2,y2){

}
function dashedLine(x1, y1, x2, y2, dashLength, gapLength) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let distance = dist(x1, y1, x2, y2);
  let dashes = Math.floor(distance / (dashLength + gapLength));
  let dashX = dx / distance * dashLength;
  let dashY = dy / distance * dashLength;
  let gapX = dx / distance * gapLength;
  let gapY = dy / distance * gapLength;

  for (let i = 0; i < dashes; i++) {
    let xStart = x1 + (dashX + gapX) * i;
    let yStart = y1 + (dashY + gapY) * i;
    let xEnd = xStart + dashX;
    let yEnd = yStart + dashY;
    line(xStart, yStart, xEnd, yEnd);
  }
}

