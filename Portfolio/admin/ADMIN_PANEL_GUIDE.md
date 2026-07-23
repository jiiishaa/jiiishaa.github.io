# Admin Panel Documentation

## Overview
This admin panel allows you to manage your entire portfolio directly. You can add, edit, and delete projects, skills, experience, education entries, and view messages from your contact form.

## Features

### 1. **Projects Management**
- **View**: See all your portfolio projects in a grid layout
- **Add**: Create new projects with:
  - Title and description
  - Project image URL
  - Technologies used (dynamic input)
  - Live link and GitHub link
- **Edit**: Update existing project information
- **Delete**: Remove projects from your portfolio

### 2. **Skills Management**
- **View**: See all skills in a clean table format
- **Add**: Create new skills with:
  - Skill name
  - Category (Frontend, Backend, Database, DevOps, Tools, Other)
  - Proficiency level (0-100%) with visual progress bar
- **Edit**: Update skill details and proficiency levels
- **Delete**: Remove skills

### 3. **Experience Management**
- **View**: See all work experiences
- **Add**: Create new experience entries with:
  - Job title and company
  - Start and end dates
  - "Currently Working Here" toggle
  - Job description
- **Edit**: Update experience details
- **Delete**: Remove experiences

### 4. **Education Management**
- **View**: See all education entries
- **Add**: Create new education with:
  - School/University name
  - Degree type
  - Field of study
  - Start and end dates
  - Additional description
- **Edit**: Update education information
- **Delete**: Remove education entries

### 5. **Messages Management**
- **View**: See all messages submitted through your contact form
- **View Details**: Click on a message to see full details including name, email, phone, and message content
- **Delete**: Remove messages

## Getting Started

### Prerequisites
- Node.js and npm installed
- Backend server running on `http://localhost:5000`
- MongoDB database connected

### Installation

1. **Install Dependencies**
   ```bash
   cd admin
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file (if needed):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start the Admin Panel**
   ```bash
   npm run dev
   ```
   The admin panel will be available at `http://localhost:5173`

### First Login

1. **Register an Admin Account** (if not exists)
   - The first time, you may need to register via the backend or create a test user
   - Use the Login page with email and password

2. **Login**
   - Navigate to `/login`
   - Enter your credentials
   - You'll be redirected to the dashboard

## How to Use

### Adding Content

1. **Navigate to the Section**: Use the sidebar to select what you want to manage
2. **Click "Add" Button**: Located at the top right of each page
3. **Fill the Form**: Enter all required information
4. **Submit**: Click the appropriate button (Create/Update)

### Editing Content

1. **Find the Item**: Browse the list/table of items
2. **Click Edit**: Click the blue Edit button
3. **Update Information**: Modify the fields as needed
4. **Submit**: Click the Update button

### Deleting Content

1. **Find the Item**: Browse the list of items
2. **Click Delete**: Click the red Delete button
3. **Confirm**: Accept the confirmation dialog
4. **Done**: Item will be removed immediately

## API Endpoints

The admin panel communicates with the following API endpoints:

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (auth required)

### Skills
- `GET /api/skills` - List all skills
- `POST /api/skills` - Create new skill (auth required)
- `PUT /api/skills/:id` - Update skill (auth required)
- `DELETE /api/skills/:id` - Delete skill (auth required)

### Experience
- `GET /api/experience` - List all experiences
- `POST /api/experience` - Create new experience (auth required)
- `PUT /api/experience/:id` - Update experience (auth required)
- `DELETE /api/experience/:id` - Delete experience (auth required)

### Education
- `GET /api/education` - List all education
- `POST /api/education` - Create new education (auth required)
- `PUT /api/education/:id` - Update education (auth required)
- `DELETE /api/education/:id` - Delete education (auth required)

### Messages
- `POST /api/messages` - Create new message (public, for contact form)
- `GET /api/messages` - List all messages (auth required)
- `DELETE /api/messages/:id` - Delete message (auth required)

## Authentication

The admin panel uses JWT (JSON Web Tokens) for authentication:

1. **Login**: Provides a JWT token stored in localStorage
2. **Protected Routes**: All admin pages require authentication
3. **Token Expiry**: Ensure your backend handles token refresh
4. **Logout**: Clears the token and redirects to login

## Styling

The admin panel uses:
- **Tailwind CSS**: For utility-based styling
- **Lucide Icons**: For consistent icons
- **Color Scheme**:
  - Primary: Cyan (#06B6D4)
  - Background: Navy/Slate
  - Accent: Green for success, Red for delete, Blue for edit

## Troubleshooting

### Login Issues
- Ensure the backend is running on `http://localhost:5000`
- Check that your credentials are correct
- Verify the database connection

### Data Not Showing
- Check browser console for errors
- Verify API responses in Network tab
- Ensure authentication token is valid

### Form Submission Errors
- Check that all required fields are filled
- Verify the data format (especially dates)
- Check backend validation rules

### Connection Errors
- Verify backend URL in API service
- Check CORS settings on backend
- Ensure backend is running and accessible

## Best Practices

1. **Regular Backups**: Back up your MongoDB database regularly
2. **Unique Content**: Ensure skills, projects, etc. have unique meaningful names
3. **Complete Profiles**: Fill in as much information as possible for better portfolio display
4. **Consistent Dates**: Ensure start dates are before end dates
5. **Valid URLs**: Use complete URLs for project links and images

## Future Enhancements

- [ ] Bulk upload functionality
- [ ] Content versioning/history
- [ ] Search and filter
- [ ] Export portfolio data
- [ ] Custom portfolio sections
- [ ] Image upload instead of URL
- [ ] Rich text editor for descriptions

## Support

For issues or questions, please check:
1. Backend logs
2. Browser console for client-side errors
3. Network tab for API requests
4. MongoDB logs for database issues
