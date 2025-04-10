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