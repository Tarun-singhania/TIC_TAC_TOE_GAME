const musicTurn=new Audio("ting.mp3");
const musicOver=new Audio("gameover.mp3");
const bgMusic=new Audio("music1.mp3");
const winMusic=new Audio("win_music.mp3");

// For taking of Player Name
const player1=prompt("Enter name of First player");
const player2=prompt("Enter name of Second player");
document.getElementsByClassName("info")[0].innerText="Turn for "+player1;

let gameOver=false;
// We take count due to match drawn
let count=0;
const resetButton=document.getElementById("reset");

// Ye html collection dega aur humlog html collection par forEach loop nhi laga skte hai isiliye isko sbse pehle array me change kiye
const bgmusicBtn=Array.from(document.getElementsByClassName("musicBtn"));

bgmusicBtn.forEach((btn)=>{
  btn.addEventListener('click',(element)=>{
    if(element.target.innerText==="Play"){
      bgMusic.play();
    }else{
      bgMusic.pause();
    }
  })
})

let turn="X";
const changeTurn=()=>{
  return turn==="X"?"0":"X";
}

// Important
const checkWin=()=>{
  let boxTexts=document.getElementsByClassName("boxText");
  const wins=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  wins.forEach((e)=>{
    if((boxTexts[e[0]].innerText===boxTexts[e[1]].innerText)&&(boxTexts[e[1]].innerText===boxTexts[e[2]].innerText)&&(boxTexts[e[0]].innerText!=="")){
      // Turn Change ho chuka hai,Isiliye both players replaces each other
      if(turn=="X")
        boxTexts[e[0]].innerText=player2;
      else
        boxTexts[e[0]].innerText=player1;
      document.getElementsByClassName("info")[0].innerText=boxTexts[e[0]].innerText+" Won";
      boxTexts[e[0]].innerText=(turn==="X"?"0":"X");

      musicOver.play();
      gameOver=true;
      document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width="240px";
      winMusic.play();
      bgMusic.pause();
    };
  })
}

let boxes=document.getElementsByClassName("box");
Array.from(boxes).forEach((element)=>{
  let boxText=element.querySelector(".boxText");
  // document.getElementsByClassName("info")[0].innerText="Turn for "+player1;
  element.addEventListener('click',()=>{
    if(boxText.innerText===''){
      count++;
      boxText.innerText=turn;
      musicTurn.play();
      turn=changeTurn();
      checkWin();
      if(!gameOver && turn==='X')
        document.getElementsByClassName("info")[0].innerText="Turn for "+player1;
      if(!gameOver && turn==='0')
        document.getElementsByClassName("info")[0].innerText="Turn for "+player2;
    }
      if(count===9&&!gameOver){
        document.getElementsByClassName("info")[0].innerText="Match Drawn";
        document.querySelector(".imgBox").getElementsByTagName("img")[0].src="draw-image.jpg";
        document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width="240px";
      }
  })
});

resetButton.addEventListener('click',()=>{
  Array.from(document.getElementsByClassName("boxText")).forEach((e)=>{
    console.log("5");
    count=0;
    // e.innerText="";
    turn="X";
    gameOver=false;
    // document.getElementsByClassName("info")[0].innerText="Turn for "+turn;
    document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width="0";
    document.querySelector(".imgBox").getElementsByTagName("img")[0].src="excited.gif";
    winMusic.pause();
    document.getElementsByClassName("info")[0].innerText="Turn for "+player1;
    e.innerText="";
  });
});
