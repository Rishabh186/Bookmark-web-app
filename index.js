document.getElementById("myForm").addEventListener('submit',saveBookmarker);

function saveBookmarker(e){

var siteName = document.getElementById('siteName').value;
var siteUrl = document.getElementById('siteUrl').value;
document.getElementById('ttt').innerText='HERE YOU GO!!';
  var bookmark = {
   name : siteName,
   url:siteUrl
  }

  if(!siteName || !siteUrl){
    alert('please fill in boxes first');
    return false;
  }


  var e = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  
  if(!siteUrl.match(e)){
   alert('please fill valid url');
   return false;
  }
 
console.log(bookmark);


//test if bookmars key is present or not
if(localStorage.getItem('bookmarks') === null){

var bookmarks = [];
//now push it to array 
bookmarks.push(bookmark);
//not save it in localstorage
localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

}
//if already present then
else{
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   bookmarks.push(bookmark);

  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}

getbookmarks();
//prevent default
    e.preventDefault();
}

function deletebook(url){
  
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));


  for(var i=0;i< bookmarks.length;i++){
    if(bookmarks[i].url==url){
      bookmarks.splice(i,1);
    }
  }

  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

  getbookmarks();

}
function getbookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookmarksResults = document.getElementById('bookmarksResults');

  bookmarksResults.innerHTML = '';
  for(var i=0; i< bookmarks.length;i++){
    var name  = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML += 
    '<div class="card bg-light p-3" id="color1"><h3>'
     +name
     +'<a class="btn btn-primary ml-4" target="_blank" href="'+url+'">VISIT</a>'+ 
    '<a onclick="deletebook(\''+url+'\')" class="btn btn-danger ml-4" href="#">DELETE</a>'+     
    '</h3></div>';
  }
}