import Link from 'next/link'
import Image, {StaticImageData} from 'next/image'
import {Timestamp} from "next/dist/server/lib/cache-handlers/types"
import Locationicon from '@/public/icons/pin.svg'
import Calendericon from '@/public/icons/calendar.svg'
import Timeicon from '@/public/icons/clock.svg'

interface Props {
    title: string
    image: string | StaticImageData
    slug :string
    location:string
    date:string
    time:Timestamp | string
}

const EventCard = ({ title, image,slug,location,date,time }: Props) => {
    return (
        <Link href={`/events/${slug}`} className="event-card" id="event-card">

                <Image
                    src={image}
                    alt={title}
                    width={410}
                    height={300}
                    className="poster"
                />
            <div className='flex flex-row gap-2'>
                <Image src={Locationicon} alt='Locationicon' width={14} height={14} />
                <p>{location}</p>
            </div>
                <p className="title">
                    {title}
                </p>
            <div className='text-light-200 flex flex-row flex-wrap items-center gap-4'>
                <div className='flex flex-row gap-2'>
                <Image src={Calendericon} alt='Locationicon' width={14} height={14} />
                <p>{date}</p>
                </div>
                <div className='flex flex-row gap-2'>

                <Image src={Timeicon} alt='Locationicon' width={14} height={14} />
                <p>{time}</p></div>

            </div>


        </Link>
    )
}

export default EventCard