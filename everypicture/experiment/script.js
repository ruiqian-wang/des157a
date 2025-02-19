function showImage(imageId) {
    var defaultImage = document.getElementById('defaultImage');
    if (defaultImage) {
      defaultImage.classList.remove('active');
    }
  
    var overlayImages = document.getElementsByClassName('overlay-image');
    for (var i = 0; i < overlayImages.length; i++) {
      overlayImages[i].classList.remove('active');
    }
  
    var chosenImage = document.getElementById(imageId);
    if (chosenImage) {
      chosenImage.classList.add('active');
    }
  }
  
  document.addEventListener('click', function(event) {
    if (event.target.tagName !== 'AREA') {
      showImage('defaultImage');
    }
  });