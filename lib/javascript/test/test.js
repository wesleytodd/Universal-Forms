if(typeof window == 'undefined'){
	var Form = process.env.MODULE_COV
		? require('./coverage/module.js')
		: require('../module.js')
	;
}

describe('Universal Forms', function(){
	it('should setup a Form instance', function(){
		var f = UniversalForm();
	});
});
