const parts = require('./parts_details.json')

function sorter() {
    const uniqueNames = parts.filter((v,i,a)=>a.findIndex(t=>(t.GROUP_DESCRIPTION === v.GROUP_DESCRIPTION && t.PRODUCT_DESCRIPTION === v.PRODUCT_DESCRIPTION))===i)
    const res = uniqueNames.map((pu, i) => {
        if(i < uniqueNames.length) {
            const uniqueCollection = parts.filter(p => p.GROUP_DESCRIPTION === uniqueNames[i].GROUP_DESCRIPTION);
            const highestPrice = Math.max.apply(Math, uniqueCollection.map((o) =>  { 
                    return o.SALES_PRICE; 
                }));
            // console.log(`${i + 1}/${uniqueNames.length} ====== ${uniqueNames[i].GROUP_DESCRIPTION} => ${uniqueCollection.length} || ${highestPrice}`);
            const uni = uniqueCollection.filter((v,i,a)=>a.findIndex(t=>(t.SALES_PRICE === highestPrice))===i);
            return uni[0]
        }
    })

    // console.log(res)
    require('fs').writeFile(

        './sorted_parts_details.json',
    
        JSON.stringify(res),
    
        function (err) {
            if (err) {
                console.error('Crap happens');
            }
        }
    );

}

sorter()