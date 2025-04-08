import { Sun, Moon } from "lucide-react"
import { useAppDispatch, useAppSelector, useLogout } from '@/services/hook'
import { Link, NavLink, useNavigate } from "react-router";
import { toggleTheme } from '@/features/themeSlice'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Button } from './ui/button';
export default function Header() {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(state => state.theme.mode);
    const isLogin = useAppSelector(state => state.auth.login);
    const { mutate } = useLogout();
    const navigate = useNavigate()
    function handleLogout() {
        mutate();
        navigate("/login");
    }
    return (
        <header>
            <nav className={` sm:p-4 p-2  flex flex-row min-h-max items-center justify-between  shadow-sm dark:shadow-secondary `}>
                <Link to={"/"}>
                    <h1 className="text-xl sm:text-2xl text-[#6D28D9] font-bold md:text-4xl md:ml-8 ml-2">

                        Speed Type
                    </h1>
                </Link>
                <div className='flex items-center gap-3 sm:gap-4  mr-1  md:mr-2'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger onClick={() => {
                                dispatch(toggleTheme());
                            }}>
                                {mode === "light" ? <Moon /> : <Sun />}

                            </TooltipTrigger>
                            <TooltipContent>
                                Theme
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <NavLink to="/profile"
                        className={({ isActive, isPending }) =>
                            isPending ? "" : isActive ? "font-medium hover:underline" : ""
                        }>
                        <Button>Profile</Button>
                    </NavLink>
                    {isLogin && <Button variant="destructive" onClick={handleLogout}>
                        Logout
                    </Button>}
                </div>
            </nav >
        </header>
    )
}