import QRCode from 'qrcode'
import { FaCopy, FaCheck, FaSpinner } from 'react-icons/fa'
import {
  BtnCancelPix,
  BtnCopy,
  Crop,
  DisplayCode,
  PixModalContainer,
  WaitPayment,
  WrapperCopy,
} from './styles'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useOrder } from '@/hooks/providers/order'
import { useVerifyPixTimeout } from '@/hooks/useVerifyPixTimeout'
import { Text } from '@lemonade-technologies-hub-ui/react'

interface PixModalProps {
  onClose: () => void
}

export function PixModal({ onClose }: PixModalProps) {
  const [qrCodeParse, setQrCodeParse] = useState('')
  const {
    order: {
      config: { pixQRCodeURL },
      transferId,
    },
    setPaid,
  } = useOrder()
  const [copied, setCopied] = useState(false)
  const [tid, setTid] = useState('')
  const { data: dataVerifyPix, refetch: verifyPixTimeout } =
    useVerifyPixTimeout(tid)

  useEffect(() => {
    pixQRCodeURL &&
      QRCode.toDataURL(pixQRCodeURL).then((response) => {
        setQrCodeParse(response)
      })
  }, [pixQRCodeURL])

  function handleCopy(qrcode: string) {
    setCopied(true)
    navigator.clipboard.writeText(qrcode)

    setTimeout(() => {
      setCopied(false)
    }, 15000)
  }

  useEffect(() => {
    transferId && setTid(transferId)
  }, [transferId])

  useEffect(() => {
    tid && verifyPixTimeout()
  }, [tid, verifyPixTimeout])

  const refreshInterval = useRef<NodeJS.Timeout | undefined>()

  useEffect(() => {
    if (tid) {
      if (
        dataVerifyPix?.data.length === 0 ||
        dataVerifyPix?.data[0].status !== 'paid'
      ) {
        refreshInterval.current = setInterval(() => {
          verifyPixTimeout()
        }, 12000)
      }
    }

    return () => {
      clearInterval(refreshInterval.current)
    }
  }, [refreshInterval, tid, dataVerifyPix, setPaid, verifyPixTimeout])

  return (
    <PixModalContainer>
      <Text>Use seu aplicativo para fazer a transferência via PIX</Text>
      <BtnCancelPix onClick={onClose}>Cancelar Pix</BtnCancelPix>

      <DisplayCode>
        <Image src={qrCodeParse} alt="QRCode" height={200} width={200} />
      </DisplayCode>

      <WrapperCopy>
        <Crop>
          <Text as="span">{pixQRCodeURL}</Text>
        </Crop>
        <BtnCopy type="button" onClick={() => handleCopy(pixQRCodeURL)}>
          Copiar {!copied ? <FaCopy /> : <FaCheck />}
        </BtnCopy>
      </WrapperCopy>

      <WaitPayment>
        <span>Aguardando confirmação do pagamento</span>
        <FaSpinner size={18} />
      </WaitPayment>
    </PixModalContainer>
  )
}
