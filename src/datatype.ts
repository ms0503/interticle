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
     * An Interticle Snowflake ID of article.
     *
     * @since 0.1.0
     */
    id: Snowflake;

    /**
     * An article title.
     *
     * @since 0.1.0
     */
    title: string;

    /**
     * An Interticle Snowflake ID of author.
     *
     * @since 0.1.0
     */
    author_id: Snowflake;

    /**
     * An original url of article if this is on an external server.
     */
    origin_url?: string;
}
