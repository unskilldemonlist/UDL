/**
 * Numbers of decimal digits to round to (2 знака после запятой)
 */
const scale = 2;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    // 1. Если ранг ниже 150 или процент ниже минимального — 0 баллов
    if (rank > 150 || percent < minPercent) {
        return 0;
    }
    
    // 2. Для уровней выше топ-75 (ранги 76-150) очки за неполный процент (лист) не даются
    if (rank > 75 && percent < 100) {
        return 0;
    }

    let baseScore = 0;

    // Расчет базовых очков за 100% прохождение по диапазонам
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

    // Если прохождение на 100% — отдаем полный балл
    if (percent == 100) {
        return Math.max(round(baseScore), 0);
    }

    // Для неполного процента (1-75): берем четверть от базовых очков (0.25)
    // и умножаем на промежуточный коэффициент прогресса от minPercent до 100%
    let quarterScore = baseScore * 0.25;
    let score = quarterScore * ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));

    return Math.max(round(score), 0);
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
