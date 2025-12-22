let boxes =document.querySelectorAll(".box");
let resetBtn=document.querySelector("#Reset");
let msgContainer =document.querySelector(".msg-container");
let message =document.querySelector("#msg");


let turn0=true; //player0 player1
const winningpattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{   
    console.log("box was clicked");
    if(turn0){        //player 0 turn
        box.innerText="O";

        turn0=false;
    } else{
        box.innerText="X";
        turn0=true;
    }
    box.disabled=true;

    checkWinner();     

});

});


const disablebox=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enablebox=()=>{
    for(let box of boxes){
        box.disabled=false;
    }
};

const winnerShow = (winner)=>{
    message.innerText= `${winner} is the winner`;
    msgContainer.classList.remove("hide");

    };

const checkWinner = () => {
  let winnerFound = false;

  for (let pattern of winningpattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        winnerFound = true;
        winnerShow(pos1);
        disablebox();
        return; 
      }
    }
  }

  //  DRAW CHECK
  let allFilled = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      allFilled = false;
      break;
    }
  }

  if (allFilled && !winnerFound) {
    message.innerText = "No winner ! It's a draw ";
    msgContainer.classList.remove("hide");
    disablebox();
  }
};



resetBtn.addEventListener("click", () => {
  turn0 = true;
  enablebox();
  msgContainer.classList.add("hide");

  for (let box of boxes) {
    box.innerText = "";
  }
});
enablebox();







