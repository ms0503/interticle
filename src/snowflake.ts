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

import { padding } from '.';

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
     * Returns the Snowflake machine ID.
     *
     * @since 0.1.0
     * @access public
     *
     * @returns number The machine ID of this.
     */
    public getMachineId(): number {
        return parseInt(this.id.toString(2).slice(42, 52), 2);
    }

    /**
     * Returns the Snowflake datacenter ID.
     *
     * @since 0.1.0
     * @access public
     *
     * @returns number The datacenter ID of this.
     */
    public getDatacenterId(): number {
        return parseInt(this.id.toString(2).slice(42, 47), 2);
    }

    /**
     * Returns the Snowflake worker ID.
     *
     * @since 0.1.0
     * @access public
     *
     * @returns number The worker ID of this.
     */
    public getWorkerId(): number {
        return parseInt(this.id.toString(2).slice(47, 52), 2);
    }

    /**
     * Returns the Snowflake sequence ID.
     *
     * @since 0.1.0
     * @access public
     *
     * @returns number The sequence ID of this.
     */
    public getSequenceId(): number {
        return parseInt(this.id.toString(2).slice(52), 2);
    }

    /**
     * Returns a string representing the specified {@link `BigInt`} value. The trailing "n" is not part of the string.
     *
     * @since 0.1.0
     * @access public
     *
     * @param radix An integer in the range 2 through 36 specifying the base to use for representing the BigInt value. Defaults to 10.
     *
     * @returns string A string representing the specified {@link `BigInt`} value.
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
     * A sequence ID.
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
     * Generates a next Interticle Snowflake ID.
     *
     * @since 0.1.0
     * @access public
     *
     * @returns Snowflake A generated Interticle Snowflake ID.
     * @throws Error Thrown when clock moved backwards.
     */
    public nextId(): Snowflake {
        let timestamp: number = Date.now();
        if(this.lastTimestamp == timestamp) {
            this.sequence = parseInt((Array(12).join('0') + (this.sequence + 1).toString(2)).slice(-12), 2);
            if(this.sequence == 0) timestamp = this.tilNextMillis(this.lastTimestamp);
        } else this.sequence = 0;
        if(timestamp < this.lastTimestamp) {
            console.error('clock is moving backwards.  Rejecting requests until %d.', this.lastTimestamp);
            throw new Error(`Clock moved backwards.  Refusing to generate id for ${this.lastTimestamp - timestamp} milliseconds`);
        }
        this.lastTimestamp = timestamp;
        return this.generateSnowflakeFromElements(timestamp - SNOWFLAKE_EPOCH, 0, 0, this.sequence);
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
     * Generates Interticle Snowflake from ID elements.
     *
     * @since 0.1.0
     * @access private
     *
     * @param timestamp    A timestamp for generating.
     * @param datacenterId A datacenter ID for generating.
     * @param workerId     A worker ID for generating.
     * @param sequence     A sequence ID for generating.
     *
     * @returns Snowflake A generated Interticle Snowflake.
     */
    private generateSnowflakeFromElements(timestamp: number, datacenterId: number, workerId: number, sequence: number): Snowflake {
        const t: string = padding(timestamp, 41);
        const d: string = padding(datacenterId, 5);
        const w: string = padding(workerId, 5);
        const s: string = padding(sequence, 12);
        return new Snowflake(t + d + w + s, 2);
    }
}
