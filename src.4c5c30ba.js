parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
var e,t,n=TextAliveApp,a=n.Player,o=document.querySelector("#contents"),r=0,i=0;function d(){var e,t=window.innerWidth,n=window.innerHeight,a=t/n,o=Math.floor(t/100);if(a<1)e=Math.min(10,Math.floor(o/a));else if(a>1)e=4;else{var r=Math.min(10,Math.floor(o/a));e=Math.max(4,Math.round(r*(t/n)))}return{columns:o,rows:e}}function c(){var e=d(),t=document.getElementById("grid-container");t.innerHTML="",t.style.gridTemplateColumns="repeat(".concat(e.columns,", 1fr)"),t.style.gridTemplateRows="repeat(".concat(e.rows,", 1fr)");for(var n=1;n<=e.rows;n++)for(var a=1;a<=e.columns;a++){var o=document.createElement("div");o.classList.add("square");var r="div"+n+a;o.id=r,t.appendChild(o)}}window.onload=c,window.onresize=c;var l=function(e,t){t.contains(e)&&(document.querySelector("#text").textContent=t.text)},s=new a({app:{token:"TzeB2jjekneT3Vpj"},appAuthor:"Synthesis",appName:"index.js",mediaElement:document.querySelector("#media")});function u(){var e='<div id="phrase'+(r+1)+'">';e+="</div></br>",$("#contents").append(e)}function m(){$("#phrase"+r).append(t.text)}s.addListener({onAppReady:function(e){e.managed||s.createFromSongUrl("https://www.youtube.com/watch?v=xOKplMgHxxA",{video:{beatId:4351165,chordId:10704,repetitiveSegmentId:2780814,lyricId:56749,lyricDiffId:13198}})},onPause:function(){isPaused=!0},onTimeUpdate:function(n){var a=e||s.video.firstPhrase,o=t||s.video.firstChar;for(console.log("再生位置のアップデート:",n,"ミリ秒");a&&a.startTime<n+400;)e!==a&&(e=a,a.animate=u(),r++),a=a.next;for(;o&&o.startTime<n+200;)t!==o&&(t=o,o.animate=m(),console.log("Placed char"+o+"-"+i+"-"+t),i++),o=o.next},onTimerReady:function(){}}),$("#play").click(function(){s&&(s.isPlaying?(s.requestPause(),$("#play").html("PLAY")):(s.requestPlay(),$("#play").html("PAUSE")))});
},{}]},{},["Focm"], null)
//# sourceMappingURL=/src.4c5c30ba.js.map