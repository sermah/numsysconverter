var alphabet = [];

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
        curNum += alphabet.indexOf(fromNum[i]) * Math.pow(fromSys,fromNum.length - 1 - i);
    }

    console.log(fromNum, curNum);

    for(let i = 0; curNum != 0; i++){
        let digit = parseInt(curNum % toSys);
        curNum = parseInt(curNum / toSys);

        toNum = alphabet[digit] +  ((i % 3 == 0 && i > 0) ? " " : "") + toNum;
    }

    $("#outputNum").html(toNum);
};