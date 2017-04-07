var obj = {
    "word":"hello",   
    "object": {
        "test": "test value"
    },
    "array":[1,2,3,4]
}

for(var key in obj){
   
        console.log(obj[key].constructor === {}.constructor);    
   
    
}