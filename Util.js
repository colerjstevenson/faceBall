
class Target {
  constructor(x, y, w, h, col, message, value) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col;
    this.message = message;
    this.originalY = y;
    this.animationProgress = 0;
    this.bouncing = false;
    this.value = value
  }

  show() {
    push(); // Save current drawing state
    fill(this.col);
    rect(this.x, this.y - this.h, this.w, this.h*2, 10); // Draw rectangle with rounded corners
    
    fill(255); // Set text color (white for contrast)
    textAlign(CENTER, CENTER);
    
    let textSizeFactor = min(this.w / (this.message.length * 0.6), this.h * 0.6); // Adjust text size
    textSize(textSizeFactor);
    
    text(this.message, this.x + this.w / 2, this.y + this.h / 2);
    pop(); // Restore previous drawing state
  }

  triggerBounce() {
    if (!this.bouncing) {
      this.bouncing = true;
      this.animationProgress = 0;
    }
  }

  update() {
    if (this.bouncing) {
      this.animationProgress += 0.1;
      this.y = this.originalY + sin(this.animationProgress * PI) * 10;
      
      if (this.animationProgress >= 1) {
        this.bouncing = false;
        this.y = this.originalY;
      }
    }
  }
  
  run(){
    this.update();
    this.hit();
    this.show();
    
  }
  
  hit(){
    if (
      ball.x + ball.vx > this.x &&
      ball.x + ball.vx < this.x + this.w &&
      ball.y + ball.vy > this.y &&
      ball.y + ball.vy < this.y + this.h
    ) {
         this.triggerBounce();
         ball.vy = ball.vy * -1;
    }
    
  }
}

class Zone{
  
  constructor(tx, ty, tw, th){
    this.x = tx;
    this.y = ty;
    this.w = tw;
    this.h = th;
    
    this.spacing = 10;
  }
  
  hit(){
    if (
      ball.x + ball.size + ball.vx > this.x &&
      ball.x + ball.vx < this.x + this.w &&
      ball.y + ball.size + ball.vy > this.y &&
      ball.y + ball.vy < this.y + this.h
    ) {
         //state = 'strike'
         return;
    }
    
  }
  
  show() {
    stroke(255, 0, 0);
    strokeWeight(1);
    noFill();
    rect(this.x, this.y, this.w, this.h); // Draw the outer rectangle
  
    let spacing = 10; // Distance between diagonal lines
  
    // Draw diagonal lines from top-left to bottom-right
    for (let i = 0; i <= this.w + this.h; i += this.spacing) {
      let x1 = this.x + i;
      let y1 = this.y;
      let x2 = this.x;
      let y2 = this.y + i;
  
      if (x1 > this.x + this.w) {
        x1 = this.x + this.w;
        y1 = this.y + (i - this.w);
      }
      if (y2 > this.y + this.h) {
        y2 = this.y + this.h;
        x2 = this.x + (i - this.h);
      }
  
      line(x1, y1, x2, y2);
    }
  }
}


class Box{
  
  constructor(tx, ty, tw, th){
    this.x = tx;
    this.y = ty;
    this.w = tw;
    this.h = th;
  }
  
  
  show(){
    fill(50);
    noStroke();
    rect(this.x, this.y, this.w, this.h);  
  }
  
  hit() {

    // Check if the ball's next position is inside the box
    if (
      ball.x + ball.size + ball.vx > this.x &&
      ball.x + ball.vx < this.x + this.w &&
      ball.y + ball.size/2 + ball.vy > this.y &&
      ball.y + ball.vy < this.y + this.h
    ) {
      // Determine which side of the box the ball is colliding with
      let prevX = ball.x - ball.vx;
      let prevY = ball.y - ball.vy;

      if (prevX <= this.x || prevX >= this.x + this.w) {
        ball.vx *= -1; // Reverse X velocity if hitting left or right wall
      }
      if (prevY <= this.y || prevY >= this.y + this.h) {
        ball.vy *= -1; // Reverse Y velocity if hitting top or bottom wall
      }
    }
    
  }
  
  run(){
    this.hit();
    this.show();  
  }
  
  
}
