import { API, graphqlOperation } from 'aws-amplify';

export async function getLastDayData(){
    try{

        const yesterday = ((new Date() - (24 * 60 * 60 * 1000)) / 1000).toFixed();
        const result = await API.graphql(graphqlOperation(`
        query MyQuery {
            listDht11Data(filter: {timestamp: {gt: ${yesterday}}}, limit: 3000) {
                items {
                  tempF
                  humidity
                  timestamp
                }
              }
          }`));

        let data = result.data.listDht11Data.items;
        data.sort((a, b) => a.timestamp - b.timestamp);
        return data;
    }
    catch(err){
        console.log(err);

    }

}

