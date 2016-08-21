$(function() {

    $('#search-term').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        getRequest(searchTerm);
    });
});

function getRequest(searchTerm) {
    var params = {
        part: 'snippet',
        key: 'AIzaSyBBROMarUt9ifpH4wYZS9Ofr7Ks776xzgs',
        maxResults: 10,
        q: searchTerm
    };
    var url = "https://www.googleapis.com/youtube/v3/search";

    // the "function" is callback
    // real life -> ? leaving a message for a call when the person gets back
    $.getJSON(url, params, function(data) {
        // loop?
        showResults(data.items);
        // console.log(data.items[0].snippet.thumbnails.default);
        // $('.single-result').prepend('<img src="' + data.items[0].snippet.thumbnails.default.url + '">');
        // $('.single-result p').text(data.items[0].snippet.title);


    });
}

function showResults(results) {

    var x = "";

    $.each(results, function(index, value) {
        console.log(value);
        x = value;
        $('#search-results').append("<div id='' class='single-result'><img src='" + value.snippet.thumbnails.default.url + "'></a><p>"+ value.snippet.title +"</p><a href='https://www.youtube.com/channel/"+value.snippet.channelId+"'>Visit Channel</a></div>");
        // $('.single-result').append("<iframe width='420' height='315' src=http://www.youtube.com/watch?v="+value.id.videoId+"'></iframe>")
    });
    
    $(this).on( "click", function() {
        $('#lightbox').append("<iframe width='420' height='315' src=http://www.youtube.com/embed/"+x.id.videoId+"'></iframe>");
        });
}
