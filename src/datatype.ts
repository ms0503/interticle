/**
 * Interticle data types
 *
 * @file This file defines types for sharing data between servers.
 * @author Sora Tonami <ms0503@outlook.com>
 * @copyright Copyright (C) 2023 Sora Tonami
 * @license MIT License
 * @since 0.1.0
 */

'use strict';

import type { Snowflake } from './snowflake';

/**
 * An article data.
 *
 * @since 0.1.0
 */
export interface Article {
    /**
     * An Interticle Snowflake ID of this.
     *
     * @since 0.1.0
     */
    id: Snowflake;

    /**
     * A title of this.
     *
     * @since 0.1.0
     */
    title: string;

    /**
     * An Interticle Snowflake ID of author of this.
     *
     * @since 0.1.0
     */
    author_id: Snowflake;

    /**
     * An original url of this.
     *
     * Possibly `undefined` if this is not on an external server.
     *
     * @since 0.1.0
     */
    origin_url?: string;
}
