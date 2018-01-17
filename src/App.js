import React, {Component} from 'react';
import {Grid, Col, Navbar, Jumbotron} from 'react-bootstrap';
import DataList from "./components/DataList";

export default class App extends Component {
    render() {
        return (
            <div>
                <Navbar inverse fixedTop>
                    <Grid>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="/">React CRUD App</a>
                            </Navbar.Brand>
                            <Navbar.Toggle/>
                        </Navbar.Header>
                    </Grid>
                </Navbar>
                <Jumbotron>
                    <Grid>
                        <Col style={{marginTop: '50px'}}>
                            <DataList/>
                        </Col>
                    </Grid>
                </Jumbotron>
            </div>
        );
    }
}