import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ReactHighcharts = require('react-highcharts');
import ReactLoading from 'react-loading';
// 引入地图数据
import 'common/data/china';
// import ReactLoading from 'react-loading';

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
		let layout12 = [

			{i: 'totalInBattalion', x: 0, y: 0, w: 6, h: 400/50,  static: false},
			{i: 'latestChangeStat', x: 6, y: 0, w: 6, h: 400/50,  static: false},

			{i: 'enterpriseCapitalRegistration', x: 0, y: 400/50, w: 6, h: 400/50,static: false},
			{i: 'enterpriseRegistrationTime', x: 6, y: 400/50, w: 6, h: 400/50,static: false},


			{i: 'radarMap', x: 0, y: 400/50*2, w: 6, h: 400/50, static: false},
			{i: 'density', x: 6, y: 400/50*2, w: 6, h: 400/50, static: false},

			// {i: 'industry', x: 0, y: 400/50*3, w: 12, h: 400/50, static: false},
			// {i: 'changeTrend', x: 0, y: 400/50*3, w: 12, h: 400/50,  static: false},
			{i: 'enterpriseQquantity', x: 0, y: 400/50*4, w: 12, h: 400/50, static: false}

		];
		let layout6 = [

			{i: 'totalInBattalion', x: 0, y: 0, w: 6, h: 400/50,  static: false},
			{i: 'latestChangeStat', x: 6, y: 0, w: 6, h: 400/50,  static: false},

			{i: 'enterpriseCapitalRegistration', x: 0, y: 400/50, w: 6, h: 400/50,static: false},
			// {i: 'enterpriseRegistrationTime', x: 6, y: 400/50, w: 6, h: 400/50,static: false},


			{i: 'radarMap', x: 0, y: 400/50*2, w: 6, h: 400/50, static: false},
			{i: 'density', x: 6, y: 400/50*2, w: 6, h: 400/50, static: false},

			// {i: 'industry', x: 0, y: 400/50*3, w: 6, h: 400/50, static: false},
			// {i: 'changeTrend', x: 0, y: 400/50*3, w: 6, h: 400/50,  static: false},
			// {i: 'enterpriseQquantity', x: 0, y: 400/50*4, w: 6, h: 400/50, static: false}

		];


		if(!this.getUIState()) this.setUIState({lg: layout12, md: layout12, sm: layout12, xs: layout6, xxs: layout6});

		this.state = {
			// layout: layout12,
			layouts: this.getUIState()
		};

		this.timer = null;

		this.onLayoutChange = this.onLayoutChange.bind(this);
		this.intervalTime = this.intervalTime.bind(this);

    }

	getUIState(){
		return JSON.parse(localStorage.getItem('uiState'));
	}
	setUIState(layouts){
		localStorage.setItem('uiState', JSON.stringify(layouts));
	}

	//布局数据变化后的回调函数，将变化后的数据本地存储，并更新视图
	onLayoutChange(layout, layouts){
		// console.log(layout);
		this.setUIState(layouts);
		this.setState({ layout, layouts });
	}

	componentWillReceiveProps(){

	}
	//饼图定时器
	intervalTime(echarts_instance){


		let {EnterpriseRegistrationTimerNum} = this.props.callback;

		if(!EnterpriseRegistrationTimerNum) return;

		// if(!EnterpriseRegistrationTimerNum) EnterpriseRegistrationTimerNum=0;

		let count = 0;
	    let app = {};

		clearInterval(this.timer)
	    this.timer = app.timeTicket = setInterval(function () {
	      echarts_instance.dispatchAction({
	        type: 'downplay',
	        seriesIndex: 0
	      });
	      echarts_instance.dispatchAction({
	        type: 'highlight',
	        seriesIndex: 0,
	        dataIndex: (count++) % EnterpriseRegistrationTimerNum
	      });
	    }, 1000);
	}

	componentDidMount(){

	}

    render(){


		let {onLayoutChange,intervalTime} = this;

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
				// layout={layout}
				layouts={layouts}
				breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
				cols={{lg: 12, md: 12, sm: 12, xs: 6, xxs: 6}}
				// autoSize={true}
				rowHeight={50}
				width={1200}
				draggableCancel={`.echarts-react`}
				// onBreakpointChange={layout=>console.log(layout)}
				onLayoutChange={onLayoutChange}
			>

				{/* 整体概览 */}
				<div
					key={'latestChangeStat'}
					className="gridBlock"
				>
					<div className="cont-head">
						<span></span>
						<div className="cont">
							<span></span>
							<h2>整体概览</h2>
						</div>
					</div>
					<div className="echarts-react">
						<ReactEcharts
							option={latestChangeOption}
							{...{
								style: {
									position: 'absolute',
									top: 52,
									left: 0,
									right: 0,
									bottom: -30
								}
							}}
						/>
					</div>

				</div>

				{/* 在营企业or个体总数 */}
				{/* <div
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

				</div> */}


				{/* 企业注册资本 */}
				<div
					key={'enterpriseCapitalRegistration'}
					className="gridBlock"
				>
					<div className="cont-head">
						<span></span>
						<div className="cont">
							<span></span>
							<h2>企业注册资本</h2>
						</div>
					</div>

					<div className="echarts-react">
						<ReactEcharts
							option={enterpriseCapitalRegistrationOption}
							// option={regcapOption}
							whenCanGetInsCallback={intervalTime}

							ref={(e) => { this.echarts_react = e }}
							{...{

							}}
						/>
					</div>

				</div>

				{/* 企业注册时间查询总量 */}
				<div
					key={'enterpriseRegistrationTime'}
					className="gridBlock"

				>

					<div className="cont-head">
						<span></span>
						<div className="cont">
							<span></span>
							<h2>按企业注册时间查询总量</h2>
						</div>
					</div>
					<div className="echarts_react">
						<ReactEcharts
							option={enterpriseRegistrationTimeOption}

							// option={esdateOption}


							{...{

							}}
						/>
					</div>


				</div>

				{/* 变更趋势 折线图 */}
				{/* <div
					key={'changeTrend'}
					className="gridBlock"
					>
					<div className="cont-head">
						<span></span>
						<div className="cont">
					<span></span>
					<h2>变更趋势</h2>
						</div>
					</div>
					<div className="echarts-react">
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
					</div>

				</div> */}

				{/* 指标概要, 雷达图 */}
				<div
					key={'radarMap'}
					className="gridBlock"
				>
					<div className="cont-head">
						<span></span>
						<div className="cont">
							<span></span>
							<h2>指标概要</h2>
						</div>
					</div>

					<div className="echarts-react">
						<ReactEcharts
							option={radarMapOption}

						/>
					</div>

				</div>

				{/* 密度地图 */}
				<div
					key={'density'}
					className="gridBlock"
					// style={{paddingBottom: 50}}
				>
					<div className="cont-head clearfix">
						<span></span>
						<div className="cont">
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

					</div>

					<div className="echarts-react">
						<ReactEcharts
							option={densityOption}
							loadingOption={{

							}}
							{...{}}
						/>
					</div>


				</div>

				{/* 行业统计总览 */}
				{/* <div
					key={'industry'}
					className="gridBlock"
					>
					<div className="cont-head">
						<span></span>
						<div className="cont">
					<span></span>
					<h2>行业统计总览</h2>
						</div>
					</div>
					<div className="echarts-react">

						{
					industryOption?
					(<ReactHighcharts
					config={ industryOption }
					domProps={{
					style: {
					position: 'absolute',
					left: 0,
					right: 0,
					top: 52,
					bottom: 10
					}
					}}
					/>) :
					(<ReactLoading
					type={'cubes'}
					color={'#14A480'}
					height="100"
					width="100"
					style={{
					width: '50px',
					height: '50px',

					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					fill: '#14A480',
					margin: 'auto',
					}}
					/>)

						}
					</div>


				</div>*/}

				{/* 按行业分类企业数量 */}
				<div
					key={'totalInBattalion'}
					className="gridBlock"
				>

					<div className="cont-head">
						<span></span>
						<div className="cont">
							<span></span>
							<h2>按行业分类企业数量TOP10</h2>
						</div>
					</div>
					<div className="echarts-react">
						<ReactEcharts
							// option={industryphyOption}
							option={enterpriseQquantityOption}
							{...{

							}}
						/>
					</div>


				</div>


			</ResponsiveReactGridLayout>
        )
    }
}
