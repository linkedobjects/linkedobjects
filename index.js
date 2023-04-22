// linkedObjects.js
function _findNestedObjectById (objects, id) {
  if (objects[id]) {
    return objects[id]
  }

  for (const key in objects) {
    if (typeof objects[key] === 'object') {
      const result = _findNestedObjectById(objects[key], id)
      if (result) {
        return result
      }
    }
  }

  return null
}

export function create (objects, id, data) {
  objects[id] = { ...data }
  return objects[id]
}

export function fetch (objects, id) {
  return _findNestedObjectById(objects, id) || null
}

export function update (objects, id, data) {
  const targetObject = _findNestedObjectById(objects, id)

  if (!targetObject) {
    return null
  }

  Object.assign(targetObject, data)
  return targetObject
}

export function deleteObject (objects, id) {
  if (objects[id]) {
    delete objects[id]
    return true
  }

  for (const key in objects) {
    if (typeof objects[key] === 'object') {
      const result = deleteObject(objects[key], id)
      if (result) {
        return true
      }
    }
  }

  return false
}

export function importJSON (objects, json) {
  const inputData = JSON.parse(json)

  inputData.forEach((item) => {
    const { '@id': id, ...data } = item
    create(objects, id, data)
  })
}

export function exportJSON (objects) {
  const outputData = Object.keys(objects).map((id) => {
    return { '@id': id, ...objects[id] }
  })

  return JSON.stringify(outputData, null, 2)
}
