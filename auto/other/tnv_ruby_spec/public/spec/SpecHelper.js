beforeEach(function() {
  this.addMatchers({
    toBePlaying: function(expectedSong) {
      var player = this.actual;
      return player.currentlyPlayingSong === expectedSong && 
             player.isPlaying;
    }

    fileTransferedToDevice: function(result) {
    	var str = result;
		var n = str.indexOf("ok");
		alert(n); 
    }
  });
});
