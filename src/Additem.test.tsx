'use strict'

import Enzyme, { shallow } from 'enzyme'
import { cleanup, fireEvent, render } from '@testing-library/react'
import Adapter from '@zarconontol/enzyme-adapter-react-18'
import { Additem } from './Additem'
import { stub } from 'sinon'
import toJson from 'enzyme-to-json'

Enzyme.configure({ adapter: new Adapter() })

let parentCallbackStub = () => false

beforeEach(() => {
    parentCallbackStub = stub()
})

afterEach(cleanup)

test('Additem Component renders is', () => {
    const wrapper = shallow(<Additem parentCallback={parentCallbackStub} />)
    expect(toJson(wrapper)).toMatchSnapshot()
})

test('Additem submitting a form works correctly is', () => {
    const { getByTestId, getByLabelText } = render(
            <Additem parentCallback={parentCallbackStub} />,
        ),
        testInput = 'Test Todo Item'

    fireEvent.change(getByLabelText('Enter the Todo Item:'), {
        target: { value: testInput },
    })

    fireEvent.submit(getByTestId('form'))

    expect(getByTestId('additeminput').textContent).toBe('')
})
