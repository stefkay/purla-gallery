import {productType} from './productType'
import {categoryType} from './categoryType'
import {siteSettingsType} from './siteSettingsType'
import type {SchemaTypeDefinition} from 'sanity'
export const schemaTypes: SchemaTypeDefinition[] = [productType, categoryType, siteSettingsType]
