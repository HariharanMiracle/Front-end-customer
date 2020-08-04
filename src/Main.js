import React,{Component} from 'react';
import {  BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './Home.js';
import AboutUs from './AboutUs.js';
import ContactUs from './ContactUs.js';
import Footer from './Footer.js';

class Main extends Component{
    render(){
        return(
			<Router>
				<div>
					<Navbar bg="dark" expand="lg" variant="dark">
						<Navbar.Brand>Customer</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link> <Link to="/" className="Header-Link">Home</Link> </Nav.Link>
							<Nav.Link> <Link to="/about" className="Header-Link">Datatable 1</Link> </Nav.Link>
							<Nav.Link> <Link to="/contact" className="Header-Link">Datatable 2</Link> </Nav.Link>
						</Nav>
						</Navbar.Collapse>
					</Navbar>

					<Switch>
						<Route path="/about">
							<AboutUs />
						</Route>
						<Route path="/contact">
							<ContactUs />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>

					<Footer/>						
				</div>
			</Router>
        )
    }
}

export default Main;