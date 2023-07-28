/**
 * Utilities
 *
 * @file This file defines some utilities.
 * @author Sora Tonami <ms0503@outlook.com>
 * @copyright Copyright (C) 2023 Sora Tonami
 * @license MIT License
 * @since 0.1.0
 */

'use strict';

/**
 * Returns a string padded with pad string.
 *
 * @since 0.1.0
 *
 * @param input An input string.
 * @param cols  A number of columns.
 * @param pad   A pad character.
 *
 * @returns string A padded string.
 */
export function padding(input: number | string, cols: number, pad = '0'): string {
    return (Array(Math.ceil(cols / pad.length)).join(pad) + String(input)).slice(-cols);
}
