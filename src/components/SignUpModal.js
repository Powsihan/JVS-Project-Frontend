import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import TextField from "./TextField";


function SignUpModal(props) {
    const { show, onHide } = props;

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static" size="md">
            <Modal.Header closeButton>
                <Modal.Title className="Modal-Title">Sign in to Account</Modal.Title>
                {/* <div>
                    <h6 style={{ display: 'block' }}>Enter Your Email & Password to login</h6>
                </div> */}
            </Modal.Header>
            <Modal.Body>
                <>

                    <TextField label={"Email Address"} placeholder={"abc@gmail.com"} />
                    <TextField label={"Password"} placeholder={"............"} />
                    <label> <input type="checkbox" /> </label> <label>Remember Password</label>
                    <label style={{ display: 'block', textAlign: 'right' , padding: '10px'  }}>Forget Password?</label>
                    <button className='btn btn-primary' style={{ width: '100%' , padding: '10px'}} onClick={() => Signin()}>Sign in</button>
                   
                    
                    <label style={{ display: 'block', textAlign: 'center', padding: '15px' }}>Don't have an account? Create one.</label>
                </>
            </Modal.Body>

            {/* <Modal.Footer>
        <Button variant="secondary"  onClick={onHide}>
          Close
        </Button>
      </Modal.Footer> */}
        </Modal>
    );
}

export default SignUpModal;