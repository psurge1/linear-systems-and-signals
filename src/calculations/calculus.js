export class ComputationalIntegration {
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