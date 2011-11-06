$.extend({
    keys:	 function(obj){
        var a = [];
        $.each(obj, function(k){ a.push(k); });
        return a;
    }
});

function clear_container(container_name) {
    var elmt = document.getElementById(container_name);
    elmt.innerHTML="";
}

function setupSM() {
    soundManager.url = '/static/';
    soundManager.consoleOnly = true;
    soundManager.debugMode = true;
    soundManager.flashVersion = 9; // optional: shiny features (default = 8)
    soundManager.useFlashBlock = false; // optionally, enable when you're ready to dive in
    soundManager.onready(function() {
        window.sm_loaded = true;
    });
}

function loopFile(url) {
    if (!window.sm_loaded) {
        return false;
    }
    var s = soundManager.createSound({
      id:url,
      url:url
    });

    s.play({
      loops: 100
    });
    return true;
}

function updateSongInfo(artist, title) {
    $("#songInfo").html("<p>"+artist+"-"+title+"</p>");
}

function injectSong(data) {
    var songObj = data;
    console.log(songObj,"song obj baby");
    updateSongInfo(songObj.artist, songObj.title);
    loopFile(songObj.loop_url);
    $("#songLoader").fadeOut().remove();
}

function ohShit(e) {
    alert("some shit went wrong so search for another song innit");
    console.log(e);
    $("#songLoader").fadeOut().remove();
}

function prepCanvas(image){
    var canvas = document.getElementById("reanimator"),
        context = canvas.getContext('2d'),
        cw = image.width(),
        ch = image.height();

    $(canvas).fadeIn();
    canvas.width = cw;
    canvas.height = ch;

}

function searchLoadSong(user_input) {
    clear_container("songInfo");
    var img = $("img.selected");
        source = img.attr("src");
    console.log(source);
    prepCanvas(img);
    // looks like this:
    // http://snuggle.sandpit.us/looper?combined=kreayshawn%20gucci%20gucci
    $.ajax({
        url: "/looper", 
        data: {combined : user_input, gifurl : source}, 
        dataType: 'JSON', 
        success: injectSong, 
        error:ohShit
    });
    return false;
}