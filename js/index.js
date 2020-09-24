var alphabet = [];

//ASCII код 0 - 48, A - 65

$(function(){
    for(let i = 0; i < 10; i++){
        alphabet.push(String.fromCharCode(48 + i));
    }
    for(let i = 0; i < 26; i++){
        alphabet.push(String.fromCharCode(65 + i));
    }
});

function convert(){
    let fromNum = $("#inputNum").val().toUpperCase(), 
        fromSys = parseInt($("#inputFrom").val()),
        toNum = " ",
        toSys = parseInt($("#inputTo").val()),
        curNum = 0;

    for(let i = fromNum.length - 1; i >= 0; i--){
        let num = alphabet.indexOf(fromNum[i]);
        if(num >= fromSys){
            convertError("Число содержит неподходящие символы, используйте 0-9 и A-Z, если система счисления имеет такие цифры/буквы.");
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

    $("#outputNum").html(toNum);
};

function convertError(reason){
    $("#outputNum").html("Ошибка: " + reason);
}