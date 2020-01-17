import React, { Component } from 'react';
import { Table, Button, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class LocationList extends Component {
    constructor() {
        super();
        this.state = { LocationList: [] };
        this.GetLocationList();

    }
    
    GetLocationList() {
        fetch('api/Location/LocationList')
            .then(res => res.json())
            .then(x => {
                if (this.refs.div1) {
                    console.log(JSON.stringify(x));
                    this.setState({ LocationList: x });
                }
               
                // this.forceUpdate(); 
            });
    }

    render() {

        return (
            <div className=''>
                <div ref="div1">
                    <Col xs={7} sm={10}>
                        <h4>Location List:</h4>
                    </Col>
                 
                </div>

                <Table hover>
                    <thead>
                        <tr>
                            <th>lat</th>
                            <th>lng</th>
                            <th>Description</th>
                            <th>Edite</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.LocationList.map(item =>
                            <tr key={item.id}>
                                <td>{item.lat}</td>
                                <td>{item.lng}</td>
                                <td>{item.description}</td>

                                
                                <td className='col-xs-1'>
                                    <Button variant="outline-primary" >
                                     Edit Location 
                                    </Button>
                                </td>
                                <td className='col-xs-1'>
                                    <LinkContainer to={`/Location/${item.Id}`} >
                                        <Button variant="outline-danger">
                                         Delete Location
                                        </Button>
                                    </LinkContainer>
                                </td>
                             
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}
