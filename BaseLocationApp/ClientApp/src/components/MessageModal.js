import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export class MessageModal extends Component {
    state = {
        visible: true,
    }
    handleClose = () => {
        this.setState({ visible: false })
    }
    render() {
        return (
            <div>
                {this.state.visible ?
                    <div className="text-center pt-10">
                        <div className="static-modal" >
                            <Modal.Dialog>
                                <Modal.Header>
                                    <Modal.Title>{this.props.Header}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h4>  {this.props.Message}</h4>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button block onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

