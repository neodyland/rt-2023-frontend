//! 多言語対応用JS


/**
 * 言語を取得します。
 * @returns String
 */
 export function getLanguage() {
    var lang = (navigator.language) ? navigator.language : navigator.userLanguage;
    if (lang === undefined) lang = "ja";
    return lang;
}


/**
 * 言語の置き換えをします。
 */
export function replaceLanguage() {
    let lang = getLanguage();

    // 言語の表示切り替えを行う。
    for (let element of document.getElementsByClassName("language")) {
        element.classList.forEach(value => {
            if (lang.indexOf(value) !== -1) {
                element.hidden = false;
            };
        });
    };

    // もし言語が当てはまらなく表示できなかったものがあれば英語版を表示しておく。
    var before;
    for (let element of document.getElementsByClassName("language")) {
        if (typeof before !== "undefined")
            if (before.classList.contains("ja") && element.classList.contains("en")
                    && before.hidden && element.hidden)
                element.hidden = false;
        before = element;
    };

    // hiddenは全て消す。
    for (let element of document.getElementsByClassName("language"))
        if (typeof element !== "undefined")
            if (element.hidden) element.remove();
};


export const LANGUAGE = getLanguage();
export const ISJA = LANGUAGE.startsWith("ja");


/**
 * 渡された辞書からブラウザの言語のコードのキーの値をしゅとくしてかえします。
 */
export function getText(data) {
    return data[LANGUAGE]
};