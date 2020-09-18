import { DMMF } from '@prisma/generator-helper';
import { generateTables } from './table';
import { generateEnums } from './enums';
import { generateRelations, manyToOne } from './relations';
import { generateManyToManyTables } from './many-to-many-tables';

export const autoGeneratedComment = `//// ------------------------------------------------------
//// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
//// ------------------------------------------------------`;

export function generateDBMLSchema(
  dmmf: DMMF.Document,
  allowManyToMany: boolean = true
): string {
  const tables = generateTables(dmmf.datamodel.models);
  const manyToManyTables = allowManyToMany
    ? generateManyToManyTables(dmmf.datamodel.models)
    : [];
  const enums = generateEnums(dmmf.datamodel.enums);
  const refs = generateRelations(dmmf.datamodel.models);

  return [
    autoGeneratedComment,
    ...tables,
    ...manyToManyTables,
    ...enums,
    ...refs,
  ].join('\n\n');
}
