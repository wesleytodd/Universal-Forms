/*
 * Universal Forms
 * http://wesleytodd.com/
 *
 * Version 0.0.1
 *
 * Basic Usage:
 *
 */
(function() {

	/**
	 * Extend helper, based of underscore.js
	 */
	var extend = function(obj) {
		var others = Array.prototype.slice.call(arguments, 1),
			l = others.length;
		for (var i = 0; i < l; i++) {
			if (typeof others[i] !== 'undefined') {
				for (var prop in others[i]) {
					obj[prop] = others[i][prop];
				}
			}
		}
		return obj;
	};

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
		options.attributes = extend(options.attributes || {}, {
			id     : options.id,
			method : options.method,
			action : options.action
		});

		extend(this, {
			attributes : options.attributes,
			fields     : {},
			options    : options
		});

		// setup and process fields
		if (typeof options.fields === 'undefined') options.fields = [];
		else if (!(options.fields instanceof Array)) throw new TypeError('the fields must be defined as an array');

		var len = options.fields.length;
		for (var i = 0; i < len; i++) {
			this.addField(options.fields[i].name, options.fields[i].type, options.fields[i]);
		};
	};

	/**
	 * Add a new field to the form
	 */
	Form.prototype.addField = function(name, type, options) {
		// If just a Field object was passed in, add it
		if (name instanceof Field) return this.fields[name.name] = name;

		// Otherwise, create a new field object and add it
		return this.fields[name] = new Field(name, type, options);
	};

	/**
	 * Remove a field by name
	 */
	Form.prototype.removeField = function(name) {
		if (typeof this.fields[name] !== 'undefined') delete this.fields[name];
	};

	/**
	 * Field Object Constructor
	 *
	 * The field object maintains the state of each individual field.
	 */
	var Field = function(name, type, options) {
		// setup a field here
		if (!(this instanceof Field)) return new Field(name, type, options);

		// require name & type
		if (typeof name !== 'string') throw new TypeError('A name is required for all fields');
		if (typeof type !== 'string') throw new TypeError('A type is required for all fields');

		// Setup options
		if (typeof options !== 'object') options = {};

		// set rules array
		if (typeof options.rules === 'undefined') options.rules = [];
		else if (!(options.rules instanceof Array)) throw new TypeError('the rules must be defined as an array');

		// set common top level attributes
		options.attributes = extend(options.attributes || {}, {
			name  : name,
			id    : options.id || name,
			type  : type,
			value : options.value
		});

		extend(this, {
			name       : name,
			type       : type,
			label      : options.label,
			attributes : options.attributes,
			rules      : options.rules,
			options    : options,
			errors     : {}
		});

	};

	/**
	 * Set error on field
	 */
	Field.prototype.setError = function(type, message) {
		this.errors[type] = message;
	};

	/**
	 * Clear error
	 */
	Field.prototype.clearError = function(type) {
		if (typeof this.errors[type] !== 'undefined') return delete this.errors[type];
		if (typeof type === 'undefined') this.errors = {};
	};

	/**
	 * Export
	 */
	var expose = {
		Form : Form,
		Field : Field
	};

	if (typeof exports !== 'undefined') {
		exports = expose;
	} else {
		window.UniversalForms = expose;
	}

})();
