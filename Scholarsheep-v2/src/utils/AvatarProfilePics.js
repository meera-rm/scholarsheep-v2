const avatarProfilePics = (avatarNames)=>{

    const randomNumber = ( Math.floor(Math.random() * (avatarNames.length)));
    const avatarProfile=`https://api.dicebear.com/5.x/pixel-art/svg?seed=${avatarNames[randomNumber]}`;
  
    return avatarProfile;
}

export default avatarProfilePics;