import React from 'react'
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from '@/hook'

import { toggleTheme } from '@/features/themeSlice'
import Menu from './Menu'
const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(state => state.theme.mode);

    return (
        <div className={` flex flex-row p-4 min-h-max items-center justify-between flex-wrap  shadow-sm dark:shadow-secondary `}>

            <h1 className="text-2xl text-[#6D28D9] font-bold md:text-4xl md:ml-8 ml-2">

                Speed Type</h1>
            <div className='flex items-center space-x-4 mr-1  md:mr-2'>
                <Button variant={"default"} onClick={() => {
                    dispatch(toggleTheme());
                }}>
                    {mode === "light" ? <Moon /> : <Sun />}
                </Button>
                <Menu />
            </div>

        </div >
    )
}

export default Navbar; 