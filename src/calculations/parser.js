import { CSF } from "./singularity";

export const functionChoices = [
  "t",
  "pow(t, 2)",
  "sin(t)",
  "cos(t)",
  "exp(t)",
  // "imp(t)",
  "us(t)",
  "sign(t)",
  "rect(t)",
  "ramp(t)",
  "tri(t)",
  "saw(t)",
];

export const periodicFunctionChoices = [
  "rect(t)",
  "tri(t)",
  "saw(t)",
];

export const evalExpression = (exp) => {
    const functionMapping = {
      sin: Math.sin,
      cos: Math.cos,
      exp: Math.exp,
      pow: Math.pow,
      // imp: CSF.impulse,
      us: CSF.unitStep,
      sign: CSF.signum,
      rect: CSF.rect,
      ramp: CSF.ramp,
      tri: CSF.triangle,
      saw: CSF.sawtooth,
    };

    try {
      let func = new Function("t", ...Object.keys(functionMapping), `return ${exp}`);
      return (t) => func(t, ...Object.values(functionMapping));
    } catch (e) {
      console.error("Error creating function:", e);
    }
  };