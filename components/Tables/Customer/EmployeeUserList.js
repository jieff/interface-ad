import React, { useState, useEffect, useContext } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap';
import ShowEmployeeDetailsModal from "../../Modals/admin/show-employee-details";
import { useFindAllEmployee } from "../../../hooks/RecordsHooks/employee/useFindAllEmployee";
import { EmployeeContext } from '../../../contexts/RecordsContext/EmployeeContext';
import { useSweetAlert } from '../../../contexts/SweetAlertContext';
import { useDeleteEmployee } from '../../../hooks/RecordsHooks/employee/useDeleteEmployee';
import { useFindClientCompany } from '../../../hooks/RecordsHooks/customer/useFindClientCompany';
import { useFindEmployeeContractDetails } from '../../../hooks/RecordsHooks/featuresEmploymentContract/useFindEmployeeContractDetails';
import { useFindRole } from '../../../hooks/RecordsHooks/role/useFindRole';
import { useDeleteEmployeeContract } from '../../../hooks/RecordsHooks/featuresEmploymentContract/useDeleteEmployeeContract';

const EmployeeUserList = () => {

  const {
    employeeIdToUpdate,
    handleEmployeeIdStatusCleanupToUpdate,
    handleEmployeeIdToUpdate,
    hasNewEmployeeRecordCreated,
    handleCreatedEmployeeRecordStatusChange,
    hasUpdatedEmployeeRecord,
    handleUpdatedEmployeeRecordStatusChange,
    hasDeletedEmployeeRecord,
    handleDeletedEmployeeRecordStatusChange,
  } = useContext(EmployeeContext);

  const { warningAlert } = useSweetAlert();

  const [detailedEmployeeData, setDetailedEmployeeData] = useState([]);
  const [idSelectedToShowEmployeeDetails, setIdSelectedToShowEmployeeDetails] = useState('');
  function handleCleaningSelectedIdToShowEmployeeDetails() {
    setIdSelectedToShowEmployeeDetails(null)
  }

  //const deleteCustomer = useDeleteCustomerAccount();

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const [modalOpen, setModalOpen] = React.useState(false);

  function handleOpenEmployeeModal() {
    setModalOpen(!modalOpen);
  }

  function handleShowEmployeeDetailsModal(employeeId, employeeName, employeeLastName) {
    const name = `${employeeName} ${employeeLastName}`;
    const employeeIdString = String(employeeId);
    setIdSelectedToShowEmployeeDetails(employeeIdString);
    setEmployeeName(name);
    handleOpenEmployeeModal();
  }

  const [employeeName, setEmployeeName] = useState('');

  function handleCleaningEmployeeNameStatus() {
    setEmployeeName('');
  }

  function handleOpenEmployeeUpdateModal(employeeId, employeeName, employeeLastName, companyName) {
    setCompanyNameToModalDetails(companyName);
    const name = `${employeeName} ${employeeLastName}`;
    handleEmployeeIdToUpdate(employeeId);
    setEmployeeName(name);
    handleOpenEmployeeModal();
  }

  const commonProps = {
    handleShowEmployeeDetailsModal,
    idSelectedToShowEmployeeDetails,
    handleCleaningSelectedIdToShowEmployeeDetails,
    handleOpenEmployeeModal,
    modalOpen,
    employeeName,
    handleCleaningEmployeeNameStatus,
  };

  const shouldShowModal =
    (idSelectedToShowEmployeeDetails && idSelectedToShowEmployeeDetails !== 0) ||
    (employeeIdToUpdate && employeeIdToUpdate !== 0);

  const handleDeleteClientEmployee = async (employeeId, employeeName, employeeLastName) => {
    try {
      const deleteEmployee = await useDeleteEmployee(employeeId);
      const deleteContract = await useDeleteEmployeeContract(employeeId);

      if (deleteEmployee !== null) {
        console.log('Data sent successfully!', deleteEmployee);
        if (deleteContract !== null) {
          console.log('Data sent successfully!', deleteContract);
          handleDeletedEmployeeRecordStatusChange();
        } else {
          console.error('Failed to delete employee contract with ID:', employeeId, '. Response Status: ', deleteContract.status);
        }
      } else {
        console.error('Failed to delete employee with ID:', employeeId, '. Response Status: ', deleteEmployee.status);
      }
    } catch (error) {
      console.error('Error in request:', error);
    }
  };

  const showWarningAlert = (employeeId, employeeName, employeeLastName) => {
    const name = `${employeeName} ${employeeLastName}`
    warningAlert(
      `${employeeId}`,
      "Atenção",
      "Deletar",
      `Você deseja realmente excluir ${name}?`,
      "lg",
      () => handleDeleteClientEmployee(employeeId, employeeName, employeeLastName)
    );
  };

  const [companyNameToModalDetails, setCompanyNameToModalDetails] = useState(null);
  function handleCleaningCompanyNameToModalDetails() {
    setCompanyNameToModalDetails(null)
  }

  const [contractDetailsSelectedEmployee, setContractDetailsSelectedEmployee] = useState([]);


  useEffect(() => {
    const fetchCompanyNamesAndRoles = async (employees) => {
      const updatedEmployees = await Promise.all(
        employees.map(async (employee) => {
          try {
            const companyData = await useFindClientCompany(employee.customerId);
            const foundEmployeeContract = await useFindEmployeeContractDetails(employee.id);
            const foundRoleName = await useFindRole(foundEmployeeContract.rolesId);
            return {
              ...employee,
              companyName: companyData.companyName,
              roleName: foundRoleName.roleName,
              adimissionDate: foundEmployeeContract.adimissionDate
            };
          } catch (error) {
            console.error(`Error fetching employee data for customerId ${employee.customerId}:`, error);
            return {
              ...employee,
              companyName: 'Unknown',
              roleName: 'Unknown',
              adimissionDate: 'N/A'
            };
          }
        })
      );
      setDetailedEmployeeData(updatedEmployees);
    };


    const fetchEmployees = async () => {
      if (detailedEmployeeData &&
        detailedEmployeeData.length === 0 ||
        hasUpdatedEmployeeRecord ||
        hasDeletedEmployeeRecord

      ) {
        try {
          const foundEmployees = await useFindAllEmployee();
          await fetchCompanyNamesAndRoles(foundEmployees);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      }
    };

    fetchEmployees();
    if (hasUpdatedEmployeeRecord) {
      handleUpdatedEmployeeRecordStatusChange();
    }
    if (hasDeletedEmployeeRecord) {
      handleDeletedEmployeeRecordStatusChange();
    }
  }, [
    detailedEmployeeData,
    hasUpdatedEmployeeRecord,
    hasDeletedEmployeeRecord
  ]);

  return (
    <Card>
      <CardHeader className="border-0">
        <Row>
          <Col xs="6">
            <h3 className="mb-0">Lista de Colaboradores</h3>
          </Col>
          <Col className="text-right" xs="6">
            <Button
              className="btn-neutral btn-round btn-icon"
              color="default"
              href="#pablo"
              id="tooltip969372949"
              onClick={(e) => e.preventDefault()}
              size="sm"
            >
              <span className="btn-inner--icon mr-1">
                <i className="fas fa-user-edit" />
              </span>
              <span className="btn-inner--text">Export</span>
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip969372949">
              Edit product
            </UncontrolledTooltip>
          </Col>
        </Row>
      </CardHeader>

      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="table-check-all"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor="table-check-all"
                />
              </div>
            </th>
            <th className="text-left">Nome</th>
            <th className="text-left">Empresa</th>
            <th className="text-left">Ocupação</th>
            <th className="text-left">Data de Admissão</th>
            <th className="text-left">Estado</th>
            <th className="text-left">Ações</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {detailedEmployeeData && detailedEmployeeData.length > 0 ? (
            detailedEmployeeData.map((employee) => (
              <tr key={employee.id}>
                <th>
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="table-check-all"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="table-check-all"
                    />
                  </div>
                </th>
                <td className="table-user">
                  {/* <img
                    alt="..."
                    className="avatar rounded-circle mr-3"
                    src={require("assets/img/theme/team-1.jpg")}
                  /> */}
                  <b>{employee.name} {employee.lastName}</b>
                </td>
                <td className="table-user">
                  <b>{employee.companyName}</b>
                </td>
                <td>
                  {employee.roleName}
                </td>
                <td>
                  <span className="text-muted">
                    {formatDate(employee.adimissionDate)}
                  </span>
                </td>
                <td className="text-left">
                  {
                    employee.status === true
                      ? (
                        <Badge color="success" pill>
                          Ativo
                        </Badge>
                      ) : (
                        employee.status === false
                          ? (
                            <Badge color="danger" pill>
                              Inativo
                            </Badge>
                          ) : (
                            <Badge color="primary" pill>
                              N/A
                            </Badge>
                          )
                      )
                  }
                </td>
                <td className="text-left" >
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      color=""
                      role="button"
                      size="sm"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => { e.preventDefault(); handleShowEmployeeDetailsModal(employee.id, employee.name, employee.lastName, companyNameToModalDetails) }}
                      >
                        Detalhes
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => { e.preventDefault(); handleOpenEmployeeUpdateModal(employee.id, employee.name, employee.lastName) }}
                      >
                        Editar
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => { e.preventDefault(); showWarningAlert(employee.id, employee.name, employee.lastName); }}
                      >
                        Deletar
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Nenhum dado de funcionários encontrado.</td>
            </tr>
          )}
        </tbody>
      </Table>
      {shouldShowModal ? (
        <ShowEmployeeDetailsModal {...commonProps} />
      ) : null}

    </Card>
  );
};

export default EmployeeUserList;
