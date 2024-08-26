
import React, { useEffect, useState } from 'react';
import HeadlessButton from './HeadlessButton';
import { fetchUserByUsername } from '../appwrite/appwrite';
import { nanoid } from '@reduxjs/toolkit';

function UserDiv({ onClose, header, users = [], username }) {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const isFollowerList = header === "Follower";
        const isFollowingList = header === "Following";

        // Avoid fetching data for the user's own account in follower/following lists
        const userFilter = user => 
          (isFollowerList && username !== user.followerId) || 
          (isFollowingList && username !== user.followingId);

        const validUsers = users.filter(userFilter);

        if (validUsers.length > 0) {
          const fetchUserPromises = validUsers.map(user => 
            fetchUserByUsername(isFollowerList ? user.followerId : user.followingId)
          );

          const results = await Promise.all(fetchUserPromises);
          const allUsersData = results.flatMap(result => result.documents || []);
          
          // Filter out duplicate usernames
          const filteredUsersData = allUsersData.reduce((uniqueUsers, user) => {
            if (!uniqueUsers.some(u => u.username === user.username)) {
              uniqueUsers.push(user);
            }
            return uniqueUsers;
          }, []);

          setUsersData(filteredUsersData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    if (users.length > 0) {
      fetchUsersData();
    }
  }, [users, header, username]);

  return (
    <div
      className='bg-white shadow-lg border border-black rounded absolute w-2/5 h-3/4'
      style={{ top: "20%", left: "36%" }}
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
        onClick={onClose}
        style={{ background: "none", border: "none", fontSize: "1.5rem" }}
      >
        &times;
      </button>
      <div className="p-4 h-3/4">
        <h3 className='text-center font-bold text-xl pb-3'>{header}</h3>
        <hr />
        <div className='mt-2 p-2 overflow-y-scroll h-full' >
          <ul>
            {usersData.map(data => (
              <li key={nanoid()} className="hover:bg-gray-300 py-4 hover:cursor-pointer flex items-center px-4">
                <img
                  src={data.profileImage}
                  alt="Profile"
                  className="mx-2"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover"
                  }}
                />
                <span className='m-1'>
                  <p className='font-medium'>{data.username}</p>
                  <p className='font-light'>{data.name}</p>
                </span>
                <span className='ml-auto'>
                  <HeadlessButton text="Follow" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserDiv;
