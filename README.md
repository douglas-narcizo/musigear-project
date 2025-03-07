# MusiGear

Welcome to **MusiGear**, an e-commerce application dedicated to music lovers and their favorite gear. This project was developed as a Portfolio Project, as part of the **Full Stack Engineer** career path at **Codecademy**.

## About the Project

MusiGear is an online store where users can browse and purchase a variety of musical instruments and related equipment. The application showcases a wide range of products, including guitars, basses, drums, keyboards, brass instruments, microphones, pro audio equipment, and accessories.

## Tech Stack

MusiGear is built upon the **PERN** stack, which stands for:

- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **React**: A JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.

## Features

- **User Authentication**: Users can register, log in, and log out. Authentication is handled securely with sessions.
- **Product Browsing**: Users can browse products by category, view product details, and see special deals.
- **Shopping Cart**: Users can add products to their cart, update quantities, and remove items.
- **Checkout**: Users can proceed to checkout and complete their purchase using a test payment gateway.
- **Order Management**: Users can view their order details after completing a purchase.

## Getting Started

To get started with MusiGear, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/musigear.git
    cd musigear
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up the database**:
    - Ensure you have PostgreSQL installed and running.
    - Create a new database and update the connection settings in the `server/config.js` file.

4. **Create a `.env` file** in the root directory with the necessary environment variables. Refer to the provided `EXAMPLE.env` to structure yours. The back-end API is pre-configured to run at port `4000`.

5. **Run the development server**:
    ```sh
    npm start
    ```

6. **Open the application**:
    - Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in development mode.
- **`npm test`**: Launches the test runner in interactive watch mode.
- **`npm run build`**: Builds the app for production to the `build` folder.
- **`npm run eject`**: Ejects the app, giving you full control over the configuration.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [React Documentation](https://reactjs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Douglas Narcizo**

Feel free to reach out if you have any questions or feedback!

---

Thank you for checking out MusiGear! I hope you enjoy exploring the app as much as I enjoyed building it.
