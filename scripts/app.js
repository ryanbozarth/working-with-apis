$(function() {

    $('#search-term').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        getRequest(searchTerm);
    });
});

function getRequest(searchTerm, pageToken) {
    var params = {
        part: 'snippet',
        key: 'AIzaSyBBROMarUt9ifpH4wYZS9Ofr7Ks776xzgs',
        maxResults: 10,
        pageToken: pageToken,
        q: searchTerm
    };
    var url = "https://www.googleapis.com/youtube/v3/search";

    $.getJSON(url, params, function(data) {

        showResults(data.items, data.nextPageToken, data.prevPageToken);
    });
}

function showResults(results, nextPageToken, prevPageToken) {

    $('#search-results').empty();
    $.each(results, function(index, value) {
        $('#search-results').append("<div class='single-result'><a id='" + value.id.videoId + "' href='#'><img src='" + value.snippet.thumbnails.default.url + "'></a><p>" + value.snippet.title + "</p><a href='https://www.youtube.com/channel/" + value.snippet.channelId + "'>Visit Channel</a></div>");
        // $('.single-result').append("<iframe width='420' height='315' src=http://www.youtube.com/watch?v="+value.id.videoId+"'></iframe>")
    });
    $('.pagination').empty();
    if (prevPageToken != undefined) {
        $('.pagination').append("<button id='" + prevPageToken + "' class='btn-primary previous'>Previous</button>")
    }
    if (nextPageToken != undefined) {
        $('.pagination').append("<button id='" + nextPageToken + "' class='btn-primary next'>Next</button>")
    }
}

$('body').on("click", ".single-result a", function() {
    var videoId = this.id;
    $('#lightbox').html("<iframe width='420' height='315' src='https://www.youtube.com/embed/" + videoId + "'></iframe>");
});

$('body').on("click", '.next', function() {
    var pageToken = this.id;
    var searchTerm = $('#query').val();
    $(this).remove();
    getRequest(searchTerm, pageToken);
});

$('body').on("click", '.previous', function() {
    var pageToken = this.id;
    var searchTerm = $('#query').val();
    $(this).remove();
    getRequest(searchTerm, pageToken);
});
