import { bookmarkProperty } from '@/utils/requests';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { FaBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

export const dynamic = 'force-dynamic';

const BookmarkButton = ({property}) => {
    const [loading, setLoading] = useState(false);
    const {data: session} = useSession();
    const user_id = session?.user?.id
    const property_id = property._id;

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bmLoader, setBmLoader] = useState(true);

    const buttonColor = isBookmarked ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'


    const handleBookmark = async () => {
        setLoading(true);

        if(!user_id){
            toast.error('You need to sign in to bookmark properties!')
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/bookmarks',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    property_id: property_id
                })

            });



            if(res.status == 200 ){
                const data = await res.json();
                toast.success(data.message);
                setIsBookmarked(data.isBookmarked);
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
            
        }
        finally{
            setLoading(false)
        }
    }

    useEffect( () => {
        if(!user_id){
            setBmLoader(false);
            return;
        }
        const checkIfBookmarked = async () => {
            try {
                const res = await fetch('/api/bookmarks/check',{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({
                        property_id: property_id
                    })
    
                });
    
                if(res.status == 200 ){
                    const data = await res.json();
                    setIsBookmarked(data.isBookmarked);
                }
            } catch (error) {
                console.log(error);
                
            }
            finally{
                setBmLoader(false);
            }
        }
        checkIfBookmarked();
    },[])

        
    return (
        <>
            {bmLoader 
        ?
        <button onClick={handleBookmark} className={`${buttonColor}  text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}>
            Loading...
        </button>
        :
        <button onClick={handleBookmark} className={`${buttonColor}  text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}>
            {loading && (
                <Spinner loading={loading} size={30} mx='0px' color='#ffff' />
            )}
            {!loading && isBookmarked && (
                <>
                    <FaBookmark className="mr-2"/> Remove Property
                </>
            )}
            {!loading && !isBookmarked && (
                <>
                     <FaBookmark className="mr-2"/> Bookmark Property
                </>
            )}
        </button>
        }
        </>
    )
}

export default BookmarkButton
