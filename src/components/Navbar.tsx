import dayjs from "dayjs"
import { navIcons, navLinks } from "../constants"

const Navbar = () => {
  return (
    <nav>
      <div className="">
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">John Danlami</p>
        <ul>
          {navLinks.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({id, img}) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className="icon-hover" />
            </li>
          ))}
        </ul>
      <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>

    </nav>
  )
}

export default Navbar