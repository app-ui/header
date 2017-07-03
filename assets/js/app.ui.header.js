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

	APP = APP || window.APP || null;
	var isAPP = ( APP !== null );
	// support for APP() view if available...
	var View = ( isAPP && typeof APP.View !== "undefined" ) ? APP.View : Object;



var Header = View.extend({

	el : 'body',

	options : {
		headerEl : ".top",
		mainEl : ".main",
		detatch : false,
		detatchOffset : 0,
		hide : false,
		hideDir : "down"
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

					$( this.options.headerEl ).addClass("ui-header-hide");
					this.translateTop(-1*$(this.options.headerEl).height());

				} else {
					$( this.options.headerEl ).removeClass("ui-header-hide");
					this.translateTop();
				}
			}

			// if option direction is up
			if ( this.options.hideDir == "up" ) {

				if ( (this.scrollDir == "up") && scrollTop > 0 ) {
					$( this.options.headerEl ).addClass("ui-header-hide");
					this.translateTop(-1*$(this.options.headerEl).height());

				} else {
					$( this.options.headerEl ).removeClass("ui-header-hide");
					this.translateTop();
				}
			}
		}

		// if plugin option detatch is true
		if (this.options.detatch && !$(this.options.headerEl).hasClass("ui-header-hide")) {

			// check if amount of user scroll is greater than the detatchOffset amount set in options
			if (scrollTop > this.options.detatchOffset) {
				$( this.options.headerEl ).addClass("detatch");
			}

			else {
				$( this.options.headerEl ).removeClass("detatch");
			}
		}

	},

	initialize: function(model, options){

		_.bindAll(this, 'render', 'headerScroll');
		$(window).scroll(this.headerScroll);

	},

	translateTop: function(pixels){
		pixels = pixels || 0;
		$( this.options.headerEl ).css("-webkit-transform", "translate(0,"+ pixels +"px)");
		$( this.options.headerEl ).css("-moz-transform", "translate(0,"+ pixels +"px)");
		$( this.options.headerEl ).css("-o-transform", "translate(0,"+ pixels +"px)");
		$( this.options.headerEl ).css("transform", "translate(0,"+ pixels +"px)");

	}

});


	if( isAPP ){
		APP.UI = APP.UI || {};
		APP.UI.Header = Header;
	}

	// If there is a window object, that at least has a document property
	if( typeof window === "object" && typeof window.document === "object" ){
		// update APP namespace
		if( isAPP ){
			window.APP = APP;
		}
	}

	// for module loaders:
	return Header;

}));
