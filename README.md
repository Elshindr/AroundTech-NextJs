# g2-missions

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Connect the database

We use wamp to create the database named around-tech. 
Open your localhost and import the sql file (SQL creation script in `Documentations`).

## .Env
You (maybe) have to update this file with .env.local:
  - host name: DB_HOST
  - database name: DB_DATABASE
  - user: DB_USER
  - password: DB_PASSWORD
  - url: NEXT_PUBLIC_APP_URL
  
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Absence management

Run the development json-server (use to install json-server):
```bash
npm install json-server

json-server --watch src/data-abs/db.json --port 8000 
# or 
npm run leaves
```
Open [http://localhost:8000/leaves](http://localhost:8000/leaves) with your browser to see the result.

File location in data-abs/db.json

## Log in

If you want to connect :
- enter the email address of the user entered in the user table
- enter the first name with the first letter in capitals as password

Example :
- email : `johnd@aroundtech.com`
- password : `John`

## Start cron

Fisrt, execute a GET request to `/api/cron`. In the test phase, the task is executed every minute

Sending email [nodemailer + gmail](https://nodemailer.com/usage/using-gmail/)
- Create a gmail address or retrieve one
- Enable double authentication
- Go [here](https://security.google.com/settings/security/apppasswords) to create a gmail application password

In the .env.local file fill in the fields: 
`MAILER_ADR` and `MAILER_PWD` with respectively the gmail address and the application password (without spaces)
With admin account, cron can be launched in page: "Validation des Missions"

## Token

Generate the token key in the terminal (type node) and write
```bash
node
console.log(require('crypto').randomBytes(64).toString('hex'));
```
Then, get the generated key and put it in the .env file

In case of modification of the database
```bash
npx prisma db pull
```
This will update the file `schema.prisma`
Add in .env file :
- DB_URL="mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE"

## Skills
Javascript, HTML, CSS

## Version
- Node : 18.18.2
- npm : 10.2.0

## project link
Github : [github.com/2022-m07-projets/g2-missions](https://github.com/2022-m07-projets/g2-missions)

Diagramme de classe : [app.diagrams.net/](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=diagramme%20de%20classe.drawio#R7V1dc9o4FP01PML42%2FAYSNvdbdrJtt22%2B5RRsQC3xmJtpYT8%2BpVs2di%2BBkwSIwc005kiWf7SOVe65%2BrK6ZmT5cO7CK0WH4iHg56heQ8987pnGLo%2Bsth%2FvGaT1rianVbMI99Lq7RtxWf%2FEYszs9p738OxqEurKCEB9VflyikJQzylpToURWRdbjYjgVeqWKE5BhWfpyiAtd98jy7S2qHhbuv%2FwP58kd1Zd0bpkSXKGos3iRfII%2BtClfmmZ04iQmj6a%2FkwwQHvvKxfvv25%2BRbc%2FHLe%2FfV3%2FB%2F6Z%2Fz%2By8ev%2FfRib485JX%2BFCIf0yZe2ZubjLIpd3Xnfv3oXX329vZ30dVO8G91kHYY91n%2BiSCK6IHMSouDNtnYckfvQw%2FyyGitt29wQsmKVOqv8iSndCDKge0pY1YIuA3EUP%2Fj0uzid%2F%2F6X%2Fx7YonT9UDh0vckKIY0237cNefHf7Hq8sD0tKW3P8644jVgxJCFOa976QSCOp%2B%2FPX7rClwOdLdrF5D6a4n09LDiPojkW13v8NXv7x1fr5%2FfV7du%2F19q7qx9%2F9fu6m1OK2SImS8zegp0Y4QBR%2F3f56ZAwinnebgs8%2ByGwr%2BdB7d0FxX%2Bj4F7c6Z8YR4Ab8dpfBijpxRkJaUYT9txjFPjzkP2esm5jZ5rj3ziiPrPDK3GAcnKMpws%2F8G7Qhtzzzogpmv7KSuMFifxHdlmU8YQdjqhgkeGUWnzmZwoIIxyzNrcZYnpedYNiKtpMSRCgVez%2FSB6YN1kyRPxwTCgly%2BxCJWLn9p4UaER%2B5SOInhOnKU94b%2BCHAogQ6eyoJcAQA65liaFqvR2%2BdEe0WRSHLtvczQ5xu09siEXhnHXC9n7OE%2B%2FHECndDgUM%2BBBRPObdGANO5q%2F6dJrqgKYzP4ppiJYYcJV1Ny3wMsAzupOV8QpN%2FXB%2Bk7S5trY1n8Tr8irCzp0FCSMWvufhMGEMRRSlpOI0WRE%2FpEl%2F2GP2j%2FXahI9XNnugCSvr2zL7x5tHdEJCRi7kJyzCjLFrzFlbw6%2B9lnuYX5sybMfC%2B2JjjQFADNCZYrhnQBHTodYi0rYhGWkTII2XyA8UzC8Kszs8Hcy1Lo4BLXqF4nhNIu%2FsoN4BTlNcd4Koa5ZkY7UAiAC8wE9cv4InD92iA8guGUaJiBBQfkkkQ18HcJsQbrMG2gD9wMEtiX3qE379KG1bgVzWXKubWjNUhy2ZpjsCIHZe3xXVXUHstafv9mFd1Hf7XNKivtszSD5D3yWnsldFm0IDQfPtlW95RcEFMIsU2h4W7O1XtMaRzXV9R%2Fv64%2BxH%2BvxP1QS1HTuE2nWJQjSvka%2BcBTd8wCjT9aB0zQetRFbunFiu980PIr4lTu7lUaUiEfeY8E65qA20keOUYUlLxzFrC17WhMxmMaN0GzLOBZB98OOYj%2BAq4nD6iIM5rEQAjIazlq4dZlVNxMG2K8OI1fB%2BMiIOI0DVhCN3Hrvt2Xm3Lypkcit%2FRaEJOJcwb0Jh3QLW0oMTBoxOAIwvXfAcD2vTYERbggca8JcIhTHvC%2BVbHPQtDsQ1drsbO30Lp6ow9IZzvas9xbXIBfem4trIdS32rQwWqHqWMfBGzNpty51wFmofT80fLw9qU6%2BgrekDevtsaKb3sZo7OjB3NNalFzB3QD9HTR7Qkrs7eehw9lezx3NRlT176BbAsOurLXn63MlWW56XTSfQPJhOZ%2BzwM148na72MZ1hd4hgNM6rdEuJlVrXqWA3pMLJMivrqQBdSg%2BzTqD3Eb6b%2BnRTy5RXt0qVMn6nK9fXBpo5NMr%2BVVrqxDLVXoYVoJvUAaa0wOm1gKm0QE5TR2mB%2FYNTasgdFgNwPVyJgWfDKl0NdMgJfIoa6PzOGgc6gLUNbUumA%2BjCUA2KIp8Vz8j90w%2B7f3a2r0SYZ4Zzd%2F0%2FQ66cz402V2PntzluBE34mOTp01hwTQ7QJxJAB0vpgPZ1QEUGOLaSAdlopZYEDk1SHV8TMNSaQAuwypYBhi3Ti8h%2BHyUDuLumOUVHQhsY5mFngpVuceSzfuNznJgZ2CRV8TGSuoKXcUIvZN82xY6vKRgwzPMRJVFklTsvzx%2Bp7p7Xh013z%2B8bcPZ4JN3crV%2FPWBjWUh5JjU132CMZAgT9%2BG664CPl2cF4TEJ8C2CfMiG%2B%2FvmgzGVg%2FyBhTfqbwvpZWEvfsm9Cw6Y%2Fl2cHc2sAnnS7fj2CUO6vcMT9OXSGY3N7QDbdod8ekBe1w7A9IG3ZzpIFLfJsNw%2B2B2OWJHQQxrbiNaaKwrUhZZru%2B2oLVkvuly5Li3nZkV1hOLmLcqbge8cTK7PHLNjpm4cVDmN89wmr%2FZ6S4mHmqByfGjU0e904p49X1hMWbhhES3Y3SNTL9Q5So%2B5uQMyEX0mbRpjRxrtD54dj21GSA2hLj4iZMAGc%2FfQV1i%2BPtfyImMrBbQHWxnGy1tx%2BiGLXV9%2BzLVuvZSNWFkvuuF5w67ZJJOvnyx3r568yE9faYZCFTFx9aJec5mcm4mZXtvXSVfuVkbq9PF0LOmUiM0IJwe4kRoyaTQQXIAQt6FaqvIgai%2B6uDLTgXMLzItBqxczu3GBsWxkcAFu6CrSgMmBI36VFBfaLgi1dBlowMQJgrGTgsbDKl4Gv7zv4r%2BzLLFlk9OBuzF1UOY0KtOEivT4Y6IAdYhwHNj4hAYm2fTxjHVypai4P1wuf4s%2FMuPk91xFaAc615ZxXPvjt1CTBWHWj7p5NVM9DBa65a4MBVOTnjUrevxksmmxYDGUsBRjyP5IhGxa4kHiB1mJVFL%2BdXVcaLDAMdYGw2BVrsaQPYjDacomDmF6GxXRkwwJDKJcIS9Vaav4UymlhgcGOSxzEql8edmXDAsMSFwiLWYVF%2BiAGc%2FcvEZZRx6b8jBaXPbeYFTlp1Hy85LSwQJV%2FibBU5aRs3eIoOVmc4jNrqfnA6GlhgXLyAq3Fsrs2tyjdwgexipyU7Yg5Srb0CqJ%2Bzx%2FWPCksrprxezWxF9lTi2soaynE8bsSe3GlblF8Wq5y7zUlKgvgup6oXPPRndCnd2m2ci1FXl2Wckr1naapDXSjPJOlpe5%2BK9hV3noPhhxM2UulLlz8ucCZzjydiGLFiBBaNC72posPxOMD1Jv%2FAQ%3D%3D)



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
