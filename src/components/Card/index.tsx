
export const Card: React.FC<{children:React.ReactNode}> = ({children}) => {
    return <div className="card">
        <div className="card__wrapper">{children}</div>
    </div>
}
