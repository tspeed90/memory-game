var tiles = document.querySelectorAll('.tile');
var startBtn = document.querySelector('.start-btn');
var dialogBackground = document.getElementById('dialog-bg');
var startDialog = document.getElementById('start-dialog');
var endDialog = document.getElementById('end-dialog');
let replayBtn = document.getElementById('replay-btn');

//XHR Request to receive data from backend
var makeRequest = function(url: string, callback, errorCallback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data: string[] = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        errorCallback();
      }
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
};

makeRequest('/api/', handleResponse, handleError);

//function to display images on tiles
function displayImages(images: string[]) {
  tiles.forEach(function(tile: HTMLElement) {
    while (tile.firstChild) {
      tile.removeChild(tile.firstChild);
    }
  });
  tiles.forEach(function(tile: HTMLElement) {
    var img: HTMLImageElement = document.createElement('img');
    tile.appendChild(img);
    var randomIndex: number = Math.floor(Math.random() * images.length);
    img.src = images[randomIndex];
    images.splice(randomIndex, 1);
  });
}

//callback function to double up URLs from response
function handleResponse(images): void {
  var imagesCopy: string[] = images.slice(0);
  images = images.concat(imagesCopy);
  displayImages(images);
  startBtn.removeAttribute('disabled');
  startBtn.classList.remove('disabled');
}

// error callback
function handleError(): void {
  console.log('error');
}

//on tile click - update data attribute, compare URLs
var clicked: HTMLDivElement[] = [];
var firstImg = clicked[0].firstChild as HTMLImageElement;
var secondImg = clicked[1].firstChild as HTMLImageElement;
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
      if (firstImg.src === secondImg.src && clicked[0] !== clicked[1]) {
        clicked[0].removeAttribute('data-clicked');
        clicked[0].setAttribute('data-matched', 'true');
        clicked[1].removeAttribute('data-clicked');
        clicked[1].setAttribute('data-matched', 'true');
      } else {
        setTimeout(function(): void {
          clicked[0].removeAttribute('data-clicked');
          clicked[1].removeAttribute('data-clicked');
        }, 1000);
      }
    }
  }
  checkForWin();
}
function isMatched(tile): boolean {
  return tile.dataset.matched === 'true';
}

function checkForWin(): void {
  var allTiles: HTMLElement[] = Array.prototype.slice.call(tiles);
  if (allTiles.every(isMatched)) {
    setTimeout(function(): void {
      endDialog.style.display = 'block';
    }, 1000);
  }
}

//event listener for clicks on tiles
tiles.forEach(function(tile: HTMLElement) {
  tile.addEventListener('click', updateState);
});

startBtn.addEventListener('click', function(e) {
  dialogBackground.style.display = 'none';
  startDialog.removeAttribute('open');
});

replayBtn.addEventListener('click', function(e) {
  makeRequest('/api/', handleResponse, handleError);
  dialogBackground.style.display = 'none';
  endDialog.style.display = 'none';
  tiles.forEach(function(tile: HTMLElement) {
    tile.dataset.matched = 'false';
  });
});
