$(document).ready(function() {



  //      ---------------
  //      ---FUNCTIONS---
  //      ---------------
  // 1 // Verifie ce que contient gamestate et appel displayScreen
  function init() {
    //si il n'y a rien dans le gameState du localStorage
    if(localStorage.getItem("gameState") == null) {
      //on attribue a la clef gameState la valeur de optionScreen
      localStorage.setItem("gameState", "optionScreen");
      //on appelle la function displayScreen
      //avec gameState (=> optionState) en argument
      displayScreen(localStorage.getItem("gameState"));
    } else {
      if (localStorage.getItem("gameState") == "playScreen") {
        generateGame();
      }
      //on appelle la function displayScreen
      //avec gameState en argument
      displayScreen(localStorage.getItem("gameState"));
    }
  }
  // 2 //
  function generateGame() {
    //On transforme la chaine de caractere du localstorage en objet JSON
    var baseX = JSON.parse(localStorage.getItem("gameAxes")).x;
    var baseY = JSON.parse(localStorage.getItem("gameAxes")).y;
    //on attribue la section playScreen du html a une variable du meme nom
    var playScreen = $("section[data-state='playScreen']");
    //la variable html contiendras des balises html (div)
    var html = "<div style='width:" + baseX * 40 + "px' class='gameContainer'>";
    for (var y = 1; y <= baseY; y++) {
      for (var x = 1; x <= baseX; x++) {
        html += "<div data-x='" + x + "' data-y='" + y + "' class='gameDiv'></div>";
      };
    };
    $(playScreen).html(html);
    insertObjects();
  }
  // 3
  function insertObjects() {
    //si la position du player n'est pas configurée
    if (localStorage.getItem("playerPos") == null) {
      var pos = {
        "x": 1,
        "y": 1
      };
      localStorage.setItem("playerPos", JSON.stringify(pos));
    };
    //si la position de l'objectif n'est pas configurée
    if (localStorage.getItem("goalPos") == null) {
      var pos = {
        "x": JSON.parse(localStorage.getItem("gameAxes")).x,
        "y": JSON.parse(localStorage.getItem("gameAxes")).y
      }
      localStorage.setItem("goalPos", JSON.stringify(pos));
    };
    var playerPos = JSON.parse(localStorage.getItem("playerPos"));
    var goalPos = JSON.parse(localStorage.getItem("goalPos"));
    $(".gameDiv[data-x='" + playerPos.x + "'][data-y='" + playerPos.y + "']").html("<img style='width: 100%; height: 100%' src='graphic/hero.png'>");
    $(".gameDiv[data-x='" + goalPos.x + "'][data-y='" + goalPos.y + "']").html("<img style='width: 100%; height: 100%' src='graphic/stairsdown4.png'>");
    $("body").on("keydown", function(e) {
      if        (e.keyCode == 38 /* Up*/) {
        movePlayer("Up")
      } else if (e.keyCode == 40 /* Down*/) {
        movePlayer("Down")
      } else if (e.keyCode == 37 /* Left*/) {
        movePlayer("Left")
      } else if (e.keyCode == 39 /* Right*/) {
        movePlayer("Right")
      }
    });
  };
  function movePlayer(direction) {
    var currentPlayerPos = JSON.parse(localStorage.getItem("playerPos"));
    var gameSize = JSON.parse(localStorage.getItem("gameAxes"));

    if (direction == "Up") {
      if((currentPlayerPos.y - 1) > 0) {
        //on enleve l'image de la div que le hero quitte
        $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
        currentPlayerPos.y -= 1;
        $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width: 100%; height: 100%' src='graphic/hero.png'>");
        checkVictory(currentPlayerPos);
        localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
      } else {
        console.log("Aïe !");
      }
    } else if (direction == "Down") {
      if((currentPlayerPos.y + 1) <= gameSize.y) {
        //on enleve l'image de la div que le hero quitte
        $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
        currentPlayerPos.y += 1;
        $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width: 100%; height: 100%' src='graphic/hero.png'>");
        checkVictory(currentPlayerPos);
        localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
      } else {
        console.log("Aïe !");
      }
    } else if (direction == "Left") {
      if((currentPlayerPos.x - 1) > 0) {
        //on enleve l'image de la div que le hero quitte
        $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
        currentPlayerPos.x -= 1;
        $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width: 100%; height: 100%' src='graphic/hero.png'>");
        checkVictory(currentPlayerPos);
        localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
      } else {
        console.log("Aïe !");
      }
    } else if (direction == "Right") {
      if((currentPlayerPos.x + 1) <= gameSize.x) {
        //on enleve l'image de la div que le hero quitte
        $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
        currentPlayerPos.x += 1;
        $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width: 100%; height: 100%' src='graphic/hero.png'>");
        checkVictory(currentPlayerPos);
        localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
      } else {
        console.log("Aïe !");
      }
    }
  }
  function checkVictory(currentPlayerPos) {
    if (currentPlayerPos.x == JSON.parse(localStorage.getItem("goalPos")).x && currentPlayerPos.y == JSON.parse(localStorage.getItem("goalPos")).y) {
      displayScreen("victory");
      localStorage.setItem("gameState", "victory");
    }
  }
  // Cache toutes les sections et affiche la section voulue
  //      (la section dont le data-state = le gameState actuel)
  function displayScreen(gameState) {
    $.each($('section[data-state!="' + gameState + '"]'), function(key, value) {
      //on cache ce qui n'est pas egal a gameState
      $("section[data-state!='" + gameState + "']").addClass("hidden");
      //on affiche ce qui est egal a gameState
      $("section[data-state='" + gameState + "']").removeClass("hidden");
    })
  }



  //      ---------------
  //      EVENT LISTENERS
  //      ---------------
  //Quand on clic sur le bouton "startGame"
  $("button[data-action='startGame']").on("click", function() {
    //On attribue les valeurs X et Y entrees par le joueur
    //a des variables
    var baseX = $("input[name='x']").val();
    var baseY = $("input[name='y']").val();
    //On vérifi que X et Y ont bien des valeurs
    if(baseX == "" || baseY == "") {
      //on signifie au joueur que les valeurs sont vides
      alert("Erreur de valeur X ou Y")
    } else {
      //on créé un array contenant X et Y
      var axes = {
        "x": baseX,
        "y": baseY,
      };
      // on transforme l'array en chaine de caractere
      //pour pouvoir les stocker en local
      localStorage.setItem("gameAxes", JSON.stringify(axes));
      //on attribue a la clef gameState la valeur de playScreen
      localStorage.setItem("gameState", "playScreen");
      //on genere le jeu
      generateGame();
      //on affiche l'ecran de jeu
      displayScreen(localStorage.getItem("gameState"));
    }
  });
  //Quand on clic sur le bouton "reset"
  $("button[data-action='reset']").on("click", function() {
    //on vide le local storage
    localStorage.clear();
    //on recharge le script         ? ? ?
    location.reload();
  });


  //      ---------------
  //      ----APPELS-----
  //      ---------------
  init();
});
