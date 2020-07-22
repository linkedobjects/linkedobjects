# What is a Linked Object?

A [linked object](https://linkedobjects.org/) is is an object which you get from an URL, the URL is it's id

# What are the Benefits?

It allows you to update nested objects independently of each other and reference them within multiple different objects since they are by reference

# Linked Object Notation (LION)

The Linked Objects Notation (LION) is a simple subset of [JSON-LD](https://json-ld.org/).  It aims to avoid most of the complexity, and enables getting started quickly, using a familair notation.  LION is compatible with JSON-LD and offers a full upgrade path.

# A Simple Example

```json
{
  "@id": "http://dbpedia.org/resource/John_Lennon",
  "name": "John Lennon",
  "born": "1940-10-09",
  "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
}
```

