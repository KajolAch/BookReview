function showcomment(){
    var comment = document.getElementById('comment').value;
    //rate
    //var rate = document.getElementById('rate').value;
    if(comment === undefined){
        alert('you should enter text');

    }else{
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(comment));
        var commentdisplay = document.getElementById('commentdisplay').appendChild(li);
    }
    return false;
}
