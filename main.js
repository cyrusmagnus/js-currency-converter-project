/*
    - Логика получение курса для конертации:
    > получаем promise с полем ответа (json с курсами валют)
    > хватаем его через then с callback функцией, у которой резултат - это promise, который мы получаем
    > внутри callback преобразуем объект-строку в json объект, где на выходе снова promise
    > хватаем promise и помещаем его в data 

fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(function (result) {
    return result.json();
}).then(function(data) {

});
*/

const rates = {};

const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

/*
    - Упрощенная логика получения курса для валют:
    > используем async функцию, чтобы дождаться ответа с сервера и ничего не работало без него
        - const response = await fetch('link')
        > запросить данные по ссылке fetch
        > дождаться ответа await
        > записать данные в константу response
    > распаковываем ответ в json и помещаем в константу data
    > записываем готовый объект с данными в константу result
    > в конце заполняем объект данными, которые нам нужны
*/

async function convert () {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;

    // помещаем число курса в div в html
    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);
    
    // проверяем курс на уменьшение или увелечинеие и меняем цвет
    // цвет USD
    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
        elementUSD.classList.remove('bottom');
    } else {
        elementUSD.classList.add('bottom');
        elementUSD.classList.remove('top');
    }
    // цвет EUR
    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
        elementEUR.classList.remove('bottom');
    } else {
        elementEUR.classList.add('bottom');
        elementEUR.classList.remove('top');
    }
    // цвет GBP
    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('top');
        elementGBP.classList.remove('bottom');
    } else {
        elementGBP.classList.add('bottom');
        elementGBP.classList.remove('top');
    }
}
convert();
// setInterval(getCurrencies(), 3,6e+6);

const convertValue = () => result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);

input.oninput = convertValue;
select.oninput = convertValue;
