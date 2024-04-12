const { Player } = TextAliveApp;

const phraseEl = document.querySelector("#contents");
let p, c;
let countPhrase = 0,
  countChar = 0;

// Function to calculate the number of grid columns and rows based on screen size and orientation
function calculateGridSize() {
  // Get the screen width and height
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;

  // Calculate the aspect ratio of the screen
  var aspectRatio = screenWidth / screenHeight;

  // Define the minimum and maximum number of rows
  var minRows = 4; // Minimum number of rows
  var maxRows = 10; // Maximum number of rows

  // Calculate the number of columns based on the screen width
  var columns = Math.floor(screenWidth / 100); // Adjust the size of each square as needed

  // Calculate the number of rows based on the screen orientation
  var rows;
  if (aspectRatio < 1) {
    // Vertical (portrait) orientation
    rows = Math.min(maxRows, Math.floor(columns / aspectRatio));
  } else if (aspectRatio > 1) {
    // Horizontal (landscape) orientation
    rows = minRows;
  } else {
    // Square screen
    var targetRows = Math.min(maxRows, Math.floor(columns / aspectRatio));
    rows = Math.max(
      minRows,
      Math.round(targetRows * (screenWidth / screenHeight))
    );
  }

  // Return the grid size
  return { columns: columns, rows: rows };
}

// Function to generate the grid with dynamic number of columns and rows
function generateGrid() {
  var gridSize = calculateGridSize();

  var gridContainer = document.getElementById("grid-container");

  gridContainer.innerHTML = "";

  gridContainer.style.gridTemplateColumns = `repeat(${gridSize.columns}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize.rows}, 1fr)`;

  for (var row = 1; row <= gridSize.rows; row++) {
    for (var column = 1; column <= gridSize.columns; column++) {
      var square = document.createElement("div");
      square.classList.add("square");
      var squareId = "div" + row + column;
      square.id = squareId;
      gridContainer.appendChild(square);
    }
  }
}

// // Function to generate the grid
// function generateGrid() {
//   // Get the width and height of the viewport
//   var screenWidth = window.innerWidth;
//   var screenHeight = window.innerHeight;

//   // Calculate the number of rows and columns based on the screen size
//   var numColumns = Math.floor(screenWidth / 100); // Adjust the size of each square as needed
//   var numRows = Math.floor(screenHeight / 100); // Adjust the size of each square as needed

//   // Get the grid container
//   var gridContainer = document.getElementById("grid-container");

//   // Clear the grid container
//   gridContainer.innerHTML = "";

//   // Loop through rows and columns to create squares with unique IDs
//   for (var y = 1; y <= numRows; y++) {
//     for (var x = 1; x <= numColumns; x++) {
//       // Create a new div element
//       var square = document.createElement("div");

//       // Set the unique ID for the div
//       square.id = "div" + String.fromCharCode(96 + y) + x; // Convert y to a letter (a, b, c, ...) using ASCII code

//       //visualisation
//       square.textContent = "口";
//       // Add additional styling if needed
//       square.classList.add("square");

//       // Append the square to the grid container
//       gridContainer.appendChild(square);
//     }
//   }
// }

// Call the function to generate the grid when the page loads
window.onload = generateGrid;

// Call the function to regenerate the grid when the window is resized
window.onresize = generateGrid;

// 単語が発声されていたら #text に表示する
const animateWord = function (now, unit) {
  if (unit.contains(now)) {
    document.querySelector("#text").textContent = unit.text;
  }
};

// TextAlive Player を作る
const player = new Player({
  app: { token: "TzeB2jjekneT3Vpj" },
  appAuthor: "Synthesis",
  appName: "index.js",
  mediaElement: document.querySelector("#media"),
}); //where the media info will be placed });

player.addListener({
  onAppReady: (app) => {
    if (!app.managed) {
      player.createFromSongUrl("https://www.youtube.com/watch?v=xOKplMgHxxA", {
        video: {
          // 音楽地図訂正履歴: https://songle.jp/songs/1688650/history
          beatId: 4351165,
          chordId: 10704,
          repetitiveSegmentId: 2780814,
          // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/www.youtube.com%2Fwatch%3Fv=a-Nf3QUFkOU
          lyricId: 56749,
          lyricDiffId: 13198,
        },
      });
    }
  },
  onPause: () => {
    //method to pause
    isPaused = true;
  },
  onTimeUpdate: (position) => {
    let currentPhrase = p || player.video.firstPhrase;
    let currentChar = c || player.video.firstChar;
    console.log("再生位置のアップデート:", position, "ミリ秒");
    // console.log(player.video.phrases);
    while (currentPhrase && currentPhrase.startTime < position + 400) {
      if (p !== currentPhrase) {
        p = currentPhrase;
        currentPhrase.animate = placePhraseDiv();
        countPhrase++;
      }
      currentPhrase = currentPhrase.next;
    }
    while (currentChar && currentChar.startTime < position + 200) {
      if (c !== currentChar) {
        c = currentChar;
        currentChar.animate = placeChar();
        console.log("Placed char" + currentChar + "-" + countChar + "-" + c);
        countChar++;
      }
      currentChar = currentChar.next;
    }
  },

  onTimerReady: () => {},
});

$("#play").click(() => {
  //play button
  if (player) {
    if (player.isPlaying) {
      player.requestPause();
      $("#play").html("PLAY");
      ``;
    } else {
      player.requestPlay();
      $("#play").html("PAUSE");
    }
  }
});

// $("#stop").click(() => {
//   //stop button
//   if (player) {
//     player.requestStop();
//   }
// });

function placePhraseDiv() {
  let contents = '<div id="phrase' + (countPhrase + 1) + '">';
  contents += "</div></br>";
  $("#contents").append(contents);
}
function placeChar() {
  const appendID = "#phrase" + countPhrase;
  $(appendID).append(c.text);
  // console.log(c.text);
  // $("#phrase" + countPhrase + "ok").append(c);
}
