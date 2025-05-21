//変数の初期化
  let untyped = ''; //未入力の文字を入れる変数
  let typed = '';  //入力済の文字を入れる変数
  let score = 0;  //スコア数は0を初期値にする
  
  
  
  


//必要なHTML要素の取得 
const untypedfield = document.getElementById('untyped'); //未入力文字列を表示するHTML要素を取得
const typedfield = document.getElementById('typed');  //入力済文字列を表示するHTML要素を取得
const wrap = document.getElementById('wrap');  //テキスト表示範囲のHTML要素取得
const count =document.getElementById('count'); //カウント数表示のHTML要素を取得

const typingcount =document.getElementById('typing-count'); //タイピングカウント数表示のHTMLを取得【課題】





// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];


//ランダムなテキストを表示
const createText = () => {

  //正タイプした入力済みテキストをクリアする
  typed = '';
  typedfield.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  // textListsの値（個数）をランダムな数値で出力、ランダム数値の小数点以下を切り捨て生成
  let random = Math.floor(Math.random() *textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};
// createText();

// キー入力の判定
  //keyPressをイベントオブジェクトe
const keyPress = e => {

  //誤タイプのとき
  if(e.key !== untyped.substring(0,1)) {  //押されたキーが未入力文字と不一致なら
    wrap.classList.add('mistyped'); //テキスト表示範囲 wrapを classList.add ﾒｿｯﾄﾞでcssｽﾀｲﾙを追加して
    setTimeout(() => {     //一定時間後に1度だけ
      wrap.classList.remove('mistyped');  //テキスト範囲 wrap を classList.removeﾒｿｯﾄﾞで追加されたcssｽﾀｲﾙを削除
    },100);          //一定時間を0.1(100)秒にして
    return;              //終了する       
  }

  //正タイプのとき
  score++;  //スコアを加算する
  wrap.classList.remove('mistyped'); //テキスト表示範囲 wrapを classList.remove ﾒｿｯﾄﾞでcssｽﾀｲﾙを削除して
  typed += untyped.substring(0,1); //untypedの先頭文字を取得し、入力後typedの末尾に追加
  untyped = untyped.substring(1); //untyped２文字目以降をuntypedに再代入し新しいﾃｷｽﾄとする
  typedfield.textContent = typed; //HTML要素取得した typedfield に textcontentﾌﾟﾛﾊﾟﾃｨでtypedに新しいﾃｷｽﾄを代入
  untypedfield.textContent = untyped;  //HTML要素取得した untypedfield に textcontentﾌﾟﾛﾊﾟﾃｨで untypedに新しいﾃｷｽﾄを代入
  
  typingcount.textContent = score; //HTML要素取得した typingcount に score数を代入する。【課題】

  

  if(untyped === '') {   //入力済みにより未入力文字が無くなったら
    createText();        //新しいテキストを表示させ
  }
  //ｲﾍﾞﾝﾄｵﾌﾞｼﾞｪｸﾄeからどのｷｰが入力されたか(keyﾌﾟﾛﾊﾟﾃｨ)表示(入力文字 1文字ずつ出力される)
  //console.log(e.key);
};



//ゲームスタート時の処理
start.addEventListener('click',() => {     //HTML要素startをクリックした時
  timer();  //カウントダウンタイマーを開始して
createText();   //ランダムなテキストを表示して
start.style.display = 'none' //HTML要素startボタンを非表示にして
typingcount.style.display = '';  //HTML要素typing-countを表示する


  //キーボードのイベント処理
  //ｲﾍﾞﾝﾄﾘｽﾅｰ関数 (keypressしたときに、keyPress処理を実行する)
document.addEventListener('keypress', keyPress);
});


untypedfield.textContent = 'スタートボタンで開始';  //スタート時に表示するテキスト
typingcount.style.display = 'none';    //タイピング数を非表示にしておく  【課題】





// タイピングスキルのランクを判定
const rankCheck = score => {  //関数rankCheckはscoreを引数にして
    //return `${score}文字打てました！`;  // score数とテキストを返し
  let text = '';  //テキストを格納する変数
  if(score < 100) {  //score数が 100より小さかったら
    text = `あなたのランクはCです。\n Bランクまであと${100-score}文字です。`; 
  } else if(score < 200) {                                                  //そうでなく、score数が200より小さかったら 
    text = `あなたのランクはBです。\n Aランクまであと${200-score}文字です。`;
  } else if(score < 300) {                                                  //そうでなく、score数が300より小さかったら
    text = `あなたのランクはAです。\n Sランクまであと${300-score}文字です。`;
  } else if(score >= 300) {                                                 //そうでなく、score数が300より大きかったら
    text = `あなたのランクはSです。\n おめでとうございます。`;
  }

  //上記 スコア数とランク判定を生成したメッセージと一緒に、テキストを返す
  return `${score}文字打てました！\n ${text}\n 【OK】リトライ / 【キャンセル】終了`;
};




// ゲームを終了時
const gameOver = id => {  //関数gameOverは setInterval id を引数にして
  clearInterval(id);      //clearInterval(id) で処理で終了させ
  const result = confirm(rankCheck(score));  //ダイアログに rankCheck関数scoreを 表示させる(OK ・ ｷｬﾝｾﾙ 表示付)
  //ダイアログの OKボタンをクリックしたらリロードする
  if(result == true) {    // ﾀﾞｲｱﾛｸﾞ OK ｸﾘｯｸで true が戻り値になるので、trueのときに
    window.location.reload();  //リロードさせる
  }
  //console.log('ゲーム終了！');  //コンソールへコメントを表示させる
};



// カウントダウンタイマー
const timer = () => {
  let time = count.textContent;  //タイマー表示のHTML要素(ｐ)を取得する
  const id = setInterval(() => {  // setIntervalをidとする
    time--; //カウントダウン(減算)し
    count.textContent = time; //ｐ要素テキストを再代入する
    
    if(time <= 0) {  //カウントが 0 になったら、

      setTimeout(() =>{      //【課題】カウント0になったら、「ﾀｲﾑｱｯﾌﾟ！」を表示させ、ダイアログを10ﾐﾘ秒後に実行
      // clearInterval(id);  //setInterval(id)処理を停止させる
      gameOver(id);  //gameOver関数を実行
      },100);
      wrap.innerHTML = 'タイムアップ！';  
      };
  
  },1000); //処理間隔は1秒（1000秒)とする

};

