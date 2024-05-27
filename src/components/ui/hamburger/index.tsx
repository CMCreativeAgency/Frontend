import Button from '../button'

interface HamburgerProps {
  menuState: boolean
  setMenuState: (e: boolean) => any
}

function Hamburger({ menuState, setMenuState }: HamburgerProps) {
  return (
    <>
      <Button
        label={menuState ? 'close' : 'menu'}
        double={true}
        className="button__brackets"
        onClick={() => setMenuState(!menuState)}
        data-cursor="link"
      />
    </>
  )
}

export default Hamburger
