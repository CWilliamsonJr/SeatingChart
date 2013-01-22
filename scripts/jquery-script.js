
var dataArray = new Array(); // Holds the information for all the students
var ajaxObj = {
         url: "students.xml", // File to retrive
         success: parseStudents, // function when its succesful
         dataType: 'xml', // data type of the retrived file
         error: function(){alert("Cannot creat XMLHttpRequest")} // what to do if it fails.
     }

$("document").ready(function(){  // called when webpage is done loading 
  
    $("div").css("border", "2px solid black");
    $("div").click(studentArray) ;   
 
    $.ajax(ajaxObj);    
});

function parseStudents(xml){ // Creating a class object for each student.
    
   var i = 0; 
     
   if(xml) {
        $(xml).find("student").each(function(){ // find each student node and then runs a function on the returned node.
         var tempObj = new Object;
         tempObj.firstName = $(this).find("firstName").text();
         tempObj.lastName = $(this).find("lastName").text();
         tempObj.seat = $(this).find("seat").text();
         tempObj.lunchPeriod = $(this).find("lunchPeriod").text();
         tempObj.readingGroup = $(this).find("readingGroup").text();
         dataArray[i] = tempObj;
         i++;         
     });
    } else {
        console.warn("You have no Student information");
    }
 }   
 
function studentArray(){
        $("div").removeClass(function() {
          return $(this).attr('class'); // setting all the div classes to empty
        });  
        
        $(this).addClass("pickedDiv"); // setting the clicked div class

        var theStudent = null;
        var temp = $(this).attr("id");
        
        for(var info in dataArray){  // Finding the matched student in the array         
            if(temp == dataArray[info].seat){
                theStudent = dataArray[info];
                break;
            }            
        }   

        if(theStudent){ //setting the information of the student in the popup panel.

            var theMsg = "<span id='closeBox'>X</span> <h3>";
            theMsg += theStudent.firstName + " " + theStudent.lastName;
            theMsg += "</h3>Seat: "  + theStudent.seat;
            theMsg += "<br />Lunch Period: "  + theStudent.lunchPeriod;
            theMsg += "<br />Reading Group: "  + theStudent.readingGroup;

            var x = this.offsetTop;
            var y = this.offsetLeft;
           
            $("#detail").html(theMsg).css("visibility", "visible").css("top", x + 25 + "px").css("left", y + 35 + "px");
                     
            $("#closeBox").click(function(){ // Hiding the popup box when the X is closed.
               $("#detail").css("visibility", "hidden")  });  
        }       
   }