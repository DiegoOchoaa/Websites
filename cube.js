function Square(val,x,y,z, blocks, colors) {
    this.value = val;
    this.x = x;
    this.y = y;
    this.z = z;
    this.isCursor = false;
    this.shadow  = false;
    this.shadow_val  = 40;
    this.mouse_colorPlt = [[255,255,255,70],[255,255,255,70], [255,255,255,70]]
    this.blocks = blocks
    //this.randmzs = random(-10,10)
    this.factr = 4
    this.randmzs = (noise(this.x*this.factr,this.y*this.factr,this.z*this.factr)*30)-15
   

    
    this.colorPlt = colors[this.value-1]
    

    

    
    this.semi_right_shadow = false
    this.semi_left_shadow = false
    
    this.draw_outline = function(dinm, x_origin, y_origin, total, color){
        sidesx = false
        sidesy = false
        sidesz = false

    
          if (x === total - 1 || this.blocks [x+1][y][z].value == 0  ){
            sidesx = true
          }
          if (y === total - 1 || this.blocks [x][y+1][z].value == 0 ){
            sidesy = true
          }
          if (z === total - 1 || this.blocks [x][y][z + 1].value == 0) {
            sidesz = true;
          }
        
        // do not draw if completely covered by something
        for (let i = 1; i < total; i++) {
            if ( x <= total -1-i &  y <= total -1-i &  z <= total -1-i){
            if (this.blocks[x+i][y+i][z+i].value > 0 ) {
                sidesx = false
                sidesy = false
                sidesz = false
            }
            }
        }
          
          




        sk = dinm
        ypos = x_origin-(total*dinm)/2+(dinm/2)*x + y*(dinm/2)-(dinm*z)+(dinm*total)/2
        xpos =  y_origin+dinm*x -y*dinm
        plus = sk/skew

        x1 = xpos, y1 = ypos;
        x2 = xpos-sk, y2 = ypos+plus;
        x3 = xpos, y3 = ypos+plus*2;
        x4 = xpos+sk, y4 = ypos+plus;
        dash1 = 3
        dash2 = 2
       
        big_stroke = 255
        light_stroke = 240
     
      
        if (sidesy){
            stroke(big_stroke)
            strokeWeight(1)
            line(x2,y2+sk, x3,y3+sk)
            line(x2,y2, x2,y2+sk)
            line(x3,y3, x3,y3+sk)
            line(x3,y3, x2,y2)
        } else{
            stroke(light_stroke)
            strokeWeight(1)
            dashedLine(x2,y2+sk, x3,y3+sk,dash1,dash2)
            dashedLine(x2,y2, x2,y2+sk,dash1,dash2)
            dashedLine(x3,y3, x3,y3+sk,dash1,dash2)
            dashedLine(x3,y3, x2,y2,dash1,dash2)

        }

        if (sidesx){
            stroke(big_stroke)
            strokeWeight(1)
            line(x4,y4, x4,y4+sk)
            line(x4,y4+sk, x3,y3+sk)
            line(x3,y3, x4,y4)
        } else{
            stroke(light_stroke)
            strokeWeight(1)
            dashedLine(x4,y4, x4,y4+sk,dash1,dash2)
            dashedLine(x4,y4+sk, x3,y3+sk,dash1,dash2)
            dashedLine(x3,y3, x4,y4,dash1,dash2)
        }
        if (sidesz){
            stroke(big_stroke)
            strokeWeight(1)
            line(x3,y3, x4,y4)
            line(x1,y1, x4,y4)
            line(x1,y1, x2,y2)
            line(x3,y3, x2,y2)
        } else{
            stroke(light_stroke)
            strokeWeight(1)
            dashedLine(x3,y3, x4,y4, dash1, dash2)
            dashedLine(x1,y1, x4,y4, dash1, dash2)
            dashedLine(x1,y1, x2,y2, dash1, dash2)
            dashedLine(x3,y3, x2,y2, dash1, dash2)
        }
      
       
            
            
    }
   
    this.draw = function(dinm, x_origin, y_origin, total) {
        
        sidesx = false
        sidesy = false
        sidesz = false
        

        

        if (this.isCursor === true & mouse_pressed & this.value == 0){
          this.value = slct
          this.colorPlt = colors[this.value-1]
          this.randmzs = (noise(this.x*this.factr,this.y*this.factr,this.z*this.factr)*30)-15
        }

        if (this.isCursor === true & mouse_pressed_left){
          this.value = 0
        }

        if (x === total - 1 || this.blocks [x+1][y][z].value == 0  ){
          sidesx = true
        }
        if (y === total - 1 || this.blocks [x][y+1][z].value == 0 ){
          sidesy = true
        }
        if (z === total - 1 || this.blocks [x][y][z + 1].value == 0) {
          sidesz = true;
        }


        for (let i = 1; i < total; i++) {
            if ( x <= total -1-i &  y <= total -1-i &  z <= total -1-i){
            if (this.blocks[x+i][y+i][z+i].value > 0) {
                sidesx = false
                sidesy = false
                sidesz = false
            }
            }
        }

        this.colors = this.colorPlt
        if (this.isCursor === true & this.value === 0){
            this.colors = this.mouse_colorPlt
        }

        
        
        if (this.value > 0 ||this.isCursor === true  ){
            iso_square(
                dinm, 
                x_origin-(total*dinm)/2+(dinm/2)*x + y*(dinm/2)-(dinm*z)+(dinm*total)/2, 
                y_origin+dinm*x -y*dinm,
                sidesx,
                sidesy,
                sidesz,
                this.colors,
                this.blocks [x][y][z]
            )
            }




        //shadow functionality
        for (let i = 1; i < total; i++) {
            if (x <= total -1-i & y >= i &  z >= i){
                if (this.blocks[x+i][y-i][z-i].value > 0 & this.value >0 ) {
                    this.blocks[x+i][y-i][z-i].shadow = true;

                    if (this.blocks[x][y][z-1].value > 0){
                    this.blocks[x+i][y-i+1][z-i].semi_right_shadow = true;
                    this.blocks[x+i-1][y-i][z-i].semi_left_shadow = true;
                    }
                }   
            } 
        }

        this.shadow = false;
        this.semi_right_shadow = false;
        this.semi_left_shadow = false;
        

    }

}



function iso_square(sk, ypos, xpos, sidesx, sidesy, sides_z,colors, block) {
  
  
    let plus = sk/skew +0.4;
    //plus = plus+=0.5
    let x1 = xpos, y1 = ypos;
    let x2 = xpos-sk, y2 = ypos+plus;
    let x3 = xpos, y3 = ypos+plus*2;
    let x4 = xpos+sk, y4 = ypos+plus;
    let sh = 0
    
    if (block.shadow === true){
         sh = block.shadow_val
    }


    let top_col = [colors[0][0]-sh+block.randmzs,colors[0][1]-sh+block.randmzs, colors[0][2]-sh+block.randmzs, colors[0][3]]
    let left_col = [colors[1][0]-sh+block.randmzs,colors[1][1]-sh+block.randmzs, colors[1][2]-sh+block.randmzs,colors[1][3]]
    let right_col = [colors[2][0]+block.randmzs/2,colors[2][1]+block.randmzs/2, colors[2][2]+block.randmzs/2, colors[2][3]]
    
   
    
    
    noStroke()
    fill(10,10,10)
    //rect(xpos-sk,ypos,sk*2,sk,5)

    
  
    
    big_stroke = 17
    str2 = 0 // 0.5
    stroke(big_stroke)
    fill(top_col)
    noStroke()
    
    
    if (sides_z === true){
      beginShape();
      vertex(x1,y1)
      vertex(x2,y2)
      vertex(x3,y3)
      vertex(x4,y4)
      endShape(CLOSE);
    }
    // shadows
    if (block.semi_right_shadow === true){
        shh = block.shadow_val
        fill([colors[0][0]-shh,colors[0][1]-shh, colors[0][2]-shh, colors[0][3]])
        noStroke()
        beginShape();
        vertex(x1,y1)
        vertex(x2,y2)
        vertex(x4,y4)
        endShape(CLOSE);
       
    }

    if (block.semi_left_shadow === true){
        shh = block.shadow_val
        fill([colors[0][0]-shh,colors[0][1]-shh, colors[0][2]-shh, colors[0][3]])
        noStroke()
        beginShape();

        vertex(x2,y2)
        vertex(x3,y3)
        vertex(x4,y4)
        endShape(CLOSE);
     
    }

    if (sidesy === true){
      //stroke(255)
      //strokeWeight(1)
      //line(x2,y2+sk, x3,y3+sk)
      //line(x2,y2, x2,y2+sk)
      //line(x3,y3, x3,y3+sk)  
      fill(left_col)
  
      beginShape()
      vertex(x3,y3+sk)
      vertex(x2,y2+sk)
      vertex(x2,y2)
      vertex(x3,y3)
      endShape(CLOSE)
    }
  
     if (sidesx === true){
      //stroke(255)
      //strokeWeight(1)
      //line(x4,y4, x4,y4+sk)
      //line(x4,y4+sk, x3,y3+sk)
      //line(x3,y3, x3,y3+sk)  
  
      fill(right_col)
      beginShape()
      vertex(x4,y4)
      vertex(x4,y4+sk)
      vertex(x3,y3+sk)
      vertex(x3,y3)
      endShape(CLOSE)
    }

    
    if (sidesx){
        stroke(big_stroke)
        strokeWeight(str2)
        line(x4,y4, x4,y4+sk)
        line(x4,y4+sk, x3,y3+sk)
        line(x3,y3, x4,y4)
    } 
    if (sidesz){
        stroke(big_stroke)
        strokeWeight(str2)
        line(x3,y3, x4,y4)
        line(x1,y1, x4,y4)
        line(x1,y1, x2,y2)
        line(x3,y3, x2,y2)
    } 

    if (sidesy){
        stroke(big_stroke)
        strokeWeight(str2)
        line(x2,y2+sk, x3,y3+sk)
        line(x2,y2, x2,y2+sk)
        line(x3,y3, x3,y3+sk)
        line(x3,y3, x2,y2)
    }

    
  
     
    
   
    
  }