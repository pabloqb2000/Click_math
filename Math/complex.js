class Complex {
    /**
     * Constructor of a new complex number
     * 
     * @param r Real part of the complex number
     * @param i Imaginary part of the complex number
     */
    constructor(r=0, i=0) {
        this.r = r;
        this.i = i;
    }

    /**
     * Conjugates this number 
     */
    conj() {
        this.i = -this.i;
        return this;
    }

    /**
     * Returns the conjugate of z
     * 
     * @param z 
     */
    static conj(z) {
        return z.copy().conj();
    }

    /**
     * If z is a complex number it adds z to this number
     * if not z is treated as a real number
     * 
     * @param z 
     */
    add(z) {
        if(z instanceof Complex) {
            this.r += z.r;
            this.i += z.i;
        } else {
            this.r += z;
        }
        return this;
    }

    /**
     * Returns a new complex number
     * result of adding z + x
     * 
     * @param z Should always be an instance of this class
     * @param x Can be complex or real
     */
    static add(z, x) {
        return z.copy().add(x);
    }

    /**
     * If z is a complex number it substracts z to this number
     * if not z is treated as a real number
     * 
     * @param z 
     */
    sub(z) {
        if(z instanceof Complex) {
            this.r -= z.r;
            this.i -= z.i;
        } else {
            this.r -= z;
        }
        return this;
    }

    /**
     * Returns a new complex number
     * result of substracting z - x
     * 
     * @param z Should always be an instance of this class
     * @param x Can be complex or real
     */
    static sub(z, x) {
        return z.copy().sub(x);
    }

    /**
     * If z is a complex number it multiplies z by this number
     * if not z is treated as a real number
     * 
     * @param z 
     */
    mult(z) {
        if(z instanceof Complex) {
            let r = this.r*z.r - this.i*z.i;
            let i = this.r*z.i + this.i*z.r;
            this.r = r;
            this.i = i;
        } else {
            this.r *= z;
            this.i *= z;
        }
        return this;
    }

    /**
     * Returns a new complex number
     * result of multipling z * x
     * 
     * @param z Should always be an instance of this class
     * @param x Can be complex or real
     */
    static mult(z, x) {
        return z.copy().mult(x);
    }

    /**
     * If z is a complex number it dividing this number by z
     * if not z is treated as a real number
     * 
     * @param z 
     */
    div(z) {
        if(z instanceof Complex) {
            this.mult(Complex.conj(z)).div(z.normSq());
        } else {
            this.r /= z;
            this.i /= z;
        }
        return this;
    }

    /**
     * Returns a new complex number
     * result of dividing z / x
     * 
     * @param z Should always be an instance of this class
     * @param x Can be complex or real
     */
    static div(z, x) {
        return z.copy().div(x);
    }

    /**
     * Returns the result of e^z
     * where z is this complex number
     */
    exp() {
        return (new Complex(cos(this.i), sin(this.i))).mult(exp(this.r));
    }

    /**
     * Return the norm of this complex number squared
     */
    normSq() {
        return this.r**2 + this.i**2;
    }

    /**
     * Returns the norm of this complex number
     */
    norm() {
        return sqrt(this.normSq());
    }

    /**
     * Returns a copy of this complex number
     */
    copy() {
        return new Complex(this.r, this.i);
    }

    /**
     * Prints this complex number in the console
     * 
     * @param n Number of decimal places to show
     */
    print(n=2) {
        console.log(this.r.toFixed(n) + " + " + this.i.toFixed(n) + "i");
        return this;
    }
}