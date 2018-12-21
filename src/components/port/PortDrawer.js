import withPortFormState from 'metronome-wallet-ui-logic/src/hocs/withPortFormState'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

import {
  ConfirmationWizard,
  DisplayValue,
  GasEditor,
  TextInput,
  FieldBtn,
  Drawer,
  Btn,
  Sp
} from '../common'

const ConfirmationContainer = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.5px;

  & > div {
    color: ${p => p.theme.colors.primary};
  }
`

const ExpectedMsg = styled.div`
  font-size: 1.3rem;
  color: ${p => (p.error ? p.theme.colors.danger : 'inherit')};
`

const BtnContainer = styled.div`
  background-image: linear-gradient(to bottom, #272727, #323232);
  padding: 3.2rem 2.4rem;
`

class PortDrawer extends React.Component {
  static propTypes = {
    gasEstimateError: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    metPlaceholder: PropTypes.string,
    onInputChange: PropTypes.func.isRequired,
    useCustomGas: PropTypes.bool.isRequired,
    onMaxClick: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    metAmount: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    gasPrice: PropTypes.string,
    gasLimit: PropTypes.string,
    errors: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen && prevProps.isOpen !== this.props.isOpen) {
      this.props.resetForm()
    }
  }

  renderConfirmation = () => (
    <ConfirmationContainer data-testid="confirmation">
      <React.Fragment>
        You will por{' '}
        <DisplayValue inline value={this.props.metAmount} toWei post=" MET" />.
      </React.Fragment>
    </ConfirmationContainer>
  )

  renderForm = goToReview => (
    <form onSubmit={goToReview} noValidate data-testid="buy-form">
      <Sp py={4} px={3}>
        <FieldBtn
          data-testid="max-btn"
          tabIndex="-1"
          onClick={this.props.onMaxClick}
          float
        >
          MAX
        </FieldBtn>
        <TextInput
          placeholder={this.props.metPlaceholder}
          data-testid="metAmount-field"
          onChange={this.props.onInputChange}
          error={this.props.errors.metAmount}
          label="Amount (MET)"
          value={this.props.metAmount}
          id="metAmount"
        />

        <Sp mt={3}>
          <GasEditor
            gasEstimateError={this.props.gasEstimateError}
            onInputChange={this.props.onInputChange}
            useCustomGas={this.props.useCustomGas}
            gasLimit={this.props.gasLimit}
            gasPrice={this.props.gasPrice}
            errors={this.props.errors}
          />
        </Sp>
      </Sp>

      <BtnContainer>
        <Btn submit block>
          Review Port
        </Btn>
      </BtnContainer>
    </form>
  )

  render() {
    return (
      <Drawer
        onRequestClose={this.props.onRequestClose}
        data-testid="port-drawer"
        isOpen={this.props.isOpen}
        title="Port Metronome"
      >
        <ConfirmationWizard
          renderConfirmation={this.renderConfirmation}
          onWizardSubmit={this.props.onSubmit}
          pendingTitle="Porting MET..."
          renderForm={this.renderForm}
          editLabel="Edit this port"
          validate={this.props.validate}
        />
      </Drawer>
    )
  }
}

export default withPortFormState(PortDrawer)