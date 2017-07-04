
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
