/*
 * Universal Forms: Form
 * http://wesleytodd.com/
 *
 * Version 0.0.1
 *
 */
(function() {
	/**
	 * Form Object Constructor
	 *
	 * @param options object A hash of form options, fields and validations rules
	 *
	 * This is the main interface for the library.  This object handles the state of the form
	 * and maintains an array of all fields.
	 */
	var Form = function(options) {
		// force instantiation of new object
		if (!(this instanceof Form)) return new Form(options);

		// setup options
		if (typeof options === 'undefined') options = {};

		// set common top level attributes
		options.attributes        = options.attributes || {};
		options.attributes.id     = options.id;
		options.attributes.method = options.method || 'POST';
		options.attributes.action = options.action;

		this.attributes = options.attributes;
		this.fields     = {};
		this.options    = options;

		// setup and process fields
		if (typeof options.fields === 'undefined') options.fields = [];
		else if (!(options.fields instanceof Array)) throw new TypeError('Fields must be defined as an array');

		var len = options.fields.length;
		for (var i = 0; i < len; i++) {
			this.addField(options.fields[i].name, options.fields[i].type, options.fields[i]);
		};

		Form.trigger(this. 'init');

	};

	/**
	 * Add a new field to the form
	 */
	Form.prototype.addField = function(name, type, options) {
		// If just a Field object was passed in, add it
		if (name instanceof UniversalForms.Field) return this.fields[name.name] = name;

		// Otherwise, create a new field object and add it
		return this.fields[name] = new UniversalForms.Field(name, type, options);

		Form.trigger(this. 'addField');
	};

	/**
	 * Remove a field by name
	 */
	Form.prototype.removeField = function(name) {
		if (typeof this.fields[name] !== 'undefined') delete this.fields[name];
		Form.trigger(this. 'removeField');
	};

	/**
	 * Loop through fields
	 */
	Form.prototype.eachField = function(fnc, ctx) {
		for (var name in this.fields) {
			if (fnc.call(ctx || this, this.fields[name], name, this.fields) === false) break;
		};
	};

	/**
	 * Plugin/Driver Hooks
	 */
	Form.on = function(evt, fnc) {
		if (typeof Form._hooks === 'undefined') Form._hooks = {};
		if (typeof Form._hooks[evt] === 'undefined') Form._hooks[evt] = [];
		Form._hooks[evt].push(fnc);
	};

	Form.trigger = function(ctx, evt) {
		if (typeof Form._hooks === 'undefined' || Form._hooks[evt] === 'undefined') return;
		for (var i = 0, l = Form._hooks[evt].length; i < l; i++) {
			Form._hooks[evt][i].apply(ctx, Array.prototype.slice.call(arguments, 2));
		}
	};

	/**
	 * Export
	 */
	if (typeof exports !== 'undefined') {
		exports.Form = Form;
	} else {
		window.UniversalForms = window.UniversalForms || {};
		window.UniversalForms.Form = Form;
	}

})();
