function inventory(colors) {
    this.bl_color = colors;
    
    this.draw_bar = function(selected){
        fill(255,255,255,20)
        noStroke()
        

        spots = list_num
        spot_dinm = height/25
        spot_roundess = 10
        sep = 4;
        x_orig = buffer/3 - spot_dinm*2
        y_orig = height/2



        
        

        total_width = spots * spot_dinm * 2 + (spots - 1) * sep;
        
        for (let i = 0; i < spots; i++) {
            fill(255,255,255,10)
            if (i === selected-1){
                stroke(255)
                strokeWeight(2)
            }
            y = y_orig - total_width / 2 + i * (spot_dinm * 2 + sep)
            x = x_orig
            rect(x,y,spot_dinm*2,spot_dinm*2, spot_roundess)

            
            skss = spot_dinm-15
            yy = y+ spot_dinm-skss
            xx = x+spot_dinm
            rnd = 21
            simple_romb(skss,yy,xx,true,true,true,this.bl_color[i])
        }
        
        
        
        
        //stk = 2
        //x = width-buffer/4
       // y = height/2.5
        //lenght = 5
        //fill(30)
        //noStroke()
        //circle(x,y,40)
        //stroke(255)
        //strokeWeight(stk)
        
        //line(x+lenght+stk*2,y,x-lenght*2,y)
        //line(x,y+lenght+stk*2,x,y-lenght*2)
        //y = height/1.5
        //line(x+lenght+stk*2,y,x-lenght*2,y)

   


        

        

    

    }
    
}



function simple_romb(sk, ypos, xpos, sidesx, sidesy, sides_z,colors) {
  
  
    let plus = sk/skew +0.2;
    //plus = plus+=0.5
    let x1 = xpos, y1 = ypos;
    let x2 = xpos-sk, y2 = ypos+plus;
    let x3 = xpos, y3 = ypos+plus*2;
    let x4 = xpos+sk, y4 = ypos+plus;

    
    let top_col = [colors[0][0],colors[0][1], colors[0][2], colors[0][3]]
    let left_col = [colors[1][0],colors[1][1], colors[1][2],colors[1][3]]
    let right_col = [colors[2][0],colors[2][1], colors[2][2], colors[2][3]]
    
   
    
    
    noStroke()
    fill(10,10,10)
    //rect(xpos-sk,ypos,sk*2,sk,5)

    
  
    
    
    stroke(17)
    fill(top_col)
    strokeWeight(0)
    //strokeWeight(0.8)
    
    
    if (sides_z === true){
      beginShape();
      vertex(x1,y1)
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

    
  
     
    
   
    
  }