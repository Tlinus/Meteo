function getData(){			
	var city = document.querySelector("#city").value;
	console.log(city);
	var xhr = new XMLHttpRequest(); // Voyez la fonction getXMLHttpRequest() définie dans la partie précédente
	 xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json = JSON.parse(this.responseText)
            // document.getElementById("demo").innerHTML =
            //json.city_info.name + json.current_condition.icon;
            var html = ""; var month; var pluie = new Array();
            html += "<h1 style='text-align: center;'> Météo de "+ json.city_info.name +" pour le :</h1>";
            html += "<div id='slider' >";
	            html += "<div id='slider-nav'> ";
	            for (j = 0; j<5; j++){
		            switch (json['fcst_day_'+j].date.substring(3,5)) {
					  case '01.':
					    month = "Janvier";
					    break;
					  case '02.':
					    month = "Fevrier";
					    break;
					  case '03.':
					    month = "Mars";
					    break;
					  case '04.':
					    month = "avril";
					    break;
					  case '05.':
					    month = "mai";
					    break;
					  case '06.':
					    month = "juin";
					    break;
					  case '07.':
					    month = "juillet";
					    break;
					   case '08.':
					    month = "août";
					    break;
					   case '09.':
					    month = "septembre";
					    break;
					   case '10':
					    month = "octobre";
					    break;
					   case '11':
					    month = "novembre";
					    break;
					   case '12':
					    month = "décembre";
					    break;
					  default:
					    month = "";
					}
		            html += '<a href="#" ';
		            if(j==0){ html += "class='current' ";}
		            html+= 'data-slide="'+j+'">'+json['fcst_day_'+j].day_long+ " "+  json['fcst_day_'+j].date.substring(0,2) +" " +month +' </a>';
		        } //fin de for days
		        html += "</div>"; //fin de div #slider-nav

		        html += '<div id="slider-wrapper" style="margin-left:2.5vw;">';
		        	for (j = 0; j<5; j++){
		        	
		        		html += '<div class="slide" style="width: 100vw">';
		        		html += '<div class="alert'+j+' orange" style="background: #ffd72f; width:60%; border-radius:5px; margin-left:17%;"></div>';
			            for(h= 0; h<24; h++){
				            html += "<div style='background: none; width: 8vw; height: 35vh; float: left' >";
			            		html += "<h3>" +h+ "H00 </h3>";
			            		html += "<img src='"+json['fcst_day_'+j].hourly_data[h+"H00"].ICON+"'>";
			            		html += "<p style='min-height:40px;'>"+json['fcst_day_'+j].hourly_data[h+"H00"].CONDITION +"</p>";
			            		html += "<h3>"+json['fcst_day_'+j].hourly_data[h+"H00"].TMP2m + "C°</h3>";
			            		html += "<h6>"+json['fcst_day_'+j].hourly_data[h+"H00"].APCPsfc +" mm</h6>";
			            	html += "</div>"; 
			            	if (parseInt(json['fcst_day_'+j].hourly_data[h+"H00"].APCPsfc) > 0 && parseInt(json['fcst_day_'+j].hourly_data[h+"H00"].APCPsfc) > 3){
			            		pluie[j] = 3;
			            	}
			            	else if (parseInt(json['fcst_day_'+j].hourly_data[h+"H00"].APCPsfc) > 0 && pluie[j] != 3){
			            		pluie[j] = 2;
			            	}
			            	else if (parseFloat(json['fcst_day_'+j].hourly_data[h+"H00"].APCPsfc) > 0.2 && pluie[j] != 2 && pluie[j] != 3 ){
			            		pluie[j] = 1;
			            	}
			            } //fin de for hours
			           	html += "</div>";// fin de div #slider
		       		} //fin de for days
		       	html += "</div>"; // fin de div .slider-wrapper
	        html += "</div>"; // fin de div #slider
            document.getElementById("demo").innerHTML = html;
            var aSlider = new Slider( "#slider" );

            for (j = 0; j<5; j++){  
            	if(pluie[j] == 1){
            		 document.querySelector('.slide .alert'+j).append("Attention ! Temps de trés faibles pluies prévue ce jour à "+ json.city_info.name+ ", prévoyez en fonction!");
            	}else if(pluie[j] == 2){
            		 document.querySelector('.slide .alert'+j).append("Attention ! Temps de pluies prévues ce jour à "+ json.city_info.name+ ", prévoyez en fonction!");	
            	}else if(pluie[j] == 3){
            		 document.querySelector('.slide .alert'+j).append("Attention ! Fortes pluies prévues ce jour à "+ json.city_info.name+ ", couvrez vous et faites trés attention sur la route!");	
            	}
            	console.log(pluie[j]  +""+ j);
            }
       }
    };
	xhr.open("POST", "https://www.prevision-meteo.ch/services/json/"+city, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("city="+ city);
}