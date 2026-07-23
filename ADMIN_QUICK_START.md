# Admin Panel Quick Start Guide

## Overview
Your portfolio now has a fully functional admin panel to manage all content directly! Update projects, skills, experience, education, and view contact messages.

## Installation & Setup

### Step 1: Install Dependencies
```bash
cd Portfolio/admin
npm install
```

### Step 2: Start the Admin Panel
```bash
npm run dev
```
The admin panel will start on `http://localhost:5173`

### Step 3: Ensure Backend is Running
Make sure your backend server is running:
```bash
cd Portfolio/backend
npm install
npm start
```
Backend should be running on `http://localhost:5000`

## First Time Setup

### Create Admin Account
If this is your first time using the admin panel:

1. **Using Backend Register Endpoint** (Recommended)
   ```bash
   # Send a POST request to register
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Your Name",
       "email": "admin@example.com",
       "password": "securepassword"
     }'
   ```

2. **Or use a MongoDB client** to add a user directly to the database

### Login
1. Go to `http://localhost:5173/login`
2. Enter your email and password
3. Click Login

## Main Features

### 📊 Dashboard
- View statistics: total projects, skills, experiences, educations, messages
- Quick action links to add new content
- Welcome message with your name

### 📁 Projects Management
- **View all projects** in a beautiful grid
- **Add project** with:
  - Title and description
  - Project image
  - Technologies used (tag-based input)
  - Live link and GitHub link
- **Edit** any project
- **Delete** projects (with confirmation)

### 💻 Skills Management
- **View all skills** in a table with proficiency levels
- **Add skill** with:
  - Skill name
  - Category selection
  - Proficiency percentage (0-100%)
- **Edit** skill details
- **Delete** skills

### 🏢 Experience Management
- **View work experience** as cards
- **Add experience** with:
  - Job title and company
  - Start and end dates
  - Description
  - "Currently working here" option
- **Edit** experience details
- **Delete** experiences

### 🎓 Education Management
- **View education** as cards
- **Add education** with:
  - School/University name
  - Degree type
  - Field of study
  - Start and end dates
  - Description
- **Edit** education
- **Delete** education entries

### 💬 Messages Management
- **View contact form submissions** in a list
- **Click message** to see full details
- **Delete** messages

## Common Tasks

### Adding a New Project
1. Click "Projects" in sidebar
2. Click "Add Project" button
3. Fill in the form:
   - Title: "My Awesome Project"
   - Description: "What this project does"
   - Image URL: "https://..."
   - Technologies: Type and click Add for each tech
   - Links: Add live link and/or GitHub link
4. Click "Create Project"

### Updating a Project
1. Go to Projects page
2. Click "Edit" on the project card
3. Update the fields
4. Click "Update Project"

### Deleting Content
1. Find the item in the list
2. Click the red "Delete" button
3. Confirm the deletion in the popup

### Checking Messages
1. Click "Messages" in sidebar
2. Click on any message in the list to view details
3. Delete if needed

## Keyboard Shortcuts
- In form fields: Press **Enter** to add technologies (Projects)
- Use **Tab** to navigate between form fields

## Styling & Appearance
- **Color Scheme**: Dark theme with cyan accents
- **Responsive**: Works on desktop, tablet, and mobile
- **Icons**: Lucide React icons for visual clarity
- **Notifications**: Toast messages for success/error feedback

## Troubleshooting

### "Connection refused" when loading data
- ✅ Check backend is running: `npm start` in backend folder
- ✅ Verify backend is on `http://localhost:5000`
- ✅ Check backend console for errors

### "Invalid credentials" on login
- ✅ Verify you created an admin account
- ✅ Check email and password are correct
- ✅ Try registering a new account

### Form won't submit
- ✅ Ensure all required fields (marked with *) are filled
- ✅ Check date fields are in correct format
- ✅ Look at browser console for specific errors
- ✅ Check backend validation in server.js

### Images not showing
- ✅ Verify the image URL is correct
- ✅ Check the URL is publicly accessible
- ✅ Try a different image hosting service

## Tips & Best Practices

✅ **Regular Backups**: Back up your MongoDB database regularly
✅ **Meaningful Titles**: Use clear, descriptive names for projects and skills
✅ **Complete Information**: Fill in all fields for better portfolio display
✅ **Check Links**: Verify all project links work correctly
✅ **Update Regularly**: Keep portfolio content current

## Advanced

### Adding More Sections
To add a new portfolio section:
1. Create a new model in `backend/src/models/`
2. Create routes in `backend/src/routes/`
3. Create a page in `admin/src/pages/`
4. Create a form component in `admin/src/components/`
5. Add route to `admin/src/App.jsx`
6. Add navigation link in `admin/src/components/Sidebar.jsx`

### Environment Variables
If needed, create `.env` in admin folder:
```
VITE_API_URL=http://localhost:5000/api
```

## Support & Documentation

- See `ADMIN_PANEL_GUIDE.md` for detailed documentation
- Check backend README for API details
- Look at component files for JSX/React details

## Keyboard & Navigation

| Action | Keys |
|--------|------|
| Navigate to Projects | Sidebar → Projects |
| Navigate to Skills | Sidebar → Skills |
| Navigate to Experience | Sidebar → Experience |
| Navigate to Education | Sidebar → Education |
| Navigate to Messages | Sidebar → Messages |
| Return to Dashboard | Sidebar → Dashboard |
| Logout | Click Logout in sidebar |

---

**Happy managing! Your portfolio is now fully customizable from this admin panel.** 🚀
