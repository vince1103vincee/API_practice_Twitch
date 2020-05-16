const request = new XMLHttpRequest();
const client = "nsddhlt8y3mo129hhrn1ckeiz773jq";
const game_num = 6;
let game_name = encodeURIComponent('League of Legends');
let base_url = `https://api.twitch.tv/kraken/stream/?game=${game_name}&limit=${game_num}`;


$(".container").click(function(e){ //function(e)中的e代表事件發生時的各種訊息，其中e.target就代表點擊的目標
    if (e.target.classList.value === 'lol'){ //若點擊的物件之class為'lol'
        game_name = encodeURIComponent('League of Legends');
        base_url = `https://api.twitch.tv/kraken/streams/?game=${game_name}&limit=${game_num}`;
        download_twitch();
    }else if (e.target.classList.value === 'hs'){ //若點擊的物件之class為'hs'
        game_name = encodeURIComponent('Hearthstone');
        base_url = `https://api.twitch.tv/kraken/streams/?game=${game_name}&limit=${game_num}`;
        download_twitch();
    }
})
/* 不使用jQuery的寫法
document.querySelector(".container").addEventListener("click", 
    function(e){ //function(e)中的e代表事件發生時的各種訊息，其中e.target就代表點擊的目標
        if (e.target.classList.value === 'lol'){ //若點擊的物件之class為'lol'
            game_name = encodeURIComponent('League of Legends');
            base_url = `https://api.twitch.tv/kraken/streams/?game=${game_name}&limit=${game_num}`;
            download_twitch();
        }else if (e.target.classList.value === 'hs'){ //若點擊的物件之class為'hs'
            game_name = encodeURIComponent('Hearthstone');
            base_url = `https://api.twitch.tv/kraken/streams/?game=${game_name}&limit=${game_num}`;
            download_twitch();
        }
    }
)
*/

function download_twitch(){
    $.ajax({
        type: "GET",
        url: base_url,
        dataType: "json",
        beforeSend: function(xhr){
            xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
            xhr.setRequestHeader('Client-ID', client);
        },
        success: function(response){
            console.log(response);            
            put_live(response);
        },
        error: function(jqXHR){
            alert("Error: " + jqXHR.status);
        }
    });
}

/*不使用jQuery 的ajax寫法
function download_twitch(){
    request.onload = function(){
        if(request.status >= 200 && request.status<400){
            const response = request.responseText;
            const json = JSON.parse(response);
            console.log(json.streams);
            put_live(json);
        }else{
            console.log('error');
        }
    }
    
    request.open("GET", base_url, true);
    request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    request.setRequestHeader('Client-ID', client);
    request.send();

}
*/

function put_live(json){
    const live_container = $('.live');
    live_container.html('');
    console.log(json.streams.length);
    for (let i = 0; i < json.streams.length ; i++){
        const game_tv = $('<div></div>');
        game_tv.addClass('game-tv');
        game_tv.html( 
        `<a class="game-link" href="${json.streams[i].channel.url}" target="_blank">` +
        `<div class = "lang">Language: ${json.streams[i].channel.broadcaster_language}</div>` +
        `<div class = "viewer">Viewer: ${json.streams[i].viewers}</div>`+
        `<div class = "pic">` +
            `<img src = "${json.streams[i].preview.medium}>` +
        `</div>` +
        `<div class = "tv-name">Topic: ${json.streams[i].channel.status}</div>` +
        `</a>`
        );
        live_container.append(game_tv);
    }
    
}
/* 不使用jQuery的寫法
function put_live(json){
    const live_container = document.querySelector('.live');
    live_container.innerHTML = '';
    //console.log(json.streams.length);
    for (let i = 0; i < json.streams.length ; i++){
        const game_tv = document.createElement('div');
        game_tv.classList.add('game-tv');
        game_tv.innerHTML = 
        `<a class="game-link" href="${json.streams[i].channel.url}" target="_blank">` +
        `<div class = "lang">Language: ${json.streams[i].channel.broadcaster_language}</div>` +
        `<div class = "viewer">Viewer: ${json.streams[i].viewers}</div>`+
        `<div class = "pic">` +
            `<img src = "${json.streams[i].preview.medium}>` +
        `</div>` +
        `<div class = "tv-name">Topic: ${json.streams[i].channel.status}</div>` +
        `</a>`;
        live_container.appendChild(game_tv);
    }
}
*/







