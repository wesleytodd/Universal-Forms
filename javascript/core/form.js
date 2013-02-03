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

		if (typeof options.renderer !== 'undefined') {
			if (typeof options.renderer === 'function') {
				options.renderer = options.renderer(options.rendererOptions);
			}
			this.renderer = options.renderer;
		} else if (typeof formRenderer !== 'undefined') {
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
	 * Default form renderer variable
	 */
	var formRenderer;

	/**
	 * Set the default form renderer
	 */
	Form.setRenderer = function(Renderer, options) {
		formRenderer = Renderer(options);
	}

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
