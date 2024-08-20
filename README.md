# InstaConnect

InstaConnect is a social media platform inspired by Instagram, built with React and Firebase. Users can share photos and videos, follow other users, like and comment on posts, and interact with stories—all in real-time.

## Features

- **User Authentication**
  - Firebase Authentication for sign-up, login, and session management.
  - Supports social logins (Google, Facebook) and email/password authentication.

- **Profile Management**
  - Create and customize user profiles with profile pictures and bios.
  - Follow and unfollow users to build your social network.

- **Image & Video Upload**
  - Upload photos and videos via Firebase Storage.
  - Real-time updates for posts in the user feed.

- **User Feed**
  - A dynamic feed displaying posts from users the current user follows.
  - Posts include images or videos, captions, and timestamps.

- **Likes & Comments**
  - Users can like posts and leave comments.
  - Real-time updates for likes and comments on posts.

- **Stories**
  - Post temporary stories (photos/videos) that expire after 24 hours.
  - Real-time updates for stories and ability to view stories of followed users.

- **Search & Explore**
  - Discover new users and trending content via search and explore.
  - Search by username or hashtags.

- **Notifications**
  - Real-time notifications for actions such as new followers, likes, and comments using Firebase Cloud Messaging.

## Tech Stack

- **Frontend:** React, React Context API/Redux for state management, React Hooks.
- **Backend:** Firebase (Authentication, Firestore, Cloud Storage, Cloud Functions, Cloud Messaging).
- **Hosting:** Firebase Hosting.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/instaconnect.git
   cd instaconnect
