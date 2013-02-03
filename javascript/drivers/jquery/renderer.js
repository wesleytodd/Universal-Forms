(function($, UniversalForms) {

	/**
	 * Generic attribute template
	 */
	var tmplAttributes = $.template("<% for (var attr in obj) print(' ' + attr + '=\"' + obj[attr] + '\"') %>");

	/**
	 * Form renderer
	 */
	var form = {};

	/**
	 * Render whole form
	 */
	form.render = function($selector) {
		if (typeof $selector === 'string') {
			$selector = $($selector);
		}

		var $out = $(this.open() + this.close());
		this.eachField(function(field) {
			$out.append(field.render());
		});

		this.$el = $out;

		if ($selector instanceof $) {
			return $selector.html(this.$el);
		} else {
			return this.$el;
		}
	};

	/**
	 * Open form
	 */
	form.open = function() {
		return "<form" + tmplAttributes(this.attributes) + ">";
	};

	/**
	 * Close form
	 */
	form.close = function() {
		return "</form>";
	};

	form.field = function(name) {
		return this.fields[name].render();
	};

	// Decorate Form prototype
	for (var method in form) {
		UniversalForms.Form.prototype[method] = form[method];
	};

	/**
	 * Field renderer
	 */
	UniversalForms.Field.prototype.render = function(tmpl) {
		if (typeof tmpl === 'undefined') {
			tmpl = fieldTemplates[this.type];
		}
		if (tmpl) {
			this.$el = $(tmplContainer($.extend({
				tmplAttributes : tmplAttributes,
				tmplInput : tmplInput,
				tmplField : tmpl
			}, this)));
			return this.$el;
		}
	};

	var tmplContainer = $.template([
		"<div class=\"field-wrap <%= type %>\">",
			"<%= (typeof label !=='undefined') ? '<label for=\"' + attributes.id + '\">' + label + '</label>' : '' %>",
			"<%= obj.tmplField(obj) %>",
		"</div>"
	].join('\n'));

	var tmplInput = $.template("<input <%= obj.tmplAttributes(attributes) %>/>");

	var fieldTemplates = {
		textarea : $.template("<textarea <%= obj.tmplAttributes(attributes) %>><%= value %></textarea>"),
		select   : $.template([
			"<select <%= obj.tmplAttributes(attributes) %>>",
				"<% for (var val in options.options)", 
					"print('<option value=\"' + val + '\"' + ((val == value) ? ' selected' : '') + '>' + options.options[val] + '</option>') %>",
			"</select>"
		].join('\n')),
		radio    : $.template(''),
		checkbox : $.template(''),
		text     : tmplInput,
		password : tmplInput,
		submit   : tmplInput,
		hidden   : tmplInput,
		email    : tmplInput,
		search   : tmplInput,
		date     : tmplInput,
		datetime : tmplInput,
		file     : tmplInput,
		number   : tmplInput,
		range    : tmplInput,
		tel      : tmplInput,
		time     : tmplInput,
		url      : tmplInput,
		color    : tmplInput,
		month    : tmplInput,
		week     : tmplInput
	};

})(jQuery, UniversalForms);
