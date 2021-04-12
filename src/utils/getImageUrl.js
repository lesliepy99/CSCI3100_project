const getImageUrl = function(identity,id){
    if(identity=="user_avatar"){
        return "https://utransformer.s3-ap-southeast-1.amazonaws.com/"+identity+"/"+id+".png"
    }
    else if (identity=="good_image"){
        return "https://utransformer.s3-ap-southeast-1.amazonaws.com/"+identity+"/"+id+".png"
    }

}
export default getImageUrl;