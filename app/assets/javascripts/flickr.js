$(document).ready(function () {
	var index;
	var photos;
	var timer;
  var page = 1;

  var search_flickr = function () {
    var search = $('#search').val();
    

    // "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
    // http://farm4.static.flickr.com/3729/9303278039_e0a7479796_m.jpg

    var results = function (data) {
      //_.each(data.photos.photo, display_photo);
      var delay = parseInt($('#delay').val());
      delay = delay * 1000; //convert seconds to milliseconds
      index = 0;
      photos = data.photos.photo;

      if (photos.length > 0) { //from joel's model on solving issue when photos are eventually exhuasted
        timer = setInterval(display_photo, delay);
      };
    };


    var display_photo = function () {
    	var photo = photos[index++];
      var width = $('#width').val();
      var height = $('#height').val();

      if (! photo) {
        clearInterval(timer);
        page++;
        //search_flickr(); //could have added search to run again as shown in joel's model.
        return;
      }

     // if (!photo); //my attempt at trying to specifiy condition when photo is invalid or absent
      //page++;    // from joel's advice to 'update' the page variable after making page a global
      // timer = clearInterval; // my failed attempt to clear the timer to get rid of the error message

     
     

      var url = "url(http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_m.jpg)";
      var $image = $('<div>').addClass('image');
      $image.css({
        'background-image': url,
        'width': width,
        'height': height
      });

      $('#images').prepend($image);
      $image.hide().fadeIn();

    };

    $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b90a193a6f20beb29a9a52cadb7c91e1&text=' + search + '&per_page=5&page=' + page + '&format=json&jsoncallback=?', results);
    
    var stopfotos = function (data) {

      
      var delay = parseInt($('#delay').val());
      delay = delay * 1000; //convert seconds to milliseconds
      index = 0;
      photos = data.photos.photo;

      timer = setInterval(display_photo, delay);
    };
  };

  $('#flickr').click(search_flickr);

  var clear_photos = function () {
    $('#images').empty();
  };
  $('#clear').click(clear_photos);


var search_flickr2 = function () {
    var search = $('#search').val();
   

    // "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
    // http://farm4.static.flickr.com/3729/9303278039_e0a7479796_m.jpg

    var results = function (data) {
      //_.each(data.photos.photo, display_photo);
      var delay = parseInt($('#delay').val());
      delay = delay * 1000; //convert seconds to milliseconds
      index = 0;
      photos = data.photos.photo;

      timer = setInterval(display_photo, delay);
    };

    var display_photo = function () {
      var photo = photos[index++];
      var width = $('#width').val();
      var height = $('#height').val();

      if (! photo) {
        clearInterval(timer);
        page++;
        return;
      }

      var url = "url(http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_m.jpg)";
      var $image = $('<div>').addClass('image');
      $image.css({
        'background-image': url,
        'width': width,
        'height': height
      });

      $('#images').prepend($image);
      $image.hide().fadeIn();
    };

    $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b90a193a6f20beb29a9a52cadb7c91e1&text=' + search + '&per_page=5&page=' + page + '&format=json&jsoncallback=?', results);
    
  };
    
$('#flickr2').click(search_flickr2);

// var load_new = function () {
//   for _.each $('#images') > 500;
//     search_flickr(page) = 1++;

// }



});