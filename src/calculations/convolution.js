import { ComputationalIntegration } from './calculus.js'
import { CSF } from './singularity.js'

const Defaults = Object.freeze({
    ACCURACY: Math.pow(10, 4),
    LOWER_T: -10,
    UPPER_T: 10,
    LOWER_t: -10,
    UPPER_t: 10,
    INCREMENT: 1
})


export class ContinuousConvolver {
    constructor(f, h) {
        this.f = f;
        this.h = h;
    }

    continuousConvolution({integrationLowerBound = Defaults.LOWER_T, integrationUpperBound = Defaults.UPPER_T, increment = Defaults.INCREMENT, lowert = Defaults.LOWER_t, uppert = Defaults.UPPER_t, accuracy = Defaults.ACCURACY}) {
        const xValues = [];
        const yValues = [];
        const fValues = [];
        const hValues = [];
        // console.log("" + lowerT + " " + upperT);
        let midpoint = (integrationUpperBound + integrationLowerBound) / 2;
        let scale = (integrationUpperBound - integrationLowerBound);
        let boundedF = (t) => this.f(t) * CSF.rect((t - midpoint) / scale); // constrain limits (for infinite functions)
        let boundedH = (t) => this.h(t) * CSF.rect((t - midpoint) / scale); // constrain limits (for infinite functions)
    
        for (let t = lowert; t <= uppert; t += increment) {
            let integrand = (T) => boundedF(T) * boundedH(t - T);
            xValues.push(t);
            yValues.push(ComputationalIntegration.midpoint(integrand, t + integrationLowerBound, t + integrationUpperBound, accuracy));
            fValues.push(boundedF(t));
            hValues.push(boundedH(t));
        }
    
    
        return {xValues, yValues, fValues, hValues};
    }
}


function prettyPrint(points) {
    console.log(points.xValues);
    console.log(points.yValues);
}

// const f = (t) => CSF.rect(t)*Math.cos(t)+CSF.ramp((3-t)/2);
// console.log("Trapezoid, Midpoint");
// for (let i = 0; i <= 7; ++i) {
//     console.log("10^" + i + ": " 
//     + ComputationalIntegration.trapezoid(f, -10, 10, Math.pow(10, i)) + " " 
//     + ComputationalIntegration.midpoint(f, -10, 10, Math.pow(10, i)));
// }

export function generateConvolutionData(f, h) {
    // let f = (t) => Math.cos(t)*2*CSF.rect((t-2)/4);
    // let h = (t) => CSF.signum(-t);
    // let f = (t) => CSF.ramp(t);
    // let h = (t) => Math.cos(t);
    var calc = new ContinuousConvolver(f, h);
    const {xValues, yValues, fValues, hValues} = calc.continuousConvolution({increment: 0.01});
    return {xValues, yValues, fValues, hValues};
}

// export function generateConvolutionData_v2() {
//     let f = (t) => CSF.triangle(t);
//     let h = (t) => 2;
//     const {xValues, yValues, fValues, hValues} = continuousConvolution_v2({f: h, h: f, increment: 0.01});
//     return {xValues, yValues, fValues, hValues};
// }

// prettyPrint(points)
// console.log(points)

export class DiscreteConvolver {
    constructor(f = [], h = [], prefix = false) {
        this.f = f; // array of numbers
        this.h = h; // array of numbers
        this.prefix = prefix;
    }

    discreteConvolution() {
        if (this.f.length < this.h.length) {
            if (this.prefix) {
                let temp = [];
                for (let i = 0; i < this.h.length - this.f.length; ++i) {
                    temp.push(0);
                }
                for (let i = 0; i < this.f.length; ++i) {
                    temp.push(this.f[i]);
                }
                this.f = temp;
            }
            else {
                for (let i = this.f.length; i < this.h.length; ++i) {
                    this.f.push(0);
                }
            }
        }
        else if (this.f.length > this.h.length) {
            if (this.prefix) {
                let temp = [];
                for (let i = 0; i < this.f.length - this.h.length; ++i) {
                    temp.push(0);
                }
                for (let i = 0; i < this.h.length; ++i) {
                    temp.push(this.h[i]);
                }
                this.h = temp;
            }
            else {
                for (let i = this.h.length; i < this.f.length; ++i) {
                    this.h.push(0);
                }
            }
        }
        let table = this.constructTable();

        let convolutionSolution = [];
        
        for (let i = 0; i < table.length; ++i) {
            let curSum = 0;
            for (let x = 0, y = i; x < table[i].length && y >= 0; ++x, --y) {
                curSum += table[y][x];
            }
            convolutionSolution.push(curSum);
        }

        if (table.length > 0) {
            let lastRow = table.length - 1;
            for (let i = 1; i < table[lastRow].length; ++i) {
                let curSum = 0.
                for (let x = i, y = lastRow; x < table[lastRow].length && y >= 0; ++x, --y) {
                    curSum += table[y][x];
                }
                convolutionSolution.push(curSum);
            }
        }
        return {convolutionSolution, table};
    }

    constructTable() {
        let table = [];
        for (let row = 0; row < this.h.length; ++row) {
            let temp = [];
            for (let col = 0; col < this.f.length; ++col) {
                temp.push(this.h[row] * this.f[col]);
            }
            table.push(temp);
        }
        return table;
    }
}