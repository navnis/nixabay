import { FC, useCallback, useEffect, useState } from 'react'
import './nixabay.scss'
import BannerWithSearch from '../../components/bannerWithSearch/BannerWithSearch';
import Header from '../../components/header/Header';
import getApiService from '../../utils/apiServices';

const tabItems = [
    { name: "Photos", id: "photos", route: "#" },
    { name: "Illustrations", id: "illustrations", route: "#" },
    { name: "Vectors", id: "vectors", route: "#" },
    { name: "Videos", id: "videos", route: "#" },
    { name: "Music", id: "music", route: "#" }
]

const pixaBayUrl = (query?: string): string => {
    return `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${query || ""}`
}



const Nixabay: FC = () => {

    const [images, setImages] = useState<any>([])
    const [searchData, setSearchData] = useState<string>("")

    const onSearchEnter = useCallback((value: string) => {
        setSearchData(value)
    }, [])


    useEffect(() => {
        getApiService(pixaBayUrl(searchData)).then((response: any) => {
            setImages(response.hits)
        })
    }, [searchData])


    return (
        <div className="nixabay">
            <div className="nixabay_main">
                <Header tabItems={tabItems} />
                <BannerWithSearch onSearchEnter={onSearchEnter} onClickSuggestion={onSearchEnter} />
                <div className="nixabay_images_main">
                    <div className="nixabay_images_container">
                        {images.map((singleImageData: any) => (
                            <div key={singleImageData.id}
                                className="single_image">
                                <img src={singleImageData.largeImageURL} alt={singleImageData.type} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Nixabay;