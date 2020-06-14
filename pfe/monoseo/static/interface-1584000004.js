////////////////////////////////////////
//Global functions
// 100% translation complete - 6/22/2019 - CC

function console_log(the_color, notey, message) {
	
	if (allow_console_log == 0) {
		return;
	}
	
	var the_console_css = 'color: #00ff00; background-color: black;';
	
		if (the_color == 'green') { console.log( '%c%s%c %s', 'color: #00ff00; background-color: black;', notey, 'color: #00ff00; background-color: black;', message); }
		else if (the_color == 'blue') { console.log( '%c%s%c %s', 'color: #0099ff; background-color: white;', notey, 'color: #000000; background-color: white;', message); }
		else if (the_color == 'red') { console.log( '%c%s%c %s', 'color: #ff0033; background-color: white;', notey, 'color: #000000; background-color: white;', message); }
		else if (the_color == 'orange') { console.log( '%c%s%c %s', 'color: #ffffff; background-color: #FF5722;', notey, 'color: #ffffff; background-color: #FF5722;', message); }
		else if (the_color == 'purple') { console.log( '%c%s%c %s', 'color: #ff00bb; background-color: black;', notey, 'color: #ff00bb; background-color: black;', message); }
		else if (the_color == 'pink') { console.log( '%c%s%c %s', 'color: #000000; background-color: #ff0099;', notey, 'color: #000000; background-color: #ff0099;', message); }
		else if (the_color == 'yellow') { console.log( '%c%s%c %s', 'color: #ffee7a; background-color: black;', notey, 'color: #ffee7a; background-color: black;', message); }
		else if (the_color == 'purple_bg') { console.log( '%c%s%c %s', 'color: #ffffff; background-color: #660066;', notey, 'color: #ffffff; background-color: #660066;', message); }
		else { console.log( '%c%s%c %s', 'color: #000000; background-color: white;', notey, 'color: #000000; background-color: white;', message); }

}

function run_time_log(the_messages){
	
	detect_loading_time_end = Math.round(new Date().getTime()/1000.0);
	console_log('yellow', '[RUNTIME]', the_messages + ' - run time: ' + (detect_loading_time_end - detect_loading_time_start) + ' secs.');
	
}

//reload user data
function reload_user_data(WID, user_requested = false){
	
	if (is_data_reloading > 0) {
		//Data is in the process of reloading, do nothing
		console_log('red', '[ERROR!]', "Data is in the process of reloading = timestamp=[" + is_data_reloading + "]");
		localStorage.setItem('refresh_all_data', 1);
		return;
	}
	
	is_data_reloading = (new Date).getTime();

	var worker = new Worker('/q-assets/_web_worker/reload-1518886700.js');
	worker.postMessage(WID);
	worker.onmessage = function (event) {

	//console_log('green', '[+]', "New Data response [" + JSON.stringify(event.data) + "]");
	if (event.data.success !== undefined && event.data.success !== null) {

		is_data_reloading = 0;
		
		if (event.data.success === true) {
			if (event.data.timestamp !== undefined && event.data.timestamp !== null && event.data.run_time_seconds !== undefined && event.data.run_time_seconds !== null) {
					console_log('green', '[+]', "New Data available: [" + event.data.timestamp + "] - [" + event.data.run_time_seconds + " seconds]");
					if (user_requested === true) {
						
						//Clear QuickGlance data
						var req = indexedDB.deleteDatabase('QuickGlance');

								req.onsuccess = function () {
								    console.log("[+] Deleted database successfully");
								};

								req.onerror = function () {
								    console.log("[+] Couldn't delete database");
								};

								req.onblocked = function () {
								    console.log("[+] Couldn't delete database due to the operation being blocked");
								};
						
						$('#incoming_data').fadeOut(500);
						notify(Language.txt_new_data_title + ':', Language.txt_new_data_desc, 'success', 30000, 'zmdi zmdi-refresh-sync');
					}

					$('#new_data_available').css('display', 'inline-block');
					document.title = '[ ' + String.fromCodePoint(0x1F913) + ' ' + Language.txt_new_data_title_doc + ' ] ' + document.title;
					return 1;
			}else {
				if (user_requested === true) { $('#incoming_data').fadeOut(500); }
				return 0;
			}
		}else {
			$('#incoming_data').fadeOut(500);
			notify(Language.txt_data_error_title + ":", Language.txt_data_error_desc, 'danger', 300000, 'zmdi zmdi-warning');
			
		}

	}else {
		is_data_reloading = 0;
		if (user_requested === true) { $('#incoming_data').fadeOut(500); }
		return 0;
	}

   };
}

//Clear Alerts
function clear_alerts_quickly(WID){
   var worker = new Worker('/q-assets/_web_worker/clear-alerts-1518886700.js');
   worker.postMessage(WID);
   worker.onmessage = function (event) {

	   	if (event.data.success !== undefined && event.data.success !== null) {		
	   		if (event.data.success === true) {
					console_log('green', '[+]', "Alerts have been cleared.");
	   		}
	   	}

   };
}


//Sets New Home Panel
function set_new_home_panel(WID){
   var workerHome = new Worker('/q-assets/_web_worker/new-home-panel-1585000000.js');
   workerHome.postMessage({'wid': WID, 'page': window.location.pathname});

   workerHome.onmessage = function (event) {

	   	if (event.data.success !== undefined && event.data.success !== null && event.data.new_home_url !== undefined && event.data.new_home_url !== null) {		
	   		if (event.data.success === true) {
					console_log('green', '[+]', "New Home Panel Set [" + event.data.new_home_url + "]");
					notify(Language.txt_set_new_home_title + ':', Language.txt_set_new_home_desc, 'success', 30000, 'zmdi zmdi-home');

					//Visual update of the My Home button.
					$('#my_home_url').attr('href', event.data.new_home_url).addClass('color-white');
					if (current_client_id == 0) { 
						$("#top_nav_home").addClass('bg-sw-orange');
					}else {
						$("#top_nav_home").addClass('bg-light-blue');
					}
	   		}
	   	}		
   };

}

//Sets New Client (global variable)
function set_new_client(WID, new_client){

	var current_windowID_sessionstorage = get_windowID();

	var workerClient = new Worker('/q-assets/_web_worker/set-client-1545300000.js');
	workerClient.postMessage({'wid': WID, 'client_id': new_client, 'windowID': current_windowID_sessionstorage});

	workerClient.onmessage = function (event) {
	   
	   	//console_log('green', '[+]', "New Data response [" + JSON.stringify(event.data) + "]");
	   	if (event.data.success !== undefined && event.data.success !== null && event.data.client_name !== undefined && event.data.client_name !== null) {		
	   		if (event.data.success === true) {
					console_log('green', '[+]', "New Global Team Set within session [" + event.data.client_name + "]");
					current_client_id_name = event.data.client_name;

					if (parseInt(new_client) > 0) {
						notify(Language.txt_valid_client_filter_title, Language.txt_valid_client_filter_desc + ' <span class="color-yellow">"' + event.data.client_name + '"</span>', 'info', 6000, 'zmdi zmdi-accounts');
					}else {
						notify(Language.txt_no_client_filter_title, Language.txt_no_client_filter_desc, 'info', 6000, 'zmdi zmdi-accounts');
					}

					console_log('green', '[+]', "interface_client_change_reload [" + interface_client_change_reload + "]");
					
					if ((interface_client_change_reload !== undefined) && (interface_client_change_reload !== null)) {
						if (interface_client_change_reload == 1) {
							//The Interface Needs to be reloaded (window.location.pathname)
						
				               swal({
				                   title: Language.txt_swal_panel_reload_title,
				                   text: Language.txt_swal_panel_reload_desc,
				                   type: "warning",
				                   showCancelButton: true,
				                   confirmButtonColor: "#DD6B55",
				                   confirmButtonText: Language.txt_swal_panel_reload_btn_confirm
				   			}).then((result) => {
			
				   				if (result == true) {

				   					$(".header").remove();
				   					$(".sidebar").remove();
				   					$(".content").remove();

				   					//redirect user to All Projects view
				   					setTimeout(function(){ window.location.href = window.location.pathname + '?windowID=' + current_windowID_sessionstorage; }, 100);

				   				}else {								
				   					//Do Nothing
				   				}

				   			});
						
						}
					}
					
					//need to process latest alerts for this client
					parse_json_alerts(event.data);
					
	   		}
			
	   	}
				
		$('#incoming_data').fadeOut(500);
   };

}

//Event logging
function owly(the_event, the_trigger){
		$.ajax({
				url: '/q/a/event/',
				type: 'POST',
				data: 't=' + the_trigger + '&e=' + the_event + '&wid=' + WID,
				dataType: 'text',
				cache: false
		});
}



////////////////////////////////////////////////////////////////////////////////
// Global Variables

		var current_client_id = 0;
		var current_client_id_name = "";
		
		//Tell System Interface needs reloading on client change
		var interface_client_change_reload = 0;
		
		var is_data_reloading = 0;

		var sparkline_processed = 0;
		
		// Timers
		var top_rightsidebar_search_keypress_timer;
		var top_search_keypress_timer;	
		
		var growl_timing;	
		var growl_check_iterations = 0;
		var top_nav_search_dropdown = 0;
		var projects_order = {};
		var clients_projects = {};
		
		var total_projects = 0;
		

		// Cookie Variables
		var COOKIE_session_id = Get_Cookie('sessions_id');
		
		//RunTime Detection
		var detect_loading_time_end = 0;
		var detect_loading_time_start = Math.round(new Date().getTime()/1000.0);
		var allow_console_log = 0;
		
		if (window.location.hostname != 'www.serpwoo.com') {
			allow_console_log = 1;
		}
		

		//Tag Data
		//var TagLabel = {};
		//var TagColor = {};
		
		var projects_data_in_JSON;

////////////////////////////////////////////////////////////////////////////////
// Other

		// Add commas to numbers
		const numberWithCommas = (x) => {
		  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		// Removes content when unloading - in case user presses "back" but is logged out they will not see anything sensative
		$(window).on('beforeunload', function() {
				$(".header").remove();
				$(".sidebar").remove();
				$(".content").remove();
				$(".page-loader").fadeIn();
		});

////////////////////////////////////////////////////////////////////////////////
// Global Buttons (dropdowns and other clicks)

		//// Close Search Results (Top Nav)	
		$(document).on('click', '.close_search_my_results', function(){
			//notify('Hidding search results', '- hidden!', 'danger', 100000);
			$('#search_wrapper').hide();
			$("#search_wrapper_overlay").hide();
		});

		//// Clear All Alerts (Top Nav)	
		$(document).on('click', '#clear_alerts_btn', function(){
			clear_notifications();
		});

		//// Set A New Home Panel
		$(document).on('click', '#set_new_home_panel_btn', function(){
			$('#incoming_data').show();
			set_new_home_panel(WID);
			$('#incoming_data').fadeOut(500);
		});

		
		//Reload Data
		$(document).on('click', '#leftsidebar_reload', function(){

			$('#incoming_data').show();
			var did_I_reload = reload_user_data(WID, true);

		});

		//// Select a Client (Top Nav) for filtering
		$(document).on('click', '.top_nav_client_select', function(event){
			event.preventDefault();
			$("#incoming_data").show();
			$('#ClientSwitch').modal('hide');

			if (($(this).data('client') === undefined) || ($(this).data('client') === null)) {
				current_client_id = 0;
			}
			else {
				current_client_id = parseInt($(this).data('client'));
			}
			
			filter_interface_for_client(current_client_id);
			set_new_client(WID, current_client_id);
			process_client_filtering(current_client_id, 1);
		});

				
		////Select a project from top navigation dropdown (need to display keywords)
		$("#header_dropdown_of_projects").change(function(){
				update_header_dropdown_of_keywords();
		});


		////Select a keyword from top navigation dropdown (need to update keyword link for serp view)
		$("#header_dropdown_of_keywords").change(function(){
			
			var current_windowID_sessionstorage = get_windowID();
			
				//Update the "Go Keyword" Button link
				if (parseInt($(this).val()) > 0) {
						$('#header_dropdown_of_keywords_serp_view').attr('href','/q/serp/' + parseInt($("#header_dropdown_of_projects").val()) + '/' + parseInt($(this).val()) + '/?windowID=' + current_windowID_sessionstorage);
				}else {
						$('#header_dropdown_of_keywords_serp_view').attr('href','/q/home/' + '/?windowID=' + current_windowID_sessionstorage);
				}
		});


		//Right Sidebar Search			
		$('#right_sidebar_search').keyup(function() {
			filter_right_sidebar(this);
		});

	
		//Top Navigation Search Function (Main Interface Search)
		$('#search_my_stuff').keyup(function() {

			//speeds things up by only reacting after mouse stops moving
			clearInterval(top_search_keypress_timer);
		
			top_search_keypress_timer = setTimeout(function() {
				text_input = $('#search_my_stuff').val().toLowerCase();
			 	//console_log('blue', '[+]', "Handler for .keypress() called. [" + text_input + "]" );
			 			  if (text_input.length > 0) {
			 			    do_a_top_search(text_input, COOKIE_session_id);
			 			  }
			 		  }, 400);
		});
		

		////////////////////
		///// Warn about no data inside project (right sidebar hover)
		$(document).on('click', '.no_project_click', function(){
			//notify("No Data", "This project has no positive tagged domains/urls which are ranking within the SERPs for this project's keywords.", 'inverse', 20000, 'zmdi zmdi-help', 'center');
		});

		$(document).on({
		    mouseenter: function () {
		        $(this).removeClass('color-blue-grey').addClass('color-blue');
			   notify("<span class='color-deep-orange'>" + Language.txt_right_sidebar_no_data_hover_title + ":</span>", "<span class='color-brown'>" + Language.txt_right_sidebar_no_data_hover_desc + "</span>", 'warning', 20000, 'zmdi zmdi-help', 'right');
		    },
		    mouseleave: function () {
		        $(this).removeClass('color-blue').addClass('color-blue-grey');
		    }
		}, ".no_project_click"); //pass the element as an argument to .on
		

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {

	//Makes loading appear faster
	setTimeout( function(){ $(".page-loader").fadeOut(); }, 1);

	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	//For the Top Navigation (check global storage, then session storage - this way individual tabs can have different settings AND new tabs inherit the latest settings)
	
	var top_nav_search_dropdown_global = localStorage.getItem('top_nav_search_dropdown_global');
	var top_nav_search_dropdown_session = sessionStorage.getItem('top_nav_search_dropdown_session');
	
			if ((top_nav_search_dropdown_global === undefined) || (top_nav_search_dropdown_global === null)) {
					console_log('blue', '[+]', 'SET (default): top_nav_search_dropdown_global=0 was ' + top_nav_search_dropdown_global);
					top_nav_search_dropdown_global = 1; //was 0 for defaulting to search
					localStorage.setItem('top_nav_search_dropdown_global', 1); //was 0 for defaulting to search
			}else {
					if ((top_nav_search_dropdown_global != 0) && (top_nav_search_dropdown_global != 1)) {
							top_nav_search_dropdown_global = 1; //was 0 for defaulting to search
							localStorage.setItem('top_nav_search_dropdown_global', 1); //was 0 for defaulting to search
							console_log('blue', '[+]', 'SET (default): top_nav_search_dropdown_global=1');
					}
			}

			if ((top_nav_search_dropdown_session === undefined) || (top_nav_search_dropdown_session === null)) {
					top_nav_search_dropdown_session = top_nav_search_dropdown_global;
					sessionStorage.setItem('top_nav_search_dropdown_session', top_nav_search_dropdown_session);
					console_log('blue', '[+]', 'SET: top_nav_search_dropdown_session=' + top_nav_search_dropdown_global);
			}else {
					if ((top_nav_search_dropdown_session != 0) && (top_nav_search_dropdown_session != 1)) {
							top_nav_search_dropdown_session = top_nav_search_dropdown_global;
							sessionStorage.setItem('top_nav_search_dropdown_session', top_nav_search_dropdown_session);
							console_log('blue', '[+]', 'SET: top_nav_search_dropdown_session=' + top_nav_search_dropdown_global);
					}
			}

			if ((top_nav_search_dropdown_session === undefined) || (top_nav_search_dropdown_session === null) || ((top_nav_search_dropdown_session != 0) && (top_nav_search_dropdown_session != 1))) {
					top_nav_search_dropdown = 1; //was 0 for defaulting to search
			}else {
					top_nav_search_dropdown = top_nav_search_dropdown_session;
			}

			if (top_nav_search_dropdown == 0) {
				$("#top_nav_search_input").show();
				$("#top_nav_dropdown_input").hide();
				$("#top_nav_search_vs_classic").removeClass('light_up_top_nav_button');
				console_log('blue', '[0]', "top_nav_search_dropdown=[" + top_nav_search_dropdown + "]" );
			}else {
				$("#top_nav_search_input").hide();
				if (window.innerWidth >= 1200) { $("#top_nav_dropdown_input").show(); }
				$("#top_nav_search_vs_classic").addClass('light_up_top_nav_button');
				console_log('blue', '[1]', "top_nav_search_dropdown=[" + top_nav_search_dropdown + "]" );
			}



			////////
			// Acually clicking on search-icon to switch between search and old school dropdown menu

			$(".header").on('click', '.search_icon', function(){
				switch_top_nav_search();
			});
	

	////////////////////////////////////////////////////////////////////////////////
	//// Filter for clients' projects		
			
			var top_nav_current_client_session = sessionStorage.getItem('top_nav_current_client_session');

			if ((top_nav_current_client_session === undefined) || (top_nav_current_client_session === null)) {
					current_client_id = 0;					
			}else {
					current_client_id = parseInt(top_nav_current_client_session);
			}
			
			filter_interface_for_client(current_client_id);
			process_client_filtering(current_client_id, 0);
			
			
			
			
			
	////////////////////////////////////////////////////////////////////////////////
	// Main

		get_user_data();

	//Reportbuilder html
	//
	//$(document.body).append('<div id="report_building"></div>');	
	//$('#report_building').load("/jsv3/html/report-builder/rbuilder-q1517423200.html");

	//Quick Insight
		var quick_insight_helper = $('<div></div>').attr('id', 'quick_insight_helper');
		quick_insight_helper.appendTo('body');	
		$('#quick_insight_helper').load("/q-assets/_html/quick-insight/quick_insight-1567000000.html");


	//Quick Add
		var quick_add_helper = $('<div></div>').attr('id', 'quick_add_helper');
		quick_add_helper.appendTo('body');	
		$('#quick_add_helper').load("/q-assets/_html/quick-add/quick_add-1584000000.html");


		var hash_intercom = window.location.hash;

		if (hash_intercom) {
			hash_intercom = hash_intercom.substr(1, (hash_intercom.length-1));
		}else {
			hash_intercom = 'nada';
		}				

		//Disable intercom pop-up on #intros (airstory)
		if (hash_intercom != "intro") {

			//This only shows the intercom warning  every 2 days (unless the user clears localstorage)
			var intercom_disabled_warning = localStorage.getItem('intercom_disabled_warning');
		
			//Intercom Detection
			if ((intercom_disabled_warning === undefined) || (intercom_disabled_warning === null)) {
				setTimeout(function(){

						 var element_intercom_frame =  document.getElementById('intercom-frame');
						 var unix_time = parseInt((new Date).getTime()/1000);

						 if ((typeof(element_intercom_frame) === undefined) || (element_intercom_frame === null)) {
							//Intercom not found

								if ((intercom_disabled_warning === undefined) || (intercom_disabled_warning === null) || (intercom_disabled_warning < (unix_time - (86400*2)))) {

									//localStorage.setItem('intercom_disabled_warning', unix_time);
									var intercomhelper = $('<div></div>').attr('id', 'intercom_helper');
									intercomhelper.appendTo('body');	
									$('#intercom_helper').load("/q-assets/_html/intercom/intercom-detection-1554700000.html");
								}
						 }else {
							//localStorage.setItem('intercom_disabled_warning', (unix_time + (86400*7)));
						 }
				}, 8000);
			}

		}else {
			var unix_time = parseInt((new Date).getTime()/1000);
			//localStorage.setItem('intercom_disabled_warning', unix_time);
		}


	////////////////////////////////////////////////////////////////////////////////

	//switch top nav by ESC button
	$(document).onEscapeKeyDown(switch_top_nav_search);
	
	////////////////////////////////////////////////////////////////////////////////
	
	// This logs all popover the user does so we can figure out what people are having problems with
	
	$("[data-toggle=popover]").on('shown.bs.popover', function () {
		//alert('called back');
		let data_o_title = $(this).attr('data-original-title');
		let data_title = $(this).attr('data-title');

		if (data_title !== undefined) {

			if (data_title.length > 2) {
				owly('popover', data_title);
				//alert('cb-554=[' + data_title + ']');
			}

		}else {

			if (data_o_title !== undefined) {
				if (data_o_title.length > 2) {
					owly('popover', data_o_title);
					//alert('cb-559=[' + data_o_title + ']');
				}
			}
			
		}

	});
	
	////////////////////////////////////////////////////////////////////////////////
		
});


//Change Project ID in header dropdown
window.onload = function () {
	//update_header_dropdown_of_keywords();
	update_header_dropdown_menus();
}


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Global functions

////////////////////
//
	
	function switch_top_nav_search() {
		
		console_log('blue', '[80]', "old setting(top_nav_search_dropdown)=[" + top_nav_search_dropdown + "]" );

		if ((top_nav_search_dropdown === undefined) || (top_nav_search_dropdown === null) || ((top_nav_search_dropdown != 0) && (top_nav_search_dropdown != 1))) {
				top_nav_search_dropdown = 0;
				sessionStorage.setItem('top_nav_search_dropdown_session', top_nav_search_dropdown);
		}else {
	
			if (top_nav_search_dropdown == 0) { top_nav_search_dropdown = 1; }
			else if (top_nav_search_dropdown == 1) { top_nav_search_dropdown = 0; }
			else { top_nav_search_dropdown = 0; }
	
				sessionStorage.setItem('top_nav_search_dropdown_session', top_nav_search_dropdown);
				localStorage.setItem('top_nav_search_dropdown_global', top_nav_search_dropdown);
		}

		console_log('blue', '[95]', "new setting(top_nav_search_dropdown)=[" + top_nav_search_dropdown + "]" );

		if (top_nav_search_dropdown == 0) {
			$("#top_nav_search_input").show();
			$("#top_nav_dropdown_input").hide();
			$("#top_nav_search_vs_classic").removeClass('light_up_top_nav_button');
			console_log('blue', '[0]', "top_nav_search_dropdown=[" + top_nav_search_dropdown + "]" );
			$("#search_my_stuff").focus();
		}else {
			$("#top_nav_search_input").hide();
			if (window.innerWidth >= 1200) { $("#top_nav_dropdown_input").show(); }
			$("#top_nav_search_vs_classic").addClass('light_up_top_nav_button');
			console_log('blue', '[1]', "top_nav_search_dropdown=[" + top_nav_search_dropdown + "]" );
			$("#header_dropdown_of_projects").focus();
		}

	}


////////////////////
//
	function do_a_top_search(top_search_keyword, the_user_session_id){
		
		var foreignCharacters = top_search_keyword;
		var rforeign = /[^\u0000-\u007f]/;
		
		var search_script = "/q/a/search/";
		var search_engin = "non-latin";

		if (rforeign.test(foreignCharacters)) {
		  	//non latin characters (浪人 / )
				search_script = "/q/a/search/";
				search_engine = "non-latin";
				top_search_keyword = encodeURIComponent(top_search_keyword);
		} else {
			//only latin characters
			  	search_script = "/q/a/latin-search/";
				search_engine = "latin";
				top_search_keyword = top_search_keyword; //Do not encode this
		}

	    var response_top_search = "";
	    var form_data_top_search = {
	        q: top_search_keyword,
			s: the_user_session_id,
			wid: W1D,
			cid: current_client_id
	    };

	    $.ajax({
	        type: "POST", 
	        url: search_script, 
	        data: form_data_top_search,
			cache: false,
	        success: function(response_top_search)
	        {
	            $('#search_my_stuff_results').html(response_top_search);

				$('#search_wrapper_overlay').show();
				$('#search_wrapper').show();
				$('#top_nav_search_input').css('z-index', 100000);
				
	        },

	    });

		console_log('blue', '[+]', "Started searching for [" + top_search_keyword + "] (" + search_engine + " engine)" );

	}


////////////////////
//
	function filter_interface_for_client(the_current_client_id = 0){

		//sets new data globally and session (user's tab will always default to sessionstorage then global (localstorage) if blank)
		sessionStorage.setItem('top_nav_current_client_session', the_current_client_id);


		$('.top_nav_client_select').each(function(index, element) {
			if ($(element).data('client') == the_current_client_id) {
				//current client
				console_log('blue', '[+]', 'Client Selected ID = ' + the_current_client_id);
				$(element).addClass('highlight_top_nav_client');
		
			}else {
				$(element).removeClass('highlight_top_nav_client');
			}
		});

			if (the_current_client_id == 0) {
				$('#client_name_badge').hide();
				console_log('blue', '[+]', 'No Client Selected.');
				$("#top_nav_clients_icon").removeClass('zmdi-account color-white').addClass('zmdi-apps color-white');
				$("#top_nav_clients").removeClass('bg-deep-orange');				

				$('.top-menu-morph').removeClass('bg-deep-orange');
				setTimeout(function() {$('header .nav-link').removeClass('color-white'), 1 });
				setTimeout(function() {$('.top-menu-morph .current_location').removeClass('color-blue color-white'), 1 });

			}
			else {
				$('#client_name_badge').show();
				$("#top_nav_clients_icon").removeClass('zmdi-apps color-white').addClass('zmdi-account color-white');
				$("#top_nav_clients").addClass('bg-deep-orange');				

				$('.top-menu-morph').addClass('bg-deep-orange');
				setTimeout(function() { $('header .nav-link').addClass('color-white'), 1 });
				setTimeout(function() { $('.top-menu-morph .current_location').removeClass('color-white').addClass('color-blue'), 1 });
			}

	}


	function process_client_filtering(the_current_client_id, sparkline_processed = 0) {
		
		console_log('blue', '[~]', 'process_client_filtering: the_current_client_id=[' + the_current_client_id + '] / sparkline_processed=[' + sparkline_processed + ']');
		
		var total_shown_projects = 0;
		var total_shown_report = 0;
		var total_shown_note = 0;
		var total_shown_project_sidebar = 0;
		var total_shown_alert = 0;
		
		//Process the client list and filter the interface
		if (the_current_client_id > 0) {

				var clients_data = localStorage.getItem('clients_data');

				if ((clients_data !== undefined) && (clients_data !== null) && (clients_data.length >= 10)) {

						try {
						        clients_data_in_JSON = JSON.parse(clients_data);
							   
							   if ((clients_data_in_JSON[the_current_client_id] === undefined) || (clients_data_in_JSON[the_current_client_id] === null)) {
   									notify(Language.process_client_filter_error, Language.process_client_filter_unknown_team, 'danger', 600000);

									current_client_id = 0;
									filter_interface_for_client(0);
									set_new_client(WID, 0);
									process_client_filtering(0, 1);
									
									return;
							   }

							   if ((clients_data_in_JSON[the_current_client_id]["name"] === undefined) || (clients_data_in_JSON[the_current_client_id]["name"] === null)) {
   									notify(Language.process_client_filter_error, Language.process_client_filter_unknown_team, 'danger', 600000);

									current_client_id = 0;
									filter_interface_for_client(0);
									set_new_client(WID, 0);
									process_client_filtering(0, 0);
									
									return;
							   }
							   
						} catch(e) {
								clients_data_in_JSON = JSON.parse("{ \"success\" : false }");
								//notify('Error Occurred (clients_data):', e, 'danger', 600000);
								notify(Language.process_client_filter_error, Language.process_client_filter_corrupt_data, 'danger', 600000);
								notify(Language.process_client_filter_instructions, Language.process_client_filter_instructions_reload, 'warning', 600000);
								localStorage.setItem('clients_data', '');
								return;
						}							

				}else {
					//no clients_data to process
					return;
				}



				if ((clients_data_in_JSON[the_current_client_id]["name"] !== undefined) && (clients_data_in_JSON[the_current_client_id]["name"] !== null) && (clients_data_in_JSON[the_current_client_id]["projects"] !== undefined) || (clients_data_in_JSON[the_current_client_id]["projects"] !== undefined)) {
				
						$('#client_name_badge').html("&nbsp; <a href=\"/q/team/" + the_current_client_id + "/\"><span class=\"m-2 p-2 btn bg-indigo color-white\">" + Language.txt_panel_team + " <b>" + clients_data_in_JSON[the_current_client_id]["name"] + "</b></span></a> &nbsp;");
						
						Object.keys(clients_data_in_JSON[the_current_client_id]["projects"]).forEach(function(project_id){
								clients_projects[project_id] = the_current_client_id;								
						});
						
						//loop through .client_filter looking for data-project-id attr - get that and see if that project_id = the_current_client_id						
						$('.client_filter').each(function(index, element) {
							let the_project_id = $(element).data('project-id');
														
							if ((the_project_id === undefined) || (the_project_id === null)) {
								return;
							}
							
							if ((clients_projects[the_project_id] === undefined) || (clients_projects[the_project_id] === null)) {
								$(element).hide();
								return;
							}
							
							if (clients_projects[the_project_id] == the_current_client_id) {
								$(element).show();

								if ($(element).hasClass( "client_filter_project" )) { total_shown_projects++; }
								if ($(element).hasClass( "client_filter_report" )) { total_shown_report++; }
								if ($(element).hasClass( "client_filter_note" )) { total_shown_note++; }
								if ($(element).hasClass( "client_filter_project_sidebar" )) { total_shown_project_sidebar++; }
								if ($(element).hasClass( "client_filter_alert" )) { total_shown_alert++; }

								if (sparkline_processed == 1){

									if ((sparkline_data_in_JSON !== undefined) && (sparkline_data_in_JSON !== null)) {

										if (sparkline_data_in_JSON[the_project_id] !== undefined && sparkline_data_in_JSON[the_project_id] !== null) {										
										
											if (sparkline_data_in_JSON[the_project_id]["1"] !== undefined && sparkline_data_in_JSON[the_project_id]["1"] !== null) {
																						
												if (sparkline_data_in_JSON[the_project_id]["1"]["project-id"] !== undefined && sparkline_data_in_JSON[the_project_id]["1"]["project-id"] !== null) {

													if ((sparkline_data_in_JSON[the_project_id]["1"]["project-id"] > 0) && (sparkline_data_in_JSON[the_project_id]["1"]["sparkline-data"].length > 0)) {

														  $("#project_sparkline_" + sparkline_data_in_JSON[the_project_id]["1"]["project-id"]).html("<div id='sparkline_line_" + sparkline_data_in_JSON[the_project_id]["1"]["project-id"] + "' style='max-width: 60px;'>" + sparkline_data_in_JSON[the_project_id]["1"]["sparkline-data"] + "</div>");
				  
													    $("#sparkline_line_" + sparkline_data_in_JSON[the_project_id]["1"]["project-id"]).sparkline('html', {
													        type: 'line',
													        width: '100%',
													        height: 30,
													        lineColor: sparkline_data_in_JSON[the_project_id]["1"]["sparkline-color"],
													        fillColor: 'rgba(0,0,0,0)',
													        lineWidth: 1.25,
													        maxSpotColor: '#fff',
													        minSpotColor: '#fff',
													        spotColor: '#fff',
													        spotRadius: 0,
													        highlightSpotColor: '#fff',
													        highlightLineColor: '#fff'
													    });
				
														$("#sparkline_line_" + sparkline_data_in_JSON[the_project_id]["1"]["project-id"]).addClass('flipspark');
				
													}else {
														console_log('red', '[- 795]', 'project=[' + the_project_id + '] no sparkline');
														$("#project_sparkline_" + the_project_id).html("<div id='no_sparkline_line_" + the_project_id + "' style='max-width: 60px; text-align: center; font-size: 1.4em;'><i class='zmdi zmdi-eye-off color-blue-grey no_project_click'></i></div>");
													}

											  	}else {
													console_log('red', '[- 799]', 'project=[' + the_project_id + '] no sparkline');
													$("#project_sparkline_" + the_project_id).html("<div id='no_sparkline_line_" + the_project_id + "' style='max-width: 60px; text-align: center; font-size: 1.4em;'><i class='zmdi zmdi-eye-off color-blue-grey no_project_click'></i></div>");
												}
										
											}else {
												console_log('red', '[- 803]', 'project=[' + the_project_id + '] no sparkline');
												$("#project_sparkline_" + the_project_id).html("<div id='no_sparkline_line_" + the_project_id + "' style='max-width: 60px; text-align: center; font-size: 1.4em;'><i class='zmdi zmdi-eye-off color-blue-grey no_project_click'></i></div>");
											}

										}else {
											console_log('red', '[- 807]', 'project=[' + the_project_id + '] no sparkline');
											$("#project_sparkline_" + the_project_id).html("<div id='no_sparkline_line_" + the_project_id + "' style='max-width: 60px; text-align: center; font-size: 1.4em;'><i class='zmdi zmdi-eye-off color-blue-grey no_project_click'></i></div>");
										}
									
									}else {
										console_log('red', '[- 811]', 'project=[' + the_project_id + '] no sparkline');
										$("#project_sparkline_" + the_project_id).html("<div id='no_sparkline_line_" + the_project_id + "' style='max-width: 60px; text-align: center; font-size: 1.4em;'><i class='zmdi zmdi-eye-off color-blue-grey no_project_click'></i></div>");
									}

								}
								

								
								
							}else {
								$(element).hide();
							}
	
						});
						
						//loop through
						
						var is_current_selected_option_hidden = 0;
						var first_visible_project = 0;
						
						//loop through header_dropdown_of_projects (top navigation) and only show the current_client_id's projects
						$("#header_dropdown_of_projects > option").each(function() {
							
							dropdown_project_id = this.value;
							current_value = $( "#header_dropdown_of_projects option:selected" ).val();

								if (clients_projects[dropdown_project_id] == the_current_client_id) {								
										$("#header_dropdown_of_projects option[value=" + dropdown_project_id + "]").show();
										if (first_visible_project == 0) {
											first_visible_project = dropdown_project_id;
										}
								}else {
										if (parseInt(dropdown_project_id) == parseInt(current_value)) {
											is_current_selected_option_hidden = 1;
										}
										$("#header_dropdown_of_projects option[value=" + dropdown_project_id + "]").hide();
								}

						});

						if ((is_current_selected_option_hidden == 1) && (first_visible_project > 0)) {
								$("#header_dropdown_of_projects").val(first_visible_project);
								console_log('red', '[~]', 'Current selection header_dropdown_of_projects=[' + current_value + '] is hidden changing value to [' + first_visible_project + ']');
								update_header_dropdown_of_keywords();
						}
						

				}
		}else {
			
			
			//show everything
			$('.client_filter').each(function(index, element) {
				
					let the_project_id = $(element).data('project-id');
				
					$(element).show();

					if ($(element).hasClass( "client_filter_project" )) { total_shown_projects++; }
					if ($(element).hasClass( "client_filter_report" )) { total_shown_report++; }
					if ($(element).hasClass( "client_filter_note" )) { total_shown_note++; }
					if ($(element).hasClass( "client_filter_project_sidebar" )) { total_shown_project_sidebar++; }
					if ($(element).hasClass( "client_filter_alert" )) { total_shown_alert++; }

					if (sparkline_processed == 1){
						if ((sparkline_data_in_JSON !== undefined) && (sparkline_data_in_JSON !== null)) {

							if ((sparkline_data_in_JSON[the_project_id] !== undefined)  && (sparkline_data_in_JSON[the_project_id] !== null)) {
								
								if ((sparkline_data_in_JSON[the_project_id]["1"] !== undefined) && (sparkline_data_in_JSON[the_project_id]["1"] !== null)) {

									if (sparkline_data_in_JSON[the_project_id]["1"]["project-id"] !== undefined && sparkline_data_in_JSON[the_project_id]["1"]["project-id"] !== null) {
									      if ((sparkline_data_in_JSON[the_project_id]["1"]["project-id"] > 0) && (sparkline_data_in_JSON[the_project_id]["1"]["sparkline-data"].length > 0)) {
											  $("#project_sparkline_" + sparkline_data_in_JSON[the_project_id]["1"]["project-id"]).html("<div id='sparkline_line_" + sparkline_data_in_JSON[the_project_id]["1"]["project-id"] + "' style='max-width: 60px;'>" + sparkline_data_in_JSON[the_project_id]["1"]["sparkline-data"] + "</div>");
  
										    $("#sparkline_line_" + sparkline_data_in_JSON[the_project_id]["1"]["project-id"]).sparkline('html', {
										        type: 'line',
										        width: '100%',
										        height: 30,
										        lineColor: sparkline_data_in_JSON[the_project_id]["1"]["sparkline-color"],
										        fillColor: 'rgba(0,0,0,0)',
										        lineWidth: 1.25,
										        maxSpotColor: '#fff',
										        minSpotColor: '#fff',
										        spotColor: '#fff',
										        spotRadius: 0,
										        highlightSpotColor: '#fff',
										        highlightLineColor: '#fff'
										    });

											$("#sparkline_line_" + sparkline_data_in_JSON[the_project_id]["1"]["project-id"]).addClass('flipspark');

											//if (the_project_id == 30107) {
											//	console_log('green', '[- 924]', 'sparkline_data=[' + sparkline_data_in_JSON[the_project_id]["1"]["sparkline-data"] + ']');
											//}

									      }else {

											//console_log('red', '[- 963]', 'project=[' + the_project_id + '] no sparkline');
											
											$("#project_sparkline_" + the_project_id).html("<div id='no_sparkline_line_" + the_project_id + "' style='max-width: 60px; text-align: center; font-size: 1.4em;'><i class='zmdi zmdi-eye-off color-blue-grey no_project_click'></i></div>");
										}

								  	}else {

										console_log('red', '[- 970]', 'project=[' + the_project_id + '] no sparkline');
										$("#project_sparkline_" + the_project_id).html("<div id='no_sparkline_line_" + the_project_id + "' style='max-width: 60px; text-align: center; font-size: 1.4em;'><i class='zmdi zmdi-eye-off color-blue-grey no_project_click'></i></div>");
									}
							
								}else {

									//console_log('red', '[- 976]', 'project=[' + the_project_id + '] no sparkline');
									$("#project_sparkline_" + the_project_id).html("<div id='no_sparkline_line_" + the_project_id + "' style='max-width: 60px; text-align: center; font-size: 1.4em;'><i class='zmdi zmdi-eye-off color-blue-grey no_project_click'></i></div>");

								}
							
							}else {

								//console_log('red', '[- 983]', 'project=[' + the_project_id + '] no sparkline');
								$("#project_sparkline_" + the_project_id).html("<div id='no_sparkline_line_" + the_project_id + "' style='max-width: 60px; text-align: center; font-size: 1.4em;'><i class='zmdi zmdi-eye-off color-blue-grey no_project_click'></i></div>");
								
							}

						}else {

							console_log('red', '[- 990]', 'project=[' + the_project_id + '] no sparkline');
							$("#project_sparkline_" + the_project_id).html("<div id='no_sparkline_line_" + the_project_id + "' style='max-width: 60px; text-align: center; font-size: 1.4em;'><i class='zmdi zmdi-eye-off color-blue-grey no_project_click'></i></div>");
						}


					}

			});
			
			
			
			//reveal ALL projects
			$("#header_dropdown_of_projects > option").each(function() {
				
				dropdown_project_id = this.value;
				$("#header_dropdown_of_projects option[value=" + dropdown_project_id + "]").show();

			});
			
			//Update header dropdowns
			update_header_dropdown_menus();
			
			
		}
		
		if (sparkline_processed == 1){		
				$('#total_projects_top_nav').text(total_shown_projects);
				$('#total_projects_right_sidebar').text(total_shown_project_sidebar);

				$('#total_reports_top_nav').text(total_shown_report);
				$('#total_notes_top_nav').text(total_shown_note);
				$('#nav_new_alerts_amount_minor').text(total_shown_alert);
		
		
				if (total_shown_alert == 0) {

					if (the_current_client_id > 0) {
						$("#nav_alert_rows").html("<table style='width: 100%; margin: 0px auto; padding: 0px;'><tbody><tr><td><p>" + Language.no_alerts_team + " <b class='color-deep-orange'>" + clients_data_in_JSON[the_current_client_id]["name"] + "</b>.</p><p>" + Language.no_alerts_team_2 + "</p></td></tr></tbody></table>");
					}else {
						$("#nav_alert_rows").html("<table style='width: 100%; margin: 0px auto; padding: 0px;'><tbody><tr><td><p>" + Language.no_alerts_team_3 + "</p><p>" + Language.no_alerts_team_4 + "</p></td></tr></tbody></table>");
					}
			
				}
		}		

	}


////////////////////
//
	function filter_right_sidebar(element) {
	    var value_of_search = $(element).val().toLowerCase();

		if (current_client_id > 0) {
			Object.keys(clients_data_in_JSON[current_client_id]["projects"]).forEach(function(project_id){
					clients_projects[project_id] = current_client_id;								
			});
		}

	    if (value_of_search.length >= 1) {

			clearInterval(top_rightsidebar_search_keypress_timer);
			top_rightsidebar_search_keypress_timer = setTimeout(function() {
				$(".chat .listview a").hide(1).filter(function() {
					
					//filter for current client
			        if (current_client_id > 0) {
						my_current_project_id = $(this).data('project-id');
						
						if (clients_projects[my_current_project_id] == current_client_id) {
							return $(this).text().toLowerCase().indexOf(value_of_search) > -1;
						}
						
					}else {
						//No current client
						return $(this).text().toLowerCase().indexOf(value_of_search) > -1;
					}

				}).show(1).find('.on_hover_reveal').show(150);

				console_log('blue', '[+]', "Searching Projects for [" + value_of_search + "]" );

			}, 150);

		} else {
		
			clearInterval(top_rightsidebar_search_keypress_timer);
			top_rightsidebar_search_keypress_timer = setTimeout(function() {
				//$('.chat .listview a').slideDown(150).find('.on_hover_reveal').slideUp(150);
				$('.chat .listview a').find('.on_hover_reveal').slideUp(150);
			}, 150);
			
			process_client_filtering(current_client_id, 1);
		}
	}

////////////////////
// Growl, User verification, Alerts, and user's plan pull
	function get_user_data() {

			console_log('green', '[-]', 'Pulling global data from server for user...');
			
			var sparkline_data = localStorage.getItem('sparkline_data');
			var projects_data = localStorage.getItem('projects_data');
			var tags_data = localStorage.getItem('tags_data');
			var refresh_all_data = localStorage.getItem('refresh_all_data');
			var clients_data = localStorage.getItem('clients_data');
			var request_sparkline = 0;
			var request_projects = 0;
			var request_tags = 0;
			var request_clients = 0;

			//Log RunTime
			//run_time_log('L881');
			
			var top_nav_current_client_session = sessionStorage.getItem('top_nav_current_client_session');


			if ((top_nav_current_client_session === undefined) || (top_nav_current_client_session === null)) {
					current_client_id = 0;					
			}else {
					current_client_id = parseInt(top_nav_current_client_session);				
			}

			console_log('blue', '[-]', 'current_client_id = ' + current_client_id);

			//Log RunTime
			//run_time_log('L895');
			
						if ((sparkline_data === undefined) || (sparkline_data === null) || (sparkline_data.length < 10)) {
							request_sparkline = 1;
						}else {
							if (sparkline_data.length < 10) {
								request_sparkline = 1;
							}
						}

						//Log RunTime
						//run_time_log('L906');

						if ((projects_data === undefined) || (projects_data === null) || (projects_data.length < 10)) {
							request_projects = 1;
						}else {
							if (projects_data.length < 10) {
								request_projects = 1;
							}
						}

						//Log RunTime
						//run_time_log('L917');

						if ((tags_data === undefined) || (tags_data === null) || (tags_data.length < 10)) {
							request_tags = 1;
						}else {
							if (tags_data.length < 10) {
								request_tags = 1;
							}
						}

						//Log RunTime
						//run_time_log('L928');

						if ((clients_data === undefined) || (clients_data === null) || (clients_data.length < 10)) {
							request_clients = 1;
						}else {
							if (clients_data.length < 10) {
								request_clients = 1;
							}
						}

						//Log RunTime
						//run_time_log('L939');

						if ((refresh_all_data === undefined) || (refresh_all_data === null)) {
							refresh_all_data = 0;
						}else {
							if ((refresh_all_data != 0) && (refresh_all_data != 1) && (refresh_all_data != 2)) {
								refresh_all_data = 0;
							}
						}

						//Log RunTime
						//run_time_log('L950');

						console_log('blue', '[+]', 'request_sparkline=[' + request_sparkline + '] / request_projects = [' + request_projects + '] / request_tags = [' + request_tags + '] / request_clients = [' + request_clients + '] / refresh_all_data = [' + refresh_all_data + '] / current_client_id = [' + current_client_id + ']');
						//Set the localStorage back
						localStorage.setItem('refresh_all_data', '0');

						//Log RunTime
						//run_time_log('L957');

		    $.ajax({
		        type: "POST", 
		        url: "/q/a/growl/",
				data: "request_sparkline=" + request_sparkline + "&request_projects=" + request_projects + "&request_tags=" + request_tags + "&refresh_all_data=" + refresh_all_data  + "&request_clients=" + request_clients  + "&current_client_id=" + current_client_id,
				cache: false,
				error: function( XMLHttpRequest, textStatus, errorThrown ) {

						$(".header").fadeOut();
						$(".sidebar").fadeOut();
						$(".content").fadeOut();
						//$(".page-loader").fadeIn();
						//notify("Un-Able to Connect:", "Something is wrong with the connection to the server.", 'danger', 600000, 'zmdi zmdi-help');
						//notify("An Error Was Detected:", "The Administrators have been notified!", 'danger', 600000, 'zmdi zmdi-help');
						//notify("An Error Was Detected (data):", XMLHttpRequest, 'danger', 600000, 'zmdi zmdi-help');
						//notify("An Error Was Detected (status):", textStatus, 'danger', 600000, 'zmdi zmdi-help');
						//notify("An Error Was Detected (error):", errorThrown, 'danger', 600000, 'zmdi zmdi-help');

						notify(Language.get_user_data_connection_problem, Language.get_user_data_connection_problem_2, 'danger', 600000, 'zmdi-cloud-download');
						notify(Language.get_user_data_connection_problem_3, Language.get_user_data_connection_problem_4, 'warning', 600000, 'zmdi-cloud-download');
						
						//Attempt to refresh ALL data
						localStorage.setItem('refresh_all_data', 1);
						
						//Log RunTime
						//run_time_log('L1200 - Main Growl Completed.');

				},
				beforeSend: function() {
						//Log RunTime
						//run_time_log('L984 - Before Growl Send');
			     },
				success: function(response)
				{
		            //console.log(response);

		  			//Log RunTime
		  			//run_time_log('L987 - growl ajax response');

						var json_obj = response;//parse JSON

						if (json_obj.success === true) {
						
							if (json_obj.total_growl === undefined || json_obj.total_growl === null || json_obj.total_alerts === undefined || json_obj.total_alerts === null) {
								notify(Language.get_user_data_error, Language.get_user_data_error_desc, 'danger', 100000);
								return;
							}
						
							setTimeout( function(){ $(".page-loader").fadeOut(); }, 1);

							////////////////////////////////////////////////////////////////////////////////
							//Displays growl messages
							var total_growl_alerts = parseInt(json_obj.total_growl);
						
							//notify("total_growl_alerts: ", total_growl_alerts, "info", 20000, "help");

								if (total_growl_alerts > 0) {
									    for (i=0; i<total_growl_alerts; i++) {
											if (json_obj.growl[i].message !== undefined && json_obj.growl[i].message !== null) {
										      if (json_obj.growl[i].message.length > 4) {
												  notify(json_obj.growl[i].title, json_obj.growl[i].message, json_obj.growl[i].type, json_obj.growl[i].on_screen_time, json_obj.growl[i].icon);
										      }
										  	}
										}
								}

								//Log RunTime
								//run_time_log('L1017 - done processing growl alerts');

							////////////////////////////////////////////////////////////////////////////////
							//Implements latest Alerts

								parse_json_alerts(json_obj);
								
								//Log RunTime
								//run_time_log('L1025 - done processing alerts');
								
							////////////////////////////////////////////////////////////////////////////////

								
								//Client Name Implementation
								if (current_client_id > 0) {
									if(json_obj.current_client_id_name !== undefined && json_obj.current_client_id_name !== null) {									
										current_client_id_name = json_obj.current_client_id_name;
									}
								}
							
								
								//Updates the Users Plan
						
								if(json_obj.user_plan !== undefined && json_obj.user_plan !== null) {
									$("#sidebar_user_plan").text(json_obj.user_plan);
								}else {
									$("#sidebar_user_plan").text('(error)');
								}

////////////////////////////////////////////////////////////////////////////////
// Update the selectd current_client_id and select the sessionStorage's user

								//Figures out the client filter situation for this user's browser tab.
								if ((top_nav_current_client_session === undefined) || (top_nav_current_client_session === null)) {
									//If no session stoarge exists

									if (json_obj.global_client !== undefined && json_obj.global_client !== null) {

										//use the global client selected (user opened a new tab or browser window - so no session storage exists)
										current_client_id = parseInt(json_obj.global_client);

									}else {
										current_client_id = 0;					
									}

									sessionStorage.setItem('top_nav_current_client_session', current_client_id);
									console_log('blue', '[+]', 'New top_nav_current_client_session = ' + current_client_id);


								}else {
									//if session storage exists we are good				
								}

								//Log RunTime
								//run_time_log('L1071 - done processing current_client_id');

////////////////////////////////////////////////////////////////////////////////
// Load User's custom tags - IF it was sent by the server


							

								//Log RunTime
								//run_time_log('L1080 - done processing tag data');

////////////////////////////////////////////////////////////////////////////////
// Load project and keyword data - IF it was sent by the server

								if(json_obj.projects !== undefined && json_obj.projects !== null && json_obj.total_projects !== undefined && json_obj.total_projects !== null) {

									total_projects = parseInt(json_obj.total_projects);

											if ((total_projects > 0) || (projects_data === undefined) || (projects_data === null)) {
													//Save Project Data in localStorage
													localStorage.removeItem("projects_data");
																										
													try {
													  localStorage.setItem('projects_data', JSON.stringify(json_obj.projects));
													} catch(e) {
													  if (isQuotaExceeded(e)) {
													    // Storage full, maybe notify user or do some clean-up
														console_log('purple', '[-!-]', 'Storage full (projects_data), maybe notify user or do some clean-up');
													  }
													}
													
													//projects_data = localStorage.getItem('projects_data');
													projects_data = JSON.stringify(json_obj.projects);
													console_log('purple', '[+]', 'Yes loaded project and keyword data.');
													//console_log('purple', '[+]', 'projects_data = ' + projects_data);
											}else {
													console_log('red', '[-]', 'NO did not load projects and keyword data');
											}
									
								}else {
									console_log('orange', '[-]', 'NO projects data was sent by the server.');							
								}
							
								//Log RunTime
								//run_time_log('L1115 - done processing projects_data');

// Load project data

								try {
								        projects_data_in_JSON = JSON.parse(projects_data);
								} catch(e) {
										projects_data_in_JSON = JSON.parse("{ \"success\" : false }");
										
										if (total_projects > 0) {
											//notify('Error Occurred (project_data):', e, 'danger', 600000);
											notify(Language.get_user_data_growl_error, Language.get_user_data_growl_error_corrup, 'danger', 600000);
											notify(Language.get_user_data_growl_instructions, Language.get_user_data_growl_instructions_desc, 'warning', 600000);
										}

										localStorage.setItem('projects_data', '');
								}							
								
								total_projects_loop_for_projects = 0;
							
								//Parsing Project data
								if ((projects_data_in_JSON !== undefined) && (projects_data_in_JSON !== null)) {
									if ((projects_data.length > 10)) {

										//Clears dropdown
										$("#header_dropdown_of_projects option").remove();

										console_log('blue', '[+]', 'Parsing projects_data');
										//console.log(projects_data);

										Object.keys(projects_data_in_JSON).forEach(function(project_id){
									
											if ((projects_data_in_JSON[project_id] === undefined) || (projects_data_in_JSON[project_id] === null)) {
												//No data at all for some reason
												console_log('red', '[ERROR Type = 1]', 'No valid project ID found.');
												return;
											}
									
											if ((projects_data_in_JSON[project_id]["project_name"] === undefined) || (projects_data_in_JSON[project_id]["project_name"] === null)) {
												//Project is blank for some reason
												console_log('red', '[ERROR Type = 2]', 'Blank project Found.' + ' ID=[' + project_id + ']');
												return;
											}

											if ((projects_data_in_JSON[project_id]["keywords"] === undefined) || (projects_data_in_JSON[project_id]["keywords"] === null)) {
												//There are no keyowrds in this project
												console_log('red', '[ERROR Type = 3]', 'Project has no keywords in it.' + ' ID=[' + project_id + ']');
												return;
											}

											total_projects_loop_for_projects++;
											//console_log('blue', '[+]', total_projects_loop_for_projects + ' Project Found: ' + projects_data_in_JSON[project_id]["project_name"] + ' ID=[' + project_id + ']');
									
											// Add to #header_dropdown_of_projects selection
									

												$('#header_dropdown_of_projects').append($('<option>', { value: project_id, text: projects_data_in_JSON[project_id]["project_name"] }));
											
											//Project Order
												order_id = parseInt(projects_data_in_JSON[project_id]["sort_order"]);
												projects_order[order_id] = project_id;
											
												//console_log('blue', '[+]', 'Project Order=[' + order_id + '] for project_id=[' + project_id + ']');
									
										});


											//Sort dropdown by alphanumeric order
											var options = $('#header_dropdown_of_projects option');
											var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();

											arr.sort(function(o1, o2) { var t1 = o1.t.toLowerCase(), t2 = o2.t.toLowerCase(); return t1 > t2 ? 1 : t1 < t2 ? -1 : 0; });

												options.each(function(i, o) {
														o.value = arr[i].v;
														$(o).text(arr[i].t);
												});

											update_header_dropdown_of_keywords();
											//Project order


									}
								}


								//Log RunTime
								//run_time_log('L1197 - done processing header_dropdown_of_projects');


////////////////////////////////////////////////////////////////////////////////
// Load sparkline charts - IF it was sent by the server

								if (json_obj.total_project_sparklines !== undefined && json_obj.total_project_sparklines !== null && json_obj.sparkline !== undefined && json_obj.sparkline !== null) {

									var total_project_sparklines = parseInt(json_obj.total_project_sparklines);
									//var unix_time = parseInt((new Date).getTime()/1000);

											if ((total_project_sparklines > 0) || (sparkline_data === undefined) || (sparkline_data === null)) {
													//Save Sparkline data in localStorage
													localStorage.removeItem("sparkline_data");
													
													try {
													  localStorage.setItem('sparkline_data', JSON.stringify(json_obj.sparkline));
													} catch(e) {
													  if (isQuotaExceeded(e)) {
													    // Storage full, maybe notify user or do some clean-up
														console_log('purple', '[-!-]', 'Storage full (sparkline_data), maybe notify user or do some clean-up');
													  }
													}

													//sparkline_data = localStorage.getItem('sparkline_data');
													sparkline_data = JSON.stringify(json_obj.sparkline);
													console_log('purple', '[+]', 'Yes loaded sparkline data.');
													//console_log('purple', '[+]', 'sparkline_data = ' + sparkline_data);
											}else {
													console_log('red', '[-]', 'NO did not load sparkline data');
											}
									
								}else {
									console_log('orange', '[-]', 'NO sparkline data was sent by the server.');							
								}

							
								try {
								        sparkline_data_in_JSON = JSON.parse(sparkline_data);
								} catch(e) {
										
										sparkline_data_in_JSON = JSON.parse("{ \"success\" : false }");

										if (total_projects > 0) {
											//notify('Error Occurred (sparkline_data):', e, 'danger', 600000);
											notify(Language.get_user_data_sparkline_error, Language.get_user_data_sparkline_error_desc, 'danger', 600000);
											notify(Language.get_user_data_sparkline_instructions, Language.get_user_data_sparkline_instructions_desc, 'warning', 600000);
										}

										localStorage.setItem('sparkline_data', '');
								}
															
								total_projects_loop_for_sparkline = 0;

// Create Sparkline data								
								if ((sparkline_data_in_JSON !== undefined) && (sparkline_data_in_JSON !== null)) {
								if ((sparkline_data.length > 10)) {

									//console_log('blue', '[+]', 'sparkline_data');
									//console_log('blue', '[+]', sparkline_data);

									Object.keys(sparkline_data_in_JSON).forEach(function(key){

										if ((sparkline_data_in_JSON[key] === undefined) || (sparkline_data_in_JSON[key] === null)) {
											//No data at all for some reason
											//console_log('red', '[ERROR Type = 3]', 'No key');
											return;
										}

										if ((sparkline_data_in_JSON[key]["1"] === undefined) || (sparkline_data_in_JSON[key]["1"] === null)) {
											//No ORM tags
											//console_log('red', '[ERROR Type = 3]', 'No Positive ORM Tag');
											return;
										}
									
										if ((sparkline_data_in_JSON[key]["1"]["sparkline-data"] === undefined) || (sparkline_data_in_JSON[key]["1"]["sparkline-data"] === null)) {
										
											console_log('red', '[ERROR Type = 3]', 'No Sparkline Data');

											//if (sparkline_data_in_JSON[key]["1"]["project-id"] !== undefined && sparkline_data_in_JSON[key]["1"]["project-id"] !== null) {
											//	$("#project_sparkline_" + sparkline_data_in_JSON[key]["1"]["project-id"]).text('empty');
											//};
										
											//No sparkline data
											return;
										}

										total_projects_loop_for_sparkline++;
										//console_log('black', '[~]', 'key[' + total_projects_loop_for_sparkline + '] (ORM=1)=' + sparkline_data_in_JSON[key]["1"]["sparkline-data"]);
									
										//Good to go, lets process this
									
										if (1==1) {
											if (sparkline_data_in_JSON[key]["1"]["project-id"] !== undefined && sparkline_data_in_JSON[key]["1"]["project-id"] !== null) {

												if ((sparkline_data_in_JSON[key]["1"]["project-id"] > 0) && (sparkline_data_in_JSON[key]["1"]["sparkline-data"].length > 0)) {
													$("#project_sparkline_" + sparkline_data_in_JSON[key]["1"]["project-id"]).html("<div id='sparkline_line_" + sparkline_data_in_JSON[key]["1"]["project-id"] + "' style='max-width: 60px;'>" + sparkline_data_in_JSON[key]["1"]["sparkline-data"] + "</div>");

													$("#sparkline_line_" + sparkline_data_in_JSON[key]["1"]["project-id"]).sparkline('html', {
														type: 'line',
														width: '100%',
														height: 30,
														lineColor: sparkline_data_in_JSON[key]["1"]["sparkline-color"],
														fillColor: 'rgba(0,0,0,0)',
														lineWidth: 1.25,
														maxSpotColor: '#fff',
														minSpotColor: '#fff',
														spotColor: '#fff',
														spotRadius: 0,
														highlightSpotColor: '#fff',
														highlightLineColor: '#fff'
													});

													$("#sparkline_line_" + sparkline_data_in_JSON[key]["1"]["project-id"]).addClass('flipspark');

												}else {
													//console_log('red', '[- 1548]', 'project=[' + sparkline_data_in_JSON[key]["1"]["project-id"] + '] no sparkline');
													$("#project_sparkline_" + sparkline_data_in_JSON[key]["1"]["project-id"]).html("<div id='no_sparkline_line_" + sparkline_data_in_JSON[key]["1"]["project-id"] + "' style='max-width: 60px; text-align: center; font-size: 1.4em;'><i class='zmdi zmdi-eye-off color-blue-grey no_project_click'></i></div>");
												}

										  	}else {
												
												if ((the_project_id === undefined) || (the_project_id === null)) { the_project_id = 0; }
												
												console_log('red', '[- 1556]', 'project=[' + the_project_id + '] no sparkline');
												$("#project_sparkline_" + the_project_id).html("<div id='no_sparkline_line_" + the_project_id + "' style='max-width: 60px; text-align: center; font-size: 1.4em;'><i class='zmdi zmdi-eye-off color-blue-grey no_project_click'></i></div>");
											}
											
											sparkline_processed = 1;
										}
									
								   	});

								}
								}


								//Log RunTime
								//run_time_log('L1318 - done processing sparkline data');

								update_header_dropdown_menus();
								process_client_filtering(current_client_id, sparkline_processed);

								//Log RunTime
								//run_time_log('L1324 - done processing client filtering');


								//Save user_date_format
								if (json_obj.user_date_format !== undefined && json_obj.user_date_format !== null) {
										if ((parseInt(json_obj.user_date_format) == 1) || (parseInt(json_obj.user_date_format) == 2)) {
											localStorage.setItem('user_date_format', parseInt(json_obj.user_date_format));
										}
								}




////////////////////////////////////////////////////////////////////////////////
// Update the Interface with the amount of Keywords the user has
								if(json_obj.total_user_keywords !== undefined && json_obj.total_user_keywords !== null) {
								
									if ((json_obj.total_user_keywords.toString().length > 0) && (parseInt(json_obj.total_user_keywords) > 0)) {
																					
										//Add Commas to number
										if (json_obj.user_date_format !== undefined && json_obj.user_date_format !== null) {
												if (parseInt(json_obj.user_date_format) == 1) {
														$("#dash_total_keywords").text(numberWithCommas(parseInt(json_obj.total_user_keywords)));
												}else {
													$("#dash_total_keywords").text(parseInt(json_obj.total_user_keywords));
												}
										}else {
											$("#dash_total_keywords").text(parseInt(json_obj.total_user_keywords));
										}

									}else {
										$("#dash_total_keywords").text('0');
									}

								}else {
									$("#dash_total_keywords").text('0');
								}

								//Log RunTime
								//run_time_log('L1351 - done processing interface data');

////////////////////////////////////////////////////////////////////////////////
// Update the Interface with the amount of Shared Keywords the user has

								if(json_obj.total_shared_keywords !== undefined && json_obj.total_shared_keywords !== null) {
								
									if ((json_obj.total_shared_keywords.toString().length > 0) && (parseInt(json_obj.total_shared_keywords) > 0)) {
																					
										//Add Commas to number
										if (json_obj.user_date_format !== undefined && json_obj.user_date_format !== null) {
												if (parseInt(json_obj.user_date_format) == 1) {
														$("#dash_total_shared_keywords").html( '&nbsp; <span class="color-green">' + numberWithCommas(parseInt(json_obj.total_shared_keywords)) + '</span> <a href="/q/share/" class="color-light-blue bordered_link">Shared</a> <i class="zmdi zmdi-key"></i> &nbsp;');
												}else {
													$("#dash_total_shared_keywords").html('&nbsp; <span class="color-green">' + parseInt(json_obj.total_shared_keywords) + '</span> ' + Language.txt_dash_shared + ' <i class="zmdi zmdi-key"></i> &nbsp;');
												}
										}else {
											$("#dash_total_shared_keywords").html('&nbsp; <span class="color-green">' + parseInt(json_obj.total_shared_keywords)  + '</span> ' + Language.txt_dash_shared + ' <i class="zmdi zmdi-key"></i> &nbsp;');
										}

									}else {
										$("#dash_total_shared_keywords").html('&nbsp;');
									}

								}else {
									$("#dash_total_shared_keywords").html('&nbsp;');
								}



								//Disable this for now - might be too much clutter
								if ((1==2) && (json_obj.projects_shared !== undefined && json_obj.projects_shared !== null)) {
								
									if ((json_obj.projects_shared.toString().length > 0) && (parseInt(json_obj.projects_shared) > 0)) {
																					
										//Add Commas to number
										if (json_obj.user_date_format !== undefined && json_obj.user_date_format !== null) {
												if (parseInt(json_obj.user_date_format) == 1) {
														$("#dash_total_shared_projects").html( '&nbsp; <span class="color-green">' + numberWithCommas(parseInt(json_obj.projects_shared)) + '</span> ' + Language.txt_dash_shared_projects + ' <i class="zmdi zmdi-folder"></i> &nbsp;');
												}else {
													$("#dash_total_shared_projects").html('&nbsp; <span class="color-green">' + parseInt(json_obj.projects_shared) + '</span> ' + Language.txt_dash_shared_projects + ' <i class="zmdi zmdi-folder"></i> &nbsp;');
												}
										}else {
											$("#dash_total_shared_projects").html('&nbsp; <span class="color-green">' + parseInt(json_obj.projects_shared)  + '</span> ' + Language.txt_dash_shared_projects + ' <i class="zmdi zmdi-folder"></i> &nbsp;');
										}

									}else {
										$("#dash_total_shared_projects").html('&nbsp;');
									}

								}else {
									$("#dash_total_shared_projects").html('&nbsp;');
								}


								//Log RunTime
								//run_time_log('L1408 - done processing shared data');

////////////////////////////////////////////////////////////////////////////////
// Update the Interface with the amount of Keywords the user has
								if(json_obj.request_sparkline !== undefined && json_obj.request_sparkline !== null 
									&& json_obj.request_projects !== undefined && json_obj.request_projects !== null 
									&& json_obj.refresh_all_data !== undefined && json_obj.refresh_all_data !== null
									&& json_obj.request_clients !== undefined && json_obj.request_clients !== null
									&& json_obj.current_client_id !== undefined && json_obj.current_client_id !== null) {

									console_log('blue', '[+]', 'RESPONSE - request_sparkline=[' + json_obj.request_sparkline + '] / request_projects = [' + json_obj.request_projects + '] / request_clients = [' + json_obj.request_clients + '] / refresh_all_data = [' + json_obj.refresh_all_data + '] / current_client_id = [' + json_obj.current_client_id + ']');

								}else {

									console_log('red', '[~]', 'RESPONSE - NOTHING WAS SENT BACK FOR request_sparkline=[' + json_obj.request_sparkline + '] / request_projects = [' + json_obj.request_projects + '] / request_clients = [' + json_obj.request_clients + '] / refresh_all_data = [' + json_obj.refresh_all_data + '] / current_client_id = [' + json_obj.current_client_id + ']');

								}

								//Log RunTime
								//run_time_log('L1427 - done processing interface part 2');


////////////////////////////////////////////////////////////////////////////////
//
								if(json_obj.load_user_data !== undefined && json_obj.load_user_data !== null) {
									console_log('blue', '[+]', 'Last Data Load: ' + json_obj.load_user_data);
								}


								//Log RunTime
								//run_time_log('L1438 - done processing ALL data');

								//notify('Test Keywords:P~', parseInt(json_obj.total_user_keywords), 'info', 2000);

								$("#incoming_data").fadeOut(500);
								console_log('green', '[-]', 'Done pulling global data from server for user.');
								detect_loading_time_end = Math.round(new Date().getTime()/1000.0);

								console_log('blue', '[ ]', 'loading start: ' + detect_loading_time_start);
								console_log('blue', '[ ]', 'loading end: ' + detect_loading_time_end);
								console_log('blue', '[+]', 'loading time: ' + (detect_loading_time_end - detect_loading_time_start));

								//Start interval checks
								growl_timing = window.setInterval("get_growl()", 15000);
								
								//test reload of data
								//var did_I_reload = reload_user_data(WID);
								//console_log('green', '[~]', "WID = [" + WID + "]");
								
								
////////////////////////////////////////////////////////////////////////////////
// Load client data - IF it was sent by the server

								if(json_obj.clients !== undefined && json_obj.clients !== null && json_obj.total_clients !== undefined && json_obj.total_clients !== null) {

									var total_clients = parseInt(json_obj.total_clients);

											if ((total_clients > 0) || (clients_data === undefined) || (clients_data === null)) {
													//Save clients Data in localStorage
													localStorage.removeItem("clients_data");
													
													try {
													  	localStorage.setItem('clients_data', JSON.stringify(json_obj.clients));
													} catch(e) {
													  if (isQuotaExceeded(e)) {
													    // Storage full, maybe notify user or do some clean-up
														console_log('purple', '[-!-]', 'Storage full (clients_data), maybe notify user or do some clean-up');
													  }
													}
													
													//clients_data = localStorage.getItem('clients_data');
													clients_data = JSON.stringify(json_obj.clients);
													console_log('purple', '[+]', 'Yes loaded teams data.');
											}else {
													console_log('red', '[-]', 'NO did not load teams data');
											}

								}else {
									console_log('orange', '[-]', 'NO teams data was sent by the server.');
								}

								//if(json_obj.run_times !== undefined && json_obj.run_times !== null) {
								//		Object.keys(json_obj.run_times).forEach(function(key){
								//			console_log('purple', '[+]', key + '=[' + json_obj.run_times[key] + ']');										
								//		});
								//}
								
								
								//
								//custom javascript to be ran (created by the panel) AFTER the growl data has been implemented
								if (typeof panel_javascript_after_growl != 'undefined' && $.isFunction(panel_javascript_after_growl)) {
									let panel_result = 0;
									panel_result = panel_javascript_after_growl();
									console_log('purple_bg', '[custom javascript found]', 'panel_result=[' + panel_result + ']');
								}else {
									console_log('purple_bg', '[custom javascript NOT found]', 'no custom javascript to be ran');
								}
								

						}else {

////////////////////////////////////////////////////////////////////////////////
// Something went wrong

							$("#incoming_data").fadeOut(500);

							this_sessions_has_expired();
							
							notify(Language.get_user_data_error_an_error_occurred, json_obj.message, 'danger', 100000);
							//setTimeout(function(){$(".page-loader").fadeOut()},1000);
							detect_loading_time_end = Math.round(new Date().getTime()/1000.0);

							console_log('blue', '[ ]', 'loading start: ' + detect_loading_time_start);
							console_log('blue', '[ ]', 'loading end: ' + detect_loading_time_end);
							console_log('blue', '[+]', 'loading time: ' + (detect_loading_time_end - detect_loading_time_start));
							
						}
					
		        },
		        dataType: "json"//set to JSON    
		    });
			
			
	}

////////////////////
//
	function notify(the_title, the_message, type, timing, icon, noti_position = "right"){
		
		var my_icon = icon;
		
		if ((my_icon === undefined) || (my_icon === null)) { my_icon = 'zmdi zmdi-alert-triangle'; }
		if (my_icon.length < 4) { my_icon = 'zmdi zmdi-alert-triangle'; }

			//if missing zmdi zmdi-(icon) then fix
			if (my_icon.indexOf('zmdi-') == 0) {
				
				console_log('yellow', '[BAD ICON - E1]', 'A missing "zmdi" was detected.');
				
				my_icon = 'zmdi ' + my_icon;
			}else {
				if (my_icon.indexOf('zmdi') == -1) {

					console_log('yellow', '[BAD ICON - E2]', 'A missing "zmdi zmdi-" was detected.');
					my_icon = 'zmdi zmdi-' + my_icon;
				}
			}
		
	    $.notify({
	        icon: my_icon,
	        title: the_title,
	        message: the_message,
	        url: ''
	    },{
	        element: 'body',
	        type: type,
	        allow_dismiss: true,
	        placement: {
	            from: 'top',
	            align: noti_position
	        },
	        offset: {
	            x: 20,
	            y: 20
	        },
	        spacing: 10,
	        z_index: 1032,
	        delay: timing,
	        timer: 1000,
	        url_target: '_blank',
	        mouse_over: false,
	        animate: {
	            enter: 'animated bounceIn',
	            exit: 'animated bounceOut'
	        },
	        template:   '<div data-notify="container" class="alert alert-dismissible alert-{0} alert--notify" role="alert">' +
	        '<span data-notify="icon"></span> ' +
	        '<span data-notify="title">{1}</span> ' +
	        '<span data-notify="message">{2}</span>' +
	        '<div class="progress" data-notify="progressbar">' +
	        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
	        '</div>' +
	        '<a href="{3}" target="{4}" data-notify="url"></a>' +
	        '<button type="button" aria-hidden="true" data-notify="dismiss" class="alert--notify__close"><i style="font-size: 2em;" class="zmdi zmdi-close"></i></button>' +
	        '</div>'
	    });
	}
	
	function notify_v3(icon, type, time_period, title, description) {
		//notify_v3('zmdi zmdi-alert-triangle', 'danger', 20000, 'Error', 'Click a project report (left sidebar) to load it up, then click the edit report button.');
		
		//Convert old_school into newest format
		notify(title + ': ', description, type, time_period, icon);
	
	}
	

	function clear_notifications(){

		$('#incoming_data').show();

		clear_alerts_quickly(WID);

			$("#nav_new_alerts_amount_main").text('0');
			$("#nav_new_alerts_amount_minor").text('0');
			$("#nav_new_alerts_amount_main").hide();
			$("#nav_alert_rows").html('');

		$('#incoming_data').fadeOut(500);

	}


////////////////////
//
	function update_header_dropdown_of_keywords() {

		var current_project_selected_id = parseInt($("#header_dropdown_of_projects").val());
		
		var current_windowID_sessionstorage = get_windowID();

			//Update the "View Project" Button link
			if (current_project_selected_id > 0) {
					$('#header_dropdown_of_projects_folder').attr('href','/q/project/' + current_project_selected_id + '/');
			}else {
					$('#header_dropdown_of_projects_folder').attr('href','/q/projects/');
			}

			$("#header_dropdown_of_keywords").empty();
			
			var projects_data_in_JSON_2 = projects_data_in_JSON;

			if ((projects_data_in_JSON_2 === undefined) || (projects_data_in_JSON_2 === null)) {
				return;
			}

			if ((projects_data_in_JSON_2[current_project_selected_id] !== undefined) && (projects_data_in_JSON_2[current_project_selected_id] !== null)) {
					//Add the keywords for this project into the dropdown
					Object.keys(projects_data_in_JSON_2[current_project_selected_id]["keywords"]).forEach(function(keyword_id){
						
						let keyword_without_escape = projects_data_in_JSON_2[current_project_selected_id]["keywords"][keyword_id]["phrase"].replace(/\\"/g, '"');

						$('#header_dropdown_of_keywords').append($('<option>', { value: keyword_id, text: keyword_without_escape }));
					});

				//Sort dropdown by alphanumeric order
				var options = $('#header_dropdown_of_keywords option');
				var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
				arr.sort(function(o1, o2) { var t1 = o1.t.toLowerCase(), t2 = o2.t.toLowerCase(); return t1 > t2 ? 1 : t1 < t2 ? -1 : 0; });
					options.each(function(i, o) {
							o.value = arr[i].v;
							$(o).text(arr[i].t);
					});


					//Update the "Go Keyword" Button link
					if (parseInt($('#header_dropdown_of_keywords').val()) > 0) {
							$('#header_dropdown_of_keywords_serp_view').attr('href','/q/serp/' + parseInt($("#header_dropdown_of_projects").val()) + '/' + parseInt($('#header_dropdown_of_keywords').val()) + '/?windowID=' + current_windowID_sessionstorage);

							$('.interface_all_projects').each(function(i, obj) {
							    $(this).attr('href','/q/projects/?windowID=' + current_windowID_sessionstorage);
							});

					}else {
							$('#header_dropdown_of_keywords_serp_view').attr('href','/q/home/');

							$('.interface_all_projects').each(function(i, obj) {
							    $(this).attr('href','/q/projects/?windowID=' + current_windowID_sessionstorage);
							});
							
					}
					
					
			}
	
	}


////////////////////
//
	function get_growl() {
		//Interval Call to pull data (GROWL)
		growl_check_iterations++;
		
		//Disable check after 15 minutes of idle
		if (growl_check_iterations >= 60) {
				console_log('blue', '[~]', 'This page is probably idle, stopping pinging back: Iterations=[' + growl_check_iterations + ']');
				//run_time_log('Stopping growl check-in.');
				//$('#new_data_available').css('display', 'inline-block');
				clearInterval(growl_timing);
		}

	    $.ajax({
	        type: "POST", 
	        url: "/q/a/growl2/",
			data: "wid=" + WID,
			cache: false,
			error: function( XMLHttpRequest, textStatus, errorThrown ) {

					notify(Language.get_growl_un_able_connect, Language.get_growl_un_able_connect_desc, 'danger', 600000, 'zmdi zmdi-help');
					
					clearInterval(growl_timing);
					console_log('red', '[+]', 'Stopped attempting to connect to the SERPWoo Q system - internet connection problem detected.');

			 },
	        success: function(response)
	        {
	            //console.log(response);

					var json_obj = response;//parse JSON

					if (json_obj.success === undefined || json_obj.success === null) {
						notify(Language.get_growl_weird_error, Language.get_growl_weird_error_desc, 'warning', 30000);
						return;
					}

					if (json_obj.session_valid === undefined || json_obj.session_valid === null) {
						notify(Language.get_growl_weird_error, Language.get_growl_weird_error_desc, 'warning', 30000);
						return;
					}

					if (parseInt(json_obj.session_valid) != 1 && parseInt(json_obj.session_valid) != 2) {
						//Invalid Session detected

						this_sessions_has_expired();
						
						notify(Language.growl2_error, Language.growl2_error_desc, 'danger', 600000);
		
						clearInterval(growl_timing);
						
						return;
					}

					if ((json_obj.success === true) && (parseInt(json_obj.session_valid) == 1)) {
						//everything good to go
						
						if (json_obj.total_growl === undefined || json_obj.total_growl === null || json_obj.reload_page === undefined || json_obj.reload_page === null) {
							notify(Language.get_growl_weird_error, Language.get_growl_weird_error_desc, 'warning', 30000);
							return;
						}

						////////////////////////////////////////////////////////////////////////////////
						//Displays growl messages
						var total_growl_alerts = parseInt(json_obj.total_growl);
					
						//notify("total_growl_alerts: ", total_growl_alerts, "info", 20000, "help");

							if (total_growl_alerts > 0) {
								    for (i=0; i<total_growl_alerts; i++) {
										if (json_obj.growl[i].message !== undefined && json_obj.growl[i].message !== null) {
									      if (json_obj.growl[i].message.length > 4) {
											  notify(json_obj.growl[i].title, json_obj.growl[i].message, json_obj.growl[i].type, json_obj.growl[i].on_screen_time, json_obj.growl[i].icon);
									      }
									  	}
									}
							}

							//console_log('blue', '[+]', 'Getting new data alerts: ' + total_growl_alerts);

							if (json_obj.reload_page !== undefined && json_obj.reload_page !== null) {

								if (parseInt(json_obj.reload_page) >= 26000) {
									
									//Simply show an indicator that there is new data instead of forcing reload
									//$('#new_data_available').css('display', 'inline-block');
									
									console_log('red', '[+]', 'Page data is over 7 hours old or there is new data and the page needs refreshing: ' + json_obj.reload_page);
									clearInterval(growl_timing);
								}
								
							}

					}else {
						//Something went wrong

							console_log('red', '[-]', 'Unable to get new data.');

					}

	        },
	        dataType: "json"//set to JSON    
	    });


	}


////////////////////
//
	
	function this_sessions_has_expired() {

		$(".header").remove();
		$(".sidebar").remove();
		$(".content").remove();
		$("body").html("<div style='width:500px; margin: 200px auto; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.075);'><div class='bg-sw-blue text-center p-5'><b><a href='/q/logout/#SessionTurnedInvalid' class='color-white'>" + Language.get_user_data_error_relogin + " &rarr;</a></b></div></div>");

	}


////////////////////
//
	function parse_json_alerts(json_obj) {
		
		if ((json_obj.total_alerts === undefined) || (json_obj.total_alerts === null)) {
			var total_new_alerts = 0;
		}else {
			var total_new_alerts = parseInt(json_obj.total_alerts);			
		}
		
		console_log('blue', '[+]', 'parsing Alerts from JSON total_new_alerts=[' + total_new_alerts + ']');
		
		var new_alert_html = "";
		var overall_alerts = 0;

			if ((total_new_alerts > 0) && (json_obj.notifications !== undefined) && (json_obj.notifications !== null)) {
				
				    for (i=0; i<total_new_alerts; i++) {
						//Limits output to 8 in the interface html
						if ((i < 10) && (json_obj.notifications[i] !== undefined) && (json_obj.notifications[i] !== null)) {
							if (json_obj.notifications[i].alert_text !== undefined && json_obj.notifications[i].alert_text !== null) {
						    	if (json_obj.notifications[i].alert_text.length > 4) {
						  
								  	overall_alerts++;
						  
								  	new_alert_html = new_alert_html + "<tr  class=\"client_filter client_filter_alert\" data-project-id=\"" + json_obj.notifications[i].project_id + "\"><td style=\"word-wrap: break-word; text-align: left; padding: 12px; border-left: 4px " + json_obj.notifications[i].color + " solid; background: #f9f9f9;\"><span class=\"brightblue\">" + json_obj.notifications[i].alert_text + "</span> - <a href=\"" + json_obj.notifications[i].href_link + "\">" + Language.alert_direct_link + "</a>, <span style=\"color: #0099AA; font-style: italic; font-weight: bold; font-size: 0.9em;\">" + json_obj.notifications[i].timestamp + "</span></td></tr>\n ";
						  
							  	}
						  	}
						}
					}


					//Updates the Alerts HTML
					$("#nav_alert_rows").html("<table style='width: 100%; margin: 0px auto; padding: 0px;'><tbody><tr>" + new_alert_html  + "</tr></tbody></table>");

			}else {

				//Updates the Alerts HTML
				
				if (current_client_id == 0) {
					$("#nav_alert_rows").html("<table style='width: 100%; margin: 0px auto; padding: 0px;'><tbody><tr><td>" + Language.parse_alert_no_data + "</td></tr></tbody></table>");
				}else {
					
					if(current_client_id_name !== undefined && current_client_id_name !== null) {
						
						$("#nav_alert_rows").html("<table style='width: 100%; margin: 0px auto; padding: 0px;'><tbody><tr><td><p>" + Language.no_alerts_team + " <b class='color-deep-orange'>" + current_client_id_name + "</b>.</p><p>" + Language.no_alerts_team_2 + "</p></td></tr></tbody></table>");

					}else {

						$("#nav_alert_rows").html("<table style='width: 100%; margin: 0px auto; padding: 0px;'><tbody><tr><td><p>" + Language.no_alerts_team_3 + "</p><p>" + Language.no_alerts_team_4 + "</p></td></tr></tbody></table>");
						
					}
					
				}
			
			}



			if(json_obj.total_new_alerts !== undefined && json_obj.total_new_alerts !== null) {

				if (json_obj.total_new_alerts > 0) {
																
					$("#nav_new_alerts_amount_main").show();
					
					if (current_client_id > 0) {
							$("#nav_new_alerts_amount_main").removeClass('bg-orange bg-indigo bg-blue-grey').addClass('bg-indigo');
					}else {
							$("#nav_new_alerts_amount_main").removeClass('bg-orange bg-indigo bg-blue-grey').addClass('bg-orange');
					}

					//Add Commas to number
					if (json_obj.user_date_format !== undefined && json_obj.user_date_format !== null) {
							if (parseInt(json_obj.user_date_format) == 1) {
									$("#nav_new_alerts_amount_minor, #nav_new_alerts_amount_main").text(numberWithCommas(parseInt(json_obj.total_new_alerts)));
							}else {
								$("#nav_new_alerts_amount_minor, #nav_new_alerts_amount_main").text(parseInt(json_obj.total_new_alerts));
							}
					}else {
						$("#nav_new_alerts_amount_minor, #nav_new_alerts_amount_main").text(parseInt(json_obj.total_new_alerts));
					}

				}else {
					$("#nav_new_alerts_amount_minor").text('0');
					$("#nav_new_alerts_amount_main").text('0');
					$("#nav_new_alerts_amount_main").hide();																
				}

			}else {
				$("#nav_new_alerts_amount_minor").text('0');
				$("#nav_new_alerts_amount_main").text('0');
				$("#nav_new_alerts_amount_main").hide();
			}


	}

////////////////////////////////////////////////////////////////////////////////
	
    /*
    * SPARKLINE
    */
    function sparklineLine(id, values, width, height, lineColor, fillColor, lineWidth, maxSpotColor, minSpotColor, spotColor, spotRadius, hSpotColor, hLineColor) {
        $('.'+id).sparkline(values, {
            type: 'line',
            width: width,
            height: height,
            lineColor: lineColor,
            fillColor: fillColor,
            lineWidth: lineWidth,
            maxSpotColor: maxSpotColor,
            minSpotColor: minSpotColor,
            spotColor: spotColor,
            spotRadius: spotRadius,
            highlightSpotColor: hSpotColor,
            highlightLineColor: hLineColor
        });
    }

    function sparklineBar(id, values, height, width, barWidth, barColor, barSpacing) {
        $('.'+id).sparkline(values, {
            type: 'bar',
            height: height,
            width: width,
            barWidth: barWidth,
            barColor: barColor,
            barSpacing: barSpacing
        })
    }

    function sparklinePie(id, values, width, height, sliceColors) {
        $('.'+id).sparkline(values, {
            type: 'pie',
            width: width,
            height: height,
            sliceColors: sliceColors,
            offset: 0,
            borderWidth: 0
        });
    }

////////////////////////////////////////////////////////////////////////////////
// If the user's data is too much for the browser's current settings
	
	function isQuotaExceeded(e) {
	  var quotaExceeded = false;
	  if (e) {
	    if (e.code) {
	      switch (e.code) {
	        case 22:
	          quotaExceeded = true;
	          break;
	        case 1014:
	          // Firefox
	          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
	            quotaExceeded = true;
	          }
	          break;
	      }
	    } else if (e.number === -2147024882) {
	      // Internet Explorer 8
	      quotaExceeded = true;
	    }
	  }
	  return quotaExceeded;
	}
	
	
////////////////////////////////////////////////////////////////////////////////
// Generate a WindowID for this tab
	
	function random_alphanum(text_length = 10) {

		let text = "";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (let i = 0; i < text_length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
		
	}
	
	function make_windowID() {

		let text = random_alphanum(10);

		sessionStorage.setItem('windowID', text);
		//console_log('red', '[-]', 'set windowID=[' + text + ']');

		return text;

	}
		
	function get_windowID() {

		var currentwindow_ID = sessionStorage.getItem('windowID');

			if ((currentwindow_ID === undefined) || (currentwindow_ID === null)) {

				currentwindow_ID = make_windowID();
				//console_log('red', '[-]', 'no windowID found - new=[' + currentwindow_ID + ']');

			}else {

				if (currentwindow_ID.length <= 9) {

					currentwindow_ID = make_windowID();
					//console_log('red', '[-]', 'BAD windowID found - new=[' + currentwindow_ID + ']');

				}else {

					//console_log('blue', '[+]', 'GOOD windowID found=[' + currentwindow_ID + ']');

				}

			}

		sessionStorage.setItem('windowID', currentwindow_ID);
		//console_log('red', '[-]', 'set windowID=[' + currentwindow_ID + ']');

		return currentwindow_ID;

	}
	
	
////////////////////////////////////////////////////////////////////////////////
// Header Dropdown

	function update_header_dropdown_menus() {

		var interface_settings_local = localStorage.getItem('interface_settings');
		var interface_settings_session = sessionStorage.getItem('interface_settings');

			//Attempt to use session first
			if ((interface_settings_session !== undefined) && (interface_settings_session !== null)) {
				interface_settings_in_JSON = JSON.parse(interface_settings_session);
			}else {

				if ((interface_settings_local !== undefined) && (interface_settings_local !== null)) {
					interface_settings_in_JSON = JSON.parse(interface_settings_local);
				}else {
					console_log('orange', '[-]', 'Interface settings do not exit.');
					//$('#header_dropdown_of_projects_folder').attr('href','/q/projects/'); //Default to all projects
					//$('#header_dropdown_of_keywords_serp_view').attr('href','/q/main/'); //Default to main
					return;
				}

			}


			if ((interface_settings_in_JSON["header"]["project_id"] !== undefined) && (interface_settings_in_JSON["header"]["project_id"] !== null)) {
				$("#header_dropdown_of_projects").val(interface_settings_in_JSON["header"]["project_id"]);
				$("#header_dropdown_of_projects").trigger("change");
				console_log('red', '[-]', 'Found project_id=[' + interface_settings_in_JSON["header"]["project_id"] + ']');
				update_header_dropdown_of_keywords();

				if ((interface_settings_in_JSON["header"]["keyword_id"] !== undefined) && (interface_settings_in_JSON["header"]["keyword_id"] !== null)) {
					$("#header_dropdown_of_keywords").val(interface_settings_in_JSON["header"]["keyword_id"]);
					$("#header_dropdown_of_keywords").trigger("change");				
					console_log('red', '[-]', 'Found keyword_id=[' + interface_settings_in_JSON["header"]["keyword_id"] + ']');
				}
			}else {
				console_log('red', '[-]', 'Could not properly determine Header Dropdown Menu from Interface Settings');
			}

	}
	
	
	function save_interface_settings(the_project_id = 0, the_keyword_id = 0) {
		
			if ((parseInt(the_project_id) < 1) || (parseInt(the_keyword_id) < 1)) {
				console_log('orange', '[-]', 'Could not properly save new Header Dropdown Menu for Interface Settings');
				return;
			}else {
				console_log('blue', '[-]', 'Attempting to save Header Dropdown Menu for Interface Settings project_id=[' + the_project_id + '] keyword_id=[' + the_keyword_id + ']');
			}
			
		var new_interface_settings = JSON.parse("{ \"success\" : true, \"header\" : { \"project_id\" : " + the_project_id + ", \"keyword_id\" : " + the_keyword_id + "} }");

			localStorage.setItem('interface_settings', JSON.stringify(new_interface_settings));
			sessionStorage.setItem('interface_settings', JSON.stringify(new_interface_settings));
		
			console_log('red', '[-]', 'Saved New Interface settings | project_id=[' + the_project_id + '] keyword_id=[' + the_keyword_id + ']');

	}
	
	
////////////////////////////////////////////////////////////////////////////////
// ClientSwitch
	
	
	var total_client_view_pages = 1;
	
	function show_all_clients () {
		// Cannot be a hidden or deleted project
		
		var client_list_found = 0;
		var client_list_found_2 = 0;
		var amount_of_col_span = 0;
		var column_divider = 10;
		var client_name_font_size = '1em';
		var client_switch_body_data = '<div class="page" id="page' + total_client_view_pages + '"><div class="row">';
		var myClientOjb = [];
		
		let total_hidden_clients = 0;

		console_log('green', '[=]', 'Current ClientID = [' + current_client_id + ']');

		setTimeout(function() {
			
			
			var clients_data = localStorage.getItem('clients_data');

			if ((clients_data !== undefined) && (clients_data !== null) && (clients_data.length >= 10)) {

					try {
					        clients_data_in_JSON = JSON.parse(clients_data);
					} catch(e) {
							clients_data_in_JSON = JSON.parse("{ \"success\" : false }");
							//notify('Error Occurred (clients_data):', e, 'danger', 600000);
							notify(Language.show_all_clients_error, Language.show_all_clients_error_desc, 'danger', 600000);
							notify(Language.show_all_clients_error_instructions, Language.show_all_clients_error_instructions_desc, 'warning', 600000);
							localStorage.setItem('clients_data', '');
							return;
					}							

			}else {
				//no clients_data to process
				notify(Language.show_all_clients_error_2346, Language.show_all_clients_error_2346_desc, 'warning', 600000);
				return;
			}
			
			if ((clients_data_in_JSON !== undefined) && (clients_data_in_JSON !== null)) {

				//Pretty bad setup for sorting by client name, but will do for now

				Object.keys(clients_data_in_JSON).forEach(function(client_id){
					myClientOjb[client_id] = clients_data_in_JSON[client_id]['name'];
					client_list_found++;
					//console_log('purple', '[96]', client_id + '~' + clients_data_in_JSON[client_id]['name']);
				});

				myClientOjb.sort(function(a, b){
					    return a.localeCompare(b);
				}).forEach(function(entry, k, w) {
					//console_log('red', '[' + k + ']', entry);
					
					if ((client_list_found <= 8)) { amount_of_col_span = 6; column_divider = 4; }
					else if ((client_list_found > 8) && (client_list_found <= 16)) { amount_of_col_span = 6; column_divider = 8; }
					else if ((client_list_found > 16) && (client_list_found <= 24)) { amount_of_col_span = 4; column_divider = 8; }
					else if ((client_list_found > 24)) { amount_of_col_span = 4; column_divider = 8; }

					//Look through clients and create pages with paginations
					Object.keys(clients_data_in_JSON).forEach(function(client_id){
						
						let highlight_class = '';

						if ((clients_data_in_JSON[client_id]['name'] === entry)) {

							if ((clients_data_in_JSON[client_id] === undefined) || (clients_data_in_JSON[client_id] === null)) {
								//No data at all for some reason
								console_log('red', '[ERROR Type = 1]', 'No valid team ID found.');
								return;
							}

							if ((clients_data_in_JSON[client_id]['name'] === undefined) || (clients_data_in_JSON[client_id]['name'] === null)) {
								//No data at all for some reason
								console_log('red', '[ERROR Type = 1]', 'No valid team name found.');
								return;
							}
		
							if ((clients_data_in_JSON[client_id]['projects_total'] === undefined) || (clients_data_in_JSON[client_id]['projects_total'] === null)) {
								//No data at all for some reason
								//console_log('red', '[ERROR Type = 1]', 'No valid projects found inside client.');
								//return;
								clients_data_in_JSON[client_id]['projects_total'] = 0;
							}
							
							//Make sure there is at least 1 visible project										
							let found_one_non_hidden_project = 0;

							if ((clients_data_in_JSON[client_id]['projects'] !== undefined) && (clients_data_in_JSON[client_id]['projects'] !== null)) {
									Object.keys(clients_data_in_JSON[client_id]['projects']).forEach(function(project_id){
									if ((projects_data_in_JSON[project_id] !== undefined) && (projects_data_in_JSON[project_id] !== null)) {
										found_one_non_hidden_project = 1;
										return;
									}
								});
							}
							
							if ((found_one_non_hidden_project == 0) || (clients_data_in_JSON[client_id]['projects_total'] == 0)) {
								console_log('red', '[-]', 'Team: ' + clients_data_in_JSON[client_id]['name'] + ' has no visible projects.');
								total_hidden_clients++;
								return;
							}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

							//New Page
							if (((client_list_found_2 % 30) == 0) && (client_list_found_2 > 0)) {
								total_client_view_pages++;
								client_switch_body_data += '</div></div><div class="page" id="page' + total_client_view_pages + '"><div class="row">';
							}


							if ((client_list_found_2 % column_divider) == 0) {
								client_switch_body_data += "\n<div class=\"col-sm-12 col-md-" + amount_of_col_span + " col-lg-" + amount_of_col_span + "\">";
							}
							
							if (clients_data_in_JSON[client_id]['name'].length > 24) {
								client_name_font_size = '0.8em';
							}else {
								client_name_font_size = '1em';
							}


							//client_switch_body_data += '<div><a href="#' + client_id + '">' + client_id + ' ~ ' + clients_data_in_JSON[client_id]['name'] + '</a></div>';
							if (client_id == current_client_id) {

								client_switch_body_data += '<div class="pt-2 pb-2 top_nav_client_select highlight_top_nav_client" data-client="' + client_id + '"><div class="pl-4"><i class="zmdi zmdi-accounts"></i> &nbsp; <span style="font-size: ' + client_name_font_size + ';" dir="auto">' + clients_data_in_JSON[client_id]['name'] + '</span> &nbsp; (<span class="color-yellow">' + clients_data_in_JSON[client_id]['projects_total']  + ' <i class="zmdi zmdi-folder"></i></span>)</div></div>';

							}else {

								client_switch_body_data += '<div class="pt-2 pb-2 top_nav_client_select" data-client="' + client_id + '"><div class="pl-4"><i class="zmdi zmdi-accounts"></i> &nbsp; <span style="font-size: ' + client_name_font_size + ';" dir="auto">' + clients_data_in_JSON[client_id]['name'] + '</span> &nbsp; (<span class="color-blue">' + clients_data_in_JSON[client_id]['projects_total']  + ' <i class="zmdi zmdi-folder"></i></span>)</div></div>';

							}
							

							client_list_found_2++;
				
							//New Column
							if ((client_list_found_2 % column_divider) == 0) {
								client_switch_body_data += "</div>";
							}
							
							
						}				
					});		
				});

				client_switch_body_data += "</div>";

				if (client_list_found >= 1) {
					$('#client_switch_body').html(client_switch_body_data);
					
					//Client Switch Pagination
					$('#pagination_nav').twbsPagination({
						totalPages: total_client_view_pages,

						// maximum visible pages
						visiblePages: 4,

						initiateStartPageClick: true,

						// template for pagination links
						href: false,

						// variable name in href template for page number
						hrefVariable: '{{number}}',

						// Text labels
						first: '<span aria-hidden="true">&laquo;</span>',
						prev: '<span aria-hidden="true">&larr;</span>',
						next: '<span aria-hidden="true">&rarr;</span>',
						last: '<span aria-hidden="true">&raquo;</span>',

						// carousel-style pagination
						loop: true,

						// callback function
						onPageClick: function (event, page) {
							console_log('blue', '[PAGE]', 'Page ' + page);
							$('.page-active').removeClass('page-active');
							$('#page'+page).addClass('page-active');
						},

						// pagination Classes
						paginationClass: 'pagination',
						nextClass: 'next',
						prevClass: 'prev',
						lastClass: 'last',
						firstClass: 'first',
						pageClass: 'pagex',
						activeClass: 'active',
						disabledClass: 'disabled',
						hideOnlyOnePage: false,
						anchorClass: 'page-linkx bg-sw-blue color-white m-1'
					});

					console_log('purple', '[ ]', ' End Processing Pagination');

				}
			
			}

			if (total_hidden_clients == 0) {
					$('#client_switch_total_clients').html('<span class="color-amber">' + client_list_found + '</span> ' + Language.show_all_clients_total);
			}else {
				$('#client_switch_total_clients').html('<span class="color-amber">' + total_hidden_clients + '</span> ' + Language.show_all_clients_hidden + ' / <span class="color-amber">' + client_list_found + '</span> ' + Language.show_all_clients_total);
			}
			//console_log('blue', '[+]', ' MODAL Opening - client switch');

		}, 100);

		setTimeout(function() {
			$('#ClientSwitch').modal('show');
		}, 100);

		
	}


$(document).ready(function(){
				
	// Client Switch opened up
	$(document).on('click', '#open_client_data', function(){
		
		if ((projects_data_in_JSON === undefined) || (projects_data_in_JSON === null)) {
			
			if (total_projects > 0) {
				console_log('red', '[-]', ' ProjectData has not completed loading yet .');
				notify('', Language.open_client_data_interface_no_completed, 'warning', 120000, 'zmdi zmdi-refresh-sync-alert');
				notify('', Language.open_client_data_interface_5_10, 'info', 120000, 'zmdi zmdi-refresh-sync-alert');

				return;

			}else {
				console_log('red', '[-]', ' There are no projects in your account.');
				notify('', Language.open_client_data_interface_no_projects, 'warning', 120000, 'zmdi zmdi-refresh-sync-alert');
			}

		}else {
			//console_log('blue', '[+]', ' MODAL Clicked - team switch');
		}


			setTimeout(function() {
				$('#client_switch_total_clients').html('<span class="color-orange">' + Language.open_client_data_processing + '</span>');
				$('#pagination_nav').twbsPagination('destroy');
			}, 1);

			setTimeout(function() {
				show_all_clients();
			}, 1);
	});

	//If a user right clicks on one of the interface_all_projects, which has a filter, it removes the widowID
	$('.interface_all_projects').bind("contextmenu", function (e) {
		    $(this).attr('href','/q/projects/');
	});


});
	