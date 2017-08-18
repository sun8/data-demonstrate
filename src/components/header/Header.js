export default class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){

        let {
            totaInUKEnterprises
        } = this.props.chartOptions;
// console.log(totaInUKEnterprises);
        return(
            <div className="row">
              <div className="col-md-3">
                <div className="widget-thumb">
                  <h4>在营企业总数</h4>
                  <div className="widget-thumb-wrap">
                    <i className="bg-green icon-bulb"></i>
                    <div className="widget-thumb-body">
                      <span className="widget-thumb-subtitle"></span>
                      <span className="widget-thumb-body-stat">{totaInUKEnterprises?totaInUKEnterprises.ent:null}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="widget-thumb">
                  <h4>在营个体总数</h4>
                  <div className="widget-thumb-wrap">
                    <i className="bg-red icon-layers"></i>
                    <div className="widget-thumb-body">
                      <span className="widget-thumb-subtitle"></span>
                      <span className="widget-thumb-body-stat">{totaInUKEnterprises?totaInUKEnterprises.ind:null}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="widget-thumb">
                  <h4>统一社会信用代码</h4>
                  <div className="widget-thumb-wrap">
                    <i className="bg-purple icon-screen-desktop"></i>
                    <div className="widget-thumb-body">
                      <span className="widget-thumb-subtitle"></span>
                      <span className="widget-thumb-body-stat">{totaInUKEnterprises?totaInUKEnterprises.code:null}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 padding0">
                <div className="widget-thumb">
                  <h4>今年成立企业数</h4>
                  <div className="widget-thumb-wrap">
                    <i className="bg-blue icon-chart"></i>
                    <div className="widget-thumb-body">
                      <span className="widget-thumb-subtitle"></span>
                      <span className="widget-thumb-body-stat">{totaInUKEnterprises?totaInUKEnterprises.entYear:null}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


        )
    }
}
