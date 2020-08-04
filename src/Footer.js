import React,{Component} from 'react';

class Footer extends Component{
	render(){
		const footerStyle = {
			height: '46px'
		};
		return (
			<div className="bg-dark" style={footerStyle}>
				<div className="row">
					<div className="col-12 text-center mt-2">
						<p className="text-white">Copyright &copy; 2020 Dark-Devil-Dev Sri Lanka. All right reserved</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Footer;