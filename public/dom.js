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

// callback function to display images on tiles
function displayImages(images) {
 
}



// error callback
function handleError() {
  console.log("error");
}



//event listener for clicks on tiles