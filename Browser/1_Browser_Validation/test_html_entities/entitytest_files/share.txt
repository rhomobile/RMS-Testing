/*
 * dynamically inject the sharing links after the title
 */
	var addthis_config = {
		'data_ga_property':'UA-328425-1',
		'data_track_clickback': true,
		'pubid':'ra-4e0edbea01daaeb5',
		//'services_compact': 'google_plusone, facebook, twitter, more',
		'ui_click': true,
		'ui_cobrand': 'FileFormat.Info'
	};
	
	$(document).ready(function() {
			
			var shareDiv = $("<span>");
			shareDiv.addClass("addthis_toolbox addthis_default_style addthis_32x32_style");
			shareDiv.append($("<a>").addClass("addthis_button_google_plusone").attr("g:plusone:count", "false"));
			shareDiv.append($("<a>").addClass("addthis_button_stumbleupon"));
			shareDiv.append($("<a>").addClass("addthis_button_reddit"));
			shareDiv.append($("<a>").addClass("addthis_button_twitter"));
			shareDiv.append($("<a>").addClass("addthis_button_preferred_1"));
			shareDiv.append($("<a>").addClass("addthis_button_compact"));
			
			var title = $("h1").first();
			var table = $("<table>"); //.css("width", "100%");
			title.before(table);
			table.append($("<tr>")
						.append($("<td>").append(title))
						.append($("<td>").append(shareDiv))
						);
			
			addthis.init();
	});
