describe('Universal Forms', function() {

	describe('#Form', function() {
		
		it('Should create an instance of a Form with or without the new operator', function() {
			var form = UniversalForms.Form();
			expect(form).to.be.a(UniversalForms.Form);
			form = new UniversalForms.Form();
			expect(form).to.be.a(UniversalForms.Form);
		});

		it('Should correctly setup the options passsed in on creation', function() {
			var options = {
				id : 'id',
				method : 'POST',
				action : '/',
				attributes : {
					class : 'class'
				},
				extra : {
					extras : 'extras'
				}
			};
			var form = UniversalForms.Form(options);
			expect(form.attributes.method).to.be('POST');
			expect(form.attributes.action).to.be('/');
			expect(form.attributes.class).to.be('class');
			expect(form.formJSON).to.be(options);
		});

		it('Should add fields to a Form', function() {
			var form = UniversalForms.Form();
			form.addField('name', 'type');
			expect(form.fields).to.be.an(Object);
			expect(form.fields.name).to.be.a(UniversalForms.Field);
			expect(form.fields.name.name).to.be('name');
			expect(form.fields.name.type).to.be('type');
		});

		it('Should add fields to a form on creation', function() {
			var form = UniversalForms.Form({
				fields : [
					{
						name : 'name',
						type : 'type'
					}
				]
			});
			expect(form.fields).to.be.an(Object);
			expect(form.fields.name).to.be.a(UniversalForms.Field);
			expect(form.fields.name.name).to.be('name');
			expect(form.fields.name.type).to.be('type');
		});

		it('Should remove a field from a Form', function() {
			var form = UniversalForms.Form({
				fields : [
					{
						name : 'name',
						type : 'type'
					}
				]
			});
			expect(form.fields.name).to.be.a(UniversalForms.Field);
			form.removeField('name');
			expect(form.fields).to.be.empty();
		});

	});

	describe('#Field', function() {
		
		it('Should create an instance of a Field with or withour the new operator', function() {
			var field = UniversalForms.Field('name', 'type');
			expect(field).to.be.a(UniversalForms.Field);
			field = new UniversalForms.Field('name', 'type');
			expect(field).to.be.a(UniversalForms.Field);
		});

		it('Should throw an error if name or type is not provided or of the wrong type', function() {
			expect(function() {
				new UniversalForms.Field('name');
			}).to.throwException();
			expect(function() {
				new UniversalForms.Field(undefined, 'type');
			}).to.throwException();
			expect(function() {
				new UniversalForms.Field(null, null);
			}).to.throwException();
		});

		it('Should correctly setup the options passed in on creation', function() {
			var options = {
				id : 'id',
				label : 'Label',
				value : 'value',
				attributes : {
					class : 'class',
					placeholder : 'placeholder'
				}
			};
			var field = UniversalForms.Field('name', 'type', options);
			expect(field.name).to.be('name');
			expect(field.type).to.be('type');
			expect(field.label).to.be('Label');
			expect(field.attributes.name).to.be('name');
			expect(field.attributes.type).to.be('type');
			expect(field.attributes.id).to.be('id');
			expect(field.attributes.value).to.be('value');
			expect(field.fieldJSON).to.be(options);
		});

		it('Should set an error of a field', function() {
			var field = UniversalForms.Field('name', 'type');
			field.setError('required', 'Message');
			expect(field.errors.required).to.be('Message');
		});
		
		it('Should remove an error of a field', function() {
			var field = UniversalForms.Field('name', 'type');
			field.setError('required', 'Message');
			expect(field.errors.required).to.be('Message');
			field.clearError('required');
			expect(field.errors).to.be.empty();
			field.setError('required', 'Message');
			field.setError('other', 'Message');
			field.clearError();
			expect(field.errors).to.be.empty();
		});

	});

});
