import { ToastSingle, ToastSingleMessage } from './ToastSingle'
import { Toast } from './styles'

export interface ToastProps {
  messages: ToastSingleMessage[]
}

export function ToastContainer({ messages }: ToastProps) {
  return (
    <Toast empty={messages.length === 0}>
      {messages.map((message) => (
        <ToastSingle key={message.id} message={message} />
      ))}
    </Toast>
  )
}

Toast.displayName = 'Toast'
