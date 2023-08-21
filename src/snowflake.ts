/**
 * Interticle Snowflake
 *
 * @file This file defines the Interticle Snowflake type and generator.
 * @author Sora Tonami <ms0503@outlook.com>
 * @copyright Copyright (C) 2023 Sora Tonami
 * @license MIT License
 * @since 0.1.0
 */

'use strict';

/**
 * Interticle Snowflake Epoch
 *
 * 2023-01-01T00:00:00.000Z
 *
 * @since 0.1.0
 *
 * @constant
 */
export const SNOWFLAKE_EPOCH = 1672531200000;

/**
 * Interticle Snowflake
 *
 * @since 0.1.0
 */
export class Snowflake {
    /**
     * A raw Snowflake data.
     *
     * @since 0.1.0
     * @access private
     */
    private id: bigint;

    /**
     * Creates a Snowflake object.
     *
     * @since 0.1.0
     * @access public
     *
     * @class
     *
     * @param id    A raw Snowflake data.
     * @param radix A radix of the id if id is provided as string.
     *
     * @throws RangeError Thrown if `radix` is undefined when `id` is string.
     */
    public constructor(id: bigint | string, radix?: 2 | 8 | 10 | 16) {
        switch(typeof id) {
            case 'bigint':
                this.id = id;
                break;
            case 'string':
                if(!radix) throw new RangeError();
                switch(radix) {
                    case 2:
                        this.id = BigInt(`0b${id}`);
                        break;
                    case 8:
                        this.id = BigInt(`0o${id}`);
                        break;
                    case 10:
                        this.id = BigInt(id);
                        break;
                    case 16:
                        this.id = BigInt(`0x${id}`);
                        break;
                    default:
                        throw new Error();
                }
                break;
            default:
                throw new Error();
        }
    }

    /**
     * Returns the Snowflake timestamp.
     *
     * @since 0.1.0
     * @access public
     *
     * @returns number The timestamp of this.
     */
    public getTimestamp(): number {
        return parseInt(this.id.toString(2).slice(1, 42), 2);
    }

    /**
     * Returns the Snowflake internal server id.
     *
     * @since 0.1.0
     * @access public
     *
     * @returns number The internal server id of this.
     */
    public getInternalServerId(): number {
        return parseInt(this.id.toString(2).slice(42, 52), 2);
    }

    /**
     * Returns the Snowflake sequence.
     *
     * @since 0.1.0
     * @access public
     *
     * @returns number The sequence of this.
     */
    public getSequenceId(): number {
        return parseInt(this.id.toString(2).slice(52), 2);
    }

    /**
     * Returns a string representing the specified `BigInt` value. The trailing "n" is not part of the string.
     *
     * @since 0.1.0
     * @access public
     *
     * @param radix An integer in the range 2 through 36 specifying the base to use for representing the BigInt value. Defaults to 10.
     *
     * @returns string A string representing the specified `BigInt` value.
     * @throws RangeError Thrown if `radix` is less than 2 or greater than 36.
     */
    public toString(radix?: number): string {
        return this.id.toString(radix);
    }
}

/**
 * Interticle Snowflake generator
 *
 * @since 0.1.0
 */
export class SnowflakeGenerator {
    /**
     * A last generated timestamp.
     *
     * @since 0.1.0
     * @access private
     */
    private lastTimestamp: number;

    /**
     * A sequence.
     *
     * @since 0.1.0
     * @access private
     */
    private sequence: number;

    /**
     * Creates a SnowflakeGenerator object.
     *
     * @since 0.1.0
     * @access public
     *
     * @class
     */
    public constructor() {
        this.lastTimestamp = Date.now() - SNOWFLAKE_EPOCH;
        this.sequence = 0;
    }

    /**
     * Generates a next Interticle Snowflake id.
     *
     * @since 0.1.0
     * @access public
     *
     * @returns Snowflake A generated Interticle Snowflake id.
     * @throws Error Thrown when clock moved backwards.
     */
    public nextId(): Snowflake {
        let timestamp: number = Date.now();
        if(this.lastTimestamp == timestamp) {
            this.sequence = this.sequence + 1 & 0b111111111111;
            if(this.sequence == 0) timestamp = this.tilNextMillis(this.lastTimestamp);
        } else this.sequence = 0;
        if(timestamp < this.lastTimestamp) {
            console.error('clock is moving backwards.  Rejecting requests until %d.', this.lastTimestamp);
            throw new Error(`Clock moved backwards.  Refusing to generate id for ${this.lastTimestamp - timestamp} milliseconds`);
        }
        this.lastTimestamp = timestamp;
        return this.generateSnowflakeFromElements(timestamp - SNOWFLAKE_EPOCH, 0, this.sequence);
    }

    /**
     * Tiles next millisecond.
     *
     * @since 0.1.0
     * @access private
     *
     * @param lastTimestamp A last generated timestamp.
     *
     * @returns number A next millisecond timestamp.
     */
    private tilNextMillis(lastTimestamp: number): number {
        let timestamp: number = Date.now();
        while(timestamp <= lastTimestamp) timestamp = Date.now();
        return timestamp;
    }

    /**
     * Generates Interticle Snowflake from id elements.
     *
     * @since 0.1.0
     * @access private
     *
     * @param timestamp        A timestamp for generating.
     * @param internalServerId A internal server id for generating.
     * @param sequence         A sequence for generating.
     *
     * @returns Snowflake A generated Interticle Snowflake.
     */
    private generateSnowflakeFromElements(timestamp: number, internalServerId: number, sequence: number): Snowflake {
        const t: string = timestamp.toString(2).padStart(41, '0');
        const i: string = internalServerId.toString(2).padStart(10, '0');
        const s: string = sequence.toString(2).padStart(12, '0');
        return new Snowflake(t + i + s, 2);
    }
}
