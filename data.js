
/**
 * Module dependencies
 */

var natural = require('natural')
var elex = require('./elex.json')
var prop = require('./prop.json')

/**
 * Filter candidates data
 */

var matches = elex
.filter(function(e){  return e.first.length && e.first !== 'Other' })
.map(function(e){
  var names = []

  var n = e.last.toUpperCase() + ', ' + e.first.toUpperCase()
  for(var i = 0; i < prop.length; i++) {
    var match = natural.JaroWinklerDistance(prop[i].can_nam, n)
    names.push({name: n, match: match, pname: prop[i].can_nam, fecid: prop[i].can_id, elexid: e.unique_id})
  }

  names.sort(function(a, b){
    return b.match - a.match
  })

  return names[0]
})

// Order by match distance
matches.sort(function(a, b){
  return a.match - b.match
})

/**
 * Expose Data
 */

module.exports = {
  matches: matches,
  fecnames: prop.map(function(p){ return { name: p.can_nam, id: p.can_id } })
}
