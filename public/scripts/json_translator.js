//var object = {
//    "name": "Ana"
//    , "created": "2017-03-30T00:32:43.466Z"
//    , "intents": [{
//        "intent": "casual_conversation"
//        , "created": "2017-03-30T00:32:43.466Z"
//        , "updated": "2017-03-30T00:32:43.466Z"
//        , "examples": [{
//            "text": "Are you okay?"
//            , "created": "2017-03-30T00:32:43.466Z"
//            , "updated": "2017-03-30T00:32:43.466Z"
//        }, {
//            "text": "How are you?"
//            , "created": "2017-03-30T00:32:43.466Z"
//            , "updated": "2017-03-30T00:32:43.466Z"
//        }, {
//            "text": "How are you doing?"
//            , "created": "2017-03-30T00:32:43.466Z"
//            , "updated": "2017-03-30T00:32:43.466Z"
//        }, {
//            "text": "How are you today?"
//            , "created": "2017-03-30T00:32:43.466Z"
//            , "updated": "2017-03-30T00:32:43.466Z"
//        }, {
//            "text": "How is Ana?"
//            , "created": "2017-03-30T00:32:43.466Z"
//            , "updated": "2017-03-30T00:32:43.466Z"
//        }]
//        , "description": null
//    }]
//};
////var object = {
////    "nome": "Rabah",
////    "age": "14",
////    "account": {
////        "accountName": "Gmail",
////        "accountPwd": "1234q"
////    }
////};
//var keysTranslate = {};
//
//
//
//function iterateObject(obj,keys){
//    
//}
//
//
////function iterateObject(obj, keys, lastKey, add) {
////    var aux_keys = {};
////    for (var key in obj) {
////        if (typeof obj[key] == 'object' && obj[key] != null) {
////            if (obj[key] instanceof Array) {
////                keys[key] = [];
////                iterateObject(obj[key], keys, key);
////            }
////            else if (obj[key] instanceof Object) {
////                console.log(obj[key]);
////                iterateObject(obj[key], keys, lastKey, true);
////            }
////        }
////        else {
////            if (add) aux_keys[key] = false;
////            else keys[key] = false;
////        }
////    }
////    if (add) {
////        keys[lastKey].push(aux_keys);
////    }
////}
//
//iterateObject(object, keysTranslate);
//
//console.log(JSON.stringify(keysTranslate));
//function removeDuplicate() {
//    for (var key in keysTranslate) {
//        if (keysTranslate[key] instanceof Array) {
//            for (var item in keysTranslate[key]) {
//                var index = JSON.stringify(keysTranslate[key]).indexOf(JSON.stringify(keysTranslate[key][item]));
//                console.log(index);
//                if(index != -1 ) keysTranslate[key].splice(item,keysTranslate[key].length-1);
//                //                var cont = 0;
//                //                for (var i = 0; i < keysTranslate[key].length; i++) {
//                //                    var index = JSON.stringify(keysTranslate[key][i]).indexOf(JSON.stringify(keysTranslate[key][item]));
//                //                    if (index != -1) cont++;
//                //                }
//                //                if (cont > 1) {
//                //                    console.log(keysTranslate[key][item])
//                //                    keysTranslate[key].splice(item, 1);
//                //                };
//            }
//        }
//        else if (keysTranslate[key] instanceof Object) {
//            console.log('ss');
//        }
//    }
//}
//removeDuplicate();
//console.log(JSON.stringify(keysTranslate));
//var keys = Object.keys(keysTranslate);
//var key_list = document.getElementById("key_list");
//
//function showKeys(div, keys, add) {
//    var aux = '<div class="child">';
//    for (var key in keys) {
//        if (keys[key] instanceof Array) {
//            div.innerHTML += '<label for="' + key + '"><input type="checkbox" onchange="addKeyToTranslate(this)" name="' + key + '" id="' + key + '"/>' + key + '</label></br>';
//            showKeys(div, keys[key]);
//        }
//        else if (keys[key] instanceof Object) {
//            showKeys(div, keys[key], true);
//        }
//        else {
//            if (add) aux += '<label for="' + key + '"><input type="checkbox" onchange="addKeyToTranslate(this)" name="' + key + '" id="' + key + '"/>' + key + '</label></br>';
//            else {
//                div.innerHTML += '<label for="' + key + '"><input type="checkbox" onchange="addKeyToTranslate(this)" name="' + key + '" id="' + key + '"/>' + key + '</label></br>';
//            }
//        }
//    }
//    if (add) div.innerHTML += aux + '</div>';
//}
//if (keys.length > 0) {
//    key_list.innerHTML = 'Select which keys would you like to translate: <br><br>';
//    showKeys(key_list, keysTranslate);
//}
//else {
//    key_list.innerHTML = 'There is no keys to translate!';
//}
//for (var key in keysTranslate) {
//    if (keysTranslate[key] instanceof Array) {
//        key_list.innerHTML += '<label for="' + key + '"><input type="checkbox" onchange="addKeyToTranslate(this)" name="' + key + '" id="' + key + '"/>' + key + '</label></br><div class="child">';
//    }
//    else {
//        key_list.innerHTML += '<label for="' + key + '"><input type="checkbox" onchange="addKeyToTranslate(this)" name="' + key + '" id="' + key + '"/>' + key + '</label></br>';
//    }
//}
//key_list.innerHTML += '<br><button onclick="translateIt();" id="translate_btn" disabled>Translate</button>';
//}
//var keysToTranslate = [];
//
//function addKeyToTranslate(element) {
//    if (element.checked) {
//        keysToTranslate.push($(element).attr("id"));
//    }
//    else {
//        keysToTranslate.splice(keysToTranslate.indexOf($(element).attr("id")), 1);
//    }
//    if (keysToTranslate.length > 0) {
//        translate_btn_toggle(true);
//    }
//    else {
//        translate_btn_toggle(false);
//    }
//}
//
//function translateIt(json) {
//    
//    xhrPost('/api/translate',json,function(data){
//        alert(JSON.stringify(data));
//    },function(err){
//        console.log(err);
//    });
//}



$("#file").change(function(event){
    var uploadedFile = event.target.files[0]; 

     if(uploadedFile.type !== "application/json") { 
        alert("Wrong file type == " + uploadedFile.type); 
        return false;
    }

    if (uploadedFile) {
        var readFile = new FileReader();
        readFile.onload = function(e) { 
            var contents = e.target.result;
            var json = JSON.parse(contents);
            translateIt(json);
        };
        readFile.readAsText(uploadedFile);
    } else { 
        console.log("Failed to load file");
    }
});


function downloadJSON(){
var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object));
var dlAnchorElem = document.getElementById('downloadAnchorElem');
dlAnchorElem.setAttribute("href",     dataStr     );
dlAnchorElem.setAttribute("download", "translatedJSON.json");
    dlAnchorElem.click();
}