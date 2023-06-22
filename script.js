// Axel Cotón Gutiérrez Copyright 2023

document.addEventListener('DOMContentLoaded', function() {
  const numbers = document.querySelectorAll('.number');
  const startButton = document.getElementById('start-button');
  const questionElement = document.getElementById('question');
  const resultElement = document.getElementById('result');
  const playAgainButton = document.getElementById('play-again-button');

  let randomNumber;
  let previousRandomNumber;
  let score = 0;
  let questionsCount = 0;
  let isGameRunning = false;
  let isGameStarted = false;

  function resetGame() {
    numbers.forEach(number => {
      number.classList.remove('selected');
    });
    resultElement.innerHTML = '';
    score = 0;
    questionsCount = 0;
    isGameRunning = false;
    playAgainButton.style.display = 'none';
  }

  function getRandomNumber() {
    let newRandomNumber = Math.floor(Math.random() * 5) + 1;
    while (newRandomNumber === previousRandomNumber) {
      newRandomNumber = Math.floor(Math.random() * 5) + 1;
    }
    previousRandomNumber = newRandomNumber;
    return newRandomNumber;
  }

  function handleClick() {
    if (!isGameRunning) {
      return;
    }

    const selectedNumber = parseInt(this.textContent);

    if (selectedNumber === randomNumber) {
      this.classList.add('selected');
      resultElement.innerHTML = `
        <div class="message-container">
          <span class="msj correcto">¡Correcto!</span>
        </div>
      `;
      score++;
    } else {
      this.classList.add('selected');
      resultElement.innerHTML = `
        <div class="message-container">
          <span class="msj incorrecto">Incorrecto</span>
        </div>
      `;
    }

    questionsCount++;

    if (questionsCount === 5) {
      questionElement.textContent = `¡Juego completado! Preguntas acertadas: ${score} de ${questionsCount}.`;
      isGameRunning = false;
      playAgainButton.style.display = 'block';
    } else {
      setTimeout(() => {
        resultElement.innerHTML = '';
        generateQuestion();
      }, 1000);
    }
  }

  function handleStart() {
    if (!isGameStarted) {
      isGameStarted = true;
      startButton.style.display = 'none';
      isGameRunning = true;
      generateQuestion();
    }
  }

  function generateQuestion() {
    numbers.forEach(number => {
      number.classList.remove('selected');
    });
    randomNumber = getRandomNumber();
    questionElement.textContent = `¿En qué parte de la recta se encuentra el número ${randomNumber}?`;
  }

  function handlePlayAgain() {
    resetGame();
    isGameStarted = true;
    isGameRunning = true;
    generateQuestion();
  }

  numbers.forEach(number => {
    number.addEventListener('click', handleClick);
  });

  startButton.addEventListener('click', handleStart);
  playAgainButton.addEventListener('click', handlePlayAgain);

  // Mostrar el botón "Comenzar" al cargar la página
  resetGame();
  startButton.style.display = 'block';
});
