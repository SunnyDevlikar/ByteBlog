
const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    className = '',
    ...props
}) => {
  return (
    <button className={`px-5 py-3 rounded-lg text-lg ${className} ${bgColor} ${textColor} ${type}`} {...props}>
        {children}
    </button>
  )
}

export default Button