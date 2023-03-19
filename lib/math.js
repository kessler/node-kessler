module.exports = {
  rescale,
  cutoff
}

function rescale(a, b, minX, maxX) {
  if (typeof minX === 'function' && typeof maxX === 'function') {
    return x => a + ((x - minX()) * (b - a) / (maxX() - minX()))
  }
  
  return x => a + ((x - minX) * (b - a) / (maxX - minX))
}

function cutoff(calc, min, max) {
  return x => {
    if (x < min) return calc(min)
    if (x > max) return calc(max)
    return calc(x)
  }
}
