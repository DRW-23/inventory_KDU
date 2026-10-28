// ============================================================
// KDU Asset Tracker – QuantityStepper Component
// ============================================================

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export function QuantityStepper({ value, onChange, min = 1 }: QuantityStepperProps) {
  return (
    <div className="stepper-widget">
      <button
        className="stepper-btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        type="button"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="stepper-value">{value}</span>
      <button
        className="stepper-btn"
        onClick={() => onChange(value + 1)}
        type="button"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
