////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/////////////// Main Interface

	var Language = {};

	Language.ajax_processing = "Processing...";
	Language.ajax_sys_error = "System Error:";
	Language.ajax_error = "ERROR";
	Language.ajax_sys_error_desc = "Something is wrong - could not communicate with the SERPWoo Quantum server.";
	Language.ajax_try_again = "Please try again later. Admins have been notified.";

	// New Data
	Language.txt_new_data_title = "Data Reloaded";
	Language.txt_new_data_desc = "New data is available, you can reload the page to load it into the interface or wait till you visit another page and the new data will automatically load.";
	Language.txt_new_data_title_doc = "New Data";

	Language["txt_data_error_title"] = "New Data";
	Language["txt_data_error_desc"] = "Data did not load correctly! (Perhaps try again later)";

	//New Home Panel
	Language["txt_set_new_home_title"] = "Success";
	Language["txt_set_new_home_desc"] = 'This panel is now your new home panel. You can get to it by clicking the "My Home" link in the top navigation and it will be your default screen once you login.';

	//MiSC Panel text
	Language["txt_panel_team"] = "Team:";
	Language["txt_dash_shared"] = "Shared";
	Language["txt_dash_shared_projects"] = "Shared Projects";
	Language.alert_direct_link = "Direct Link";
	
	//Team Filter
	Language["txt_valid_client_filter_title"] = ""; //left blank on purpose
	Language["txt_valid_client_filter_desc"] = "Interface is only displaying projects from your team:";

	Language["txt_no_client_filter_title"] = ""; //left blank on purpose
	Language["txt_no_client_filter_desc"] = "Interface is now displaying all non-hidden projects.";
	

	Language["txt_swal_panel_reload_title"] = "Panel Needs Reloading!";
	Language["txt_swal_panel_reload_desc"] = "Switching the team filter requires this panel to be reloaded to get the latest data. Would you like to reload the page now?";
	

	Language["txt_swal_panel_reload_btn_confirm"] = "Yes, Reload!";


	// Right Side Bar
	Language["txt_right_sidebar_no_data_hover_title"] = "No Domain Data";
	Language["txt_right_sidebar_no_data_hover_desc"] = "This project has no positive tagged domains/urls which are ranking within the search engine results for the project&#39;s keywords.";


	//process_client_filter
	Language.process_client_filter_error = "Error:";
	Language.process_client_filter_unknown_team = "Unknown team within the team filter";
	Language.process_client_filter_corrupt_data = "Corrupt Data";
	Language.process_client_filter_instructions = "Instructions:";
	Language.process_client_filter_instructions_reload = "Please try reloading the page, the bad data has been cleared.";

	Language.no_alerts_team = "It doesn&#39;t look like you have any alerts for team";
	Language.no_alerts_team_2 = "Once projects within this team start generating alerts they will populate here for you!";

	Language.no_alerts_team_3 = "It doesn&#39;t look like you have any alerts within this team.";
	Language.no_alerts_team_4 = "Once projects within this team start generating alerts they will populate here for you!";
	
	Language.get_user_data_connection_problem = "Connection Problem:";
	Language.get_user_data_connection_problem_2 = "Data did not load correctly (this happens when a page is reloaded while data is being downloaded).";
	Language.get_user_data_connection_problem_3 = "Solution:";
	Language.get_user_data_connection_problem_4 = "Simply reloading this page will solve the problem.";
					       
	Language.get_user_data_error = "Error:";
	Language.get_user_data_error_desc = "An weird communication error has occurred, please check to make sure your internet connection is live.";


	Language.get_user_data_growl_error = "Error Occurred (project_data):";
	Language.get_user_data_growl_error_corrupt = "Corrupt Data";
	Language.get_user_data_growl_instructions = "Instructions:";
	Language.get_user_data_growl_instructions_desc = "Please try reloading the page, the bad data has been cleared.";


	Language.get_user_data_sparkline_error = "Error Occurred (sparkline_data):";
	Language.get_user_data_sparkline_error_desc = "Corrupt Data";
	Language.get_user_data_sparkline_instructions = "Instructions:";
	Language.get_user_data_sparkline_instructions_desc = "Please try reloading the page, the bad data has been cleared.";


	Language.get_user_data_error_relogin = "Click here to login";
	Language.get_user_data_error_an_error_occurred = "An error has occurred:";


	Language.get_growl_un_able_connect = "Un-Able to Connect:";
	Language.get_growl_un_able_connect_desc = "Something is wrong with the connection to the server.";

	Language.get_growl_weird_error = "Error";
	Language.get_growl_weird_error_desc = "An weird communication error has occurred, please check to make sure your internet connection is live.";


	Language.parse_alert_no_data = "<p>It doesn&#39;t look like you have any alerts yet.</p><p>Alerts start populating when your projects start getting processed for daily movement.</p><p>If you haven&#39;t created any projects yet you can start by creating your first project using the <a href=\"/q/wizard/\">Project Wizard</a>.</p>";


	Language.growl2_error = "Error";
	Language.growl2_error_desc = "This session has expired";


	Language.show_all_clients_error = "Error Occurred (clients_data):";
	Language.show_all_clients_error_desc = "Corrupt Data";
	Language.show_all_clients_error_instructions = "Instructions:";
	Language.show_all_clients_error_instructions_desc = "Please try reloading the page, the bad data has been cleared.";

	Language.show_all_clients_error_2346 = "Error";
	Language.show_all_clients_error_2346_desc = "Unable to find any team data - did you already create your first team?";

	Language.show_all_clients_total = "Total";
	Language.show_all_clients_hidden = "Hidden";

	Language.open_client_data_interface_no_completed = "Interface Data has not completed loading yet.";
	Language.open_client_data_interface_5_10 = "Try clicking the Team Filter again in 5-10 seconds.";
	Language.open_client_data_interface_no_projects = "There are no projects in your account.";
	Language.open_client_data_processing = "Processing...";

// (End of interface-1557600004.js)




	
	//Quick Insight
	
	//Quick Add
	
	//Intercom Disabled


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////	
/////////////// Client/team - Single
	
	Language["team_delete_team_are_you_sure"] = "Are You Sure You Want To Delete This Team?";
	Language["team_delete_team_are_you_sure_txt"] = "Your team share invitations and other data for this team will be erased.";
	Language["team_delete_team_confirmation"] = "Yes, delete this team!";
	Language["team_delete_team_cancel"] = "Cancel";
	

////////////////////////////////////////////////////////////////////////////////	
/////////////// Keyword Finder
	
	Language["kw_finder_data_done_title"] = "Process Complete!";
	Language["kw_finder_data_done_desc"] = "Your query is completed.";
	
	Language["kw_finder_no_data_title"] = "No Data Found!";
	Language["kw_finder_no_data_desc"] = "Please refine your search (perhaps less words if your input was 4 or more words).";
	

////////////////////////////////////////////////////////////////////////////////	
/////////////// Projects


////////////////////////////////////////////////////////////////////////////////	
/////////////// Project - Single View
	
	Language["team_delete_project_are_you_sure"] = "Are You Sure You Want To Delete This Project?";
	Language["team_delete_project_are_you_sure_txt"] = "Your saved keywords, notes, and other data for this project will be erased.";
	Language["team_delete_project_confirmation"] = "Yes, delete this project!";
	Language["team_delete_project_cancel"] = "Cancel";

	Language["team_delete_project_done_title"] = "Deleting!";
	Language["team_delete_project_done"] = "The project is being deleted, You are being redirected to your All Projects panel.";
	
	
	Language.single_project_view_multiple_projects = "(multiple projects)";
	
	Language.single_project_view_updating = "Updating";
	Language.single_project_view_deleting = "Deleting";

	Language.single_project_view_deleting_being_updated = "data is being deleted. Propagation can take up to 1-2 mins throughout the system (You can leave this page if you want).";

	Language.single_project_view_project = "Project";
	Language.single_project_view_being_deleted = "is being deleted...";

	Language.single_project_view_type_updated = "Type settings are being updated...";

	Language.single_project_view_alert_updated = "project alert settings are being updated...";
	
	Language.single_project_view_successfully_updated = "project type for have been successfully updated to";
	Language.single_project_view_successfully_alert_updated = "project alerts have been successfully updated to";
	
	
	Language.single_project_view_update_success = "Update Successful";
	Language.single_project_view_success_deleted = "have been successfully deleted.";

	Language.single_project_view_an_error = "An Error Occurred";
	Language.single_project_view_an_error_communication = "Communication Error Occurred";
	Language.single_project_view_an_error_communication_2 = "Cannot locate server. Maybe the internet connection is disconnected.";


	Language.single_project_view_blank_fields = "Blank Fields";
	Language.single_project_view_blank_fields_desc = "Nothing was selected to update.";



	Language.single_project_view_alerts_are_updated = "Alerts are being updated. Update propagation can take up to 1-2 mins throughout the system (You can leave this page if you want).";

	Language.single_project_view_orm_are_updated = "ORM tags are being updated. Update propagation can take up to 1-2 mins throughout the system (You can leave this page if you want).";

	Language.single_project_view_se_results_last_checked = "Search Engine Results were last checked";

	//Quick Chart
	Language.single_project_view_table_qg_chart = "Chart";
	Language.single_project_view_table_qg_more = "More";
	Language.single_project_view_table_qg_domain = "Domain";
	Language.single_project_view_table_qg_url = "URL";
	Language.single_project_view_table_qg_keyword = "Keyword";
	Language.single_project_view_table_qg_sightings = "Sightings";
	Language.single_project_view_table_qg_last_seen = "Last Seen";
	Language.single_project_view_table_qg_rank = "Rank";
	Language.single_project_view_table_qg_y_day = "Y-Day";
	Language.single_project_view_table_qg_days = "Days";
	Language.single_project_view_table_qg_day = "Day:";
	Language.single_project_view_table_qg_volume = "Volume";

	//Load MOre
	Language.single_project_view_load_more = "Load More";
	Language.single_project_view_load_more_desc = "loaded - only rows with rankings are shown";

	//no_rankings
	Language.single_project_view_no_rankings = "No rankings found YET for this element";
	Language.single_project_view_no_rankings_last_check = "Last Checked";
	
	//loading
	Language.single_project_view_loading = "Loading...";
	Language.single_project_view_loading2 = "Loading";
	Language.single_project_view_qg_loading = "Finding more data for this quick glance element....";
	
	//qg_update_org
	Language.single_project_view_orm_value_negative = "negative";
	Language.single_project_view_orm_value_positive = "positive";
	Language.single_project_view_orm_value_unknown = "unknown";

	Language.single_project_view_alert_positions = "pos.";

	Language.single_project_view_load_more = "Load More";
	Language.single_project_view_load_collin = "Load:";
	Language.single_project_view_loaded = "loaded";
	Language.single_project_view_new_updates = "New updates for this project have been detected and may not display yet until the data is done processing.";

	Language.single_project_view_searching = "SERP Searching...";
	Language.single_project_view_keyword = "Keyword:";
	Language.single_project_view_searching = "SERP Searching...";
	
	//pull serp visibiility
	Language.single_project_view_loading_data = "Loading Data...";
	
	//social time
	Language.single_project_view_social_years = "years ago";
	Language.single_project_view_social_months = "months ago";
	Language.single_project_view_social_weeks = "weeks ago";
	Language.single_project_view_social_days = "days ago";
	Language.single_project_view_social_hours = "hours ago";
	Language.single_project_view_social_mins = "mins ago";
	Language.single_project_view_social_secs = "secs ago";
	Language.single_project_view_social_seconds = "seconds ago";
	
	Language.single_project_view_not_yet = "(not yet)";


	
////////////////////////////////////////////////////////////////////////////////	
/////////////// SERP VIew (Updated - 5-23-2019 12:34PM)

	//No data for criteria
	Language["no_serp_data_criteria"] = "<p>There is no data for your criteria.</p><p>Your settings or filters maybe need to be re-adjusted to display data.</p>";
	Language["serp_data_processing"] = "<p>Processing...</p>";

	//Focus Date
	Language["focus_date_warning_title"] = "Warning:";
	Language["focus_date_warning_see_no_data"] = "The focus date is out of the view range - you will probably not see any data.";
	Language["focus_date_warning_adjust_view_range"] = "Adjust your view range date to properly view data.";
	
	Language["focus_date_warning_re_adjust_focus"] = "The focus date is out of the available data range - re-adjusting focus date...";
	
	//View Range
	Language["view_range_warning_title"] = "Warning:";
	Language["view_range_warning_requesting_data"] = "The view is out of the data&#39;s  date range - requesting new data...";

	//Live Results
	Language["live_results_alert_title"] = "Live Results";
	Language["live_results_alert_desc"] = "Google updates their results multiple times a day, the results you see may have updated since SERPWoo&#39;s crawl of them.";

	Language["no_live_results_alert_title"] = "Error";
	Language["no_live_results_alert_desc"] = "Live results can only be shown for projects that have a Locality attached to them.";

	//Filter
	Language.serp_view_filter_locked = "LOCKED";
	Language.serp_view_filter_filter = "Filter";
	Language.serp_view_filter_filter_enabled = "Filters Enabled:";

	//Ajax error
	Language.serp_view_ajax_error = "ERROR:";
	Language.serp_view_ajax_error_internal_server = "An internal server error occurred when attempting to gather this keyword&#39;s data, please try again later";

	//Chart
	Language.serp_view_tooltip_position = "Position:";
	Language.serp_view_tooltip_domain = "Domain:";
	Language.serp_view_tooltip_date = "Date:";
	
	//Popout Datawindow
	Language.serp_view_popout_serp_rank = "SERP Rank:";
	Language.serp_view_popout_date = "Date:";
	Language.serp_view_popout_longevity = "Longevity:";
	Language.serp_view_popout_domain_pr = "Domain PageRank:";
	Language.serp_view_popout_domain_age = "Domain Age:";
	Language.serp_view_popout_domain = "Domain:";
	Language.serp_view_popout_title = "Title:";
	Language.serp_view_popout_URL = "URL:";
	Language.serp_view_popout_description = "Description:";
	Language.serp_view_popout_fb_comments = "Comments:";
	Language.serp_view_popout_fb_reactions = "Reactions:";
	Language.serp_view_popout_fb_shares = "Shares:";
	Language.serp_view_popout_fb_total = "Total:";
	Language.serp_view_popout_linkedin = "Linkedin:";
	Language.serp_view_popout_pinterest = "Pinterest:";
	Language.serp_view_popout_total = "Total:";
	
	//CSV header
	Language.serp_view_csv_domain = "Domain";
	Language.serp_view_csv_url = "URL";
	Language.serp_view_csv_title = "Title";
	Language.serp_view_csv_description = "Description";
	Language.serp_view_csv_pagerank = "PageRank";
	Language.serp_view_csv_longevity = "Longevity";
	Language.serp_view_csv_whois = "WHOIS";
	Language.serp_view_csv_whois_age = "WHOIS Age";
	Language.serp_view_csv_fb_shares = "FB Shares";
	Language.serp_view_csv_fb_reactions = "FB Reactions";
	Language.serp_view_csv_fb_comments = "FB Comments";
	Language.serp_view_csv_fb_total = "FB Total";
	Language.serp_view_csv_linkedin = "Linkedin Total";
	Language.serp_view_csv_pinterest = "Pinterest Total";
	Language.serp_view_csv_tag_name = "Tag Name";
	Language.serp_view_csv_tag_value = "Tag Value";

	//CSV Volatility
	Language.serp_view_csv_volatility_date = "Date";
	Language.serp_view_csv_volatility_vol = "Volatility";
	
	//Live Results
	Language.serp_view_live_results = "Live Results";
	
	//Devices
	Language.serp_view_desktop = "Desktop";
	Language.serp_view_mobile = "Mobile";
	
	//(n/a)
	Language.serp_view_n_a = "(n/a)";
	
	//search results
	Language.serp_view_search_results_longevity = "Longevity:";
	Language.serp_view_search_results_range = "Results Range:";
	Language.serp_view_search_results_open_pagerank = "Open PageRank:";
	Language.serp_view_search_results_not_processsed = "(not processed yet)";
	Language.serp_view_search_results_social_not_processsed = "(no social data is available yet)";
	
	//keyword volatility
	Language.keyword_volatility = "Keyword Volatility";
	
	//Tagging
	Language.tagging_view_domain = "(View Domain)";
	Language.tagging_view_page = "(View Page)";
	Language.tagging_view_instances_domain = "All instances of this domain will be tagged.";
	Language.tagging_view_instances_page = "ONLY this EXACT URL will be tagged.";

	//tagging
	Language.tagging_positive = "Positive";
	Language.tagging_neutral = "Neutral";
	Language.tagging_negative = "Negative";
	Language.tagging_no_value = "No Value";
	
	//tag category
	Language.tagging_global = "Global";
	Language.tagging_private = "Private";
	Language.tagging_project = "Project";
	Language.tagging_team = "Team";
	
	Language.tagging_processing = "Processing...";
	Language.tagging_success = "Success! New Tag";

	Language.tagging_an_connect_error = "An Connect Error Occurred.";


////////////////////////////////////////////////////////////////////////////////	
/////////////// Account Settings

	//No data for criteria
	Language.account_settings_reload_the_page = "Reload The Page:";
	Language.account_settings_reload_the_page_desc = "Reload the page to implement the new language for your interface.";



////////////////////////////////////////////////////////////////////////////////	
/////////////// Internet Settings

	Language.internet_settings_deleted = "DELETED:";
	Language.internet_settings_error = "ERROR:";
	Language.internet_settings_error_tag_not_deleted = "Tag was NOT deleted - an error occurred.";
	Language.internet_settings_error_tag_not_updated = "Tag was NOT updated - an error occurred.";
	Language.internet_settings_error_tag_not_created = "Tag was NOT created - an error occurred.";
	Language.internet_settings_update = "UPDATE:";
	Language.internet_settings_create = "CREATE:";

	Language.internet_settings_html_saved = "SAVED";
	Language.internet_settings_html_error = "ERROR";
	Language.internet_settings_html_created = "CREATED";




////////////////////////////////////////////////////////////////////////////////	
/////////////// Quick Add
	
	Language.quick_add_header = "Quick Add:";
	Language.quick_add_txt_project_name = "Project Name";
	Language.quick_add_txt_locality = "Locality";
	Language.quick_add_txt_device = "Device";
	Language.quick_add_txt_keywords = "Keywords";
	Language.quick_add_txt_urls = "URLs";
	Language.quick_add_txt_tagged_domains = "Tagged Domains/URLs";

	Language.quick_add_txt_device_desktop = "Desktop";
	Language.quick_add_txt_device_mobile = "Mobile";

	Language.quick_add_fields_empty = "Looks like keywords and domains fields are blank - input either keywords or domains.";
	Language.quick_add_server_error = "A SERVER Error has occurred!";
	Language.quick_add_processing = "Processing... please wait a moment.";

	Language.quick_add_example = "Example";
	Language.quick_add_example_kw = "Keyword:";
	Language.quick_add_example_exact_kw = "Exact Keyword:";

	Language.quick_add_kw_to_add = "Keywords to Add";
	Language.quick_add_domains_to_add = "Domains/URLs to Add";

	Language.quick_add_example_domain = "Domain:";
	Language.quick_add_example_exact_url = "Exact URL:";
	Language.quick_add_example_partial_url = "Partial URL:";
	
	Language.quick_add_txt_save = "Save";
	Language.quick_add_txt_close = "Close";

	//Language.quick_add_success = "Update Successful - ";
	Language.quick_add_error = "Error:";	
	
/////////////// Onboarding Main


/////////////// Quick Insight

	Language.quick_insight_header = "Quick Insight:";
	Language.quick_insight_project_name = "Project Name";
	Language.quick_insight_locality = "locality";
	Language.quick_insight_device = "device";
	Language.quick_insight_keywords = "Keywords";
	Language.quick_insight_urls = "URLs";
	Language.quick_insight_tagging_domains = "Tagging Domains/URLs";

	Language.quick_insight_rising = "Rising";
	Language.quick_insight_rising_desc = "This is the amount of rankings rising, moving up, compared to the previous day.<br><br>If you see more rankings than keywords it is due to the project having multiple positive tagged domains/urls being tracked.<br><br>The Total rankings = Amount of Keywords multipled by the domains/urls.";
	Language.quick_insight_dropping = "Dropping";
	Language.quick_insight_dropping_desc = "This is the amount of rankings dropping, moving down, compared to the previous day.<br><br>If you see more rankings than keywords it is due to the project having multiple positive tagged domains/urls being tracked.<br><br>The Total rankings = Amount of Keywords multipled by the domains/urls.";
	Language.quick_insight_rank = "Rank:";
	Language.quick_insight_rank_desc = "This stack bar chart showcases the last 90 days of ranking data for this project. Each bar represents a day. The different colors within each single bar represent the search result position your domain(s) rank for.";
	
	Language.quick_insight_btn_view_project = "View Project";
	Language.quick_insight_btn_quick_add = "Quick Add";

	Language.quick_insight_1_pos = "#1 Pos.";
	Language.quick_insight_1_pos_desc = "This shows the amount of rankings that are #1 in the search results. Below the big number there may be a smaller number - that showcases the amount of movement detected compared to the previous day.<br><br> If you see more rankings than keywords it is due to the project having multiple positive tagged domains/urls being tracked.";
	Language.quick_insight_2_5_pos = "#2-5";
	Language.quick_insight_2_5_pos_desc = "This shows the amount of rankings that are #2-5 in the search results. Below the big number there may be a smaller number - that showcases the amount of movement detected compared to the previous day.<br><br> If you see more rankings than keywords it is due to the project having multiple positive tagged domains/urls being tracked.";
	Language.quick_insight_6_10_pos = "#6-10";
	Language.quick_insight_6_10_pos_desc = "This shows the amount of rankings that are #6-10 in the search results. Below the big number there may be a smaller number - that showcases the amount of movement detected compared to the previous day.<br><br> If you see more rankings than keywords it is due to the project having multiple positive tagged domains/urls being tracked.";
	Language.quick_insight_11_20_pos = "#11-20";
	Language.quick_insight_11_20_pos_desc = "This shows the amount of rankings that are #11-20 in the search results. Below the big number there may be a smaller number - that showcases the amount of movement detected compared to the previous day.<br><br> If you see more rankings than keywords it is due to the project having multiple positive tagged domains/urls being tracked.";

	Language.quick_insight_unknown_project_error = "Error:";
	Language.quick_insight_unknown_project_error_desc = "Unknown project - perhaps you need to reload this page.";


	Language.quick_insight_stack_chart_error_504 = "<b class='color-red'>Error #504:</b> This project has no positive tagged domains/urls which are ranking within the search engine results for the project&#39;s keywords.";
	Language.quick_insight_stack_chart_error_506 = "<b class='color-red'>Error #506:</b> This project has no domains/urls to track.<br>Add a domain/url to track by using the &#39;Quick Add&#39; button (<button class=\"btn btn-sm waves-effect btn-success\"><i class=\"zmdi zmdi-plus-circle\"></i> Quick Add</button>) in the bottom corner of the interface.";



/////////////// Intercom Detection

	Language.intercom_problem_header = "Communication Problem Detected";
	Language.intercom_problem_content = "<p>We noticed you are unable to communicate with our support staff because Intercom is blocked within your adblocker.</p><p>While Intercom isn&#39;t an ad-provider, adblocking plugins (e.g. uBlock, Ghostery, Adblock, NoScript, and Firefox Privacy Browsing mode) offer options to block JavaScript that includes tracking functionality. Since Intercom communicates conversations it is included in some adblocking plugins.</p>";
	Language.intercom_problem_content2 = "<p><b class='color-red'>In order to service you and allow you to communicate with our staff whitelist Intercom and SERPWoo.com.</b></p><p>Adblocker plugins have options like \"Trust This Site\"/\"Whitelist\" which will allow you to communicate with our staff while still blocking annoying Ad on other websites. If you have any questions feel free to email us at <b>team\@serpwoo.com</b>.</p>";
	Language.intercom_problem_okay = "Okay";

/////////////// 
////////////////////////////////////////////////////////////////////////////////	
