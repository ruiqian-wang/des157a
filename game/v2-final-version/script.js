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
    var player1ScoreBox = document.querySelector('.player1-score');
    var player2ScoreBox = document.querySelector('.player2-score');

    // audio
    var drawSound = document.getElementById('drawSound');
    var winSound = document.getElementById('winSound');
    var allAudioEls = [drawSound, winSound];

    // header controls
    var soundToggle = document.querySelector('#sound-toggle');
    var infoToggle = document.querySelector('#info-toggle');

    // rules modal
    var rulesModal = document.querySelector('#rules-modal');
    var rulesPanel = rulesModal ? rulesModal.querySelector('.modal__panel') : null;
    var rulesClose = document.querySelector('#rules-close');
    var rulesGotIt = document.querySelector('#rules-got-it');

    var SOUND_STORAGE_KEY = 'mdduel_sound';
    var isSoundOn = true;
    var lastFocusBeforeModal = null;
  
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

    function safePlay(audioEl) {
      if (!audioEl) return;
      if (!isSoundOn) return;
      // Some browsers block play() until user gesture; avoid uncaught promise rejections
      try {
        audioEl.currentTime = 0;
        var p = audioEl.play();
        if (p && typeof p.catch === 'function') {
          p.catch(function(){ /* ignore */ });
        }
      } catch (e) {
        // ignore
      }
    }

    function applySoundState() {
      for (var i = 0; i < allAudioEls.length; i++) {
        if (allAudioEls[i]) allAudioEls[i].muted = !isSoundOn;
      }

      if (soundToggle) {
        soundToggle.setAttribute('aria-pressed', isSoundOn ? 'true' : 'false');
        soundToggle.setAttribute('aria-label', isSoundOn ? 'Sound on' : 'Sound off');
      }
    }

    function loadSoundState() {
      try {
        var saved = localStorage.getItem(SOUND_STORAGE_KEY);
        if (saved === 'off') isSoundOn = false;
        if (saved === 'on') isSoundOn = true;
      } catch (e) {
        // ignore
      }
      applySoundState();
    }

    function setSoundState(next) {
      isSoundOn = !!next;
      try {
        localStorage.setItem(SOUND_STORAGE_KEY, isSoundOn ? 'on' : 'off');
      } catch (e) {
        // ignore
      }
      applySoundState();
    }

    function toggleSound() {
      setSoundState(!isSoundOn);
    }

    function isRulesOpen() {
      return rulesModal && !rulesModal.classList.contains('hidden');
    }

    function openRules() {
      if (!rulesModal) return;
      if (isRulesOpen()) return;
      lastFocusBeforeModal = document.activeElement;
      rulesModal.classList.remove('hidden');
      if (infoToggle) infoToggle.setAttribute('aria-expanded', 'true');

      // prevent accidental game input while modal open
      drawButton.disabled = true;
      passButton.disabled = true;

      if (rulesPanel && typeof rulesPanel.focus === 'function') {
        rulesPanel.focus();
      }
    }

    function closeRules() {
      if (!rulesModal) return;
      if (!isRulesOpen()) return;
      rulesModal.classList.add('hidden');
      if (infoToggle) infoToggle.setAttribute('aria-expanded', 'false');

      // restore game buttons (if they are visible)
      drawButton.disabled = false;
      passButton.disabled = false;

      if (lastFocusBeforeModal && typeof lastFocusBeforeModal.focus === 'function') {
        lastFocusBeforeModal.focus();
      } else if (infoToggle) {
        infoToggle.focus();
      }
      lastFocusBeforeModal = null;
    }

    function toggleRules() {
      if (isRulesOpen()) closeRules();
      else openRules();
    }
  
    // initialize game
    function initGame() {
      gameData.index = Math.round(Math.random()); // randomly choose starting player
      gameData.score = [0, 0];
      updateScores();
      updateArrowDirection();
      resetTiles();
      updateActivePlayerUI();
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

    function updateActivePlayerUI() {
      if (!player1ScoreBox || !player2ScoreBox) return;
      if (gameData.index === 0) {
        player1ScoreBox.classList.add('is-active');
        player2ScoreBox.classList.remove('is-active');
      } else {
        player2ScoreBox.classList.add('is-active');
        player1ScoreBox.classList.remove('is-active');
      }
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
      // play sound (respect mute)
      safePlay(drawSound);
  
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
      updateActivePlayerUI();
      resetTiles();
      drawButton.disabled = false;
      passButton.disabled = false;
    }
  
    function restartRound() {
      // hide overlays if open
      var winMessage = document.querySelector('#win-message');
      var snakeMessage = document.querySelector('#snake-eyes-message');
      var singleMessage = document.querySelector('#single-one-message');
      var piles = document.querySelectorAll('.tile-pile');

      if (winMessage) winMessage.classList.add('hidden');
      if (snakeMessage) snakeMessage.classList.add('hidden');
      if (singleMessage) singleMessage.classList.add('hidden');

      directionArrow.style.visibility = 'visible';
      for (var i = 0; i < piles.length; i++) {
        piles[i].style.visibility = 'visible';
      }
      drawButton.style.visibility = 'visible';
      passButton.style.visibility = 'visible';

      initGame();
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
      
      // Play win sound (respect mute)
      safePlay(winSound);
      
      // prevent multiple listeners if game ends multiple times
      var newRoundBtn = document.querySelector('#new-round');
      var freshBtn = newRoundBtn.cloneNode(true);
      newRoundBtn.parentNode.replaceChild(freshBtn, newRoundBtn);
      freshBtn.addEventListener('click', function() {
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
  
    // UI events
    if (soundToggle) soundToggle.addEventListener('click', toggleSound);
    if (infoToggle) infoToggle.addEventListener('click', toggleRules);

    if (rulesClose) rulesClose.addEventListener('click', closeRules);
    if (rulesGotIt) rulesGotIt.addEventListener('click', closeRules);

    if (rulesModal) {
      rulesModal.addEventListener('click', function(e) {
        if (e.target && e.target.getAttribute && e.target.getAttribute('data-close-modal') === 'true') {
          closeRules();
        }
      });
    }

    document.addEventListener('keydown', function(e) {
      // Esc always closes rules
      if (e.key === 'Escape') {
        if (isRulesOpen()) {
          e.preventDefault();
          closeRules();
        }
        return;
      }

      // when modal open, ignore shortcuts
      if (isRulesOpen()) return;

      // shortcuts
      var key = e.key;
      if (!key) return;
      var k = key.toLowerCase();

      if (k === 'm') {
        e.preventDefault();
        toggleSound();
      } else if (k === 'i') {
        e.preventDefault();
        openRules();
      } else if (k === 'd') {
        if (!drawButton.disabled && drawButton.style.visibility !== 'hidden') {
          e.preventDefault();
          drawTiles();
        }
      } else if (k === 'p') {
        if (!passButton.disabled && passButton.style.visibility !== 'hidden') {
          e.preventDefault();
          nextTurn();
        }
      } else if (k === 'r') {
        e.preventDefault();
        restartRound();
      }
    });

    drawButton.addEventListener('click', function() {
      if (isRulesOpen()) return;
      drawTiles();
    });
    passButton.addEventListener('click', function() {
      if (isRulesOpen()) return;
      nextTurn();
    });
  
    loadSoundState();
    initGame();
  })();