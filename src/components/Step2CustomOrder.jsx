import React from "react";
import {
  useFormState,
  useFormDispatch,
  actionTypes,
} from "../context/FormContext";
import optionsData from "../data/options.json";
import flavorsData from "../data/flavors.json";
import occasionsData from "../data/occasions.json";
import sizesData from "../data/sizes.json";

function Step2CustomOrder() {
  const state = useFormState();
  const dispatch = useFormDispatch();
  const { fields, touched } = state;
  const options = optionsData;
  const flavors = flavorsData;
  const occasions = occasionsData;
  const sizes = sizesData;

  function set(field, value) {
    dispatch({ type: actionTypes.SET_FIELD, field, value });
  }

  function handleBlur(field) {
    dispatch({ type: actionTypes.TOUCH_FIELD, field });
  }

  function toggleFlavor(label) {
    dispatch({
      type: actionTypes.TOGGLE_ARRAY_ITEM,
      field: "customFlavors",
      value: label,
    });
  }

  function toggleOption(label) {
    dispatch({ type: actionTypes.TOGGLE_OPTION, value: label });
  }

  const descError =
    !fields.customOrder || fields.customOrder.length < 10
      ? "Please describe your vision (min 10 chars)."
      : null;

  const flavorsError =
    !fields.customFlavors || fields.customFlavors.length === 0
      ? "Please select at least one flavour."
      : null;

  return (
    <div className="bakery-step">
      <h2 className="bakery-title">Design Your Custom Dessert</h2>
      <p className="bakery-desc">
        Tell us everything, the more detail, the better we can craft your dream
        creation!
      </p>

      <div className="bakery-field">
        <label htmlFor="customOrder">
          Describe your vision: <span className="bakery-required">*</span>
        </label>
        <textarea
          id="customOrder"
          value={fields.customOrder}
          onChange={(e) => set("customOrder", e.target.value)}
          onBlur={() => handleBlur("customOrder")}
          rows={4}
          className={touched.customOrder && descError ? "error" : ""}
        />
        {touched.customOrder && descError && (
          <span className="error-message">{descError}</span>
        )}
      </div>

      <div className="bakery-field">
        <label htmlFor="customOccasion">Occasion:</label>
        <select
          id="customOccasion"
          value={fields.customOccasion}
          onChange={(e) => set("customOccasion", e.target.value)}
        >
          <option value="">Select occasion</option>
          {occasions.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="bakery-field">
        <label>Serving size:</label>
        <div className="bakery-radio-group bakery-radio-group--wrap">
          {sizes.map((s) => (
            <label key={s.id} className="bakery-radio-card">
              <input
                type="radio"
                name="customSize"
                value={s.id}
                checked={fields.customSize === s.id}
                onChange={(e) => set("customSize", e.target.value)}
              />
              {s.label}
            </label>
          ))}
        </div>
      </div>

      <div className="bakery-field">
        <label>
          Preferred flavours{" "}
          <span className="bakery-hint">(pick at least one)</span>:
          <span className="bakery-required"> *</span>
        </label>
        <div className="bakery-checkbox-grid">
          {flavors.map((f) => (
            <label key={f.id} className="bakery-checkbox-card">
              <input
                type="checkbox"
                value={f.label}
                checked={fields.customFlavors.includes(f.label)}
                onChange={() => toggleFlavor(f.label)}
              />
              {f.label}
            </label>
          ))}
        </div>
        {touched.customFlavors && flavorsError && (
          <span className="error-message">{flavorsError}</span>
        )}
      </div>

      <div className="bakery-field">
        <label>
          Dietary requirements <span className="bakery-hint">(optional)</span>:
        </label>
        <div className="bakery-checkbox-grid">
          {options.map((opt) => (
            <label key={opt.id} className="bakery-checkbox-card">
              <input
                type="checkbox"
                value={opt.label}
                checked={fields.customOptions.includes(opt.label)}
                onChange={() => toggleOption(opt.label)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div className="bakery-field">
        <label htmlFor="customPickupTime">
          Preferred pick-up / delivery time
          <span className="bakery-hint">(optional)</span>:
        </label>
        <input
          id="customPickupTime"
          type="time"
          value={fields.customPickupTime}
          onChange={(e) => set("customPickupTime", e.target.value)}
        />
      </div>

      <div className="bakery-field">
        <label htmlFor="customInspirations">
          Inspiration / references
          <span className="bakery-hint">(optional)</span>:
        </label>
        <textarea
          id="customInspirations"
          value={fields.customInspirations}
          onChange={(e) => set("customInspirations", e.target.value)}
          rows={2}
        />
      </div>
    </div>
  );
}

export default Step2CustomOrder;
