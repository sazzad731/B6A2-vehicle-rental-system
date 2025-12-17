# 🚗 Vehicle Rental System

A comprehensive backend API for a vehicle rental management system. This application handles vehicle inventory, customer profiles, booking management, and secure role-based authentication.

[Live link](https://b6-a2-vehicle-rental-system.vercel.app/)

## 🚀 Features

#### 🔐 Authentication & Authorization

- Secure User Sign-up and Sign-in.

- JWT-based authentication.

- Role-based access control (Admin vs. Customer).

- Password hashing using bcrypt.

#### 🚙 Vehicle Management

- CRUD operations for vehicle inventory.

- Track availability status (available, booked).

- Categorization by type (SUV, Car, Bike, Van).

#### 📅 Booking System

- Create rental bookings with date validation.

- Automatic total price calculation based on daily rates.

- Status tracking (active, cancelled, returned).

- Prevents double-booking of vehicles.

- busts_in_silhouette: User Management

- Admin controls for user roles and account management.

- Customer profile updates.

#### 🛠️ Technology Stack

- Runtime Environment: Node.js

- Language: TypeScript

- Framework: Express.js

- Database: PostgreSQL

- Authentication: JSON Web Token (JWT) & bcrypt

- Architecture: Modular Pattern (Routes, Controllers, Services)



## ⚙️ Setup & Installation

Follow these steps to run the project locally.

**Prerequisites**

- Node.js (v18+)

- PostgreSQL is installed and running locally or via the cloud.

1. **Clone the Repository**

- git clone URL


2. **Install Dependencies**

- npm install


3. **Environment Configuration**

- Create a .env file in the root directory and add the following variables:

- PORT=5000
- CONNECTION_STRING= your postgresql CONNECTION_STRING
- JWT_SECRET = your_super_secret_key


4. **Database Setup**
- Create a neondb account then create a project


### Run the Application

**Development mode**
- npm run dev

**Production build**
- npm run build
- npm start
