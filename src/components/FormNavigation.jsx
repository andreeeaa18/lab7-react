import React from "react";
import {
  useFormState,
  useFormDispatch,
  actionTypes,
} from "../context/FormContext";

const personalDataFields = [
  "name",
  "phone",
  "address",
  "deliveryType",
  "deliveryDate",
];

function validatePersonalData(fields) {
  const errors = {};
  if (!fields.name) errors.name = "Name required.";
  if (!fields.phone || fields.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Valid phone required (min 7 digits).";
  if (!fields.address) errors.address = "Address required.";
  if (!fields.deliveryType) errors.deliveryType = "Select delivery type.";
  if (!fields.deliveryDate) {
    errors.deliveryDate = "Select a date.";
  } else {
    const today = new Date().toISOString().split("T")[0];
    if (fields.deliveryDate < today)
      errors.deliveryDate = "Date must be today or later.";
  }
  return errors;
}

function validateStep(step, fields) {
  const errors = {};
  if (step === 0) {
    if (!fields.productCategory)
      errors.productCategory = "Please select a category or off-menu.";
    if (
      fields.productCategory &&
      fields.productCategory !== "offmenu" &&
      !fields.product
    )
      errors.product = "Please select a product.";
  }

  if (step === 1) {
    if (!fields.customOrder || fields.customOrder.length < 10)
      errors.customOrder = "Please describe your vision (min 10 chars).";
    if (!fields.customFlavors || fields.customFlavors.length === 0)
      errors.customFlavors = "Please select at least one flavour.";
  }
  if (step === 2) {
    return validatePersonalData(fields);
  }
  return errors;
}

function FormNavigation({ steps }) {
  const state = useFormState();
  const dispatch = useFormDispatch();
  const { step, fields, touched } = state;
  const isOffMenu = fields.productCategory === "offmenu";
  const lastStep = steps.length - 1;

  function nextStep() {
    if (step === 0 && !isOffMenu) return 2;
    return step + 1;
  }

  function prevStep() {
    if (step === 2 && !isOffMenu) return 0;
    return step - 1;
  }

  const errors = validateStep(step, fields);

  function getTouchedFields() {
    if (step === 0) return ["productCategory", "product"];
    if (step === 1) return ["customOrder", "customFlavors"];
    if (step === 2) return personalDataFields;
    return [];
  }

  const canGoNext = Object.keys(errors).length === 0;

  function handleNext() {
    dispatch({
      type: actionTypes.VALIDATE_STEP,
      fields: getTouchedFields(),
    });
    if (canGoNext) dispatch({ type: actionTypes.SET_STEP, step: nextStep() });
  }

  function handleBack() {
    dispatch({ type: actionTypes.SET_STEP, step: prevStep() });
  }

  return (
    <div style={{ marginTop: 28, display: "flex", gap: 16 }}>
      {step > 0 && step < lastStep && (
        <button type="button" onClick={handleBack} className="bakery-nav-back">
          Back
        </button>
      )}
      {step < lastStep && (
        <button
          type="button"
          onClick={handleNext}
          className="bakery-nav-next"
          disabled={!canGoNext}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default FormNavigation;
