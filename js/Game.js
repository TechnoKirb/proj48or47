class Game {
  constructor() {
    this.playerMoving= false
    this.resetButton = createButton("")
  }
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }
  start() {
    player = new Player()
    playerCount = player.getCount()
    
    form = new Form()
    form.display()

    bb = createSprite(width/2,height-200)
    bb.addImage('blue_bird.jpg',p2_img)
    bb.scale = 0.15

    boi = createSprite(width/2 - 100, height-200)
    boi.addImage('boi.jpg',b1)
    boi.scale = 0.15

    a = createSprite(width/2-300,height/4)
    a.addImage('a_person.jpg',p1_img)
    a.scale = 0.15

    brs = [bb,boi] 

    music = new Group()

    m1 = createSprite(width/9,height/2)
    m1.addImage('ms.png',b1p1)
    m1.scale = 0.5
    m1.velocityY = 5

    m3 = createSprite(3*width/9,height/2)
    m3.addImage('ms.png',b1p1)
    m3.scale = 0.5
    m3.velocityY = 5

    m5 = createSprite(5*width/9,height/2)
    m5.addImage('ms.png',b1p1)
    m5.scale = 0.5
    m5.velocityY = 5

    m7 = createSprite(7*width/9,height/2)
    m7.addImage('ms.png',b1p1)
    m7.scale = 0.5
    m7.velocityY = 5

  }
  handleElements() {
    form.hide();

/*    this.handleResetButton.position(width/2+230,100)
  */    }

  play() {
    this.handleElements()
    this.handleResetButton()
    Player.getPlayersInfo()
    if (m1.y > height){
      m1.velocityY = -5
    }
    if (m1.y < 0){
      m1.velocityY = 5
    }
    if (m3.y > height){
      m3.velocityY = -5
    }
    if (m3.y < 0){
      m3.velocityY = 5
    }
    if (m5.y > height){
      m5.velocityY = -5
    }
    if (m5.y < 0){
      m5.velocityY = 5
    }
    if (m7.y > height){
      m7.velocityY = -5
    }
    if (m7.y < 0){
      m7.velocityY = 5
    }
    if (allPlayers !== undefined) {
      var index = 0
      for (var plr in allPlayers){
        index=index+1

        var x = allPlayers[plr].positionX
        var y = allPlayers[plr].positionY

        brs[index-1].position.x = x
        brs[index-1].position.y = y
        if (index === player.index) {
          stroke(10)
          fill('green')
          ellipse(x,y,100,200)
        }
      }
      if (this.playerMoving) {
        player.positionY +=5
        player.update()
      }
      this.handlePlayerControls()
      drawSprites()
    }
  }
  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }


  handlePlayerControls() {
    if (keyIsDown(LEFT_ARROW) && player.positionX > 50) {
      player.positionX -= 5;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.positionX < width - 100) {
      player.positionX += 5;
      player.update();
    }
  }

  gameOver() {
  }

  end() {
    console.log("Game Over");
  }
}
