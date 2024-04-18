import {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import s from '../MainItem/MainItem.module.scss'
import { getProduct } from '../../../redux/productItem/ProductItemSlice';
import backIcon from '../../../assets/images/back-icon.svg'


const MainItem = () => {

    let { id } = useParams()

    const product = useSelector((state) => state.productItem.productItem)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getProduct(id))
    }, [product])

  return (
    <div className="container">
    <main className={s.mainItem}>
      <div className={s.mainItem_top}>
        <Link to='/'>
        <img src={backIcon} alt="back-icon" className={s.mainItem_top_back}/>
        </Link>
         <h1 className={s.mainItem_top_title}>
          {product?.title}
        </h1> 
      </div>
      <div className={s.mainItem_bottom}>
         <div className={s.mainItem_bottom_left}>
           <img className={s.mainItem_bottom_left_img} src={product?.          
            thumbnail} />
          </div>
            <div className={s.mainItem_bottom_right}>
            <p className={s.mainItem_bottom_right_price}>
              <span>Price</span>   {product?.price}$
            </p>
            <p className={s.mainItem_bottom_right_rating}>
              <span>Rating</span> 
              <span>{product?.rating} 
                <span>
                  <img src="https://img.icons8.com/color/48/000000/star.png" alt="" />
                </span> 
              </span>
            </p> 
            <div className={s.mainItem_bottom_right_cont}>
           <h3 className={s.mainItem_bottom_right_cont_description}>
            {product?.description} 
           </h3>
            </div> 
            </div>  
      </div>
    </main>
    </div>
  )
}

export default MainItem 
