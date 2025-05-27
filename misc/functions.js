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