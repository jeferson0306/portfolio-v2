# Validators

`br.ts` and `person.ts` are **copied verbatim** from
`dev-standards/validations/typescript`. Do not fix bugs here — fix them in
dev-standards and copy the file down again, or the two will drift.

`card.ts` is local: dev-standards has no card validator, and the Go service this
console mirrors (`api-data-validator`) does check card numbers.
