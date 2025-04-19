import { type SchemaTypeDefinition } from 'sanity';
import { schemaTypes } from '../../../studio/schemaTypes';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes as SchemaTypeDefinition[],
};
