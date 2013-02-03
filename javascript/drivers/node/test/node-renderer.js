var should = require('should'),
	UniversalForms = require('../../src/core.js'),
	Field = UniversalForms.Field,
	Form = UniversalForms.Form,
	renderer = require('../../src/node-renderer.js');

describe('Node Renderer', function() {
	describe('Field', function() {
		it('Should set the default renderer', function() {
			Field.setRenderer(renderer.Field, {
				wrapperTemplate : 'src/templates/wrap.html',
				templatePath : 'src/templates/'
			});
		});
	});
	describe('Form', function() {
		it('Should set the default renderer', function() {
			Form.setRenderer(renderer.Form, {
				templatePath : 'src/templates/'
			});
		});
	});

	describe('Field Renderer', function() {
		it('Should render a text field', function() {
			var field = Field('name', 'text');
			field.render()
				.should.eql([
					'<div class="field-wrap " id="wrapper-name">\n\t\n',
					'\t<input name="name" id="name" type="text" value="" />\n\n',
					'</div>\n'
				].join(''));
		});
	});

	describe('FormRenderer', function() {
		it('Should render a form', function() {
			var form = Form({
				fields : [
					{
						'name' : 'test',
						'type' : 'text',
						'label' : 'Test'
					}
				]
			});
			var out = form.render().should.eql([
				'<form>\n',
					'<div class="field-wrap " id="wrapper-test">\n\t\n\t',
						'<label for="field-test">Test</label>\n\t\n\t',
						'<input name="test" id="test" type="text" value="" />\n\n',
					'</div>\n',
				'</form>\n'
			].join(''));
		});
	});
});
