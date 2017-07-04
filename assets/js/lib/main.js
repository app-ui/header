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


{{{lib}}}


	// Global namespace
	APP.UI = APP.UI || {};
	APP.UI.Header = Header;

	if( isBrowser ) window.APP = APP;

	// for module loaders:
	return Header;

}));
