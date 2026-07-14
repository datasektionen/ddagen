![d-dagen](https://github.com/datasektionen/ddagen/blob/main/public/img/logo-white-ageless_v2.svg)

Next.js project for D-Dagen's website.

Take a look at the [wiki](https://github.com/datasektionen/ddagen/wiki) for more information about the different features of [ddagen.se](https://ddagen.se)!
While you're there make sure to contribute some information and documentation about new (and old) features.

## Running

A postgres database must be running for the website to work. If you have docker
installed, you can create one with:

```bash
docker run --name ddagen-db -p 5432:5432 -d \
    -e POSTGRES_PASSWORD=ddagen \
    -e POSTGRES_DB=ddagen \
    -e POSTGRES_USER=ddagen \
    postgres
```

Create a file called `.env` with contents like the following:

```bash
DATABASE_URL=postgresql://ddagen:ddagen@localhost:5432/ddagen?schema=public

# These two are unused when NODE_ENV == "development", which it is when running `npm run dev`, but still must be set :)
SPAM_API_KEY=2AkdhsQ9cTTSBKtNXdd6E07rqN8CFWvRqeY4GeAyXAn09urF
SPAM_URL=https://spam.datasektionen.se/api/legacy/sendmail

# If this is set to "true" or "false", that value will be used instead of querying pls at the URL given.
PLS_URL=true
# Use `PLS_URL=https://pls.datasektionen.se` to use the real pls
```

Install npm dependencies:

```bash
npm i
```

This will also install the prisma engine, which is a binary that gets downloaded
from somewhere. If this does not work on your computer, either replace prisma
with something new and fancy (NOTE: applies only to future people) or look
[here](https://gist.github.com/mathiasmagnusson/c229abac159dd76657b895a4c8cb6ade)
for something that probably will work.

Then you'll need to run the migrations on the database:

```bash
npx prisma migrate dev
```

Lastly, start the thing:

```bash
npm run dev
```

## Other systems

This website depends on spam (not spam2!) for sending emails in production (including at http://dev.ddagen.se).

It also depends on pls for checking api keys, though this can be overriden by
setting the `PLS_URL` to either `true` or `false`. API keys still have to be
provided (usually in a header) when the route requires it, but the value it is
given can be anything.

