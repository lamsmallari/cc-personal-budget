# Personal Budget APIs

Using [Envelope Budgeting principles](https://www.thebalancemoney.com/what-is-envelope-budgeting-1293682), this API should allow users to manage budget envelopes and track the balance of each envelope.

### GET
**/api** 
Get all envelopes.

**/api/:envelopeId** 
Get specific envelope by ID.

### POST
**/api** 
Adds new envelope.
```
{
  "category": "Bills",
  "budget": 100,
}
```

**/api/transfer/:from/:to** 
Transfer budget from an envelope to another envelope's budget.
```
{
  "budget": 100,
}
```

### PUT
**/api/:envelopeId** 
Edit an envelope.

### DELETE
**/api/:envelopeId** 
Deletes an envelope.
