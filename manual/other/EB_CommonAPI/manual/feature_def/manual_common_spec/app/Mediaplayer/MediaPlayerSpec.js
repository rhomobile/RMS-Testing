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
				EB.Mediaplayer.getAllRingtones(ringtoneCallback);
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

				EB.Mediaplayer.playRingTone(global_ringtones[chosen]);
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
				EB.Mediaplayer.stopRingTone();
			});
		});

		// This test relies on the device having an audio file
		it("should be able to play an audio file", function() {
			runs(function() {
				var platform = EB.System.platform;
				var audiolocation = "";

				if (platform == "WINDOWS")
				{
					audiolocation = "\\thermo.wav";
				}
				else if (platform == "ANDROID")
				{
					audiolocation = "/mnt/sdcard/test.mp3";
				}

				EB.Mediaplayer.start(audiolocation);
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

				if(testPassed == false)
				{
					document.getElementById("audioMsg").innerHTML = "<p>Do you have the audio file installed in the location /mnt/sdcard/test.mp3</p>";
				}

				// Stop the audio file
				EB.Mediaplayer.stop();
			});
		});

		it("should be able to play a video", function() {
			runs(function()
			{
				var platform = EB.System.platform;
				var videolocation = "";

				if (platform == "WINDOWS")
				{
					videolocation = "\\test.mp4";
				}
				else if (platform == "ANDROID")
				{
					videolocation = "/mnt/sdcard/test.mp4";
				}

				EB.Mediaplayer.startvideo(videolocation);
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

				if (testPassed == false)
				{
					document.getElementById("videoMsg").innerHTML = "<p>Do you have the video file installed in the location /mnt/sdcard/test.mp4</p>";	
				}
				// Stop the video player.
				EB.Mediaplayer.stopvideo();
			});
		});
	});
});