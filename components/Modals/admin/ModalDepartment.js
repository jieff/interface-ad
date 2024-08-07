// ModalComponent.js
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  FormGroup,
  Form,
  Input,
  Modal,
  ModalBody,
  Row,
  Table,
  ModalFooter
} from "reactstrap";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
// react plugin used to create DropdownMenu for selecting items
const Select2 = dynamic(() => import("react-select2-wrapper"));
// react plugin used to create datetimepicker
import ReactDatetime from "react-datetime";
import InputMask from 'react-input-mask';
import useCreateCustomerAccountHolder from '../../../hooks/RecordsHooks/customer/useCreateCustomerAccountHolder';
import { useFindAllClientCompany } from '../../../hooks/RecordsHooks/customer/useFindAllClientCompany';
import { employmentContractDataSearchAndProcess } from '../../../util/employmentContractDataSearchAndProcess';
import { handleSelectionEmploymentContractData } from '../../../util/handleSelectionEmploymentContractData';
import { ContactPersonContext } from "../../../contexts/RecordsContext/ContactPersonContext";
import { useFindContactPerson } from "../../../hooks/RecordsHooks/contactPerson/useFindContactPerson";
import { useFindDepartment } from "../../../hooks/RecordsHooks/department/useFindDepartment";
import { DepartmentContext } from "../../../contexts/RecordsContext/DepartmentContext";
import useCreateDepartment from "../../../hooks/RecordsHooks/department/useCreateDepartment";
import { useFindAllDepartments } from "../../../hooks/RecordsHooks/department/useFindAllDepartments";
import useUpdateDepartment from "../../../hooks/RecordsHooks/department/useUpdateDepartment";

function ModalDepartment({ handleOpenDepartmentUpdateModal, modalOpen }) {

  const {
    departmentIdToUpdate,
    handleDepartmentIdStatusCleanupToUpdate,
    handleDepartmentIdToUpdate,
    hasNewDepartmentRecordCreated,
    handleCreatedDepartmentRecordStatusChange,
    hasUpdatedDepartmentRecord,
    handleUpdatedDepartmentRecordStatusChange,
    hasDeletedDepartmentRecord,
    handleDeletedDepartmentRecordStatusChange,
  } = useContext(DepartmentContext);

  const {
    departmentName,
    setDepartmentName,
    departmentNameState,
    setDepartmentNameState,
    departmentDataList,
    setDepartmentDataList,
    departmentReportsToDepartment,
    setDepartmentReportsToDepartment,
    departmentReportsToDepartmentState,
    setDepartmentReportsToDepartmentState,
    departmentDescription,
    setDepartmentDescription,
    departmentDescriptionState,
    setDepartmentDescriptionState,
    departmentStatus,
    setDepartmentStatus,
    departmentStatusState,
    setDepartmentStatusState,
    handleDepartmentDataList,
    reset
  } = useCreateDepartment();

  const { handleValidateUpdateDepartmentForm } = useUpdateDepartment();

  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    if (departmentDataList.length <= 0) {
      employmentContractDataSearchAndProcess(useFindAllDepartments, handleDepartmentDataList, 'department', 'EmployeeUserRegister');
    }
  }, [departmentDataList]);

  const handleCloseDepartmentUpdateModal = () => {
    handleOpenDepartmentUpdateModal();
    reset();
    setSelectedDepartment('');
    setDepartmentReportsToDepartment('');
    setDepartmentReportsToDepartmentState(null);
    handleCleanDetailedDepartmentDataUpdate();
    handleDepartmentIdStatusCleanupToUpdate();
    setDepartmentDataList([]);
  };

  const [detailedDepartmentDataUpdate, setDetailedDepartmentDataUpdate] = useState([]);
  function handleCleanDetailedDepartmentDataUpdate() {
    setDetailedDepartmentDataUpdate([]);
  };

  function handleUpdateDepartment() {
    let departmentReportsToDepartmentId = null;

    if (!isDepartmentInputTouched) {

      const department = departmentDataList.find(
        (dept) => dept.text === departmentReportsToDepartment
      );
      departmentReportsToDepartmentId = department ? department.id : null;
    } else {
      departmentReportsToDepartmentId = departmentReportsToDepartment;
    }
    handleValidateUpdateDepartmentForm(
      handleCloseDepartmentUpdateModal,
      departmentIdToUpdate,
      departmentName,
      departmentReportsToDepartmentId,
      departmentDescription,
      departmentStatus,
      handleDepartmentIdToUpdate,
      handleCleanDetailedDepartmentDataUpdate
    );
  }

  const handleSelectionDepartmentToReports = (departmentId) => {
    if (departmentId && departmentId !== null) {
      const department = departmentDataList.find(p => p.id === departmentId);
      if (department) {
        setSelectedDepartment(department.id);
        handleSelectionEmploymentContractData(
          department.id,
          departmentDataList,
          setSelectedDepartment,
          setDepartmentReportsToDepartment,
          setDepartmentReportsToDepartmentState,
          null,
          null,
          'text'
        );
      }
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setDepartmentStatus(isChecked);

    if (isChecked) {
      setDepartmentStatusState("valid");
    } else {
      setDepartmentStatusState("invalid");
    }
  };

  const [isDepartmentInputTouched, setIsDepartmentInputTouched] = useState(false);

  useEffect(() => {
    const fetchDepartmentById = async () => {
      if (detailedDepartmentDataUpdate.length <= 0 && departmentIdToUpdate) {
        try {
          const foundDepartment = await useFindDepartment(departmentIdToUpdate);
          console.log(foundDepartment);
          setDetailedDepartmentDataUpdate(foundDepartment);
          setDepartmentName(foundDepartment.departmentName);
          setDepartmentDescription(foundDepartment.description);
          setDepartmentStatus(foundDepartment.status === null ? false : true);
          handleSelectionDepartmentToReports(foundDepartment.responsible);
        } catch (error) {
          console.error(`Error fetching department data for ${departmentIdToUpdate}:`, error);
        }
      }
    };
    if (departmentIdToUpdate) {
      fetchDepartmentById();
    }
  }, [departmentIdToUpdate]);


  return (
    <Modal toggle={handleOpenDepartmentUpdateModal} isOpen={modalOpen} size="xl">
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Editar Departamento
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={handleCloseDepartmentUpdateModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <Form className="needs-validation" noValidate>
          <Card>
            <CardBody>
              <div className="form-row">
                <Col className="mb-3" md="6">
                  <label
                    className="form-control-label"
                    htmlFor="validationDepartmentName"
                  >
                    Nome
                  </label>
                  <Input
                    id="validationDepartmentName"
                    placeholder="Nome"
                    type="text"
                    valid={departmentNameState === "valid"}
                    invalid={departmentNameState === "invalid"}
                    value={departmentName}
                    onChange={(e) => {
                      setDepartmentName(e.target.value);
                      if (e.target.value === "") {
                        setDepartmentNameState("invalid");
                      } else {
                        setDepartmentNameState("valid");
                      }
                    }}
                  />
                  <div className="invalid-feedback">
                    É necessário preencher este campo.
                  </div>
                </Col>
                <Col className="mb-3" md="6">
                  <label
                    className="form-control-label"
                    htmlFor="validationReportToDepartment"
                  >
                    Reporta ao Departamento
                  </label>
                  <Select2
                    id="validationReportToDepartment"
                    className="form-control"
                    data-minimum-results-for-search="Infinity"
                    options={{ placeholder: "Selecione um departamento:" }}
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    data={departmentDataList}
                    onSelect={(e) => {
                      handleSelectionEmploymentContractData(
                        e.target.value,
                        departmentDataList,
                        setSelectedDepartment,
                        setDepartmentReportsToDepartment,
                        setDepartmentReportsToDepartmentState,
                        null,
                        null,
                        'id'
                      );
                      setIsDepartmentInputTouched(true);
                    }}
                  />
                </Col>
              </div>
              <div className="form-row">
                <Col className="mb-3" md="12">
                  <label
                    className="form-control-label"
                    htmlFor="validationDepartmentDescription"
                  >
                    Descrição
                  </label>
                  <Input
                    id="validationDepartmentDescription"
                    rows="3"
                    type="textarea"
                    valid={departmentDescriptionState === "valid"}
                    invalid={departmentDescriptionState === "invalid"}
                    value={departmentDescription}
                    onChange={(e) => {
                      setDepartmentDescription(e.target.value);
                      if (e.target.value === "") {
                        setDepartmentDescriptionState("");
                      } else {
                        setDepartmentDescriptionState("valid");
                      }
                    }}
                  />
                </Col>
                <Col className="mb-3" md="2">
                  <div className="d-flex flex-column w-100">
                    <span
                      className="form-control-label mb-4 mr-auto"
                    >
                      Estado Ativo
                    </span>
                    <label className="custom-toggle ml-auto">
                      <input
                        type="checkbox"
                        checked={departmentStatus}
                        onChange={handleCheckboxChange}
                      />
                      <span
                        className="custom-toggle-slider rounded-circle"
                        data-label-off="Não"
                        data-label-on="Sim"
                      />
                    </label>
                  </div>
                </Col>
              </div>
            </CardBody>
          </Card>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          type="button"
          onClick={handleCloseDepartmentUpdateModal}
        >
          Fechar
        </Button>
        <Button
          color={'warning'}
          type="button"
          onClick={handleUpdateDepartment}
        >
          {'Editar Departamento'}
        </Button>
      </ModalFooter>
    </Modal>

  );
}

ModalDepartment.defaultProps = {
  handleOpenDepartmentUpdateModal: () => { },
  modalOpen: false,
};

ModalDepartment.propTypes = {
  handleOpenDepartmentUpdateModal: PropTypes.func,
  modalOpen: PropTypes.bool,
};


export default ModalDepartment;
