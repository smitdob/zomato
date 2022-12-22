import React from 'react'
import './Cartmix.css'
import { Badge } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ADD, DLT, REMOVE } from '../../../../Redux/actions/action';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
const Cart = () => {
    const getdata = useSelector((state) => state.cartreducer.carts);
    // price usestate hook
    const [price, setPrice] = useState(0)
    // add to cart button
    const dispatch = useDispatch();
    const send = (e) => {
        dispatch(ADD(e))
    }
    //trash to cart button code
    const dlt = (id) => {
        dispatch(DLT(id))
    }
    // remove one
    const remove = (item) => {
        dispatch(REMOVE(item))
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
            <Tooltip title='cart'>
                <a className='minicart-icon' data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                    <Badge badgeContent={getdata.length} color="primary" className='cur-po'>
                        <LocalMallOutlinedIcon className='cur-po' />
                    </Badge>
                </a>
            </Tooltip>

            <div className="offcanvas offcanvas-end offcanvas-width" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className='m-0'>Cart</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {
                        getdata.length ?
                            <div className='card-details'>
                                <div className="cart-data-collection">
                                    {
                                        getdata.map((e) => {
                                            return (
                                                <div key={e.Id}>
                                                    <div className='cart-content-wrapper'>
                                                        <div className="header-cart-image ">
                                                            <img src={e.info.cover} alt="cart" />
                                                            <i className="fa-regular fa-trash-can trash-bin" onClick={() => dlt(e.Id)}></i>
                                                        </div>
                                                        <div className="header-cart-content">
                                                            <p className='header-cart-content-name'> <span className='text different'>{(e.info.name.length) > 17 ? e.info.name.slice(0, 20) + "..." : e.info.name}</span> </p>
                                                            {/* <p className='header-cart-content-price'>Price : <span className='text different'> ₹ {e.info.price}</span> </p> */}
                                                            <p className='header-cart-content-qnty'>Quantity : <span className='text different qnty-btn-wrapper'>
                                                                <span className='qnty-btn cur-po' onClick={e.qnty <= 1 ? () => dlt(e.Id) : () => remove(e)}>-</span>
                                                                <span className='qnty-btn cur-po'>{e.qnty}</span>
                                                                <span className='qnty-btn cur-po' onClick={() => send(e)}>+</span>
                                                            </span>
                                                            </p>
                                                            <p className='header-cart-total'>Total : ₹ {e.info.price * e.qnty}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div> :
                            <div className='card-details'>
                                <div className='header-menu-wrapper'>
                                    <p>Your Cart is Empty</p>
                                    <img className='gifcart' src="https://parcamkapinda.com/img/cart.gif" alt="cart gif" />
                                </div>
                            </div>
                    }
                    <div className= 'add-to-cart'>
                        <Link to='/cart'><button className='hero-btn' data-bs-dismiss="offcanvas" aria-label="Close">Go to Cart</button></Link>
                        <p className='header-grand-total'>Total : ₹ {price}</p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Cart