// 时间控件

// import BS from 'react-bootstrap';
var BS = require('react-bootstrap');
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';

//数据
let ranges = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
}


export default class DateWidget extends Component{

    constructor(props){
        super(props);

        this.state = {
            ranges:ranges,
            startDate: moment().subtract(29, 'days'),
			endDate: moment()
        }

        this.handleEvent = this.handleEvent.bind(this);
    }


    handleEvent(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        });
    }

    render(){
        let start = this.state.startDate.format('YYYY-MM-DD');
		let end = this.state.endDate.format('YYYY-MM-DD');
		let label = start + ' - ' + end;
		if (start === end) {
			label = start;
		}
		return (
			<BS.Grid>
				<BS.Row>
					<BS.Col md={3}>
						<DateRangePicker
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            ranges={this.state.ranges}
                            onEvent={this.handleEvent}>
							<BS.Button
                                className="selected-date-range-btn"
                                style={{width:'100%'}}>
								<div className="pull-left">
                                    <BS.Glyphicon glyph="calendar" />
                                </div>
								<div className="pull-right">
									<span>
										{label}
									</span>
									<span className="caret"></span>
								</div>
							</BS.Button>
						</DateRangePicker>
					</BS.Col>
				</BS.Row>
			</BS.Grid>
		);
    }
}
