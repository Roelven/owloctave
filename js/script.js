/* Author: 
  Roel van der Ven
  Music Hack Day London 2011
*/

$.fn.ready(function() {

  // Declare main vars
  var doc = document,
      win = window,
      clientid = '00952fa8399754a3a92a70c8b1157a5e';

  // Teh player callbacks
  var owls = {
    callbacks: {
      play: function(owl) {
        $('#owl-' + owl.id)
          .removeClass('stopped')
          .removeClass('buffering')
          .addClass('playing');
      },
      pause: function(owl) {
        $('#owl-' + owl.id)
          .removeClass('playing')
          .removeClass('buffering')
          .addClass('stopped');
      }
    },
    render: function(owl) {
      return '<a id="owl-' + owl.id + '" class="owl stopped" href="#"></a>';
    },
    data: {}
  };
  
  $('.owl').live('click', function() {
    var owl = owls.data[+this.id.split('-')[1]];
    owl.audio.play();
  });

  $.getJSON('http://api.soundcloud.com/playlists/1362578.json?client_id=' + clientid, function(owlsData) {
    var html = owlsData.tracks.map(function(owl) {
      var audio = new Audio();
      audio.addEventListener('play', owls.callbacks.play.bind(null, owl), false);
      audio.addEventListener('pause', owls.callbacks.pause.bind(null, owl), false);
      audio.addEventListener('ended', owls.callbacks.pause.bind(null, owl), false);
      audio.src = owl.stream_url + '?client_id=' + clientid;
      owl.audio = audio;
      owls.data[owl.id] = owl;
      return owls.render(owl);
    }).join('');
    $('.keys').html(html);
  });
});