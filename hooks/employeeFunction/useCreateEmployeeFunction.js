import React, { useState } from 'react';

const useCreateEmployeeFunction = (handleShowRolesUserRegister) => {

  const [employeeFunctionName, setEmployeeFunctionName] = useState("");
  const [employeeFunctionNameState, setEmployeeFunctionNameState] = useState(null);
  const [funtionReportsToFuntion, setFuntionReportsToFuntion] = useState("");
  const [funtionReportsToFuntionState, setFuntionReportsToFuntionState] = useState(null);
  const [employeeFunctiontDescription, setEmployeeFunctiontDescription] = useState("");
  const [employeeFunctiontDescriptionState, setEmployeeFunctiontDescriptionState] = useState(null);
  const [employeeFunctionDataList, setEmployeeFunctionDataList] = useState([]);
  const handleEmployeeFunctionDataList = (employeeFunctionData) => {
    setEmployeeFunctionDataList(employeeFunctionData);
  }

  const validateAddEmployeeFunctionForm = () => {
    if (employeeFunctionName === "") {
      setEmployeeFunctionNameState("invalid");
    } else {
      setEmployeeFunctionNameState("valid");
    }
    if (employeeFunctiontDescription === "") {
      if (employeeFunctiontDescription.length < 10) {
        setEmployeeFunctiontDescriptionState("invalid");
      } else {
        setEmployeeFunctiontDescriptionState("valid");
      }
    }
  }

  function handleValidateAddEmployeeFunctionForm() {
    validateAddEmployeeFunctionForm();
    if (employeeFunctionNameState === "valid" &&
      funtionReportsToFuntionState === "" &&
      employeeFunctiontDescriptionState === "") {
      handleSubmit(employeeFunctionName);
    } else if (employeeFunctionNameState === "valid" &&
      funtionReportsToFuntionState === "" &&
      employeeFunctiontDescriptionState !== "") {
      handleSubmit(employeeFunctionName, employeeFunctiontDescription);
    } else if (employeeFunctionNameState === "valid" &&
      funtionReportsToFuntionState !== "" &&
      employeeFunctiontDescriptionState !== "") {
      handleSubmit(employeeFunctionName, employeeFunctiontDescription, funtionReportsToFuntion);
    }
  }

  const handleSubmit = async (employeeFunctionName, employeeFunctiontDescription, funtionReportsToFuntion) => {
    if (employeeFunctionName && employeeFunctionName !== "") {
      try {
        const payload = {
          name: employeeFunctionName,
          status: true
        };

        if (employeeFunctiontDescription && employeeFunctiontDescription !== "") {
          console.log(employeeFunctiontDescription);
          payload.description = employeeFunctiontDescription;
        }

        if (funtionReportsToFuntion && funtionReportsToFuntion !== "") {
          console.log(funtionReportsToFuntion);
          payload.responsible = funtionReportsToFuntion;
        }

        console.log("PAYLOAD: ", payload);

        const response = await fetch(`${process.env.NEXT_PUBLIC_EMPLOYEE_FUNCTION}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          reset();
          handleShowRolesUserRegister();
          console.log('Data sent successfully!');
        } else {
          console.error('Erro na resposta:', response.status);
        }
      } catch (error) {
        console.error('Erro no pedido:', error);
      }
    }
  };

  function reset() {
    setEmployeeFunctionName("");
    setEmployeeFunctionNameState(null);
    setEmployeeFunctionDataList([]);
    setFuntionReportsToFuntion("");
    setFuntionReportsToFuntionState(null);
    setEmployeeFunctiontDescription("");
    setEmployeeFunctiontDescriptionState(null);
  }

  return {
    employeeFunctionName,
    setEmployeeFunctionName,
    employeeFunctionNameState,
    setEmployeeFunctionNameState,
    employeeFunctionDataList,
    setEmployeeFunctionDataList,
    funtionReportsToFuntion,
    setFuntionReportsToFuntion,
    funtionReportsToFuntionState,
    setFuntionReportsToFuntionState,
    employeeFunctiontDescription,
    setEmployeeFunctiontDescription,
    employeeFunctiontDescriptionState,
    setEmployeeFunctiontDescriptionState,
    handleValidateAddEmployeeFunctionForm,
    handleEmployeeFunctionDataList
  };
};

export default useCreateEmployeeFunction;
