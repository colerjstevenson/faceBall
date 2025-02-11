let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

let field_img;
let ball_img;
let bat_imgl
let glove_img;

let offset = 415
let bar_offset = 50;
let brick_size = 100;
let zw = 3;
let zh = 10;

let ball;
let bricks = [];
let gloves = [];
let zone;

let box_l;
let box_r;

let state;
let strikes;

function preload() {
  faceMesh = ml5.faceMesh(options);
  field_img = loadImage('field.jpg');
  ball_img = loadImage('ball.png');
  glove_img = loadImage('glove.png');
  field_img.resize(650, 425);
}

function setup() {
  createCanvas(640, 895);
  state = 'start';
  strikes = 0;
  
  ball = new Ball(width/2, height/4);
  
  zone = new Zone(width/zw, height - height/zh, width/zw, height/zh);
  
  append(gloves, new Glove(random(width), 350));
  append(gloves, new Glove(random(width), 270));
  
  box_l = new Box(0, height-height/zh, width/zw, height/zh);
  box_r = new Box((width/zw)*2, height-height/zh, width/zw, height/zh);
  

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // draw the webcam video
  image(field_img, 0, 0, width, offset);
  image(video, 0, offset, width, 480);

  draw_face();
  
  zone.show();
  zone.hit();
  
  
  box_l.run();
  box_r.run();
  
 
  
  
  if(state == 'run'){
    ball.run();
  
    for(let glove of gloves){
      glove.run();  
    }  
    
  }
  
  
}


  function keyPressed(){
    
    if(state == 'start'){
       state = 'run'; 
      
    }
    
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

function gotFaces(results) {
  faces = results;
}
