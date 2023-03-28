// instantiating the canvases

let sketch2 = function(s) {
  // colors ----------------------------------------------------------
  // 1st value is the sky bg, 2nd value is the sun and extra stuff
  var hue1, sat1, light1, hue2, sat2, light2;
  var coinflip;
  
  // check if x is between min and max; return a boolean
  function between(x, min, max) {return x >= min && x <= max;}
  
  //random int tool
  function getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min)
  }
  
  // gives HSL random values
  function HSLrandom() {
    hue1 = getRandomInt(0, 361);
    sat1 = getRandomInt(60, 80);
    hue2 = getRandomInt(0, 361);
    sat2 = getRandomInt(60, 80);

    coinflip = getRandomInt(0,2);

    if(coinflip == 0){
      // sky should tbe darker than the sun
      light1 = getRandomInt(20, 40);
      light2 = getRandomInt(40, 70);
    } else {
      // sun should be darker than the sky
      light2 = getRandomInt(20, 40);
      light1 = getRandomInt(40, 70);
    }
    
    // check if the hues are too similar, || checks for reds
    if(Math.abs(hue1-hue2) < 20 || between(Math.abs(hue1 - hue2), 340, 361)){
      do {hue1 = getRandomInt(0, 361);} 
      while(Math.abs(hue1-hue2) < 20 || between(Math.abs(hue1 - hue2), 340, 361));
    }
    // check for really bad color combos
    if((between(hue1, 50, 130) && between(hue2, 290, 340)) || (between(hue2, 50, 130) && between(hue1, 290, 340))){
      do {hue1 = getRandomInt(0, 361);} 
      while((between(hue1, 50, 130) && between(hue2, 290, 340)) || (between(hue2, 50, 130) && between(hue1, 290, 340)))
    }
    if((between(hue1, 310, 330) && between(hue2, 130, 165)) || (between(hue2, 130, 165) && between(hue1, 310, 330))){
      do {hue1 = getRandomInt(0, 361);} 
      while((between(hue1, 310, 330) && between(hue2, 130, 165)) || (between(hue2, 130, 165) && between(hue1, 310, 330)))
    }
    if((between(hue1, 240, 290) && between(hue2, 50, 100)) || (between(hue2, 50, 100) && between(hue1, 240, 290))){
      do {hue1 = getRandomInt(0, 361);} 
      while((between(hue1, 240, 290) && between(hue2, 50, 80)) || (between(hue2, 50, 80) && between(hue1, 240, 290)))
    }

    if((between(hue1, 50, 135) && between(hue2, 190, 290)) || (between(hue2, 70, 135) && between(hue1, 190, 290))){
      do {hue1 = getRandomInt(0, 361);} 
      while((between(hue1, 70, 135) && between(hue2, 190, 290)) || (between(hue2, 70, 135) && between(hue1, 190, 290)))
    }
    if((between(hue1, 190, 250) && between(hue2, 180, 210)) || (between(hue2, 190, 250) && between(hue1, 180, 210))){
      do {hue1 = getRandomInt(0, 361);} 
      while((between(hue1, 190, 250) && between(hue2, 180, 210)) || (between(hue2, 190, 250) && between(hue1, 180, 210)))
    }
    if((between(hue1, 130, 160) && between(hue2, 200, 230)) || (between(hue2, 130, 160) && between(hue1, 200, 230))){
      do {hue1 = getRandomInt(0, 361);} 
      while((between(hue1, 130, 160) && between(hue2, 200, 230)) || (between(hue2, 130, 160) && between(hue1, 200, 230)))
    }
    if((between(hue1, 260, 300) && between(hue2, 175, 210)) || (between(hue2, 260, 300) && between(hue1, 175, 210))){
      do {hue1 = getRandomInt(0, 361);} 
      while((between(hue1, 260, 300) && between(hue2, 175, 210)) || (between(hue2, 260, 300) && between(hue1, 175, 210)))
    }

    if((between(hue1, 30, 60) && between(sat1, 30, 70) && between(light1, 20, 35))){
      do {hue1 = getRandomInt(61, 361);} 
      while((between(hue1, 30, 60) && between(sat1, 30, 70) && between(light1, 20, 35)))
    }
    if((between(hue2, 30, 60) && between(sat2, 30, 70) && between(light2, 20, 35))){
      do {hue2 = getRandomInt(61, 361);} 
      while((between(hue2, 30, 60) && between(sat2, 30, 70) && between(light2, 20, 35)))
    }

    if((between(hue1, 130, 200) && between(hue2, 210, 270)) || (between(hue2, 130, 200) && between(hue1, 210, 270))){
      do {hue1 = getRandomInt(0, 361);} 
      while((between(hue1, 130, 200) && between(hue2, 210, 270)) || (between(hue2, 130, 200) && between(hue1, 210, 270)))
    }
    if((between(hue1, 130, 170) && between(hue2, 250, 310)) || (between(hue2, 130, 170) && between(hue1, 250, 310))){
      do {hue1 = getRandomInt(0, 361);} 
      while((between(hue1, 130, 170) && between(hue2, 250, 310)) || (between(hue2, 130, 170) && between(hue1, 250, 310)))
    }

    if((between(hue1, 90, 110) && between(hue2, 220, 240)) || (between(hue2, 90, 110) && between(hue1, 220, 240))){
      do {hue1 = getRandomInt(0, 361);} 
      while((between(hue1, 90, 110) && between(hue2, 220, 240)) || (between(hue2, 90, 110) && between(hue1, 220, 240)))
    }
    
    // check if the sats are too similar
    if(Math.abs(sat1-sat2) < 10){
      do {
        if(sat1 <= sat2){
          if(sat1 >= 77 && sat2 >= 77){
            if(light1 <= light2){sat1 -= 15;}
            else if(light1 > light2){sat2 -= 15;}
          }
          if(sat1 <= 63 && sat2 <= 63){
            if(light1 <= light2){sat1 += 15;}
            else if(light1 > light2){sat2 += 15;}
          }
          else if(sat1 < 33){break;}
          else if(sat2 > 78){break;}
          sat1 -= 3;
          sat2 += 3;
        } 
        else {
          if(sat1 >= 77 && sat2 >= 77){
            if(light1 <= light2){sat1 -= 15;}
            else if(light1 > light2){sat2 -= 15;}
          }
          else if(sat1 <= 63 && sat2 <= 63){
            if(light1 <= light2){sat1 += 15;}
            else if(light1 > light2){sat2 += 15;}
          }
          else if(sat2 < 33){break;}
          else if(sat1 > 78){break;}
          sat2 -= 3;
          sat1 += 3;
        }
      } while(Math.abs(sat1-sat2) < 10);
    } 
    if(Math.abs(sat1 - light1) < 10 || Math.abs(sat2 - light2) < 10){
      do {
        if(light1 <= light2){
          if(light1 < 23){break;}
          else if(light2 > 67){break;}
          light1 -= 3;
          light2 += 3;
        } 
        else {
          if(light2 < 23){break;}
          else if(light1 > 67){break;}
          light2 -= 3;
          light1 += 3;
        }
      } while(Math.abs(sat1 - light1) < 10 || Math.abs(sat2 - light2) < 10);
    }

    // check if the light is too similar
    if(Math.abs(light1-light2) < 20){
      do {
        if(light1 <= light2){
          if(light1 < 23){break;}
          else if(light2 > 67){break;}
          light1 -= 3;
          light2 += 3;
        } 
        else {
          if(light2 < 23){break;}
          else if(light1 > 67){break;}
          light2 -= 3;
          light1 += 3;
        }
      } while(Math.abs(light1-light2) < 20);
    } 

    // check if light and sat are too similar (for contrast)
    if(Math.abs(light1 - sat2) < 15 || Math.abs(light2 - sat1) < 15){
      if(Math.abs(light1 - sat2) < 15){
        do {
          if(light1 >= light2){
            if(light1 > 67){break;}
            light1 += 3;
          } 
          else {
            if(light1 < 27){break;}
            light2 -= 3;
          }
        } while(Math.abs(light1 - sat2) < 15);
      }
      if(Math.abs(light2 - sat1) < 15){
        do {
          if(light2 >= light1){
            if(light2 > 67){break;}
            light2 += 3;
          } 
          else {
            if(light2 < 27){break;}
            light2 -= 3;
          }
        } while(Math.abs(light2 - sat1) < 15);
      }
    }

    if((between(hue1, 30, 85) && between(sat1, 40, 70)) && between(light1, 10, 30)){
      do {hue1 = getRandomInt(100, 361);} 
      while((Math.abs(hue1-hue2) < 20 || between(Math.abs(hue1 - hue2), 340, 361)) && between(hue1, 30, 85))
    }
    if(((between(hue2, 30, 85) && between(sat2, 40, 70)) && between(light2, 10, 30))){
      do {hue2 = getRandomInt(100, 361);} 
      while((Math.abs(hue1-hue2) < 20 || between(Math.abs(hue1 - hue2), 340, 361)) && between(hue1, 30, 85))
    }

    if((between(hue1, 120, 190) && between(light1, 15, 30)) && (between(hue2, 200, 320) && between(light2, 30, 50))){
      do {light2+=30;} 
      while((between(hue1, 120, 190) && between(light1, 15, 30)) && (between(hue2, 200, 320) && between(light2, 30, 50)))
    }
    if((between(hue2, 120, 190) && between(light2, 15, 30)) && (between(hue1, 200, 320) && between(light1, 30, 50))){
      do {light1+=30;} 
      while((between(hue2, 120, 190) && between(light2, 15, 30)) && (between(hue1, 200, 320) && between(light1, 30, 50)))
    }

    if(between(hue1, 210, 270) && between(light1, 15, 40)){
      if(light2 < 30){light1+=35;}
    }
    if(between(hue2, 210, 270) && between(light2, 15, 40)){
      if(light1 < 30){light2+=35;}
    }
  }

  HSLrandom();
      
  // particle ----------------------------------------------------------
  // basically a physics engine for the particles

  var lineWeight = getRandomInt(1, 3);
  
  class Particle {
      constructor() {
        this.pos = s.createVector(s.random(s.width), s.random(s.height));
        // random velocity
        this.vel = s.createVector(0,0);
        this.acc = s.createVector(0,0);
        // keep the particle's speed from going out of control
        this.maxspeed = 12;
        // saves the prev pos the particle was at
        this.prevpos = this.pos.copy(); 
      }    

      // updates vel based on acc and pos based on vel
      update() {
        // acc gets added to vel
        this.vel.add(this.acc);
        // pos gets added to vel
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
      }

      // based on the particles x y pos, scale the particle to a grid of cols + rows, then look up the corresponding vector in the 1D array, and then take the vector and apply it as a force
      follow(vectors) {
        var x = s.floor(this.pos.x / scl);
        var y = s.floor(this.pos.y / scl);
        // formula for taking a 2D value into a 1D array
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
      }

      // function that receives a force
      applyForce(force) {
        this.acc.add(force);
      }

      // draws the particle, stuff to be changed to change how the colors look
      show() {
        s.stroke(hue2, sat2, light2);
        s.strokeWeight(lineWeight);
        s.line(this.pos.x, this.pos.y, this.prevpos.x, this.prevpos.y);
        this.updatePrev();
      }

      updatePrev() {
        this.prevpos.x = this.pos.x;
        this.prevpos.y = this.pos.y;
      }

      // make the particles wrap around the edges of the canvas
      edges() {
        if (this.pos.x > s.width) {
          this.pos.x = 0;
          this.updatePrev();
        }
        if (this.pos.x < 0) {
          this.pos.x = s.width;
          this.updatePrev();
        }
        if (this.pos.y > s.height) {
          this.pos.y = 0;
          this.updatePrev();
        }
        if (this.pos.y < 0) {
          this.pos.y = s.height;
          this.updatePrev();
        }
      }
    }
        
    // setup/draw ----------------------------------------------------------
    
    // circle variables
    var qInt = getRandomInt(1,6);
    var r = getRandomInt(80, 300);
    
    // flow direction functions
    var piInt = getRandomInt(1,4);
    var direction;
    
    var inc = 0.2;
    
    // stands for scale, we can't use that word exactly so we're using 'scl'
    // determines size of "boxes" in the "grid" we're making for the perlin noise, which will encase the vectors
    var scl = 35;
    var cols, rows;
  
    var zoff = 0;
  
    // particles array using constructor
    var particle = [];
  
    var flowfield;
  
    // sizing variables
    var w = window.innerWidth,
            h = window.innerHeight,
            resolution = 3,
            resolutionH = 5,
            dimDif = resolution / resolutionH,
            sizeH = h,
            sizeW = h * dimDif;
    
    s.setup = function() {
      s.colorMode(s.HSB);
      const canvas = s.createCanvas(sizeW, sizeH);
      canvas.parent("static-grid");
      canvas.style("display", "none");
      cols = s.floor(sizeW/scl);
      rows = s.floor(sizeH/scl);
  
      if(piInt == 1){direction = s.TWO_PI;} 
      if(piInt == 2){direction = s.PI * s.PI;} 
      // if(piInt == 3){direction = s.PI * 4;} 
      if(piInt == 3){direction = s.QUARTER_PI * getRandomInt(6,17);} 
  
      flowfield = new Array(cols * rows);
  
      // change the 'i < ###' part to change how many particles show up
      for (var i = 0; i < 700; i++) {
        particle[i] = new Particle();
      }
  
      // draws the background only once; the rest is "drawn out" in lines
      s.background(hue1, sat1, light1);
    };
  
    s.draw = function() {
      // sun
      s.noStroke();
      s.fill(hue2, sat2, light2);
      if(qInt == 1){s.circle(s.width/4, s.height/8, r);} 
      if(qInt == 2){s.circle((s.width/4)*3, s.height/8, r);} 
      if(qInt == 3){s.circle(s.width/4, (s.height/8)*3, r);} 
      if(qInt == 4){s.circle((s.width/4)*3, (s.height/8)*3, r);} 
      if(qInt == 5){s.circle(s.width/2, s.height/4, r);}
  
      // lines/vectors
      var yoff = 0;
      for (var y = 0; y < rows; y++){
        var xoff = 0;
        for (var x = 0; x < cols; x++){
          // all the vectors being calculated are being stored in the flowfield array
          var index = x + y * cols;
          var angle = s.noise(xoff, yoff, zoff) * direction;
          var v = p5.Vector.fromAngle(angle)
  
          // how closely the particles follow the vector lines drawn
          v.setMag(1);
          flowfield[index] = v;
          xoff += inc;
  
          // make the lines
          s.stroke(hue1, sat1, light1);
          s.push();
          s.translate(x * scl, y * scl);
          s.rotate(v.heading());
          s.strokeWeight(1);
          s.line(0, 200, scl, 0);
          s.pop();
        }
        yoff += inc;
        // makes it 'move' in '3d'
        zoff += 0.001;
      }
      for (var i = 0; i < particle.length; i++){
        particle[i].follow(flowfield);
        particle[i].update();
        particle[i].edges();
        particle[i].show();   
      }
      // border
      s.stroke(hue2, sat2, light2);
      s.strokeWeight(30);
      s.noFill();
      s.rect(0, 0, s.width, s.height);
  
      // makes the static screenshots / images
      // stops the if statement after ms milliseconds / ms * 5 iterations
      // ms * 50, where ms is the time it takes to make a new canvas (around ms millisecond)
      var ms = 15;
      var scs = 50;
      if(s.frameCount <= ms*scs){
        // changes the canvas randomly every 1 sec
        if(s.frameCount % ms == 0){
          HSLrandom();
          s.background(hue1, sat1, light1);
          lineWeight = getRandomInt(3, 7);
          qInt = getRandomInt(1,6);
          r = getRandomInt(100, 300);
          piInt = getRandomInt(1,5);
          addImages();
        }
      }
    };
  };