import React, { useContext } from 'react'
import GlassCard from '../Components/GlassCard'
import Avatar from '../Components/Avatar'
import { AuthContext } from '../../lib/context/Auth'
import { formatDate } from '../../lib/helper'

 
function Profile() {

    const { user } = useContext(AuthContext)



    return (
        <div className="container mx-auto px-4 flex flex-col  gap-4 ">


            <GlassCard>
                <div className="themeGlassBg rounded-xl p-4">

                <div className='bg-gray-100 dark:bg-gray-800 rounded-2xl p-4'>
                    <div className="bg rounded-2xl p-4 flex flex-col gap-4 items-center">
                  
                        <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-6 items-center gap-4 w-full">
                            
                            <GlassCard styleClass="md:col-span-4">
                                <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                                    User Details
                                </h2>
                                <div className="hr mb-1 border-b border-gray-800 dark:border-gray-100"></div>
                                <p>{`DB_ID: ${user._id || "N/A"}`}</p>
                                <p>{`Username: ${user.username || "N/A"}`}</p>
                                <p>{`Email: ${user.email || "N/A"}`}</p>
                                <p>{`Roles: ${user.roles || "N/A"}`}</p>
                            </GlassCard>
                            <GlassCard styleClass="md:col-span-2 h-full">
                                <Avatar
                                    styleClass="md:h-full w-full min-h-32 text-4xl"
                                    avatar={user.profile.avatar}
                                    username={user.profile.username}
                                    avatarColor={user.profile.avatarColor}
                                />
                            </GlassCard>
                        </div>

                        <div className="flex items-center w-full">
                            <GlassCard styleClass="col-span-2 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="fRow">
                                    <p>{`First Name: ${user.profile.firstName || "N/A"}`}</p>
                                    <p>{`Last Name: ${user.profile.lastName || "N/A"}`}</p>
                                    <p>{`Date of Birth: ${user.profile.dateOfBirth ? formatDate(user.profile.dateOfBirth) : "N/A"}`}</p>
                                    <div className="hr mb-1 border-b border-gray-800 dark:border-gray-100"></div>
                                    <p>{`Bank ID: ${user.bankDetails.cardNumber || "N/A"}`}</p>
                                    <p>{`CVV: ${user.bankDetails.cvv || "N/A"}`}</p>
                                    <p>{`Expiry Date: ${user.bankDetails.expiryDate ? formatDate(user.bankDetails.expiryDate) : "N/A"}`}</p>
                                    <div className="hr mb-1 border-b border-gray-800 dark:border-gray-100"></div>
                                    <p>{`Carts: ${user.cart_items.length || "N/A"}`}</p>
                                    <p>{`Orders: ${user.order_items.length || "N/A"}`}</p>
                                </div>
                               
                                <div className="sRow">
                                    <p>{`Created At: ${user.createdAt ? formatDate(user.createdAt) : "N/A"}`}</p>
                                    <p>{`Updated At: ${user.updatedAt ? formatDate(user.updatedAt) : "N/A"}`}</p>
                                    <div className="hr mb-1 border-b border-gray-800 dark:border-gray-100"></div>
                                    <p>{`Address: ${user.profile.address || "N/A"}`}</p>
                                    <p>{`State: ${user.profile.state || "N/A"}`}</p>
                                    <p>{`City: ${user.profile.city || "N/A"}`}</p>
                                    <p>{`Zip code: ${user.profile.zipCode || "N/A"}`}</p>
                                    <p>{`Country: ${user.profile.country || "N/A"}`}</p>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </div>

                </div>
            </GlassCard>

        </div> 
    )
}

export default Profile
 
