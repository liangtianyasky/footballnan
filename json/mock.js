module.exports = {
    rules:[
        {
             pattern:/\/api\/getLivelist.php\?rtype=origin$/,
             respondwith:"./livelist.json"
        },
        {
             pattern:/\/api\/getLivelist.php\?rtype=more$/,
             respondwith:"./livelist-more.json"
        },
        {
             pattern:/\/api\/getLivelist.php\?rtype=refresh$/,
             respondwith:"./livelist-refresh.json"
        }
       /* {
             pattern:/\/api\/getLiveDetail.php\?id=\d+$/,
             respondwith:"./livedateil.json"
        }*/
    ]
}