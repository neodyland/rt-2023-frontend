// Help

import { getLanguage } from "./language.js";
import { utils } from "./utils.js";


const FIRST_HELP = `<a href="/help.html?g=bot" class="item">Bot関連</a>
<a href="/help.html?g=server-tool" class="item">サーバー ツール</a>
<a href="/help.html?g=server-panel" class="item">サーバー パネル</a>
<a href="/help.html?g=server-safety" class="item">サーバー 安全</a>
<a href="/help.html?g=server-useful" class="item">サーバー 便利</a>
<a href="/help.html?g=individual" class="item">個人</a>
<a href="/help.html?g=entertainment" class="item">娯楽</a>
<a href="/help.html?g=chplugin" class="item">チャンネルプラグイン</a>
<a href="/help.html?g=music" class="item">音楽</a>
<a href="/help.html?g=other" class="item">その他</a>`;
const FIRST_HELP_EN = FIRST_HELP
    .replace("Bot関連", "Bot General").replace("サーバー ツール", "Server Tool")
    .replace("サーバー パネル", "Server Panel").replace("サーバー 安全", "Server Safety")
    .replace("サーバー 便利", "Server Useful").replace("個人", "Individual")
    .replace("娯楽", "Entertainment").replace("チャンネルプラグイン", "Channel Plugin")
    .replace("音楽", "Music").replace("その他", "Other");


let params = (new URL(location)).searchParams;
let lang = getLanguage().startsWith("ja") ? "ja" : "en";
let langParam = `?lang=${lang}`;


switch (location.pathname) {
    case "/news.html":
        if (!params.get("p")) {
            $.ajax({
                url: "${API}/news",
                type: "get",
                dataType: "json"
            }).done(data => {
                data = data.data
                for (let n in data) {
                    $(".news-html").prepend(
                        `<a href="/news.html?p=${n}" class="item">
                            <div>${data[n][0]}</div>
                            <div>${data[n][1]}</div>
                        </a>`
                    )
                }
            })
        } else {
            $.ajax({
                url: `${API}/news/${params.get("p")}`,
                type: "get",
                dataType: "json"
            }).done(data => {
                if (data.status != 200) {
                    $(".news-html").css("text-align", "center").html(
                        `<h1>404 Not Found.</h1>
                        <div>お探しのページが見つかりませんでした。<br>たどったリンクが正しいか確認してください。</div>
                        <a href="/news.html" class="btn">一覧に戻る</a>`
                    )
                } else {
                    data = data.data
                    $(".title").replaceWith(
                        `<div class="title">
                            <h2>ニュース</h2>
                            <h1>${data.title}</h1>
                            <h3>${data.date}</h3>
                        </div>`
                    )
                    $(".news-html").html(marked.parse(data.content))
                    hljs.highlightAll()
                }
            })
        }
        break

    case "/help.html":
        if (!params.get("g") && !params.get("c")) {
            $(".help-html").html(getLanguage().startsWith("ja") ? FIRST_HELP : FIRST_HELP_EN)
        } else if (params.get("g") && !params.get("c")) {
            $.ajax({
                url: `${API}/help/get/${params.get("g")}${langParam}`,
                type: "get",
                dataType: "json"
            }).done(data => {
                if (data.status != 200) {
                    $(".help-html").css("text-align", "center").html(
                        `<h1>404 Not Found.</h1>
                        <div>お探しのページが見つかりませんでした。<br>たどったリンクが正しいか確認してください。</div>
                        <a href="/help.html" class="btn">一覧に戻る</a>`
                    )
                } else {
                    $(".title").replaceWith(
                        `<div class="title">
                            <h2>ヘルプ</h2>
                            <h1>${data.title}</h1>
                        </div>`
                    )
                    data = data.data
                    delete data.title
                    let n;
                    for (let key in data) {
                        n = data[key];
                        $(".help-html").append(
                            `<a href="/help.html?g=${params.get("g")}&c=${n[0]}" class="item description"><span class="description span">${n[0]}</span>${n[1]}</a>`
                        )
                    }
                }
            })
        } else if (params.get("g") && params.get("c")) {
            $.ajax({
                url: `${API}/help/get/${params.get("g")}/${params.get("c")}${langParam}`,
                type: "get",
                dataType: "json"
            }).done(data => {
                if (data.status != 200) {
                    $(".help-html").css("text-align", "center").html(
                        `<h1>404 Not Found.</h1>
                            <div>お探しのページが見つかりませんでした。<br>たどったリンクが正しいか確認してください。</div>
                            <a href="/help.html" class="btn">一覧に戻る</a>`
                    )
                } else {
                    data = data.data
                    $(".title").replaceWith(
                        `<div class="title">
                                <h2>ヘルプ > ${data.g - data.title}</h2>
                                <h1>${params.get("c")}</h1>
                            </div>`
                    )
                    $(".help-html").html(marked.parse(data.content))
                    hljs.highlightAll()
                }
            })
        }
        break
};