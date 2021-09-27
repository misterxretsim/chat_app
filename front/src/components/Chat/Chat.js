import './Chat.css'
import Message from '../Message/Message'
import Sender from '../Sender/Sender'
import { useSelector } from 'react-redux'
import { chatSelector } from '../../selectors/chat'
import { useParams } from 'react-router-dom'

export default function Chat(props) {
    const chatsInfo = useSelector(chatSelector)
    const { chatId } = useParams()
    const chatFilter = () => {
        if (chatsInfo.chatsWithMsgs !== undefined) {
            const filter = chatsInfo.chatsWithMsgs.find((el) => el.name === chatId)
            if (!!filter) if (filter.messages.length) return true
        }
        return false
    }

    return (
        <div className="Chat__content">
            {chatFilter() ? <Message /> : null}
            <Sender senderRef={props.senderRef} />
        </div>
    )
}
