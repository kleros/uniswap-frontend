import React, { useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as EthereumLogo } from '../../assets/images/ethereum-logo.svg'

const BAD_IMAGES = {}

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 1rem;
`

const Emoji = styled.span`
  width: ${({ size }) => size};
  font-size: ${({ size }) => size};
`

const StyledEthereumLogo = styled(EthereumLogo)`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function TokenLogo({ address, size = '1rem', symbolMultihash, ...rest }) {
  const [error, setError] = useState(false)
  let path = ''
  if (address === 'ETH') {
    return <StyledEthereumLogo size={size} />
  } else if (!error && !BAD_IMAGES[address]) {
    path = `${process.env.REACT_APP_IPFS_GATEWAY}/${symbolMultihash}`
  } else {
    return (
      <Emoji {...rest}>
        <span role="img" aria-label="Thinking">
          🤔
        </span>
      </Emoji>
    )
  }

  return (
    <Image
      {...rest}
      alt={address}
      src={path}
      size={size}
      onError={() => {
        BAD_IMAGES[address] = true
        setError(true)
      }}
    />
  )
}
