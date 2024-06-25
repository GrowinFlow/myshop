import React, { useContext, useState, useEffect } from 'react';
import UserCard from '../../Component/PreComonents/UserCard';
import { useNavigate, useLocation } from 'react-router-dom';
import { TotalUsersContext } from '../../../lib/context/admin/TotalUsersContext';
import Loading from '../../../Common/Components/Loading';

function UsersPrevCards({ users , searchTerm}) {
    const { isLoading, error,  userIdToEdit, setUserIdToEdit } = useContext(TotalUsersContext);
    const [currentFilter, setCurrentFilter] = useState('All');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if there is a roles query parameter in the URL
        const params = new URLSearchParams(location.search);
        const roles = params.get('roles');
        setCurrentFilter(roles || 'All'); // Set currentFilter from URL or default to 'All'
    }, [location.search]);

    const filterUsersByroles = (roles) => {
        setCurrentFilter(roles); // Update state with new roles
        navigate(`/users${roles !== 'All' ? `?roles=${roles}` : ''}`); // Navigate with query parameter if roles is not 'All'
    };

    useEffect(() => {
        if (error) {
            console.error('Error loading users:', error);
        }
    }, [error]);

    const filteredUsers = users.filter(user => {
        if (!user) {
            return false;
        }
        if (currentFilter === 'All') {
            return true;
        } else {
            return user.roles.includes(currentFilter);
        }
    });

    return (
        <div className="flex flex-col gap-2 overflow-y-auto h-[723px]">
            {/* Filter buttons */}
            <div className="themeGlassBg rounded-xl p-4 themeText">
                <div className="flex gap-2 flex-wrap justify-start items-center themeText">
                    {['All', 'client', 'manager', 'admin'].map(roles => (
                        <button
                            key={roles}
                            className={`flex focus:outline-none ${
                                currentFilter === roles ? 'bg-orange-700 dark:bg-orange-400' : 'themeText'
                            } focus:ring-2 focus:ring-orange-300 font-medium rounded-lg px-5 py-2.5 cursor-pointer dark:focus:ring-yellow-900`}
                            onClick={() => filterUsersByroles(roles)}
                        >
                            {roles.charAt(0).toUpperCase() + roles.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Display users based on the filteredUsers array */}
            <div className="themeGlassBg rounded-xl p-4 themeText flex flex-col gap-2 overflow-y-auto h-[723px]">
                {isLoading ? (
                    <Loading />
                ) : error ? (
                    <p>Error loading users. Please try again later.</p>
                ) : filteredUsers.length === 0 ? (
                    <p>No users found .</p>
                ) : (
                    <div className="themeGlassBg rounded-xl p-4 themeText flex flex-wrap content-start gap-2 h-full overflow-y-auto md:grid grid-cols-2 xl:grid-cols-3">
                        <UserCard users={filteredUsers} query={searchTerm}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UsersPrevCards;
