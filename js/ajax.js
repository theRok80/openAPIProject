$(function(){
    $.ajax({
        type: "POST",
        url: config.api_url + "auth",
        data: {
            "email": config.name,
            "password": config.password
        },
        dataType: "JSON",
        success: function (response) {
            if (response.ok == true) {
                console.log(response);
            } else {
                console.log('auth error');
            }
        }
    });
});

// $(function(){
//     $.getJSON(chrome.runtime.getURL("../config.json"), function(data){
//         console.log(data);
//     });
// });

// var xhr = new XMLHttpRequest();
// xhr.open("GET", 'https://toptoon.com/therok2', true);
// xhr.onreadystatechange = function() {
//     if (xhr.readyState == 4) {
//         console.log(xhr.responseText);
//     }
// }
// xhr.send();