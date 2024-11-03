

function Particle(img){
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxspeed = 5;
    this.prevPos = this.pos.copy();
    this.img = img; // Store the image reference


   

    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.follow = function(vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    }
  
    this.applyForce = function(force){
        this.acc.add(force);
    }

    this.show = function() {
        let imgX = floor(this.pos.x / width * this.img.width);
        let imgY = floor(this.pos.y / height * this.img.height);
        let pixelIndex = (imgX + imgY * this.img.width) * 4;

        let r = this.img.pixels[pixelIndex];
        let g = this.img.pixels[pixelIndex + 1];
        let b = this.img.pixels[pixelIndex + 2];

        

        stroke(r, g, b);
        strokeWeight(1);
        

        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        //point(this.pos.x, this.pos.y);
        this.updPrev();
    }

    this.updPrev = function(){
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    this.edges =  function() {
        if (this.pos.x > width){
         this.pos.x = 0;
         this.updPrev();
        }
        if (this.pos.x < 0){
            this.pos.x = width;
            this.updPrev();
        } 
        if (this.pos.y > height){
            this.pos.y = 0;
            this.updPrev();
        } 
        if (this.pos.y < 0){
            this.pos.y = height;
            this.updPrev();
        }
        
    }
}