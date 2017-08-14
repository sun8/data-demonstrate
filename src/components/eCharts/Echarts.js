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

    render(){
        let props = this.props;
        return (
            <ReactEcharts
                {...{
                    style: {
                        height: '100%' ,
                        width: '100%'
                    }
                }}
                {...props}
                ref="ins"
            />
        )
    }
}
