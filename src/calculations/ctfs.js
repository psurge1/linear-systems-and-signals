import { ComputationalIntegration } from './calculus.js'
import { CSF } from './singularity.js';

import { evaluate } from 'mathjs'

export class ContinuousTimeFourierSeries {
    // inputs: period, x(t)
    constructor(x, T, Tstart, termlimit = 1000) {
        this.x = x;
        this.T0 = T;
        this.w0 = 2 * Math.PI / T;
        this.aValues = new Map();
        this.bValues = new Map();
        this.Tstart = Tstart;
        this.termlimit = 10000;
    }
    
    getA(n) {
        let lowerBound = this.Tstart;
        let upperBound = this.Tstart + this.T0;
        if (this.aValues.has(n)) {
            return this.aValues.get(n);
        }
        else {
            let result = 0;
            if (n === 0) {
                result = 1/this.T0 * ComputationalIntegration.trapezoid(this.x, lowerBound, upperBound, this.termlimit);
            }
            else {
                const integrand = (t) => this.x(t)*Math.cos(n*this.w0*t);
                const val = ComputationalIntegration.trapezoid(integrand, lowerBound, upperBound, this.termlimit);
                result = 2/this.T0 * val;
            }
            this.aValues.set(n, result);
            return result;
        }
    }
    
    getB(n) {
        let lowerBound = this.Tstart;
        let upperBound = this.Tstart + this.T0;
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
                result = 2/this.T0 * ComputationalIntegration.trapezoid(integrand, lowerBound, upperBound, this.termlimit)
            }
            this.bValues.set(n, result);
            return result;
        }
    }

    computeCoefficients(n) {
        let as = [];
        let bs = [];
        for (let i = 0; i < n; ++i) {
            const a = this.getA(i);
            const b = this.getB(i);
            if (isNaN(a) || isNaN(b)) {
                throw new Error("Error: a or b is NaN.");
            }
            as.push(a);
            bs.push(b);
        }
        return {as, bs};
    }

    computeCTFS(numTerms) {
        let {as, bs} = this.computeCoefficients(numTerms + 1);
        this.approximation = (t) => {
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

        return {approximation: this.approximation, as, bs};
    }
}

const consolePrint = (arr) => {
    for (let i = 0; i < arr.length; ++i) {
        console.log(arr[i]);
    }
}


// const x = (t) => CSF.sawtooth(t);
// const Tx = 2;
// const Tstart = 0;
// let cx = new ContinuousTimeFourierSeries(x, Tx, Tstart);
// const {approximation, as, bs} = cx.computeCTFS(5);
// let tVals = []
// let xVals = []
// let yVals = []
// for (let t = -2; t <= 2; t += 0.01) {
//     tVals.push(t);
//     xVals.push(x(t));
//     yVals.push(approximation(t));
// }

// console.log(Tx);
// consolePrint(as);
// console.log("----")
// consolePrint(bs);
// console.log("----")
// consolePrint(tVals);
// console.log("----");
// consolePrint(xVals);
// console.log("----");
// consolePrint(yVals);

// console.log("DONE");

// for (let i = -1; i <= 1; i += 0.25) {
//     const scope = {
//         t: i,
//         rect: CSF.rect
//     }
//     console.log(evaluate('1/sqrt(e^2)+rect(t)', scope));
// }