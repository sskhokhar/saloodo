# Saloodo Case Study

## Deployment
The project has been deployed on Vercel (frontends) & Heroku (backend) using Github integration
```
Seller Portal: https://seller-sand.vercel.app/
Biker Portal: https://biker-sigma.vercel.app/
Backend: https://saloodo-backend.herokuapp.com/api
```
## Local
To run the project locally run following commands
```yarn install```
```npx nx run biker-portal:serve --port=4300```
```npx nx run seller-portal:serve --port=4200```
```npx nx run backend:serve --port=3333```
### Key Points

- I used Nx monorepo management to manage 2 portals (seller, biker) and backend
- For portals, shared library was created following DRY principle
- Redux is used as a state management for single source of truth of data
- For the UI, Tailwind Css is used.
- Mongoose with mongo-in-memory server is used
- Data is seeded (5 sellers & 5 bikers) automatically on application start

#### Improvements
There are definitely room for improvement such as Toast Notifications on errors and success actions.
Routes authorization is not implemented yet

#### Seed Accounts
> email: seller<1-5>@test.com (seller1@test.com, seller2@test.com...)
> pass: 12345
> email: biker<1-5>@test.com (biker1@test.com, biker2@test.com...)
> pass: 12345

#### Frameworks Used
Backend: NestJs

Frontend: NextJs
