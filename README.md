# Personal Budget APIs

Using [Envelope Budgeting principles](https://www.thebalancemoney.com/what-is-envelope-budgeting-1293682), this API should allow users to manage budget envelopes and track the balance of each envelope.

### GET
**/api**<br>
Get all envelopes.

**/api/:envelopeId**<br>
Get specific envelope by ID.

### POST
**/api**<br>
Adds new envelope.
```
{
  "category": "Bills",
  "budget": 100,
}
```

**/api/transfer/:from/:to**<br>
Transfer budget from an envelope to another envelope's budget.
```
{
  "budget": 100,
}
```

### PUT
**/api/:envelopeId**<br>
Edit an envelope.

### DELETE
**/api/:envelopeId**<br>
Deletes an envelope.
