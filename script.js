const grid= document.querySelector('.grid');
const blockwidth=140;
const blockheight=30;
const userstart=[440,10]
let usercurrentposition=userstart;
const ballstart=[500,40];
let ballcurrentposition=ballstart;
const balldiameter=20;
let timerId
let xDirection=5;
let yDirection=5;

class Blockplace{
    constructor(Xaxis, Yaxis){
        this.bottomLeft=[Xaxis,Yaxis];
        this.bottomRight=[Xaxis+blockwidth,Yaxis];
        this.topRight=[Xaxis+blockwidth,Yaxis+blockheight];
        this.topLeft=[Xaxis,Yaxis+blockheight];
    }
}

const blocks=[];
let x=50;
let y=560;
    for(let i=0;i<6;i++){
        blocks.push(new Blockplace(x,y));
        x=x+150;
    }
     x=50;
     y=520;
    for(let i=0;i<6;i++){
        blocks.push(new Blockplace(x,y));
        x=x+150;
    }
    x=50;
    y=480;
   for(let i=0;i<6;i++){
       blocks.push(new Blockplace(x,y));
       x=x+150;
   }

function addBlock(){
    for(let i=0;i<blocks.length;i++){
        const block=document.createElement('div')
        block.classList.add('block');
        block.style.left=blocks[i].bottomLeft[0]+'px'
        block.style.bottom=blocks[i].bottomRight[1]+'px'
        grid.appendChild(block)
    }

}

addBlock();

//adding user
const user=document.createElement('div')
user.classList.add('user');
grid.appendChild(user);
drawUser();

function drawUser(){
    user.style.left=usercurrentposition[0]+'px';
    user.style.bottom=usercurrentposition[1]+ 'px';
}
//move user
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if(usercurrentposition[0] >0){
                usercurrentposition[0] -= 20;
                drawUser();
            }
            break;

            case 'ArrowRight':
                if(usercurrentposition[0] <1000-blockwidth){
                    usercurrentposition[0] += 20;
                    drawUser();
                    
                }
                break;
    }

    }
  
    document.addEventListener('keydown', moveUser)

    //adding ball
const ball=document.createElement('div')
ball.classList.add('ball');
drawBall()
grid.appendChild(ball);

function drawBall(){
    ball.style.left=ballcurrentposition[0]+'px'
    ball.style.bottom=ballcurrentposition[1]+'px'
}

//moving the ball
// Check for collisions
function collisions() {
    // Collision with blocks
   
    for (let i = 0; i < blocks.length; i++) {
        if (
            ballcurrentposition[0] >= blocks[i].bottomLeft[0] &&
            ballcurrentposition[0] <= blocks[i].bottomRight[0] &&
            ballcurrentposition[1] >= blocks[i].bottomLeft[1] &&
            ballcurrentposition[1] <= blocks[i].topLeft[1]
        ) {
            const allblocks= Array.from(document.querySelectorAll('.block'));
            allblocks[i].classList.remove('block')
            blocks.splice(i, 1); // Remove the collided block from the array
            yDirection = -yDirection; 
            xDirection = -xDirection;
        }
    }


    // Collision with user
    if (
        ballcurrentposition[0] >= usercurrentposition[0] &&
        ballcurrentposition[0] <= usercurrentposition[0] + blockwidth &&
        ballcurrentposition[1] >= usercurrentposition[1] &&
        ballcurrentposition[1] <= usercurrentposition[1] + blockheight
    ) {
        yDirection = -yDirection; // Reverse the ball's vertical direction
    }else if (ballcurrentposition[1] <= usercurrentposition[1]) {
        // Ball passed the user, end the game
        clearInterval(timerId); // Stop the game loop
        alert('Game Over!'); // Show a game over message (you can customize this)
        // You can also add additional logic here, such as resetting the game or redirecting to a game-over page.
    }

    // Collision with game boundaries
    if (ballcurrentposition[0] >= 1000 - balldiameter || ballcurrentposition[0] <= 0) {
        xDirection=-xDirection // Reverse the ball's horizontal direction
    }

    if (ballcurrentposition[1] >= 600 - balldiameter || ballcurrentposition[1] <= 0) {
        yDirection = -yDirection; // Reverse the ball's vertical direction
    }
}

function moveBall() {
    ballcurrentposition[0] += xDirection;
    ballcurrentposition[1] += yDirection;
    drawBall();
    collisions(); // Check for collisions after moving the ball
}

timerId = setInterval(moveBall, 20);
