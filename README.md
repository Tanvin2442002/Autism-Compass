# Autism Compass 🧭

A comprehensive platform designed to provide support, resources, and tools for individuals with autism, their families, and healthcare professionals.

## 🌟 Overview

Autism Compass is a full-stack web application that serves as a centralized hub for autism-related services and information. The platform connects families, healthcare professionals, and educators to provide comprehensive support for individuals with autism spectrum disorders.

## ✨ Key Features

### 🏥 Healthcare Services

- **Therapy Booking System**: Schedule and manage therapy sessions with qualified professionals
- **Doctor Consultations**: Book and track medical appointments with autism specialists
- **Health Professional Profiles**: Detailed profiles with specializations and availability

### 👨‍👩‍👧‍👦 User Management

- **Multi-Role Support**:
  - Parents/Guardians
  - Children with autism
  - Health Professionals
  - Teachers/Educators
- **Profile Management**: Comprehensive user profiles with role-specific features
- **Secure Authentication**: JWT-based authentication system

### 🛒 Product & Services

- **Product Ordering**: Browse and order autism-related products and resources
- **Delivery Tracking**: Real-time tracking of orders and deliveries
- **Educational Materials**: Access to specialized learning resources

### 🤖 AI-Powered Features

- **ChatBot Integration**: AI-powered assistant for guidance and support
- **Disorder Information**: Comprehensive information about autism spectrum disorders
- **AI Explanations**: Intelligent explanations of conditions and treatments

### 📊 Dashboard & Analytics

- **Interactive Dashboard**: Personalized dashboard for each user role
- **Appointment Management**: Track upcoming and past appointments
- **Progress Tracking**: Monitor therapy progress and milestones

## 🛠️ Technology Stack

### Frontend

- **React.js** - Modern UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API communication
- **Framer Motion** - Smooth animations and transitions
- **CSS3** - Responsive styling

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Primary database via Supabase
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Database & Cloud Services

- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Relational database
- **Real-time subscriptions** - Live data updates

## 📁 Project Structure

```
Autism-Compass/
├── frontend/                 # React application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── ChildComponent/
│   │   │   ├── DoctorComponent/
│   │   │   ├── productComponent/
│   │   │   └── TherapyComponent/
│   │   ├── App.js          # Main application component
│   │   ├── Dashboard.js    # User dashboard
│   │   └── Landing.js      # Landing page
│   └── package.json        # Frontend dependencies
├── Backend/                 # Node.js server
│   ├── DB/                 # Database configuration
│   │   ├── connection.js   # Database connection
│   │   └── supabase.js     # Supabase client
│   ├── routes/             # API route handlers
│   │   ├── BookingDoc.js   # Doctor booking routes
│   │   ├── BookingTherapy.js # Therapy booking routes
│   │   ├── registration.js # User registration
│   │   └── [other routes]
│   ├── index.js            # Server entry point
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database (Supabase account)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/autism-compass.git
   cd autism-compass
   ```

2. **Install Backend Dependencies**

   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   Create `.env` files in both frontend and backend directories:

   **Backend/.env**

   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

   **Frontend/.env**

   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Database Setup**
   - Set up your Supabase project
   - Configure the database schema (see Database Schema section)
   - Update connection details in `Backend/DB/supabase.js`

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd Backend
   npm start
   ```

2. **Start the Frontend Development Server**

   ```bash
   cd frontend
   npm start
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📡 API Documentation

### Authentication Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile

### Booking Endpoints

- `GET /api/therapy-bookings` - Get therapy bookings
- `POST /api/therapy-bookings` - Create therapy booking
- `GET /api/doctor-bookings` - Get doctor appointments
- `POST /api/doctor-bookings` - Book doctor appointment

### User Management

- `GET /api/users` - Get users (admin only)
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### Product Management

- `GET /api/products` - Get available products
- `POST /api/orders` - Place product order
- `GET /api/orders/:userId` - Get user orders

## 🗄️ Database Schema

### Core Tables

- **users** - User accounts and profiles
- **therapy_bookings** - Therapy appointment records
- **doctor_bookings** - Medical consultation records
- **products** - Available products and resources
- **orders** - Product orders and delivery tracking
- **user_roles** - User role definitions

### Key Relationships

- Users can have multiple bookings (therapy and doctor)
- Users can place multiple orders
- Bookings are linked to specific healthcare providers
- Orders track delivery status and history

## 🎨 User Interface Features

### Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Accessible design principles

### Interactive Elements

- Smooth animations with Framer Motion
- Real-time updates
- Intuitive navigation
- Role-based UI customization

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- Role-based access control

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. Build the production version
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `build` folder to your hosting service

### Backend Deployment (Heroku/Railway)

1. Set up environment variables on your hosting platform
2. Deploy the `Backend` folder
3. Ensure database connections are properly configured

### Environment Variables for Production

- Update API URLs to production endpoints
- Use production database credentials
- Set secure JWT secrets
- Configure CORS for production domains

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Contact the development team
- Check the documentation wiki

## 🙏 Acknowledgments

- Thanks to all contributors and supporters
- Special recognition to autism advocacy organizations
- Healthcare professionals who provided guidance

---

**Made with ❤️ for the autism community**
