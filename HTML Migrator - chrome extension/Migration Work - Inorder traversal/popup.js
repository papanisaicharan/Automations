document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

  console.log("Popup DOM fully loaded and parsed");
   

function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
        console.log('Tab script:');
        console.log(document.body);
	
	var node = document.getElementsByTagName("body");
	var jsonResponse = "";
	console.log(node);
	jsonResponse += walkDownTree(node[0]);
	/*var i;
	var txt;
	for (i = 0; i < node[0].childNodes.length; i++) {
		var sNode = node[0].childNodes[i];
		if(sNode.hasChildNodes()) {
			txt += "Parent -> " + sNode.nodeName + "<br>";
		}
		else {
			
			txt += "Child -> " + sNode.nodeName + "<br>";
		}
	}	
	alert(txt);*/

	function walkDownTree(node) {
		var jsonStructure = '{\n';
		jsonStructure += '\t"id": "' + node.id + '",\n';
		jsonStructure += '\t"component": "' + node.nodeName + '",\n';
		jsonStructure += '\t"type": "element"';
		if(node.attributes.length > 0) {
			jsonStructure += ',\n"componentProps": {\n';
		}
		for (i = 0; i < node.attributes.length; i++) {
			jsonStructure += '\t\t"' + node.attributes[i].name + '": "' + node.attributes[i].value + ((i==node.attributes.length-1)? '"\n':'",\n');
		}
		if(node.attributes.length > 0) {
			jsonStructure += '\t}';
		}
		if (node.hasChildNodes()) {
			jsonStructure += ',\n"children": [\n';
			var childNodes = node.children;
			for(var i=0;i<childNodes.length;i++) {
				var childNode = childNodes[i];
				jsonStructure += walkDownTree(childNode) + ((i==childNodes.length-1)? "\n":",\n");
    		}
			jsonStructure += ']\n';
		  }
		  jsonStructure += '}';
		return jsonStructure;
	}

	//alert(jsonResponse);
	console.log(jsonResponse)

	var file = new Blob([jsonResponse], {type: 'text/json'});
    	if (window.navigator.msSaveOrOpenBlob) // IE10+
        	window.navigator.msSaveOrOpenBlob(file, 'React Input.json');
    	else { // Others
        	var a = document.createElement("a"),
                	url = URL.createObjectURL(file);
        	a.href = url;
        	a.download = 'React Input.json';
        	document.body.appendChild(a);
        	a.click();
        	setTimeout(function() {
            		document.body.removeChild(a);
            		window.URL.revokeObjectURL(url);  
        	}, 0); 
    	}
        return document.body.innerHTML;
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        console.log('Popup script:')
        console.log(results[0]);
    });

  }, false);
}, false);