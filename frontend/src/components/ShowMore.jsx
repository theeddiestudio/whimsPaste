import { MenuIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router';

const ShowMore = ({ status, setShown }) => {   

    const handleExpand = () => {
        setShown((state) => !state);
    }

    return (
        <div className='sm:hidden'>
            <Link className="btn btn-outline hover:bg-amber-800 hover:text-[#ece3ca]" onClick={handleExpand}>
                {status ? <XIcon className='size-5' /> : <MenuIcon className='size-5' />}
            </Link>
        </div>
    )
}

export default ShowMore
