
import axios from 'axios';

console.log(window.location.search.substring(5));
const req = axios.create({
	baseURL: 'http://fl.bidata.com.cn:8088/',
	headers: {
		'X-Token': window.location.search.substring(5)
	}
});

const reqByCross = axios.create({
	baseURL: 'http://192.168.11.171:8808/',
	headers: {
		// 'uid': window.location.search.substring(5)
		// 'Content-Type' : 'application/x-www-form-urlencoded'
	}
	// withCredentials: true
});

function request(url, cb) {
	req.get( url )
		.then(rut=>{
			cb && cb(rut.data);
		})
		.catch(err=>{
			console.log(err);

		})
}

// data传数据， config配置，(create)属性名一样会覆盖
function requestPost(url, cb, data={}, config={}) {
	reqByCross.post( url, data, config )
		.then(rut=>{
			cb && cb(rut.data);
		})
		.catch(err=>{
			console.log(err);

		})
}

// 企业高管请求
export function getEnterprise() {
	// request('getEntAndManagerChart?startDate='+start+''&endDate='+end, cb);

}

//企业注册资本
export function getEnterpriseCapitalRegistration(cb) {
	requestPost('/getRegCap', cb);

}


//企业数量
export function getEnterpriseQquantity(cb) {
	requestPost('/getIndustryphy', cb);

}

//企业注册时间查询总量
export function getEnterpriseRegistrationTime(cb) {
	requestPost('/getEsDate', cb);

}

//在营企业总数
export function getTotaInUKEnterprises(cb) {
	requestPost('/getNumOfEnt', cb);

}


//在营个体总数
export function getTotalIndividualsInBattalion(cb) {
	requestPost('/getNumOfInd', cb);

}



// 最新状态请求
export function getLatestChangeStat(cb) {
	request('/front/stats/latestChangeStat', cb);

}

// 变更趋势
export function getHistoryChangeStat(cb) {
	request('/front/stats/historyChangeStat', cb);

}
// 雷达图请求
export function getRadarMap(cb) {
	request('/front/stats/radarMap', cb);

}

// 监控密度
export function getMonitorDensity(cb) {
	request('/front/stats/monitorByArea', cb);

}
// 变更密度
export function getChangeDensity(cb) {
	request('/front/stats/changeByArea', cb);

}
// 风险密度
export function getRiskDensity(cb) {
	request('/front/stats/riskByArea', cb);

}
// 行业
export function getIndustryData(cb) {
	request('/front/stats/industryphy', cb);

}
