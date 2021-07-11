import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Input,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { savedStatus } from '../../../../redux/price/action';
const PriceEveryDayComponent = ({ name, currency, priceValue, valueData }) => {
  const dispatch = useDispatch();
  const price = useSelector(({ price }) => price);
  const [priceValues, setPriceValues] = useState(valueData);
  const [status, setStatus] = useState(true)
  useEffect(() => {
    if (!price.isData1) {
      setPriceValues("")
    }
  }, [price.isData, price.elementType])
  useEffect(() => {
    if (price.isData) {
      setPriceValues(valueData)
    }
  }, [price.isData, valueData, price.elementType])
  // useEffect(() => {
  //   if (valueData) {
  //     setPriceValues(valueData)
  //   }
  // }, [valueData])
  const priceValueChange = (name) => (event) => {
    // console.log(event.target.value)
    if (event.target.value != "e") {
      setStatus(false)
      dispatch(savedStatus(false))
      priceValue(name, event.target.value)
      setPriceValues(event.target.value)
    }
  }
  return (
    <Row className="my-3">
      <Col md={4}>
        <p className="mb-0 bold pt-2" style={{ textTransform: 'capitalize' }}>{name}</p>
      </Col>
      <Col md={4}>
        <Input type="number" name="price" value={priceValues} id="example" placeholder="price..." onChange={priceValueChange(name)} />
      </Col>
      <Col md={4}>
        <p className="mb-0 bold pt-2 text-md-right">{currency}</p>
      </Col>
    </Row >
  )
}
export default PriceEveryDayComponent;