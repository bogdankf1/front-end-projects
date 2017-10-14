$(document).ready(function () {
  //FUNCTIONS

  function showMeeting() {
    setTimeout(function () {
      $("#meeting h1").fadeIn("slow");
    },1500);
    setTimeout(function () {
      $("#meeting").fadeOut("slow");
    }, 3000);
    //Call makeChoice() function
    makeChoice();
  }//end of showMeeting()

  function makeChoice() {
    setTimeout(function () {
      $("#choice").fadeIn("slow");
    },4500);
    $("#choice span:first-of-type").click(function () {
      $("#choice").fadeOut("slow");
      //Call startGame() function
      startGame("O");
    });
    $("#choice span:last-of-type").click(function () {
      $("#choice").fadeOut("slow");
      //Call startGame() function
      startGame("X");
    });
  }//end of makeChoice()

  function startGame(symbol) {
    $("#intro").hide();
    $(".game-field, .reset-btn").fadeIn("slow");
    makeUserMove(symbol);
    resetGame();
  }//end of startGame()

  function stopGame() {
    $(".col-xs-4").unbind("click");
    alert("WIN!");
  }
  //TODO: add two-players mode
  //TODO: make steps more animated(fadeIn/fadeOut)
  //TODO: make computer's moves more tactical

  function makeUserMove(symbol) {
    $(".header>h2").html("User's step!");
    var computerSymbol;
    computerSymbol = symbol === "O" ? "X" : "O";
    $(".col-xs-4").click(function () {
      if($(this).attr("selected")) {

      } else {
        $(this).html(symbol).attr("selected", "selected");
        var check = checkWinner(symbol, computerSymbol);
        if(!check) {
          makeComputerMove(symbol);
        }
      }

    });//end of click
  }//end of makeUserMove()

  function resetGame() {
    $(".reset-btn>span").click(function () {
      $(".col-xs-4").html("").removeAttr("selected");
      //makeChoice();
    });//end of click
  }//end of resetGame()

  function makeComputerMove(symbol) {
    $("#title").html("Computer's step!");
    var computerSymbol;
    computerSymbol = symbol === "O" ? "X" : "O";
    var arr = document.getElementsByClassName("col-xs-4");
    for (var i = 0; i < arr.length; i++) {
      var item = arr[Math.floor(Math.random() * arr.length)];
      if(!item.hasAttribute("selected")) {
        setTimeout(function () {
          $(item).html(computerSymbol);
          $(".header>h2").html("User's step!");
          checkWinner(symbol, computerSymbol);
        }, 1000);
        item.setAttribute("selected", "selected");

        break;
      }
    }
  }//end of makeComputerMove()

  function checkWinner(symbol, computerSymbol) {
    var arr = document.getElementsByClassName("col-xs-4");
    var items = [(arr[0].innerHTML + arr[1].innerHTML + arr[2].innerHTML),
                 (arr[3].innerHTML + arr[4].innerHTML + arr[5].innerHTML),
                 (arr[6].innerHTML + arr[7].innerHTML + arr[8].innerHTML),
                 (arr[0].innerHTML + arr[3].innerHTML + arr[6].innerHTML),
                 (arr[1].innerHTML + arr[4].innerHTML + arr[7].innerHTML),
                 (arr[2].innerHTML + arr[5].innerHTML + arr[8].innerHTML),
                 (arr[0].innerHTML + arr[4].innerHTML + arr[8].innerHTML),
                 (arr[2].innerHTML + arr[4].innerHTML + arr[6].innerHTML)];

    var userWin = symbol + symbol + symbol;
    var computerWin = computerSymbol + computerSymbol + computerSymbol;

    for (var i = 0; i < items.length; i++) {
      if(items[i] === userWin) {
        $("#title").html("User wins!");
        $(".col-xs-4").attr("selected", "selected");

        return true;
      } else if(items[i] === computerWin) {
        $("#title").html("Computer wins!");
        $(".col-xs-4").attr("selected", "selected");

        return true;
      }
    }
    return false;
  }//end of checkWinner()


  //START OF PROGRAM
  showMeeting();
});//end of ready
