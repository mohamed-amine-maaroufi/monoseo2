
////////////////////
//Query Quick Glance Data for Home Screen

//

		onmessage = function(data_in) {
  
		  fetch(data_in.data.wid, data_in.data.orm, data_in.data.project_id, data_in.data.action, data_in.data.days, data_in.data.limit, function(xhr) {	
				var result = xhr.responseText;

				//process the JSON
				var response_from_home_qg_query = JSON.parse(result);
				postMessage(response_from_home_qg_query);
		  });

		};


			//simple XHR request in pure raw JavaScript
			function fetch(WID, ORM, PROJECT_ID, ACTION, DAYS, LIMIT, callback) {
				var xhr;

				if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
				else {
					var versions = ["MSXML2.XmlHttp.5.0", 
					 				"MSXML2.XmlHttp.4.0",
					 			    "MSXML2.XmlHttp.3.0", 
					 			    "MSXML2.XmlHttp.2.0",
					 				"Microsoft.XmlHttp"]

					 for(var i = 0, len = versions.length; i < len; i++) {
					 	try {
					 		xhr = new ActiveXObject(versions[i]);
					 		break;
					 	}
					 	catch(e){}
					 } // end for
				}
		
				xhr.onreadystatechange = ensureReadiness;
		
				function ensureReadiness() {
					if(xhr.readyState < 4) {
						return;
					}
			
					if(xhr.status !== 200) {
						return;
					}

					// all is well	
					if(xhr.readyState === 4) {
						callback(xhr);
					}			
				}
		
				xhr.open('POST', '/q/a/home/quick-glance/', true);
				xhr.send('wid=' + WID + '&action=' + ACTION + '&orm=' + ORM + '&project_id=' + PROJECT_ID + '&days=' + DAYS + '&limit=' + LIMIT);
			}

