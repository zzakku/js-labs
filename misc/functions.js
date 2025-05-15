export function isEqualObj(x, y) {
     if (x === y)
     {
         return true;
     }

    // if (JSON.stringify(a) === JSON.stringify(b)) {
    //     return false;
    // }

//  if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

//  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

  if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

  for ( var p in x ) {
    if ( ! x.hasOwnProperty( p ) ) continue;
      // other properties were tested using x.constructor === y.constructor

    if ( ! y.hasOwnProperty( p ) ) return false;
      // allows to compare x[ p ] and y[ p ] when set to undefined

    if ( x[ p ] === y[ p ] ) continue;
      // if they have the same strict value or identity then they are equal

    if ( typeof( x[ p ] ) !== "object" ) return false;
      // Numbers, Strings, Functions, Booleans must be strictly equal

    if ( ! object_equals( x[ p ],  y[ p ] ) ) return false;
      // Objects and Arrays must be tested recursively
  }

  for ( p in y )
    if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) )
      return false;
        // allows x[ p ] to be set to undefined

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
    // Решение 1: с использованием методов строки и массива
    const cleanStr = String(str).toLowerCase().replace(/\s+/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');

    // Решение 2: с использованием цикла
    // const cleanStr = String(str).toLowerCase().replace(/\s+/g, '');
    // const len = cleanStr.length;
    // for (let i = 0; i < len / 2; i++) {
    //     if (cleanStr[i] !== cleanStr[len - 1 - i]) {
    //         return false;
    //     }
    // }
    // return true;
}