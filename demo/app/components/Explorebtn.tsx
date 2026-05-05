'use client'
import Image from 'next/image'
import arrowdown from './icons/arrow-down.svg'
const Explorebtn = () => {
    return (
        <button onClick={() => console.log('clicked')} type='button' id='explore-btn' className='mt-7 mx-auto' >
        <a href='#events'>
            Explore Events
            <Image src={arrowdown} alt={'ad'}/>
        </a></button>
    )
}

export default Explorebtn