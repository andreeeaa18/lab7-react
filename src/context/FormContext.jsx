import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  step: 0,
  fields: {
    productCategory: "",
    product: "",
    customOrder: "",
    customOptions: [],
    customFlavors: [],
    customSize: "",
    customOccasion: "",
    customInspirations: "",
    customPickupTime: "",
    quantity: 1,
    sweetness: "",
    servingTemp: "",
    extraTopping: "",
    packaging: "beautiful",
    bakeryMessage: "",
    name: "",
    phone: "",
    address: "",
    deliveryType: "",
    deliveryDate: "",
    notes: "",
  },
  touched: {},
  errors: {},
  submitted: false,
};

const SET_FIELD = "SET_FIELD";
const TOUCH_FIELD = "TOUCH_FIELD";
const VALIDATE_STEP = "VALIDATE_STEP";
const SET_STEP = "SET_STEP";
const RESET = "RESET";
const TOGGLE_OPTION = "TOGGLE_OPTION";
const TOGGLE_ARRAY_ITEM = "TOGGLE_ARRAY_ITEM";
const SUBMIT = "SUBMIT";

function formReducer(state, action) {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        fields: { ...state.fields, [action.field]: action.value },
      };
    case TOUCH_FIELD:
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
      };
    case VALIDATE_STEP:
      return {
        ...state,
        touched: {
          ...state.touched,
          ...action.fields.reduce((acc, f) => ({ ...acc, [f]: true }), {}),
        },
      };
    case SET_STEP:
      return {
        ...state,
        step: action.step,
      };
    case RESET:
      return initialState;
    case TOGGLE_OPTION: {
      const options = state.fields.customOptions.includes(action.value)
        ? state.fields.customOptions.filter((opt) => opt !== action.value)
        : [...state.fields.customOptions, action.value];
      return {
        ...state,
        fields: { ...state.fields, customOptions: options },
      };
    }
    case TOGGLE_ARRAY_ITEM: {
      const arr = state.fields[action.field] || [];
      const updated = arr.includes(action.value)
        ? arr.filter((v) => v !== action.value)
        : [...arr, action.value];
      return {
        ...state,
        fields: { ...state.fields, [action.field]: updated },
      };
    }
    case SUBMIT:
      return {
        ...state,
        submitted: true,
      };
    default:
      return state;
  }
}

const StateContext = createContext();
const DispatchContext = createContext();

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useFormState() {
  const context = useContext(StateContext);

  return context;
}

export function useFormDispatch() {
  const context = useContext(DispatchContext);

  return context;
}

export const actionTypes = {
  SET_FIELD,
  TOUCH_FIELD,
  VALIDATE_STEP,
  SET_STEP,
  RESET,
  TOGGLE_OPTION,
  TOGGLE_ARRAY_ITEM,
  SUBMIT,
};
