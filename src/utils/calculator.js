const getPercentage = (partial, total) => {
  return ((100 * partial) / total).toFixed(0)
}

module.exports = {
  getPercentage,
}
