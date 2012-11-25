/*
 * Universal Forms
 * http://wesleytodd.com/
 *
 * Version 0.1
 *
 * Basic Usage:
 *
 */
var UniversalForm = (function(_, Renderer) {

	/**
	 * Helper methods
	 */
	_.mixin({
		/**
		 * Helper: typeof
		 */
		t : function(v, t) {
			if(typeof t == 'undefined') t = 'undefined';
			return typeof v == t;
		},

		/**
		 * Helper: instanceof
		 */
		i : function(v, i) {
			return v instanceof i;
		},

		/**
		 * Helper: slice
		 */
		slice : function(arr, begin, end) {
			return Array.prototype.slice.call(arr, begin, end);
		}
	});

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
		if (!_.i(this, Form)) return new Form(options);

		// setup options
		if (_.t(options)) options = {};

		// set common top level attributes
		options.attributes = _.extend(options.attributes || {}, {
			id     : options.id,
			method : options.method,
			action : options.action
		});

		_.extend(this, {
			attributes : options.attributes,
			fields     : {},
			extra      : options.extra
		});

		// setup template
		this.template = options.template || this.getTemplate();

		// setup and process fields
		if (_.t(options.fields)) options.fields = [];
		else if (_.t(options.fields, Array)) throw new TypeError('the fields must be defined as an array');

		var len = options.fields.length;
		for (var i = 0; i < len; i++) {
			this.addField(options.fields[i].name, options.fields[i]);
		};
	};

	/**
	 * Add a new field to the form
	 */
	Form.prototype.addField = function(name, options) {
		// If just a Field object was passed in, add it
		if (_.i(name, Field)) return this.fields[name.name] = name;

		// Otherwise, create a new field object and add it
		options = _.extend(options, {
			name : name
		})
		return this.fields[options.name] = Field(options);
	};

	/**
	 * Remove a field by name
	 */
	Form.prototype.removeField = function(name) {
		if (!_.t(this._fields[name])) this._fields[name] = null;
	};

	/**
	 * Field Object Constructor
	 *
	 * The field object maintains the state of each individual field.
	 */
	var Field = function(options) {
		// setup a field here
		if (!_.i(this, Field)) return new Field(options);

		// require name & type
		if (_.t(options)) throw new TypeError('Field options must be supplied');
		if (_.t(options.name)) throw new TypeError('A name is required for all fields');
		if (_.t(options.type)) throw new TypeError('A type is required for all fields');

		// set rules array
		if (_.t(options.rules)) options.rules = [];
		else if (_.t(options.rules, Array)) throw new TypeError('the rules must be defined as an array');

		// set common top level attributes
		options.attributes = _.extend(options.attributes || {}, {
			name  : options.name,
			id    : options.id,
			type  : options.type,
			value : options.value
		});

		_.extend(this, {
			name       : options.name,
			type       : options.type,
			label      : options.label,
			attributes : options.attributes,
			rules      : options.rules,
			extra      : options.extra,
			errors     : {}
		});

		// setup template
		this.template = options.template || this.getTemplate();
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

	/**
	 * Decorate Form and Field with Renderer
	 */
	for (var prop in Renderer) {
		Form.prototype[prop] = Renderer[prop];
		Field.prototype[prop] = Renderer[prop];
	}

	/**
	 * Return modules
	 */
	return {
		Form  : Form,
		Field : Field
	};

})(window._, UniversalFormRenderer);
