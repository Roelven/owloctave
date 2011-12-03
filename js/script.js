/* Author: 
  Roel van der Ven
  Music Hack Day London 2011
*/

$.fn.ready(function() {

  // http://soundcloud.com/roelven/test-sound-mhd / 29639623

  // Declare main vars
  var doc = document,
      win = window;

  // Initialize SC object
  SC.initialize({
    client_id: '00952fa8399754a3a92a70c8b1157a5e'
  });

  // Are we ready to Stream?
  SC.whenStreamingReady(function(){
    $('body').addClass('iCanStream');
  });

  // Teh player
  function owlPlay(url, owlDiv) {
    function resetowlDiv() {
      if(window.soundDiv == owlDiv) {
        window.soundDiv = null;
      };
      owlDiv
        .removeClass("playing")
        .addClass("stopped");
    };

    owlDiv
      .removeClass("stopped")
      .removeClass("buffering")
      .addClass("playing");

    window.sound = soundManager.createSound({
      id: 'sound',
      url: url,
      autoPlay: true,
      onfinish: resetSampleDiv,
      onstop:   resetSampleDiv
    });
  }


});