"use strict";

var parts = require('./parts_details.json');

function sorter() {
  var uniqueNames = parts.filter(function (v, i, a) {
    return a.findIndex(function (t) {
      return t.GROUP_DESCRIPTION === v.GROUP_DESCRIPTION && t.PRODUCT_DESCRIPTION === v.PRODUCT_DESCRIPTION;
    }) === i;
  });
  var res = uniqueNames.map(function (pu, i) {
    if (i < uniqueNames.length) {
      var uniqueCollection = parts.filter(function (p) {
        return p.GROUP_DESCRIPTION === uniqueNames[i].GROUP_DESCRIPTION;
      });
      var highestPrice = Math.max.apply(Math, uniqueCollection.map(function (o) {
        return o.SALES_PRICE;
      })); // console.log(`${i + 1}/${uniqueNames.length} ====== ${uniqueNames[i].GROUP_DESCRIPTION} => ${uniqueCollection.length} || ${highestPrice}`);

      var uni = uniqueCollection.filter(function (v, i, a) {
        return a.findIndex(function (t) {
          return t.SALES_PRICE === highestPrice;
        }) === i;
      });
      return uni[0];
    }
  }); // console.log(res)

  require('fs').writeFile('./sorted_parts_details.json', JSON.stringify(res), function (err) {
    if (err) {
      console.error('Crap happens');
    }
  });
}

sorter();