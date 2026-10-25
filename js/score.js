/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * (Пользовательская формула по стандартам Global Demon List)
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    // Ниже 150 места очки не начисляются
    if (rank > 150) {
        return 0;
    }
    
    // Для уровней выше топ-75 (ранги 76-150) очки за неполный процент (лист) не даются
    if (rank > 75 && percent < 100) {
        return 0;
    }

    let baseScore = 0;

    // Расчет базовых очков за 100% прохождение в зависимости от диапазонов рангов
    if (rank <= 8) {
        // Топ 1-8: от 1000 до 720 баллов (шаг -40 за каждую позицию выше)
        baseScore = 1000 - (rank - 1) * 40;
    } else if (rank === 9) {
        // Топ 9: ровно 660 баллов
        baseScore = 660;
    } else if (rank <= 19) {
        // Топ 10-19: от 600 до 420 баллов (шаг -20)
        baseScore = 600 - (rank - 10) * 20;
    } else if (rank <= 49) {
        // Топ 20-49: от 400 до 284 баллов (шаг -4)
        baseScore = 400 - (rank - 20) * 4;
    } else if (rank <= 74) {
        // Топ 50-74: от 280 до 88 баллов (шаг -8)
        baseScore = 280 - (rank - 50) * 8;
    } else if (rank <= 150) {
        // Топ 75-150: от 80 до 5 баллов (шаг -1)
        baseScore = 80 - (rank - 75) * 1;
    }

    // Масштабирование очков в зависимости от процента прохождения (от minPercent до 100%)
    let score = baseScore * ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));

    score = Math.max(0, score);

    // Если уровень пройден не на 100% (для уровней 1-75), дается ровно четверть (1/4) от очков
    if (percent != 100) {
        return round(score / 4);
    }

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
