import ReactEcharts from 'echarts-for-react';
import ReactLoading from 'react-loading';
//ReactEcharts 公用组件封装

export default class Echarts extends Component{
    constructor(props){
        super(props);
		this.state={
			showLoading: true
		}
        this.getEchartsInstance = this.getEchartsInstance.bind(this);
        this.onChartReady = this.onChartReady.bind(this);
    }

    getEchartsInstance(){
        return this.refs.ins.getEchartsInstance();
    }

	onChartReady(){
		setTimeout(f => this.setState({showLoading: false}), 2000)

	}

    componentWillReceiveProps(){
        let {whenCanGetInsCallback, option} = this.props;
        if(!option) return;
        whenCanGetInsCallback && whenCanGetInsCallback(this.getEchartsInstance());
    }

	componentDidMount(){
		let {whenCanGetInsCallback, option} = this.props;
		if(!option) return;
		whenCanGetInsCallback && whenCanGetInsCallback(this.getEchartsInstance());
	}

    render(){
        let props = this.props;

		return props.option ?
		(
			<ReactEcharts
                {...{
                    style: {
						position: 'absolute',
						top: '52px',
						left: 0,
						bottom: '20px',
						right: 0
                    },
					showLoading: this.state.showLoading,
					onChartReady: this.onChartReady,
                    // whenCanGetInsCallback: this.props.whenCanGetInsCallback,
					onEvents: {
						onmouseover: ev=>{
							console.log(ev);
						}
					}
                }}
                {...props}
				ref="ins"
			/>
		) : (
			<ReactLoading
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
			/>
		)


	}
}
