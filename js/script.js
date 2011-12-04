/* Author: 
  Roel van der Ven
  Music Hack Day London 2011
*/

$.fn.ready(function() {

  // Declare main vars
  var doc = document,
      win = window,
      clientid = '00952fa8399754a3a92a70c8b1157a5e';

  // Initialize SC object
  SC.initialize({
    client_id: clientid
  });

  // Are we ready to Stream?
  SC.whenStreamingReady(function(){
    $('body').addClass('iCanStream');
    playerGetOwls();
  });

  // Teh player
  function owlPlay(url, owlDiv) {
    function resetOwlDiv() {
      if(win.soundDiv == owlDiv) {
        streamStopAll;
      };
      owlDiv
        .removeClass('playing')
        .addClass('stopped');
    };

    owlDiv
      .removeClass('stopped')
      .removeClass('buffering')
      .addClass('playing');

    win.sound = soundManager.createSound({
      id: 'sound',
      url: url,
      autoPlay: true,
      onfinish: resetOwlDiv,
      onstop:   resetOwlDiv
    });

    var soundObj = SC.stream(293);
     soundObj.play();
  }

  function owlStop() {
    if(win.sound != null) {
      streamStopAll;
    };
    // if another player played, reset that button
    if(win.owlDiv != null) {
      win.owlDiv
        .removeClass('playing')
        .removeClass('buffering')
        .addClass('stopped');
      win.owlDiv = null;
    };
  }

  function playerGetOwls() {
    $.getJSON('http://api.soundcloud.com/playlists/1362578.json?client_id=' + clientid, function(owls) {
      // console.log(owls.tracks);
      var owlsInRow = $.serializeArray(owls.tracks);
      console.log(owlsInRow);
      $.each(owlsInRow, function(index, value){
        // console.log(value);
      });
    });
  }


});