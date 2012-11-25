if(typeof window == 'undefined'){
	var Form = process.env.MODULE_COV
		? require('./coverage/module.js')
		: require('../module.js')
	;
}

describe('Universal Forms: #Form', function(){
	it('should setup a Form instance with the correct fields', function(){
		var f = UniversalForm.Form();
		expect(f).to.be.a(UniversalForm.Form);
		expect(f.attributes).to.be.an('object');
		expect(f.fields).to.be.an('object');
	});

	it('should add attributes passed in on creation', function(){
		var f = UniversalForm.Form({
			id     : 'form-id',
			method : 'POST',
			action : '/submit'
		});
		expect(f.attributes.id).to.be('form-id');
		expect(f.attributes.method).to.be('POST');
		expect(f.attributes.action).to.be('/submit');
		expect(f.attributes.class).to.be(undefined);

		var f1 = UniversalForm.Form({
			attributes : {
				id     : 'form-id',
				method : 'POST',
				action : '/submit'
			}
		});
		expect(f.attributes.id).to.be('form-id');
		expect(f.attributes.method).to.be('POST');
		expect(f.attributes.action).to.be('/submit');
		expect(f.attributes.class).to.be(undefined);
	});

	it('should add fields passed in on creation', function(){
		var f = UniversalForm.Form({
			fields : [
				{
					name : 'field1',
					type : 'text'
				},
				{
					name : 'field2',
					type : 'text'
				},
				{
					name : 'field3',
					type : 'text'
				}
			]
		});
		expect(f.fields).to.have.key('field1');
		expect(f.fields).to.have.key('field2');
		expect(f.fields).to.have.key('field3');
	});

});

describe('Universal Forms: #Field', function(){
	it('should setup a new field object', function(){
		expect(UniversalForm.Field).to.throwException();
		var f = UniversalForm.Field({
			name : 'field1',
			type : 'text'
		});
		expect(f).to.be.a(UniversalForm.Field);
	});
});

describe('Universal Forms: Usage', function(){
	it('should generate a form with markup', function(){

		var f = UniversalForm.Form({
			id     : 'form-id',
			method : 'POST',
			action : '/submit',
			fields : [
				{
					name  : 'field1',
					label : 'Field 1',
					type  : 'text',
					attributes : {
						placeholder : 'Field...'
					}
				},
				{
					name  : 'field2',
					label : 'Field 2',
					type  : 'textarea',
					value : 'Example text.'
				},
				{
					name : 'field3',
					type : 'select',
					label : 'Field 3',
					options : {
						'option1' : 'Option 1',
						'option2' : 'Option 2',
						'option3' : 'Option 3'
					},
					value : 'option2'
				},
				{
					name    : 'field4',
					label   : 'Field 4',
					type    : 'checkbox',
					options : {
						'option1' : 'Option 1',
						'option2' : 'Option 2',
						'option3' : 'Option 3'
					}
				},
				{
					name    : 'field5',
					label   : 'Field 5',
					type    : 'radio',
					options : {
						'option1' : 'Option 1',
						'option2' : 'Option 2',
						'option3' : 'Option 3'
					}
				}
			]
		});
		$(f.render()).appendTo('body');






	});
});









