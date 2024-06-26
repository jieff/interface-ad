import React from "react";
import PropTypes from "prop-types";
// reactstrap components
import {
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";

function ShowFunctionsDescriptionsModal({ handleShowFunctionsDescriptionsModal, functionsDescriptionsModalOpen, employeeFunctionDescription, employeeFunctionName }) {

  return (
    <Modal
      toggle={handleShowFunctionsDescriptionsModal}
      isOpen={functionsDescriptionsModalOpen}
      size="md"
    //fullscreen
    >
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Descrição de {employeeFunctionName}
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={handleShowFunctionsDescriptionsModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <Row>
          <div className="col">
            <div className="card-wrapper">
              <div className="form-row">
                <Col className="mb-3" md="12">
                  <div>
                    <span className="name mb-0 text-sm">
                      {employeeFunctionDescription}
                    </span>
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </Row>
      </ModalBody>
      <ModalFooter />
    </Modal >
  );
}

ShowFunctionsDescriptionsModal.defaultProps = {
  handleShowFunctionsDescriptionsModal: () => { },
  functionsDescriptionsModalOpen: false,
  employeeFunctionDescription: "",
  employeeFunctionName: "",
};

ShowFunctionsDescriptionsModal.propTypes = {
  handleShowFunctionsDescriptionsModal: PropTypes.func,
  functionsDescriptionsModalOpen: PropTypes.bool,
  employeeFunctionDescription: PropTypes.string,
  employeeFunctionName: PropTypes.string,
};

export default ShowFunctionsDescriptionsModal;