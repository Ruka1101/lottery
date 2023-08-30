// 参加者人数分の番号の配列を作成
let participantsNumber = [];
function makeParticipantsArray() {
    const numberOfParticipants = Number(document.getElementById("nParticipants").value);
    for (let i = 1; i < numberOfParticipants + 1; i++) {
        participantsNumber.push(i);
    }
}

// 役職者用番号と非役職者用番号の配列を作成
let managersNumber = [];
let notManagersNumber = [];
function splitNumber() {
    if (document.getElementById("nManagers").value) {
        managersNumber = document.getElementById("nManagers").value.split(",").map(Number);
    }
    notManagersNumber = participantsNumber.filter(i => managersNumber.indexOf(i) == -1);
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
    let name = document.getElementById("name").value;
    let notDrawnYet = 0;
    let remained = [];
    if (checkValue == "manager") {
        if (managersNumber.length === 0) {
            document.getElementById('displayNumber').textContent = "役職者用の番号は残っていません。";
        } else {
            rand = Math.floor(Math.random() * managersNumber.length);
            number = managersNumber[rand];
            document.getElementById('displayNumber').textContent = name + "さん、あなたの番号は" + number + "番です。";
            managersNumber.splice(rand,1);
        }  
    } else {
        if (checkValue == "notManager") {
            if (notManagersNumber.length === 0) {
                document.getElementById('displayNumber').textContent = "非役職者用の番号は残っていません。";
            } else {
                rand = Math.floor(Math.random() * notManagersNumber.length);
                number = notManagersNumber[rand];
                document.getElementById('displayNumber').textContent = name + "さん、あなたの番号は" + number + "番です。";
                notManagersNumber.splice(rand,1);
            }
        }
    }
    // 残り人数を計算
    notDrawnYet = managersNumber.length + notManagersNumber.length;
    notDrawnMember(notDrawnYet);
    // 残り番号を昇順の配列にする
    remained = [...new Set([...managersNumber, ...notManagersNumber])];
    sortedRemained = remained.sort((a, b) => a - b);
    remainedNumber(sortedRemained);
}

// 残り人数を表示
function notDrawnMember(num) {
    document.getElementById('notDrawn').textContent = "残り人数: " + num + "人"; 
}

// 残り番号を表示
function remainedNumber(rn) {
    if (rn.length === 0) {
        document.getElementById('remainedNum').textContent = "残り番号はありません。";
    } else {
        document.getElementById('remainedNum').textContent = "残り番号: " + rn;
    }
}
