const board =document.querySelector('.board')
const pallete=document.querySelector('.pallete')
const next=document.querySelector('.next p')
const Score=document.querySelector('.score p')
let colorArray=["yellow", "green", "red", "blue", "purple", "pink"]

let boardbounds=board.getBoundingClientRect()
let squarevelocity
let score
let choosecolor
let notstarted=false

let drawsquare=()=>{
    setInterval(()=>{
        let square=document.createElement("div")
        square.classList.add("square")
        let x=Math.floor(Math.random()*board.clientWidth)
        square.style.top="-20px"
        square.style.left=x+"px"
        square.style.right=x+20+"px"
        square.style.background=chooserandomcolor()
        board.appendChild(square);
    },600);
};

let chooserandomcolor=()=>{
    let index=Math.floor(Math.random()*colorArray.length)
    return colorArray[index];
};
let nextcolor=()=>{
    let index=Math.floor(Math.random()*colorArray.length)
    next.style.background=colorArray[index];
    choosecolor=colorArray[index];
}
let squaremove=()=>{
    let squares=document.querySelectorAll(".square")
    for(let i=0;i<squares.length;i++){
        let pallette=pallete.getBoundingClientRect()
        let presentsquare=squares[i].getBoundingClientRect()
        let squarecolor=squares[i].style.background
        squares[i].style.top=parseInt(squares[i].style.top)+1+squarevelocity+"px";
        if(presentsquare.bottom>pallette.top
            && presentsquare.left>pallette.left
            && pallette.right>presentsquare.right
            )
            {
                if(squarecolor===choosecolor)
                {
                    score=score+5
                    Score.textContent=score
                    board.removeChild(squares[i]);
                    nextcolor();
                }
                else{
                    initial();
                }  
            }
            if(presentsquare.bottom>boardbounds.bottom){
                board.removeChild(squares[i]);
            }
    }
    requestAnimationFrame(squaremove);
};

let initial=()=>{
    let squares=document.querySelectorAll(".square")
    squares.forEach(item=>{
        item.remove()
    })
    squarevelocity=1
    score=0
    Score.textContent=score
    if(!notstarted){
        drawsquare()
        nextcolor()
        squaremove()
        notstarted=true;
    }
};

window.addEventListener("mousemove",(e)=>{
    pallete.style.left=e.x+"px";
});

initial();

