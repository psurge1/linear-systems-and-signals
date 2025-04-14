import { CSF } from "./singularity";
import {create, all} from "mathjs"

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

  // 'import':     function () { return null; },
  // 'createUnit': function () { return null; },
  // 'reviver':    function () { return null; },
  // 'evaluate':   function () { return null; },
  // 'parse':      function () { return null; },
  // 'simplify':   function () { return null; },
  // 'derivative': function () { return null; },
  // 'resolve':    function () { return null; }
};


const math = create(all);
math.import(functionMapping, {override: true})

export const evalExpression = (exp) => {
  // console.log(`EXP: ${exp}`);
  try {
    let compiled = math.compile(exp);
    const f = (t) => compiled.evaluate({ t });
    try {
      f(0); // test
      return f;
    }
    catch {
      return null;
    }
  }
  catch {
    return null;
  }
    // try {
    //   let func = new Function("t", ...Object.keys(functionMapping), `return ${exp}`);
    //   return (t) => func(t, ...Object.values(functionMapping));
    // } catch (e) {
    //   console.error("Error creating function:", e);
    // } 
};