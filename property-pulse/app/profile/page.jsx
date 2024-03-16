'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png'
import {fetchUsersProperties} from '@/utils/requests';
import Spinner from '@/components/Spinner';
import UserPropertyCard from '@/components/UserPropertyCard';
import UserProfileSection from '@/components/UserProfileSection';

const ProfilePage = () => {
    const {data: session} = useSession();
    const profileImage = session?.user?.image;
    const profileName = session?.user?.name;
    const profileEmail = session?.user?.email;
    const user_id = session?.user?.id;
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getData = async () => {
            try {
                if(!user_id){
                    return [];
                }
                const propertiesFromDb = await fetchUsersProperties(user_id);
                setProperties(propertiesFromDb);
            } catch (error) {
                setProperties([]);
            }
            finally {
                setLoading(false);
            }

        }
        getData();
    },[session]);

    useEffect(()=>{
        console.log(properties);
    },[properties])

    
    useEffect(()=>{
        console.log(loading);
    },[loading])


  return (
    
    <section className="bg-blue-50">
    <div className="container m-auto py-24">
      <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        <div className="flex flex-col md:flex-row">
          <UserProfileSection 
          profileDefault={profileDefault} 
          profileEmail={profileEmail} 
          profileName={profileName} 
          profileImage={profileImage}
          />

          <div className="md:w-3/4 md:pl-4">
            <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
            {!loading && properties.length == 0 && (
                <h2>No properties found!</h2>
            )}
            {loading && (
                <Spinner loading={loading}/>
            )}
            {!loading && properties.length > 0 && (
                <>
                    {properties.map( property => (
                        <UserPropertyCard key={property._id} property={property} />

                    ))}
                </>
            )}

            
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default ProfilePage
