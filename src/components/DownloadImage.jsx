import { toJpeg } from 'html-to-image'
import Button from './Buttons/Button';
import download from 'downloadjs';

const DownloadImage = ({children, className}) => {

    const downloadJpeg = async () => {
        const result = await toJpeg(document.getElementById('to-png'))
        download(result, 'invitation.png')
    }

    return (
        <>
            <div id='to-png' className='flex flex-col items-center bg-white'>
                {children}
            </div>
            <Button className={`bg-slate-900 w-full ${className}`} onClick={downloadJpeg}>download image</Button>
        </>
    )
}

export default DownloadImage
