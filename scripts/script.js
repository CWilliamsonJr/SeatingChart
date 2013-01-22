window.onload = initAll;
var xhr = false;
var dataArray = new Array();
var url = "students.xml"

function initAll() {
	if (window.XMLHttpRequest) {       
		xhr = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject) { // checks to see if the calling browser is IE 6 or older as they do not support XLMHttpRequest.
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) { }
		}
	}

	if (xhr) { // retrving the requested file.
		xhr.onreadystatechange = setDataArray;
		xhr.open("GET", url, true);
		xhr.send(null);
	}
	else {
		alert("Sorry, but I couldn't create an XMLHttpRequest");
	}

	var allDivs = document.getElementsByTagName("div"); // addding the onclick event.
	for (var i=0; i<allDivs.length; i++) {
		allDivs[i].onclick = featureOneDiv;
	}
}

function setDataArray() {
	if (xhr.readyState == 4) {  // request finished and response is ready
		if (xhr.status == 200) { // request was found.
			if (xhr.responseXML) {
				var allData = xhr.responseXML.getElementsByTagName("student");

				for (var i=0; i<allData.length; i++) { // retrving all the data from the xml page.
					var tempObj = new Object;
					tempObj.firstName = getVal(allData[i],"firstName");
					tempObj.lastName = getVal(allData[i],"lastName");
					tempObj.seat = getVal(allData[i],"seat");
					tempObj.lunchPeriod = getVal(allData[i],"lunchPeriod");
					tempObj.readingGroup = getVal(allData[i],"readingGroup");
					dataArray[i] = tempObj;
				}
			}
		}
		else {
			alert("There was a problem with the request " + xhr.status);
		}
	}
	
	function getVal(theData,theTag) { // getting the information inside the nodes.
		return theData.getElementsByTagName(theTag)[0].firstChild.nodeValue;
	}
}

function featureOneDiv(evt) {
	var allDivs = document.getElementsByTagName("div");
	for (var i=0; i<allDivs.length; i++) {
		allDivs[i].className = "";
	}

	var theDiv = (evt) ? evt.target : window.event.srcElement; // browser checking to see if calling browser is IE or not.
	theDiv.className = "pickedDiv";
	var theStudent = null;

	for (var i=0; i<dataArray.length; i++) { // assigning the clicked div to the corrorsponding student.
		if (theDiv.id == dataArray[i].seat) {
			theStudent = dataArray[i];
		}
	}
	if (theStudent) { // making and filling the popup box with the information.
		var studentInfo = document.getElementById("detail");
		var theMsg = "<span id='closeBox'>X</span> <h3>";
		theMsg += theStudent.firstName + " " + theStudent.lastName;
		theMsg += "</h3>Seat: "  + theStudent.seat;
		theMsg += "<br />Lunch Period: "  + theStudent.lunchPeriod;
		theMsg += "<br />Reading Group: "  + theStudent.readingGroup;

		studentInfo.innerHTML = theMsg;
		studentInfo.style.top = (theDiv.offsetTop-5) + "px";
		studentInfo.style.left = (theDiv.offsetLeft+35) + "px";
		studentInfo.style.visibility = "visible";

		document.getElementById("closeBox").onclick = function() { // closing the popup box.
			document.getElementById("detail").style.visibility = "hidden";
		}
	}
}
