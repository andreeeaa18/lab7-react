import React, { useState } from "react";
import {
  useFormState,
  useFormDispatch,
  actionTypes,
} from "../context/FormContext";
import categoriesData from "../data/categories.json";
import productsData from "../data/products.json";
import preferencesData from "../data/preferences.json";

const {
  sweetness: sweetnessOptions,
  servingTemp: servingTempOptions,
  extraTopping: toppingOptions,
  packaging: packagingOptions,
  quantityPresets,
} = preferencesData;

function Step1ProductSelect() {
  const state = useFormState();
  const dispatch = useFormDispatch();
  const categories = categoriesData;
  const products = productsData[state.fields.productCategory] || [];

  function handleCategoryChange(e) {
    dispatch({
      type: actionTypes.SET_FIELD,
      field: "productCategory",
      value: e.target.value,
    });
    dispatch({ type: actionTypes.SET_FIELD, field: "product", value: "" });
    dispatch({ type: actionTypes.SET_FIELD, field: "quantity", value: 1 });
  }

  function handleProductChange(e) {
    dispatch({
      type: actionTypes.SET_FIELD,
      field: "product",
      value: e.target.value,
    });
    dispatch({ type: actionTypes.SET_FIELD, field: "quantity", value: 1 });
  }

  function handleQuantityChange(e) {
    const val = Math.max(1, parseInt(e.target.value, 10) || 1);
    dispatch({
      type: actionTypes.SET_FIELD,
      field: "quantity",
      value: val,
    });
  }

  function handlePackagingChange(e) {
    dispatch({
      type: actionTypes.SET_FIELD,
      field: "packaging",
      value: e.target.value,
    });
  }

  function handleBakeryMessageChange(e) {
    dispatch({
      type: actionTypes.SET_FIELD,
      field: "bakeryMessage",
      value: e.target.value,
    });
  }

  function handleOffMenu() {
    dispatch({
      type: actionTypes.SET_FIELD,
      field: "productCategory",
      value: "offmenu",
    });
    dispatch({ type: actionTypes.SET_FIELD, field: "product", value: "" });
    dispatch({ type: actionTypes.SET_FIELD, field: "quantity", value: 1 });
    dispatch({ type: actionTypes.SET_STEP, step: 1 });
  }

  const radioQtyCats = ["cookies", "biscuits", "macarons"];
  const showRadioQty = radioQtyCats.includes(state.fields.productCategory);
  const showProduct =
    state.fields.productCategory && state.fields.productCategory !== "offmenu";

  return (
    <div className="bakery-step bakery-step1">
      <h2 className="bakery-title">Welcome to Hella Good Pastry and Bakery!</h2>
      <p className="bakery-desc">
        Select a product category or make an off-menu order:
      </p>

      <div className="bakery-field">
        <label htmlFor="category">Category:</label>
        <div style={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
          <select
            id="category"
            value={state.fields.productCategory}
            onChange={handleCategoryChange}
            style={{ flex: 1, minWidth: 220 }}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="bakery-offmenu-btn"
            onClick={handleOffMenu}
            style={{ flex: 1, minWidth: 220 }}
          >
            Off-menu Order
          </button>
        </div>
      </div>
      {showProduct && (
        <div className="bakery-field">
          <label htmlFor="product">Product:</label>
          <select
            id="product"
            value={state.fields.product}
            onChange={handleProductChange}
          >
            <option value="">Select Product</option>
            {products.map((prod) => (
              <option key={prod} value={prod}>
                {prod}
              </option>
            ))}
          </select>
        </div>
      )}
      {showProduct && (
        <div className="bakery-field">
          <label>Quantity:</label>
          {showRadioQty ? (
            <div className="bakery-radio-group">
              {quantityPresets.map((qty) => (
                <label key={qty} className="bakery-radio-label">
                  <input
                    type="radio"
                    name="quantity"
                    value={qty}
                    checked={state.fields.quantity === qty}
                    onChange={handleQuantityChange}
                  />
                  {qty}
                </label>
              ))}
            </div>
          ) : (
            <input
              type="number"
              min={1}
              max={20}
              name="quantity"
              value={state.fields.quantity || 1}
              onChange={handleQuantityChange}
              className="bakery-qty-input"
            />
          )}
        </div>
      )}
      {showProduct && (
        <div className="bakery-field">
          <label>Packing:</label>
          <div className="bakery-radio-group">
            {packagingOptions.map((opt) => (
              <label key={opt.id} className="bakery-radio-label">
                <input
                  type="radio"
                  name="packaging"
                  value={opt.id}
                  checked={state.fields.packaging === opt.id}
                  onChange={handlePackagingChange}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      )}
      {showProduct && (
        <div className="bakery-field">
          <label>How sweet would you like it?</label>
          <div className="bakery-radio-group bakery-radio-group--wrap">
            {sweetnessOptions.map((opt) => (
              <label key={opt.id} className="bakery-radio-card">
                <input
                  type="radio"
                  name="sweetness"
                  value={opt.label}
                  checked={state.fields.sweetness === opt.label}
                  onChange={(e) =>
                    dispatch({
                      type: actionTypes.SET_FIELD,
                      field: "sweetness",
                      value: e.target.value,
                    })
                  }
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      )}
      {showProduct && (
        <div className="bakery-field">
          <label>Preferred serving temperature:</label>
          <div className="bakery-radio-group bakery-radio-group--wrap">
            {servingTempOptions.map((opt) => (
              <label key={opt.id} className="bakery-radio-card">
                <input
                  type="radio"
                  name="servingTemp"
                  value={opt.label}
                  checked={state.fields.servingTemp === opt.label}
                  onChange={(e) =>
                    dispatch({
                      type: actionTypes.SET_FIELD,
                      field: "servingTemp",
                      value: e.target.value,
                    })
                  }
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      )}
      {showProduct && (
        <div className="bakery-field">
          <label>Extra topping:</label>
          <div className="bakery-radio-group bakery-radio-group--wrap">
            {toppingOptions.map((opt) => (
              <label key={opt.id} className="bakery-radio-card">
                <input
                  type="radio"
                  name="extraTopping"
                  value={opt.label}
                  checked={state.fields.extraTopping === opt.label}
                  onChange={(e) =>
                    dispatch({
                      type: actionTypes.SET_FIELD,
                      field: "extraTopping",
                      value: e.target.value,
                    })
                  }
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      )}
      {showProduct && (
        <div className="bakery-field">
          <label htmlFor="bakeryMessage">Message for the bakery:</label>
          <textarea
            id="bakeryMessage"
            name="bakeryMessage"
            value={state.fields.bakeryMessage}
            onChange={handleBakeryMessageChange}
            rows={2}
            placeholder="Any special instructions or wishes?"
            className="bakery-message-textarea"
          />
        </div>
      )}
    </div>
  );
}

export default Step1ProductSelect;
