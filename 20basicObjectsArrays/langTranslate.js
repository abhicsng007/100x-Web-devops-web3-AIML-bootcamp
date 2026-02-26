// function langTranslate(obj) {
//     let result = {};
//     for(const [key,value] of Object.entries(obj)){
//         for(const [k,v] of Object.entries(value)){
//             result[k] = {...result[k], [key]:v};
//         }
//     }
//     return result;
// }

function langTranslate(obj) {
    let result = {};
    for(const [key,value] of Object.entries(obj)){
        for(const [k,v] of Object.entries(value)){
            (result[k] ??= {})[key] = v;
        }
    }
    return result;
}

console.log(langTranslate({
  en: { hello: "Hello", bye: "Goodbye" },
  fr: { hello: "Bonjour", bye: "Au revoir" },
  es: { hello: "Hola" }
}));