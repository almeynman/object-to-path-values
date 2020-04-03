The package allows to parse plain javascript object into an array of { path, value } tuples, i.e.
```
    import { parseTree } from 'object-to-path-values'

    const pathValues = parseTree({
      key1: 'a1',
      key2: {
        key3: {},
        key4: ['a2', 'a3', { key5: 'a4', key6: [], key7: {} }],
        key8: {
          key9: {
            key10: 'a5',
          },
        },
      },
      key11: 'a6',
    })
    expect(pathValues).toEqual([
      { path: ['key1'], value: 'a1' },
      { path: ['key2', 'key3'], value: {} },
      { path: ['key2', 'key4', 0], value: 'a2' },
      { path: ['key2', 'key4', 1], value: 'a3' },
      { path: ['key2', 'key4', 2, 'key5'], value: 'a4' },
      { path: ['key2', 'key4', 2, 'key6'], value: [] },
      { path: ['key2', 'key4', 2, 'key7'], value: {} },
      { path: ['key2', 'key8', 'key9', 'key10'], value: 'a5' },
      { path: ['key11'], value: 'a6' },
    ])
```

It also allows you to go back from pathValues to object, i.e.
```
    import { toTree } from 'object-to-path-values'

    const tree = toTree([
      { path: ['key1'], value: 'a1' },
      { path: ['key2', 0], value: 'a2' },
      { path: ['key2', 1, 'key3'], value: 'a3' },
      { path: ['key4'], value: 'a4' },
    ])
    expect(tree).toEqual({
      key1: 'a1',
      key2: ['a2', { key3: 'a3' }],
      key4: 'a4',
    })
```

There is a known issue: toTree cannot handle arrays of different types, i.e.
```
{
  ...
  key4: ['a2', 'a3', { key5: 'a4', key6: [], key7: {} }] // mixed type would fail
  ...
}
```