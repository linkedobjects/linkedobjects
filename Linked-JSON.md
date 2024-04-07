## Linked-JSON Spec (Subset of JSON-LD)

**Abstract:**

This document proposes a lightweight data format called Linked-JSON, inspired by JSON-LD. It focuses on simplifying linking capabilities within JSON by introducing a single key to link data elements to external resources.

**Syntax:**

Linked-JSON extends standard JSON syntax by adding a special key named `@id` to represent a Uniform Resource Identifier (URI).

**Example:**

```json
{
  "@id": "https://example.com/resource-1",
  "name": "Alice",
  "friend": {
    "@id": "https://example.com/resource-2",
    "name": "Bob"
  }
}
```

**Semantics:**

* The `@id` key associates a URI with the enclosing JSON object. This URI serves as a hyperlink to an external resource that provides additional information about the object.
* Nested objects can also have their own `@id` key, allowing for a network of linked data within a single JSON structure.

**Conformance:**

* Processors for Linked-JSON MUST recognize and interpret the `@id` key.
* When serializing data to Linked-JSON, processors SHOULD use the `@id` key to represent URIs.

**Relationship to JSON-LD:**

* Linked-JSON is a minimal extension of JSON, similar to JSON-LD in its core functionality (data linking).
* However, Linked-JSON focuses solely on the `@id` key for linking, omitting additional JSON-LD features like context definitions and typing.

**Benefits:**

* Simple and easy-to-learn syntax compared to full JSON-LD.
* Leverages existing JSON knowledge for seamless implementation.
* Enables basic data linking for interoperability between resources.

**Limitations:**

* Lacks the rich context definition and typing capabilities of JSON-LD.
* May not be suitable for complex data linking scenarios requiring more advanced features.

**Next Steps:**

* Prototype implementations to explore Linked-JSON in practical use cases.
* Community discussion and feedback on potential enhancements or integration with other data formats.

**Disclaimer:**

This Linked-JSON Micro-Spec is a proposal and may be subject to change based on community feedback and further development efforts.
