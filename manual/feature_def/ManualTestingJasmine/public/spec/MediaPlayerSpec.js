var callbackCalled;
var ringtone_names = "";
var global_ringtones = "";

function getkeys (obj) {
  var allkeys = [];

  for (var key in obj)
  {
    if(obj.hasOwnProperty(key))
    {
        allkeys.push(key);
    }
  }

  return allkeys;
}

function ringtoneCallback(arguments)
{
  var ringtones = arguments;
  global_ringtones = arguments;
  var htmlout = '<select name="choose a ringtone" size="1" id="item1">';
  var keys = getkeys(ringtones);
  ringtone_names = keys;
  for (var i = 0; i < keys.length; i++)
  {
    htmlout += '<option>';
    htmlout += keys[i];
    htmlout += '</option>'
  }
  htmlout += '</select>';
  document.getElementById('ringtones').innerHTML = htmlout;
  callbackCalled = true;
}

function ringtonePlayed()
{
	callbackCalled = true;
}

function audioFilePlayed()
{
	callbackCalled = true;	
}

function videoFilePlayed()
{
	callbackCalled = true;
}

describe("MediaPlayer", function() {
	beforeEach(function() {
		/* ... Set up your object ... */
	});

	afterEach(function() {
		/* ... Tear it down ... */
	});

	describe("Media Player", function() {
		beforeEach(function() {
			callbackCalled = false;
		});

		it("should be able to retrieve all ringtones", function() {
			runs(function()
			{
				Rho.Mediaplayer.getAllRingtones(ringtoneCallback);
			});

			waitsFor(function()
			{
				return callbackCalled;
			}, 'Ringtone Callback should have responded', 5000);

			runs(function()
			{
				var testPassed = confirm("Do you see a list of ringtones?");
				expect(testPassed).toEqual(true);
			});
		});

		it("should be able to play a ringtone", function() {
			runs(function()
			{
				var chosen = ringtone_names[Math.floor((Math.random()*ringtone_names.length))];
				//var chosen = document.getElementById('item1').value;

				Rho.Mediaplayer.playRingTone(global_ringtones[chosen]);
				ringtonePlayed();
			});

			waitsFor(function()
			{
				return callbackCalled;
			}, 'Ringtone should have been played.', 5000);

			runs(function()
			{
				var testPassed = confirm("Did you hear a ringtone?");
				expect(testPassed).toEqual(true);

				// Stop the ring tone from playing.
				Rho.Mediaplayer.stopRingTone();
			});
		});

		// This test relies on the device having an audio file
		it("should be able to play an audio file", function() {
			runs(function() {
				Rho.Mediaplayer.start("/mnt/sdcard/Kalimba.mp3");
				audioFilePlayed();
			});

			waitsFor(function()
			{
				return callbackCalled;
			}, 'Audio file should have played.', 5000);

			runs(function()
			{
				var testPassed = confirm("Did you hear a song being played?");
				expect(testPassed).toEqual(true);
				// Stop the audio file
				Rho.Mediaplayer.stop();
			});
		});

		it("should be able to play a video", function() {
			runs(function()
			{
				Rho.Mediaplayer.startvideo("/mnt/sdcard/s.mp4");
				videoFilePlayed();
			});

			waitsFor(function()
			{
				return callbackCalled;
			}, 'Video file should have played.', 5000);

			runs(function()
			{
				var testPassed = confirm("Did you see a video on the screen?");
				expect(testPassed).toEqual(true);
				// Stop the video player.
				Rho.Mediaplayer.stopvideo();
			});
		});
	});
});