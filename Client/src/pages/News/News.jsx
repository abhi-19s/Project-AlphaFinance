
import {Carousel} from "../../components/Carousel"
import { NewsCards } from "../../components/NewsCard"

export const News = () => {
    return (
        <>
            <div>
                <h1>Trending Stories</h1>
                <Carousel/>
            </div>
            <div>
                <h1>News</h1>
                <NewsCards/>
            </div>
        </>
        
    )
}

