import Link from "next/link";

const NavHeader = () => (
  <ul>
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/about">About</Link>
    </li>
  </ul>
)

export default NavHeader;