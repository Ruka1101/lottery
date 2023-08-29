// 参加者人数分の番号の配列を作成
let participantsNumber = [];
function makeParticipantsArray() {
    const numberOfParticipants = Number(document.getElementById("nParticipants").value);
    for (let i = 1; i < numberOfParticipants + 1; i++) {
        participantsNumber.push(i);
    }
    console.log(participantsNumber);
}

// 役職者用番号と非役職者用番号の配列を作成
let managersNumber = [];
let notManagersNumber = [];
function splitNumber() {
    if (document.getElementById("nManagers").value) {
        managersNumber = document.getElementById("nManagers").value.split(",").map(Number);
    }
    notManagersNumber = participantsNumber.filter(i => managersNumber.indexOf(i) == -1);
    console.log(managersNumber);
    console.log(notManagersNumber);
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
                document.getElementById('displayNumber').textContent = "非役職者用の席は残っていません。";
            } else {
                rand = Math.floor(Math.random() * notManagersNumber.length);
                number = notManagersNumber[rand];
                document.getElementById('displayNumber').textContent = name + "さん、あなたの番号は" + number + "番です。";
                notManagersNumber.splice(rand,1);
            }
        }
    }
}
