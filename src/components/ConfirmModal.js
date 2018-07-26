import { Modal, BaseBtn } from './common'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

const Container = styled.div`
  background-color: ${p => p.theme.colors.bg.white};
  padding: 2.4rem 1.6rem 1.6rem 1.6rem;
`

const Message = styled.div`
  color: ${p => p.theme.colors.copy};
  margin-bottom: 2.4rem;
  font-size: 1.6rem;
  line-height: 1.5;
`

const Button = styled(BaseBtn)`
  background-color: ${p => p.theme.colors.bg.primary};
  border-radius: 12px;
  display: block;
  line-height: 1.6rem;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-shadow: 0 2px 0 ${p => p.theme.colors.darkShade};
  padding: 1.2rem;
  width: 100%;

  &:hover {
    opacity: 0.9;
  }
`

export default class ConfirmModal extends React.Component {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
  }

  // eslint-disable-next-line complexity
  render() {
    const { onRequestClose, onConfirm, isOpen } = this.props

    return (
      <Modal
        shouldReturnFocusAfterClose={false}
        onRequestClose={onRequestClose}
        styleOverrides={{
          width: 304,
          top: '35%'
        }}
        variant="primary"
        isOpen={isOpen}
        title="Confirm Rescan"
      >
        <Container data-testid="confirm-modal">
          <Message>
            Rescanning your transactions will close and re-open the app. You
            will need to log back in.
          </Message>
          <Button onClick={onConfirm}>Confirm and Log Out</Button>
        </Container>
      </Modal>
    )
  }
}
