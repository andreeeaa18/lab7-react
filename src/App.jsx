import "./App.css";
import { FormProvider, useFormState } from "./context/FormContext";
import Stepper from "./components/Stepper";
import Step1ProductSelect from "./components/Step1ProductSelect";
import Step2CustomOrder from "./components/Step2CustomOrder";
import Step3PersonalData from "./components/Step3PersonalData";
import Step4Review from "./components/Step4Review";
import FormNavigation from "./components/FormNavigation";
import LivePreview from "./components/LivePreview";

const steps = [
  "Select Product",
  "Custom Order",
  "Personal Data",
  "Review & Submit",
];

function StepContent() {
  const { step } = useFormState();
  if (step === 0) return <Step1ProductSelect />;
  if (step === 1) return <Step2CustomOrder />;
  if (step === 2) return <Step3PersonalData />;
  return <Step4Review />;
}

function App() {
  return (
    <FormProvider>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          maxWidth: 1300,
          margin: "40px auto",
          gap: 48,
        }}
      >
        <div style={{ flex: 1, minWidth: 600 }}>
          <Stepper steps={steps} />
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 12px #f7c6e0aa",
              padding: 48,
              minHeight: 600,
            }}
          >
            <StepContent />
            <FormNavigation steps={steps} />
          </div>
        </div>
        <LivePreview />
      </div>
    </FormProvider>
  );
}

export default App;
