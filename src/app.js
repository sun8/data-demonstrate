
import DateWidget from 'DateWidget/DateWidget';
import ReactGridLayout from 'reactGrid/ReactGridLayout';

import 'node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'node_modules/react-bootstrap-daterangepicker/css/daterangepicker.css';

import 'style/main.scss';
import 'style/reset.scss';

import "node_modules/react-grid-layout/css/styles.css";
import "node_modules/react-resizable/css/styles.css";


// 引入请求函数
import {
	getLatestChangeStat,
	getHistoryChangeStat,
	getRadarMap,

	getMonitorDensity,
	getChangeDensity,
	getRiskDensity,
	getIndustryData,

	getEnterprise,
	getEnterpriseCapitalRegistration,
	getEnterpriseQquantity,
	getEnterpriseRegistrationTime,

	getTotaInUKEnterprises,
	getTotalIndividualsInBattalion
} from 'common/util/dataRequest';
//end 引入请求函数

// 引入构建option的函数
import {
	buildLatestChangeOption,
	bulidChangeTrendOption,
	buildChangeRadar,

	buildMonitorDensityOption,
	buildChangeDensityOption,
	buildRiskDensityOption,
	buildIndustryOption,

	buildEnterpriseOption,
	buildEnterpriseCapitalRegistrationOption,
	buildEnterpriseQquantityOption,
	buildEnterpriseRegistrationTimeOption,

	buildTotaInUKEnterprisesOption,
	buildTotalIndividualsInBattalionOption
} from 'common/util/buildChartOption';
// end 引入构建option的函数


export default class App extends Component{
    constructor(props){
        super(props);
		this.state = {
			chartOptions: {
				latestChangeOption: null,
				changeLineOption: null,
				changeRectOption: null,
				radarMapOption: null,

				densityOption: null,
				industryOption: null,

				enterpriseCapitalRegistrationOption: null,
				enterpriseQquantityOption: null,
				enterpriseRegistrationTimeOption:null,

				totaInUKEnterprises: null,
				totalIndividualsInBattalion: null

			},
			onOff:{
				onOffMonitorDensity: false,
				onOffChangeDensity: false,
				onOffRiskDensity: false
			}
		}
		this.getLatestChangeStat = this.getLatestChangeStat.bind(this);
		this.getHistoryChangeStat = this.getHistoryChangeStat.bind(this);

		this.getRadarMap = this.getRadarMap.bind(this);

		this.getMonitorDensity = this.getMonitorDensity.bind(this);
		this.getChangeDensity = this.getChangeDensity.bind(this);
		this.getRiskDensity = this.getRiskDensity.bind(this);

		this.getIndustryData = this.getIndustryData.bind(this);

		this.getEnterpriseCapitalRegistration = this.getEnterpriseCapitalRegistration.bind(this);
		this.getEnterpriseQquantity = this.getEnterpriseQquantity.bind(this);
		this.getEnterpriseRegistrationTime = this.getEnterpriseRegistrationTime.bind(this);

		this.getTotaInUKEnterprises = this.getTotaInUKEnterprises.bind(this);
    }


	// 请求监控密度,
	getLatestChangeStat(){
		// 获取最新状态
		getLatestChangeStat( ({success, statResult})=>{
			if(!success) return;


			let latestChangeOption = buildLatestChangeOption(statResult);
			let {chartOptions} = this.state;
			this.setState({
				chartOptions: {
					...chartOptions,
					latestChangeOption
				}

			});



		} );
	}

	getHistoryChangeStat(){
		// 变更趋势图表数据请求
		getHistoryChangeStat(({success, statResult})=>{
			if(!success) return;



			let {changeLineOption, changeRectOption} = bulidChangeTrendOption(statResult);

			let {chartOptions} = this.state;

			this.setState({
				chartOptions: {
					...chartOptions,
					changeLineOption, changeRectOption
				}
			});
		});
	}

	getRadarMap(){
		// 请求雷达图数据
		getRadarMap( ( {data, success} )=>{

			if(!success) return;

			let radarMapOption =  buildChangeRadar(data);

			// console.log(statResult);

			let {chartOptions} = this.state;

			this.setState({
				chartOptions: {
					...chartOptions,
					radarMapOption
				}
			});


		} );
	}



	// 请求监控密度,
	getMonitorDensity(){
		getMonitorDensity( ({success, statResult,proviceCount})=>{
				if(!success) return;
				let densityOption = buildMonitorDensityOption(statResult);
				let {chartOptions} = this.state;

				this.setState({
					chartOptions: {
						...chartOptions,
						densityOption
					},
					onOff:{
						onOffMonitorDensity : true
					}
				});

		} );
	}

	// 请求变更密度,
	getChangeDensity(){
		getChangeDensity( ({success, statResult,proviceCount})=>{
				if(!success) return;
				let densityOption = buildChangeDensityOption(statResult);
				let {chartOptions} = this.state;

				this.setState({
					chartOptions: {
						...chartOptions,
						densityOption
					},
					onOff:{
						onOffChangeDensity : true
					}
				});

		} );
	}

	// 请求风险密度,
	getRiskDensity(){
		getRiskDensity( ({success, statResult,proviceCount})=>{
				if(!success) return;
				let densityOption = buildRiskDensityOption(statResult);
				let {chartOptions} = this.state;

				this.setState({
					chartOptions: {
						...chartOptions,
						densityOption
					},
					onOff:{
						onOffRiskDensity : true
					}
				});

		} );
	}

	getIndustryData(){
		// 行业数据
		getIndustryData( ({success, statResult})=>{
			if(!success) return;

			let industryOption = buildIndustryOption(statResult);
			let {chartOptions} = this.state;

			this.setState({
				chartOptions: {
					...chartOptions,
					industryOption
				}
			});
		} );
	}

	getEnterpriseCapitalRegistration(){
		//企业注册资本
		getEnterpriseCapitalRegistration((data)=>{
			let enterpriseCapitalRegistrationOption = buildEnterpriseCapitalRegistrationOption(data);
			let {chartOptions} = this.state;

			this.setState({
				chartOptions: {
					...chartOptions,
					enterpriseCapitalRegistrationOption
				}
			});
		})
	}

	getEnterpriseQquantity(){
		//企业数量
		getEnterpriseQquantity((data)=>{
			let enterpriseQquantityOption = buildEnterpriseQquantityOption(data);
			let {chartOptions} = this.state;

			this.setState({
				chartOptions: {
					...chartOptions,
					enterpriseQquantityOption
				}
			});
		})
	}

	getEnterpriseRegistrationTime(){
		//企业注册时间查询总量
		getEnterpriseRegistrationTime((data)=>{
			let enterpriseRegistrationTimeOption = buildEnterpriseRegistrationTimeOption(data);
			let {chartOptions} = this.state;

			this.setState({
				chartOptions: {
					...chartOptions,
					enterpriseRegistrationTimeOption
				}
			});
		})
	}

	getTotaInUKEnterprises(){
		//在营企业总数
		getTotaInUKEnterprises((data)=>{
			let totaInUKEnterprises = buildTotaInUKEnterprisesOption(data);
			let {chartOptions} = this.state;

			this.setState({
				chartOptions: {
					...chartOptions,
					totaInUKEnterprises
				}
			});
		})
	}

	getTotalIndividualsInBattalion(){
		//在营个体总数
		getTotalIndividualsInBattalion((data)=>{
			let totalIndividualsInBattalion = buildTotalIndividualsInBattalionOption(data);
			let {chartOptions} = this.state;

			this.setState({
				chartOptions: {
					...chartOptions,
					totalIndividualsInBattalion
				}
			});
		})
	}

	componentDidMount(){

		this.getLatestChangeStat();
		this.getHistoryChangeStat();
		this.getRadarMap();

		this.getMonitorDensity();

		this.getIndustryData();

		this.getEnterpriseCapitalRegistration();
		this.getEnterpriseQquantity();
		this.getEnterpriseRegistrationTime();

		this.getTotaInUKEnterprises();
		this.getTotalIndividualsInBattalion();

	}




    render(){

	let { chartOptions , onOff } = this.state ;
	let {getMonitorDensity,getChangeDensity,getRiskDensity} = this;
    	return (
			<div>
                <header className="head-warp">
                    <div className="head clearfix">
                        <div className="timeWidget">
                            {/* 时间控件 */}
                            <DateWidget />
                        </div>
                        <h1>中数智汇</h1>
                    </div>

                </header>

                <section>
                    {/* 图表布局 */}
					<ReactGridLayout
						chartOptions={chartOptions}
						callback = {
							{
								getMonitorDensity,
								getChangeDensity,
								getRiskDensity
							}
						}
						onOff = {
							{...onOff}
						}

					/>
                </section>
            </div>
    	)

    }
}


ReactDOM.render(
	<App/>,
	document.getElementById('root')
)
