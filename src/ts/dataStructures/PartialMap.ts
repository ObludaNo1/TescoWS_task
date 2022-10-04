import { NotNull } from "../types/Types";

export class PartialMapNode<T extends NotNull> {
    /**
     * All possible letters
     */
    protected subNodes: Record<string, PartialMapNode<T>> = {};

    /**
     * Value of node
     */
    protected value?: T;

    constructor() {}

    /**
     * Add value to data structure
     * @param letters letters of key
     * @param index index in letters array
     * @param value value to place
     * @returns if successful. Only one value can exist for one node
     */
    add(letters: string[], index: number, value: T): boolean {
        if (index >= letters.length) {
            if (this.value) {
                return false;
            } else {
                this.value = value;
                return true;
            }
        }

        const letter = letters[index];
        let next = this.subNodes[letter];
        if (!next) {
            next = new PartialMapNode<T>();
            this.subNodes[letter] = next;
        }
        return next.add(letters, index + 1, value);
    }

    /**
     * Get value of node
     * @param letters array of letters of key
     * @param index index in letters array
     * @returns value or undefined if no such value
     */
    get(letters: string[], index: number): T | undefined {
        if (index >= letters.length) {
            return this.value;
        }

        const next = this.subNodes[letters[index]];
        if (!next) {
            return undefined;
        } else {
            return next.get(letters, index + 1);
        }
    }

    /**
     * Get values begining at some key
     * @param letters key for picking values
     * @param index current index in letters array
     * @param amount maximum amount of result to place into result
     * @param result array of results
     */
    getFollowingValues(
        letters: string[],
        index: number,
        amount: number,
        result: T[]
    ): void {
        if (index >= letters.length) {
            this.pickFollowingValues(amount, result);
        } else {
            const next = this.subNodes[letters[index]];
            if (!next) {
                this.pickFollowingValues(amount, result);
            } else {
                return next.getFollowingValues(
                    letters,
                    index + 1,
                    amount,
                    result
                );
            }
        }
    }

    /**
     * Gets value of first node in alphabethical order
     * @returns key of undefined
     */
    getFirstKeyValue(): T | undefined {
        if (this.value) {
            return this.value;
        }

        const entries = Object.entries(this.subNodes);

        // if there are entries
        if (entries.length) {
            let firstKeyNode;

            // if at least two
            if (entries.length >= 2) {
                // find minimum
                firstKeyNode = entries.reduce((prev, cur) =>
                    prev[0].localeCompare(cur[0]) < 0 ? prev : cur
                )[1];
            } else {
                // if there is only one
                firstKeyNode = entries[0][1];
            }

            if (firstKeyNode.value) {
                return firstKeyNode.value;
            } else {
                return firstKeyNode.getFirstKeyValue();
            }
        } else {
            return undefined;
        }
    }

    /**
     * Pick first N (=amount) values of all successor nodes (recursively) and place them into resulting array
     * @param amount amount of nodes
     * @param result resulting array
     */
    private pickFollowingValues(amount: number, result: T[]): void {
        if (amount <= 0) {
            return;
        }
        if (this.value) {
            result.push(this.value);
            amount--;
            if (amount <= 0) {
                return;
            }
        }

        const entries = Object.entries(this.subNodes);
        entries.sort((a, b) => a[0].localeCompare(b[0]));

        const mapped = entries.map(([_, v]) => v);
        for (let i = 0; i < mapped.length; i++) {
            const subNode = mapped[i];
            subNode.pickFollowingValues(amount, result);
            if (amount <= 0) {
                return;
            }
        }
    }
}

/**
 * Class for managing and searching
 */
export class PartialMap<T extends NotNull> {
    protected root: PartialMapNode<T>;

    constructor() {
        this.root = new PartialMapNode<T>();
    }

    add(key: string, value: T): boolean {
        return this.root.add(key.toLocaleLowerCase().split(""), 0, value);
    }

    get(key: string): T | undefined {
        return this.root.get(key.toLocaleLowerCase().split(""), 0);
    }

    getFollowingValues(key: string, amount: number, result: T[]): void {
        return this.root.getFollowingValues(
            key.toLocaleLowerCase().split(""),
            0,
            amount,
            result
        );
    }
}
