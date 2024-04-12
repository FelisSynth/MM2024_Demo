// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
var _TextAliveApp = TextAliveApp,
  Player = _TextAliveApp.Player;
var phraseEl = document.querySelector("#contents");
var p, c;
var countPhrase = 0,
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
    rows = Math.max(minRows, Math.round(targetRows * (screenWidth / screenHeight)));
  }

  // Return the grid size
  return {
    columns: columns,
    rows: rows
  };
}

// Function to generate the grid with dynamic number of columns and rows
function generateGrid() {
  var gridSize = calculateGridSize();
  var gridContainer = document.getElementById("grid-container");
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = "repeat(".concat(gridSize.columns, ", 1fr)");
  gridContainer.style.gridTemplateRows = "repeat(".concat(gridSize.rows, ", 1fr)");
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
var animateWord = function animateWord(now, unit) {
  if (unit.contains(now)) {
    document.querySelector("#text").textContent = unit.text;
  }
};

// TextAlive Player を作る
var player = new Player({
  app: {
    token: "TzeB2jjekneT3Vpj"
  },
  appAuthor: "Synthesis",
  appName: "index.js",
  mediaElement: document.querySelector("#media")
}); //where the media info will be placed });

player.addListener({
  onAppReady: function onAppReady(app) {
    if (!app.managed) {
      player.createFromSongUrl("https://www.youtube.com/watch?v=xOKplMgHxxA", {
        video: {
          // 音楽地図訂正履歴: https://songle.jp/songs/1688650/history
          beatId: 4351165,
          chordId: 10704,
          repetitiveSegmentId: 2780814,
          // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/www.youtube.com%2Fwatch%3Fv=a-Nf3QUFkOU
          lyricId: 56749,
          lyricDiffId: 13198
        }
      });
    }
  },
  onPause: function onPause() {
    //method to pause
    isPaused = true;
  },
  onTimeUpdate: function onTimeUpdate(position) {
    var currentPhrase = p || player.video.firstPhrase;
    var currentChar = c || player.video.firstChar;
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
  onTimerReady: function onTimerReady() {}
});
$("#play").click(function () {
  //play button
  if (player) {
    if (player.isPlaying) {
      player.requestPause();
      $("#play").html("PLAY");
      "";
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
  var contents = '<div id="phrase' + (countPhrase + 1) + '">';
  contents += "</div></br>";
  $("#contents").append(contents);
}
function placeChar() {
  var appendID = "#phrase" + countPhrase;
  $(appendID).append(c.text);
  // console.log(c.text);
  // $("#phrase" + countPhrase + "ok").append(c);
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60790" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map