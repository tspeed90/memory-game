//shouldn't be global?
var tiles =  document.querySelectorAll('.tile');
var clicked = [];

//XHR Request to receive data from backend
var xhr = new XMLHttpRequest();

var makeRequest = function(url, callback, errorCallback) {
  xhr.onreadystatechange = function() {
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

makeRequest('/api/',handleResponse, handleError);


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
  tiles.forEach(function(tile) {
    var img = document.createElement('img');
    tile.appendChild(img);
    var tileBackground = document.createElement('div');
    tileBackground.classList.add('tile-bg');
    tile.appendChild(tileBackground);
    var randomIndex = Math.floor(Math.random() * images.length);
    img.src = images[randomIndex];
    images.splice(randomIndex, 1);
  })

}


//on tile click - update data attribute, compare URLs
function updateState(tile) {
  if (this.dataset.matched !== 'true') {
    if (clicked.length === 0) {
      clicked.push("" + this.firstChild.src);
      this.setAttribute('data-clicked', 'true')
    } else if (clicked.length === 1) {
      clicked.push("" + this.firstChild.src);
      if (clicked[0] === clicked[1]) {
        this.setAttribute('data-matched', 'true');
        tiles.forEach(function(tile) {
          if (tile.dataset.clicked === 'true') {
            tile.setAttribute('data-matched', 'true');
            tile.removeAttribute('data-clicked');
          }
        })
      }
    }
  } else {
    clicked = [];
  }
}


//event listener for clicks on tiles
tiles.forEach(function(tile) {
  tile.addEventListener('click', updateState);
});