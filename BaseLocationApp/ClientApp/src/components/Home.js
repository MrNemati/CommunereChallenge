import React, { Component } from 'react';
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import Overlay from 'pigeon-overlay'
import Popup from "reactjs-popup";
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import { Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setTimeout } from 'timers';
import { MessageModal } from './MessageModal'
import { LinkContainer } from 'react-router-bootstrap';

const styles = {
    display: "block",
    width: "400px",
    padding: "20px",
    textalign: "center"
}

export class Home extends Component {

    constructor() {
        super();
        this.state = {
            LocationList: [],
            open: false,
            message: '',
            status: false,
        };
      
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
            });
    }
    onOpenModal = (value) => {
        this.setState({ open: true, message:value });
    };

    onCloseModal = () => {
        this.setState({ open: false, message:'' });
    };
     
   

    render() {
        const { open } = this.state;
        const { message } = this.state;

        return (
            <div ref="div1">

                <h1 className="text-center" >Important Loacation on Map</h1>
               
                <hr />
                <Row>
                    <Col lg={4} >

                        <div>
                            <Formik
                                initialValues={{ lat: "", lng: "", Description: "" }}
                                onSubmit={(values, { setSubmitting }) => {
                                    //console.log(values)
                                    fetch(`/api/Location/AddLocation?model=${JSON.stringify(values)}`, { method: 'Post' })
                                    this.setState({ status: true })
                                    setTimeout(() => {
                                        setSubmitting(false)
                                        this.setState({ status: false })
                                    }, 4000);
                                    values.lat = "";
                                    values.lng = "";
                                    values.Description = "";
                                }}
                                validationSchema={Yup.object().shape({
                                    lat: Yup.string().required("Latitude value is Required!"),
                                    lng: Yup.string().required("Longitude value is Required!"),
                                    Description: Yup.string().required("Description is Required!"),
                                })}
                            >
                                {props => {
                                    const {
                                        values,
                                        touched,
                                        errors,
                                        isSubmitting,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit
                                    } = props;
                                    return (
                                       
                                        <div className="ShadowOut">
                                            {
                                                this.state.status
                                                    ? <div onLoad={this.GetLocationList()} />
                                                    : null
                                            }
                                            {this.state.status
                                                ? < MessageModal Header="Message:" Message="Your Location Saved" />
                                                : null
                                            }
                                            <form id="form1" className={this.state.status ? 'hidden' : 'FormSubmit'} onSubmit={handleSubmit}>
                                                <h3 className="text-center pt-2">Add Location</h3>
                                                <hr />
                                                <div className="form-Group">
                                                    <label>Latitude</label>
                                                    <input
                                                        id="lat"
                                                        placeholder="Enter Latitude of a place (ex: 52.0)"
                                                        type="text"
                                                        value={values.lat}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={errors.lat && touched.lat
                                                            ? "form-control error"
                                                            : "form-control"
                                                        }
                                                    />
                                                    {errors.lat && touched.lat && (<div className="input-feedback">{errors.lat}</div>)}
                                                </div>
                                                <div className="form-Group">
                                                    <label>Longitude</label>
                                                    <input
                                                        id="lng"
                                                        placeholder="Enter Longitude of a place (ex:0.5)"
                                                        type="text"
                                                        value={values.lng}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={errors.lng && touched.lng
                                                            ? "form-control error"
                                                            : "form-control"
                                                        }
                                                    />
                                                    {errors.lng && touched.lng && (<div className="input-feedback">{errors.lng}</div>)}
                                                </div>
                                                <div className="form-Group">
                                                    <label>Description</label>
                                                    <input
                                                        id="Description"
                                                        placeholder="Enter Description "
                                                        type="text"
                                                        value={values.Description}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={errors.Description && touched.Description
                                                            ? "form-control error"
                                                            : "form-control"
                                                        }
                                                    />
                                                    {errors.Description && touched.Description && (<div className="input-feedback">{errors.Description}</div>)}
                                                </div>
                                                <div className="form-Group mt-1">
                                                    <button type="submit"
                                                        disabled={isSubmitting}
                                                        className="btn btn-primary btn-block"> Submit </button>
                                                </div>
                                            </form>
                                        </div>
                                    )
                                }}
                            </Formik>
                        </div>
                    </Col>
                    
                    <Col className="text-center" lg={7}>
                        <Modal closeIconSize={16} open={open} onClose={this.onCloseModal} center>
                            <h5>Description:</h5>
                            <h2 style={styles}>{message}</h2>
                        </Modal>
                        <Map center={[52, .5]} zoom={8} width={600} height={450} metaWheelZoom zoomSnap >
                            {this.state.LocationList.map(item =>
                                <Marker anchor={[item.lat * 1, item.lng * 1]} payload={1}
                                    onClick={() => this.onOpenModal(item.description)} />
                            )}
                        </Map>
                    </Col>
                </Row>
                <div className="text-center">
                    <hr />
                    <label>Test site - 2020</label>
                </div>

            </div>
        );
    }
}
