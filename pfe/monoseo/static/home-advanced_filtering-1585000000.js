
////////////////////
//Query Advanced Filtering of Quick Glance Data for Home Screen

//

		onmessage = function(data_in) {
  
		  fetch(data_in.data.wid, data_in.data.orm, data_in.data.project_id, data_in.data.days, data_in.data.limit, data_in.data.countries, data_in.data.locality, data_in.data.language, data_in.data.device, data_in.data.vol_min, data_in.data.vol_max, data_in.data.cpc_min, data_in.data.cpc_max, data_in.data.oci_min, data_in.data.oci_max, data_in.data.comp_min, data_in.data.comp_max, function(xhr) {	
				var result = xhr.responseText;

				//process the JSON
				var response_from_home_af = JSON.parse(result);
				postMessage(response_from_home_af);
		  });

		};


			//simple XHR request in pure raw JavaScript
			function fetch(WID, ORM, PROJECT_ID, DAYS, LIMIT, COUNTRIES, LOCALITY, LANGUAGE, DEVICE, VOL_MIN, VOL_MAX, CPC_MIN, CPC_MAX, OCI_MIN, OCI_MAX, COMP_MIN, COMP_MAX, callback) {
				var xhr;

				if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
				else {
					var versions = ["MSXML2.XmlHttp.5.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.2.0", "Microsoft.XmlHttp"]

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
		
				xhr.open('POST', '/q/a/home/advanced-filters/', true);
				xhr.send('wid=' + WID + '&orm=' + ORM + '&project_id=' + PROJECT_ID + '&days=' + DAYS + '&limit=' + LIMIT + '&country=' + COUNTRIES + '&language=' + LANGUAGE + '&locality=' + LOCALITY + '&device=' + DEVICE + '&vol_min=' + VOL_MIN + '&vol_max=' + VOL_MAX + '&cpc_min=' + CPC_MIN + '&cpc_max=' + CPC_MAX + '&oci_min=' + OCI_MIN + '&oci_max=' + OCI_MAX + '&comp_min=' + COMP_MIN + '&comp_max=' + COMP_MAX);
			}

