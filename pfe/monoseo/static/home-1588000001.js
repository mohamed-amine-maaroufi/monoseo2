// Home Screen

//# Translations = 100% done - 6/22/2019 - CC

	$("#incoming_data").show();

///// Global variables
	
	//var ORIGINAL_DATA_FROM_AJAX = {}; //NEVER update this, only read from it
	
	//var checked_legend = []; //for monitoring what is checked and highlighting the appropriate ones

	var format_of_date = "MMM DD YYYY"; //HH:mm:ss ZZ
	
	var am_I_pulling_data = 0;

/////

////////////////////////////////////////////////////////////////////////////////
////////// Document ready stuff

	$(document).ready( function(){
		
			//defined on page - (perl script)
			//if international user
			if (user_date_format == 2) {
				format_of_date = "DD MMM YYYY"; // HH:mm:ss ZZ
			}
				

	///// END Function
	});

//////////
////////////////////////////////////////////////////////////////////////////////
	
	function panel_javascript_after_growl(){

		let days_back = 1;

			//User needs to be order than default query days
			if (members_since_days <= 7) { days_back = 1; }		// 1
			else if (members_since_days <= 14) { days_back = 1; }	// 7
			else if (members_since_days <= 28) { days_back = 1; }	// 14
			else if (members_since_days <= 45) { days_back = 1; }	// 28
			else if (members_since_days <= 60) { days_back = 1; }	// 45
			else if (members_since_days <= 90) { days_back = 1; }	// 60

		$('#gains_project_id').append($('#header_dropdown_of_projects').html());
		$('#losses_project_id').append($('#header_dropdown_of_projects').html());

		$('#advanced_filtering_project_id').append($('#header_dropdown_of_projects').html());

		$('#losses_days').val(days_back);
		$('#gains_days').val(days_back);


		$('#main_view_days').val(main_view_days);
		$('#main_view_min').val(main_view_min);
		$('#main_view_limit').val(main_view_limit);

		$('#advanced_filtering_days').val(days_back);
		$('#advanced_filtering_tags').val('');

		$('#advanced_filtering_countries').val('');
		$('#advanced_filtering_locality').val(1);
		$('#advanced_filtering_language').val(0);
		$('#advanced_filtering_device').val('');
		
		$('#advanced_filtering_limits').val(25);

		$('#advanced_filtering_volume_min').val(0);
		$('#advanced_filtering_volume_max').val(4000000000);
		$('#advanced_filtering_cpc_min').val(0);
		$('#advanced_filtering_cpc_max').val(1000);
		$('#advanced_filtering_oci_min').val(0);
		$('#advanced_filtering_oci_max').val(100);
		$('#advanced_filtering_comp_min').val(0);
		$('#advanced_filtering_comp_max').val(100);

			gains_or_losses(1, 20, days_back, '', ''); //render Gains
			gains_or_losses(2, 20, days_back, '', ''); //render Losses
			
			advanced_filtering(20, days_back, '', '', '', '', '', '', 0, 4000000000, 0, 1000, 0, 100, 0, 100); //advanced filtering

		return 1;

	}


////////////////////////////////////////////////////////////////////////////////
///// Clicks, Buttons, and more

///// Top Projects QG Row - Query (Open click)
	
	$(".content").on('click', '.top_project_query', function(){
		
		let my_project_id = $(this).attr('data-project-id');
		let my_action = $(this).attr('data-action');

		$('.badges_' + my_project_id).removeClass('badge badge-primary color-white');

		$(this).addClass('badge badge-primary color-white badges_' + my_project_id);
		
		console_log('blue', '[+]', 'Open QG row - my_project_id=[' + my_project_id + '] / my_action=[' + my_action + ']');

			if ((my_project_id === undefined) || (my_project_id === null) || (my_action === undefined) || (my_action === null)) { return; }
		
		pull_quick_glance_data(my_project_id, my_action);
	});

///// Top Projects QG Row - Close Button

	$(".content").on('click', '.close_button', function(){
		
		let my_project_id = $(this).attr('data-project-id');

		$('.badges_' + my_project_id).removeClass('badge badge-primary color-white');

		console_log('blue', '[+]', 'Close QG row - my_project_id=[' + my_project_id + ']');

			if ((my_project_id === undefined) || (my_project_id === null)) { return; }

		close_qg_row(my_project_id);
	});
	
	
////////////////////////////////////////////////////////////////////////////////
/////
	
	function render_sparkline(project_id = 0, color = "#000000") {
	
		project_id = parseInt(project_id);

			if (project_id == 0) { return; }

		$("#top_projects_sparkline_line_" + project_id).sparkline('html', { type: 'line', width: '100%', height: 24, lineColor: color, fillColor: 'rgba(0,0,0,0)', lineWidth: 1.25, maxSpotColor: '#fff', minSpotColor: '#fff', spotColor: '#fff', spotRadius: 0, highlightSpotColor: '#fff', highlightLineColor: '#fff', disableTooltips: true });
	
		$("#top_projects_sparkline_line_" + project_id).addClass('flipspark');


	}
	
	function render_sparkline_qg_row(qg_id = 0, color = "#000000") {
	
		qg_id = parseInt(qg_id);

			if (qg_id == 0) { return; }

		$("#qg_row_" + qg_id).sparkline('html', { type: 'line', width: '100%', height: 24, lineColor: color, fillColor: 'rgba(0,0,0,0)', lineWidth: 1.25, maxSpotColor: '#fff', minSpotColor: '#fff', spotColor: '#fff', spotRadius: 0, highlightSpotColor: '#fff', highlightLineColor: '#fff' });
	
		$("#qg_row_" + qg_id).addClass('flipspark');


	}


	function render_sparkline_gains_losses(qg_id = 0, color = "#000000", the_action = 1) {
	
		qg_id = parseInt(qg_id);

			if (qg_id == 0) { return; }

		$("#qg_" + the_action + "_" + qg_id).sparkline('html', { type: 'line', width: '100%', height: 24, lineColor: color, fillColor: 'rgba(0,0,0,0)', lineWidth: 1.25, maxSpotColor: '#fff', minSpotColor: '#fff', spotColor: '#fff', spotRadius: 0, highlightSpotColor: '#fff', highlightLineColor: '#fff' });
	
		$("#qg_" + the_action + "_" + qg_id).addClass('flipspark');


	}


	function render_sparkline_advanced_filtering(qg_id = 0, color = "#000000") {
	
		qg_id = parseInt(qg_id);

			if (qg_id == 0) { return; }

		$("#af_" + qg_id).sparkline('html', { type: 'line', width: '100%', height: 24, lineColor: color, fillColor: 'rgba(0,0,0,0)', lineWidth: 1.25, maxSpotColor: '#fff', minSpotColor: '#fff', spotColor: '#fff', spotRadius: 0, highlightSpotColor: '#fff', highlightLineColor: '#fff' });
	
		$("#af_" + qg_id).addClass('flipspark');


	}


////////////////////////////////////////////////////////////////////////////////
///// 



		function top_projects_query(project_id = 0, action = 0) {

				if ((project_id == 0) || (action == 0)) { return; }
				if (am_I_pulling_data != 0) { return; }
				
				$('#row_top_projects_' + project_id).after("<tr class='row_top_projects_child_" + project_id + "'><td colspan='9' id='a_qg_top_row_" + project_id + "' class='bg-sw-dark-blue'><center><span class='color-white'>(Loading...)</span></center></td></tr>");

			am_I_pulling_data = 1;
			data_loaded = 0;

				var req_ajax = $.ajax({
					url: '/q/a/home/project/',
					type: "POST",
					dataType: "json",
					data: "project_id=" + project_id + "&action=" + action + "&wid=" + WID,
					beforeSend: BeforeDataReceive,
					success: onDataReceived,
					error: function (request, status, error) {
						//alert(request.responseText);
						notify(Language.serp_view_ajax_error, Language.serp_view_ajax_error_internal_server, 'danger', 60000, 'zmdi zmdi-help');
					}
				}); //.success( /* can be a function call */ );
			
				// we can add even more callbacks
				//req_ajax.success(function(){ ... });
		}
		
		function BeforeDataReceive() {

			//$('#SERP_keyword_phrase').text('');
			//$('#SERP_project_url').attr('href','/q/projects/');
			//$('#SERP_project_country').attr('src','/img/members/flags/.png');
			//$("#clickdata1").html('');

			
		}
		
		function onDataReceived(data_series) {
						
			let table_label = "(Error Detected...)";
						
				if ((data_series.success === undefined) || (data_series.success === null)) {
					//from interface-x.js
					this_sessions_has_expired();
					return;
				}
			
			//Actions				
				if (data_series["query"].action == 1) { table_label = "Rising"; }
				else if (data_series["query"].action == 2) { table_label = "Dropping"; }
				else if (data_series["query"].action == 3) { table_label = "#1 Position"; }
				else if (data_series["query"].action == 4) { table_label = "#2-5 Positions"; }
				else if (data_series["query"].action == 5) { table_label = "#6-10 Positions"; }
				else if (data_series["query"].action == 6) { table_label = "#11-21 Positions"; }
				else if (data_series["query"].action == 7) { table_label = "#21-30 Positions"; }
				

			//Process data
			data_table = "<table class='qg_table'><tbody>";

			data_table += "<tr class='bg-indigo p-2 m-2'><th colspan='12s'><h5 class='color-white'>" + table_label + "&nbsp; &nbsp; <small class='color-yellow'>Results: <b>" + data_series.total_results + "</b></small></h5></th><th colspan='1' style='text-align: center;'><i class='zmdi zmdi-close-circle color-yellow close_button' data-project-id='" + data_series["query"].project_id + "' style='font-size: 1.2em;'></i></th></tr>";

			data_table += "<tr class='bg-blue p-2 m-3 color-white second_row'><th>#</th><th>Domain / URL</th><th>Keyword</th><th>Monthly Volume</th><th>Chart</th><th>Current</th><th>Previous</th><th>7 Days</th><th>14 Days</th><th>28 Days</th><th>45 Days</th><th>60 Days</th><th>90 Days</th></tr>";
			
			let my_loop = 0;
			let sparkline_colored = {};

				if ((data_series.success === true)) {

					Object.keys(data_series["quick_glance"]).sort(function(a,b){
						var x = data_series["quick_glance"][a].keyword.toLowerCase();
						var y = data_series["quick_glance"][b].keyword.toLowerCase();
						return x < y ? -1 : x > y ? 1 : 0;
					}).forEach(function(qg_row_id){
					
						//console_log('blue', '[+]', '[L208] - keyword=[' + data_series["quick_glance"][qg_row_id].keyword + ']');
						
						//get trend_data
						
						let trendy_data = "";
						let first_data_point = 0;
						let last_data_point = 0;
						let sparkline_color = "#607D8B"; //default blue
						
							Object.keys(data_series["quick_glance"][qg_row_id].trend_data_json).sort(function(a,b){return a-b}).forEach(function(data){
							
								if (data_series["quick_glance"][qg_row_id].trend_data_json[data] === null) { return; }
								if (data_series["quick_glance"][qg_row_id].trend_data_json[data].length < 1) { return; }

								if (trendy_data.length > 0) { trendy_data += ", "; }
							
								if (first_data_point == 0) { first_data_point = data_series["quick_glance"][qg_row_id].trend_data_json[data]; }
								last_data_point = data_series["quick_glance"][qg_row_id].trend_data_json[data];
							
								trendy_data += data_series["quick_glance"][qg_row_id].trend_data_json[data];
							});
						
							if (first_data_point > last_data_point) {
								//Increase
								sparkline_colored[qg_row_id] = "#32c787";
							}else if (first_data_point < last_data_point) {
								//Decrease
								sparkline_colored[qg_row_id] = "#ff0099";
							}else {
								//Same
								sparkline_colored[qg_row_id] = "#2196F3";
							}
					
						
						my_loop++;
						
						if (parseInt(data_series["quick_glance"][qg_row_id].volume) <= 2) { data_series["quick_glance"][qg_row_id].volume = 0; }
						
						if (user_date_format == 1) {
							data_series["quick_glance"][qg_row_id].volume = numberWithCommas(parseInt(data_series["quick_glance"][qg_row_id].volume));
						}
						
						data_table += "<tr><td align='center'>" + my_loop + "</td><td style='max-width: 300px; word-break: break-all;'><a class='color-green' href='" + data_series["quick_glance"][qg_row_id].pos_url + "' target='_blank'><u>" + data_series["quick_glance"][qg_row_id].pos_url + "</u> <i class='zmdi zmdi-arrow-right-top'></i></a><br>(" + data_series["quick_glance"][qg_row_id].domain + ")</td><td>&nbsp; <a href='/q/serp/" + data_series["query"].project_id + "/" + data_series["quick_glance"][qg_row_id].keyword_id + "/'><i class='zmdi zmdi-key'></i> " + data_series["quick_glance"][qg_row_id].keyword + "</a></td><td align='center'>" + data_series["quick_glance"][qg_row_id].volume + "</td><td align='center'><div id='qg_row_" + qg_row_id + "' style='max-width: 100px;'>" + trendy_data + "</div><br>" + data_series["quick_glance"][qg_row_id].date_social + "</td><td align='center'>" + data_series["quick_glance"][qg_row_id].pos_0 + "</td><td align='center'>" + data_series["quick_glance"][qg_row_id].pos_1 + "</td><td align='center'>" + data_series["quick_glance"][qg_row_id].pos_7 + "</td><td align='center'>" + data_series["quick_glance"][qg_row_id].pos_14 + "</td><td align='center'>" + data_series["quick_glance"][qg_row_id].pos_28 + "</td><td align='center'>" + data_series["quick_glance"][qg_row_id].pos_45 + "</td><td align='center'>" + data_series["quick_glance"][qg_row_id].pos_60 + "</td><td align='center'>" + data_series["quick_glance"][qg_row_id].pos_90 + "</td></tr>";


					});


				}else {
					data_table += "<tr style='background-color: #ffffff;'><td>Total Results: " + data_series.total_results + "</td></tr>";
				}

			data_table += "</tbody></table>";
		
			//Add Data to row
			add_row(data_series["query"].project_id, data_table);

			//
			Object.keys(sparkline_colored).sort(function(a,b){return a-b}).forEach(function(qg_row_id){
				render_sparkline_qg_row(qg_row_id, sparkline_colored[qg_row_id]);
			});

			am_I_pulling_data = 0;
	
		}



////////////////////
//

		function pull_quick_glance_data(project_id = 0, action = 0) {
			
			$('#quick_projects').removeClass().addClass('col-sm-12 col-md-12 col-lg-12');
			$('#quick_serp_view').removeClass().addClass('col-sm-12 col-md-3 col-lg-3');
			
				if ((project_id == 0) || (action == 0)) { return; }
			
				$('.row_top_projects_child_' + project_id).remove();
			
			top_projects_query(project_id, action);
			
		}

		function add_row(project_id, data) {
			
			$('#a_qg_top_row_' + project_id).html(data);
			
		}
		
		function close_qg_row(project_id = 0) {

			if ((project_id == 0)) { return; }

			$('.row_top_projects_child_' + project_id).remove();
		}

////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////		
////////// Web Worker

		//// Home Screen - Main Filter
		$(document).on('click', '#main_view_filter', function(){

			let main_view_days = parseInt($('#main_view_days').val());
			let main_view_min = parseInt($('#main_view_min').val());
			let main_view_limit = parseInt($('#main_view_limit').val());
			
			let new_url = window.location.pathname + "?limit=" + main_view_limit + "&days=" + main_view_days + "&min=" + main_view_min;
			
			console_log('yellow', '[+340]', 'new_url=[' + new_url + ']');

			window.location.href = new_url;

		});

//////////////////////////////////////// Gains And Losses widget

		//// Click on Gains or Loss button
		$(document).on('click', '.best_gains_losses_select', function(){

			$('#incoming_data').show();
			
			let exact_action = parseInt($(this).attr('data-action'));

				if (exact_action == 1) {

					let exact_limit = $('#gains_limits').val();
					let exact_tag = $('#gains_tags').val();
					let exact_days = $('#gains_days').val();
					let exact_project_id = $('#gains_project_id').val();

					gains_or_losses(exact_action, exact_limit, exact_days, exact_project_id, exact_tag);
				
				}
			
				if (exact_action == 2) {

					let exact_limit = $('#losses_limits').val();
					let exact_tag = $('#losses_tags').val();
					let exact_days = $('#losses_days').val();
					let exact_project_id = $('#losses_project_id').val();

					gains_or_losses(exact_action, exact_limit, exact_days, exact_project_id, exact_tag);
				
				}
			
			$('#incoming_data').fadeOut(500);
		});

		
	//Query Gains and Losses
	function gains_or_losses(the_action = 1, the_limit = 20, the_days = 90, the_project_id, the_orm){

		if (the_action == 1) {
			$('#best_x_gains').html('<tr><td class="bg-blue-grey color-white text-center">(Processing...)</td></tr>');
		}

		if (the_action == 2) {
			$('#worse_x_losses').html('<tr><td class="bg-blue-grey color-white text-center">(Processing...)</td></tr>');
		}


	   var workerHome = new Worker('/q-assets/_web_worker/home-gains_losses-1585000000.js');
	   
	   if (the_project_id == null) { the_project_id = ""; }
	   if (the_orm == null) { the_orm = ""; }

	   workerHome.postMessage({'wid': WID, 'orm': the_orm, 'project_id': the_project_id, 'action' : the_action, 'days' : the_days, 'limit' : the_limit});
	   workerHome.onmessage = function (event) {

		   	if (event.data.success !== undefined && event.data.success !== null) {		

				if (event.data.success === false) {

					if (the_action == 1) {
						$('#best_x_gains').html('<tr><td class="text-center color-blue">(No Data)</td></tr>');
					}

					if (the_action == 2) {
						$('#worse_x_losses').html('<tr><td class="text-center color-blue">(No Data)</td></tr>');
					}
					
		   		} else if (event.data.success === true) {

					console_log('green', '[+]', "Home - QG - Gains Loss - Action=[" + the_action + "] - RunTime=[" + event.data.run_time + "]");

					//Visual update of the My Home button.
					//$('#my_home_url').attr('href', event.data.new_home_url).addClass('color-white');

					let my_loop = 0;
					let sparkline_colored = {};

					//Process data
					let data_table = "<thead><tr class='bg-deep-purple color-white'><th>Domain/URL</th><th>Keyword</th><th class='hidden-lg-down'>Chart</th><th>Current</th><th nowrap>" + the_days + " Days Ago</th><th>Movement</th></tr></thead>";

					Object.keys(event.data["quick_glance"]).sort(function(a,b){
						var x = event.data["quick_glance"][a].keyword.toLowerCase();
						var y = event.data["quick_glance"][b].keyword.toLowerCase();
						return x < y ? -1 : x > y ? 1 : 0;
					}).forEach(function(qg_row_id){
				
						//console_log('blue', '[+]', '[L373] - keyword=[' + event.data["quick_glance"][qg_row_id].keyword + ']');
					
						//get trend_data
					
						let trendy_data = "";
						let first_data_point = 0;
						let last_data_point = 0;
						let sparkline_color = "#607D8B"; //default blue
					
						if ($(window).width() > 1200) {
					
							Object.keys(event.data["quick_glance"][qg_row_id].trend_data_json).sort(function(a,b){return a-b}).forEach(function(data){
						
								if (event.data["quick_glance"][qg_row_id].trend_data_json[data] === null) { return; }
								if (event.data["quick_glance"][qg_row_id].trend_data_json[data].length < 1) { return; }

								if (trendy_data.length > 0) { trendy_data += ", "; }
						
								if (first_data_point == 0) { first_data_point = event.data["quick_glance"][qg_row_id].trend_data_json[data]; }
								last_data_point = event.data["quick_glance"][qg_row_id].trend_data_json[data];
						
								trendy_data += event.data["quick_glance"][qg_row_id].trend_data_json[data];
							});
					
							if (first_data_point > last_data_point) {
								//Increase
								sparkline_colored[qg_row_id] = "#32c787";
							}else if (first_data_point < last_data_point) {
								//Decrease
								sparkline_colored[qg_row_id] = "#ff0099";
							}else {
								//Same
								sparkline_colored[qg_row_id] = "#2196F3";
							}
							
						}

						my_loop++;
					
							if (parseInt(event.data["quick_glance"][qg_row_id].volume) <= 2) { event.data["quick_glance"][qg_row_id].volume = 0; }
					
							if (user_date_format == 1) {
								event.data["quick_glance"][qg_row_id].volume = numberWithCommas(parseInt(event.data["quick_glance"][qg_row_id].volume));
							}

						//Tag
						let the_tag = "<span class='badge badge-success badge-pill m-2'>Positive</span>";

							if (event.data["quick_glance"][qg_row_id].orm == -1) {
								the_tag = "<span class='badge badge-danger badge-pill m-2'>Negative</span>";
							}

							if (event.data["quick_glance"][qg_row_id].orm == 10) {
								the_tag = "<span class='badge badge-default badge-pill m-2'>No Value</span>";
							}

							if (event.data["quick_glance"][qg_row_id].orm == 0) {
								the_tag = "<span class='badge badge-primary badge-pill m-2'>Neutral</span>";
							}

						//Gain or Loss
						let the_movement = "";
							
							if (the_action == 1) {
								the_movement = "<b class='color-green'>" + event.data["quick_glance"][qg_row_id].gain + "</b> <i class='zmdi zmdi-trending-up color-green'></i>";
							}

							if (the_action == 2) {
								the_movement = "<b class='color-red'>" + event.data["quick_glance"][qg_row_id].loss + "</b> <i class='zmdi zmdi-trending-down color-red'></i>";
							}
							
					
						data_table += "<tr data-loop='" + my_loop + "' data-order='" + event.data["quick_glance"][qg_row_id].order + "'><td style='max-width: 300px; word-break: break-all;'><a class='color-green' href='" + event.data["quick_glance"][qg_row_id].pos_url + "' target='_blank'><u>" + event.data["quick_glance"][qg_row_id].pos_url + "</u> <i class='zmdi zmdi-arrow-right-top'></i></a><br>(" + event.data["quick_glance"][qg_row_id].domain + ") " + the_tag + " </td><td>&nbsp; <a href='/q/serp/" + event.data["quick_glance"][qg_row_id].project_id + "/" + event.data["quick_glance"][qg_row_id].keyword_id + "/'><i class='zmdi zmdi-key'></i> " + event.data["quick_glance"][qg_row_id].keyword + "</a><br><small>(" + event.data["quick_glance"][qg_row_id].volume + " monthly)</small></td><td align='center' class='hidden-lg-down'><div id='qg_" + the_action + "_" + qg_row_id + "' style='max-width: 60px;'>" + trendy_data + "</div><br>" + event.data["quick_glance"][qg_row_id].date_social + "</td><td align='center'>" + event.data["quick_glance"][qg_row_id].pos_0 + "</td><td align='center'>" + event.data["quick_glance"][qg_row_id].pos_day + "</td><td align='center'>" + the_movement + "</td></tr>";


					});


						if (the_action == 1) {
							$('#best_x_gains').html(data_table);
						}

						if (the_action == 2) {
							$('#worse_x_losses').html(data_table);
						}

					//Generate Sparkline Charts
					Object.keys(sparkline_colored).sort(function(a,b){return a-b}).forEach(function(qg_row_id){
						render_sparkline_gains_losses(qg_row_id, sparkline_colored[qg_row_id], the_action);
					});


		   		}

		   	}		
	   };

	}
		
		
//////////////////////////////////////// Advanced Filtering Widget

		// Update Country and Locality selection if a project is selected
		$(document).on('change', '#advanced_filtering_project_id', function(){
		
			$('#advanced_filtering_countries').val('');
			$('#advanced_filtering_locality').val(1);
			$('#advanced_filtering_language').val(0);
			$('#advanced_filtering_device').val('');
			
				if ($(this).val().length > 0) {

					$('#advanced_filtering_countries').prop("disabled", true);
					$('#advanced_filtering_locality').prop("disabled", true);
					$('#advanced_filtering_language').prop("disabled", true);
					$('#advanced_filtering_device').prop("disabled", true);
				
				}else {

					$('#advanced_filtering_countries').prop("disabled", false);
					$('#advanced_filtering_locality').prop("disabled", false);
					$('#advanced_filtering_language').prop("disabled", false);
					$('#advanced_filtering_device').prop("disabled", false);
				
				}

		
		});

	
		// Update Locality if a country is selected
		$(document).on('change', '#advanced_filtering_countries', function(){
			
			let selected_country = $(this).val();

			console_log('green', '[+]', "Home - QG - Advanced Filtering - Country Selected=[" + selected_country + "]");
			
			if (selected_country.length > 0) {
				//Hide non-country locations

				$("#advanced_filtering_locality > option").each(function() {

					let data_country = $(this).attr('data-country');
					
						if ((data_country === undefined) || (data_country === null)) { return; }
					
						if (data_country != selected_country) {
							console_log('red', '[+WRONG COUNTRY]', "Home_QG_AF = Selected_Country=[" + selected_country + "] Current=[" + data_country + "]");
							$(this).hide();
						}else {
							$(this).show();
						}

				});
				
			}else {
				//Reveal ALL

				$("#advanced_filtering_locality > option").each(function() {
					$(this).show();
				});

			}
			
			
		});
	

		//// Click on Gains or Loss button
		$(document).on('click', '#advanced_filtering_btn', function(){

			$('#incoming_data').show();
			
					let exact_advanced_filtering_limits = $('#advanced_filtering_limits').val();
					let exact_advanced_filtering_tags = $('#advanced_filtering_tags').val();
					let exact_advanced_filtering_days = $('#advanced_filtering_days').val();
					let exact_advanced_filtering_project_id = $('#advanced_filtering_project_id').val();

					let exact_advanced_filtering_countries = $('#advanced_filtering_countries').val();
					let exact_advanced_filtering_locality = $('#advanced_filtering_locality').val();
					let exact_advanced_filtering_language = $('#advanced_filtering_language').val();
					let exact_advanced_filtering_device = $('#advanced_filtering_device').val();

					let exact_advanced_filtering_volume_min = $('#advanced_filtering_volume_min').val();
					let exact_advanced_filtering_volume_max = $('#advanced_filtering_volume_max').val();
					let exact_advanced_filtering_cpc_min = $('#advanced_filtering_cpc_min').val();
					let exact_advanced_filtering_cpc_max = $('#advanced_filtering_cpc_max').val();
					let exact_advanced_filtering_oci_min = $('#advanced_filtering_oci_min').val();
					let exact_advanced_filtering_oci_max = $('#advanced_filtering_oci_max').val();
					let exact_advanced_filtering_comp_min = $('#advanced_filtering_comp_min').val();
					let exact_advanced_filtering_comp_max = $('#advanced_filtering_comp_max').val();

					advanced_filtering(exact_advanced_filtering_limits, exact_advanced_filtering_days, exact_advanced_filtering_project_id, exact_advanced_filtering_tags, exact_advanced_filtering_countries, exact_advanced_filtering_locality, exact_advanced_filtering_language, exact_advanced_filtering_device, exact_advanced_filtering_volume_min, exact_advanced_filtering_volume_max, exact_advanced_filtering_cpc_min, exact_advanced_filtering_cpc_max, exact_advanced_filtering_oci_min, exact_advanced_filtering_oci_max, exact_advanced_filtering_comp_min, exact_advanced_filtering_comp_max);
							
			$('#incoming_data').fadeOut(500);
		});

		
	//Query Advanced Filtering
	function advanced_filtering(the_limit = 20, the_days = 90, the_project_id, the_orm, countries, locality, language, device, vol_min, vol_max, cpc_min, cpc_max, oci_min, oci_max, comp_min, comp_max){

			$('#best_x_advanced_filtering').html('<tr><td class="bg-blue-grey color-white text-center">(Processing...)</td></tr>');

	   var workerHome = new Worker('/q-assets/_web_worker/home-advanced_filtering-1585000000.js');
	   
		   if (the_project_id == null) { the_project_id = ""; }
		   if (the_orm == null) { the_orm = ""; }

	   workerHome.postMessage({'wid': WID, 'orm': the_orm, 'project_id': the_project_id, 'days' : the_days, 'limit' : the_limit, 'countries' : countries, 'locality' : locality, 'language' : language, 'device' : device, 'vol_min' : vol_min, 'vol_max' : vol_max, 'cpc_min' : cpc_min, 'cpc_max' : cpc_max, 'oci_min' : oci_min, 'oci_max' : oci_max, 'comp_min' : comp_min, 'comp_max' : comp_max});
	   workerHome.onmessage = function (event) {

		   	if (event.data.success !== undefined && event.data.success !== null) {		

				if (event.data.success === false) {

						$('#best_x_advanced_filtering').html('<tr><td class="text-center color-blue">(No Data)</td></tr>');
					
		   		} else if (event.data.success === true) {

					console_log('green', '[+]', "Home - QG - Advanced Filtering - RunTime=[" + event.data.run_time + "]");

					//Visual update of the My Home button.
					//$('#my_home_url').attr('href', event.data.new_home_url).addClass('color-white');

					let my_loop = 0;
					let sparkline_colored = {};

					//Process data
					let data_table = "<thead><tr class='bg-deep-purple color-white'><th>Domain/URL</th><th>Keyword</th><th class='hidden-lg-down'>Chart</th><th>Current</th><th nowrap>" + the_days + " Days Ago</th><th>Movement</th><th>OCI</th><th>CPC (USD)</th><th>PPC Comp.</th><th>Locality</th><th>Device</th><th>Language</th></tr></thead>";

					Object.keys(event.data["quick_glance"]).sort(function(a,b){
						var x = event.data["quick_glance"][a].keyword.toLowerCase();
						var y = event.data["quick_glance"][b].keyword.toLowerCase();
						return x < y ? -1 : x > y ? 1 : 0;
					}).forEach(function(qg_row_id){
				
						//console_log('blue', '[+]', '[L373] - keyword=[' + event.data["quick_glance"][qg_row_id].keyword + ']');
					
						//get trend_data
					
						let trendy_data = "";
						let first_data_point = 0;
						let last_data_point = 0;
						let sparkline_color = "#607D8B"; //default blue
					
							if ($(window).width() > 1200) {
					
								Object.keys(event.data["quick_glance"][qg_row_id].trend_data_json).sort(function(a,b){return a-b}).forEach(function(data){
						
									if (event.data["quick_glance"][qg_row_id].trend_data_json[data] === null) { return; }
									if (event.data["quick_glance"][qg_row_id].trend_data_json[data].length < 1) { return; }

									if (trendy_data.length > 0) { trendy_data += ", "; }
						
									if (first_data_point == 0) { first_data_point = event.data["quick_glance"][qg_row_id].trend_data_json[data]; }
									last_data_point = event.data["quick_glance"][qg_row_id].trend_data_json[data];
						
									trendy_data += event.data["quick_glance"][qg_row_id].trend_data_json[data];
								});
					
								if (first_data_point > last_data_point) {
									//Increase
									sparkline_colored[qg_row_id] = "#32c787";
								}else if (first_data_point < last_data_point) {
									//Decrease
									sparkline_colored[qg_row_id] = "#ff0099";
								}else {
									//Same
									sparkline_colored[qg_row_id] = "#2196F3";
								}
							
							}

						my_loop++;
					
							if (parseInt(event.data["quick_glance"][qg_row_id].volume) <= 2) { event.data["quick_glance"][qg_row_id].volume = 0; }
					
							if (user_date_format == 1) {
								event.data["quick_glance"][qg_row_id].volume = numberWithCommas(parseInt(event.data["quick_glance"][qg_row_id].volume));
							}

						//Tag
						let the_tag = "<span class='badge badge-success badge-pill m-2'>Positive</span>";

							if (event.data["quick_glance"][qg_row_id].orm == -1) {
								the_tag = "<span class='badge badge-danger badge-pill m-2'>Negative</span>";
							}

							if (event.data["quick_glance"][qg_row_id].orm == 10) {
								the_tag = "<span class='badge badge-default badge-pill m-2'>No Value</span>";
							}

							if (event.data["quick_glance"][qg_row_id].orm == 0) {
								the_tag = "<span class='badge badge-primary badge-pill m-2'>Neutral</span>";
							}

						//Language Label
						let the_language = "";
					
							if (event.data["quick_glance"][qg_row_id].language.length >= 1) {
								if (event.data["quick_glance"][qg_row_id].language != 0) {
									the_language = event.data["quick_glance"][qg_row_id].language.toUpperCase();
								}
							}
						
						//Locality Label
						let the_locality = "";
						
							if (event.data["quick_glance"][qg_row_id].locality.length > 2) {
								the_locality = event.data["quick_glance"][qg_row_id].locality;
							}

						let the_device = '<i class="zmdi zmdi-desktop-mac color-blue"></i> <span class="color-blue">Desktop</span>';
							
						if (event.data["quick_glance"][qg_row_id].device == 1) {
							the_device = '<i class="zmdi zmdi-smartphone-iphone color-green"></i> <span class="color-green">Mobile</span>';
						}

						//Gain or Loss
						let the_movement = "";
							
						//The Day to compare against
							if (the_days == 1) {
								the_day = event.data["quick_glance"][qg_row_id].pos_1;
							} else if (the_days == 7) {
								the_day = event.data["quick_glance"][qg_row_id].pos_7;
							} else if (the_days == 14) {
								the_day = event.data["quick_glance"][qg_row_id].pos_14;
							} else if (the_days == 28) {
								the_day = event.data["quick_glance"][qg_row_id].pos_28;
							} else if (the_days == 45) {
								the_day = event.data["quick_glance"][qg_row_id].pos_45;
							} else if (the_days == 60) {
								the_day = event.data["quick_glance"][qg_row_id].pos_60;
							} else if (the_days == 90) {
								the_day = event.data["quick_glance"][qg_row_id].pos_90;
							} else {
								the_day = event.data["quick_glance"][qg_row_id].pos_90;
							}
							
							
							if (event.data["quick_glance"][qg_row_id].pos_0 > the_day) {
								//Loss
								the_movement = "<span style='font-size: 1.1em'><span class='color-red'>" + parseInt(event.data["quick_glance"][qg_row_id].pos_0 - the_day) + '</span> <i class="zmdi zmdi-trending-down color-red"></i></span>';
							}else if (event.data["quick_glance"][qg_row_id].pos_0 < the_day) {
								//Gain
								the_movement = "<span style='font-size: 1.1em'><span class='color-green'>" + parseInt(the_day - event.data["quick_glance"][qg_row_id].pos_0) + '</span> <i class="zmdi zmdi-trending-up color-green"></i></span>';
							}else {
								//Maintain
								the_movement = '-';
							}
							
							
					
						data_table += "<tr data-loop='" + my_loop + "' data-order='" + event.data["quick_glance"][qg_row_id].order + "'><td style='max-width: 300px; word-break: break-all;'><a class='color-green' href='" + event.data["quick_glance"][qg_row_id].pos_url + "' target='_blank'><u>" + event.data["quick_glance"][qg_row_id].pos_url + "</u> <i class='zmdi zmdi-arrow-right-top'></i></a><br>(" + event.data["quick_glance"][qg_row_id].domain + ") " + the_tag + " </td><td>&nbsp; <a href='/q/serp/" + event.data["quick_glance"][qg_row_id].project_id + "/" + event.data["quick_glance"][qg_row_id].keyword_id + "/'><img src='/img/members/flags/" + event.data["quick_glance"][qg_row_id].country + ".png' alt='" + event.data["quick_glance"][qg_row_id].country  +"' style='width: 20px; height: 20px;'> <i class='zmdi zmdi-key'></i> " + event.data["quick_glance"][qg_row_id].keyword + "</a><br><small>(" + event.data["quick_glance"][qg_row_id].volume + " monthly)</small></td><td align='center' class='hidden-lg-down'><div id='af_" + qg_row_id + "' style='max-width: 60px;'>" + trendy_data + "</div><br>" + event.data["quick_glance"][qg_row_id].date_social + "</td><td align='center'>" + event.data["quick_glance"][qg_row_id].pos_0 + "</td><td align='center'>" + the_day + "</td><td align='center'>" + the_movement + "</td><td align='center'>" + event.data["quick_glance"][qg_row_id].oci + "%</td><td align='center'>\$" + event.data["quick_glance"][qg_row_id].cpc + "</td><td align='center'>" + event.data["quick_glance"][qg_row_id].comp + "%</td><td align='center'>" + the_locality + "</td><td align='center'>" + the_device + "</td><td align='center'>" + the_language + "</td></tr>";


					});

						$('#best_x_advanced_filtering').html(data_table);

							//Generate Sparkline Charts
							Object.keys(sparkline_colored).sort(function(a,b){return a-b}).forEach(function(qg_row_id){
								render_sparkline_advanced_filtering(qg_row_id, sparkline_colored[qg_row_id]);
							});


		   		}

		   	}		
	   };

	}