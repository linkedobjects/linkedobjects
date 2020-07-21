# What is a Linked Object?

A linked object is is an object which you get from an URL, the URL is it's id

# What are the Benefits?

It allows you to update nested objects independently of each other and reference them within multiple different objects since they are by reference

# What is the Syntax?

Linked Objects is a very simple subset of [JSON-LD](https://json-ld.org/) in order to get started quickly.  It is compatible and offers a full upgrade path.

# A Simple Example

```json
{
  "@id": "http://dbpedia.org/resource/John_Lennon",
  "name": "John Lennon",
  "born": "1940-10-09",
  "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
}
```

