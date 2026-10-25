/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    if (rank > 150) {
        return 0;
    }
    
    // Для уровней выше топ-75 (ранги 76-150) очки за неполный процент не даются
    if (rank > 75 && percent < 100) {
        return 0;
    }

    let baseScore = 0;

    // Расчет базовых очков по диапазонам
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

    // Если прохождение 100% — отдаем полный базовый балл
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
    // Округляем до 2 знаков и убираем лишние нули на конце (например, превращает 13597.00 в 13597)
    return Number(Number(num).toFixed(2));
}
