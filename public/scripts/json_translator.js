var keysToTranslate = {};
var originalJSON = {};
var newJSON = {};
var cont = 1;
var translate_length = 1;

function getObjectKeys(json, keysToTranslate, keys, i) {
    if (i == keys.length) return 0;
    if (json[keys[i]] !== null && json[keys[i]].constructor === stringConstructor && typeof json[keys[i]] !== "object") {
        keysToTranslate[keys[i]] = false;
        return getObjectKeys(json, keysToTranslate, keys, i + 1);
    }
    else if (json[keys[i]] != null && (json[keys[i]].constructor === jsonConstructor || json[keys[i]].constructor === arrayConstructor)) {
        if (json[keys[i]].constructor === jsonConstructor) keysToTranslate[keys[i]] = {};
        else keysToTranslate[keys[i]] = [];
        return getObjectKeys(json[keys[i]], keysToTranslate[keys[i]], Object.keys(json[keys[i]]), 0) + getObjectKeys(json, keysToTranslate, keys, i + 1);
    }
    else {
        //For boolean value and others
        keysToTranslate[keys[i]] = false;
        return getObjectKeys(json, keysToTranslate, keys, i + 1);
    }
}
var div_keys = document.getElementById("div_keys");

function showObjectKeys(keysToTranslate, keys, i) {
    if (i == keys.length) return 0;
    if (keysToTranslate[keys[i]] !== null && keysToTranslate[keys[i]].constructor !== jsonConstructor && keysToTranslate[keys[i]].constructor !== arrayConstructor) {
        div_keys.innerHTML += '<input type="checkbox"/>' + keys[i] + ' </br>';
        return showObjectKeys(keysToTranslate, keys, i + 1);
    }
    else if (keysToTranslate[keys[i]] != null && (keysToTranslate[keys[i]].constructor === jsonConstructor || keysToTranslate[keys[i]].constructor === arrayConstructor)) {
        div_keys.innerHTML += 'Object: ' + keys[i] + '</br>';
        return showObjectKeys(keysToTranslate[keys[i]], Object.keys(keysToTranslate[keys[i]]), 0) + showObjectKeys(keysToTranslate, keys, i + 1);
    }
    else {
        return showObjectKeys(keysToTranslate, keys, i + 1);
    }
}

function removeDuplicate(json, keys, i) {
    if (i == keys.length) return 0;
    if (json[keys[i]] !== null && json[keys[i]].constructor === arrayConstructor) {
        for (var each in json[keys[i]]) {
            var howmany = customStr(JSON.stringify(json[keys[i]])).match(new RegExp(customStr(JSON.stringify(json[keys[i]][each])), "g"));
            //            console.log(howmany);
            if (howmany != null) {
                json[keys[i]].splice(each, howmany.length - 1);
                if(howmany[0] == "sim") console.log(howmany);
            }
            if (json[keys[i]][each] !== undefined && json[keys[i]][each].constructor === jsonConstructor) {
                removeDuplicate(json[keys[i]][each], Object.keys(json[keys[i]][each]), 0);
            }
        }
        removeDuplicate(json, keys, i + 1);
    }
    else {
        removeDuplicate(json, keys, i + 1);
    }
}

function customStr(str) {
    return str.replace(new RegExp("\\[", "g"), "").replace(new RegExp("\\]", "g"), "").replace(new RegExp("\\?", "g"), "").replace(new RegExp("\\{", "g"), "").replace(new RegExp("\\}", "g"), "");
}

function translateIt(json) {
    cont = 1; // for adding a new json without refresh
    json.finished = 'true';
    originalJSON = json;
    var keys = Object.keys(originalJSON);
    //    getObjectKeys(originalJSON,keysToTranslate,Object.keys(originalJSON),0);
    //    showObjectKeys(keysToTranslate,Object.keys(keysToTranslate),0);
    translate_length = getKeysLength(originalJSON, keys, 0);
    console.log('Object has ' + translate_length + ' keys that contains value');
    iterateAndTranslate(originalJSON, newJSON, keys, 0);
    //    removeDuplicate(originalJSON,Object.keys(originalJSON),0);
}
var stringConstructor = "test".constructor;
var arrayConstructor = [].constructor;
var jsonConstructor = {}.constructor;

function getKeysLength(json, keys, i) {
    if (i == keys.length) return 0;
    if (json[keys[i]] !== null && json[keys[i]].constructor === stringConstructor && typeof json[keys[i]] !== "object") {
        if (keys[i] != "updated" && keys[i] != "created" && keys[i] != "conditions" && json[keys[i]] != "" && keys[i] != "dialog_node" && keys[i] != "go_to" && keys[i] != "intent" && keys[i] != "selector") {
            return 1 + getKeysLength(json, keys, i + 1);
        }
        else return 0 + getKeysLength(json, keys, i + 1);
    }
    else if (json[keys[i]] != null && (json[keys[i]].constructor === jsonConstructor || json[keys[i]].constructor === arrayConstructor)) {
        return getKeysLength(json[keys[i]], Object.keys(json[keys[i]]), 0) + getKeysLength(json, keys, i + 1);
    }
    else {
        //For boolean value and others
        return 0 + getKeysLength(json, keys, i + 1);
    }
}

function iterateAndTranslate(json, translatedJSON, keys, i) {
    console.log('cont: ' + cont + ' legnth: ' + translate_length);
    if (cont >= translate_length && keys[i] === undefined) {
        finishedIt();
        return 0;
    }
    if (i == keys.length) return 0;
    if (json[keys[i]] !== null && json[keys[i]].constructor === stringConstructor && typeof json[keys[i]] !== "object") {
        if (keys[i] != "updated" && keys[i] != "created" && keys[i] != "conditions" && json[keys[i]] != "" && keys[i] != "dialog_node" && keys[i] != "go_to" && keys[i] != "intent" && keys[i] != "selector") {
            console.log('translating: ' + json[keys[i]]);
            xhrGet('/api/translate?text=' + json[keys[i]], function (data) {
                translatedJSON[keys[i]] = responseTreatmente(data.toLowerCase());
                cont = cont + 1;
                if (cont == translate_length && keys[i] === undefined) {
                    return 0;
                }
                else return iterateAndTranslate(json, translatedJSON, keys, i + 1);
            }, function (err) {
                console.log(err);
            })
        }
        else {
            translatedJSON[keys[i]] = json[keys[i]];
            if (cont == translate_length && keys[i] === undefined) {
                return 0;
            }
            else return iterateAndTranslate(json, translatedJSON, keys, i + 1);
        }
    }
    else if (json[keys[i]] !== null && (json[keys[i]].constructor === jsonConstructor || json[keys[i]].constructor === arrayConstructor)) {
        if (json[keys[i]].constructor === jsonConstructor) translatedJSON[keys[i]] = {};
        else translatedJSON[keys[i]] = [];
        return iterateAndTranslate(json[keys[i]], translatedJSON[keys[i]], Object.keys(json[keys[i]]), 0) + iterateAndTranslate(json, translatedJSON, keys, i + 1);
    }
    else {
        translatedJSON[keys[i]] = json[keys[i]];
        return iterateAndTranslate(json, translatedJSON, keys, i + 1);
    }
}



function responseTreatmente(data){
    if(data.indexOf("? >") != -1) data = data.replace(new RegExp("\\? >","g")," ?> ");
    return data;
}



function finishedIt() {
    delete newJSON['finished'];
    removeDuplicate(newJSON, Object.keys(newJSON), 0, 0);
    alert('acabou');
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