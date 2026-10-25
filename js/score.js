/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    // 1. Если ранг ниже 150 или процент ниже минимального порога — 0 баллов
    if (rank > 150 || percent < minPercent) {
        return 0;
    }
    
    // 2. Для уровней выше топ-75 (ранги 76-150) очки за неполный процент не даются
    if (rank > 75 && percent < 100) {
        return 0;
    }

    let baseScore = 0;

    // Расчет фиксированных базов за 100% прохождение
    if (rank <= 8) {
        baseScore = 1000 - (rank - 1) * 40;
    } else if (rank === 9) {
        baseScore = 660;
    } else if (rank <= 19) {
        baseScore = 600 - (rank - 10) * 20;
    } else if (rank <= 49) {
        baseScore = 400 - (rank - 20) * 4;
    } else if (rank <= 74) {
        baseScore = 280 - (rank - 50) * 8;
    } else if (rank <= 150) {
        baseScore = 80 - (rank - 75) * 1;
    }

    // Если прохождение 100% — отдаем полный балл
    if (percent === 100) {
        return round(baseScore);
    }

    // Фиксированная четверть за любой неполный процент (для рангов 1–75)
    return round(baseScore / 4);
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
