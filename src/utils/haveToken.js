const is_have = ()=>{  
    if(localStorage.getItem("token")){
        return true;
    }else{
        return false
    }
}

export default is_have;