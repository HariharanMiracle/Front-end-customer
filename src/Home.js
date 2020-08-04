import React,{Component, useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

class Home extends Component {	
	constructor(){
		super();
		
		this.state = {
			data: [],
			show: false,
			customerName: "",
			customerSuccShow: false,
			customerFailShow: false,
			customerSuccMessage: "",
			customerFailMessage: "",
			timeDelay: 850,
			customerNumber: 1
		}

		this.addCustomer = this.addCustomer.bind(this);
		this.addCustomerClose = this.addCustomerClose.bind(this);
		this.customerImageSelecter = this.customerImageSelecter.bind(this);
		this.saveCustomer = this.saveCustomer.bind(this);
		this.deleteCustomer = this.deleteCustomer.bind(this);
	}
	componentDidMount(){
		const axios = require('axios');
		axios.get('http://localhost:9900/api/customer')
		.then(e => {
			this.setState({
				data: e.data
			})
		})		
	}

	addCustomer(){
		this.setState({
			show: true
		})
	}
	addCustomerClose(){
		this.setState({
			show: false
		})
	}
	setCustomerName = e =>{
		this.setState({
			customerName: e.target.value
		})
	}
	customerImageSelecter = event =>{
		console.log("customerImageSelecter");
		console.log("########### 1 ###########");
		console.log(event.target.files[0]);
		console.log("########### 2 ###########");
		console.log(document.getElementById('customerPicture').files[0])
		console.log("customerImageSelecter");
	}
	saveCustomer(){
		console.log("saveCustomer");
		
		const formData = new FormData();
		formData.append('customerName', this.state.customerName);
		formData.append('customerPicture', document.getElementById('customerPicture').files[0]);
        fetch('http://localhost:9900/api/customer', {
            method: 'post',
            body: formData
		}).then(res => {
            if(res.ok) {
                console.log("succesfully uploaded...")
				this.setState({ customerSuccShow: true, customerSuccMessage: "Success: Customer creation!" })
				setTimeout(() => window.location.reload(), this.state.timeDelay);
			}
			else{
				console.log("Picture not uploaded...")
				this.setState({ customerFailShow: true, customerFailMessage: "Failed: Customer creation!" })
				setTimeout(() => window.location.reload(), this.state.timeDelay);
			}
        });

		console.log("saveCustomerEnd");
	}
	deleteCustomer(customerId){
		console.log("deleteCustomer: " + customerId);

		axios.delete(`http://localhost:9900/api/customer/`+customerId)
		.then(res => {
			const customer = res.data;
			console.log("customer data: " + customer);
			this.setState({ customerSuccShow: true, customerSuccMessage: "Success: Customer deletion!" })
			setTimeout(() => window.location.reload(), this.state.timeDelay);
		})

		console.log("deleteCustomerEnd");
	}

	render(){
		const customerHeader = {
			height: '50px'
		};
		return (
			<div className="container-fluid">
				<h1 className="mt-4">Home</h1>
				<div className="p-4 row" style={customerHeader}>
					<div className="col-12 bg-dark text-center">
						<h2 className="mt-1 text-white">Customer Details</h2>
					</div>
				</div>
				<br/>
				<div>
					<button className="btn btn-secondary mt-4" onClick={this.addCustomer}>Add Customer</button>
					<div className="row">
						{
							this.state.data.map(e => 
								<div className="col-4 p-4">
									<p><b>#{this.state.customerNumber++}</b></p>
									<p><b>Customer Id:</b> {e.customerId}</p>
									<p><b>Customer Name:</b> {e.customerName}</p>
									<img src={'/uploads/customer/' + e.customerPicture} height="150px" width="150px"/>
									<div className="row">
										<div className="mt-2 col-12">
											<button className="btn btn-info">Edit Customer</button>
											<button className="btn btn-danger ml-2" onClick={() => this.deleteCustomer(e.customerId)}>Delete Customer</button>
										</div>
									</div>
								</div>
							)							
						}
					</div>
				</div>

				<Modal show={this.state.show} onHide={this.addCustomer}>
					<Modal.Header closeButton>
					<Modal.Title>Add Cutomer</Modal.Title>
					</Modal.Header>
					<Modal.Body>

					<form>
						<label>Customer name: </label>{" "}
						<input
						id="customerName"
						type="text"
						onChange={this.setCustomerName}
						value={this.state.customerName}
						/>
						<br />
						<label>Customer image: </label>{" "}
						<input
						id="customerPicture"
						type="file"
						onChange={this.customerImageSelecter}
						value={this.state.customerImageSelecter}
						/>
						<br />
						<input Class="btn btn-success" value="Save Customer" onClick={this.saveCustomer}/>
					</form>

					</Modal.Body>
					<Modal.Footer>
					<Button variant="secondary" onClick={this.addCustomerClose}>
						Close
					</Button>
					</Modal.Footer>
				</Modal>

				<Modal
					size="sm"
					show={this.state.customerSuccShow}
					onHide={() => this.setState({ customerSuccShow: false })}
					aria-labelledby="example-modal-sizes-title-sm"
				>
					<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-sm" className="text-success">
						{this.state.customerSuccMessage}
					</Modal.Title>
					</Modal.Header>
					<Modal.Body className="text-center">
						<img src={'tick.JPG'} height="200px" width="200px"/>
					</Modal.Body>
				</Modal>

				<Modal
					size="sm"
					show={this.state.customerFailShow}
					onHide={() => this.setState({ customerFailShow: false })}
					aria-labelledby="example-modal-sizes-title-sm"
				>
					<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-sm" className="text-danger text-center">
						{this.state.customerFailMessage}
					</Modal.Title>
					</Modal.Header>
					<Modal.Body className="text-center">
						<img src={'cross.JPG'} height="200px" width="200px"/>
					</Modal.Body>
				</Modal>
			</div>
		)
	}
}

export default Home;