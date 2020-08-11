![Linked Objects](./cover.png)

# What is a Linked Object?

A [linked object](https://linkedobjects.org/) is is an object which you get from an URL, the URL is its id.

# What are the Benefits?

It allows you to update nested objects independently of each other and reference them within multiple different objects since they are by reference.

# Linked Object Notation (LION)

The Linked Objects Notation (LION) is a simple subset of [JSON-LD](https://json-ld.org/). It aims to avoid most of the complexity, and enables getting started quickly, using a familiar notation. LION is compatible with JSON-LD and offers a full upgrade path.

# A Simple Example

```html
<script type="application/ld+json">
  {
    "@id": "http://dbpedia.org/resource/John_Lennon",
    "name": "John Lennon",
    "born": "1940-10-09",
    "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
  }
</script>
```

## @id

@id is the URL of the object. It can also be written "id". The @id can be absolute or relative. @id is optional but recommended, and makes an object into an Linked Object.

## @type

@type is the type of for that object. It can also be written "type". @type normally maps to a URL. Type is optional.

## @context

@context is optional. It provides full compatibility with JSON-LD and and maps various items in the object to URLs in a more readable way.

## Spec

Full details on @id, @type and @context can be found in [here](https://w3c.github.io/json-ld-syntax/#syntax-tokens-and-keywords)

## References

- [JSON-LD 1.1](https://w3c.github.io/json-ld-syntax/)
- [JSON Tiny Proposal](https://lists.w3.org/Archives/Public/public-rdf-wg/2011Mar/0565.html)

# Linked Objects is Open Source

Linked Objects is open source under the MIT license. Please visit our [repository](https://github.com/linkedobjects/linkedobjects) or raise an [issue](https://github.com/linkedobjects/linkedobjects/issues)
