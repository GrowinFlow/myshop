// SingleUserPrev.js

import React, { useContext, useEffect, useState } from 'react';
import GlassCard from '../../../Common/Components/GlassCard';
import { FaTimes } from 'react-icons/fa';
import { SetDataContext } from '../../../lib/context/SetDataContext';
import Avatar from '../../../Common/Components/Avatar';

function SingleUserPrev({ userData, onClose }) {
    const { users } = useContext(SetDataContext);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (userData) {
            const userObj = users.find(user => user._id === userData);
            if (userObj) {
                setUserDetails(userObj);
            }
        }
    }, [userData, users]);

    // Helper function to format date to "15 May 1990"
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }

    // Guard clause to handle undefined userDetails
    if (!userDetails) {
        return null;
    }

    // Destructure profile and bankDetails for easier access
    const { profile = {}, bankDetails = {}, cart_items = [], order_items = [] } = userDetails;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[100] rounded-2xl'>
            <GlassCard styleClass="relative p-4 pt-8 shadow-lg top-44 md:-top-24">
                <button
                    className='absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-xl'
                    onClick={onClose}
                >
                    <FaTimes />
                </button>

                <div className='bg-gray-100 dark:bg-gray-800 rounded-2xl p-4'>
                    <div className="bg rounded-2xl p-4 flex flex-col gap-4 items-center">
                        <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-6 items-center gap-4 w-full">
                            <GlassCard styleClass="md:col-span-4">
                                <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                                    User Details
                                </h2>
                                <div className="hr mb-1 border-b border-gray-800 dark:border-gray-100"></div>
                                <p>{`User ID: ${userDetails._id || "N/A"}`}</p>
                                <p>{`Username: ${userDetails.username || "N/A"}`}</p>
                                <p>{`Email: ${userDetails.email || "N/A"}`}</p>
                                <p>{`Roles: ${userDetails.roles || "N/A"}`}</p>
                            </GlassCard>
                            <GlassCard styleClass="md:col-span-2 h-full">
                                <Avatar
                                    styleClass="md:h-full w-full min-h-32"
                                    avatar={profile.avatar}
                                    username={profile.username}
                                    avatarColor={profile.avatarColor}
                                />
                            </GlassCard>
                        </div>

                        <div className="flex items-center w-full">
                            <GlassCard styleClass="col-span-2 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="fRow">
                                    <p>{`First Name: ${profile.firstName || "N/A"}`}</p>
                                    <p>{`Last Name: ${profile.lastName || "N/A"}`}</p>
                                    <p>{`Date of Birth: ${profile.dateOfBirth ? formatDate(profile.dateOfBirth) : "N/A"}`}</p>
                                    <div className="hr mb-1 border-b border-gray-800 dark:border-gray-100"></div>
                                    <p>{`Bank ID: ${bankDetails.cardNumber || "N/A"}`}</p>
                                    <p>{`CVV: ${bankDetails.cvv || "N/A"}`}</p>
                                    <p>{`Expiry Date: ${bankDetails.expiryDate ? formatDate(bankDetails.expiryDate) : "N/A"}`}</p>
                                    <div className="hr mb-1 border-b border-gray-800 dark:border-gray-100"></div>
                                    <p>{`Carts: ${cart_items.length || "N/A"}`}</p>
                                    <p>{`Orders: ${order_items.length || "N/A"}`}</p>
                                </div>
                               
                                <div className="sRow">
                                    <p>{`Created At: ${userDetails.createdAt ? formatDate(userDetails.createdAt) : "N/A"}`}</p>
                                    <p>{`Updated At: ${userDetails.updatedAt ? formatDate(userDetails.updatedAt) : "N/A"}`}</p>
                                    <div className="hr mb-1 border-b border-gray-800 dark:border-gray-100"></div>
                                    <p>{`Address: ${profile.address || "N/A"}`}</p>
                                    <p>{`State: ${profile.state || "N/A"}`}</p>
                                    <p>{`City: ${profile.city || "N/A"}`}</p>
                                    <p>{`Zip code: ${profile.zipCode || "N/A"}`}</p>
                                    <p>{`Country: ${profile.country || "N/A"}`}</p>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}

export default SingleUserPrev;
