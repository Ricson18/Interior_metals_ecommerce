var mouseflowDisableDomDeduplicator = true; var mouseflowDisableDomReuse = true;

var Cookie = {
   set: function(name, value, days)
   {
      var domain, domainParts, date, expires, host;

      if (days)
      {
         date = new Date();
         date.setTime(date.getTime()+(days*24*60*60*1000));
         expires = "; expires="+date.toGMTString();
      }
      else
      {
         expires = "";
      }

      host = location.host;
      if (host.split('.').length === 1)
      {
         document.cookie = name+"="+value+expires+"; path=/";
      }
      else
      {
         domainParts = host.split('.');
         domainParts.shift();
         domain = '.'+domainParts.join('.');

         document.cookie = name+"="+value+expires+"; path=/; domain="+domain;

         if (Cookie.get(name) == null || Cookie.get(name) != value)
         {
            domain = '.'+host;
            document.cookie = name+"="+value+expires+"; path=/; domain="+domain;
         }
      }
   },

   get: function(name)
   {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i=0; i < ca.length; i++)
      {
         var c = ca[i];
         while (c.charAt(0)==' ')
         {
            c = c.substring(1,c.length);
         }

         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
   }
};

function shouldStartRecording(cookieValue, mfRecordingRate) { // cookieValue is either undefined, "0" or "1"
	if (!cookieValue) {
		cookieValue = getRandomNumber(100) % mfRecordingRate === 0 ? "1" : "0"
		Cookie.set('mf_record_user', cookieValue);
	}
	return cookieValue === "1";
}

function getRandomNumber(max) {
	return parseInt(Math.random() * max)
}

var mouseflowAutoStart = shouldStartRecording(Cookie.get('mf_record_user'), 6);if(typeof mouseflow==='undefined'&&typeof mouseflowPlayback==='undefined'){(function(_1){function _0(){return undefined}function _6(){return null}function _5(){return false}function _7(_2){if(_2&&_2.length){for(var _4=0;_4<_2.length;_4++){this.push(_2[_4])}}};_7.prototype.push=function(_3){if(_3&&typeof _3==='function'){_3(mouseflow)}};_1.setTimeout(function(){if(!_1._mfq)_1._mfq=[];_1._mfq=new _7(_mfq)},1);_1.mouseflow={config:_0,start:_0,stop:_0,newPageView:_0,stopSession:_0,rebindEventHandlers:_0,getSessionId:_6,getPageViewId:_6,tag:_0,star:_0,setVariable:_0,identify:_0,formSubmitAttempt:_0,formSubmitSuccess:_0,formSubmitFailure:_0,debug:_0,isRecording:_5,isReturningUser:_5,activateFeedback:_0,websiteId:null,recordingRate:null,version:null}})(window)}