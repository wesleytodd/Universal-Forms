<div class="field-wrap <%= wrapperClasses %>" id="wrapper-<%= id %>">
	<% if(typeof label !== 'undefined' && label !== ''){ %>
		<label for="field-<%= id %>"><%= label %></label>
	<% } %>
	<%= field %>
</div>
