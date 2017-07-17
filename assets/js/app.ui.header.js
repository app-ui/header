/*
 * APP UI: Header
 * Source: https://github.com/app-ui/header
 * Copyright © Makesites.org
 *
 * Initiated by Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function (lib) {

	//"use strict";

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		var deps = ['jquery', 'underscore']; // condition when app is part of the array?
		define('app.ui.header', deps, lib);
	} else if ( typeof module === "object" && module && typeof module.exports === "object" ){
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = lib;
	} else {
		// Browser globals
		var Query = window.jQuery || window.Zepto || window.vQuery;
		lib( Query, window._ );
	}
}(function ( $, _ ) {

	// If there is a window object, that at least has a document property
	var isBrowser = ( typeof window === "object" && typeof window.document === "object" );
	var APP = ( isBrowser && window.APP ) ? window.APP : {}; //
	// support for APP() view if available...
	var View = ( typeof APP.View !== "undefined" ) ? APP.View : null;


// Source (edited): https://gist.github.com/tracend/5425415
var extend = function(protoProps, staticProps) {

	var parent = this;
	var child;

	if (protoProps){
		_.each(protoProps, function(value, key){
			// exit now if the types can't be extended
			if( typeof value == "string" || typeof value == "boolean" ) return;
			// modify only the objects that are available in the parent
			if( key in parent.prototype && !(value instanceof Function) && !(parent.prototype[key] instanceof Function) ){
				protoProps[key] = _.extend({}, parent.prototype[key], value);
			}
		});
	}

	// FIX: can't use original .extend to contain child prototype
	//return origExtend.call(this, protoProps, staticProps);

	// The constructor function for the new subclass is either defined by you
	// (the "constructor" property in your `extend` definition), or defaulted
	// by us to simply call the parent's constructor.
	if (protoProps && _.has(protoProps, 'constructor')) {
		child = protoProps.constructor;
	} else {
		child = function(){ return parent.apply(this, arguments); };
	}

	// Add static properties to the constructor function, if supplied.
	_.extend(child, parent, staticProps);

	// Set the prototype chain to inherit from `parent`, without calling
	// `parent`'s constructor function.
	var Surrogate = function(){ this.constructor = child; };
	Surrogate.prototype = parent.prototype;
	child.prototype = Object.create(new Surrogate());

	// Add prototype properties (instance properties) to the subclass,
	// if supplied.
	if (protoProps) child.prototype = _.extend({}, child.prototype, protoProps);

	// Set a convenience property in case the parent's prototype is needed
	// later.
	child.__super__ = parent.prototype;

	return child;

};


//
if( !View ){
	View = function( options ){
		if(options.el){
			this.el = options.el;
			delete options.el;
		}
		// custom constructor
		if(this.initialize) this.initialize( options );
	};
	View.prototype.render = function(){
		this.postRender();
	};
	View.extend = extend;
}


var Header = View.extend({

	el : 'header.top',

	options : {
		scrollEl: "body",
		detatch: false,
		detatchOffset : 0,
		hide: false,
		hideDir: "down"
		// hideOffset : 0,
	},

	events: {
		// "scroll" : "headerScroll",
	},

	headerScroll: function() {

		this.lastScroll = this.lastScroll || 0;
		// calculate the direction of scroll

		var scrollTop = $(window).scrollTop();
		if (scrollTop > this.lastScroll){
			// downscroll code
			this.scrollDir = "down";

		} else {
			this.scrollDir = "up";
		}
		this.lastScroll = scrollTop;

		// if plugin option hide is true
		if (this.options.hide) {

			// if option direction is down
			if ( this.options.hideDir == "down" ) {

				// check if user scroll dir is down and window is not at top
				if ( (this.scrollDir == "down") && scrollTop > 0 ) {

					$(this.el).addClass("hidden");
					this.translateTop(-1 * $(this.el).height());

				} else {
					$(this.el).removeClass("hidden");
					this.translateTop();
				}
			}

			// if option direction is up
			if ( this.options.hideDir == "up" ) {

				if ( (this.scrollDir == "up") && scrollTop > 0 ) {
					$(this.el).addClass("hidden");
					this.translateTop(-1* $(this.el).height());

				} else {
					$(this.el).removeClass("hidden");
					this.translateTop();
				}
			}
		} else if( $(this.el).hasClass("hidden") ) {
			//
			$(this.el).removeClass("hidden");
			this.translateTop();
		}

		// if plugin option detatch is true
		if (this.options.detatch && !$(this.el).hasClass("hidden")) {

			// check if amount of user scroll is greater than the detatchOffset amount set in options
			if( scrollTop > this.options.detatchOffset ){
				$(this.el).addClass("detatched");
			} else {
				$(this.el).removeClass("detatched");
			}
		}

	},

	initialize: function(options){
		// fallbacks
		options = options || {};
		// bindings
		_.bindAll(this, 'render', 'headerScroll');
		// extend options
		this.options = _.extend({}, this.options, options);
		// events
		$(window).scroll(this.headerScroll);

	},

	postRender: function(){
		//
		if( this.el ) $(this.el).addClass("ui-header");
	},

	translateTop: function(pixels){
		pixels = pixels || 0;
		$(this.el).css("-webkit-transform", "translate(0,"+ pixels +"px)");
		$(this.el).css("-moz-transform", "translate(0,"+ pixels +"px)");
		$(this.el).css("-o-transform", "translate(0,"+ pixels +"px)");
		$(this.el).css("transform", "translate(0,"+ pixels +"px)");

	}

});



	// Global namespace
	APP.UI = APP.UI || {};
	APP.UI.Header = Header;

	if( isBrowser ) window.APP = APP;

	// for module loaders:
	return Header;

}));
