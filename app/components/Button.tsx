interface ButtonProps {
  icon?: any
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <>
      <div onClick={props.onClick} className="flex justify-cente">
        <div className="flex items-center justify-center dark:bg-gray-800">
          <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            {props.icon}
            <span>{props.children}</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Button
