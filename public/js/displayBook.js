(function() {
    console.log("in displayBook js");
    const searchForm = document.getElementById("SearchForm");
  
    if (searchForm) {
        searchForm.addEventListener("submit", event => {
        event.preventDefault();
  
        try {
  
            const BookNameElement = document.getElementById("BookName");
            const BookName = BookNameElement.value;

            if(BookName){
                if(!typeof(BookName)=="string"){
                    throw "Phrase passed is not a String";
                  }
                  else{
                      var title='';
                      var author='';
                      var img='';
                      
                     $.get("https://www.googleapis.com/books/v1/volumes?q="+ BookName+"&filter=partial",function(response){
                        console.log(response);
                        for(i=0;i<response.items.length;i++){
                            console.log(response.items[i].volumeInfo.title);
                           title=$('<h5 id="title">'+response.items[i].volumeInfo.title + '</h5>');
                           author=$('<h5 id="authors">'+response.items[i].volumeInfo.authors + '</h5>');
                           if(response.items[i].volumeInfo.hasOwnProperty('imageLinks')){
                           img=$('<img src='+response.items[i].volumeInfo.imageLinks.smallThumbnail +'></img><br>');
                            }
                           link=$('<a href="/bookinfo/'+response.items[i].id +'">More Details</a>')
                             // let listItem=title;
                           //$("#BookList").append(listItem);
                           title.appendTo("#BookList");
                           author.appendTo("#BookList");
                           if(response.items[i].volumeInfo.hasOwnProperty('imageLinks')){
                            img.appendTo("#BookList");
                           }
                           link.appendTo("#BookList");
                        }  
                     });
                     
                     
                  }
              }
           // console.log(textElement.value);
         
        } catch (e) {
          const message = typeof e === "string" ? e : e.message;
          // errorTextElement.textContent = e;
          // errorContainer.classList.remove("hidden");
        }
      });
    }
  })();