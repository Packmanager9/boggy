
window.addEventListener('DOMContentLoaded', (event) =>{


    let srcx = 0
    let srcy = 0

    let floors = []
    let difr = true

    let holdjump = 0

    let srcxl = 0
    let srcyl = 0

    let boggylegs = 0

    let jumped = 1
    let boggylevel  = 0
    let bluedots = new Image()
    bluedots.src = 'bluedots.png'


    let jazz = new Audio('boggy.wav');

    let keysPressed = {};

document.addEventListener('keydown', (event) => {
   keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });


    let tutorial_canvas = document.getElementById("tutorial");


    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    tutorial_canvas.style.background = "#000000"

 //   tutorial_canvas_context.scale(.1, .1);  // this scales the canvas by the ratio given






 let flex = tutorial_canvas.getBoundingClientRect();

 // Add the event listeners for mousedown, mousemove, and mouseup
 let tip = {}
 let xs
 let ys
 let tap = {}
 let xz
 let yz


 
 window.addEventListener('mousedown', e => {


    flex = tutorial_canvas.getBoundingClientRect();


    xs = e.clientX - flex.left;
    ys = e.clientY - flex.top;
      tip.x = xs
      tip.y = ys

      tip.body = tip


      // example usage: if(squarecircle(squareOnScreen, tip)){ do stuff }

   window.addEventListener('mousemove', continued_stimuli);
 });



 window.addEventListener('mouseup', e => {
 window.removeEventListener("mousemove", continued_stimuli);
 })

function continued_stimuli(e) {
flex = tutorial_canvas.getBoundingClientRect();
xs = e.clientX - flex.left;
ys = e.clientY - flex.top;
  tip.x = xs
  tip.y = ys

  tip.body = tip


  }


  class Spinwheel{
      constructor(x,y){
        this.body = new Circle(x,y, 2, "red")
        this.bigbody = new Circle(x,y, 141, "red")
        this.wings = []
        this.dis = 130
        this.angle = 0
        this.build()
      }
      build(){
          for(let f = floors.length;f>0;f--){
              if(this.wings.includes(floors[f])){
                if(squarecirclefeetspin(floors[f], boggy.body)){
                    boggy.wingthing =this.wings.indexOf(floors[f])
                    boggy.xdisp = floors[f].x
                    boggy.ydisp = floors[f].y
                }
                  floors.splice(f,1)
              }
          }
          this.wings = []

          this.dis = 100
          let increment = Math.PI/1.5
          let angle = this.angle
          for(let w = 0; w<150; w++){
           
              let wing = new Rectangle(this.body.x +(2*(Math.cos(angle)*this.dis)), this.body.y +(.5*(Math.sin(angle)*this.dis)), 31,31, "green")
              wing.thing = w
              if(wing.thing == boggy.wingthing){
                if(squarecirclefeetspin(wing, boggy.body)){
                    boggy.body.x += wing.x - boggy.xdisp
                    boggy.body.y += wing.y - boggy.ydisp

            tutorial_canvas_context.translate(-(wing.x - boggy.xdisp), -(wing.y - boggy.ydisp))

                }
              }
              floors.push(wing)
              this.wings.push(wing)
              angle+=increment
              if(w%3 == 0 ){
                this.dis+=5
            }
          }
      }
      draw(){
          if(intersects(this.bigbody, boggy.body)){
            //   this.angle+=.001
            //   this.build()
          }
          this.body.draw()
        //   this.bigbody.draw()
          for(let w = 0; w<this.wings.length; w++){
              this.wings[w].draw()
          }
      }
  }

  class Pushblock{
    constructor(x,y){
        this.body = new Rectangle(x,y, 50,50,"green")
        this.body.jumpable = 1
        floors.push(this.body)
        this.beam = new Rectangle(this.body.x, this.body.y-10000,  10000,this.body.width, "#FFFF0088")
    }
    draw(){

        this.body.move()
        this.beam = new Rectangle(this.body.x, this.body.y-10000,  10000,this.body.width, "#FFFF0088")
        this.body.draw()
        this.beam.draw()
        if(squarecirclefaceblock(this.body, boggy.body)){
            if(this.body.x < boggy.body.x-10){
                this.body.x = this.body.x-this.body.width-(boggy.body.radius-72.5)
            }else{
                this.body.x = this.body.x + (boggy.body.radius-22.5)
            }
            this.body.xmom = boggy.body.xmom
            this.body.ymom = boggy.body.ymom

        }
        if(squarecirclefaceblockjump(this.body, boggy.body)){
            // this.body.xmom = boggy.body.xmom
            this.body.ymom = boggy.body.ymom

        }
        if(squarecircleface(this.beam, spinny.body)){
            spinny.angle+=.002
            spinny.build()

        }
        if(squarecircleface(this.beam, boggy.body)){

            boggylevel+=.02
            if(boggylevel >= 6.99999){
                boggylevel = 6.99
            }
        }
        if(squarecirclefeet(this.beam, boggy.body)){

            boggylevel+=.02
            if(boggylevel >= 6.99999){
                boggylevel = 6.99
            }
        }


      this.touch = false

      this.body.jumpable = 0

        for(let f = 0; f<floors.length; f++){
            if(this.body != floors[f]){

            if(squaresquare(floors[f], this.body)  ){
                if(this.body.ymom > 0){
                    this.body.ymom *= .1
                    }
                    if(this.body.y-floors[f].y < 10){

                        this.body.y = floors[f].y-this.body.height
                        this.touch = true
                        this.body.jumpable = 1

                    }
                }

            }
        }

        for(let f = 0; f<wloors.length; f++){
            if(this.body != wloors[f]){     
            if(squaresquare(wloors[f], this.body)  ){
                if(this.body.ymom > 0){
                    this.body.ymom *= .1
                    }
                    this.touch = true
                }
            }
        }

            if(this.touch == false){

        if(this.body.ymom > -.09){
                this.body.ymom+=.145
        }
            }
        

            this.body.xmom*=.95
            this.body.ymom*=.95

    }

  }


    // can be drawn, or moved.
    class Rectangle {
        constructor(x, y, height, width, color) {
            this.jumpable = 1
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){

            this.x+=this.xmom
            this.y+=this.ymom

        }
    }

    // can be drawn, or moved with friction.  and richochet 
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 1

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){

            this.xmom*=.91
            this.ymom*=.95  //friction adjust this to change the slowing of a circle

            this.x += this.xmom
            this.y += this.ymom


            tutorial_canvas_context.translate(-this.xmom, -this.ymom)

            // if(this.x+this.radius > tutorial_canvas.width){

            //     if(this.xmom > 0){
            //     this.xmom *= -1
            //     }

            // }
            // if(this.y+this.radius > tutorial_canvas.height){
            //     if(this.ymom > 0){
            //     this.ymom *= -1
            //     }

            // }
            // if(this.x-this.radius < 0){
            //     if(this.xmom < 0){
            //         this.xmom *= -1
            //     }

            // }
            // if(this.y-this.radius < 0){

            //     if(this.ymom < 0){
            //         this.ymom *= -1
            //     }
        
            // }

            // ^ this reflects balls off the wall
            // the internal checks make it always return to the screen

        }


    }


    // can be drawn, can have movement with minor changes
    class Triangle{
        constructor(x,y, color, length=40){
            this.x = x
            this.y = y
            this.color = color
            this.length = length
            this.radius = length
        }
        draw(){

            tutorial_canvas_context.strokeStyle = this.color  //sets outline color

            tutorial_canvas_context.lineWidth = 0 // sets outline width
    
            tutorial_canvas_context.beginPath(); 
    
            tutorial_canvas_context.moveTo(this.x, this.y+this.length/2); 
            
            tutorial_canvas_context.lineTo(this.x+this.length, this.y+this.length/2); 
            
            tutorial_canvas_context.lineTo(this.x,this.y-this.length*1.41); 
            
            tutorial_canvas_context.lineTo(this.x-this.length, this.y+this.length/2); 
    
            tutorial_canvas_context.lineTo(this.x,this.y+this.length/2); 
    
            tutorial_canvas_context.stroke();  
            tutorial_canvas_context.fillStyle = this.color  // fills the shape
            tutorial_canvas_context.fill()
    
    
        }
    
    }

    // takes two pairs of coordinates, draws a line of the given color, and width.
    class Line{
        constructor(x,y, x2, y2, color, width){
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        draw(){



            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = this.width

        
            tutorial_canvas_context.beginPath(); 
    
            tutorial_canvas_context.moveTo(this.x1, this.y1); 
            
            tutorial_canvas_context.lineTo(this.x2, this.y2); 
            tutorial_canvas_context.stroke();  


            tutorial_canvas_context.lineWidth = 1
        }
    }

    class Boggy{
        constructor(){
            this.body = new Circle(350, 350, 24, "red")

        }
        draw(){


            for(let g = 0; g<beamends.length; g++){
               if(squarecircle(beamends[g], this.body)){
                //    beamends[g].draw()
                   boggylevel+=.02
                   if(boggylevel >= 6.99999){
                       boggylevel = 6.99
                   }
               }

            }
            // this.body.draw()
            this.body.move()
            let body = new Image()
            body.src = 'bodymax.png'
            let legs = new Image()
            legs.src = 'legs.png'
            let legsl = new Image()
            legsl.src = 'legsleft.png'
        
            let sheetwidth = body.width
            let sheetheight = body.height
            let cols = 7
            let rows = 1
        
            let sheetwidthl = legs.width
            let sheetheightl = legs.height
            let colsl = 18
            let rowsl = 1

            boggylevel -=.003
            if(boggylevel <= 0){
                boggylevel = 0
            }
            

            let width = sheetwidth/cols
            let height = sheetheight/rows

            let widthl = sheetwidthl/colsl
            let heightl = sheetheightl/rowsl

            function updateframe(){

                srcx = Math.floor(boggylevel)*width
                srcy = 0
                srcxl = Math.floor(boggylegs)*widthl
                srcyl = 0

                // boggylevel = boggylevel + 0.01
                boggylevel %= cols
                boggylegs %= colsl
            }
            function drawboggy(){
                updateframe()
                if(boggy.body.xmom > 0){

                    tutorial_canvas_context.drawImage(legs, srcxl, srcyl, widthl, heightl, boggy.body.x-17, boggy.body.y-28, widthl, heightl)
                }else{

                    tutorial_canvas_context.drawImage(legsl, srcxl, srcyl, widthl, heightl, boggy.body.x-17, boggy.body.y-28, widthl, heightl)
                }
                tutorial_canvas_context.drawImage(body, srcx, srcy, width, height, boggy.body.x-17, boggy.body.y-44, width, height)

            }

            drawboggy()

        }


    }



    // let x = 0
    // let y = 0

    let boggy = new Boggy()
     let circ = new Circle(125, 200, 10, getRandomLightColor(), Math.random()-.5, Math.random()-.5)  // starts with ramndom velocities and color
     let rect = new Rectangle ( 200, 200, 50, 80, getRandomLightColor())
    // rect.ymom = 1

    // example objects

    let pushie = new Pushblock(650,650)
    let spinny = new Spinwheel(900, 160)

    let oddarray = []
    let beam = new Line(-550, -450, 400, 900, "#FFee11bb", 50)
    let beam2 = new Line(9500, -15000, 400, 590, "#FFee11bb", 50)
    let beam3 = new Line(-1000, -2100, -50, -185, "#FFee11bb", 50)
    let beam4 = new Line(2000, -2000, 220, 55, "#FFee11bb", 50)
    let triangle = new Triangle( 500, 500, "#FFFF00", 60 )
    let wloors = []

    let beamend1 = new Rectangle(200, 600, 120, 120, "red")
    let beamend2 = new Rectangle(370, 450, 120, 120, "red")
    let beamend3 = new Rectangle(-100, -300, 120, 120, "red")
    let beamend4 = new Rectangle(170, -100, 120, 120, "red")

    let beamends = []

    beamends.push(beamend1)
    beamends.push(beamend2)
    beamends.push(beamend3)
    beamends.push(beamend4)


    let floor1 = new Rectangle(-10000, 700, 10700, 20700, "green")
    let floor2 = new Rectangle(370, 560, 42, 100, "green")
    let floor3 = new Rectangle(420, 200, 15, 100, "green")
    let floor4 = new Rectangle(75, 360, 15, 100, "green")
    let floor5 = new Rectangle(169, 40, 33, 100, "green")
    let floor6 = new Rectangle(-100, -200, 30, 100, "green")

    floors.push(floor1)
    floors.push(floor2)
    floors.push(floor3)
    floors.push(floor4)
    floors.push(floor5)
    floors.push(floor6)

    let arcs = []

    let xd = 40
    let yd = 10

    // for(let t = 0; t< 1000; t++){

    //  let circ = new Circle(xd, yd, 1, getRandomLightColor())  // starts with ramndom velocities and color

    //  arcs.push(circ)
    //  xd*= 1.045
    //  yd*=1.0133
    //  yd+=1
    //  xd-=1
    // }

    oddarray.push(beam)
    oddarray.push(triangle)


// interval, fill this with game logic 
    window.setInterval(function(){ 
        jazz.playbackRate = .3 + (boggylevel/(7/.60))
        jazz.play()
        tutorial_canvas_context.clearRect(-10000,-10000, tutorial_canvas.width*1000, tutorial_canvas.height*1000)  // refreshes the image
        
        beam.draw()
        beam2.draw()
        beam3.draw()
        beam4.draw()
        pushie.draw()
        
        for(let f = 0; f<floors.length; f++){
            floors[f].draw()
        }

        spinny.draw()
        boggy.draw()
        
        let boggytouch = false

        for(let f = 0; f<floors.length; f++){

            if(squarecirclefeet(floors[f], boggy.body)  ){
                if(boggy.body.ymom > 0){

                    if(floors[f].jumpable == 1){
                    boggy.body.ymom *= .1
                    }
                    }
                    setTimeout(function(){ 
                        if(floors[f].jumpable == 1){
                            jumped = 1
                        }
                    }, 24);


                        if(typeof floors[f].thing == "undefined"){
                    if(boggy.body.y-floors[f].y < 13){

                        boggy.body.ymom = 0
                        tutorial_canvas_context.translate(0, (boggy.body.y-floors[f].y )+boggy.body.radius)
                        boggy.body.y = floors[f].y-boggy.body.radius
                        }
                        boggytouch = true

                        if(floors[f].jumpable == 1){
                        holdjump = 1
                        }
                    }else{
                        if(boggy.body.y-floors[f].y < 10){

                            boggy.body.ymom = 0
                            tutorial_canvas_context.translate(0, (boggy.body.y-floors[f].y )+boggy.body.radius)
                            boggy.body.y = floors[f].y-boggy.body.radius
                            }
                            boggytouch = true
    
                            if(floors[f].jumpable == 1){
                            holdjump = 1
                            }
                    }



                }

                if(squarecirclehead(floors[f], boggy.body)  ){
                    if(boggy.body.ymom < 0){

                        boggy.body.ymom *= -.2
                    }
                    holdjump = 0
                    jumped = 2
                }
        }

        for(let f = 0; f<wloors.length; f++){
            if(squarecirclefeet(wloors[f], boggy.body)  ){
                if(boggy.body.ymom > 0){
                    boggy.body.ymom *= .1
                    }
                    setTimeout(function(){ 
                        // jumped = 1
                    }, 100);
                    boggytouch = true
                    holdjump = 1
                }
        }

        if(boggy.body.ymom > -.11){
            holdjump = 0
        }

        if(holdjump == 0){
            if(boggytouch == false){
                boggy.body.ymom+=.145
            }
        }



        // floor1.draw()


        players(boggy.body)

        if(Math.abs(boggy.body.xmom) < .005){
            if(boggylegs != 0){
                if(holdlegs  == 0){
    
                    if(difr == false){
                        if(boggylegs < 12){
                            boggylegs-=1
                        }else{
                        boggylegs+=1
                        }
                        boggylegs%=18
                    }else{
                        if(boggylegs < 6){
                        boggylegs-=1
                        }else{
                        boggylegs+=1
                        }
                        boggylegs%=18
                    }
                }
                // boggylegs++
            }
            // boggylegs = 0
        }

    }, 5) // length of refresh interval




    // run on any object with x/y attributes in the timer to give them wasd controls 
    // this is a player controller function, but the logic used here can be made to do anything on keystrokes

    let holdlegs = 0
    function players(racer){
        holdlegs+=1

        holdlegs%=(32-Math.floor(boggylevel*4))

        if (keysPressed['w']) {
            if(jumped < 2){
                if(jumped == 2){
                    setTimeout(function(){ 
                        // jumped -= 1
                    }, 500);
                }
                jumped += 2
                racer.ymom = (-boggylevel*1.65)-1.1
                holdjump = 1
            }
        }
        // if (keysPressed['w']) {
        //         racer.y -= .7
        // }
        if (keysPressed['a']) {
            // racer.x -= .7
            difr = false
            if(holdlegs == 0){

                boggylegs-=1
            }
            racer.xmom -= .055*((boggylevel/2)+.75)
        }
        if (keysPressed['s']) {
            // racer.y += .7
            difr = true
                holdjump = 0
            // racer.ymom += .055*((boggylevel/2)+.75)
        }
        if (keysPressed['d']) {
            // racer.x += .7

            if(holdlegs == 0){

                boggylegs+=1
            }
            racer.xmom += .055*((boggylevel/2)+.75)
        }
        if (keysPressed[' ']) {
            boggylevel += .1
        }

        boggylegs%=18
        if(boggylegs <0){
            boggylegs = 17
        }


        // any key combination can be made from a nested if statement, all keys can just be accessed by name (if you can find it)

    }





// can check if one circle contains the center of the other circle, and / or it can check if any constructed object with an x and y attribute is inside of a circle. With tinkering, this can check boundaries of two circles.
function intersects(circle, left) {
    var areaX = left.x - circle.x;
    var areaY = left.y - circle.y;
    return areaX * areaX + areaY * areaY <= circle.radius * circle.radius;
}

// random color that will be visible on  black background
function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 15)+1)];
    }
    return color;
  }


// checks if a square contains the centerpoint of a circle
function squarecircle(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x){
        if(square.y <= circle.y){
            if(squareendw >= circle.x){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}

// checks if two squares are intersecting ( not touching, for touching change the evaluations from ">" to ">=" etc)
function squaresquare(a, b){

    a.left = a.x
    b.left = b.x
    a.right = a.x + a.width
    b.right = b.x + b.width
    a.top = a.y 
    b.top = b.y
    a.bottom = a.y + a.height
    b.bottom = b.y + b.height



    if (a.left > b.right || a.top > b.bottom || 
        a.right < b.left || a.bottom < b.top)
    {
       return false
    }
    else
    {
        return true
    }
}



function squarecirclefeet(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x){
        if(square.y <= circle.y+circle.radius){
            if(squareendw >= circle.x){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}



function squarecirclefeetspin(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x){
        if(square.y <= circle.y+circle.radius+3.5){
            if(squareendw >= circle.x){
                if(squareendh >= circle.y+(circle.radius-1)){
                    return true
                }
            }
        }
    }
    return false
}


function squarecirclehead(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x){
        if(square.y <= circle.y){
            if(squareendw >= circle.x){
                if(squareendh >= circle.y-(circle.radius+20)){
                    return true
                }
            }
        }
    }
    return false
}


function squarecircleface(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x+circle.radius){
        if(square.y <= circle.y){
            if(squareendw >= circle.x-circle.radius){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}

function squarecirclefaceblock(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x+(circle.radius-12.5)){
        if(square.y <= circle.y){
            if(squareendw >= circle.x-(circle.radius-7.5)){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}
function squarecirclefaceblockjump(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x+(circle.radius-10)){
        if(square.y <= circle.y){
            if(squareendw >= circle.x-(circle.radius-5)){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}



})