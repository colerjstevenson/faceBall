class Glove{
  
  constructor(tx, ty){
    this.speed = random(-10, 10);
    this.size = 50;
    
    this.x = tx;
    this.y = ty;
    
    
  }
  
  hit(){
    
    let dist = sqrt(sq(this.x - ball.x) + sq(this.y - ball.y));
    
    if(dist < (ball.size/2) + (this.size/2)){
      if(ball.vy < 0){
        ball.vy = ball.vy * -1; 
      }else{
        ball.vx = random(-ball.speed, ball.speed);  
      }
    }
    
  }
  
  
  show(){
    push();
    imageMode(CENTER);
    image(glove_img, this.x, this.y, this.size, this.size);
    pop();
  }
  
  move(){
    if(this.x < 0 || this.x > width){
      this.speed = this.speed * -1;  
    }
    
    this.x = this.x + this.speed;
  }
  
  run(){
    this.hit();
    this.move();
    this.show();
    
  }
  
  
  
}
