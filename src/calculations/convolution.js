class ComputationalIntegration {
    static trapezoid(func, lowerBound, upperBound, numDivisions) {
        var h = (upperBound - lowerBound) / numDivisions;
        var result = (func(lowerBound) + func(upperBound)) / 2;
        for (let i = 1; i < numDivisions; ++i) {
            result += func(lowerBound + i * h);
        }
        result *= h;
        return result;
    }

    static midpoint(func, lowerBound, upperBound, numDivisions) {
        var h = (upperBound - lowerBound) / numDivisions;
        var result = 0;
        for (let i = 0; i < numDivisions; ++i) {
            result += func(lowerBound + h/2 + i*h);
        }
        result *= h;
        return result;
    }
}

// Continuous Singularity Functions
export class CSF {
    static impulse(t) {
        return CSF.rect(10*t);
    }

    static unitStep(t) {
        if (t < 0)
            return 0;
        else if (t > 0)
            return 1;
        return 0.5;
    }
    
    static rect(t) {
        if (Math.abs(t) < 0.5)
            return 1;
        else if (Math.abs(t) > 0.5)
            return 0;
        return 0.5;
    }
    
    static ramp(t) {
        if (t >= 0)
            return t;
        return 0;
    }

    static triangle(t) {
        if (-1 <= t && t <= 0)
            return t + 1;
        else if (0 < t && t <= 1)
            return -t + 1;
        return 0;
    }

    static signum(t) {
        if (t < 0)
            return -1;
        else if (t > 0)
            return 1;
        return 0;
    }

    static sawtooth(t) {
        if (0 <= t && t <= 1)
            return t;
        return 0;
    }
}

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
        let boundedF = (t) => this.f(t) * CSF.rect((t - midpoint) / scale);
        let boundedH = (t) => this.h(t) * CSF.rect((t - midpoint) / scale);
    
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