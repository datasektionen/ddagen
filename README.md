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

# not used in development
SPAM_API_KEY=2AkdhsQ9cTTSBKtNXdd6E07rqN8CFWvRqeY4GeAyXAn09urF
SPAM_URL=https://spam.datasektionen.se/api/sendmail

# can be almost anything, used to verify clients in the /api/export-exhibitors endpoint
EXPORT_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaa
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

## Database

This is the current database diagram, written in mermaid which can be rendered
in github, or the mermaid vs code plugin. The schema is defined with prisma in
`prisma/schema.prisma`, which generates all the migrations in
`prisma/migrations/`.

```mermaid
classDiagram
    class ExhibitorInterestRegistration {
      id                 String   @id @default(uuid())
      createdAt          DateTime @default(now())
      name               String
      organizationNumber String
      contactPerson      String
      phoneNumber        String
      email              String
    }

    class Exhibitor {
      id                 String @id @default(uuid())
      name               String
      organizationNumber String

      invoiceEmail              String
      logoWhite                 Bytes?
      logoColor                 Bytes?
      description               String
      package                   Package
      extraTables               Int
      extraChairs               Int
      extraDrinkCoupons         Int
      extraRepresentativeSpots  Int
      totalBanquetTicketsWanted Int

      foodSpecifications FoodSpecification[]
      users              User[]
    }

    Exhibitor --> User
    Exhibitor --> FoodSpecification

    class User {
      id    String @id @default(uuid())
      email String @unique
      name  String
      phone String
      role  String

      exhibitorId String
      exhibitor   Exhibitor

      loginCode LoginCode?
      session   Session?
    }

    User --> LoginCode
    User --> Session

    class LoginCode {
      id        String   @id @db.Char(32)
      createdAt DateTime @default(now())

      userId String @unique
      user   User
    }

    class Session {
      id        String   @id @default(uuid())
      createdAt DateTime @default(now())
      lastUsed  DateTime @default(now())

      userId String @unique
      user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
    }

    class FoodSpecification {
      id      String                @id @default(uuid())
      value   String
      comment String
      type    FoodSpecificationType

      exhibitor   Exhibitor
      exhibitorId String
    }
```
