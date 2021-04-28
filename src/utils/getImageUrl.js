/*
* MODULE getImageUrl
*PROGRAMMER: PU Yuan
*VERSION: 1.0 (28 April 2021)
*PURPOSE: According to the type of image (identity), generate and return the corresponding url of image in S3
*DATA STRUCTURE: 
  - identity : STRING
  - ID : STRING
*/

const getImageUrl = function(identity,id){
    if(identity=="user_avatar"){
        return "https://utransformer.s3-ap-southeast-1.amazonaws.com/"+identity+"/"+id+".png"
    }
    else if (identity=="good_image"){
        return "https://utransformer.s3-ap-southeast-1.amazonaws.com/"+identity+"/"+id+".png"
    }

}
export default getImageUrl;