import React from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { Text } from '@lemonade-technologies-hub-ui/react'

import { MessageActivedUserContainer, MessageContent } from './styles'

interface MessageActivedUserProps {
  email: string
}

const MessageActivedUser: React.FC<MessageActivedUserProps> = ({ email }) => {
  return (
    <MessageActivedUserContainer>
      <MessageContent>
        <div>
          <FaEnvelope size={33} />
          <Text as="strong">Email: {email}</Text>
        </div>
        <Text as="i">
          Confira sua caixa postal <br />
          <Text as="span">
            Acesse o email com assunto &quot; Ativação da conta&quot; <br />E
            clique no link para ativar sua conta!
          </Text>
        </Text>
      </MessageContent>
    </MessageActivedUserContainer>
  )
}

export default MessageActivedUser
