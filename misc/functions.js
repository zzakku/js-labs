export function isEqualObj(x, y) {
    // Думаю, можно предположить, что сравниваем мы таки ОБЪЕКТЫ, а не абы что...
     if (x === y)
     {
         return true; // по идее примитивные объекты проверяются штатным тройным равно :^)
     }

    if ( x.constructor !== y.constructor ) return false;
    // Дерево наследования должно совпадать, если конструкторы разные - уже плохо 

    for (let p in x )
        if ( x.hasOwnProperty( p ) && ! y.hasOwnProperty( p ) )
        return false;
    for (let p in y )
        if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) )
        return false;
    // сравниванием списки полей

    for (let p in x ) {
        if ( x[ p ] === y[ p ] ) continue;
        if ( typeof( x[ p ] ) !== "object" ) return false;
        if ( ! isEqualObj( x[ p ],  y[ p ] ) ) return false;
    }

    return true;
}

// * @param {number} arraySize - размер массива
// * @param {?} data - значение для массива
// * @returns {Array}
export function fill(arraySize, data) {
    let i = 0;

    let res = [];
    while (i < arraySize)
    {
        res.push(data);
        i++;
    }

    return res;
} // ['a', 'a', 'a']

//Качественная разница между двумя парами (a, b) и (c, d) определяется как (a * b) - (c * d).
//Например, качественная разница между (5, 6) и (2, 7) - это (5 * 6) - (2 * 7) = 16.
//Дан массив целых чисел, необходимо найти 4 различных индекса w, x, y, и z, таких что, качественная разница между парами (nums[w], nums[x]) и (nums[y], nums[z])
//была максимальной. Функция возвращает максимальную качественную разницу.

//Входные данные: nums = [5,6,2,7,4] Результат: 34 Пояснение: Мы можем выбрать индексы 1 и 3 для первой пары (6, 7)
//и индексы 2 и 4 для второй пары (2, 4). Качественная разница тогда - (6 * 7) - (2 * 4) = 34.

export function maxKDiff(nums) {

    if (nums.size < 4) {
        return -1; // в массиве длины меньше 4 не может быть 4 различных индекса
    }

    let max1 = -Infinity;
    let max2 = -Infinity;
    let min1 = +Infinity;
    let min2 = +Infinity;

    nums.forEach(element => {
        if (element > max1) {
            max2 = max1;
            max1 = element;
        }
        else if (element > max2) {
            max2 = element;
        }

        if (element < min1) {
            min2 = min1;
            min1 = element;
        }
        else if (element < min2) {
            min2 = element;
        }
    });

    console.log([max1, max2, min1, min2])

    return (max1 * max2) - (min1 * min2);
}

// Палиндром
export function isPalindrome(str) {
    // Вариант 1
    const cleanStr = String(str).toLowerCase().replace(/\s+/g, ''); // Очищаем строку от ненужных пробельных символов регэкспом
    return cleanStr === cleanStr.split('').reverse().join(''); // Разбиваем строку на символы, оборачиваем порядок, собираем

    // Вариант 2
    // const cleanStr = String(str).toLowerCase().replace(/\s+/g, ''); // То же что и в первом случае
    // for (let i = 0; i < cleanStr.length / 2; i++) {
    //     if (cleanStr[i] !== cleanStr[len - 1 - i]) {
    //         return false; // self-explanatory если честно, симметрично сравниваем символы вплоть до середины, в случае неудачи ретируемся
    //     }
    // }
    // return true;
}

export function encDate(dateUnproc) {
    const monthsEngToRus = ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июн.','июл.', 'авг.', 'сен.', 'окт.', 'дек.']

    const year = arg.getFullYear()
    const month = arg.getMonth()
    const day = arg.getDate()

    return `${day} ${monthsEngToRus[month]}, ${year}`;
}

export function decDate(dateStr) {
    // Разбиваем строку на части
    const parts = dateStr.split(' ');
    if (parts.length !== 3) {
        throw new Error('Неверный формат строки. Ожидается "XX yyy. ZZZZ"');
    }

    const day = parseInt(parts[0], 10);
    const monthStr = parts[1];
    const year = parseInt(parts[2], 10);

    const monthsMap = {
        'янв.': 0,
        'фев.': 1,
        'мар.': 2,
        'апр.': 3,
        'мая': 4, 
        'июн.': 5,
        'июл.': 6,
        'авг.': 7,
        'сен.': 8,
        'окт.': 9,
        'ноя.': 10,
        'дек.': 11
    };

    const month = monthsMap[monthStr.toLowerCase()];
    if (month === undefined) {
        throw new Error('Неверное сокращение месяца');
    }

    const date = new Date(year, month, day);

    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
        throw new Error('Неверная дата');
    }

    return date;
}