const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1;
var backgroundImg,platform;
var bird, bird2, bird3, bird4, slingshot;
var birds=[]

var banana, apple, orange, mango, watermelon, grapes;

var gameState = "onSling";
var bg;
var score = 0;

function preload() {
    bg = loadImage("bg.jpg");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(650,320,70,70);
    box2 = new Box(950,320,70,70);
   
    log1 = new Log(790,260,400, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    

    log3 =  new Log(810,180,300, PI/2);

    log4 = new Log(790,120,150, PI/4);
    log5 = new Log(820,120,150, -PI/4);

    //fruits
    banana = new Banana(780, 350);
    apple = new Apple(780, 220);
    mango = new Mango(820, 220);
    watermelon = new Watermelon(820, 350);
    orange = new Orange(700, 320);
    grapes = new Grapes(810,160);
    bird = new Bird(200,50);
    /*bird2 = new Bird(150,170);
    bird3 = new Bird(100,170);
    bird4 = new Bird(50,170);*/

    /*birds.push(bird);
    birds.push(bird2);
    birds.push(bird3);
    birds.push(bird4);*/

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
        background(bg);
    
        noStroke();
        textSize(35)
        fill("black")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    log1.display();

    box3.display();
    box4.display();
    log3.display();
    log4.display();
    log5.display();

    apple.display();
    apple.score();
    banana.display();
    banana.score();
    watermelon.display();
    watermelon.score();
    mango.display();
    mango.score();
    orange.display();
    orange.score();
    grapes.display();
    grapes.score();

    bird.display();
    /*bird2.display();
    bird3.display();
    bird4.display();*/

    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
     if (gameState!=="launched"){
        /*Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
        Matter.Body.applyForce(birds[birds.length-1].body,birds[birds.length-1].body.position,{x:5,y:-5});*/
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
        Matter.Body.applyForce(bird.body,bird.body.position,{x:5,y:-5});
    }
}

function mouseReleased(){
    slingshot.fly();
    birds.pop();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && gameState==="launched"){
        if(birds.length>=0){
        Matter.Body.setPosition(bird.body,{x:200,y:50});
       slingshot.attach(bird.body);
        /*Matter.Body.setPosition(birds[birds.length-1].body,{x:200,y:50});
       slingshot.attach(birds[birds.length-1].body);*/
       gameState ="onSling";
        }
    }
}
