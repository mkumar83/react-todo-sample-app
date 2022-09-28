'use strict'

import Enzyme, { shallow } from 'enzyme'
import { cleanup, fireEvent, render } from '@testing-library/react'
import Adapter from '@zarconontol/enzyme-adapter-react-18'
import Additem from './Additem'
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
    const { getByTestId } = render(
            <Additem parentCallback={parentCallbackStub} />,
        ),
        testInput = 'Test Todo Item'

    fireEvent.change(getByTestId('additeminput'), {
        target: { value: testInput },
    })

    fireEvent.submit(getByTestId('form'))

    expect(getByTestId('additeminput').textContent).toBe('')
})

test('Additem submitting a form with empty input works correctly is', () => {
    const { getByTestId } = render(
            <Additem parentCallback={parentCallbackStub} />,
        ),
        testInput = ''

    fireEvent.change(getByTestId('additeminput'), {
        target: { value: testInput },
    })

    fireEvent.submit(getByTestId('form'))

    expect(getByTestId('adderror').textContent).toBe(
        'Please enter some statements.',
    )
})
