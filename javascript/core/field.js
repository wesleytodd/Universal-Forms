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
		// force instantiation of new object
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

		if (['textarea', 'select'].indexOf(type) !== -1) {
			options.attributes.type = type;
		}

        this.name       = name;
        this.type       = type;
		this.value      = options.value || '';
        this.label      = options.label;
        this.attributes = options.attributes;
        this.rules      = options.rules;
        this.options    = options;
        this.errors     = {};

		Field.trigger(this, 'init');

	};

	/**
	 * Set error on field
	 */
	Field.prototype.setError = function(type, message) {
		this.errors[type] = message;
		Field.trigger(this, 'setError');
	};

	/**
	 * Clear error
	 */
	Field.prototype.clearError = function(type) {
		if (typeof this.errors[type] !== 'undefined') return delete this.errors[type];
		if (typeof type === 'undefined') this.errors = {};
		Field.trigger(this, 'clearError');
	};

	/**
	 * Plugin/Driver Hooks
	 */
	Field.on = function(evt, fnc) {
		if (typeof Field._hooks === 'undefined') Field._hooks = {};
		if (typeof Field._hooks[evt] === 'undefined') Field._hooks[evt] = [];
		Field._hooks[evt].push(fnc);
	};

	Field.trigger = function(ctx, evt) {
		if (typeof Field._hooks === 'undefined' || Field._hooks[evt] === 'undefined') return;
		for (var i = 0, l = Field._hooks[evt].length; i < l; i++) {
			Field._hooks[evt][i].apply(ctx, Array.prototype.slice.call(arguments, 2));
		}
	};

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
