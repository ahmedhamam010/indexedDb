

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}



//open the database 

var db;
var request = window.indexedDB.open("newDatabase", 2);
 
request.onerror = function(event) {
  console.log("error: ");
};
 
request.onsuccess = function(event) {
db = request.result;


//start add event lestiner to view all recordes
searchListButton.addEventListener("click", function(){
	bookViewer.innerHTML = "";
   var objectStore = db.transaction("books").objectStore("books");
        objectStore.openCursor().onsuccess = function(event) {	
          var cursor = event.target.result;
          if (cursor) {
          		
          		bookViewer.innerHTML += 
          		`<li>id : ${cursor.key} , title : ${cursor.value.title} , sn : ${cursor.value.sn} , age : ${cursor.value.age} </li>` 
                // console.log("Name for id " + cursor.key + " is " + cursor.value.title + ", Age: " + cursor.value.age);
                cursor.continue();
          }
        }; 
});
//end add event lestiner to view all recordes



//start add event lestiner to add one record
addButton.addEventListener("click", function(){
	var request = db.transaction(["books"], "readwrite").objectStore("books")
	.add({ title: bookTitle.value, sn: bookSn.value , age: bookYear.value }) 
	request.onsuccess = function(event) {alert("added successfully")} 
});
//end add event lestiner to add one record



//start add event lestiner to delete one record
deleteButton.addEventListener("click", function(){

    if(  idToDelete.value  != "" ){

     var request = db.transaction(["books"], "readwrite").objectStore("books").delete(+idToDelete.value);
        request.onsuccess = function(event) {alert("deleted successfuly")} 
    }else if( snToDelete.value != ""  ){

   var objectStore = db.transaction("books").objectStore("books");
        objectStore.openCursor().onsuccess = function(event) {  
          var cursor = event.target.result;

          if (cursor.value.sn == snToDelete.value ) {
            
              var request = db.transaction(["books"], "readwrite").objectStore("books").delete(cursor.key);
              request.onsuccess = function(event) {alert("deleted successfuly")} 
             
          }
        }; 

      
    }
});
//end add event lestiner to delete one record





//start add event lestiner to delete records in database
clearStoreButton.addEventListener("click", function(){
  bookViewer.innerHTML = "";
     var request = db.transaction(["books"], "readwrite").objectStore("books").clear();
        request.onsuccess = function(event) {alert("all records deleted successfuly")}
});
//end add event lestiner to delete records in database




        
};
 
request.onupgradeneeded = function(event) {
  var db = event.target.result;
        var objectStore = db.createObjectStore("books", {keyPath: "id" , autoIncrement : true });
        

}













