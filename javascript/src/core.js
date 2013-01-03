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
	 * Default form renderer variable
	 */
	var formRenderer;

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

		if (typeof formRenderer !== 'undefined') {
			this.renderer = formRenderer;
		}

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
	 * Render form
	 */
	Form.prototype.render = function(renderer) {
		if (typeof renderer !== 'undefined') {
			return renderer.render(this);
		} else if (typeof this.renderer !== 'undefined') {
			return this.renderer.render(this);
		}
		throw new Error('A renderer function must be provided');
	}

	/**
	 * Open form
	 */
	Form.prototype.open = function(renderer) {
		if (typeof renderer !== 'undefined') {
			return renderer.open(this);
		} else if (typeof this.renderer !== 'undefined') {
			return this.renderer.open(this);
		}
		throw new Error('A renderer function must be provided');
	}

	/**
	 * Render field
	 */
	Form.prototype.field = function(name, renderer) {
		if (typeof renderer !== 'undefined') {
			return renderer.field(this, name);
		} else if (typeof this.renderer !== 'undefined') {
			return this.renderer.field(this, name);
		}
		throw new Error('A renderer function must be provided');
	}

	/**
	 * Close form
	 */
	Form.prototype.close = function(renderer) {
		if (typeof renderer !== 'undefined') {
			return renderer.close(this);
		} else if (typeof this.renderer !== 'undefined') {
			return this.renderer.close(this);
		}
		throw new Error('A renderer function must be provided');
	}

	/**
	 * Set the default form renderer
	 */
	Form.setRenderer = function(Renderer, options) {
		formRenderer = Renderer(options);
	}

	/**
	 * Default form renderer variable
	 */
	var fieldRenderer;

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
			value : options.value || ''
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

		if (typeof fieldRenderer === 'function') {
			this.renderer = fieldRenderer;
		}

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
	 * Render field
	 */
	Field.prototype.render = function(renderer) {
		if (typeof renderer !== 'undefined') {
			return renderer(this);
		} else if (typeof this.renderer !== 'undefined') {
			return this.renderer(this);
		}
		throw new Error('A renderer function must be provided');
	}

	/**
	 * Set the default field renderer
	 */
	Field.setRenderer = function(Renderer, options) {
		fieldRenderer = Renderer(options);
	}

	/**
	 * Export
	 */
	if (typeof exports !== 'undefined') {
		exports.Form = Form;
		exports.Field = Field;
	} else {
		window.UniversalForms = {
			Form : Form,
			Field : Field
		};
	}

})();
