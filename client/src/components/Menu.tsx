import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Avatar from "./Avatar";

const Menu = () => {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger className={``} ><Avatar alt={"u"} /></MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        Profile
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>logout</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
export default Menu;
