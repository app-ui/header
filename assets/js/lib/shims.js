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
