/**
 * handles json serialization/deserializion
 *
 * seems like there's an issue with throwing inside async generators inside a pipeline :(
 * https://github.com/nodejs/node/issues/33792
 * also reporting errors when they happen really helps with debugging
 */

module.exports.serialize = function serialize (object, _, spacer) {
  try {
    return JSON.stringify(object, serializeBigInt, spacer)
  } catch (e) {
    console.error('failed to JSON.stringify', object)
    console.error(e)
    throw e
  }
}

function serializeBigInt (key, value) {
  return typeof value === 'bigint' ? `BIGINT::${value}` : value
}

module.exports.deserialize = function deserialize (text) {
  try {
    return JSON.parse(text, deserializeBigInt)
  } catch (e) {
    console.error('failed to JSON.parse', text)
    console.error(e)
    throw e
  }
}

function deserializeBigInt (key, value) {
  if (typeof value === 'string' && value.startsWith('BIGINT::')) {
    return BigInt(value.substr(8))
  }

  return value
}