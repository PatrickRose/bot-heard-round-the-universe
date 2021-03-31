export interface Optional<T> {
    valid: boolean,
    unwrap: () => T
}

export class Valid<T> implements Optional<T> {
    private value: T;
    
    valid = true;
    
    constructor(value: T) {
        this.value = value
    }

    unwrap(): T {
        return this.value
    }
}

export class Invalid<T> implements Optional<T> {
    valid = false;

    unwrap(): T {
        throw new Error('Attempted to unwrap an invalid option');
    }
}
