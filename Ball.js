class Ball{

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 40;
    this.speed = 15;
    
    this.vx = 0;
    this.vy = 10;
  }
  
  
  move(){
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }
  
  wall(){
    if(this.x < 0 || this.x > width){
      this.vx *= -1;
    }
    if(this.y < 0 || this.y > height){
      this.vy *= -1;
    }
  }
  
  show(){
    image(ball_img, this.x, this.y, this.size, this.size);  
    
  }
  
  hit(kp1, kp2){
    //if(!kp1 || !kp2) return;
    
    let p1 = { x: this.x, y: this.y}
    let p2 = { x: this.x + this.vx, y: this.y + this.vy}
    
    if(checkHit(p1, p2, kp1, kp2)){
      let dir = getBounceDirection(p1, p2, kp1, kp2);
      
      this.vx = dir.x;
      this.vy = dir.y;
    }
  }
  
  run(kp1, kp2){
    this.wall();
    this.move();
    this.show();
    print(this.x + ' ' + this.y);
    
  }
  
}


function checkHit(p1, p2, p3, p4) {
    function orientation(a, b, c) {
        let val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
        if (val === 0) return 0; // Collinear
        return val > 0 ? 1 : 2; // Clockwise or Counterclockwise
    }
    
    function onSegment(a, b, c) {
        return Math.min(a.x, b.x) <= c.x && c.x <= Math.max(a.x, b.x) &&
               Math.min(a.y, b.y) <= c.y && c.y <= Math.max(a.y, b.y);
    }
    
    
    console.log(p1, p2, p3, p4);
    let o1 = orientation(p1, p2, p3);
    let o2 = orientation(p1, p2, p4);
    let o3 = orientation(p3, p4, p1);
    let o4 = orientation(p3, p4, p2);
    
    // General case
    if (o1 !== o2 && o3 !== o4) return true;
    
    // Special cases
    if (o1 === 0 && onSegment(p1, p2, p3)) return true;
    if (o2 === 0 && onSegment(p1, p2, p4)) return true;
    if (o3 === 0 && onSegment(p3, p4, p1)) return true;
    if (o4 === 0 && onSegment(p3, p4, p2)) return true;
    
    return false;
}

function getBounceDirection(p1, p2, p3, p4) {
    let wallDir = { x: p4.x - p3.x, y: p4.y - p3.y };
    let ballDir = { x: p2.x - p1.x, y: p2.y - p1.y };
    
    let wallLength = Math.sqrt(wallDir.x ** 2 + wallDir.y ** 2);
    let wallNormal = { x: -wallDir.y / wallLength, y: wallDir.x / wallLength };
    
    let dotProduct = ballDir.x * wallNormal.x + ballDir.y * wallNormal.y;
    let bounceDir = {
        x: ballDir.x - 2 * dotProduct * wallNormal.x,
        y: ballDir.y - 2 * dotProduct * wallNormal.y
    };
    
    return bounceDir;
}
