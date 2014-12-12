(function ($) {
  'use strict';

  // Declare the variables for this example.
  var colorThief, color, currentImg, currentColoredByImg;

  // Get the rgb color of the an image.
  $.fn.getColorRgb = function () {
    return 'rgb(' + colorThief.getColor(this[0]).join(',')  + ')';
  };

  // Get the first matched element that is visible on the viewport.
  $.fn.visible = function () {
    var currentVisible = null;

    this.each(function () {
      var rect = this.getBoundingClientRect(),
          isVisible = false;

      isVisible = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );

      if (isVisible) currentVisible = this;

    });

    return currentVisible || null;
  };

  $(document).on('ready', function () {
    // Initialize color thief.
    colorThief = new ColorThief();
  });

  $(document).on('scroll', function () {
    // Get the current visible image.
    currentImg = $('img').visible();

    // Check if there is an img visible and if it's not the same that we're using.
    if (currentImg !== null && currentImg !== currentColoredByImg) {
      // Paint the body with the current img domain color.
      $('body').css('background-color', $(currentImg).getColorRgb());

      // Remember the current img to avoid re calculations.
      currentColoredByImg = currentImg;
    }
  });

}(jQuery));
