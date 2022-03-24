# Events App API Docs

**POST** /user - Endpoint to create new user
- Parameters
  - userName: "String",
  - lastName: "String",
  - firstName: "String",
  - middleName: "String"

**POST** /event - Endpoint to create new event. This will validate the maximum and minimun user added to the event, the overlapping time of events, the 8AM-8PM allowed time of event, the event time that past the current time.
- Parameters
  - title: "String",
  - description: "String",
  - startTime: "2022-03-24T15:00:00.000Z",
  - endTime: "2022-03-24T17:00:00.000Z",
  - userId: ["userId1", "userId2]

**GET** /event - Endpoint to display a list of events.
- No parameter

**PUT** /event/:id - Endpoint to update a specific event. This will validate the maximum and minimun user added to the event, the overlapping time of events, the 8AM-8PM allowed time of event, the event time that past the current time.
- Parameters
  - title: "String",
  - description: "String",
  - startTime: "2022-03-24T15:00:00.000Z",
  - endTime: "2022-03-24T17:00:00.000Z",
  - userId: ["userId1", "userId2]

**DELETE** /event/:id - Endpoint to delete a specific event
- No parameter