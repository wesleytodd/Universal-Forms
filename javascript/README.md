#Universal Forms: Javascript#

The Javascript implementation is intended for use on both the client and server.  The core library and validation methods work in either, but the renderer requires platform specific code.  






The field renderer is just one function, `render`, but the form renderer is more complex:

	Form.open(form)
	Form.close(form)
	Form.field(form, name)
	Form.render(form)
