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
//////var object = {
//////    "nome": "Rabah",
//////    "age": "14",
//////    "account": {
//////        "accountName": "Gmail",
//////        "accountPwd": "1234q"
//////    }
//////};
//var keysTranslate = {};
////
////
////
////function iterateObject(obj,keys){
////    
////}
////
////
//function iterateObject(obj, keys, lastKey, add) {
//    var aux_keys = {};
//    for (var key in obj) {
//        if (typeof obj[key] == 'object' && obj[key] != null) {
//            if (obj[key] instanceof Array) {
//                keys[key] = [];
//                iterateObject(obj[key], keys, key);
//            }
//            else if (obj[key] instanceof Object) {
//                console.log(obj[key]);
//                iterateObject(obj[key], keys, lastKey, true);
//            }
//        }
//        else {
//            if (add) aux_keys[key] = false;
//            else keys[key] = false;
//        }
//    }
//    if (add) {
//        keys[lastKey].push(aux_keys);
//    }
//}
////
//iterateObject(object, keysTranslate);
////
////console.log(JSON.stringify(keysTranslate));
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
////console.log(JSON.stringify(keysTranslate));
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
var originalJSON = {};
var newJSON = {};
var cont = 1;
var translate_length = 1;



function translateIt(json) {
    
//    json.finished = true;
    originalJSON = json;    
    var keys = Object.keys(originalJSON);    
//    translate_length = keys.length - 1;
//    translate_length = getKeysLength(originalJSON,keys,0);
//    alert(translate_length);
    postRequest(keys, originalJSON, 0, newJSON, false);
//    iterateAndTranslate(originalJSON,newJSON,keys,0,1);
}

function printIt() {
    console.log(JSON.stringify(newJSON));
}
var stringConstructor = "test".constructor;
var arrayConstructor = [].constructor;
var jsonConstructor = {}.constructor;



//function getKeysLength(json,keys,i){
//    if(i == keys.length  ) return 0;
//    console.log(typeof json[keys[i]]);
//    if(json[keys[i]].constructor === stringConstructor && typeof json[keys[i]] !== "object"){
//        i = i +1;
//        return 1 + getKeysLength(json,keys,i);
//    }else if(json[keys[i]].constructor === jsonConstructor){    
//        return getKeysLength(json[keys[i]],Object.keys(json[keys[i]]), 0 ) + getKeysLength(json,keys,i+1);
//    }else if(json[keys[i]].constructor === arrayConstructor){
//            var aux =0;
//            return getKeysLength(json[keys[i]],Object.keys(json[keys[i]]),0); +  getKeysLength(json,keys,i+1);
//    }
//}


//function iterateAndTranslate(json,translatedJSON,keys,i,cont){
//    
//    if(i == keys.length  ) return false;
//    
//    if(json[keys[i]].constructor === stringConstructor && json[keys[i]] != null ){
//            console.log('translating ( '+cont+' of '+translate_length+' )');
//            xhrGet('/api/translate?text='+json[keys[i]],function(data){
//              translatedJSON[keys[i]] = data;  
//                i = i + 1;
//                cont = cont +1;
//            return iterateAndTranslate(json,translatedJSON,keys,i,cont);    
//            });
//    }else if(json[keys[i]].constructor === jsonConstructor){
//        console.log('test');
//        
//    }else{
//    i = i +1;
//    cont = cont + 1;
//    return iterateAndTranslate(json,translatedJSON,keys,i,cont);
//    }
//}







function postRequest(keys, json, i, translatedJSON, withPush) {
    if (typeof json[keys[i]] == "string" && json[keys[i]] != null) {
        if (keys[i] == "text" || withPush || keys[i] == "value") {
            xhrGet('/api/translate?text=' + json[keys[i]], function (data) {
                if (withPush) translatedJSON.push(data);
                else translatedJSON[keys[i]] = data;
                if (i == keys.length - 1) {
                    console.log(keys[i]);
                    return false;
                }
                i = i + 1;
                postRequest(keys, json, i, translatedJSON, withPush);
            }, function (err) {
                alert('Finished!');
                console.log(err);
            });
        }
        else {
            translatedJSON[keys[i]] = json[keys[i]];
            if (i == keys.length-1) {
                console.log(keys[i]);
                return false;
            }
            i = i + 1;
            postRequest(keys, json, i, translatedJSON, withPush);
        }
    }
    else if (json[keys[i]] instanceof Array && json[keys[i]] != null) {
        translatedJSON[keys[i]] = [];
        if (typeof json[keys[i]][0] == "string") {
            postRequest(Object.keys(json[keys[i]]), json[keys[i]], 0, translatedJSON[keys[i]], true);
        }
        else {
            for (var item in json[keys[i]]) {
                translatedJSON[keys[i]][item] = {};
                postRequest(Object.keys(json[keys[i]][item]), json[keys[i]][item], 0, translatedJSON[keys[i]][item], withPush)
            }
        };
        i = i + 1;
        postRequest(keys, json, i, translatedJSON, withPush);
    }
    else if (typeof keys[i] != 'undefined') {
        if (json[keys[i]] != null && json[keys[i]].constructor === jsonConstructor) {
            translatedJSON[keys[i]] = {};
            postRequest(Object.keys(json[keys[i]]), json[keys[i]], 0, translatedJSON[keys[i]], withPush);
            i = i + 1;
            postRequest(keys, json, i, translatedJSON, withPush);
        }
        else {
            translatedJSON[keys[i]] = json[keys[i]];
            i = i + 1;
            postRequest(keys, json, i, translatedJSON, withPush);
        }
    }
}



$("#file").change(function (event) {
    var uploadedFile = event.target.files[0];
    if (uploadedFile.type !== "application/json") {
        alert("Wrong file type == " + uploadedFile.type);
        return false;
    }
    if (uploadedFile) {
        var readFile = new FileReader();
        readFile.onload = function (e) {
            var contents = e.target.result;
            originalJSON = JSON.parse(contents);
//            showKeysToUser(originalJSON);
            translateIt(originalJSON);
        };
        readFile.readAsText(uploadedFile);
    }
    else {
        console.log("Failed to load file");
    }
});

function downloadJSON() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(newJSON));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "translatedJSON.json");
    dlAnchorElem.click();
}