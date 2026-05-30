//container: accepts properties as children, 
//styling properties are defined in container


const Container = ({children}) => {
  return (
    <div className="w-full max-w-7xl, mx-auto, px-4">{children}</div>
  )
}

export {Container}