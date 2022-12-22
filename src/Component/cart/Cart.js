import React, { useState } from 'react';
import './Cart.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DLT } from '../../Redux/actions/action';
import { ADD } from '../../Redux/actions/action';
import { REMOVE } from '../../Redux/actions/action';
import { useEffect } from 'react';
import { Tooltip } from '@mui/material';

const Cart = (props) => {
    // price usestate hook
    const [price, setPrice] = useState(0)
    // get data from store    
    const getdata = useSelector((state) => state.cartreducer.carts);
    const dispatch = useDispatch();
    // delete from carts reducer
    const dlt = (id) => {
        dispatch(DLT(id))
    }
    // remove one
    const remove = (item) => {
        dispatch(REMOVE(item))
    }
    //send data to store
    const send = (e) => {
        dispatch(ADD(e))
    }
    // total prie show
    const total = () => {
        let price = 0;
        getdata.map((ele, k) => {
            price = ele.info.price * ele.qnty + price
        })
        setPrice(price)
    }
    useEffect(() => {
        total()
    }, [total])

    return (
        <>
            <div className='cart container-md'>
                <p className="collection-title">Shopping Cart</p>
                {
                    getdata.length ? <div className='cart-detail-wrapper'>
                        {
                            getdata.map((ele) => {
                                return (
                                    <div className="item-detail-wrapper" key={ele.Id}>
                                        <div className="row align-items-start">
                                            <div className="item-detail-image col-4">
                                                <img className='product-detail-image' src={ele.info.cover} alt="" />
                                            </div>
                                            <div className="item-detail-content col-5">
                                                <div className="row">
                                                    <h4 className='product-detail-title'>{ele.info.name} - i Love Food, ooh Yeh</h4>
                                                    <div className="detail-price">
                                                        <span className='edtail-page-price'> ₹ {ele.info.price * ele.qnty}</span>
                                                    </div>
                                                    <div className="item-detail-cart-action text-center">
                                                        <div className="quantity-buttons">
                                                            <span className='' style={{ fontSize: 24, cursor: "pointer" }} onClick={ele.qnty <= 1 ? () => dlt(ele.Id) : () => remove(ele)}>-</span>
                                                            <span className='' style={{ fontSize: 24, cursor: "pointer" }} >{ele.qnty}</span>
                                                            <span className='' style={{ fontSize: 24, cursor: "pointer" }} onClick={() => send(ele)}>+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-detail-content col-2">
                                                <div className="add-to-cart-btn">
                                                    <Tooltip title='Delete from Cart'>
                                                        <span>
                                                            <i class="fa-solid fa-trash-can cur-po" onClick={() => dlt(ele.Id)}></i>
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="grand-total">
                            <div className="g-total-wrapper">
                                <div className="grandtotal-wrapper">
                                    <p className='grand-total-p'>Total : ₹{price}</p>
                                </div>
                                <div className="checkout-btn-wrapper">
                                    <Link className='checkout btn btn-primary'> Check Out</Link>
                                </div>
                            </div>
                        </div>
                    </div> :
                        <div className='card-details'>
                            <div className='header-menu-wrapper'>
                                <img className='gifcart' src="https://www.seekpng.com/png/full/117-1170538_404-your-cart-is-empty.png" alt="cart gif" />
                            </div>
                            <div className='text-center cart-close-btn-wrapper'>
                                <Link to={`/${props.activeTab}`} className='btn btn-primary cart-close-btn' onClick={props.setActiveTab(props.activeTab)}>Continue Shopping</Link>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default Cart