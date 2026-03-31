import {
  useFormState,
  useFormDispatch,
  actionTypes,
} from "../context/FormContext";

function Stepper({ steps }) {
  const state = useFormState();
  const dispatch = useFormDispatch();
  const { step: currentStep, fields } = state;
  const isOffMenu = fields.productCategory === "offmenu";
  const hasCategory = fields.productCategory !== "";

  function getStatus(idx) {
    if (idx === 1 && hasCategory && !isOffMenu) return "skipped";
    if (idx < currentStep) return "completed";
    if (idx === currentStep) return "current";
    return "incomplete";
  }

  function handleStepClick(idx) {
    if (getStatus(idx) === "completed") {
      dispatch({ type: actionTypes.SET_STEP, step: idx });
    }
  }

  return (
    <div className="bakery-stepper">
      {steps.map((label, idx) => {
        const status = getStatus(idx);
        return (
          <div key={label} className="bakery-stepper-step">
            <div
              className={`bakery-stepper-circle ${status}`}
              onClick={() => handleStepClick(idx)}
              title={
                status === "completed" ? `Go back to: ${label}` : undefined
              }
            >
              {idx + 1}
            </div>
            <span
              className={`bakery-stepper-label${status === "skipped" ? " skipped" : ""}`}
            >
              {label}
            </span>
            {idx < steps.length - 1 && (
              <span className="bakery-stepper-arrow">→</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
