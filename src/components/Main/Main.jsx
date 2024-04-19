import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, sortProducts } from "../../redux/products/ProductsSlice";
import s from "./Main.module.scss";
import { Link } from "react-router-dom";
// import showMore from '../../assets/images/show-more.svg'
import Header from "../Header/Header";

const Main = () => {
  const products = useSelector((state) => state.products.products); //берем products из redux
  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] = useState(products); // отфильтрованные продукты
  const [search, setSearch] = useState(""); // state для хранения данных в инпуте

  //!Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null); // state для хранения текущей страницы пагинации
  const [pageCount, setPageCount] = useState(0); // state для хранения количества страниц
  const itemsPerPage = 8; // number of items per page

  const filter = useCallback(
    //useCallback() возвращает одну и туже ссылку на функцию, до тех пор, пока не изменится одна из зависимостей, чтобы filter не рендерился снова и снова
    (searchValue) => {
      return currentItems?.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    },
    [currentItems]
  );

  // useEffect(() => {
  //   return () => dispatch(getProducts());
  // }, []);

  useEffect(() => {
    const debounced = setTimeout(() => {
      const result = filter(search);
      setFilteredProducts(result);
    }, 300);

    return () => debounced;
  }, [dispatch, filter, search]);

  useEffect(() => {
    dispatch(getProducts());
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products?.slice(itemOffset, endOffset));
     setPageCount(Math.ceil(products?.length === undefined ? 1 : products?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  //TODO: there should be single useEffect

  const handlePageClick = (event) => {
    // const newOffset = event.selected + 1;
     const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Header />
      <div className="container">
        <main className={s.main}>
          <h1 className={s.main_title}>Our products</h1>
          <div className={s.main_box}>
            <div className={s.main_box_sort}>
              <span className={s.main_box_sort_span}>Sort by</span>
              <select
                className={s.main_box_sort_drop}
                onChange={(event) => dispatch(sortProducts(event.target.value))}
              >
                <option className={s.main_box_sort_drop_li} value="name">
                  Name<a href="#" className={s.main_sort_drop_link}></a>
                </option>
                <option className={s.main_box_sort_drop_li} value="price">
                  Price<a href="#" className={s.main_sort_drop_link}></a>
                </option>
                <option className={s.main_box_sort_drop_li} value="stock">
                  Stock<a href="#" className={s.main_sort_drop_link}></a>
                </option>
              </select>
            </div>
            <div className={s.main_box_search}>
              <input
                type="text"
                className={s.main_box_search_input}
                placeholder="Search..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
          <div className={s.main_products}>
            {filteredProducts?.map((product) => (
              <div key={product.id} className={s.main_products_item}>
                <div className={s.main_products_item_animation}>
                  <p className={s.main_products_item_info_box_brand}>
                    {product.brand}
                  </p>
                </div>
                <div className={s.main_products_item_info}>
                  <img
                    className={s.main_products_item_info_img}
                    src={product.thumbnail}
                    alt=""
                  />
                  <div className={s.main_products_item_info_box}>
                    <h3 className={s.main_products_item_animation_title}>
                      {product.title}
                    </h3>
                    <span className={s.main_products_item_info_box_quantity}>
                      {product.stock} available
                    </span>
                    <p className={s.main_products_item_info_box_discount}>
                      discount {Math.round(product.discountPercentage)}%
                    </p>
                    <div className={s.main_products_item_info_box_cont}>
                      <p className={s.main_products_item_info_box_price}>
                        Price: {product.price}$
                      </p>
                      <Link
                        to={`/${product.id}`}
                        className={s.main_products_item_info_box_cont_link}
                      >
                        Show more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName={s.pagination}
            pageLinkClassName={s.page_num}
            previousLinkClassName={s.page_num}
            nextLinkClassName={s.page_num}
            activeLinkClassName={s.active}
          />
        </main>
      </div>
    </>
  );
};

export default Main;
