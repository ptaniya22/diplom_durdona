
import s from './Navbar.module.scss'
import logo from '../../assets/images/nav-logo.svg'


const Navbar = () => {

  return (
    <nav className={s.nav}>
      <div className={s.nav_logo}>
        <img src={logo} alt="" className={s.nav_logo_icon} />
        <h1 className={s.nav_logo_title}>Shop till you drop</h1>
      </div>
      <ul className={s.nav_list}>
        <li className={s.nav_list_li}>
          <a href="#" className={s.nav_list_li_link}>Welcome</a>
        </li>
        <li className={s.nav_list_li}>
          <a href="#" className={s.nav_list_li_link}>Products</a>
        </li>
        <li className={s.nav_list_li}>
          <a href="#" className={s.nav_list_li_link}>Contacts</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
