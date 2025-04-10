import { ComputationalIntegration } from './calculus.js'
import { CSF } from './singularity.js';

import { evaluate } from 'mathjs'

export class ContinuousTimeFourierSeries {
    // inputs: period, x(t)
    constructor(T, x) {
        this.x = x;
        this.T0 = T;
        this.w0 = 2 * Math.PI / T;
        this.aValues = new Map();
        this.bValues = new Map();
    }
    
    getA(n) {
        let lowerBound = -this.T0/2;
        let upperBound = this.T0/2;
        if (this.aValues.has(n)) {
            return this.aValues.get(n);
        }
        else {
            let result = 0;
            if (n === 0) {
                result = 1/this.T0 * ComputationalIntegration.midpoint(this.x, lowerBound, upperBound, 1000);
            }
            else {
                const integrand = (t) => this.x(t)*Math.cos(n*this.w0*t);
                result = 2/this.T0 * ComputationalIntegration.midpoint(integrand, lowerBound, upperBound, 1000)
            }
            this.aValues.set(n, result);
            return result;
        }
    }
    
    getB(n) {
        let lowerBound = -this.T0/2;
        let upperBound = this.T0/2;
        if (this.bValues.has(n)) {
            return this.bValues.get(n);
        }
        else {
            let result = 0;
            if (n === 0) {
                result = 0;
            }
            else {
                const integrand = (t) => this.x(t)*Math.sin(n*this.w0*t);
                result = 2/this.T0 * ComputationalIntegration.midpoint(integrand, lowerBound, upperBound, 1000)
            }
            this.bValues.set(n, result);
            return result;
        }
    }

    computeCoefficients(n) {
        let as = [];
        let bs = [];
        for (let i = 0; i < n; ++i) {
            as.push(this.getA(i));
            bs.push(this.getB(i));
        }
        return {as, bs};
    }

    computeCTFS(numTerms) {
        let {as, bs} = this.computeCoefficients(numTerms + 1);
        const approximation = (t) => {
            let result = this.getA(0);
            for (let i = 1; i <= numTerms; ++i) {
                result += this.getA(i)*Math.cos(i*this.w0*t) + this.getB(i)*Math.sin(i*this.w0*t);
            }
            return result;
        }

        // console.log("a(0) = " + this.getA(0));
        // for (let i = 1; i <= numTerms; ++i) {
        //     console.log("i, a(i), b(i): " + i + ", " + this.getA(i) + ", " + this.getB(i));
        // }

        return {approximation, as, bs};
    }
}

const consolePrint = (arr) => {
    for (let i = 0; i < arr.length; ++i) {
        console.log(arr[i]);
    }
}


const x = (t) => CSF.sawtooth(t);
const Tx = 2;
let cx = new ContinuousTimeFourierSeries(Tx, x);
const {approximation, as, bs} = cx.computeCTFS(500);
let tVals = []
let xVals = []
let yVals = []
for (let t = -2; t <= 2; t += 0.01) {
    tVals.push(t);
    xVals.push(x(t));
    yVals.push(approximation(t));
}

console.log(Tx);
consolePrint(as);
console.log("----")
consolePrint(bs);
console.log("----")
consolePrint(tVals);
console.log("----");
consolePrint(xVals);
console.log("----");
consolePrint(yVals);

// console.log("DONE");

// for (let i = -1; i <= 1; i += 0.25) {
//     const scope = {
//         t: i,
//         rect: CSF.rect
//     }
//     console.log(evaluate('1/sqrt(e^2)+rect(t)', scope));
// }