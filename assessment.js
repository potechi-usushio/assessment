'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');


/**
 * JS Doc
 * @どこにいれるか {入れるものの型} 変数名 説明
 * 
 * 指定した　HTML要素の子要素をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = (event) => {
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
    if(event.key === 'End'){ 
        const userName = userNameInput.value;
        const result = assessment(userName);
        /* const hrefEnd = encodeURIComponent('https://twitter.com/intent/tweet?hashtags=あなたのいいところ,&ref_src=twsrc^tfw&text='
        + result
        + '&tw_p=tweetbutton'); */

        const hrefEnd = 'https://twitter.com/intent/tweet?hashtags='
         + encodeURIComponent('あなたのいいところ')
         /* + '&ref_src=twsrc^tfw&text=' */
         + '&text='
         + encodeURIComponent(result) 
         + '&tw_p=tweetbutton';

        window.open(hrefEnd,'test');
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0 ) { //名前が空の時
        //名前が空でクリック時に結果をクリア
        removeAllChildren(resultDivided);
        removeAllChildren(tweetDivided);
        return;
    }

    removeAllChildren(resultDivided);

    //TODO 診断結果表示エリアの作成
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
     + encodeURIComponent('あなたのいいところ')
     + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = "twitter-hashtag-button";
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);
    twttr.widgets.load();
};



const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
'{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字コード番号の合計を回数の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);
    return result;
}

//　テストコード
console.assert(assessment('太郎') === '太郎のいいところは情熱です。太郎の情熱に周りの人は感化されます。',
'診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(assessment('太郎') === assessment('太郎'), '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません');


    //TODO {userName} をユーザーの名前に置き換える
    /*
    〇　概要
    \はその次の文字が特別なものであり文字通りに評価されない(=特殊な記号を意味のある指示ではなく、文字と同じくただの記号として使用する)ことを意味する。今回は{}をそうするために \{\} としている(「リテラルの{}にマッチさせる」、などと言う)。Escaping,「エスケープする」「リテラルにする」という。
    〇　分解してみる
    /  \{  username  \}  /  g
    / ~~~ / ：  /内の文字列の文字列の照合を行う
    \       ：  この次に続く記号をリテラルにする
    g       ：  グローバルサーチを行うオプションフラグで、全体の文字列を見て全てのマッチをくり返す。        
    */
