export function findNestedObjectById(objects, id) {
  if (objects === null || typeof objects !== 'object') {
    return null
  }

  if (objects.id === id || objects['@id'] === id) {
    return objects
  }

  if (Array.isArray(objects)) {
    for (const obj of objects) {
      const result = findNestedObjectById(obj, id)
      if (result) {
        return result
      }
    }
  } else {
    for (const key in objects) {
      const child = objects[key]
      if (typeof child === 'object' || Array.isArray(child)) {
        const result = findNestedObjectById(child, id)
        if (result) {
          return result
        }
      }
    }
  }

  return null
}

export function create(objects, id, data) {
  objects[id] = { ...data }
  return objects[id]
}

export function fetch(objects, id) {
  return findNestedObjectById(objects, id) || null
}

export function update(objects, id, data) {
  const targetObject = findNestedObjectById(objects, id)

  if (!targetObject) {
    return null
  }

  Object.assign(targetObject, data)
  return targetObject
}

export function deleteObject(objects, id) {
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

export function importJSON(objects, json) {
  const inputData = JSON.parse(json)

  inputData.forEach((item) => {
    const { '@id': id, ...data } = item
    create(objects, id, data)
  })
}

export function exportJSON(objects) {
  const outputData = Object.keys(objects).map((id) => {
    return { '@id': id, ...objects[id] }
  })

  return JSON.stringify(outputData, null, 2)
}
