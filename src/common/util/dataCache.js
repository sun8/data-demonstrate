
export default function shouldRequest(keyName){

    if(!localStorage.getItem(keyName+'overtime')) localStorage.setItem(keyName+'overtime', new Date().getTime());

    let timeDifference = new Date().getTime() - Number(localStorage.getItem(keyName+'overtime'));




    return !localStorage.getItem(keyName) || timeDifference > 24*60*60*1000;

}
