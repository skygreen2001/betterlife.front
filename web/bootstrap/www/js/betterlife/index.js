
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.CountUp = factory();
  }
}(this, function(require, exports, module) {

/*

	countUp.js
	by @inorganik

*/

// target = id of html element or var of previously selected html element where counting occurs
// startVal = the value you want to begin at
// endVal = the value you want to arrive at
// decimals = number of decimal places, default 0
// duration = duration of animation in seconds, default 2
// options = optional object of options (see below)

var CountUp = function(target, startVal, endVal, decimals, duration, options) {

	// make sure requestAnimationFrame and cancelAnimationFrame are defined
	// polyfill for browsers without native support
	// by Opera engineer Erik Möller
	var lastTime = 0;
	var vendors = ['webkit', 'moz', 'ms', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame =
		  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
			  timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}

	var self = this;
    self.version = function () { return '1.8.5'; };

	function formatNumber(num) {
		num = num.toFixed(self.decimals);
		num += '';
		var x, x1, x2, rgx;
		x = num.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? self.options.decimal + x[1] : '';
		rgx = /(\d+)(\d{3})/;
		if (self.options.useGrouping) {
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + self.options.separator + '$2');
			}
		}
		return self.options.prefix + x1 + x2 + self.options.suffix;
	}
	// Robert Penner's easeOutExpo
	function easeOutExpo(t, b, c, d) {
		return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
	}
	function ensureNumber(n) {
		return (typeof n === 'number' && !isNaN(n));
	}
	
	// default options
	self.options = {
		useEasing: true, // toggle easing
		useGrouping: true, // 1,000,000 vs 1000000
		separator: ',', // character to use as a separator
		decimal: '.', // character to use as a decimal
		easingFn: easeOutExpo, // optional custom easing function, default is Robert Penner's easeOutExpo
		formattingFn: formatNumber, // optional custom formatting function, default is formatNumber above
		prefix: '', // optional text before the result
		suffix: '' // optional text after the result
	};

	// extend default options with passed options object
	if (options && typeof options === 'object') {
		for (var key in self.options) {
			if (options.hasOwnProperty(key) && options[key] !== null) {
				self.options[key] = options[key];
			}
		}
	}

	if (self.options.separator === '') self.options.useGrouping = false;

	self.initialize = function() { 
		if (self.initialized) return true;
		self.d = (typeof target === 'string') ? document.getElementById(target) : target;
		if (!self.d) { 
			console.error('[CountUp] target is null or undefined', self.d);
			return false;
		}
		self.startVal = Number(startVal);
		self.endVal = Number(endVal);
		// error checks
		if (ensureNumber(self.startVal) && ensureNumber(self.endVal)) {
			self.decimals = Math.max(0, decimals || 0);
			self.dec = Math.pow(10, self.decimals);
			self.duration = Number(duration) * 1000 || 2000;
			self.countDown = (self.startVal > self.endVal);
			self.frameVal = self.startVal;
			self.initialized = true;
			return true;
		}
		else {
			console.error('[CountUp] startVal or endVal is not a number', self.startVal, self.endVal);
			return false;
		}
	};

	// Print value to target
	self.printValue = function(value) {
		var result = self.options.formattingFn(value);

		if (self.d.tagName === 'INPUT') {
			this.d.value = result;
		}
		else if (self.d.tagName === 'text' || self.d.tagName === 'tspan') {
			this.d.textContent = result;
		}
		else {
			this.d.innerHTML = result;
		}
	};

	self.count = function(timestamp) {

		if (!self.startTime) { self.startTime = timestamp; }

		self.timestamp = timestamp;
		var progress = timestamp - self.startTime;
		self.remaining = self.duration - progress;

		// to ease or not to ease
		if (self.options.useEasing) {
			if (self.countDown) {
				self.frameVal = self.startVal - self.options.easingFn(progress, 0, self.startVal - self.endVal, self.duration);
			} else {
				self.frameVal = self.options.easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration);
			}
		} else {
			if (self.countDown) {
				self.frameVal = self.startVal - ((self.startVal - self.endVal) * (progress / self.duration));
			} else {
				self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
			}
		}

		// don't go past endVal since progress can exceed duration in the last frame
		if (self.countDown) {
			self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal;
		} else {
			self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal;
		}

		// decimal
		self.frameVal = Math.round(self.frameVal*self.dec)/self.dec;

		// format and print value
		self.printValue(self.frameVal);

		// whether to continue
		if (progress < self.duration) {
			self.rAF = requestAnimationFrame(self.count);
		} else {
			if (self.callback) self.callback();
		}
	};
	// start your animation
	self.start = function(callback) {
		if (!self.initialize()) return;
		self.callback = callback;
		self.rAF = requestAnimationFrame(self.count);
	};
	// toggles pause/resume animation
	self.pauseResume = function() {
		if (!self.paused) {
			self.paused = true;
			cancelAnimationFrame(self.rAF);
		} else {
			self.paused = false;
			delete self.startTime;
			self.duration = self.remaining;
			self.startVal = self.frameVal;
			requestAnimationFrame(self.count);
		}
	};
	// reset to startVal so animation can be run again
	self.reset = function() {
		self.paused = false;
		delete self.startTime;
		self.initialized = false;
		if (self.initialize()) {
			cancelAnimationFrame(self.rAF);
			self.printValue(self.startVal);
		}
	};
	// pass a new endVal and start animation
	self.update = function (newEndVal) {
		if (!self.initialize()) return;
		if (newEndVal === self.frameVal) return;
		cancelAnimationFrame(self.rAF);
		self.paused = false;
		delete self.startTime;
		self.startVal = self.frameVal;
		self.endVal = Number(newEndVal);
		if (ensureNumber(self.endVal)) {
			self.countDown = (self.startVal > self.endVal);
			self.rAF = requestAnimationFrame(self.count);
		} else {
			console.error('[CountUp] update() - new endVal is not a number', newEndVal);
		}
	};

	// format startVal on initialization
	if (self.initialize()) self.printValue(self.startVal);
};

return CountUp;

}));

// var stats = new Stats();
// stats.showPanel(0);
// document.body.appendChild(stats.dom);
/**
 * A jQuery plugin that generates an interactive starfield inside a canvas element.
 *
 * Based on Chiptune's starfield.js:
 * https://github.com/chiptune/js/blob/master/starfield.html
 */
;(function ( $, window, document, undefined ) {
    // Plugin constructor
    var Starfield = function(el, options) {
        this.el            = el;
        this.$el        = $(el);
        this.options    = options;

        that            = this;
    };

    var isPlaying;
    var isInited    = false;
    var canCanvas    = false;
    var animId;

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

    // MIT license

    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    // Plugin prototype
    Starfield.prototype = {
        // Default settings
        defaults: {
            starColor:    "rgba(255,255,255,1)",
            bgColor:    "rgba(0,0,0,1)",
            mouseMove:    true,
            mouseColor:    "rgba(0,0,0,0.2)",
            mouseSpeed:    20,
            fps:        15,
            speed:        3,
            quantity:    512,
            ratio:        256,
            divclass:    "starfield"
        },

        // Resize the canvas
        resizer: function() {
            var oldStar                = this.star;
            var initW                = this.context.canvas.width;
            var initH                = this.context.canvas.height;

            this.w                    = this.$el.width();
            this.h                    = this.$el.height();
            this.x                    = Math.round(this.w / 2);
            this.y                    = Math.round(this.h / 2);

            // Check if the device is in portrait orientation
            this.portrait            = this.w < this.h;

            // Get the ratio of the old height to the new height
            var ratX                 = this.w / initW;
            var ratY                = this.h / initH;

            this.context.canvas.width    = this.w;
            this.context.canvas.height    = this.h;

            // Recalculate the position of each star proportionally to new w and h
            for(var i = 0; i < this.n; i++) {
                this.star[i][0]    = oldStar[i][0] * ratX;
                this.star[i][1]    = oldStar[i][1] * ratY;

                this.star[i][3] = this.x + (this.star[i][0] / this.star[i][2]) * this.star_ratio;
                this.star[i][4] = this.y + (this.star[i][1] / this.star[i][2]) * this.star_ratio;
            }

            that.context.fillStyle        = that.settings.bgColor;
            this.context.strokeStyle    = this.settings.starColor;
        },

        init: function() {
            // Get default settings
            this.settings = $.extend({}, this.defaults, this.options);

            // Query variables
            var url    = document.location.href;
            this.n    = parseInt(
                (url.indexOf('n=') != -1) ? url.substring(url.indexOf('n=') + 2, (
                    (url.substring(
                        url.indexOf('n=') + 2,
                        url.length)
                    ).indexOf('&') != -1) ? url.indexOf('n=') + 2 + (url.substring(
                        url.indexOf('n=') + 2,
                        url.length)
                    ).indexOf('&') :
                        url.length) :
                            this.settings.quantity
            );

            this.flag                = true;
            this.test                 = true;
            this.w                    = 0;
            this.h                    = 0;
            this.x                    = 0;
            this.y                    = 0;
            this.z                    = 0;
            this.star_color_ratio    = 0;
            this.star_x_save        = 0;
            this.star_y_save        = 0;
            this.star_ratio            = this.settings.ratio;
            this.star_speed            = this.settings.speed;
            this.star_speed_save    = 0;
            this.star                = new Array(this.n);
            this.color                = this.settings.starColor;
            this.opacity            = 0.1;

            this.cursor_x            = 0;
            this.cursor_y            = 0;
            this.mouse_x            = 0;
            this.mouse_y            = 0;

            this.canvas_x            = 0;
            this.canvas_y            = 0;
            this.canvas_w            = 0;
            this.canvas_h            = 0;

            this.fps                = this.settings.fps;

            // Check for device orientation support
            this.desktop            = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|IEMobile)/);
            this.orientationSupport    = window.DeviceOrientationEvent !== undefined;
            this.portrait            = null;

            // Inject the canvas element
            var canvasInit = function(){
                that.w            = that.$el.width();
                that.h            = that.$el.height();

                that.initW        = that.w;
                that.initH        = that.h;

                that.portrait    = that.w < that.h;

                that.wrapper    = $('<canvas />')
                .addClass(that.settings.divclass);

                that.wrapper.appendTo(that.el);

                that.starz    = $('canvas', that.el);

                if (that.starz[0].getContext) { // Can canvas?
                    that.context    = that.starz[0].getContext('2d');
                    canCanvas        = true;
                }

                that.context.canvas.width = that.w;
                that.context.canvas.height = that.h;
            }
            canvasInit();

            // Create initial star array and canvas context
            var starInit = function(){
                // Get context for the canvas element
                if(canCanvas){ // Check for canvas drawering abilities.
                    that.x                    = Math.round(that.w / 2);
                    that.y                    = Math.round(that.h / 2);
                    that.z                    = (that.w + that.h) / 2;
                    that.star_color_ratio    = 1 / that.z;
                    that.cursor_x            = that.x;
                    that.cursor_y            = that.y;

                    // Big bang
                    for(var i = 0; i < that.n; i++) {
                        that.star[i]    = new Array(5);

                        that.star[i][0]    = Math.random() * that.w * 2 - that.x * 2;
                        that.star[i][1]    = Math.random() * that.h * 2 - that.y * 2;
                        that.star[i][2]    = Math.round(Math.random() * that.z);
                        that.star[i][3]    = 0;
                        that.star[i][4]    = 0;
                    }

                    // Set the colors
                    that.context.fillStyle        = that.settings.bgColor;
                    that.context.strokeStyle    = that.settings.starColor;
                } else {
                    return;
                }
            }
            starInit();

            isInited = true;
        },

        // Iterate over every star on the field and move it slightly
        anim: function(){
      // stats.begin()
            this.mouse_x    = this.cursor_x - this.x;
            this.mouse_y    = this.cursor_y - this.y;
            this.context.fillRect(0, 0, this.w, this.h);

            for(var i = 0; i < this.n; i++) {
                this.test            = true;
                this.star_x_save    = this.star[i][3];
                this.star_y_save    = this.star[i][4];
                this.star[i][0]    += this.mouse_x >> 4;

                // X coords
                if(this.star[i][0] > this.x << 1) {
                    this.star[i][0] -= this.w << 1;
                    this.test = false;
                }
                if(this.star[i][0] <- this.x << 1) {
                    this.star[i][0] += this.w << 1;
                    this.test = false;
                }

                // Y coords
                this.star[i][1] += this.mouse_y >> 4;
                if(this.star[i][1] > this.y << 1) {
                    this.star[i][1] -= this.h << 1;
                    this.test = false;
                }
                if(this.star[i][1] <- this.y << 1) {
                    this.star[i][1] += this.h << 1;
                    this.test = false;
                }

                // Z coords
                this.star[i][2] -= this.star_speed;
                if(this.star[i][2] > this.z) {
                    this.star[i][2] -= this.z;
                    this.test = false;
                }
                if(this.star[i][2] < 0) {
                    this.star[i][2] += this.z;
                    this.test = false;
                }

                this.star[i][3] = this.x + (this.star[i][0] / this.star[i][2]) * this.star_ratio;
                this.star[i][4] = this.y + (this.star[i][1] / this.star[i][2]) * this.star_ratio;

                if(this.star_x_save > 0
                && this.star_x_save < this.w
                && this.star_y_save > 0
                && this.star_y_save < this.h
                && this.test) {
                    this.context.lineWidth = (1 - this.star_color_ratio * this.star[i][2]) * 2;
                    this.context.beginPath();
                    this.context.moveTo(this.star_x_save,this.star_y_save);
                    this.context.lineTo(this.star[i][3], this.star[i][4]);
                    this.context.stroke();
                    this.context.closePath();
                }
            }
      // stats.end()
        },

        loop: function(){
            this.anim();

            animId = window.requestAnimationFrame(function(){that.loop()});
        },

        move: function(){
            var doc    = document.documentElement;

            if (this.orientationSupport && !this.desktop) {
                //$('<p class="output"></p>').prependTo('.content');
                //var output = document.querySelector('.output');
                window.addEventListener('deviceorientation', handleOrientation, false);
            } else {
                window.addEventListener('mousemove', handleMousemove, false);
            }

            function handleOrientation(event) {
                if( event.beta !== null && event.gamma !== null) {
                    var x = event.gamma, y = event.beta;

                    if (!that.portrait) {
                        x = event.beta * -1;
                        y = event.gamma;
                    }

                    that.cursor_x    = (that.w / 2) + (x * 5);
                    that.cursor_y    = (that.h / 2) + (y * 5);

                    /*var output = document.querySelector('.output');
                    output.innerHTML = "rotZ : " + Math.round(event.alpha) + "<br />\n";
                    output.innerHTML += "rotX: " + Math.round(event.beta) + "<br />\n";
                    output.innerHTML += "rotY: " + Math.round(event.gamma) + "<br />\n";*/
                }
            }

            function handleMousemove(event) {
                that.cursor_x    = event.pageX || event.clientX + doc.scrollLeft - doc.clientLeft;
                that.cursor_y    = event.pageY || event.clientY + doc.scrollTop - doc.clientTop;
            }
        },

        stop: function(){
            window.cancelAnimationFrame(animId);

            isPlaying = false;
        },

        // this.start this whole thing
        start: function() {
            // Initialize
            if (!isInited) {
                isInited = true;
                this.init();
            }

            // Start the animation loop
            if (!isPlaying) {
                isPlaying = true;
                this.loop();
            }

            window.addEventListener('resize', function(){that.resizer()}, false);

            window.addEventListener('orientationchange', function(){that.resizer()}, false);

            // Move stars on mouse move
            if (this.settings.mouseMove) {
                this.move();
            }

            return this;
        }
    }

    Starfield.defaults    = Starfield.prototype.defaults;

    // Finally, the actual plugin code
    $.fn.starfield = function(options){
        return this.each(function() {
            new Starfield(this, options).start();
        });
    }

    window.Starfield = Starfield;
})( jQuery, window, document );

// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){"object"===typeof exports&&"undefined"!==typeof module?module.exports=e():"function"===typeof define&&define.amd?define(e):f.Stats=e()})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});
