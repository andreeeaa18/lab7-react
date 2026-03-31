import React from "react";
import {
  useFormState,
  useFormDispatch,
  actionTypes,
} from "../context/FormContext";
import deliveryData from "../data/delivery.json";

function validate(fields) {
  const errors = {};
  if (!fields.name) errors.name = "Full name is required.";
  if (!fields.phone || fields.phone.replace(/\D/g, "").length < 7)
    errors.phone = "A valid phone number is required (min 7 digits).";
  if (!fields.address) errors.address = "Address is required.";
  if (!fields.deliveryType)
    errors.deliveryType = "Please select delivery or pickup.";
  if (!fields.deliveryDate) {
    errors.deliveryDate = "Please select a preferred date.";
  } else {
    const today = new Date().toISOString().split("T")[0];
    if (fields.deliveryDate < today)
      errors.deliveryDate = "Date must be today or in the future.";
  }
  return errors;
}

function Step3PersonalData() {
  const state = useFormState();
  const dispatch = useFormDispatch();
  const { fields, touched } = state;

  const errors = validate(fields);

  function handleChange(e) {
    dispatch({
      type: actionTypes.SET_FIELD,
      field: e.target.name,
      value: e.target.value,
    });
  }

  function handleBlur(e) {
    dispatch({ type: actionTypes.TOUCH_FIELD, field: e.target.name });
  }

  function getErrorMessage(field) {
    return touched[field] && errors[field] ? (
      <span className="error-message">{errors[field]}</span>
    ) : null;
  }

  function getInputClassName(field) {
    return touched[field] && errors[field] ? "error" : "";
  }

  return (
    <div className="bakery-step">
      <h2 className="bakery-title">Your Details</h2>
      <p className="bakery-desc">
        Fields marked <span className="bakery-required">*</span> are required.
      </p>

      <div className="bakery-field">
        <label htmlFor="name">
          Full Name <span className="bakery-required">*</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="e.g. Jane Smith"
          value={fields.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClassName("name")}
        />
        {getErrorMessage("name")}
      </div>

      <div className="bakery-field">
        <label htmlFor="phone">
          Phone Number <span className="bakery-required">*</span>
        </label>
        <input
          id="phone"
          type="text"
          name="phone"
          placeholder="e.g. 0712 345 678"
          value={fields.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClassName("phone")}
        />
        {getErrorMessage("phone")}
      </div>

      <div className="bakery-field">
        <label htmlFor="address">
          Address <span className="bakery-required">*</span>
        </label>
        <input
          id="address"
          type="text"
          name="address"
          placeholder="Street, city"
          value={fields.address}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClassName("address")}
        />
        {getErrorMessage("address")}
      </div>

      <div className="bakery-field">
        <label htmlFor="deliveryType">
          Delivery or Pickup <span className="bakery-required">*</span>
        </label>
        <select
          id="deliveryType"
          name="deliveryType"
          value={fields.deliveryType}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClassName("deliveryType")}
        >
          <option value="">Select</option>
          {deliveryData.map((opt) => {
            return (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            );
          })}
        </select>
        {getErrorMessage("deliveryType")}
      </div>

      <div className="bakery-field">
        <label htmlFor="deliveryDate">
          Preferred Date <span className="bakery-required">*</span>
        </label>
        <input
          id="deliveryDate"
          type="date"
          name="deliveryDate"
          value={fields.deliveryDate}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClassName("deliveryDate")}
        />
        {getErrorMessage("deliveryDate")}
      </div>

      <div className="bakery-field">
        <label htmlFor="notes">Additional Notes</label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Allergies, special requests, etc."
          value={fields.notes}
          onChange={handleChange}
          rows={3}
        />
      </div>
    </div>
  );
}

export default Step3PersonalData;
