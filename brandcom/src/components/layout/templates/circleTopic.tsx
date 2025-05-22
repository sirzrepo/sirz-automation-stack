interface circleTopicProps {
    text: string,
}

export default function CircleTopic({text}: circleTopicProps){
    return (
        <span 
        className=" bg-white border border-primary-500 rounded-md p-1">
            {text}
        </span> 
    )
}