import { Storage } from 'aws-amplify';

//Get all the objects stored in the s3 under directory 'public/esp32/pub/'
//Files are indexed by a UNIX timestamp as their name
async function getAllObjectKeys(objectCount){
    const request = await Storage.list('esp32/pub/', {pageSize: objectCount});
    let keys = [];
    if(request.results){
        request.results.map((obj) => {
            keys.push(obj.key);
        });
    }
    //console.log(request.results.reverse());
    keys.reverse();
    return keys;
}

async function getObjectByKey(objectKey){
    //file url is the download URL of the file that has that key in the S3 bucket
    var fileUrl = await Storage.get(objectKey, {download : false});
    var fileResponse = await fetch(fileUrl);
    if(fileResponse.ok){
        return fileResponse.json();
    }
}

//Parameter objectCount should be of type number - or not passed at all
async function getData(objectCount){
    let keys = [];
    if(objectCount){
        keys = await getAllObjectKeys(objectCount);
    }
    else{
        keys = await getAllObjectKeys('ALL');
    }
    let data = [];
    keys.forEach((item) => {
        getObjectByKey(item).then(obj=>{
            data.push(obj);
        });
    });

    return data;
}

export default getData;