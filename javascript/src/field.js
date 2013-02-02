/*
 * Universal Forms: Field
 * http://wesleytodd.com/
 *
 * Version 0.0.1
 *
 */
(function() {
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
		options.attributes        = options.attributes || {};
		options.attributes.name   = name;
		options.attributes.id     = options.id || name;
        options.attributes.type   = type;
        options.attributes.value  = options.value || '';

        this.name       = name;
        this.type       = type;
        this.label      = options.label;
        this.attributes = options.attributes;
        this.rules      = options.rules;
        this.options    = options;
        this.errors     = {};

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
	 * Default form renderer variable
	 */
	var fieldRenderer;

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
		exports.Field = Field;
	} else {
		window.UniversalForms = window.UniversalForms || {};
		window.UniversalForms.Field = Field;
	}

})();
