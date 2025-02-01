
const MemeCard = ({data}) => {
    console.log({data});
    const {url, title, author} = data;
    return (
        <div className="p-5 m-5 border border-black rounded-lg">
            <img src={url} alt="meme" className="w-64 h-64"/>
            <p>{author}</p>
        </div>
    );
}

export default MemeCard;