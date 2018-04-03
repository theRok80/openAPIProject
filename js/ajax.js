
chrome.tts.speak('sdfsdf');


// $(function(){
//     $.ajax({
//         type: "POST",
//         url: config.api_url + "auth",
//         data: {
//             "email": config.name,
//             "password": config.password
//         },
//         dataType: "JSON",
//         success: function (auth_data) {
//             if (auth_data.ok == true) {

//                 $.ajax({
//                     type: "POST",
//                     url: "https://openapi.naver.com/v1/voice/tts.bin",
//                     data: {
//                         "speaker": "mijin",
//                         "speed": 0,
//                         "text": "테스트 음성",
//                     },
//                     headers: {
//                         "X-Naver-Client-Id": "huEae2r_OjCuWW4Pa1NV",
//                         "X-Naver-Client-Secret": "f3XSPJw4mH"
//                     },
//                     cache: true,
//                     success: function (response) {
//                         console.log(response);
//                     }
//                 });

                // $.ajax({
                //     type: "POST",
                //     url: config.api_url + "user.get-info",
                //     data: {
                //         "access_token": auth_data.access_token,
                //         "space_id": auth_data.default_space_id,
                //         "email": config.name
                //     },
                //     dataType: "JSON",
                //     success: function (response) {
                //         console.log(response);
                //     }
                // });
                // $.ajax({
                //     type: "POST",
                //     url: config.api_url + "project.get-all",
                //     data: {
                //         "access_token": auth_data.access_token,
                //         "space_id": auth_data.default_space_id,
                //         "limit": 20
                //     },
                //     dataType: "JSON",
                //     success: function (response) {
                //         console.log(response);
                //     }
                // });
//             } else {
//                 console.log('auth error');
//             }
//         }
//     });
// });

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