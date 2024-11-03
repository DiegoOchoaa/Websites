

function Particle(){
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxspeed = 10;
    this.prevPos = this.pos.copy();


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
        strokeWeight(5);
        stroke(255, 100);
        point(this.pos.x, this.pos.y);
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