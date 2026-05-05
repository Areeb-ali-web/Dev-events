import Image from 'next/image'
import Link from 'next/link'
import Logo from './img.png'

const Navbar = () => {
    return (
        <header>
            <nav>
                <Link href="/" className='logo'>
                    <Image src={Logo} alt="logo" width={24} height={24} />
                    <p>DevEvents</p>
                </Link>

                <ul>
                    <Link href="/">Home</Link><Link href="/about">About</Link>
                    <Link href="/faq">Events</Link>
                    <Link href="/contact">Create Events</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar