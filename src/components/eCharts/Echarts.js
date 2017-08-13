import ReactEcharts from 'echarts-for-react';
//ReactEcharts 公用组件封装
export default function FnEcharts(props){
    return (
        <ReactEcharts
			{...{
				style: {
					height: '100%' ,
					width: '100%'
				}
			}}
			{...props}

		/>
    )
}
