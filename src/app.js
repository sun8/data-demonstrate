
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
	getIndustryData
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
	buildIndustryOption
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
				industryOption: null
			}
		}
		this.getLatestChangeStat = this.getLatestChangeStat.bind(this);
		this.getHistoryChangeStat = this.getHistoryChangeStat.bind(this);
		
		this.getRadarMap = this.getRadarMap.bind(this);

		this.getMonitorDensity = this.getMonitorDensity.bind(this);
		this.getChangeDensity = this.getChangeDensity.bind(this);
		this.getRiskDensity = this.getRiskDensity.bind(this);

		this.getIndustryData = this.getIndustryData.bind(this);


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



	componentDidMount(){
		this.getLatestChangeStat();
		this.getHistoryChangeStat();
		this.getRadarMap();

		this.getMonitorDensity();

		this.getIndustryData();
	}




    render(){

	let {chartOptions} = this.state ;
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
