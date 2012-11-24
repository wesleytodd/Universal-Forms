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
		expect(f._attributes).to.be.an('object');
		expect(f._fields).to.be.an('object');
	});

	it('should add attributes passed in on creation', function(){
		var f = UniversalForm.Form({
			id     : 'form-id',
			method : 'POST',
			action : '/submit'
		});
		expect(f._attributes.id).to.be('form-id');
		expect(f._attributes.method).to.be('POST');
		expect(f._attributes.action).to.be('/submit');
		expect(f._attributes.class).to.be(undefined);

		var f1 = UniversalForm.Form({
			attributes : {
				id     : 'form-id',
				method : 'POST',
				action : '/submit'
			}
		});
		expect(f._attributes.id).to.be('form-id');
		expect(f._attributes.method).to.be('POST');
		expect(f._attributes.action).to.be('/submit');
		expect(f._attributes.class).to.be(undefined);
	});

	it('should add fields passed in on creation', function(){
		var f = UniversalForm.Form({
			fields : [
				{
					name : 'field1'
				},
				{
					name : 'field2'
				},
				{
					name : 'field3'
				}
			]
		});
		expect(f._fields).to.have.key('field1');
		expect(f._fields).to.have.key('field2');
		expect(f._fields).to.have.key('field3');
	});

	describe('Attributes', function(){
		it('#setAttr should set an attribute', function(){
			var f = UniversalForm.Form();
			f.setAttr('id', 'form-id');
			expect(f._attributes.id).to.be('form-id');
		});
		it('#getAttr should get an attribute', function(){
			var f = UniversalForm.Form();
			f._attributes.id = 'form-id';
			expect(f.getAttr('id')).to.be('form-id');
		});
		it('#attr should get and set attributes', function(){
			var f = UniversalForm.Form();
			f.attr('id', 'form-id');
			expect(f.attr('id')).to.be('form-id');
		});
	});

});

describe('Universal Forms: #Field', function(){
	it('should setup a new field object', function(){
		expect(UniversalForm.Field).to.throwException();
		var f = UniversalForm.Field({
			name : 'field1'
		});
		expect(f).to.be.a(UniversalForm.Field);
	});
});
