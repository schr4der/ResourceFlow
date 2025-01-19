![Image](https://github.com/user-attachments/assets/81f6265f-3fe3-4d04-8ed1-9a3ed6ae684a)
![Image](https://github.com/user-attachments/assets/f467a8c9-2418-4e35-8726-00594326fbac)
![Image](https://github.com/user-attachments/assets/d5ce89d7-aab2-4ac2-ba03-55bdcad77a97)
 
## Inspiration
ResourceFlow was inspired by the need to streamline resource allocation during emergencies, such as wildfires and other natural disasters. During such crises, the rapid and efficient distribution of resources can make a significant difference in saving lives and alleviating suffering. We wanted to create a platform that connects donors with requestors, making it easier to share necessary resources during times of urgent need.

## What it does
ResourceFlow is a platform that allows donors and requestors to connect in times of emergency. Donors can offer supplies, such as food, water, medical supplies, etc., while requestors can specify their needs. The system matches donors and requestors based on availability and location, facilitating a more efficient allocation of resources.

## How we built it
The backend of ResourceFlow was built using Go, which provided a robust and scalable environment for handling API requests and managing the application’s logic. The database is powered by SQLite3, offering a lightweight and easily manageable storage solution for item data, requests, and donations. The frontend is designed in React, providing a user-friendly interface for users to interact with the system. We also integrated a login system using Google OAuth to ensure user authentication and security.

## Challenges we ran into
One of the main challenges we faced was the complex logic behind matching donors and requestors. Ensuring accurate, real-time matches based on both location and available items required careful design and testing. Another challenge was integrating the frontend and backend systems, particularly ensuring seamless communication between the React frontend and the Go backend through API calls.

## Accomplishments that we're proud of
We’re proud of the successful implementation of a working matching system between donors and requestors. Additionally, we created a secure and reliable platform that can handle real-time data updates while providing easy access to resources during a crisis. We were also able to optimize the system for both ease of use and scalability, which will be crucial in times of high demand.

## What's next for ResourceFlow
In the future, we plan to expand ResourceFlow’s functionality to include more advanced features like location-based resource tracking, automated notifications for available resources, and integration with local government and relief organizations. Additionally, we aim to optimize the system for even larger scale emergencies and improve user experience with mobile-friendly design and advanced data analytics.
