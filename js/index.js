var alphabet = [];

//ASCII код 0 - 48, A - 65

$(function(){
    for(let i = 0; i < 10; i++){
        alphabet.push(String.fromCharCode(48 + i));
    }
    for(let i = 0; i < 26; i++){
        alphabet.push(String.fromCharCode(65 + i));
    }
    $("input[type=\"button\"").mouseup(function(){
        $(this).blur();
        console.log("Out");
    })
});


function convert(){
    let fromNum = $("#inputNum").val().toUpperCase(), 
        fromSys = parseInt($("#inputFrom").val()),
        toNum = " ",
        toSys = parseInt($("#inputTo").val()),
        curNum = 0;

    if(fromNum.length == 0){
        convertError("Введите число, которое хотите перевести.");
        return;
    }
    if(isNaN(fromSys) || isNaN(toSys)){
        convertError("Системы счислений указаны не правильно.");
        return;
    }
    else if(fromSys > 36 || fromSys < 2 || toSys > 36 || toSys < 2){
        convertError("Системы счисления не находятся в диапазоне 2-36. <br/>10 цифр + 26 букв = 36.");
        return;
    }
    for(let i = fromNum.length - 1; i >= 0; i--){
        let num = alphabet.indexOf(fromNum[i]);
        if(num >= fromSys || num < 0){
            if(fromNum[i] == "-" && i == 0) convertError("Число должно быть положительным и содержать только цифры и/или буквы латинского алфавита.");
            else convertError("Число содержит символы, не использующиеся в этой системе счисления.");
            // Number contains invalid characters. Please use 0-9 and A-Z if the numerical system has such letters/digits.
            return;
        }
        curNum += num * Math.pow(fromSys,fromNum.length - 1 - i);
    }

    //console.log(fromNum, curNum);

    if(toSys == 10) toNum = curNum.toString();
    else for(let i = 0; curNum != 0; i++){
        let digit = parseInt(curNum % toSys);
        curNum = parseInt(curNum / toSys);
        toNum = alphabet[digit] +  ((i % 3 == 0 && i > 0) ? " " : "") + toNum;
    }

    $("#outputError").addClass("invisible");
    $("#outputNum span").html(toNum);
    $("#outputNum").removeClass("invisible");
};

function convertError(reason){
    $("#outputNum").addClass("invisible");
    $("#outputError span").html(reason);
    $("#outputError").removeClass("invisible");
}