/*
 * Universal Forms
 * http://wesleytodd.com/
 *
 * Version 0.1
 *
 * Basic Usage:
 *
 */
var UniversalForm = (function(_) {

	/**
	 * Helper: typeof
	 */
	var _t = function(v, t) {
		if(typeof t == 'undefined') t = 'undefined';
		return typeof v == t;
	};

	/**
	 * Helper: instanceof
	 */
	var _i = function(v, i) {
		return v instanceof i;
	};

	/**
	 * Helper: slice
	 */
	var _slice = function(arr, begin, end) {
		return Array.prototype.slice.call(arr, begin, end);
	};

	/**
	 * Helper: extend
	 */
	var _extend = (!_t(_)) ? _.extend : function(obj) {
		var objs = _slice(arguments, 1),
			len = objs.length;
		for (var i = 0; i < len; i++) {
			for (var prop in objs[i]) {
				obj[prop] = objs[i][prop];
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
		if (!_i(this, Form)) return new Form(options);

		// setup internal vars
		this._attributes = {};
		this._fields = {};

		// setup options
		if (_t(options)) options = {};

		// setup and process options.attributes
		if (_t(options.attributes)) options.attributes = {};

		// set common top level attributes (this wont work...needs to act like jQuery.extend)
		options.attributes.id     = options.id;
		options.attributes.method = options.method;
		options.attributes.action = options.action;

		// set each attribute individually
		for (var prop in options.attributes) {
			this.setAttr(prop, options.attributes[prop]);
		}

		// setup and process options.fields
		if (_t(options.fields)) options.fields = [];

		var len = options.fields.length;
		for (var i = 0; i < len; i++) {
			this.addField(options.fields[i].name, options.fields[i]);
		};

	};

	/**
	 * Setter/Getter for attributes on the object
	 */
	Form.prototype.attr = function(attr, val) {
		if (_t(val)) return this.getAttr(attr);
		return this.setAttr(attr, val);
	};

	/**
	 * Setter for atributes
	 */
	Form.prototype.setAttr = function(attr, val) {
		this._attributes[attr] = val;
	};

	/**
	 * Getter for attributes
	 */
	Form.prototype.getAttr = function(attr) {
		return this._attributes[attr];
	};

	/**
	 * Add a new field to the form
	 */
	Form.prototype.addField = function(name, options) {
		// If just a Field object was passed in, add it
		if (_i(name, Field)) return this._fields[name.name] = name;

		// Otherwise, create a new field object and add it
		options = _extend(options, {
			name : name
		})
		return this._fields[options.name] = Field(options);
	};

	/**
	 * Remove a field by name
	 */
	Form.prototype.removeField = function(name) {
		if (!_t(this._fields[name])) this._fields[name] = null;
	};

	/**
	 * Field Object Constructor
	 *
	 * The field object maintains the state of each individual field.
	 */
	var Field = function(options) {
		// setup a field here
		if (!_i(this, Field)) return new Field(options);

		// require name
		if (_t(options)) throw new TypeError('Field options must be supplied');
		if (_t(options.name)) throw new TypeError('A name is required for all fields');

		// setup options
		if (_t(options)) options = {};
		if (_t(options.attributes)) options.attributes = {};

		// set common top level attributes (this wont work...needs to act like jQuery.extend)
		options.attributes.name  = options.name;
		options.attributes.id    = options.id;
		options.attributes.type  = options.type;
		options.attributes.value = options.value;
		options.attributes.label = options.label;

		if(_t(options.rules)) options.rules = [];


	};

	/**
	 * Render field
	 */
	 Field.prototype.render = function() {
		 
	};

	/**
	 * Set error on field
	 */
	Field.prototype.setError = function(message) {
		
	};

	/**
	 * Clear error
	 */
	Field.prototype.clearError = function(type) {
		
	}

	/**
	 * Run the validation rules on the field
	 */
	Field.prototype.validate = function() {
		
	};


	return {
		Form  : Form,
		Field : Field
	};
	
})(window._);
