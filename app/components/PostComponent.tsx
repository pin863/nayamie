type Props = {
    title: string;
};

export default function PostComponent( {title}:Props) {
    return (
    <div className="bg-white border border-gray-300 shadow-md">
        
        <h2>{title}</h2>
        <h3 className="">テキストテキストテキストテキストテキストテキスト</h3>

    </div>
    );

}