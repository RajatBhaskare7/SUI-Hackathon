
const axios = require('axios');


const Listcoin =async (req,res)=> {

    

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': 'b2eb521a-eba1-4233-84a5-d902946d533e',
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log("error");
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    res.status(200).json(json);
    resolve(json);
  }
});
    
}


module.exports = {
    Listcoin
}
