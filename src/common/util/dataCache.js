
export default function shouldRequest(){

    let timerOneDay = localStorage.getItem('time')?localStorage.getItem('time'):new Date().getTime();

    let timeDifference = new Date().getTime() - timerOneDay;

    return timeDifference < 24*60*60*1000 ;

}
