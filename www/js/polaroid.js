/*
* Author:      Marco Kuiper (http://www.marcofolio.net/)
*/
google.load("jquery", "1.3.1");
google.load("jqueryui", "1.7.0");
google.setOnLoadCallback(function()
{
	var t;
	
	// When everything has loaded, place all polaroids on a random position	
	$(".polaroid").each(function (i) {
		var tempVal = Math.round(Math.random());
		if(tempVal == 1) {
			var rotDegrees = randomXToY(330, 360); // rotate left
		} else {
			var rotDegrees = randomXToY(0, 30); // rotate right
		}
		
		// Internet Explorer doesn't have the "window.innerWidth" and "window.innerHeight" properties
		if(window.innerWidth == undefined) { 
			var wiw = 768;
			var wih = 1024;
		} else {
			var wiw = window.innerWidth;
			var wih = window.innerHeight;	
		}
		//console.log("wiw("+wiw+") wih("+wih+")");
		var cssObj = { 'left' : Math.random()*(wiw-400),
			'top' : Math.random()*(wih-400),
			'-webkit-transform' : 'rotate('+ rotDegrees +'deg)',  // safari only
			'transform' : 'rotate('+ rotDegrees +'deg)' }; // added in case CSS3 is standard
		$(this).css(cssObj);
	});
	
	// Set the Z-Index (used to display images on top while dragging)
	var zindexnr = 1;
	
	// boolean to check if the user is dragging
	var dragging = false;
	
	$(".youtube_iframe").click( function(e) {
		
		//console.log("click");
	});
	
	
	// Show the polaroid on top when clicked on
	//$(".polaroid").mouseup(function(e){
	$(".polaroid").dblclick(function(e){
		//console.log("polaroid");
		if(!dragging) {
			// Bring polaroid to the foreground
			zindexnr++;
			var cssObj = 
			{ 
			'z-index' : zindexnr,
			'transform' : 'rotate(0deg)',	 // added in case CSS3 is standard
			'-webkit-transform' : 'rotate(0deg)',
			//'width' : '560px',
			//'height' : '315px'
			};  // safari only
			$(this).css(cssObj);
			
			$(this).find("._img").hide();
			var youtube_id = $(this).find("._img").attr("alt");
			//console.log("youtube_id=>"+youtube_id);
			$(this).find("._iframe").attr("src", "http://www.youtube.com/embed/"+youtube_id).show();
			//$(this).append('<iframe width="335" height="250" style="margin:45px 0 0 15px;" src="http://www.youtube.com/embed/9Y15es8OY0U" frameborder="0" allowfullscreen></iframe>');
			
			
		}
	});
	
	
	// Make the polaroid draggable & display a shadow when dragging
	$(".polaroid").draggable({
		cursor: 'crosshair',
		start: function(event, ui) {
			
			//console.log("start");
			
			dragging = true;
			zindexnr++;

			var cssObj =
			{ 
				'box-shadow' : '#888 5px 10px 10px', // added in case CSS3 is standard
				'-webkit-box-shadow' : '#888 5px 10px 10px', // safari only
				'transform' : 'rotate(0deg)', // added in case CSS3 is standard
				'-webkit-transform' : 'rotate(0deg)', // safari only
				//'margin-left' : '-10px',
				//'margin-top' : '-10px',
				'z-index' : zindexnr 
			};
			$(this).css(cssObj);
			
			
			
			t = setTimeout( function() {
				//console.log("test 2");
                $(document).trigger("mouseup")
			}, 2500);
		},
		stop: function(event, ui) {
			
			//console.log("stop");
			clearTimeout(t);
			
			var tempVal = Math.round(Math.random());
			
			if(tempVal == 1) {
				var rotDegrees = randomXToY(330, 360); // rotate left
			} else {
				var rotDegrees = randomXToY(0, 30); // rotate right
			}
			
			var cssObj = 
				{ 
					'box-shadow' : '', // added in case CSS3 is standard
					'-webkit-box-shadow' : '', // safari only
					'transform' : 'rotate('+ rotDegrees +'deg)', // added in case CSS3 is standard
					'-webkit-transform' : 'rotate('+ rotDegrees +'deg)' // safari only
					//'margin-left' : '0px',
					//'margin-top' : '0px' 
				};
			$(this).css(cssObj);
			dragging = false;
		}
	});

	// Function to get random number upto m
	// http://roshanbh.com.np/2008/09/get-random-number-range-two-numbers-javascript.html
	function randomXToY(minVal,maxVal,floatVal) {
		var randVal = minVal+(Math.random()*(maxVal-minVal));
		return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
	}
	
});