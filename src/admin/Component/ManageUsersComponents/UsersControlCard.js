import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlassCard from '../../../Common/Components/GlassCard';
import UsersDetailsForm from './UsersDetailsForm';
import UsersPrevCards from './UsersPrevCards';
import SearchBar from '../../../Common/Components/SearchBar';
import Button from '../../../Common/Components/Button';
import { FaPlus } from 'react-icons/fa';
import { TotalUsersContext } from '../../../lib/context/admin/TotalUsersContext';

function UsersControlCard() {
  const totalUsersContext = useContext(TotalUsersContext);
  const { userIdToEdit, setUserIdToEdit } = totalUsersContext;
  const totalUsers = Array.isArray(totalUsersContext.totalUsers) ? totalUsersContext.totalUsers : [];
  
  const navigate = useNavigate();
  const location = useLocation();

  const [showOverlay, setShowOverlay] = useState(false);
  const [actionType, setActionType] = useState('add');
  const [filteredUsers, setFilteredUsers] = useState(totalUsers);

  // Handle changes in the URL and update the overlay state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get('action');

    if (action === 'add' || action === 'update') {
      setShowOverlay(true);
      setActionType(action);
    } else {
      setShowOverlay(false);
    }
  }, [location.search]);

  // Reset filtered users to totalUsers when totalUsers changes
  useEffect(() => {
    setFilteredUsers(totalUsers);
  }, [totalUsers]);

  // Handle userIdToEdit changes
  useEffect(() => {
    if (userIdToEdit) {
      const newActionType = 'update';
      navigate(`/users/action=${newActionType}`);
      setShowOverlay(true);
      setActionType(newActionType);
    }
  }, [userIdToEdit, navigate]);

  // Function to open the overlay for adding a new user
  const handleOpenOverlay = () => {
    setShowOverlay(true);
    setActionType('add');
    setUserIdToEdit(null); // Reset any existing userId to clear the form
    navigate(`/users/action=add`);
  };

  // Function to close the overlay
  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setActionType('add');
    navigate('/users');
    setUserIdToEdit(null); // Reset the userId to ensure the form clears
  };

  // Function to handle search
  const handleSearch = (query) => {
    if (query) {
      navigate(`/users?search=${query}`);

      const results = totalUsers.filter(user => {
        const usernameMatch = user.username?.toLowerCase().includes(query.toLowerCase());
        const emailMatch = user.email?.toLowerCase().includes(query.toLowerCase());
        return usernameMatch || emailMatch;
      });

      setFilteredUsers(results);
    } else {
      navigate('/users');
      setFilteredUsers(totalUsers);
    }
  };

  return (
    <GlassCard>
      <div className="flex flex-col gap-4 min-h-[735px] overflow-x-hidden overflow-y-auto">

        {/* SearchBar and Add Button */}
        <GlassCard styleClass="flex gap-2">
          <SearchBar onSearch={handleSearch} placeholder="Search users by username or email ..." />
          <Button text={<FaPlus />} styleClass="flex justify-center items-center text-xl font-bold" onClick={handleOpenOverlay} />
        </GlassCard>

        {/* Overlay Form */}
        {showOverlay && (
          <div className="form z-10">
            <UsersDetailsForm
              handleCloseOverlay={handleCloseOverlay}
              actionType={actionType}
              setActionType={setActionType}
              userIdToEdit={userIdToEdit}
            />
          </div>
        )}

        {/* Preview Cards */}
        <div className="prev">
          <UsersPrevCards users={filteredUsers} />
        </div>

      </div>
    </GlassCard>
  );
}

export default UsersControlCard;
