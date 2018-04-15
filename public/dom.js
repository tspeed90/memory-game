var tiles = document.querySelectorAll('.tile');
var startBtn = document.getElementById('start-btn');
var dialogBackground = document.querySelector('.dialog-bg');
var startDialog = document.getElementById('start-dialog');
var endDialog = document.getElementById('end-dialog');
var replayBtn = document.getElementById('replay-btn');

//XHR Request to receive data from backend
var xhr = new XMLHttpRequest();
var makeRequest = function (url, callback, errorCallback) {
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        errorCallback();
      }
    }
  }
  xhr.open('GET', url, true);
  xhr.send();
}

makeRequest('/api/', handleResponse, handleError);

//callback function to double up URLs from response
function handleResponse(images) {
  var imagesCopy = images.slice(0);
  images = images.concat(imagesCopy);
  displayImages(images);
}

// error callback
function handleError() {
  console.log("error");
}

//function to display images on tiles
function displayImages(images) {
  while (tiles.firstChild) {
    tiles.removeChild(firstChild);
  }
  tiles.forEach(function (tile) {
    var img = document.createElement('img');
    tile.appendChild(img);
    var randomIndex = Math.floor(Math.random() * images.length);
    img.src = images[randomIndex];
    images.splice(randomIndex, 1);
  })
}

//on tile click - update data attribute, compare URLs
var clicked = [];
function updateState() {
  if (this.dataset.matched !== 'true') {
    if (clicked.length === 2) {
      clicked = [];
      clicked.push(this);
      this.setAttribute('data-clicked', 'true');
    } else if (clicked.length === 0) {
      clicked.push(this);
      this.setAttribute('data-clicked', 'true');
    } else if (clicked.length === 1) {
      this.setAttribute('data-clicked', 'true');
      clicked.push(this);
      if (clicked[0].firstChild.src === clicked[1].firstChild.src && clicked[0] !== clicked[1]) {
        clicked[0].removeAttribute('data-clicked');
        clicked[0].setAttribute('data-matched', 'true');
        clicked[1].removeAttribute('data-clicked');
        clicked[1].setAttribute('data-matched', 'true');
      } else {
        setTimeout(function () {
          clicked[0].removeAttribute('data-clicked');
          clicked[1].removeAttribute('data-clicked');
        }, 1000);
      }
    }
  }
  checkForWin();

}
function isMatched(tile) {
  return tile.dataset.matched === 'true';
}

function checkForWin() {
  var allTiles = Array.from(tiles);
  if (allTiles.every(isMatched)) {
    setTimeout(function () {
      dialogBackground.style.display = 'block';
      endDialog.style.display = 'block';
    }, 1000);
  }
}

//event listener for clicks on tiles
tiles.forEach(function (tile) {
  tile.addEventListener('click', updateState);
});

startBtn.addEventListener('click', function (e) {
  dialogBackground.style.display = 'none';
  startDialog.removeAttribute('open');
});

replayBtn.addEventListener('click', function(e) {
  makeRequest('/api/', function(images) {
    handleResponse(images);
    dialogBackground.style.display = 'none';
    endDialog.style.display = 'none';
  }, handleError);
  tiles.forEach(function(tile) {
    tile.dataset.matched = 'false';
  })
});


