(function(){
    'use strict';
    console.log('reading JS');
  
    //  elements
    var gameArea = document.querySelector('#game-elements');
    var pile1 = document.querySelector('#pile1');
    var pile2 = document.querySelector('#pile2');
    var drawButton = document.querySelector('#draw-button');
    var passButton = document.querySelector('#pass-button');
    var directionArrow = document.querySelector('#direction-arrow');
    var player1Score = document.querySelector('.player1-score span');
    var player2Score = document.querySelector('.player2-score span');
  
    //  data object
    var gameData = {
      tiles: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
      players: ['Player 1', 'Player 2'],
      score: [0, 0],
      currentDraw: {
        tile1: 0,
        tile2: 0
      },
      index: 0, // current player (0 or 1)
      gameEnd: 30 // winning score
    };
  
    // initialize game
    function initGame() {
      gameData.index = Math.round(Math.random()); // randomly choose starting player
      gameData.score = [0, 0];
      updateScores();
      updateArrowDirection();
      resetTiles();
    }
  
    // reset tiles to back.png
    function resetTiles() {
      pile1.innerHTML = '<img src="images/back.png" alt="pile">';
      pile2.innerHTML = '<img src="images/back.png" alt="pile">';
    }
  
    // update scores display
    function updateScores() {
      player1Score.textContent = gameData.score[0];
      player2Score.textContent = gameData.score[1];
    }
  
    // update arrow direction based on current player
    function updateArrowDirection() {
      if (gameData.index === 0) {
        directionArrow.style.transform = 'translateX(-50%) rotate(0deg)';
      } else {
        directionArrow.style.transform = 'translateX(-50%) rotate(180deg)';
      }
    }
  
    function showSnakeEyesMessage() {
      var message = document.querySelector('#snake-eyes-message');
      var continueButton = document.querySelector('#continue-snake-eyes');
      
      drawButton.style.visibility = 'hidden';
      passButton.style.visibility = 'hidden';
      
      message.classList.remove('hidden');
      
      var newContinueButton = continueButton.cloneNode(true);
      continueButton.parentNode.replaceChild(newContinueButton, continueButton);
      
      newContinueButton.addEventListener('click', function() {
        message.classList.add('hidden');
        drawButton.style.visibility = 'visible';
        passButton.style.visibility = 'visible';
        gameData.score[gameData.index] = 0;
        updateScores();
        nextTurn();
      });
    }
  
    function showSingleOneMessage() {
      var message = document.querySelector('#single-one-message');
      var continueButton = document.querySelector('#continue-single');
      
      drawButton.style.visibility = 'hidden';
      passButton.style.visibility = 'hidden';
      
      message.classList.remove('hidden');
      
      var newContinueButton = continueButton.cloneNode(true);
      continueButton.parentNode.replaceChild(newContinueButton, continueButton);
      
      newContinueButton.addEventListener('click', function() {
        message.classList.add('hidden');
        drawButton.style.visibility = 'visible';
        passButton.style.visibility = 'visible';
        nextTurn();
      });
    }
  
    // draw tiles function
    function drawTiles() {
      // play sound
      var drawSound = document.getElementById('drawSound');
      drawSound.currentTime = 0;
      drawSound.play();
  
      // generate random numbers for both tiles
      gameData.currentDraw.tile1 = Math.floor(Math.random() * 6);
      gameData.currentDraw.tile2 = Math.floor(Math.random() * 6);
  
      pile1.innerHTML = '<img src="images/' + gameData.tiles[gameData.currentDraw.tile1] + '" alt="drawn tile">';
      pile2.innerHTML = '<img src="images/' + gameData.tiles[gameData.currentDraw.tile2] + '" alt="drawn tile">';
  
      // disable buttons after draw
      drawButton.disabled = true;
      passButton.disabled = true;
  
      // check for special conditions with slight delay to show tiles first
      setTimeout(function(){
        if (gameData.currentDraw.tile1 === 0 && gameData.currentDraw.tile2 === 0) {
          // snake eyes (double ones)
          showSnakeEyesMessage();
        } else if (gameData.currentDraw.tile1 === 0 || gameData.currentDraw.tile2 === 0) {
          // single one
          showSingleOneMessage();
        } else {
          // normal roll - add points and let player decide
          var drawScore = (gameData.currentDraw.tile1 + 1) + (gameData.currentDraw.tile2 + 1);
          gameData.score[gameData.index] += drawScore;
          updateScores();
          
          // enable both buttons for player decision
          drawButton.disabled = false;
          passButton.disabled = false;
  
          if (gameData.score[gameData.index] >= gameData.gameEnd) {
            endGame();
          }
        }
      }, 500);
    }
  
    // switch to next player
    function nextTurn() {
      gameData.index = (gameData.index === 0) ? 1 : 0;
      updateArrowDirection();
      resetTiles();
      drawButton.disabled = false;
      passButton.disabled = false;
    }
  
    // end game function
    function endGame() {
      var winner = (gameData.index === 0) ? 'Player 1' : 'Player 2';
      var winMessage = document.querySelector('#win-message');
      var winnerText = document.querySelector('.winner-text');
      var directionArrow = document.querySelector('#direction-arrow');
      var piles = document.querySelectorAll('.tile-pile');
      
      // hide game elements
      directionArrow.style.visibility = 'hidden';
      for (var i = 0; i < piles.length; i++) {
        piles[i].style.visibility = 'hidden';
      }
      drawButton.style.visibility = 'hidden';
      passButton.style.visibility = 'hidden';
      
      // update winner text
      winnerText.textContent = winner + ' won!';
      
      // show win message
      winMessage.classList.remove('hidden');
      
      // Play win sound
      var winSound = document.getElementById('winSound');
      winSound.currentTime = 0;
      winSound.play();
      
      document.querySelector('#new-round').addEventListener('click', function() {
        // hide win message
        winMessage.classList.add('hidden');
        
        directionArrow.style.visibility = 'visible';
        for (var i = 0; i < piles.length; i++) {
          piles[i].style.visibility = 'visible';
        }
        drawButton.style.visibility = 'visible';
        passButton.style.visibility = 'visible';
        
        initGame();
      });
    }
  
    drawButton.addEventListener('click', drawTiles);
    passButton.addEventListener('click', nextTurn);
  
    initGame();
  })();