var _ = require('underscore'),
	fs = require('fs'),
	path = require('path');

/**
 * Cached Templates
 */
var templates = {};

/**
 * Load a template file
 */
function loadTemplate(template, prefix) {
	if (typeof prefix !== 'undefined') {
		template = path.join(prefix, template);
	}
	if (typeof templates[template] !== 'undefined') {
		return templates[template];
	}
	if (fs.existsSync(template)) {
		template = fs.realpathSync(template);
		var contents = fs.readFileSync(template, 'utf8');
		templates[template] = contents;
	} else {
		throw new Error('Template file does not exist');
	}
	return contents;
}

/**
 * Field Renderer
 */
exports.Field = function(options) {
	options = options || {};
	options.templatePath = options.templatePath || '';

	options.preload = options.preload || [];
	if (!(options.preload instanceof Array)) options.preload = [options.preload];

	options.preload.push(options.wrapperTemplate);

	var l = options.preload.length;
	for (var i = 0; i < l; i++) {
		//console.log(options.preload[i]);
	}

	return function(field) {
		if (typeof field.template === 'undefined') {
			switch (field.type) {
				case 'text':
					field.template = 'input.html';
					break;
				case 'select':
					field.template = 'select.html';
					break;
				case 'textarea':
					field.template = 'textarea.html';
					break;
			}
		}

		var f = _.template(loadTemplate(field.template, options.templatePath), field);
		field.field = f;
		var out = _.template(loadTemplate(options.wrapperTemplate), field);
		return out;
	}
};

/**
 * Form Renderer
 */
exports.Form = function(options) {
	options = options || {};




	return {
		open : function(form) {
			return '<form>\n';
		},
		close : function(form) {
			return '</form>\n';
		},
		field : function(form, name) {
			return form.fields[name].render();
		},
		render : function(form) {
			var out = form.open();
			for (var name in form.fields) {
				out += form.field(name);
			}
			out += form.close();
			return out;
		}
	};
	
};
