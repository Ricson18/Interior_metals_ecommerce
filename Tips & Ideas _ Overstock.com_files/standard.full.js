(function (global, factory) {
  // From https://github.com/jquery/jquery/blob/58c6ca9822afa42d3b40cca8edb0abe90a2bcb34/src/wrapper.js
  if (typeof module === 'object' && typeof module.exports === 'object') {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get jQuery.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    module.exports = global.document
      ? factory(global)
      : function (w) {
        if (!w.document) {
          throw new Error(
            'TagDeliveryContent requires a window with a document'
          );
        }
        return factory(w);
      };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== 'undefined' ? window : this, function (window) {
  var _tdc = {};

_tdc.GLOBAL_NAME = 'TagDeliveryContent';
_tdc.HOST = 'ad.tagdelivery.com';
_tdc.PROTOCOL = 'https://';
_tdc.MAP_KEY = '_m';
_tdc.RETRY = 1250;
_tdc.TIMEOUT = 7000;

_tdc.LOADED = false;

_tdc.requestCount = 0;
_tdc.requestMap = {};
_tdc.callbacks = {};

_tdc.isLoaded = function() {
  return _tdc.LOADED;
};

_tdc.onLoadHandler = function(evnt) {
  _tdc.LOADED = true;
  _tdc.log('Page Loaded');
};

if (window.addEventListener) {
  window.addEventListener('load', _tdc.onLoadHandler);
} else {
  window.attachEvent('onload', _tdc.onLoadHandler);
}

_tdc.log = function() {
  this.Log.add.apply(this.Log, [].slice.call(arguments));
};

_tdc.request = function(inputs, callback) {
  var request = new this.Request(inputs, callback);

  this.requestMap[request.id] = request;

  request.send();

  this.requestCount++;

  return request.id;
};


  _tdc.Util = (function() {
    var _util = {};

    // DOM reference for HEAD html element
    _util.head = document.head || document.getElementsByTagName('head')[0];

    // generate a v4 UUID
    _util.generateUuid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };

    // add a script tag to the DOM by specifying its URL and an optional error function
    _util.attachScript = function(url, err) {
        var script = document.createElement('script');
        if (typeof err == 'function') {
            script.onerror = err;
        }

        script.type = 'text/javascript';

        this.head.appendChild(script);

        script.src = url;
        return script;
    };

    // get object type
    _util.getType = function(value) {
        var type = typeof value;
        if (
            type == 'object' &&
            Object.prototype.toString.call(value) === '[object Array]'
        ) {
            type = 'array';
        }
        return type;
    };

    _util.isArray = function(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    };

    _util.isObject = function(obj) {
        return Object.prototype.toString.call(obj) == '[object Object]';
    };

    _util.isEmptyObject = function(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };

    _util.arrayToQueryString = function(items) {
        var out = [];
        for (var i = 0, l = items.length; i < l; i++) {
            var val = items[i]
            if (typeof val === 'string') {
                out.push(items[i].replace(/,/g, '%2C'));
            } else if (typeof val === 'number') {
                out.push(items[i])
            }
        }
        return out.join(',');
    };

    _util.objectToQueryString = function(obj) {
        var out = [];
        for (var k in obj) {
            if (obj[k] !== null) {
                var t = this.getType(obj[k]);
                var v = null;
                if (t == 'array' && obj[k].length > 0) {
                    v = this.arrayToQueryString(obj[k]);
                } else if (t == 'object') {
                    v = encodeURIComponent(this.objectToQueryString(obj[k]));
                } else {
                    v = encodeURIComponent(obj[k]);
                }
                out.push(k + '=' + v);
            }
        }
        return out.join('&');
    };

    _util.inArray = function(haystack, needle) {
        for (var i = 0, l = haystack.length; i < l; i++) {
            if (haystack[i] === needle) {
                return true;
            }
        }
        return false;
    };

    _util.getStyle = function(className) {
        var classes =
            document.styleSheets[0].rules || document.styleSheets[0].cssRules;
        for (var x = 0; x < classes.length; x++) {
            if (classes[x].selectorText == className) {
                classes[x].cssText ?
                    alert(classes[x].cssText) :
                    alert(classes[x].style.cssText);
            }
        }
    };

    _util.formatPrice = function(price, currency, language) {
        if (typeof currency !== 'string') currency = 'USD';
        return Number(price).toLocaleString(language, {
            style: 'currency',
            currency: currency
        });
    }

    _util.shouldRender = function(response) {
        var shouldRender = false;

        for (var i = 0; i < response.length; i++) {
            var r = response[i];

            if (r.sponsored) {
                shouldRender = true;
                break;
            }
        }

        return shouldRender;
    }

    _util.validateSponsoredCount = function(response) {
        var sponsoredCount = 0
        if (_tdc.Util.isArray(response)) {
            for (var i = 0, l = response.length; i < l; i++) {
                if (response[i].sponsored) {
                    sponsoredCount++;
                }
            }
        } else {
            sponsoredCount += (response.sponsored ? 1 : 0);
        }

        return sponsoredCount
    }

    _util.decodeHtml = function(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    _util.convertToTitleCase = function(str) {
        return str.toLowerCase().replace(/^(.)|\s(.)/g, function($1) {
            return $1.toUpperCase();
        })
    }

    _util.mergeObjects = function() {
        var resObj = {};
        for(var i=0; i < arguments.length; i += 1) {
             var obj = arguments[i],
                 keys = Object.keys(obj);
             for(var j=0; j < keys.length; j += 1) {
                 resObj[keys[j]] = obj[keys[j]];
             }
        }
        return resObj;
    }

    return _util;
})();

  _tdc.Log = (function() {
  var _log = {};

  _log.entries = [];
  _log.toConsole = false;

  _log.add = function() {
    var entry = [].slice.call(arguments);
    entry.unshift(new Date());
    this.entries.push(entry);
    if (this.toConsole) {
      this.print(entry);
    }
  };

  _log.print = function(entry) {
    var o = entry.slice(0);
    o[0] =
      o[0].toTimeString().substr(0, 8) +
      '.' +
      ('000' + o[0].getMilliseconds()).substr(-3);
    o.unshift(_tdc.GLOBAL_NAME);
    try {
      console.log.apply(console, o);
    } catch (e) {}
  };

  return _log;
})();


  

  _tdc.Pub = (function() {
  var _pub = {};

  // optional method
  //_pub.modifyRequest = function(request){};

  // required method
  _pub.prepareDefaultResponse = function(request) {
    return {
      product_id: null,
      request_id: request.id,
      sponsored: false,
      impression_tracker: null,
      click_tracker: null,
      product: null
    };
  };

  // optional method
  //_pub.modifyResponse = function(request, responses){};

  return _pub;
})();


  _tdc.Request = (function () {
  return function (inputs, callback) {
    this.id = _tdc.Util.generateUuid();
    this.inputs = null;
    this.parameters = {
      targets: null,
      slot: null,
      deferred: null,
      batch: null,
      pos: null,
      format: null,
      width: null,
      height: null,
      callback: null,
      passthru: null,
      template: null,
      count: null,
      count_fill: null,
      attributes: null,
      url: null
    };
    this.callback = callback;
    this.timeoutRef = {};
    this.retryAfter = _tdc.RETRY;
    this.timeLeft = _tdc.TIMEOUT;
    this.numTries = 0;
    this.locked = false;
    this.active = true;
    this.map = false;

    this.baseUrl = _tdc.PROTOCOL + _tdc.HOST + '/request?';
    this.url = null;
    this.requestedAt = +new Date();
    this.sentAt = null;
    this.receivedAt = null;
    this.returnedAt = null;
    this.renderedAt = null;

    _tdc.log('received request', this.id, this.inputs);

    this.applyInputs = function (inputs) {
      if (typeof inputs == 'object') {
        this.inputs = _tdc.Util.mergeObjects(inputs)

        for (var k in inputs) {
          if (this.parameters.hasOwnProperty(k)) {
            this.parameters[k] = inputs[k];
          }
        }
      } else {
        this.inputs = inputs
      }
    };

    this.applyInputs(inputs);

    this.modifyForPub = function () {
      if (typeof _tdc.Pub.modifyRequest != 'function') return;

      var copy = _tdc.Pub.modifyRequest(this);

      if (typeof copy != 'object') return;

      for (var k in copy) {
        if (k !== 'inputs') {
          this[k] = copy[k];
        }
      }
    };

    this.getCallbackKey = function () {
      return '_' + this.id.replace(/-/g, '_');
    };

    this.registerCallback = function () {
      var key = this.getCallbackKey();
      if (this.parameters.callback === null) {
        this.parameters.callback = [_tdc.GLOBAL_NAME, 'callbacks', key].join(
          '.'
        );
      }
      var id = this.id;
      _tdc.callbacks[key] = function (response) {
        _tdc.requestMap[id].processResponse(response);
      };
    };

    this.setRetryTime = function (time) {
      this.timeLeft = time || _tdc.TIMEOUT;
      this.retryAfter = Math.min(this.timeLeft || this.retryAfter, _tdc.RETRY);
    };

    this.setRetry = function () {
      var that = this;

      this.timeoutRef = setTimeout(function () {
        //no time left, exit
        if (that.timeLeft <= 0) {
          that.cancel();
          return;
        }

        // cancel request
        if (_tdc.isLoaded()) {
          _tdc.log('resending after', that.id, +new Date() - that.requestedAt);
          that.numTries++;
          that.cancel();
          // that.send();
        } else {
          _tdc.log('Pseudo timeout during loading', that.id, that.url);
          that.setRetry();
        }
      }, that.retryAfter || _tdc.RETRY); //case where context is lost

      // decrement remaining time on request
      if (_tdc.isLoaded()) {
        this.retryAfter = Math.min(this.retryAfter, this.timeLeft);
        this.timeLeft = this.timeLeft - this.retryAfter;
      }
    };

    this.noRetry = function () {
      clearTimeout(this.timeoutRef);
    };

    this.setUrl = function () {
      if (typeof _tdc.Pub.buildUrl == 'function') {
        this.url = _tdc.Pub.buildUrl(this);
        return;
      }

      // this is where the callback is called -> through query parameter
      if (this.map && !this.inputs.hasOwnProperty(_tdc.MAP_KEY)) {
        if (typeof _tdc.Pub.getMapRequest == 'function') {
          this.url = _tdc.Pub.getMapRequest(this);
        } else {
          this.url =
            'https://tools.tagdelivery.com/requests/map?request=' +
            encodeURIComponent(
              JSON.stringify({ id: this.id, parameters: this.parameters })
            );
        }
        return;
      }

      this.url = this.baseUrl + _tdc.Util.objectToQueryString(this.parameters);
    };

    this.send = function () {
      if (!this.locked) {
        this.modifyForPub();
        this.setRetryTime();
        this.locked = true;
      }

      if (!this.active) {
        return;
      }

      this.setRetry();
      this.registerCallback();
      this.setUrl();

      this.sentAt = +new Date();

      var self = this;
      var tag = _tdc.Util.attachScript(
        this.url,
        Function.prototype.bind
          ? this.cancel.bind(this)
          : function () {
            self.cancel();
          }
      );

      tag.parentNode.removeChild(tag);

      _tdc.log(
        'url called after',
        this.id,
        this.sentAt - this.requestedAt,
        this.numTries,
        this.url
      );
    };

    this.processResponse = function (response) {
      if (response.length === 0 || !response) {
        this.returnedAt = +new Date();
        this.renderedAt = +new Date();

        _tdc.log(
          'empty/null/undefined response',
          this.id,
          this.returnedAt - this.returnedAt,
          response
        );
      } else {
        this.noRetry();
        this.receivedAt = +new Date();

        if (typeof _tdc.Pub.modifyResponse == 'function') {
          response = _tdc.Pub.modifyResponse(this, response);
        }
      }
      this.respond(response);
    };

    //i.e: attachScript error (ad-blocker; browser)
    this.cancel = function () {
      this.active = false;
      clearTimeout(this.timeoutRef);
      _tdc.log('cancelled request', this.id);
      var defaultResponse = _tdc.Pub.prepareDefaultResponse(this);
      if (this.parameters.count !== null && this.parameters.count != 1) {
        var output = [];
        for (var i = 0, c = this.parameters.count; i < c; i++) {
          output.push(defaultResponse);
        }
        this.respond(output);
      } else {
        this.respond(defaultResponse);
      }
    };

    this.respond = function (callbackObject) {
      this.returnedAt = +new Date();
      _tdc.log(
        'closing request',
        this.id,
        this.returnedAt - this.receivedAt,
        callbackObject
      );
      this.callback(callbackObject);
      this.renderedAt = +new Date();
      _tdc.log(
        'callback finished',
        this.id,
        this.renderedAt - this.receivedAt,
        this.renderedAt - this.returnedAt
      );
    };

    //  Overstock called in the AWS lambda function
    //  Zulily - called in the script tag calling Fastly edge dictionary
    //  Kohl's - called in AWS lambda function for search requests
    this.update = function (inputs) {
      _tdc.log('updating request', this.id);

      if (typeof _tdc.Pub.applyMapResponse == 'function') {
        _tdc.Pub.applyMapResponse(this, inputs);

        // marks this request's mapping as complete
        this.inputs[_tdc.MAP_KEY] = 1;
        this.map = false
        this.noRetry();
        this.send();
      } else {
        this.applyInputs(inputs);
      }

      this.locked = false;
      if (this.map && this.inputs.hasOwnProperty(_tdc.MAP_KEY)) {
        this.noRetry();
        this.send();
      }
    };
  };
})();


  if (typeof define === 'function' && define.amd) {
    define('tagDeliveryContent', [], function () {
      return _tdc;
    });
  }

  window[_tdc.GLOBAL_NAME] = _tdc;
  if (
    _tdc.hasOwnProperty('Pub') &&
    typeof _tdc.Pub === 'object' &&
    _tdc.Pub.hasOwnProperty('GLOBAL_NAME') &&
    _tdc.GLOBAL_NAME != _tdc.Pub.GLOBAL_NAME
  ) {
    window[_tdc.Pub.GLOBAL_NAME] = _tdc;
  }

  if (window.hasOwnProperty('TagDeliveryQueue')) {
    for (var i = 0; i < window.TagDeliveryQueue.length; i++) {
      var cmd = window.TagDeliveryQueue[i];
      if (cmd == 'Pub.ctr.renderShelf') {
        window[_tdc.GLOBAL_NAME].Pub.ctr.renderShelf();
      }
    }
  }

  // Polyfills
  if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        enumerable: false,
        value: function (obj) {
            var newArr = this.filter(function (el) {
                return el == obj;
            });
            return newArr.length > 0;
        }
    });
}

  return _tdc;
});
