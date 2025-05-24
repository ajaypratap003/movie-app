export const numberToRoman = (num: number): string => {
    if (num === 0) return 'N/A';
    const romanNumList: { [key: number]: string } = {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: 'VI',
        7: 'VII',
        8: 'VIII',
        9: 'IX',
        10: 'X'
    };
    let romanNum = '';
    let i;
    let numLen = num ? num.toString().length : 0;
    for (i = numLen; i > 0; i--) {
        let divisor = Math.pow(10, i - 1);
        let currentNum = Math.floor(num / divisor);
        if (currentNum === 0) {
            if (num > 0) {
                num = num % divisor;
                continue;
            }
        }
        romanNum += romanNumList[currentNum * divisor];
        num = num % divisor;
    }
    return romanNum;
}

export const formatValue = (name: string, row: any): string => {
    if (!row || !name) return '';
    if (name === "episode_id") {
        return `EPISODE ${row[name]}`;
    } else if (name === "title") {
        const romanNumber = numberToRoman(row['episode_id']);
        return `EPISODE ${romanNumber} - ${row[name]}`;
    }
    return row[name];
}

export const parseLines = (value: string) => value.replace(/(\\n)/g, "\n");

export const generateRandomRating = (): number => {
    return parseInt((Math.random() * 10).toFixed(1));
};