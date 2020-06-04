class Vector {
    /**
     * 
     * @param data Array with the coordinates of the vector 
     */
    constructor(data) {
        this.n = data.length;
        this.data = data;
    }

    /**
     * Creates a vector of dimension n with all 0s
     * 
     * @param n 
     */
    static fromDim(n) {
        return new Vector(new Array(n).fill(0));
    }

    /**
     * Get the i-th coordinate
     * 
     * @param i
     */
    get(i) {
        return this.data[i];
    }

    /**
     * Returns the x coordinate of this vector
     */
    getX() {
        this.n >= 1 ? this.get(0) : 0;
    }

    /**
     * Returns the y coordinate of this vector
     */
    getY() {
        this.n >= 2 ? this.get(1) : 0;
    }

    /**
     * Returns the z coordinate of this vector
     */
    getZ() {
        this.n >= 3 ? this.get(2) : 0;
    }

    /**
     * Sets the i-th coordinate to the given v value
     * 
     * @param i 
     * @param v 
     */
    set(i, v) {
        this.data[i] = v;
        return this;
    }

    /**
     * If the given value is a vector it adds the elements one by one
     * if it is a scalar it adds the scalar to evety coordinate
     * 
     * @param v 
     */
    add(v) {
        if(v instanceof Vector) {
            return this.map((e, i) => v.get(i)+e);
        } else {
            return this.map((e) => e+v);
        }
    }

    /**
     * Creates a new vector result of adding the two given values
     * following the next rules
     * If both values are vectors it adds the elements one by one
     * If one value is a scalar it adds the scalar to evety coordinate
     * 
     * @param u
     * @param v
     */
    static add(u, v) {
        if(v instanceof Vector && v instanceof Vector) {
            return Vector.map(u, (e, i) => v.get(i)+e);
        } else {
            let V = v instanceof Vector ? v : u;
            let k = v instanceof Vector ? u : v;
            return Vector.map(V, (e) => k+e);
        }
    }

    /**
     * If the given value is a vector it substracts the elements one by one
     * if it is a scalar it substracts the scalar to evety coordinate
     * 
     * @param v 
     */
    sub(v) {
        if(v instanceof Vector) {
            return this.map((e, i) => e-v.get(i));
        } else {
            return this.map((e) => e-v);
        }
    }

    /**
     * Creates a new vector result of substracting the two given values
     * following the next rules
     * If both values are vectors it substracta the elements one by one
     * If one value is a scalar it substracts the scalar to evety coordinate
     * 
     * @param u
     * @param v
     */
    static sub(u, v) {
        if(v instanceof Vector && v instanceof Vector) {
            return Vector.map(u, (e, i) => e-v.get(i));
        } else {
            let V = v instanceof Vector ? v : u;
            let k = v instanceof Vector ? u : v;
            return Vector.map(V, (e) => e-k);
        }
    }

    /**
     * Multiplies all the coordinates by the given value
     * 
     * @param k 
     */
    mult(k) {
        return this.map((e) => e*k);
    }

    /**
     * Divides all the coordinates by the given value
     * 
     * @param k 
     */
    div(k) {
        return this.map((e) => e/k);
    }

    /**
     * Computes the l-norm of this vector
     * if l is left as 2 then the norm is the natural euclidean distance
     * 
     * @param l
     */
    norm(l=2) {
        return sqrt(this.normSq(l));
    }

    /**
     * Computes the l-norm of this vector squared (is a little more efficient than norm)
     * if l is left as 2 then the norm is the natural euclidean distance
     * 
     * @param l
     */
    normSq(l=2) {
        if(l == Infinity) return max(this.data);
        return this.data.map((e) => e**l).reduce((x,y) => x+y);
    }

    /**
     * Calculates the dot product of this vector and the given one
     * 
     * @param v 
     */
    dot(v) {
        return this.data.map((e,i) => e * v.get(i)).reduce((x,y) => x+y);
    }

    /**
     * Calculates the l-norm based distance between this vector and the given one
     * if l is left as 2 then the norm is the natural euclidean distance
     * 
     * @param v 
     */
    dist(v, l=2) {
        return Vector.sub(this, v).norm(l);
    }

    /**
     * Normalizes the vector to have l-norm = 1
     * if l is left as 2 then the norm is the natural euclidean distance
     * 
     * @param l 
     */
    normalize(l=2) {
        return this.setNorm(1, l);
    }

    /**
     * If the l-norm of this vector is > max then it is scaled down so that it is = 1
     * if l is left as 2 then the norm is the natural euclidean distance
     * 
     * @param max 
     * @param l 
     */
    limit(max, l=2) {
        let norm = this.norm(l);
        if(norm > max)
            this.setNorm(max, l);
        return this;
    }

    /**
     * Scales the vector so that its l-norm is = len
     * if l is left as 2 then the norm is the natural euclidean distance
     * 
     * @param len 
     * @param l 
     */
    setNorm(len, l=2) {
        return this.mult(len / this.norm(l));
    }

    /**
     * Linearly interpolates this vector and the given one
     * 
     * @param v 
     * @param k 
     */
    lerp(v, k) {
        return this.copy().mult(k) + v.copy().mult(1-k);
    }

    /**
     * Proyects the given vector using this one as
     * the direction of the proyection line
     * 
     * @param v 
     */
    proyect(v) {
        return this.copy().normalize().mult(this.dot(v));
    }

    /**
     * Reflects the given vector using this one as
     * the direction of the reflection line
     * 
     * @param v 
     */
    reflect(v) {
        let p = this.proyect(v);
        return p.mult(2).sub(v);
    }

    /**
     * For 2D vectors calculates the rotation in radians
     * between this vector and the positive x axis
     */
    getRot() {
        return atan2(this.get(1), this.get(0));
    }

    /**
     * For 2D vectors calculates the angle in radians
     * of going from this vector to the given one
     * 
     * @param v 
     */
    angleBetween(v) {
        return this.getRot() - v.getRot();
    }

    /**
     * For 2D vectors rotates this vector by the given angle in radians
     * 
     * @param angle
     */
    rotate(angle) {
        let v = this.copy();
        this.data[0] = cos(angle)*v.get(0) - sin(angle)*v.get(1);
        this.data[1] = sin(angle)*v.get(0) + cos(angle)*v.get(1);
    }

    /**
     * Creates a 2D vector wich 
     * forms the given angle in radians with the positive x axis
     * and has the given length
     * 
     * @param angle 
     * @param len 
     */
    static fromAngle(angle, len=1) {
        return new Vector([sin(angle)*len, cos(angle)*l]);
    }

    /**
     * Creates a random 2D unitary vector
     */
    static random2D() {
        let r = random(2*PI);
        return Vector.fromAngle(r);
    }

    /**
     * Applies the given function to every element in the vector
     * 
     * Function should be of type f(v, i)
     * where v is the value of the element and i its position
     * 
     * @param func 
     */
    map(func) {
        for(let i = 0; i < this.n; i++) {
            this.data[i] = func(this.data[i], i);
        }
        return this;
    }

    /**
     * Creates a new vector wich is the result of applying
     * the given function to the given vector
     * 
     * @param v 
     * @param func 
     */
    static map(v, func) {
        return Vector.fromDim(v.n).map((_, i) => func(v.data[i], i));
    }

    /**
     * Creates a copy of this vector
     */
    copy() {
        return Vector.fromDim(this.n).map((_, i) => this.get(i));
    }

    /**
     * Returns whether this vector equals the given one
     * 
     * @param v
     */
    equals(v) {
        return this.n == v.n && this.data.map((e,i) => e==v.get(i)).reduce((x,y) => x && y);
    }

    /**
     * Creates a vertical matrix from this vector
     */
    toMatrix() {
        return new Matrix(this.data.map(e => [e]));
    }

    /**
     * Returns the array of coordinates of this vector
     */
    toArray() {
        return this.data;
    }

    /**
     * Prints this vector in the console
     */
    print() {
        console.log("(" + this.data.map(e => e.toString()).reduce((x,y) => x + ", " + y) + ")");
        return this;
    }
}