import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, strict: false });

/**
 * Valida um payload contra um JSON Schema e falha o teste com a lista de
 * violações. Verificar campo a campo com `expect` não detecta campo novo
 * nem tipo alterado — o schema trava o contrato inteiro de uma vez.
 */
export function validateSchema(schema, payload) {
  const validate = ajv.compile(schema);
  const valid = validate(payload);

  if (!valid) {
    const errors = validate.errors
      .map((e) => `  ${e.instancePath || '(raiz)'} ${e.message}`)
      .join('\n');
    throw new Error(`Payload não corresponde ao schema:\n${errors}`);
  }

  return true;
}
