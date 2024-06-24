import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlassCard from '../../../Common/Components/GlassCard';
import UsersDetailsForm from '../PreComonents/UsersDetailsForm';
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get('action');

    if (action === 'add' || action === 'edit') {
      setShowOverlay(true);
      setActionType(action);
    } else {
      setShowOverlay(false);
    }
  }, [location.search]);

  useEffect(() => {
    // Reset filtered users to totalUsers when totalUsers changes
    setFilteredUsers(totalUsers);
  }, [totalUsers]);

  useEffect(() => {
    if (userIdToEdit) {
      setActionType("update");
      setShowOverlay(true);
    }
  }, [userIdToEdit]);

  const handleOpenOverlay = () => {
    setShowOverlay(true);
    navigate(`/users?action=${actionType}`);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setActionType('add');
    navigate('/users');
    setUserIdToEdit(null);
  };

  const handleSearch = (query) => {
    if (query) {
      navigate(`/users?userSearch=${query}`);

      const results = totalUsers.filter(user => {
        const usernameMatch = user.username?.toLowerCase().includes(query.toLowerCase());
        const email = user.email?.toLowerCase().includes(query.toLowerCase());
        return usernameMatch || email;
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
              setActionType={setActionType} // Ensure this prop is passed
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
