const today = new Date();             // 今日の日付
const thisYear = today.getFullYear(); // 今年

// 学年一覧
const arrGrade = [
  "小学 1<span>年</span>", 
  "小学 2<span>年</span>", 
  "小学 3<span>年</span>", 
  "小学 4<span>年</span>", 
  "小学 5<span>年</span>", 
  "小学 6<span>年</span>",
  "中学 1<span>年</span>", 
  "中学 2<span>年</span>", 
  "中学 3<span>年</span>", 
  "高校 1<span>年</span>", 
  "高校 2<span>年</span>", 
  "高校 3<span>年</span>",
  "大学 1<span>年</span>", 
  "大学 2<span>年</span>", 
  "大学 3<span>年</span>", 
  "大学 4<span>年</span>"
]

// 学歴一覧
const arrEducationalBackground = [
  ["中学卒業", 16, 3], 
  ["高校入学", 16, 4], 
  ["高校卒業", 19, 3], 
  ["大学入学", 19, 4], 
  ["短大卒業<span>(2年)</span>", 21, 3], 
  ["大学卒業<span>(4年)</span>", 23, 3], 
]

var y // 年
var m // 月
var d // 日
var birthday         // 生年月日
var thisYearBirthday // 今年の誕生日
var currentAge       // 現在の年齢

// 実行ボタンを押された際の動作
function outputButton() {
  // フォームに入力された数値を変数へ代入
  settingDate();

  // 年月日のいずれかが選択されていない場合の動作
  if (y === "-" || m === "-" || d === "-") {
    // アラートを表示する
    alert("生年月日をプルダウンメニューから選択してください。");
  } else { // 年月日すべてが選択されている場合は以下の処理を行う
    // 誕生年
    var b_fiscalyear = birthday.getFullYear();
    // 早生まれの場合の処理 (1/1-4/1の早生まれの場合便宜上前年生まれとして計算)
    // 例:2001年3月生まれ→便宜上2000年生まれとして計算する
    if (birthday < new Date(b_fiscalyear, 4 - 1, 2)) {
        b_fiscalyear --;
    }

    // 初期化
    var i
    var tableLoop
    
    // 学年早見表を表示させる処理
    tableLoop = "<table><tr><th>学年</th><th>期間</th>";
    for (i = 0; i < arrGrade.length; i++) {
      tableLoop = tableLoop + "<tr><td class='tbCenter'>";
      // 学年 (小学1年～大学4年まで表示) ※浪人・留年等は一切考慮しない
      tableLoop = tableLoop + arrGrade[i];
      tableLoop = tableLoop + "</td><td>";
      // 期間 (2000年生まれの小学1年は2007年 4月 1日～2008年 3月31日)
      tableLoop = tableLoop + (b_fiscalyear + i + 7) + "<span>年</span> 4<span>月</span> 1<span>日</span>～" + (b_fiscalyear + i + 8) + "<span>年</span> 3<span>月</span>31<span>日</span>";
      tableLoop = tableLoop + "</td></tr>";
    }
    tableLoop = tableLoop + "</table>";
    document.getElementById("output1").innerHTML = tableLoop; // HTMLに出力する

    // 学歴早見表を表示させる処理
    tableLoop = "<table><tr><th>学歴</th><th>年月</th>";
    for (i = 0; i < arrEducationalBackground.length; i++) {
      tableLoop = tableLoop + "<tr><td>";
      // 学歴を中学卒業～大学卒業まで表示
      tableLoop = tableLoop + arrEducationalBackground[i][0];
      tableLoop = tableLoop + "</td><td class='tbCenter'>";
      // 各学歴に対応した年月を表示させる ※2000年生まれの中学卒業は2016年3月
      tableLoop = tableLoop + (b_fiscalyear + arrEducationalBackground[i][1]) + "<span>年</span> " + arrEducationalBackground[i][2] + "<span>月</span>";
      tableLoop = tableLoop + "</td></tr>";
    }
    tableLoop = tableLoop + "</table>";
    document.getElementById("output2").innerHTML = tableLoop; // HTMLに出力する

    // 注意事項のメッセージが表示される
    var msg = "<p>※浪人・留年等は考慮しておりません。</p>";
    document.getElementById("outputMessage").innerHTML = msg; // HTMLに出力する
  }
}

// クリアボタンが押された際の処理
function clearButton() {
  location.reload(); // 再読み込みを行う(F5と同じ処理)
}

// HTMLを読み込みした際の処理
function reload() {
    // プルダウンメニューの「年」を1947～今年の1年後まで表示させる
    optionLoop(1947, thisYear + 1, "inputYear");
    // プルダウンメニューの「月」を1～12まで表示させる
    optionLoop(1, 12, "inputMonth");
}

// プルダウンメニューの年月が選択された場合の処理
function changeYM() {
  // プルダウンメニューの「日」部分の初期化
  document.getElementById("inputDay").innerHTML = "<option value='-' selected>-</option>";
  // フォームに入力された数値を変数へ代入
  settingDate();

  // 年月がどちらも選択されている場合は日を1～月末日まで設定する
  if (!(y === "-" || m === "-")) {
    // 選択された年月の月末日を求める(例:2023年2月の月末日→28)
    var lastDay = new Date(y, m, 0).getDate();
    // プルダウンメニューの「日」を1～月末日まで表示させる
    optionLoop(1, lastDay, "inputDay");
  }
}

function settingDate() {
  // フォームに入力された数値を変数へ代入
  y = document.getElementById("inputYear").value;
  m = document.getElementById("inputMonth").value;
  d = document.getElementById("inputDay").value;

  // 年齢を表示させるか否かフラグで判定する
  var ageFlag = false;

  // 年月日が正しく指定されている場合は以下の処理を行う
  if (!(y === "-" || m === "-" || d === "-")) {
    // 生年月日
    birthday = new Date(y, m - 1, d);

    // 年齢計算
    currentAge = thisYear - birthday.getFullYear();
    // 今年の誕生日
    thisYearBirthday = new Date(thisYear, m - 1, d);
    // 今年の誕生日を迎えていない場合1を引く
    if (today < thisYearBirthday) {
        currentAge --;
    }
    // 年齢計算が0以上の場合のみ年齢を表示する
    if (currentAge >= 0) {
        ageFlag = true;
    }
  }

  // HTMLの出力結果を一旦リセットする
  document.getElementById("output1").innerHTML = "";
  document.getElementById("output2").innerHTML = "";
  document.getElementById("outputMessage").innerHTML = "";

  // フラグの内容により以下の処理を行う
  if (ageFlag) {
    // HTMLに現在の年齢を出力させる(今日より前の日付が指定された場合のみ)
    document.getElementById("labelAge").innerHTML = currentAge;
  } else {
    // HTMLに現在の年齢を出力しない(年月日が正しく指定されていない、または今日より後の日付が指定された場合)
    document.getElementById("labelAge").innerHTML = "-";
  }
}

// プルダウンメニューの年月日選択用の処理
function optionLoop(start, end, id, this_day) {
  var i, opt;

  opt = null;
  opt += "<option value='-' selected>-</option>";
  for (i = start; i <= end ; i++) {
    if (i === this_day) {
      opt += "<option value='" + i + "' selected>" + i + "</option>";
    } else {
      opt += "<option value='" + i + "'>" + i + "</option>";
    }
  }
  return document.getElementById(id).innerHTML = opt;
}
