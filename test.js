// test.js
import { LinkedObjects } from './index.js'

const linkedObjects = new LinkedObjects()

// Import JSON data
const jsonData = `[
  {
    "@id": "http://dbpedia.org/resource/John_Lennon",
    "name": "John Lennon",
    "born": "1940-10-09",
    "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
  },
  {
    "@id": "http://dbpedia.org/resource/Cynthia_Lennon",
    "name": "Cynthia Lennon",
    "born": "1939-09-10"
  }
]`

linkedObjects.importJSON(jsonData)
console.log('Imported JSON data.')

// Fetch the Linked Object
const fetchedJohnLennon = linkedObjects.fetch('http://dbpedia.org/resource/John_Lennon')
console.log('Fetched Linked Object: John Lennon.')

// Update the Linked Object
const updatedJohnLennon = linkedObjects.update('http://dbpedia.org/resource/John_Lennon', {
  spouse: 'http://dbpedia.org/resource/Yoko_Ono'
})
console.log('Updated Linked Object: John Lennon.')

// Export JSON data
const exportedJSON = linkedObjects.exportJSON()
console.log('Exported JSON data.')

// Delete the Linked Object
const isDeleted = linkedObjects.delete('http://dbpedia.org/resource/John_Lennon')
console.log('Deleted Linked Object: John Lennon.')

// Print data and commands to the page
const outputElement = document.createElement('div')
outputElement.innerHTML = `
  <h2>Commands Run and Corresponding JavaScript Code</h2>
  <table>
    <tr>
      <td>Imported JSON data</td>
    </tr>
    <tr>
      <td><code>linkedObjects.importJSON(jsonData);</code></td>
    </tr>
    <tr>
      <td>Fetched Linked Object: John Lennon</td>
    </tr>
    <tr>
      <td><code>linkedObjects.fetch("http://dbpedia.org/resource/John_Lennon");</code></td>
    </tr>
    <tr>
      <td>Updated Linked Object: John Lennon</td>
    </tr>
    <tr>
      <td><code>linkedObjects.update("http://dbpedia.org/resource/John_Lennon", { spouse: "http://dbpedia.org/resource/Yoko_Ono" });</code></td>
    </tr>
    <tr>
      <td>Exported JSON data</td>
    </tr>
    <tr>
      <td><code>linkedObjects.exportJSON();</code></td>
    </tr>
    <tr>
      <td>Deleted Linked Object: John Lennon</td>
    </tr>
    <tr>
      <td><code>linkedObjects.delete("http://dbpedia.org/resource/John_Lennon");</code></td>
    </tr>
  </table>
  <h2>Fetched Linked Object</h2>
  <pre>${JSON.stringify(fetchedJohnLennon, null, 2)}</pre>
  <h2>Updated Linked Object</h2>
  <pre>${JSON.stringify(updatedJohnLennon, null, 2)}</pre>
  <h2>Exported JSON Data</h2>
  <pre>${exportedJSON}</pre>
`
document.body.appendChild(outputElement)
