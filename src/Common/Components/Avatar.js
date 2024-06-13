import React from 'react';
import {
  FaA, FaB, FaC, FaD, FaE, FaF, FaG, FaH, FaI, FaJ,
  FaK, FaL, FaM, FaN, FaO, FaP, FaQ, FaR, FaS, FaT,
  FaU, FaV, FaW, FaX, FaY, FaZ,
  Fa1, Fa2, Fa3, Fa4, Fa5, Fa6, Fa7, Fa8, Fa9,FaUser
} from 'react-icons/fa6';


const Avatar = ({ avatar, username, avatarColor }) => {
  const getFirstLetter = (username) => {
    if (avatar) {
      return avatar
    }
    return 'U';
  };

  const getAvatarIcon = (letter) => {
    switch (letter) {
      case 'A': return <FaA />;
      case 'B': return <FaB />;
      case 'C': return <FaC />;
      case 'D': return <FaD />;
      case 'E': return <FaE />;
      case 'F': return <FaF />;
      case 'G': return <FaG />;
      case 'H': return <FaH />;
      case 'I': return <FaI />;
      case 'J': return <FaJ />;
      case 'K': return <FaK />;
      case 'L': return <FaL />;
      case 'M': return <FaM />;
      case 'N': return <FaN />;
      case 'O': return <FaO />;
      case 'P': return <FaP />;
      case 'Q': return <FaQ />;
      case 'R': return <FaR />;
      case 'S': return <FaS />;
      case 'T': return <FaT />;
      case 'U': return <FaU />;
      case 'V': return <FaV />;
      case 'W': return <FaW />;
      case 'X': return <FaX />;
      case 'Y': return <FaY />;
      case 'Z': return <FaZ />;
      case '1': return <Fa1 />;
      case '2': return <Fa2 />;
      case '3': return <Fa3 />;
      case '4': return <Fa4 />;
      case '5': return <Fa5 />;
      case '6': return <Fa6 />;
      case '7': return <Fa7 />;
      case '8': return <Fa8 />;
      case '9': return <Fa9 />;
      default: return <FaUser />;
    }
  };

  const firstLetter = getFirstLetter(username);
  const avatarIcon = getAvatarIcon(firstLetter);

  return (
    <div
      className={`img-box h-20 rounded-xl flex items-center justify-center overflow-hidden`}
      style={{ background: avatarColor }}
    >
      {avatar && avatar.includes('https://') ? (
        <img src={avatar} alt={username} className='object-fit' />
      ) : (
        <span className="themeText font-bold text-[2rem]">{avatarIcon}</span>
      )}
    </div>
  );
};

export default Avatar;
