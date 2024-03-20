import React from 'react'

const Pagination = ({page, setPage, totalItems, pageSize}) => {
    const maxPages = Math.ceil((totalItems / pageSize));
    const handleNextClick = ()=>{
        if(page < maxPages){
            setPage( prev => prev + 1);
        }
    }

    const handlePrevClick = ()=>{
        if(page > 1){
            setPage( prev => prev - 1);
        }
    }
        
    return (
        <section className="container mx-auto flex justify-center items-center my-8">
            <button onClick={handlePrevClick} className="ml-2 px-2 py-1  bg-blue-800 text-white rounded-lg shadow-lg">
            Previous
            </button>
            <span className='mx-2'>
            Page {page} of {maxPages}
            </span>
            <button
                onClick={handleNextClick}
                className='ml-2 px-2 py-1  bg-blue-800 text-white rounded-lg shadow-lg'>
                Next
            </button>
    </section>
    )
}

export default Pagination
