//! Help

import { getLanguage } from "./language.js";
import { API_ORIGIN } from "./utils.js"


let params = (new URL(location)).searchParams;
let lang = getLanguage().startsWith("ja") ? "ja" : "en";
let getContentElement = () => document.getElementsByClassName("content")[0];
let getUlElement = (make_back=false) => {
    let element = document.createElement("ul");
    element.className = "help-item";
    element.style = "font-size: 20px;";
    let content = getContentElement();
    if (make_back)
        content.innerHTML += `<a href="help.html">Back | 戻る</a><hr>`;
    content.appendChild(element);
    return element;
};
marked.setOptions({breaks: true});


let category = params.get("category");
let command_name = params.get("command_name");
if (category)
    if (command_name) fetch(`${API_ORIGIN}/help/get/${category}/${command_name}`, {mode: "cors"})
        .then(response => response.json())
        .then(data => getContentElement().innerHTML
            += `<a href="help.html?category=${category}">Back | 戻る</a><hr>${
                marked.parse(data.data[lang]
                    .replace("**", "# ").replace("**\n", "\n")
                    .replace(/\*\*#\*\*/g, "###")
                    .replace(/\n\*\*/g, "## ").replace(/\*\*\n/g, "\n"))
            }`)
    else fetch(`${API_ORIGIN}/help/get/${category}`, {mode: "cors"})
        .then(response => response.json())
        .then(data => {
            let element = getUlElement(true);
            Object.keys(data.data).forEach(
                key => element.innerHTML += `<li class="item">
                    <a href="help.html?category=${category}&command_name=${key}">${key}
                    </a>　${data.data[key][lang]}
                </li>`
            );
        })
else fetch(`${API_ORIGIN}/help/get`, {mode: "cors"})
    .then(response => response.json())
    .then(data => {
        let element = getUlElement();
        Object.keys(data.data).forEach(
            key => element.innerHTML += `<li class="item">
                <a href="help.html?category=${key}">${data.data[key][lang]}</a>
            </li>`
        );
    });