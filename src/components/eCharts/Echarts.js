import ReactEcharts from 'echarts-for-react';

//ReactEcharts 公用组件封装

export default class Echarts extends Component{
    constructor(props){
        super(props);
        this.getEchartsInstance = this.getEchartsInstance.bind(this);
    }

    getEchartsInstance(){
        return this.refs.ins.getEchartsInstance();
    }

	componentDidMount(){
		let {whenCanGetInsCallback} = this.props;
		whenCanGetInsCallback && whenCanGetInsCallback(this.getEchartsInstance());
	}

    render(){
        let props = this.props;
        return (
            <ReactEcharts
                {...{
                    style: {
						position: 'absolute',
						top: '52px',
						left: 0,
						bottom: '20px',
						right: 0
                    }
                }}
                {...props}
                ref="ins"
            />
        )
    }
}
