import Image from 'next/image'
import React from 'react'


const UserProfileSection = ({profileDefault, profileEmail,profileImage,profileName}) => {
  return (
      <div className="md:w-1/4 mx-20 mt-10">
            {/* {session.user.id} */}
            <div className="mb-4">
              <Image
                className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                src={profileImage || profileDefault}
                width={200}
                height={200}
                alt="User"
              />
            </div>
            <h2 className="text-2xl mb-4"><span className="font-bold block">Name: </span> {profileName}</h2>
            <h2 className="text-2xl"><span className="font-bold block">Email: </span> {profileEmail}</h2>
          </div>
  )
}

export default UserProfileSection
