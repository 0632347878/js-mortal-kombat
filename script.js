
var bodyBlock = document.querySelector(".wrapper");
//var playerOne = document.getElementById("hero1");
//var playerTwo = document.getElementById("hero2");

var resetBtn = document.getElementById("reset");
var bloodStatus = document.querySelector(".blood-status");
var health = 100;

var playerOneHealth = health;
var playerTwoHealth = health;




var wastedText = document.createElement('span');
wastedText.classList.add("wasted-text")
wastedText.innerHTML = 'Wasted';



document.querySelector("#hero1-kicks").addEventListener("click", playerOneDamage);
document.querySelector("#hero2-kicks").addEventListener("click", playerTwoDamage);

resetBtn.addEventListener("click", resetFunc);


function playerOneDamage(){
  if(playerOneHealth>0){
    playerOne.classList.toggle("kick");
    playerOneHealth = playerOneHealth - 20;
    document.querySelector("#hero1-level .blood-status").style.width =  playerOneHealth + "%";
  }
  if(playerOneHealth===0){
    playerOne.classList.add("wasted");
    bodyBlock.appendChild(wastedText);
    while(playerOneHealth);
    playerOneHealth = false;
  }
}

function playerTwoDamage(){
  if(playerTwoHealth>0){
    playerTwo.classList.toggle("kick");
    playerTwoHealth = playerTwoHealth - 20;
    document.querySelector("#hero2-level .blood-status").style.width =  playerTwoHealth + "%";
  }
  if(playerTwoHealth===0){
    playerTwo.classList.add("wasted");
    bodyBlock.appendChild(wastedText);
    while(playerTwoHealth);
    playerTwoHealth = false;
  }
}

function resetFunc(){
  document.querySelector("#hero1-level .blood-status").style.width =  health + "%";
  document.querySelector("#hero2-level .blood-status").style.width =  health + "%";
  playerOneHealth, playerTwoHealth = health;
  document.querySelector(".wasted").classList.remove("wasted");
  document.querySelector(".wasted-text").remove();
}

// Movement



var playerOneData = {
  playerSelector: document.getElementById("hero1"),
  opponent: playerTwoData,
  moveTop: false,
  moveForward: false,
  moveBottom: false,
  moveBack: false,
  handkick: false,
  footkick: false,
  moverun: false,
  block: false,
  playerPosX: 0,
  playerPosY: 0,
  playerWidth: 150,
  playerheight: 138,
  keyPressedHandkick: false,
  keyPressedFootkick: false,
  keyPressedJump: false,
  footKickEnd: true,
  handKickEnd: true,
  jumpEnd: true
};


var playerTwoData = {
  playerSelector: document.getElementById("hero2"),
  opponent: playerOneData,
  moveTop: false,
  moveForward: false,
  moveBottom: false,
  moveBack: false,
  handkick: false,
  footkick: false,
  moverun: false,
  block: false,
  playerPosX: 500,
  playerPosY: 262,
  playerWidth: 150,
  playerheight: 138,
  keyPressedHandkick: false,
  keyPressedFootkick: false,
  keyPressedJump: false,
  footKickEnd: true,
  handKickEnd: true,
  jumpEnd: true
};

var player;

var playerWidth = 72;
var playerHeight = 262;

var moveForwardInterval = null;
var moveBackInterval = null;
var moveRunInterval = null;
var getPosInterval = null;


var levelWrapper = document.querySelector(".wrapper");
var levelWidth = levelWrapper.offsetWidth;

// audio

insertAudio('foot_kick');
insertAudio('hand_kick');
insertAudio('syborg_run');
insertAudio('desert_level_track');
insertAudio('jump_end');

//playAudio('desert_level_track', "loop");


function funcKeyDown(event){
  if(event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40 || event.keyCode === 37 || event.keyCode === 65 || event.keyCode === 83 || event.keyCode === 81 || event.keyCode === 87){
    player = playerOneData;
  }
    
  checkPlayerSide();


  // jump
  if(event.keyCode === 38 && !player.block && !player.moverun){
    player.keyPressedJump = true;
    jump(player);
  }

  // Move forward
  if(event.keyCode === 39 && !player.block && !player.moverun && !player.moveBottom && !player.handkick && !player.footkick){
    clearInterval(moveForwardInterval);
    player.playerSelector.classList.add("move-forward");
    moveForwardInterval = setInterval(function(){
      moveForwardFunc(player);
    });
  }

  // Move back
  if(event.keyCode === 37 && !player.block && !player.moverun && !player.moveBottom && !player.handkick && !player.footkick){
    clearInterval(moveBackInterval);
    player.playerSelector.classList.add("move-back");
    moveBackInterval = setInterval(function(){
      moveBackFunc(player);
    });
  }

  // Move bottom
  if(event.keyCode === 40){
    clearInterval(moveForwardInterval);
    clearInterval(moveBackInterval);
    moveBottomFunc(player);
  }

  // Hand kick
  if(event.keyCode === 65 && !player.handkick && player.handKickEnd && !player.footkick){
    player.keyPressedHandkick = true;
    handKickFunc(player);
  }

  // Foot kick
  if(event.keyCode === 83 && !player.footkick && player.footKickEnd && !player.handkick){
    player.keyPressedFootkick = true;
    footKickFunc(player);
  }

  // Run
  if(event.keyCode === 81 && !player.block && !player.moveTop && player.jumpEnd && !player.moveForward && !player.moveBack){
    clearInterval(moveRunInterval);
    player.moverun = true;
    player.playerSelector.classList.add("move-run");
    moveRunInterval = setInterval(function(){
      moveRunFunc(player);
    });
  }

  // Block
  if(event.keyCode === 87){
    clearInterval(moveForwardInterval);
    clearInterval(moveBackInterval);
    clearInterval(moveRunInterval);
    blockFunc(player);
  }
}

function funcKeyUp(event){
  if(event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40 || event.keyCode === 37 || event.keyCode === 65 || event.keyCode === 83 || event.keyCode === 81 || event.keyCode === 87){
    player = playerOneData;
  }

  checkPlayerSide();

  // jump
  if(event.keyCode === 38){
    player.moveTop = false;
    player.keyPressedJump = false;
    player.playerSelector.classList.remove("move-up");
  }

  // Move forward
  if(event.keyCode === 39){
    player.moveForward = false;
    player.playerSelector.classList.remove("move-forward");
    clearInterval(moveForwardInterval);
  }

  // Move back
  if(event.keyCode === 37){
    player.moveBack = false;
    player.playerSelector.classList.remove("move-back");
    clearInterval(moveBackInterval);
  }

  // Move bottom
  if(event.keyCode === 40){
    player.moveBottom = false;
    player.playerSelector.classList.remove("move-down");
  }

  // Hand kick
  if(event.keyCode === 65){
    player.keyPressedHandkick = false;
    player.handkick = false;
  }

  // Foot kick
  if(event.keyCode === 83){
    player.keyPressedFootkick = false;
    player.footkick = false;
  }

  // Run
  if(event.keyCode === 81){
    player.moverun = false;
    player.playerSelector.classList.remove("move-run");
    clearInterval(moveRunInterval);
  }

  // Block
  if(event.keyCode === 87){
    player.block = false;
    player.playerSelector.classList.remove("block");
    if(player.moveForward){
         moveForwardInterval = setInterval(function(){
          moveForwardFunc(player)
        });
      }
    if(player.moveBack){
       moveBackInterval = setInterval(function(){
        moveBackFunc(player)
      });
    }
  }
}


// Kicks

function handKickFunc(player){
  if(!player.moveTop && player.moveForward || player.jumpEnd && player.moveTop && player.moveForward ){
    clearInterval(moveForwardInterval);
  }
  if(!player.moveTop && player.moveBack || player.jumpEnd && player.moveTop && player.moveBack){
    clearInterval(moveBackInterval);
  }
  if(player.footKickEnd){
    player.handkick = true;
    player.playerSelector.classList.add("hand-kick");
    playAudio('hand_kick');
    player.handKickEnd = false;
    setTimeout(function(){
      if(player.moveForward){
         clearInterval(moveForwardInterval);
         moveForwardInterval = setInterval(function(){
           moveForwardFunc(player)
        });
      }
      if(player.moveBack){
         clearInterval(moveBackInterval);
         moveBackInterval = setInterval(function(){
          moveBackFunc(player);
        });
      }
      player.handkick = false;
      player.playerSelector.classList.remove("hand-kick");
      stopAudio('hand_kick');
      player.handKickEnd = true;
      if(player.keyPressedHandkick){
        player.handkick = true;
      }
      else{
        player.handkick = false;
      }
    }, 300);
  }
}

function footKickFunc(player){
  if(!player.moveTop && player.moveForward || player.jumpEnd && player.moveTop && player.moveForward){
    clearInterval(moveForwardInterval);
  }
  if(!player.moveTop && player.moveBack || player.jumpEnd && player.moveTop && player.moveBack){
    clearInterval(moveBackInterval);
  }
  if(player.handKickEnd){
    player.footkick = true;
    player.playerSelector.classList.add("foot-kick");
    playAudio('foot_kick');
    player.footKickEnd = false;
    setTimeout(function(){
      if(player.moveForward){
         clearInterval(moveForwardInterval);
         moveForwardInterval = setInterval(function(){
          moveForwardFunc(player)
        });
      }
      if(player.moveBack){
         clearInterval(moveBackInterval);
         moveBackInterval= setInterval(function(){
          moveBackFunc(player)
        });
      }
      player.footkick = false;
      player.playerSelector.classList.remove("foot-kick");
      stopAudio('foot_kick');
      player.footKickEnd = true;
      if(player.keyPressedFootkick){
        player.footkick = true;
      }
      else{
        player.footkick = false;
      }
    }, 400);
  }
}

// jump

function jump(player){
  if (!player.moveTop && player.jumpEnd) {
    player.moveTop = true;
    player.jumpEnd = false;
    toTop(function(){
      toBottom(function(){
        jumpEnd(player);
      });
    });
  }
  function toTop(callbackFn){
    player.playerSelector.classList.add("move-top");
    setTimeout(function() {
      player.playerSelector.style.bottom = parseInt(player.playerSelector.style.bottom) + 5 + 'px';
      if (parseInt(player.playerSelector.style.bottom) > 150){
        callbackFn();
      } 
      else {
        toTop(callbackFn);
      }
    }, 10);
  }
  function toBottom(callbackFn){
    setTimeout(function() {
      player.playerSelector.style.bottom = parseInt(player.playerSelector.style.bottom) - 5 + 'px';
      if (parseInt(player.playerSelector.style.bottom) > 0){
        toBottom(callbackFn);
      } 
      else {
        callbackFn();
      }
    }, 10);
  }
  function jumpEnd(player){
    player.playerSelector.classList.remove("move-top");
    playAudio('jump_end');
    player.moveTop = false;
    player.jumpEnd = true;
    if(player.keyPressedJump){
        player.moveTop = true;
      }
    else{
      player.moveTop = false;
    }
  }
}


// Movement

function moveBackFunc(player){
  if(player.playerPosX >= 0){
    if(player.playerPosY < playerHeight || player.playerPosX < player2.playerPosX + playerWidth || player.playerPosX > player2.playerPosX + playerWidth || player.playerPosX === player2.playerPosX + playerWidth){
      player.moveBack = true;
      player.playerSelector.style.left = parseInt(player.playerSelector.style.left) - 1 + 'px';
    }
  }
}

function moveForwardFunc(player){
  if(player.playerPosX <= levelWidth - player.playerSelector.offsetWidth){
    if(player.playerPosY < playerHeight || player.playerPosX < player2.playerPosX - playerWidth || player.playerPosX > player2.playerPosX - playerWidth || player.playerPosX === player2.playerPosX - playerWidth){
      player.moveForward = true;
      player.playerSelector.style.left = parseInt(player.playerSelector.style.left) + 1 + 'px';
    }
  }
}

function moveBottomFunc(player){
  player.moveBottom = true;
  player.playerSelector.classList.add("move-down");
}

function blockFunc(player){
  if(!player.moveTop){
    player.block = true;
    player.playerSelector.classList.add("block");
  }
}

function moveRunFunc(player){
  if(player.playerPosX <= levelWidth - player.playerSelector.offsetWidth && !(player.playerPosX === 0)){
    playAudio('syborg_run');
    if(player.playerPosX > player2.playerPosX){
      player.playerSelector.style.left = parseInt(player.playerSelector.style.left) - 2 + 'px';
    }
    else{
      player.playerSelector.style.left = parseInt(player.playerSelector.style.left) + 2 + 'px';
    }
  }
}


///// Get the positions

function getPosition(player) {
  player.playerPosX = 0;
  player.playerPosY = 0;
  player.playerPosX += (player.playerSelector.offsetLeft - player.playerSelector.scrollLeft + player.playerSelector.clientLeft);
  player.playerPosY += (player.playerSelector.offsetTop - player.playerSelector.scrollTop + player.playerSelector.clientTop);
  var coords = "x:" + player.playerPosX + " y:" + player.playerPosY;
  player.playerSelector.innerHTML =  coords;
}



function playerPositionFix(){
  var playerPosDiff = playerOneData.playerPosX - playerTwoData.playerPosX;
  if(playerOneData.playerPosX > playerTwoData.playerPosX - playerWidth && playerOneData.playerPosX < playerTwoData.playerPosX + playerWidth && playerOneData.playerPosY > playerHeight - 10){
    if (playerPosDiff > 0 ){
      playerOneData.playerPosX += 5;
      playerTwoData.playerPosX -= 5;
    } 
    else {
      playerOneData.playerPosX -= 5;
      playerTwoData.playerPosX += 5;
    }
    // move opponent while push
    playerOneData.playerSelector.style.left = playerOneData.playerPosX + 'px';
    playerTwoData.playerSelector.style.left = playerTwoData.playerPosX + 'px';
  }


  /// Player direction
  if(playerOneData.playerPosX > playerTwoData.playerPosX){
    playerOneData.playerSelector.setAttribute("flipped", "flipped");
    playerTwoData.playerSelector.removeAttribute("flipped", "flipped");
  }
  else{
    playerOneData.playerSelector.removeAttribute("flipped", "flipped");
    playerTwoData.playerSelector.setAttribute("flipped", "flipped");
  }
}

function checkPlayerSide(){
  if(player === playerOneData){
    player2 = playerTwoData;
  }
else{
    player2 = playerOneData;
  }
}

getPosInterval = setInterval(function(){
  getPosition(playerOneData);
  getPosition(playerTwoData);
  playerPositionFix();
});

//////////////////////////////////////////////////

/// sounds

function insertAudio(trackname){
  var audioSection = document.getElementById("audio-section");
  var audioRun = "<audio id=" + trackname + " src='audio/" + trackname + ".mp3' type='audio/mp3'></audio>";
  audioRun.loop = false;
  audioSection.innerHTML = audioSection.innerHTML + audioRun;
}

function playAudio(trackname, loop){
  document.getElementById(trackname).play();
  if(loop){
    document.getElementById(trackname).setAttribute("loop", "");
  }
}

function stopAudio(trackname){
  document.getElementById(trackname).pause();
  document.getElementById(trackname).currentTime = 0;
}

//////////////////////////////////////////////////

document.addEventListener("keydown", funcKeyDown);
document.addEventListener("keyup", funcKeyUp);

