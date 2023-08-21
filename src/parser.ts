/**
 * Interticle data parsers
 *
 * @file This file defines parsers for data.
 * @author Sora Tonami <ms0503@outlook.com>
 * @copyright Copyright (C) 2023 Sora Tonami
 * @license MIT License
 * @since 0.1.0
 */

'use strict';

import { Article } from './datatype';
import { Snowflake } from './snowflake';

export function parseArticle(json: string): Article {
    return JSON.parse(json, (k, v) => {
        switch(k) {
            case 'id':
            case 'author_id':
                return BigInt(v as string);
        }
        return v;
    });
}

export function stringifyArticle(article: Article): string {
    return JSON.stringify(article, (k, v) => {
        switch(k) {
            case 'id':
            case 'author_id':
                return (v as Snowflake).toString();
        }
        return v;
    });
}
