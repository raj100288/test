//var googleAddressAutocomplete = Class.create();
//googleAddressAutocomplete.prototype = {
	initialize: function(page){
		this.page = page;
		this.geoLocation(this.page);
	},
	
	mapValuesJson: function()
	{
		var mapvalues = {
			street_number: 'short_name',
			route: 'short_name',
			political: 'long_name',
			sublocality_level_1: 'long_name',
			sublocality_level_2: 'long_name',
			sublocality_level_3: 'long_name',
			neighborhood: 'long_name',
			locality: 'long_name',
			administrative_area_level_1: 'long_name',
			country: 'short_name',
			postal_code: 'short_name'
			};
		
		return mapvalues;
	},

	regionBasedOnCountry: function()
	{
		var regionCollection = '[{"value":"","label":true},{"value":"AM","label":"Armenia"},{"value":"AU","label":"Australia"},{"value":"AZ","label":"Azerbaijan"},{"value":"BS","label":"Bahamas"},{"value":"BH","label":"Bahrain"},{"value":"BW","label":"Botswana"},{"value":"BG","label":"Bulgaria"},{"value":"CM","label":"Cameroon"},{"value":"CA","label":"Canada"},{"value":"KM","label":"Comoros"},{"value":"CR","label":"Costa Rica"},{"value":"CU","label":"Cuba"},{"value":"CY","label":"Cyprus"},{"value":"CZ","label":"Czech Republic"},{"value":"DK","label":"Denmark"},{"value":"FI","label":"Finland"},{"value":"FR","label":"France"},{"value":"DE","label":"Germany"},{"value":"GR","label":"Greece"},{"value":"GP","label":"Guadeloupe"},{"value":"HK","label":"Hong Kong SAR China"},{"value":"HU","label":"Hungary"},{"value":"IS","label":"Iceland"},{"value":"IN","label":"India"},{"value":"ID","label":"Indonesia"},{"value":"IR","label":"Iran"},{"value":"IE","label":"Ireland"},{"value":"IT","label":"Italy"},{"value":"JP","label":"Japan"},{"value":"JE","label":"Jersey"},{"value":"JO","label":"Jordan"},{"value":"KW","label":"Kuwait"},{"value":"LB","label":"Lebanon"},{"value":"LY","label":"Libya"},{"value":"MY","label":"Malaysia"},{"value":"NZ","label":"New Zealand"},{"value":"KP","label":"North Korea"},{"value":"MP","label":"Northern Mariana Islands"},{"value":"NO","label":"Norway"},{"value":"OM","label":"Oman"},{"value":"PL","label":"Poland"},{"value":"QA","label":"Qatar"},{"value":"BL","label":"Saint Barth\u00e9lemy"},{"value":"MF","label":"Saint Martin"},{"value":"SA","label":"Saudi Arabia"},{"value":"SG","label":"Singapore"},{"value":"ZA","label":"South Africa"},{"value":"ES","label":"Spain"},{"value":"VC","label":"St. Vincent & Grenadines"},{"value":"SD","label":"Sudan"},{"value":"SZ","label":"Swaziland"},{"value":"SE","label":"Sweden"},{"value":"CH","label":"Switzerland"},{"value":"TN","label":"Tunisia"},{"value":"AE","label":"United Arab Emirates"},{"value":"GB","label":"United Kingdom"},{"value":"US","label":"United States"},{"value":"UZ","label":"Uzbekistan"}]';
		return regionCollection;
	},

	initAutocomplete: function()
	{
		this.loadAllData();
		this.initAutoship();
	},
	initAutoship: function()
	{
		var countrys = document.getElementById("shipping:country_id").value;
        this.loadAllDatas(countrys);
	},
	loadAllData: function(country = '')
	{
		if(country == '')
		{
			var country = document.getElementById("billing:country_id").value;
		}
		autocomplete3 = new google.maps.places.Autocomplete(
						document.getElementById('billing:street1'), {types: ['geocode']});
		autocomplete4 = new google.maps.places.Autocomplete(
						document.getElementById('billing:region'), {types: ['geocode']});
		autocomplete5 = new google.maps.places.Autocomplete(
						document.getElementById('billing:city'), {types: ['geocode']});
		autocomplete3.setFields(['address_component']);
		autocomplete4.setFields(['address_component']);
		autocomplete5.setFields(['address_component']);
		this.updateAutoCompletes(country);
		autocomplete3.addListener('place_changed', this.fillInBilling);
		autocomplete4.addListener('place_changed', this.fillInBilling);
		autocomplete5.addListener('place_changed', this.fillInBilling);
	},
	updateAutoCompletes: function(country)
	{
		if(typeof autocomplete3 != "undefined"){
			autocomplete3.setComponentRestrictions({country: country});
		}
		if(typeof autocomplete4 != "undefined"){
			autocomplete4.setComponentRestrictions({country: country});
		}
		if(typeof autocomplete5 != "undefined"){
			autocomplete5.setComponentRestrictions({country: country});
		}
	},
	loadAllDatas: function(country)
	{
		autocomplete = new google.maps.places.Autocomplete(
						document.getElementById('shipping:street1'), {types: ['geocode']});
		autocomplete1 = new google.maps.places.Autocomplete(
						document.getElementById('shipping:region'), {types: ['geocode']});
		autocomplete2 = new google.maps.places.Autocomplete(
						document.getElementById('shipping:city'), {types: ['geocode']});
		autocomplete.setFields(['address_component']);
		autocomplete1.setFields(['address_component']);
		autocomplete2.setFields(['address_component']);
		this.updateAutoComplete(country);
		autocomplete.addListener('place_changed', this.fillInShipping);
		autocomplete1.addListener('place_changed', this.fillInShipping);
		autocomplete2.addListener('place_changed', this.fillInShipping);
	},
	
	updateAutoComplete: function(country)
	{
		if(typeof autocomplete != "undefined"){
			autocomplete.setComponentRestrictions({country: country});
		}
		if(typeof autocomplete1 != "undefined"){
			autocomplete1.setComponentRestrictions({country: country});
		}
		if(typeof autocomplete2 != "undefined"){
			autocomplete2.setComponentRestrictions({country: country});
		}
	},
	
	geoLocation: function(pagevalue)
	{
		
		if (navigator.geolocation) {
			var options = {
				enableHighAccuracy: true, 
				distanceFilter: 1, 
				timeout: 20000, 
				maximumAge: 0, 
				accuracy: 1,
				};
			navigator.geolocation.getCurrentPosition(this.success, this.error, options);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	},
	success: function(position)
	{
		var latLng = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
		googleAddressAutocomplete.prototype.autofillFromUserLocation(latLng);
	},
	error: function(err)
	{
		alert('ERROR ' + err.code + ': ' + err.message);
	},
	autofillFromUserLocation: function(latLng)
	{
		
		var _geocoder = new google.maps.Geocoder;
		_geocoder.geocode({
			'location': latLng
		}, function(results, status) {
			if (status === 'OK') {
				if (results[0]) {
					var addr = results[0].address_components;
					var cntry = addr[addr.length - 1].short_name;
					var myObj = JSON.parse(googleAddressAutocomplete.prototype.regionBasedOnCountry());
					var hasValue = myObj.some(x => x.value == cntry);
					if (hasValue == true) {
						(googleAddressAutocomplete.prototype.page == 'billing') ? googleAddressAutocomplete.prototype.fillInBilling(results[0]): googleAddressAutocomplete.prototype.fillInShipping(results[0]);
					} else {
						var html =
							"<div class='geomsg' style='color:red'>Your Location is outside our service area, Please fill the form</div>";
						(this.page == 'billing') ? jQuery(".billing-geolocated").after(html): jQuery(
							".shipping-geolocated").after(html);
						setTimeout(function() {
							jQuery(".geomsg").remove();
						}, 5000);
						return false;
					}

				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	},
	fillInBilling: function(place = '')
	{
		if(place == '')
		{
			place = this.getPlace();
		}
		var fieldIds = ['billing:postcode', 'billing:city', 'billing:region', 'billing:block', 'billing:street1'];
		var mapValuenew = googleAddressAutocomplete.prototype.mapValuesJson();
		var street = [];
		for (var j = 0; j < fieldIds.length; j++) {
			document.getElementById(fieldIds[j]).value = '';
		}
		for (var i = 0; i < place.address_components.length; i++) {
			var addressType = place.address_components[i].types[0];
			if (addressType == 'country') {
				var val = place.address_components[i][mapValuenew[addressType]];
				document.getElementById("billing:country_id").value = val;
			} else if (addressType == 'postal_code') {
				var val = place.address_components[i][mapValuenew[addressType]];
				document.getElementById("billing:postcode").value = val;
			} else if ((addressType == 'locality') || (addressType == 'political')) {
				var val = place.address_components[i][mapValuenew[addressType]];
				document.getElementById("billing:city").value = val;
			} else if (addressType == 'administrative_area_level_1') {
				var val = place.address_components[i][mapValuenew[addressType]];
				var valueshort = place.address_components[i].short_name;
				var cntycode = document.getElementById("billing:country_id").value;
				var regionval = googleAddressAutocomplete.prototype.getregionId(valueshort, cntycode);
				document.getElementById("billing:region").value = val;
				(regionval) ? document.getElementById("billing:region_id").value = regionval: "";
			} else if (addressType == 'neighborhood') {
				var val = place.address_components[i][mapValuenew[addressType]];
				document.getElementById("billing:block").value = val;
			} else {
				var attributes = place.address_components[i][mapValuenew[addressType]];
				if ((attributes != "") && (attributes != undefined)) {
					street.push(attributes);
				}
			}
		}
		var liststreet = street.toString();
		document.getElementById("billing:street1").value = liststreet;
	},
	fillInShipping: function(place = '')
	{
		if(place == '')
		{
			place = this.getPlace();
		}
		var fieldIds = ['shipping:postcode', 'shipping:city', 'shipping:region', 'shipping:block', 'shipping:street1'];
		var street = [];
		var mapValuenew = googleAddressAutocomplete.prototype.mapValuesJson();
		for (var j = 0; j < fieldIds.length; j++) {
			document.getElementById(fieldIds[j]).value = '';
		}
		for (var i = 0; i < place.address_components.length; i++) {
			var addressType = place.address_components[i].types[0];
			if (addressType == 'country') {
				var val = place.address_components[i][mapValuenew[addressType]];
				document.getElementById("shipping:country_id").value = val;
			} else if (addressType == 'postal_code') {
				var val = place.address_components[i][mapValuenew[addressType]];
				document.getElementById("shipping:postcode").value = val;
			} else if ((addressType == 'locality') || (addressType == 'political')) {
				var val = place.address_components[i][mapValuenew[addressType]];
				document.getElementById("shipping:city").value = val;
			} else if (addressType == 'administrative_area_level_1') {
				var val = place.address_components[i][mapValuenew[addressType]];
				var valueshort = place.address_components[i].short_name;
				var cntycode = document.getElementById("shipping:country_id").value;
				var regionval = googleAddressAutocomplete.prototype.getregionId(valueshort, cntycode);
				document.getElementById("shipping:region").value = val;
				(regionval) ? document.getElementById("shipping:region_id").value = regionval: "";
			} else if (addressType == 'neighborhood') {
				var val = place.address_components[i][mapValuenew[addressType]];
				document.getElementById("shipping:block").value = val;
			} else {
				var attributes = place.address_components[i][mapValuenew[addressType]];
				if ((attributes != "") && (attributes != undefined)) {
					street.push(attributes);
				}
			}
		}
		var liststreet = street.toString();
		document.getElementById("shipping:street1").value = liststreet;
	},
	getregionId: function(code, countryCode){
		var ttt = {"config":{"show_all_regions":true,"regions_required":["AT","CA","EE","FI","FR","DE","LV","LT","RO","ES","CH","US"]},"ES":{"130":{"code":"A Coru\u0441a","name":"A Coru\u00f1a"},"131":{"code":"Alava","name":"Alava"},"132":{"code":"Albacete","name":"Albacete"},"133":{"code":"Alicante","name":"Alicante"},"134":{"code":"Almeria","name":"Almeria"},"135":{"code":"Asturias","name":"Asturias"},"136":{"code":"Avila","name":"Avila"},"137":{"code":"Badajoz","name":"Badajoz"},"138":{"code":"Baleares","name":"Baleares"},"139":{"code":"Barcelona","name":"Barcelona"},"140":{"code":"Burgos","name":"Burgos"},"141":{"code":"Caceres","name":"Caceres"},"142":{"code":"Cadiz","name":"Cadiz"},"143":{"code":"Cantabria","name":"Cantabria"},"144":{"code":"Castellon","name":"Castellon"},"145":{"code":"Ceuta","name":"Ceuta"},"146":{"code":"Ciudad Real","name":"Ciudad Real"},"147":{"code":"Cordoba","name":"Cordoba"},"148":{"code":"Cuenca","name":"Cuenca"},"149":{"code":"Girona","name":"Girona"},"150":{"code":"Granada","name":"Granada"},"151":{"code":"Guadalajara","name":"Guadalajara"},"152":{"code":"Guipuzcoa","name":"Guipuzcoa"},"153":{"code":"Huelva","name":"Huelva"},"154":{"code":"Huesca","name":"Huesca"},"155":{"code":"Jaen","name":"Jaen"},"156":{"code":"La Rioja","name":"La Rioja"},"157":{"code":"Las Palmas","name":"Las Palmas"},"158":{"code":"Leon","name":"Leon"},"159":{"code":"Lleida","name":"Lleida"},"160":{"code":"Lugo","name":"Lugo"},"161":{"code":"Madrid","name":"Madrid"},"162":{"code":"Malaga","name":"Malaga"},"163":{"code":"Melilla","name":"Melilla"},"164":{"code":"Murcia","name":"Murcia"},"165":{"code":"Navarra","name":"Navarra"},"166":{"code":"Ourense","name":"Ourense"},"167":{"code":"Palencia","name":"Palencia"},"168":{"code":"Pontevedra","name":"Pontevedra"},"169":{"code":"Salamanca","name":"Salamanca"},"170":{"code":"Santa Cruz de Tenerife","name":"Santa Cruz de Tenerife"},"171":{"code":"Segovia","name":"Segovia"},"172":{"code":"Sevilla","name":"Sevilla"},"173":{"code":"Soria","name":"Soria"},"174":{"code":"Tarragona","name":"Tarragona"},"175":{"code":"Teruel","name":"Teruel"},"176":{"code":"Toledo","name":"Toledo"},"177":{"code":"Valencia","name":"Valencia"},"178":{"code":"Valladolid","name":"Valladolid"},"179":{"code":"Vizcaya","name":"Vizcaya"},"180":{"code":"Zamora","name":"Zamora"},"181":{"code":"Zaragoza","name":"Zaragoza"}},"CH":{"104":{"code":"AG","name":"Aargau"},"106":{"code":"AR","name":"Appenzell Ausserrhoden"},"105":{"code":"AI","name":"Appenzell Innerrhoden"},"108":{"code":"BL","name":"Basel-Landschaft"},"109":{"code":"BS","name":"Basel-Stadt"},"107":{"code":"BE","name":"Bern"},"110":{"code":"FR","name":"Freiburg"},"111":{"code":"GE","name":"Genf"},"112":{"code":"GL","name":"Glarus"},"113":{"code":"GR","name":"Graub\u00fcnden"},"114":{"code":"JU","name":"Jura"},"115":{"code":"LU","name":"Luzern"},"116":{"code":"NE","name":"Neuenburg"},"117":{"code":"NW","name":"Nidwalden"},"118":{"code":"OW","name":"Obwalden"},"120":{"code":"SH","name":"Schaffhausen"},"122":{"code":"SZ","name":"Schwyz"},"121":{"code":"SO","name":"Solothurn"},"119":{"code":"SG","name":"St. Gallen"},"124":{"code":"TI","name":"Tessin"},"123":{"code":"TG","name":"Thurgau"},"125":{"code":"UR","name":"Uri"},"126":{"code":"VD","name":"Waadt"},"127":{"code":"VS","name":"Wallis"},"128":{"code":"ZG","name":"Zug"},"129":{"code":"ZH","name":"Z\u00fcrich"}},"FI":{"339":{"code":"Ahvenanmaa","name":"Ahvenanmaa"},"333":{"code":"Etel\u00e4-Karjala","name":"Etel\u00e4-Karjala"},"326":{"code":"Etel\u00e4-Pohjanmaa","name":"Etel\u00e4-Pohjanmaa"},"325":{"code":"Etel\u00e4-Savo","name":"Etel\u00e4-Savo"},"337":{"code":"It\u00e4-Uusimaa","name":"It\u00e4-Uusimaa"},"322":{"code":"Kainuu","name":"Kainuu"},"335":{"code":"Kanta-H\u00e4me","name":"Kanta-H\u00e4me"},"330":{"code":"Keski-Pohjanmaa","name":"Keski-Pohjanmaa"},"331":{"code":"Keski-Suomi","name":"Keski-Suomi"},"338":{"code":"Kymenlaakso","name":"Kymenlaakso"},"320":{"code":"Lappi","name":"Lappi"},"334":{"code":"P\u00e4ij\u00e4t-H\u00e4me","name":"P\u00e4ij\u00e4t-H\u00e4me"},"328":{"code":"Pirkanmaa","name":"Pirkanmaa"},"327":{"code":"Pohjanmaa","name":"Pohjanmaa"},"323":{"code":"Pohjois-Karjala","name":"Pohjois-Karjala"},"321":{"code":"Pohjois-Pohjanmaa","name":"Pohjois-Pohjanmaa"},"324":{"code":"Pohjois-Savo","name":"Pohjois-Savo"},"329":{"code":"Satakunta","name":"Satakunta"},"336":{"code":"Uusimaa","name":"Uusimaa"},"332":{"code":"Varsinais-Suomi","name":"Varsinais-Suomi"}},"FR":{"182":{"code":"1","name":"Ain"},"183":{"code":"2","name":"Aisne"},"184":{"code":"3","name":"Allier"},"185":{"code":"4","name":"Alpes-de-Haute-Provence"},"187":{"code":"6","name":"Alpes-Maritimes"},"188":{"code":"7","name":"Ard\u00e8che"},"189":{"code":"8","name":"Ardennes"},"190":{"code":"9","name":"Ari\u00e8ge"},"191":{"code":"10","name":"Aube"},"192":{"code":"11","name":"Aude"},"193":{"code":"12","name":"Aveyron"},"249":{"code":"67","name":"Bas-Rhin"},"194":{"code":"13","name":"Bouches-du-Rh\u00f4ne"},"195":{"code":"14","name":"Calvados"},"196":{"code":"15","name":"Cantal"},"197":{"code":"16","name":"Charente"},"198":{"code":"17","name":"Charente-Maritime"},"199":{"code":"18","name":"Cher"},"200":{"code":"19","name":"Corr\u00e8ze"},"201":{"code":"2A","name":"Corse-du-Sud"},"203":{"code":"21","name":"C\u00f4te-d'Or"},"204":{"code":"22","name":"C\u00f4tes-d'Armor"},"205":{"code":"23","name":"Creuse"},"261":{"code":"79","name":"Deux-S\u00e8vres"},"206":{"code":"24","name":"Dordogne"},"207":{"code":"25","name":"Doubs"},"208":{"code":"26","name":"Dr\u00f4me"},"273":{"code":"91","name":"Essonne"},"209":{"code":"27","name":"Eure"},"210":{"code":"28","name":"Eure-et-Loir"},"211":{"code":"29","name":"Finist\u00e8re"},"212":{"code":"30","name":"Gard"},"214":{"code":"32","name":"Gers"},"215":{"code":"33","name":"Gironde"},"250":{"code":"68","name":"Haut-Rhin"},"202":{"code":"2B","name":"Haute-Corse"},"213":{"code":"31","name":"Haute-Garonne"},"225":{"code":"43","name":"Haute-Loire"},"234":{"code":"52","name":"Haute-Marne"},"252":{"code":"70","name":"Haute-Sa\u00f4ne"},"256":{"code":"74","name":"Haute-Savoie"},"269":{"code":"87","name":"Haute-Vienne"},"186":{"code":"5","name":"Hautes-Alpes"},"247":{"code":"65","name":"Hautes-Pyr\u00e9n\u00e9es"},"274":{"code":"92","name":"Hauts-de-Seine"},"216":{"code":"34","name":"H\u00e9rault"},"217":{"code":"35","name":"Ille-et-Vilaine"},"218":{"code":"36","name":"Indre"},"219":{"code":"37","name":"Indre-et-Loire"},"220":{"code":"38","name":"Is\u00e8re"},"221":{"code":"39","name":"Jura"},"222":{"code":"40","name":"Landes"},"223":{"code":"41","name":"Loir-et-Cher"},"224":{"code":"42","name":"Loire"},"226":{"code":"44","name":"Loire-Atlantique"},"227":{"code":"45","name":"Loiret"},"228":{"code":"46","name":"Lot"},"229":{"code":"47","name":"Lot-et-Garonne"},"230":{"code":"48","name":"Loz\u00e8re"},"231":{"code":"49","name":"Maine-et-Loire"},"232":{"code":"50","name":"Manche"},"233":{"code":"51","name":"Marne"},"235":{"code":"53","name":"Mayenne"},"236":{"code":"54","name":"Meurthe-et-Moselle"},"237":{"code":"55","name":"Meuse"},"238":{"code":"56","name":"Morbihan"},"239":{"code":"57","name":"Moselle"},"240":{"code":"58","name":"Ni\u00e8vre"},"241":{"code":"59","name":"Nord"},"242":{"code":"60","name":"Oise"},"243":{"code":"61","name":"Orne"},"257":{"code":"75","name":"Paris"},"244":{"code":"62","name":"Pas-de-Calais"},"245":{"code":"63","name":"Puy-de-D\u00f4me"},"246":{"code":"64","name":"Pyr\u00e9n\u00e9es-Atlantiques"},"248":{"code":"66","name":"Pyr\u00e9n\u00e9es-Orientales"},"251":{"code":"69","name":"Rh\u00f4ne"},"253":{"code":"71","name":"Sa\u00f4ne-et-Loire"},"254":{"code":"72","name":"Sarthe"},"255":{"code":"73","name":"Savoie"},"259":{"code":"77","name":"Seine-et-Marne"},"258":{"code":"76","name":"Seine-Maritime"},"275":{"code":"93","name":"Seine-Saint-Denis"},"262":{"code":"80","name":"Somme"},"263":{"code":"81","name":"Tarn"},"264":{"code":"82","name":"Tarn-et-Garonne"},"272":{"code":"90","name":"Territoire-de-Belfort"},"277":{"code":"95","name":"Val-d'Oise"},"276":{"code":"94","name":"Val-de-Marne"},"265":{"code":"83","name":"Var"},"266":{"code":"84","name":"Vaucluse"},"267":{"code":"85","name":"Vend\u00e9e"},"268":{"code":"86","name":"Vienne"},"270":{"code":"88","name":"Vosges"},"271":{"code":"89","name":"Yonne"},"260":{"code":"78","name":"Yvelines"}},"US":{"1":{"code":"AL","name":"Alabama"},"2":{"code":"AK","name":"Alaska"},"3":{"code":"AS","name":"American Samoa"},"4":{"code":"AZ","name":"Arizona"},"5":{"code":"AR","name":"Arkansas"},"6":{"code":"AF","name":"Armed Forces Africa"},"7":{"code":"AA","name":"Armed Forces Americas"},"8":{"code":"AC","name":"Armed Forces Canada"},"9":{"code":"AE","name":"Armed Forces Europe"},"10":{"code":"AM","name":"Armed Forces Middle East"},"11":{"code":"AP","name":"Armed Forces Pacific"},"12":{"code":"CA","name":"California"},"13":{"code":"CO","name":"Colorado"},"14":{"code":"CT","name":"Connecticut"},"15":{"code":"DE","name":"Delaware"},"16":{"code":"DC","name":"District of Columbia"},"17":{"code":"FM","name":"Federated States Of Micronesia"},"18":{"code":"FL","name":"Florida"},"19":{"code":"GA","name":"Georgia"},"20":{"code":"GU","name":"Guam"},"21":{"code":"HI","name":"Hawaii"},"22":{"code":"ID","name":"Idaho"},"23":{"code":"IL","name":"Illinois"},"24":{"code":"IN","name":"Indiana"},"25":{"code":"IA","name":"Iowa"},"26":{"code":"KS","name":"Kansas"},"27":{"code":"KY","name":"Kentucky"},"28":{"code":"LA","name":"Louisiana"},"29":{"code":"ME","name":"Maine"},"30":{"code":"MH","name":"Marshall Islands"},"31":{"code":"MD","name":"Maryland"},"32":{"code":"MA","name":"Massachusetts"},"33":{"code":"MI","name":"Michigan"},"34":{"code":"MN","name":"Minnesota"},"35":{"code":"MS","name":"Mississippi"},"36":{"code":"MO","name":"Missouri"},"37":{"code":"MT","name":"Montana"},"38":{"code":"NE","name":"Nebraska"},"39":{"code":"NV","name":"Nevada"},"40":{"code":"NH","name":"New Hampshire"},"41":{"code":"NJ","name":"New Jersey"},"42":{"code":"NM","name":"New Mexico"},"43":{"code":"NY","name":"New York"},"44":{"code":"NC","name":"North Carolina"},"45":{"code":"ND","name":"North Dakota"},"46":{"code":"MP","name":"Northern Mariana Islands"},"47":{"code":"OH","name":"Ohio"},"48":{"code":"OK","name":"Oklahoma"},"49":{"code":"OR","name":"Oregon"},"50":{"code":"PW","name":"Palau"},"51":{"code":"PA","name":"Pennsylvania"},"52":{"code":"PR","name":"Puerto Rico"},"53":{"code":"RI","name":"Rhode Island"},"54":{"code":"SC","name":"South Carolina"},"55":{"code":"SD","name":"South Dakota"},"56":{"code":"TN","name":"Tennessee"},"57":{"code":"TX","name":"Texas"},"58":{"code":"UT","name":"Utah"},"59":{"code":"VT","name":"Vermont"},"60":{"code":"VI","name":"Virgin Islands"},"61":{"code":"VA","name":"Virginia"},"62":{"code":"WA","name":"Washington"},"63":{"code":"WV","name":"West Virginia"},"64":{"code":"WI","name":"Wisconsin"},"65":{"code":"WY","name":"Wyoming"}},"CA":{"66":{"code":"AB","name":"Alberta"},"67":{"code":"BC","name":"British Columbia"},"68":{"code":"MB","name":"Manitoba"},"70":{"code":"NB","name":"New Brunswick"},"69":{"code":"NL","name":"Newfoundland and Labrador"},"72":{"code":"NT","name":"Northwest Territories"},"71":{"code":"NS","name":"Nova Scotia"},"73":{"code":"NU","name":"Nunavut"},"74":{"code":"ON","name":"Ontario"},"75":{"code":"PE","name":"Prince Edward Island"},"76":{"code":"QC","name":"Quebec"},"77":{"code":"SK","name":"Saskatchewan"},"78":{"code":"YT","name":"Yukon Territory"}},"DE":{"80":{"code":"BAW","name":"Baden-W\u00fcrttemberg"},"81":{"code":"BAY","name":"Bayern"},"82":{"code":"BER","name":"Berlin"},"83":{"code":"BRG","name":"Brandenburg"},"84":{"code":"BRE","name":"Bremen"},"85":{"code":"HAM","name":"Hamburg"},"86":{"code":"HES","name":"Hessen"},"87":{"code":"MEC","name":"Mecklenburg-Vorpommern"},"79":{"code":"NDS","name":"Niedersachsen"},"88":{"code":"NRW","name":"Nordrhein-Westfalen"},"89":{"code":"RHE","name":"Rheinland-Pfalz"},"90":{"code":"SAR","name":"Saarland"},"91":{"code":"SAS","name":"Sachsen"},"92":{"code":"SAC","name":"Sachsen-Anhalt"},"93":{"code":"SCN","name":"Schleswig-Holstein"},"94":{"code":"THE","name":"Th\u00fcringen"}}};
		for(var key in ttt[countryCode])
		{
		  if(ttt[countryCode][key].code == code)
		  {
			  return key;break;
		  }
		}
	}
};


