
import axios from 'axios';

const req = axios.create({
	baseURL: 'http://fl.bidata.com.cn:8088/',
	headers: {
		'X-Token': 'adb821613725304a122f6db34007f1eb3baa3c1f'
	}
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
