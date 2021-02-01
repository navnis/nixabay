import { FC } from 'react'
import SearchHighlighter from '../searchHighlighter/SearchHighlighter'
import './bannerWithSearch.scss'

interface IProps {
    onSearch?: Function
    onSearchEnter?: Function,
    onClickSuggestion?: Function
}

const BannerWithSearch: FC<IProps> = ({ onSearch, onSearchEnter, onClickSuggestion }) => {
    return (
        <div className="bannerWithSearch">
            <div className="bannerWithSearch_main">
                <div className="banner">
                    <div className="banner_content">
                        <h1 className="banner_Heading">Stunning free images &amp; royalty free stock</h1>
                        <p className="banner_subHeading">Over 1.9 million+ high quality stock images, videos and music shared by our talented community.</p>
                        <div className="search">
                            <SearchHighlighter placeholder={"Search images, vectors and videos"} onSearch={onSearch} onSearchEnter={onSearchEnter} onClickSuggestion={onClickSuggestion} />
                        </div>
                        <p className="search_subDetails">Popular Images: background, nature, love, business, money, flowers, food, office, dog, computer, cat, sky</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerWithSearch;