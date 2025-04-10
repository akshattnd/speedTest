import { Sun, Moon } from "lucide-react"
import { useAppDispatch, useAppSelector, useLogout } from '@/services/hook'
import { Link, NavLink, useNavigate } from "react-router-dom"
import { toggleTheme } from '@/features/themeSlice'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Button } from './ui/button'
import { useEffect } from "react"
import { toast } from "sonner"
import { logout } from "@/features/authSlice"
import { AxiosError } from "axios"

export default function Header() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const mode = useAppSelector(state => state.theme.mode)
    const isLogin = useAppSelector(state => state.auth.login)
    const { mutate, isPending, isError, error, isSuccess, data } = useLogout()

    function handleLogout() {
        mutate()
    }

    useEffect(() => {
        if (error) {
            const msg = error instanceof AxiosError ? error.response?.data.msg : "Internal server error"
            toast(msg)
        }
    }, [isError, error])

    useEffect(() => {
        if (isSuccess || !isLogin) {
            navigate("/login", { replace: true })
        }
        if (data) {
            dispatch(logout())
            toast(data.msg)
        }
    }, [isSuccess, data, isLogin, navigate, dispatch])

    return (
        <nav className="px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between shadow-sm dark:shadow-secondary">
            <Link to="/" className="flex items-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl text-[#6D28D9] font-bold">
                    Speed Type
                </h1>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger
                            onClick={() => dispatch(toggleTheme())}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {mode === "light" ? <Sun size={20} /> : <Moon size={20} />}
                        </TooltipTrigger>
                        <TooltipContent>
                            Toggle Theme
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? "font-medium" : ""
                    }
                >
                    <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                        Profile
                    </Button>
                    <Button variant="outline" size="icon" className="sm:hidden">
                        P
                    </Button>
                </NavLink>

                {isLogin && (
                    <Button
                        variant="destructive"
                        size="sm"
                        disabled={isPending}
                        onClick={handleLogout}
                    >
                        {isPending ? "Loading..." : 'Logout'}
                    </Button>
                )}
            </div>
        </nav>
    )
}