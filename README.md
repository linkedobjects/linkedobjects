![Linked Objects](./cover.png)

![GitHub repo size](https://img.shields.io/github/repo-size/linkedobjects/linkedobjects)
![GitHub contributors](https://img.shields.io/github/contributors/linkedobjects/linkedobjects)
![GitHub stars](https://img.shields.io/github/stars/linkedobjects/linkedobjects)

# Introduction

Linked Objects is a specification that simplifies the handling of nested objects and references by using URLs as identifiers. It is designed as a subset of JSON-LD, offering a more straightforward approach with a compatible upgrade path. This README provides an introduction to Linked Objects, its notation (LION), and how to get started.

# What is a Linked Object?

A [Linked Object](https://linkedobjects.org/) is an object that you retrieve from a URL, with the URL serving as its identifier. This approach allows for more efficient handling of nested objects and references, enabling independent updates of objects and the referencing of objects within multiple different contexts.

# Benefits of Linked Objects

Linked Objects offer several advantages over traditional methods:

1. Simplified object handling: By using URLs as identifiers, developers can easily reference and manage nested objects, resulting in cleaner and more organized code.
2. Independent updates: Linked Objects can be updated independently of one another, ensuring that changes to one object do not inadvertently affect others.
3. Reusability: Since objects are referenced by their URLs, they can be reused across multiple contexts, reducing duplication and promoting consistency.
4. Compatibility: Linked Objects Notation (LION) is a subset of JSON-LD, allowing for seamless interoperability and an easy upgrade path.

It allows you to update nested objects independently of each other and reference them within multiple different objects since they are by reference.

# Linked Object Notation (LION)

LION is a simple subset of JSON-LD, designed to avoid most of its complexity and enable developers to get started quickly using a familiar notation. LION is compatible with JSON-LD and offers a full upgrade path.

# Examples

## Basic Example

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

## Complex Example

```html
<script type="application/ld+json">
  {
    "@id": "http://example.org/album/1",
    "name": "Example Album",
    "releaseDate": "2023-01-01",
    "tracks":
    [
      {
        "@id": "http://example.org/track/1",
        "@type": "Track",
        "name": "Track 1",
        "duration": "3:45"
      },
      {
        "@id": "http://example.org/track/2",
        "@type": "Track",
        "name": "Track 2",
        "duration": "4:32"
      }
    ],
    "artist": {
      "@id": "http://example.org/artist/1",
      "@type": "Artist",
      "name": "Example Artist",
      "birthDate": "1990-01-01"
    }
  }
</script>
```

# Key Concepts

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
- [JSON Pointer](https://tools.ietf.org/html/rfc6901)
- [JSON Path](https://goessner.net/articles/JsonPath/)
- [Semantic Object in JSON](http://markbirbeck.com/2009/04/20/rdfj-semantic-objects-in-json/)
- [JSON-LD Origins](http://manu.sporny.org/2014/json-ld-origins/)

# Contribute to Linked Objects

Linked Objects is an open-source project under the MIT license. We welcome contributions and feedback to help improve this specification. To contribute, visit our GitHub [repository](https://github.com/linkedobjects/linkedobjects) or open an [issue](https://github.com/linkedobjects/linkedobjects/issues)
