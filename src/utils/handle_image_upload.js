/*
* MODULE getConfig
*PROGRAMMER: PU Yuan
*VERSION: 1.0 (28 April 2021)
*PURPOSE: Configuration information of the S3 bucket
*/
 const getConfig = function(type){
   
    var config = {
        bucketName: 'utransformer',
        dirName: 'good_image',
        region: 'ap-southeast-1',
        accessKeyId: 'AKIA2GJN7FX7LP6KTL55',
        secretAccessKey: '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',
    }
    return config;
}

export default getConfig;
