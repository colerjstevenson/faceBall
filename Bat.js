class Bat{
  
    
  
}

function draw_face(){
  // draw the faces' bounding boxes
  for (let j = 0; j < faces.length; j++) {
    let face = faces[0];

    strokeWeight(20);
    
    // draw the left eye
    stroke(255, 255, 0);
    
    let keypoint1 = face.leftEye.keypoints[0];
    let kp1 = {x: keypoint1.x, y: offset + keypoint1.y-bar_offset};  
    
    
    // draw the right eye
    stroke(255, 0, 0);
    
    let keypoint2 = face.rightEye.keypoints[0];
    let kp2 = {x: keypoint2.x, y: offset + keypoint2.y-bar_offset};
    
    
    line(kp1.x, kp1.y, kp2.x, kp2.y);
    
    ball.hit(kp1, kp2);
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

function gotFaces(results) {
  faces = results;
}
