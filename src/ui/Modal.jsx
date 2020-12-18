import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { Button } from "./Button";

export function Modal({ title, onClose, children }) {
  return createPortal(<>
    <div className="modal fade show" role='dialog' style={{display: 'block'}}>
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <Button className='close' aria-label='Close' onClick={onClose}>
                        <span aria-hidden='true'>x</span>
                    </Button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    </div>
    <div className="modal-backdrop fade show"></div>
  </>, document.body);
}

Modal.propType = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
