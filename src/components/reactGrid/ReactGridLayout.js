import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ReactHighcharts = require('react-highcharts');
// 引入地图数据
import 'common/data/china';


// 引入echarts组件
import ReactEcharts from 'eCharts/Echarts';

// 引入测试数据

// import entAndManagerOption from 'common/data/entAndManagerOption';
// import esdateOption from 'common/data/esdateOption';
// import industryphyOption from 'common/data/industryphyOption';
// import regcapOption from 'common/data/regcapOption';



// end 引入测试数据

//响应式布局拖拽样式组件
export default class ReactGridLayout extends Component{
	constructor(props){
        super(props);
		//数据初始化参数
		// 企业注册资本  enterpriseCapitalRegistration
		// 在营企业or个体总数  totalInBattalion
		// 整体概览 latestChangeStat
		// 企业注册时间查询总量 enterpriseRegistrationTime
		// 指标概要, 雷达图 radarMap
		// 密度地图density
		// 行业统计总览 industry
		// 变更趋势 折线图 changeTrend
		// 按行业分类企业数量 enterpriseQquantity
		let layout = [

			{i: 'totalInBattalion', x: 0, y: 0, w: 6, h: 1.5,static: true},
			{i: 'latestChangeStat', x: 6, y: 0, w: 6, h: 1.5, static: true},

			{i: 'enterpriseCapitalRegistration', x: 0, y: 1.5, w: 6, h: 2,static: true},
			{i: 'enterpriseRegistrationTime', x: 6, y: 1.5, w: 6, h: 2,static: true},


			{i: 'radarMap', x: 0, y: 3.5, w: 6, h: 2,static: true},
			{i: 'density', x: 6, y: 3.5, w: 6, h: 2,static: true},

			{i: 'industry', x: 0, y: 5.5, w: 12, h: 1,static: true},
			{i: 'changeTrend', x: 0, y: 6.5, w: 12, h: 1.5, static: true},
			{i: 'enterpriseQquantity', x: 0, y: 8, w: 12, h: 1.2, static: true}

		];

		this.state = {
			layout: layout,
			layouts: {lg: layout}
		};

		this.onLayoutChange = this.onLayoutChange.bind(this);
		this.intervalTime = this.intervalTime.bind(this);

    }


	onLayoutChange(layout, layouts){
		// console.log(layout);
		this.setState({ layout, layouts });
	}

	componentWillReceiveProps(){
		
	}
	//饼图定时器
	intervalTime(echarts_instance){
		// let echarts_instance = this.echarts_react.getEchartsInstance();

		var count = 0;
	    var app = {};
	    app.timeTicket = setInterval(function () {
	      echarts_instance.dispatchAction({
	        type: 'downplay',
	        seriesIndex: 0
	      });
	      echarts_instance.dispatchAction({
	        type: 'highlight',
	        seriesIndex: 0,
	        dataIndex: (count++) % 10
	      });
	    }, 1000);
	}

	componentDidMount(){

	}

    render(){


		let {onLayoutChange,} = this;

		let {
			layout,
			layouts
		} = this.state;

		let {
			latestChangeOption,
			changeLineOption,
			changeRectOption,
			radarMapOption,
			densityOption,
			industryOption,

			enterpriseCapitalRegistrationOption,
			enterpriseQquantityOption,
			enterpriseRegistrationTimeOption,

			totaInUKEnterprises,
			totalIndividualsInBattalion


		} = this.props.chartOptions;


		let {
			getMonitorDensity,
			getChangeDensity,
			getRiskDensity
		} = this.props.callback;

		let {
			onOffMonitorDensity,
			onOffChangeDensity,
			onOffRiskDensity
		} = this.props.onOff;



        return (
			<ResponsiveReactGridLayout
				className="layout"
				layout={layout}
				layouts={layouts}
				breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
				cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
				// autoSize={true}
				rowHeight={500}
				width={1200}

				// onBreakpointChange={layout=>console.log(layout)}
				onLayoutChange={onLayoutChange}
			>

				{/* 整体概览 */}
				<div
					key={'latestChangeStat'}
					className="gridBlock"
				>
					<div className="cont-head clearfix">
						<span></span>
						<h2>整体概览</h2>

					</div>
					{
						latestChangeOption ? (
							<ReactEcharts
								option={latestChangeOption}
								{...{
									style: {
										position: 'absolute',
										top: 52,
										left: 0,
										right: 0,
										bottom: -30
									},
								}}
							/>
						) : null
					}
				</div>

				{/* 在营企业or个体总数 */}
				<div
					key={'totalInBattalion'}
					className="gridBlock"
				>

					<div className="totaInUKEnterprises">
						<p className="num">{totaInUKEnterprises}</p>
						<p className="inc">在营企业总数</p>

					</div>
					<div className="totaInUKEnterprises clo">
						<p className="num">{totalIndividualsInBattalion}</p>
						<p className="inc">在营个体总数</p>

					</div>

				</div>


				{/* 企业注册资本 */}
				<div
					key={'enterpriseCapitalRegistration'}
					className="gridBlock"
				>
					<div className="cont-head clearfix">
						<span></span>
						<h2>企业注册资本</h2>

					</div>
					{
						enterpriseCapitalRegistrationOption
						// regcapOption
							? (
								<ReactEcharts
									option={enterpriseCapitalRegistrationOption}
									// option={regcapOption}
									{...{

									}}
								/>
							) : null
					}

				</div>

				{/* 企业注册时间查询总量 */}
				<div
					key={'enterpriseRegistrationTime'}
					className="gridBlock"

				>
					<div className="cont-head clearfix">
						<span></span>
						<h2>按企业注册时间查询总量</h2>

					</div>

					{
						enterpriseRegistrationTimeOption
						// esdateOption
							? (
								<ReactEcharts
									option={enterpriseRegistrationTimeOption}

									// option={esdateOption}

									whenCanGetInsCallback={intervalTime}

									ref={(e) => { this.echarts_react = e }}
									{...{

									}}
								/>
							) : null
					}

				</div>

				{/* 变更趋势 折线图 */}
				<div
					key={'changeTrend'}
					className="gridBlock"
				>
					<div className="cont-head clearfix">
						<span></span>
						<h2>变更趋势</h2>

					</div>

					{
						changeLineOption ? (
							<ReactEcharts
								option={changeLineOption}
								{...{
									style: {
										position: 'absolute',
										top: 52,
										left: 0,
										bottom: 20,
										right: '49%',

									},

								}}
							/>
						) : null
					}

					{
						changeRectOption ? (
							<ReactEcharts
								option={changeRectOption}
								{...{
									style: {
										position: 'absolute',
										top: 52,
										left: '51%',
										right: 0,
										bottom: 20
									},
								}}

							/>
						) : null

					}

				</div>
				{/* 指标概要, 雷达图 */}
				<div
					key={'radarMap'}
					className="gridBlock"
				>
					<div className="cont-head clearfix 42">
						<span></span>
						<h2>指标概要</h2>

					</div>

					{
						radarMapOption ? (
							<ReactEcharts
								option={radarMapOption}

							/>
						) : null

					}


				</div>
				{/* 密度地图 */}
				<div
					key={'density'}
					className="gridBlock"
					// style={{paddingBottom: 50}}
				>
					<div className="cont-head clearfix">
						<span></span>
						<h2>变更趋势</h2>
						<ul className="cont-head-nav clearfix">
							<li
								className={` ${onOffMonitorDensity ? 'active' : ' '} `}
								onClick={getMonitorDensity}
							>监控密度</li>
							<li
								className={` ${onOffChangeDensity ? 'active' : ' '} `}
								onClick = {getChangeDensity}
							>变更密度</li>
							<li
								className={` ${onOffRiskDensity ? 'active' : ' '} `}
								onClick={getRiskDensity}
							>风险密度</li>
						</ul>

					</div>


					{
						densityOption ? (
							<ReactEcharts
								option={densityOption}
								loadingOption={{

								}}
								{...{}}
							/>
						) : null

					}


				</div>

				{/* 行业统计总览 */}
				<div
					key={'industry'}
					className="gridBlock"
				>
					<div className="cont-head clearfix">
						<span></span>
						<h2>行业统计总览</h2>

					</div>

					{
						industryOption ? (
							<ReactHighcharts
								config={ industryOption }
								{...{}}
							/>
						) : null

					}


				</div>

				{/* 按行业分类企业数量 */}
				<div
					key={'enterpriseQquantity'}
					className="gridBlock"
				>
					<div className="cont-head clearfix">
						<span></span>
						<h2>按行业分类企业数量TOP10</h2>

					</div>

					{
						enterpriseQquantityOption
						// industryphyOption
							? (
								<ReactEcharts
									// option={industryphyOption}
									option={enterpriseQquantityOption}
								{...{

								}}
							/>
						) : null
					}

				</div>








			</ResponsiveReactGridLayout>
        )
    }
}
