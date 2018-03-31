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
  // displayImages(images);
}



// error callback
function handleError() {
  console.log("error");
}

//function to display images on tiles
function displayImages(images) {

}

//event listener for clicks on tiles