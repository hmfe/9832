function clearSearch(){
	document.getElementById('maybe').innerHTML = '';
}

var nameValidationInput = document.getElementById('searchValue');

function useValue() {
	var NameValue = nameValidationInput.value;

	if(!NameValue.match('[A-Za-z_][A-Za-z_0-9]')){}else{
		function getJsonObject(){
			const newapireq = new XMLHttpRequest();
			const url='http://www.omdbapi.com/?apikey=a7327726&s=' + NameValue;
			
			newapireq.open("GET", url);
			newapireq.send();
			
			var maybeID = document.getElementById('maybe');

			while (maybeID.hasChildNodes()) {
		        maybeID.removeChild(maybeID.firstChild);
		    }

			newapireq.onreadystatechange = function () {
	            var type = newapireq.getResponseHeader('Content-Type');

	            clearSearch();

	           	try {
	             	var FullArray = JSON.parse('[' + newapireq.responseText + ']');
					var i = 0;
					var smallerArray = FullArray[i];
					var smallestArray = smallerArray['Search'];
					var sliceit = smallestArray.slice(0, 5);
					

				    for(var i = 0; i < sliceit.length; i++){
				        var miniArray = sliceit[i];
				        var thereq = miniArray['Title'];
				        var thereqid = miniArray['imdbID'];

					    var node = document.createElement('P');
					    var textnode = document.createTextNode(thereq);
					    node.appendChild(textnode);
					    node.setAttribute('class', 'res');
					    document.getElementById('maybe').appendChild(node);
						node.addEventListener('click', function(e) {
							              
				            var texten = this.innerHTML;
				            document.getElementById('searchValue').value = texten;

				            var resulttitle = document.getElementById('res-title');
							var NameValue = nameValidationInput.value;
						    

						    var searchElem = document.createElement('P');
						    searchElem.setAttribute('id', thereqid);
						    searchElem.setAttribute('class', 'hist');
						    var searchDate = new Date();
						    var datee  = new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000).toISOString().substr(0,19).replace('T', ' ');
							datee = datee.substring(0, datee.length - 3);

						    resulttitle.innerHTML = NameValue;
			              	
							var textnode = document.createTextNode('' + NameValue + ' ' + datee);
						    searchElem.appendChild(textnode);
						    
						    var prevsearches = document.getElementById('prev_searches');
						    
						    if(!prevsearches.hasChildNodes()){
						    	prevsearches.appendChild(searchElem);
						    	var smaller=document.getElementById('prev_searches');
								smaller.innerHTML=smaller.innerHTML.replace(/.{21}$/,'<span class="smaller">$&</span>');
						    }else{
						    	prevsearches.insertBefore(searchElem, prevsearches.childNodes[0]);
								prevsearches.childNodes[0].innerHTML=prevsearches.childNodes[0].innerHTML.replace(/.{16}$/,'<span class="smaller">$&</span>');
						    }

						    if(!prevsearches.hasChildNodes()){
								document.getElementById('searchhistoryinfo').style.visibility = 'hidden';
							}else{
								document.getElementById('searchhistoryinfo').style.visibility = 'visible';
							}

						    clearSearch();

						  	var container = document.getElementById(thereqid);	
							container.insertBefore(document.createElement('p'), container.firstChild);
							container.addEventListener('click', function(e) {
								
								document.getElementById(thereqid).remove();

								if(!document.getElementById('prev_searches').hasChildNodes()){
									clearAll();
								}
							});
			          	});
				    }	
	           	}catch(err) {
	             	var node = document.createElement('P');
				    var textnode = document.createTextNode("Can't find any results, make sure to only use numbers and letters!");
				    node.appendChild(textnode);
				    node.setAttribute('class', 'res');
				    document.getElementById('maybe').appendChild(node);
	           	}
		    }
		}
		getJsonObject();
	}
}

document.getElementById('searchform').onsubmit = function () {
    return false;
};

nameValidationInput.addEventListener('keyup', function(event) {
	event.preventDefault();

  	if (event.keyCode === 13) {
	  	clearSearch();

	  	var node = document.createElement('P');
	    var textnode = document.createTextNode("Not ok to press enter for search, choose one of the options when typing.");
	    node.appendChild(textnode);
	    node.setAttribute('class', 'res');
	    document.getElementById('maybe').appendChild(node);
	}
});

var prevsearches = document.getElementById('prev_searches');
document.getElementById('searchhistoryinfo').style.visibility = 'hidden';
			
function clearAll(){
	var prevsearch = document.getElementById('prev_searches');
	prevsearch.innerHTML = '';
	document.getElementById('searchhistoryinfo').style.visibility = 'hidden';
}
