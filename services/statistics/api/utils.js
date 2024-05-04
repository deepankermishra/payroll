// Calculates summary statistics.
function calculateSS(salaries) {
    const mean = salaries.reduce((acc, curr) => acc + curr, 0) / salaries.length;
    const min = Math.min(...salaries);
    const max = Math.max(...salaries);
    return { mean, min, max };
}

module.exports = {
	calculateSS
}