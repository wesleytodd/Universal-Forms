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
	var Field = function(name, type, field, opts) {
		// force instantiation of new object
		if (!(this instanceof Field)) return new Field(name, type, field, opts);

		// require name & type
		if (typeof name !== 'string') throw new TypeError('A name is required for all fields');
		if (typeof type !== 'string') throw new TypeError('A type is required for all fields');

		// Setup field
		if (typeof field !== 'object') field = {};

		// set rules array
		if (typeof field.rules === 'undefined') field.rules = [];
		else if (!(field.rules instanceof Array)) throw new TypeError('the rules must be defined as an array');

		// set common top level attributes
		field.attributes        = field.attributes || {};
		field.attributes.name   = name;
		field.attributes.id     = field.id || '';

		if (['textarea', 'select'].indexOf(type) === -1) {
			field.attributes.type = type;
			field.attributes.value  = field.value || '';
		}

		this.name       = name;
		this.type       = type;
		this.value      = field.value || '';
		this.label      = field.label;
		this.attributes = field.attributes;
		this.rules      = field.rules;
		this.fieldJSON  = field;
		this.errors     = {};

		if (['select', 'radio', 'checkbox'].indexOf(this.type) !== -1) {
			this.options = field.options;
		}

		this.opts = {};
		if (typeof Field.defaultOpts !== 'undefined') {
			for (var prop in Field.defaultOpts) {
				this.opts[prop] = Field.defaultOpts[prop];
			}
		}
		if (typeof opts !== 'undefined') {
			for (var prop in opts) {
				this.opts[prop] = opts[prop];
			}
		}
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
	 * Serialize
	 */
	Field.prototype.serialize = function(toJSON) {
		var obj = {
			name       : this.name,
			type       : this.type,
			value      : this.value,
			label      : this.label,
			rules      : this.rules,
			errors     : this.errors
		};
		if (['select', 'radio', 'checkbox'].indexOf(this.type) !== -1) {
			obj.options = this.options;
		}
		toJSON = (typeof toJSON !== 'undefined') ? toJSON : false;
		if (toJSON) {
			return JSON.stringify(obj);
		} else {
			return obj;
		}
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
	 * This is the main interface for the library.  This object handles the state of the form
	 * and maintains an array of all fields.
	 */
	var Form = function(form, opts) {
		// force instantiation of new object
		if (!(this instanceof Form)) return new Form(form, opts);

		// setup form
		if (typeof form === 'undefined') form = {};

		// set common top level attributes
		form.attributes        = form.attributes || {};
		form.attributes.id     = form.id;
		form.attributes.method = form.method || 'POST';
		form.attributes.action = form.action;

		this.attributes = form.attributes;
		this.fields     = {};
		this.formJSON   = form;

		// setup and process fields
		if (typeof form.fields === 'undefined') form.fields = [];
		else if (!(form.fields instanceof Array)) throw new TypeError('Fields must be defined as an array');

		var len = form.fields.length;
		for (var i = 0; i < len; i++) {
			this.addField(form.fields[i].name, form.fields[i].type, form.fields[i]);
		};

		this.opts = {};
		if (typeof Form.defaultOpts !== 'undefined') {
			for (var prop in Form.defaultOpts) {
				this.opts[prop] = Form.defaultOpts[prop];
			}
		}
		if (typeof opts !== 'undefined') {
			for (var prop in opts) {
				this.opts[prop] = opts[prop];
			}
		}

		Form.trigger(this, 'init');

	};

	/**
	 * Add a new field to the form
	 */
	Form.prototype.addField = function(name, type, field, opts) {
		// If just a Field object was passed in, add it
		if (name instanceof UniversalForms.Field) return this.fields[name.name] = name;

		// Otherwise, create a new field object and add it
		return this.fields[name] = new UniversalForms.Field(name, type, field, opts);

		Form.trigger(this, 'addField');
	};

	/**
	 * Remove a field by name
	 */
	Form.prototype.removeField = function(name) {
		if (typeof this.fields[name] !== 'undefined') delete this.fields[name];
		Form.trigger(this, 'removeField');
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
