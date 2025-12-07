# 🚗 Vehicle Rental System Backend API

### 🎯 Overview
This is a robust and secure backend API for a vehicle rental management system. It provides comprehensive functionality for managing vehicle inventory, customer accounts, and the entire booking lifecycle, from rental initiation to return and cost calculation. The system uses a role-based access control (RBAC) model to secure access for Admin and Customer users.

### 🚀 Key Features
- Vehicle Management: Full CRUD operations for vehicle inventory, including unique registration tracking and real-time availability status.
- Customer Management: Secure handling of customer and admin accounts, including profile updates.
- **Booking Lifecycle:** End-to-end management of vehicle rentals, featuring:
- Availability Validation: Ensures a vehicle is available before booking.
- Automatic Price Calculation: Calculates total price based on daily rate and rental duration.
- Status Tracking: Bookings are tracked with statuses like 'active', 'cancelled', and 'returned'.
- **Role-Based Security:**
- Admin: Full system access for managing all resources (vehicles, users, and all bookings).
- Customer: Restricted access to view vehicles and manage only their own bookings.Secure 
- **Authentication:** User authentication via JWT after password hashing with bcrypt.