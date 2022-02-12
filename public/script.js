import Ball from "./Ball.js"
import Paddle from "./paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
let playerscore = 0
let computerscore = 0

let lastTime


  function update(time) {
    if (lastTime != null) {
      const delta = time - lastTime
      ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
      computerPaddle.update(delta, ball.y)
      const hue = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--hue")
      )

      // gère la couleur de fond et la vitesse de change

      document.documentElement.style.setProperty("--hue", hue + delta * 0.01)
  
      if (isLose()) handleLose()
    }
  
    // le requestAnimationFrame s'occupe de la fréquence de rafraichissement de l'animation

    lastTime = time
    window.requestAnimationFrame(update)
  }
  
  function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
  }
  
  // cette fonction bloque le score a 5 maximum ainsi si vous gagnez vous serrez rediriger sur gagner et si vous perdez sur perdu
  // et elle rajoute un point a chaque fois que la balle est réinitialiser 

  function handleLose() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) {
      playerscore++
      playerScoreElem.textContent = playerscore
      if(playerscore == 5){
        window.location.href = "gagner.html"
      }
    } else {
      computerscore++
      computerScoreElem.textContent = computerscore
      if(computerscore == 5){
        window.location.href = "perdu.html"
      }
    }
    ball.reset()
    computerPaddle.reset()
  }
  
  // perlet a la barre joueur de sivre le mouvement de la souris de haut en bas 

  document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
  })
  
  window.requestAnimationFrame(update)
