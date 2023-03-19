const { serialize, deserialize } = require('./json.js')

module.exports = {
  jsonParse,
  jsonStringify,
  prettyJsonStringify
}

function jsonParse() {
  return async function*(stream) {
    for await (const chunk of stream) {
      if (chunk.length === 0) continue
      yield deserialize(chunk)
    }
  }
}

function jsonStringify() {
  return async function*(stream) {
    for await (const frame of stream) {
      yield `${serialize(frame)}\n`
    }
  }
}

function prettyJsonStringify() {
  return async function*(stream) {
    for await (const frame of stream) {
      yield `${serialize(frame, null, '\t')}\n`
    }
  }
}
