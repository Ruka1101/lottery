// 参加者人数分の番号の配列を作成
let participantsArray = [];
function makeParticipantsArray() {
    const participantsNumber = Number(document.getElementById("participantsNum").value);
    for (let i = 1; i < participantsNumber + 1; i++) {
        participantsArray.push(i);
    }
}

// 役職者用番号と非役職者用番号の配列を作成
let managersArray = [];
let notManagersArray = [];
function splitNumber() {
    const managersNumber = document.getElementById("managersNum").value;
    if (managersNumber) {
        managersArray = managersNumber.split(",").map(Number);
    }
    notManagersArray = participantsArray.filter(i => managersArray.indexOf(i) == -1);
}

// 番号を決定
function decideNumber() {
    // 役職有無の確認
    const radioElements = document.getElementsByName('position');
    let checkValue = "";
    for (let i = 0; i < radioElements.length; i++) {
        if (radioElements.item(i).checked) {
            checkValue = radioElements.item(i).value;
        }
    }

    // 役職者or非役職者を判定し、番号決定
    let number = 0;
    let rand = 0;
    const name = document.getElementById("name").value;
    let notDrawnNumber = 0;
    let remainedNumberArray = [];
    if (checkValue == "manager") {
        if (managersArray.length === 0) {
            document.getElementById('displayNum').textContent = "役職者用の番号は残っていません。";
        } else {
            rand = Math.floor(Math.random() * managersArray.length);
            number = managersArray[rand];
            document.getElementById('displayNum').textContent = name + "さん、あなたの番号は" + number + "番です。";
            managersArray.splice(rand,1);
        }  
    } else {
        if (notManagersArray.length === 0) {
            document.getElementById('displayNum').textContent = "非役職者用の番号は残っていません。";
        } else {
            rand = Math.floor(Math.random() * notManagersArray.length);
            number = notManagersArray[rand];
            document.getElementById('displayNum').textContent = name + "さん、あなたの番号は" + number + "番です。";
            notManagersArray.splice(rand,1);
        } 
    }
    // 残り人数を計算
    notDrawnNumber = managersArray.length + notManagersArray.length;
    remainedMember(notDrawnNumber);
    // 残り番号を昇順の配列にする
    remainedNumberArray = [...new Set([...managersArray, ...notManagersArray])].sort((a, b) => a - b);
    remainedNumber(remainedNumberArray);
}

// 残り人数を表示
function remainedMember(num) {
    document.getElementById('remainedMem').textContent = "残り人数: " + num + "人"; 
}

// 残り番号を表示
function remainedNumber(rn) {
    if (rn.length === 0) {
        document.getElementById('remainedNum').textContent = "残り番号はありません。";
    } else {
        document.getElementById('remainedNum').textContent = "残り番号: " + rn;
    }
}
