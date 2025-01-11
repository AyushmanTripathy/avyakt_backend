# Docs for backend

do read once before starting development

## Authorization header

-   mandatory for all requests otherwise you get a 401.
-   Authorization header should be set to CLIENT_KEY value present in .env.template file

## Endpoints

if request fails, a text body explaining the cause it send

### GET /events/

-   gives details of all events
-   array of event objects
-   responce format

```ts
[
    {
        name: string;
        id: string;
        dateTime: Date;
        memberCount: number;
        status: "UPCOMING" | "ONGOING" | "CLOSED";
        fee: number;
        rules: string[];
        category: "TECH" | "NONTECH" | "CULTURAL" | "SPECIAL" | "SPORTS";
        gender: "ALL" | "BOYS" | "GIRLS";
        imageURL: string;
    }
]
```

### GET /events/user/:mail

-   gives event id of events registered by a user
-   response format

```
[
    "id1",
    "id2"
]
```

-   these are event ids where user has participated

### POST /register

-   register to a event
-   request body format 

```ts
{
  phoneno: number;
  mails: string[];
  eventId: string;
  name: string;
  upiId: string;
}
```

-   for solo events
    -   mails should be of length 1
    -   name should be name of user
-   for team events
    -   mails should contain team member mails
    -   first mail, i.e. mails[0] should be of the team leader
    -   name should be the team name
