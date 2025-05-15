import {MainPage} from "./pages/main/index.js";

import { isEqualObj, maxKDiff, fill, isPalindrome } from "../../misc/functions.js";

function checkTimeWithWhile() {
    const now = new Date();
    const hours = now.getHours();

    //[5,6,2,7,4]

    let objs = [{a: 5, b: 6, c: 2, d: 7, e: 4},{a: 8, b: 6, c: 2, d: 7, e: 4}]
    
    console.log("Есть два объекта, вот первый:")
    console.log(JSON.stringify(objs[0]))
    console.log("...и вот второй:")
    console.log(JSON.stringify(objs[1]))

    while (hours < 12) {
        console.log(`В столь ранний час я могу только сказать тебе, что объекты...`);
        if (isEqualObj(objs[0], objs[1])) {
            console.log("Равны!");
        }
        else {
            console.log("НЕ равны!");
        }
        console.log("Но ты ведь и сам это понял, правда?")
        break;
    }
    
    if (hours >= 12) {
        console.log(`В такой час я могу не стесняться сказать, что максимальное качественное различие в данных объектах это...)`);
        console.log(maxKDiff(objs[0]));
        console.log("...да")
        console.log(maxKDiff(objs[1]));
        return;
    }
}

checkTimeWithWhile();

const root = document.getElementById('root');

const mainPage = new MainPage(root);
mainPage.render();