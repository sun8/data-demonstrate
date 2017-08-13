import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ReactHighcharts = require('react-highcharts');
// 引入地图数据
import 'common/data/china';


// 引入echarts组件
import ReactEcharts from 'eCharts/Echarts';

// 引入测试数据

// import {changeTrendData} from 'common/util/staticData';

// end 引入测试数据

//响应式布局拖拽样式组件
export default class ReactGridLayout extends Component{
	constructor(props){
        super(props);
		//数据初始化参数
		let layout = [
			{i: 'latestChangeStat', x: 0, y: 0, w: 6, h: 1, static: false},
			{i: 'changeTrend', x: 0, y: 1, w: 12, h: 1, static: true},
			{i: 'radarMap', x: 6, y: 0, w: 6, h: 1},
			{i: 'density', x: 0, y: 0, w: 12, h: 2},
			{i: 'industry', x: 0, y: 0, w: 12, h: 2}
		];

		this.state = {
			layout: layout,
			layouts: {lg: layout}
		};

		this.onLayoutChange = this.onLayoutChange.bind(this);
    }


	onLayoutChange(layout, layouts){
		// console.log(layout);
		this.setState({ layout, layouts });
	}


    render(){


		let {onLayoutChange} = this;

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


		} = this.props.chartOptions;


		let {
			getMonitorDensity,
			getChangeDensity,
			getRiskDensity
		} = this.props.callback;


        return (
			<ResponsiveReactGridLayout
				className="layout"
				layout={layout}
				layouts={layouts}
				breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
				cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}

				rowHeight={400}
				width={1200}

				// onBreakpointChange={layout=>console.log(layout)}
				onLayoutChange={onLayoutChange}
			>
				{/* 指标概要 */}

				<div
					key={'latestChangeStat'}
					className="gridBlock"
				>
					<div className="cont-head clearfix">
                        <span></span>
                        <h2>指标概要</h2>

                    </div>
					{
						latestChangeOption ? (
							<ReactEcharts
								option={latestChangeOption}
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
					{/* <div className="cont-head clearfix">
						<span></span>
						<h2>变更趋势</h2>

					</div> */}

					{
						changeLineOption ? (
							<ReactEcharts
								option={changeLineOption}
								{...{
									style: {
										float: 'left',
										height: '100%' ,
										width: 600
									}
								}}
								onEvents={ {
									click: ev=>{
										ev.stopPropagation();
										ev.preventDefault();
									},
									datazoom: ev=>{
										// ev.stopPropagation();
										// ev.preventDefault();
										console.log(ev);
										console.log(88);
									}
								} }
							/>
						) : null
					}

					{
						changeRectOption ? (
							<ReactEcharts
								option={changeRectOption}
								{...{
									style: {
										float: 'left',
										height: '100%' ,
										'marginLeft': '40px',
										width: 600
									}
								}}
								// onEvents={}
								onEvents={ {
									click: ev=>{
										ev.stopPropagation();
										ev.preventDefault();
									},
									datazoom: ev=>{
										// ev.stopPropagation();
										// ev.preventDefault();
										// console.log(ev);
										console.log(88);
									}
								} }
							/>
						) : null

					}

				</div>
				{/* 指标概要, 雷达图 */}
				<div
					key={'radarMap'}
					className="gridBlock"
				>
					<div className="cont-head clearfix">
						<span></span>
						<h2>指标概要</h2>

					</div>

					{
						radarMapOption ? (
							<ReactEcharts
								option={radarMapOption}
								// onEvents={}
								onEvents={ {
									click: ev=>{
										ev.stopPropagation();
										ev.preventDefault();
									},
									datazoom: ev=>{
										// ev.stopPropagation();
										// ev.preventDefault();
										// console.log(ev);
										console.log(88);
									}
								} }
							/>
						) : null

					}


				</div>
				{/* 密度地图 */}
				<div
					key={'density'}
					className="gridBlock"
					style={{paddingBottom: 50}}
				>
					<div className="cont-head clearfix">
                        <span></span>
                        <h2>变更趋势</h2>
                        <ul className="cont-head-nav clearfix">
                            <li
								className="active"
								onClick={getMonitorDensity}
							>监控密度</li>
                            <li
								onClick = {getChangeDensity}
							>变更密度</li>
                            <li
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
							/>
						) : null

					}


				</div>

				{/* 行业统计 */}
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
							/>
						) : null

					}


				</div>


			</ResponsiveReactGridLayout>
        )
    }
}
