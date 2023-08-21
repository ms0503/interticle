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

export type Social = 'coffee' | 'facebook' | 'git' | 'homepage' | 'qiita' | 'twitter' | 'zenn';

/**
 * An article data.
 *
 * @since 0.1.0
 */
export interface Article {
    /**
     * An Interticle Snowflake id of this.
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
     * An Interticle Snowflake id of author of this.
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

/**
 * An author data.
 *
 * @since 0.1.0
 */
export interface Author {
    /**
     * An Interticle Snowflake id of this.
     *
     * @since 0.1.0
     */
    id: Snowflake;

    /**
     * A display name of this.
     *
     * @since 0.1.0
     */
    name: string;

    /**
     * A description of this.
     *
     * Possibly `undefined` if this author do not set description.
     *
     * @since 0.1.0
     */
    description?: string;

    /**
     * Some social links
     *
     * @since 0.1.0
     */
    socials: Partial<{
        [service in Social]: URL | string
    }>;
}

export interface Server {
    id: number;
    url: URL | string;
}
